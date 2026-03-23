import { LitElement as y, html as l, property as g, state as u, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as k } from "@umbraco-cms/backoffice/auth";
var S = Object.defineProperty, L = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, o = (e, t, r, s) => {
  for (var a = s > 1 ? void 0 : s ? L(t, r) : t, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (a = (s ? h(t, r, a) : h(a)) || a);
  return s && a && S(t, r, a), a;
}, _ = (e, t, r) => t.has(e) || f("Cannot " + r), P = (e, t, r) => (_(e, t, "read from private field"), r ? r.call(e) : t.get(e)), v = (e, t, r) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), x = (e, t, r, s) => (_(e, t, "write to private field"), t.set(e, r), r), d = (e, t, r) => (_(e, t, "access private method"), r), p, n, m, w;
let i = class extends E(y) {
  constructor() {
    super(), v(this, n), this.value = "", this._sprites = [], this._isLoading = !0, this._error = null, v(this, p), this.consumeContext(k, (e) => {
      x(this, p, e);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), await d(this, n, m).call(this);
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
                @change=${d(this, n, w)}>
            </uui-select>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
m = async function() {
  var e;
  try {
    const t = await ((e = P(this, p)) == null ? void 0 : e.getLatestToken()), r = await fetch("/umbraco/management/api/v1/iconpicker/sprites", {
      headers: { Authorization: `Bearer ${t}` }
    });
    if (!r.ok) throw new Error("Failed to load sprites");
    this._sprites = await r.json();
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Unknown error";
  } finally {
    this._isLoading = !1;
  }
};
w = function(e) {
  this.value = e.target.value, this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0 }));
};
o([
  g({ type: String })
], i.prototype, "value", 2);
o([
  u()
], i.prototype, "_sprites", 2);
o([
  u()
], i.prototype, "_isLoading", 2);
o([
  u()
], i.prototype, "_error", 2);
i = o([
  C("sprite-picker-property-editor-ui")
], i);
export {
  i as SpritePicker
};
//# sourceMappingURL=sprite-picker-property-editor-ui.element.js.map
