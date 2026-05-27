import { state as p, customElement as w, html as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as P } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
import { transformServerPathToClientPath as E } from "@umbraco-cms/backoffice/utils";
var L = Object.defineProperty, S = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, c = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? S(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, a, i) : s(i)) || i);
  return r && i && L(e, a, i), i;
}, _ = (t, e, a) => e.has(t) || v("Cannot " + a), T = (t, e, a) => (_(t, e, "read from private field"), a ? a.call(t) : e.get(t)), f = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), V = (t, e, a, r) => (_(t, e, "write to private field"), e.set(t, a), a), u = (t, e, a) => (_(t, e, "access private method"), a), h, n, g, y, C, x;
let l = class extends P {
  constructor() {
    super(), f(this, n), this._selectedValue = "", this._icons = [], this._isLoading = !0, this._error = null, f(this, h), this.consumeContext($, (t) => {
      V(this, h, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), await u(this, n, g).call(this);
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
                            @click=${() => u(this, n, x).call(this, e)}
                            style="${e.name === this._selectedValue ? "border: 1px solid; padding:1px;" : ""} aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                            <svg style="width: 24px; height: 24px;">
                                <use href="${e.path}#${e.name}"></use>
                            </svg>
                        </uui-button>
                    `)}
                </div>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${u(this, n, C)}">Cancel</uui-button>
                    <uui-button
                        id="submit"
                        color='positive'
                        look="primary"
                        label="Submit"
                        @click=${u(this, n, y)}></uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
h = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
g = async function() {
  var t, e, a, r, i;
  if (!((t = this.data) != null && t.spritePath)) {
    this._error = "No sprite path provided", this._isLoading = !1;
    return;
  }
  try {
    this._isLoading = !0;
    const o = await ((e = T(this, h)) == null ? void 0 : e.getLatestToken()), s = E((a = this.data) == null ? void 0 : a.spritePath), m = await fetch(`/umbraco/management/api/v1/iconpicker/icons?spritePath=${encodeURIComponent(s)}`, {
      headers: { Authorization: `Bearer ${o}` }
    });
    if (!m.ok) throw new Error("Failed to load icons");
    const b = await m.json();
    this._icons = b.map((k) => ({
      path: s,
      name: k
    })), this._selectedValue = ((i = (r = this.data) == null ? void 0 : r.currentValue) == null ? void 0 : i.name) ?? "";
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
c([
  p()
], l.prototype, "_selectedValue", 2);
c([
  p()
], l.prototype, "_icons", 2);
c([
  p()
], l.prototype, "_isLoading", 2);
c([
  p()
], l.prototype, "_error", 2);
l = c([
  w("icon-picker-dialog")
], l);
export {
  l as IconPickerDialogElement
};
//# sourceMappingURL=icon-picker-dialog.element.js.map
