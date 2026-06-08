import { LitElement, html, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_STATIC_FILE_PICKER_MODAL } from '@umbraco-cms/backoffice/static-file';
import { UmbServerFilePathUniqueSerializer } from '@umbraco-cms/backoffice/server-file-system';

type StaticFilePickerItem = {
    isFolder?: boolean;
    name?: string;
};

@customElement('sprite-picker-property-editor-ui')
export class SpritePicker extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
    @property({ type: String })
    public value = '';

    #serializer = new UmbServerFilePathUniqueSerializer();
    #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;

    constructor() {
        super();
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });
    }

    #dispatchValueChange() {
        this.dispatchEvent(new UmbChangeEvent());
    }

    #toPickerPath(path: string): string {
        let value = path.trim().replace(/^\/+/, '');
        if (value && !value.startsWith('wwwroot/')) {
            value = `wwwroot/${value}`;
        }
        return value;
    }

    #fromPickerPath(path: string): string {
        let value = path.trim().replace(/^\/+/, '');
        if (value.startsWith('wwwroot/')) {
            value = value.substring('wwwroot/'.length);
        }
        return value ? `/${value}` : '';
    }

    async #openPicker() {
        if (!this.#modalManagerContext) return;

        const currentPath = this.value ? this.#toPickerPath(this.value) : '';

        const modal = this.#modalManagerContext.open(this, UMB_STATIC_FILE_PICKER_MODAL, {
            data: {
                multiple: false,
                pickableFilter: (item: StaticFilePickerItem) =>
                    !item.isFolder && (item.name?.toLowerCase().endsWith('.svg') ?? false),
                hideTreeRoot: true,
            },
            value: {
                selection: currentPath ? [this.#serializer.toUnique(currentPath)] : [],
            },
        });

        try {
            const result = await modal.onSubmit();
            const unique = result?.selection?.[0];

            this.value = unique
                ? this.#fromPickerPath(this.#serializer.toServerPath(unique) || '')
                : '';

            this.#dispatchValueChange();
        } catch {
        }
    }

    #handleRemove() {
        this.value = '';
        this.#dispatchValueChange();
    }

    render() {
        if (!this.value) {
            return html`
                <uui-button
                    look="placeholder"
                    label="Select sprite"
                    style="width: 100%;"
                    @click=${this.#openPicker}>
                    Select sprite
                </uui-button>
            `;
        }

        return html`
            <uui-ref-node name=${this.value}>
                <uui-icon slot="icon" name="icon-file"></uui-icon>
                <uui-action-bar slot="actions">
                    <uui-button
                        look="secondary"
                        label="Remove"
                        @click=${this.#handleRemove}>
                        Remove
                    </uui-button>
                </uui-action-bar>
            </uui-ref-node>
        `;
    }
}