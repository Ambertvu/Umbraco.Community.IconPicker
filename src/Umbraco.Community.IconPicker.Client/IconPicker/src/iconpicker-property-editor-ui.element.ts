import { LitElement, html, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import type { UmbPropertyEditorUiElement, UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalToken } from '@umbraco-cms/backoffice/modal';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';

export interface SpriteImage {
    name: string;
    path: string;
}

export interface IconPickerModalData {
    headline: string;
    spritePath: string;
    currentValue?: SpriteImage;
}

const ICON_PICKER_MODAL = new UmbModalToken<IconPickerModalData, SpriteImage>('icon-picker-modal', {
    modal: {
        type: 'sidebar',
        size: 'small'
    }
});

@customElement('iconpicker-property-editor-ui')
export default class IconpickerPropertyEditorUIElement extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
    // The editor uses the Umbraco.Plain.String schema, so a persisted value is
    // handed back as a JSON string, while a freshly picked value is an object.
    @property({ type: Object })
    public value: SpriteImage | string | null = null;

    get #icon(): SpriteImage | null {
        const value = this.value;
        if (!value) return null;
        if (typeof value !== 'string') return value;
        try {
            const parsed = JSON.parse(value);
            return parsed && typeof parsed === 'object' ? (parsed as SpriteImage) : null;
        } catch {
            return null;
        }
    }

    @property()
    public config!: UmbPropertyEditorConfigCollection;

    get spritePath(): string {
        return this.config?.getValueByAlias('spriteLocation') as string;
    }

    #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

    constructor() {
        super();
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });
    }

    async #openIconPicker() {
        if (!this.#modalManagerContext) return;
        const modal = this.#modalManagerContext.open(this, ICON_PICKER_MODAL, {
            data: {
                headline: "Choose an icon",
                spritePath: this.spritePath,
                currentValue: this.#icon ?? undefined
            }
        });

        const result = await modal.onSubmit();
        if (result) {
            this.value = result;
            this.dispatchEvent(new CustomEvent('change', { detail: { value: result } }));
        }
    }

    #handleRemove() {
        this.value = null;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: null } }));
    }

    render() {
        const icon = this.#icon;
        if (!icon?.path || !icon?.name) {
            return html`
                <uui-button 
                    look="placeholder" 
                    label="Select icon"
                    @click=${this.#openIconPicker}>
                    Select icon
                </uui-button>
            `;
        }

        return html`
            <div style="display: grid;
                  grid-template-columns: 50px 1fr;
                  align-items: center;
                  grid-gap: 20px;">
                <div slot="icon">
                    <svg style="width: 50px; height: 50px;">
                        <use href="${icon.path}#${icon.name}"></use>
                    </svg>
                </div>
                <div slot="actions">
                    <uui-button 
                        look="secondary" 
                        label="Remove" 
                        @click=${this.#handleRemove}>
                        Remove
                        <uui-icon name="remove"></uui-icon>
                    </uui-button>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'iconpicker-property-editor-ui': IconpickerPropertyEditorUIElement;
    }
}