import { LitElement as f, html as l, property as m, state as h, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
var w = Object.defineProperty, E = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, i = (e, t, r, o) => {
  for (var s = o > 1 ? void 0 : o ? E(t, r) : t, p = e.length - 1, c; p >= 0; p--)
    (c = e[p]) && (s = (o ? c(t, r, s) : c(s)) || s);
  return o && s && w(t, r, s), s;
}, C = (e, t, r) => t.has(e) || _("Cannot " + r), S = (e, t, r) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), u = (e, t, r) => (C(e, t, "access private method"), r), n, v, d;
let a = class extends g(f) {
  constructor() {
    super(...arguments), S(this, n), this.value = "", this._sprites = [], this._isLoading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await u(this, n, v).call(this);
  }
  render() {
    if (this._isLoading) return l`<uui-loader></uui-loader>`;
    if (this._error) return l`
            <p style="color: var(--uui-color-danger);">${this._error}</p>
        `;
    const e = [
      { name: "-- Select a sprite --", value: "" },
      ...this._sprites.map((t) => ({ name: t.name, value: t.path, selected: t.path === this.value }))
    ];
    return l`
            <uui-select
                .value=${this.value}
                .options=${e}
                @change=${u(this, n, d)}>
            </uui-select>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
v = async function() {
  try {
    const e = await fetch("/umbraco/api/iconpicker/sprites");
    if (!e.ok) throw new Error("Failed to load sprites");
    this._sprites = await e.json();
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Unknown error";
  } finally {
    this._isLoading = !1;
  }
};
d = function(e) {
  this.value = e.target.value, this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0 }));
};
i([
  m({ type: String })
], a.prototype, "value", 2);
i([
  h()
], a.prototype, "_sprites", 2);
i([
  h()
], a.prototype, "_isLoading", 2);
i([
  h()
], a.prototype, "_error", 2);
a = i([
  y("sprite-picker-property-editor-ui")
], a);
export {
  a as SpritePicker
};
//# sourceMappingURL=sprite-picker-property-editor-ui.element.js.map
