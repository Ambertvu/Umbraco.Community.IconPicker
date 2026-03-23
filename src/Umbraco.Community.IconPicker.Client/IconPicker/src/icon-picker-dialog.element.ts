import { html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { IconPickerModalData, SpriteImage } from './iconpicker-property-editor-ui.element';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('icon-picker-dialog')
export class IconPickerDialogElement extends UmbModalBaseElement<IconPickerModalData, SpriteImage> {
    @state()
    private _selectedValue = '';

    @state()
    private _icons: SpriteImage[] = [];

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
            const response = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(this.data.spritePath)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to load icons');

            const data = await response.json();
            this._icons = data.map((icon: string) => ({
                path: `${this.data?.spritePath}`,
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

        return html`
            <umb-body-layout .headline=${this.data?.headline ?? 'Select Icon'}>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 1rem; padding: 1rem;">
                    ${this._icons.map(icon => html`
                        <uui-button
                            look="secondary"
                            @click=${() => this.#handleSelect(icon)}
                            style="${(icon.name === this._selectedValue) ? 'border: 1px solid; padding:1px;' : ''} aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                            <svg style="width: 24px; height: 24px;">
                                <use href="${icon.path}#${icon.name}"></use>
                            </svg>
                        </uui-button>
                    `)}
                </div>
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