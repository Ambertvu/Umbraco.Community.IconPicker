import { css as T, state as d, customElement as P, html as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as E } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as L } from "@umbraco-cms/backoffice/auth";
var S = Object.defineProperty, I = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, l = (t, e, i, a) => {
  for (var r = a > 1 ? void 0 : a ? I(e, i) : e, n = t.length - 1, u; n >= 0; n--)
    (u = t[n]) && (r = (a ? u(e, i, r) : u(r)) || r);
  return a && r && S(e, i, r), r;
}, _ = (t, e, i) => e.has(t) || v("Cannot " + i), g = (t, e, i) => (_(t, e, "read from private field"), i ? i.call(t) : e.get(t)), f = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), V = (t, e, i, a) => (_(t, e, "write to private field"), e.set(t, i), i), h = (t, e, i) => (_(t, e, "access private method"), i), p, o, b, y, x, C, w, $;
let s = class extends E {
  constructor() {
    super(), f(this, o), this._selectedValue = "", this._icons = [], this._searchTerm = "", this._isLoading = !0, this._error = null, f(this, p), this.consumeContext(L, (t) => {
      V(this, p, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), await h(this, o, b).call(this);
  }
  render() {
    var e;
    if (this._isLoading)
      return c`<uui-loader></uui-loader>`;
    if (this._error)
      return c`
                <uui-box>
                    <div style="color: var(--uui-color-danger);">${this._error}</div>
                </uui-box>
            `;
    const t = g(this, o, $);
    return c`
            <umb-body-layout .headline=${((e = this.data) == null ? void 0 : e.headline) ?? "Select Icon"}>
                <uui-box>
                    <uui-input
                        type="search"
                        autofocus
                        placeholder="Search icons by name..."
                        .value=${this._searchTerm}
                        @input=${h(this, o, w)}
                        style="width: 100%;">
                    </uui-input>

                    ${t.length === 0 ? c`<div class="no-results">No icons match "${this._searchTerm}"</div>` : c`
                            <div class="icon-grid">
                                ${t.map((i) => c`
                                    <uui-button
                                        look="secondary"
                                        title=${i.name}
                                        class="icon-button ${i.name === this._selectedValue ? "selected" : ""}"
                                        @click=${() => h(this, o, C).call(this, i)}>
                                        <svg class="icon-svg">
                                            <use href="${i.path}#${i.name}"></use>
                                        </svg>
                                    </uui-button>
                                `)}
                            </div>
                        `}
                </uui-box>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${h(this, o, x)}">Cancel</uui-button>
                    <uui-button
                        id="submit"
                        color='positive'
                        look="primary"
                        label="Submit"
                        @click=${h(this, o, y)}></uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
b = async function() {
  var t, e, i, a;
  if (!((t = this.data) != null && t.spritePath)) {
    this._error = "No sprite path provided", this._isLoading = !1;
    return;
  }
  try {
    this._isLoading = !0;
    const r = await ((e = g(this, p)) == null ? void 0 : e.getLatestToken()), n = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(this.data.spritePath)}`, {
      headers: { Authorization: `Bearer ${r}` }
    });
    if (!n.ok) throw new Error("Failed to load icons");
    const u = await n.json();
    this._icons = u.map((k) => {
      var m;
      return {
        path: `${(m = this.data) == null ? void 0 : m.spritePath}`,
        name: k
      };
    }), this._selectedValue = ((a = (i = this.data) == null ? void 0 : i.currentValue) == null ? void 0 : a.name) ?? "";
  } catch (r) {
    this._error = r instanceof Error ? r.message : "Unknown error occurred";
  } finally {
    this._isLoading = !1;
  }
};
y = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
x = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
C = function(t) {
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
s.styles = T`
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
l([
  d()
], s.prototype, "_selectedValue", 2);
l([
  d()
], s.prototype, "_icons", 2);
l([
  d()
], s.prototype, "_searchTerm", 2);
l([
  d()
], s.prototype, "_isLoading", 2);
l([
  d()
], s.prototype, "_error", 2);
s = l([
  P("icon-picker-dialog")
], s);
export {
  s as IconPickerDialogElement
};
//# sourceMappingURL=icon-picker-dialog.element.js.map
