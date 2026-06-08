import { css as T, state as d, customElement as E, html as l } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as L } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as S } from "@umbraco-cms/backoffice/auth";
import { transformServerPathToClientPath as I } from "@umbraco-cms/backoffice/utils";
var V = Object.defineProperty, O = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, u = (t, e, i, a) => {
  for (var r = a > 1 ? void 0 : a ? O(e, i) : e, o = t.length - 1, c; o >= 0; o--)
    (c = t[o]) && (r = (a ? c(e, i, r) : c(r)) || r);
  return a && r && V(e, i, r), r;
}, _ = (t, e, i) => e.has(t) || v("Cannot " + i), g = (t, e, i) => (_(t, e, "read from private field"), i ? i.call(t) : e.get(t)), f = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), U = (t, e, i, a) => (_(t, e, "write to private field"), e.set(t, i), i), h = (t, e, i) => (_(t, e, "access private method"), i), p, s, b, y, C, x, w, $;
let n = class extends L {
  constructor() {
    super(), f(this, s), this._selectedValue = "", this._icons = [], this._searchTerm = "", this._isLoading = !0, this._error = null, f(this, p), this.consumeContext(S, (t) => {
      U(this, p, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), await h(this, s, b).call(this);
  }
  render() {
    var e;
    if (this._isLoading)
      return l`<uui-loader></uui-loader>`;
    if (this._error)
      return l`
                <uui-box>
                    <div style="color: var(--uui-color-danger);">${this._error}</div>
                </uui-box>
            `;
    const t = g(this, s, $);
    return l`
            <umb-body-layout .headline=${((e = this.data) == null ? void 0 : e.headline) ?? "Select Icon"}>
                <uui-box>
                    <uui-input
                        type="search"
                        autofocus
                        placeholder="Search icons by name..."
                        .value=${this._searchTerm}
                        @input=${h(this, s, w)}
                        style="width: 100%;">
                    </uui-input>

                    ${t.length === 0 ? l`<div class="no-results">No icons match "${this._searchTerm}"</div>` : l`
                            <div class="icon-grid">
                                ${t.map((i) => l`
                                    <uui-button
                                        look="secondary"
                                        title=${i.name}
                                        class="icon-button ${i.name === this._selectedValue ? "selected" : ""}"
                                        @click=${() => h(this, s, x).call(this, i)}>
                                        <svg class="icon-svg">
                                            <use href="${i.path}#${i.name}"></use>
                                        </svg>
                                    </uui-button>
                                `)}
                            </div>
                        `}
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${h(this, s, C)}">Cancel</uui-button>
                    <uui-button
                        id="submit"
                        color='positive'
                        look="primary"
                        label="Submit"
                        @click=${h(this, s, y)}></uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
b = async function() {
  var t, e, i, a, r;
  if (!((t = this.data) != null && t.spritePath)) {
    this._error = "No sprite path provided", this._isLoading = !1;
    return;
  }
  try {
    this._isLoading = !0;
    const o = await ((e = g(this, p)) == null ? void 0 : e.getLatestToken()), c = I((i = this.data) == null ? void 0 : i.spritePath), m = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(c)}`, {
      headers: { Authorization: `Bearer ${o}` }
    });
    if (!m.ok) throw new Error("Failed to load icons");
    const k = await m.json();
    this._icons = k.map((P) => ({
      path: c,
      name: P
    })), this._selectedValue = ((r = (a = this.data) == null ? void 0 : a.currentValue) == null ? void 0 : r.name) ?? "";
  } catch (o) {
    this._error = o instanceof Error ? o.message : "Unknown error occurred";
  } finally {
    this._isLoading = !1;
  }
};
y = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
C = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
x = function(t) {
  this._selectedValue = t.name, this.value = t;
};
w = function(t) {
  const e = t.target;
  this._searchTerm = e.value ?? "";
};
$ = function() {
  const t = this._searchTerm.trim().toLowerCase();
  return t ? this._icons.filter((e) => e.name.toLowerCase().includes(t)) : this._icons;
};
n.styles = T`
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
u([
  d()
], n.prototype, "_selectedValue", 2);
u([
  d()
], n.prototype, "_icons", 2);
u([
  d()
], n.prototype, "_searchTerm", 2);
u([
  d()
], n.prototype, "_isLoading", 2);
u([
  d()
], n.prototype, "_error", 2);
n = u([
  E("icon-picker-dialog")
], n);
export {
  n as IconPickerDialogElement
};
//# sourceMappingURL=icon-picker-dialog.element.js.map
