import { LitElement, html, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

interface SpriteOption {
    name: string;
    path: string;
}

@customElement('sprite-picker-property-editor-ui')
export class SpritePicker extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
    @property({ type: String })
    public value: string = '';

    @state()
    private _sprites: SpriteOption[] = [];

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
        await this.#loadSprites();
    }

    async #loadSprites() {
        try {
            const token = await this.#authContext?.getLatestToken();
            const response = await fetch('/umbraco/management/api/v1/iconpicker/sprites', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to load sprites');
            this._sprites = await response.json();
        } catch (error) {
            this._error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this._isLoading = false;
        }
    }

    #handleChange(e: Event) {
        this.value = (e.target as HTMLSelectElement & { value: string }).value;
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
    }

    render() {
        if (this._isLoading) return html`<uui-loader></uui-loader>`;

        if (this._error) return html`
            <p style="color: var(--uui-color-danger);">${this._error}</p>
        `;

        const options = [
            { name: '-- Select a sprite --', value: '' },
            ...this._sprites.map(s => ({ name: s.name, value: s.path, selected: s.path === this.value }))
        ];

        return html`
            <uui-select
                .value=${this.value}
                .options=${options}
                @change=${this.#handleChange}>
            </uui-select>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'sprite-picker-property-editor-ui': SpritePicker;
    }
}