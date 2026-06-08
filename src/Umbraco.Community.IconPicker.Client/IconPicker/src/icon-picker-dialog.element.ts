import { html, css, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { IconPickerModalData, SpriteImage } from './iconpicker-property-editor-ui.element';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { transformServerPathToClientPath } from '@umbraco-cms/backoffice/utils';

@customElement('icon-picker-dialog')
export class IconPickerDialogElement extends UmbModalBaseElement<IconPickerModalData, SpriteImage> {
    static styles = css`
        uui-input {
            margin-bottom: 1rem;
        }

        .icon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 0.5rem;
        }

        .icon-button {
            aspect-ratio: 1;
        }

        .icon-button.selected {
            border: 1px solid var(--uui-color-selected);
            border-radius: var(--uui-border-radius);
        }

        .icon-svg {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }

        .no-results {
            padding: 1rem;
            color: var(--uui-color-text-alt);
            text-align: center;
        }
    `;

    @state()
    private _selectedValue = '';

    @state()
    private _icons: SpriteImage[] = [];

    @state()
    private _searchTerm = '';

    @state()
    private _isLoading = true;

    @state()
    private _error: string | null = null;

    #authContext?: typeof UMB_AUTH_CONTEXT.TYPE;

    constructor() {
        super();
        this.consumeContext(UMB_AUTH_CONTEXT, (context) => {
            this.#authContext = context;
        });
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.#loadIcons();
    }

    async #loadIcons() {
        if (!this.data?.spritePath) {
            this._error = 'No sprite path provided';
            this._isLoading = false;
            return;
        }

        try {
            this._isLoading = true;
            const token = await this.#authContext?.getLatestToken();
            const spritePath = transformServerPathToClientPath(this.data?.spritePath);
            const response = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(spritePath)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to load icons');

            const data = await response.json();
            this._icons = data.map((icon: string) => ({
                path: spritePath,
                name: icon
            }));
            this._selectedValue = this.data?.currentValue?.name ?? '';
        } catch (error) {
            this._error = error instanceof Error ? error.message : 'Unknown error occurred';
        } finally {
            this._isLoading = false;
        }
    }
    #handleConfirm() {
        this.modalContext?.submit();
    }

    #handleCancel() {
        this.modalContext?.reject();
    }
    #handleSelect(icon: SpriteImage) {
        this._selectedValue = icon.name;
        this.value = icon;
    }

    #handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        this._searchTerm = target.value ?? '';
    }

    get #filteredIcons(): SpriteImage[] {
        const term = this._searchTerm.trim().toLowerCase();
        if (!term) return this._icons;
        return this._icons.filter(icon => icon.name.toLowerCase().includes(term));
    }

    render() {
        if (this._isLoading) {
            return html`<uui-loader></uui-loader>`;
        }

        if (this._error) {
            return html`
                <uui-box>
                    <div style="color: var(--uui-color-danger);">${this._error}</div>
                </uui-box>
            `;
        }

        const filteredIcons = this.#filteredIcons;

        return html`
            <umb-body-layout .headline=${this.data?.headline ?? 'Select Icon'}>
                <uui-box>
                    <uui-input
                        type="search"
                        autofocus
                        placeholder="Search icons by name..."
                        .value=${this._searchTerm}
                        @input=${this.#handleSearch}
                        style="width: 100%;">
                    </uui-input>

                    ${filteredIcons.length === 0
                        ? html`<div class="no-results">No icons match "${this._searchTerm}"</div>`
                        : html`
                            <div class="icon-grid">
                                ${filteredIcons.map(icon => html`
                                    <uui-button
                                        look="secondary"
                                        title=${icon.name}
                                        class="icon-button ${icon.name === this._selectedValue ? 'selected' : ''}"
                                        @click=${() => this.#handleSelect(icon)}>
                                        <svg class="icon-svg">
                                            <use href="${icon.path}#${icon.name}"></use>
                                        </svg>
                                    </uui-button>
                                `)}
                            </div>
                        `}
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${this.#handleCancel}">Cancel</uui-button>
                    <uui-button
                        id="submit"
                        color='positive'
                        look="primary"
                        label="Submit"
                        @click=${this.#handleConfirm}></uui-button>
                </div>
            </umb-body-layout>
        `;
    }
}