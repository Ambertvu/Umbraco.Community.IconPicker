import { state as h, customElement as g, html as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as y } from "@umbraco-cms/backoffice/modal";
var b = Object.defineProperty, x = Object.getOwnPropertyDescriptor, p = (e) => {
  throw TypeError(e);
}, c = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? x(t, i) : t, l = e.length - 1, o; l >= 0; l--)
    (o = e[l]) && (r = (a ? o(t, i, r) : o(r)) || r);
  return a && r && b(t, i, r), r;
}, C = (e, t, i) => t.has(e) || p("Cannot " + i), k = (e, t, i) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (C(e, t, "access private method"), i), s, _, m, f, v;
let n = class extends y {
  constructor() {
    super(...arguments), k(this, s), this._selectedValue = "", this._icons = [], this._isLoading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await u(this, s, _).call(this);
  }
  render() {
    var e;
    return this._isLoading ? d`<uui-loader></uui-loader>` : this._error ? d`
                <uui-box>
                    <div style="color: var(--uui-color-danger);">${this._error}</div>
                </uui-box>
            ` : d`
            <umb-body-layout .headline=${((e = this.data) == null ? void 0 : e.headline) ?? "Select Icon"}>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 1rem; padding: 1rem;">
                    ${this._icons.map((t) => d`
                        <uui-button
                            look="secondary"
                            @click=${() => u(this, s, v).call(this, t)}
                            style="${t.name === this._selectedValue ? "border: 1px solid; padding:1px;" : ""} aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                            <svg style="width: 24px; height: 24px;">
                                <use href="${t.path}#${t.name}"></use>
                            </svg>
                        </uui-button>
                    `)}
                </div>
                <div slot="actions">
                    <uui-button id="cancel" label="Cancel" @click="${u(this, s, f)}">Cancel</uui-button>
                    <uui-button
                        id="submit"
                        color='positive'
                        look="primary"
                        label="Submit"
                        @click=${u(this, s, m)}></uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
_ = async function() {
  var e, t, i;
  if (!((e = this.data) != null && e.spritePath)) {
    this._error = "No sprite path provided", this._isLoading = !1;
    return;
  }
  try {
    this._isLoading = !0;
    const a = await fetch(`/umbraco/api/iconpicker/icons?spritePath=${encodeURIComponent(this.data.spritePath)}`);
    if (!a.ok) throw new Error("Failed to load icons");
    const r = await a.json();
    console.log(this.data.spritePath), this._icons = r.map((l) => {
      var o;
      return {
        path: `${(o = this.data) == null ? void 0 : o.spritePath}`,
        name: l
      };
    }), this._selectedValue = ((i = (t = this.data) == null ? void 0 : t.currentValue) == null ? void 0 : i.name) ?? "";
  } catch (a) {
    this._error = a instanceof Error ? a.message : "Unknown error occurred";
  } finally {
    this._isLoading = !1;
  }
};
m = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
f = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
v = function(e) {
  this._selectedValue = e.name, this.value = e;
};
c([
  h()
], n.prototype, "_selectedValue", 2);
c([
  h()
], n.prototype, "_icons", 2);
c([
  h()
], n.prototype, "_isLoading", 2);
c([
  h()
], n.prototype, "_error", 2);
n = c([
  g("icon-picker-dialog")
], n);
export {
  n as IconPickerDialogElement
};
//# sourceMappingURL=icon-picker-dialog.element.js.map
