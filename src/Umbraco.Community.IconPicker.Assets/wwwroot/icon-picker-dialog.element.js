import { state as p, customElement as k, html as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as w } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
var P = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, c = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? E(e, a) : e, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (i = (r ? l(e, a, i) : l(i)) || i);
  return r && i && P(e, a, i), i;
}, _ = (t, e, a) => e.has(t) || v("Cannot " + a), L = (t, e, a) => (_(t, e, "read from private field"), a ? a.call(t) : e.get(t)), f = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), S = (t, e, a, r) => (_(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (_(t, e, "access private method"), a), u, s, g, y, x, C;
let n = class extends w {
  constructor() {
    super(), f(this, s), this._selectedValue = "", this._icons = [], this._isLoading = !0, this._error = null, f(this, u), this.consumeContext($, (t) => {
      S(this, u, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), await h(this, s, g).call(this);
  }
  render() {
    var t;
    return this._isLoading ? d`<uui-loader></uui-loader>` : this._error ? d`
                <uui-box>
                    <div style="color: var(--uui-color-danger);">${this._error}</div>
                </uui-box>
            ` : d`
            <umb-body-layout .headline=${((t = this.data) == null ? void 0 : t.headline) ?? "Select Icon"}>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 1rem; padding: 1rem;">
                    ${this._icons.map((e) => d`
                        <uui-button
                            look="secondary"
                            @click=${() => h(this, s, C).call(this, e)}
                            style="${e.name === this._selectedValue ? "border: 1px solid; padding:1px;" : ""} aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                            <svg style="width: 24px; height: 24px;">
                                <use href="${e.path}#${e.name}"></use>
                            </svg>
                        </uui-button>
                    `)}
                </div>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${h(this, s, x)}">Cancel</uui-button>
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
u = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
g = async function() {
  var t, e, a, r;
  if (!((t = this.data) != null && t.spritePath)) {
    this._error = "No sprite path provided", this._isLoading = !1;
    return;
  }
  try {
    this._isLoading = !0;
    const i = await ((e = L(this, u)) == null ? void 0 : e.getLatestToken()), o = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(this.data.spritePath)}`, {
      headers: { Authorization: `Bearer ${i}` }
    });
    if (!o.ok) throw new Error("Failed to load icons");
    const l = await o.json();
    console.log(this.data.spritePath), this._icons = l.map((b) => {
      var m;
      return {
        path: `${(m = this.data) == null ? void 0 : m.spritePath}`,
        name: b
      };
    }), this._selectedValue = ((r = (a = this.data) == null ? void 0 : a.currentValue) == null ? void 0 : r.name) ?? "";
  } catch (i) {
    this._error = i instanceof Error ? i.message : "Unknown error occurred";
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
c([
  p()
], n.prototype, "_selectedValue", 2);
c([
  p()
], n.prototype, "_icons", 2);
c([
  p()
], n.prototype, "_isLoading", 2);
c([
  p()
], n.prototype, "_error", 2);
n = c([
  k("icon-picker-dialog")
], n);
export {
  n as IconPickerDialogElement
};
//# sourceMappingURL=icon-picker-dialog.element.js.map
