import { LitElement as C, html as d, property as _, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as P, UMB_MODAL_MANAGER_CONTEXT as O } from "@umbraco-cms/backoffice/modal";
import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
var x = Object.defineProperty, M = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, u = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? M(t, i) : t, c = e.length - 1, p; c >= 0; c--)
    (p = e[c]) && (r = (a ? p(t, i, r) : p(r)) || r);
  return a && r && x(t, i, r), r;
}, h = (e, t, i) => t.has(e) || y("Cannot " + i), s = (e, t, i) => (h(e, t, "read from private field"), i ? i.call(e) : t.get(e)), m = (e, t, i) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), I = (e, t, i, a) => (h(e, t, "write to private field"), t.set(e, i), i), f = (e, t, i) => (h(e, t, "access private method"), i), n, v, o, g, E;
const S = new P("icon-picker-modal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
let l = class extends k(C) {
  constructor() {
    super(), m(this, n), this.value = null, m(this, o), this.consumeContext(O, (e) => {
      I(this, o, e);
    });
  }
  get spritePath() {
    var e;
    return (e = this.config) == null ? void 0 : e.getValueByAlias("spriteLocation");
  }
  render() {
    const e = s(this, n, v);
    return !(e != null && e.path) || !(e != null && e.name) ? d`
                <uui-button 
                    look="placeholder" 
                    label="Select icon"
                    @click=${f(this, n, g)}>
                    Select icon
                </uui-button>
            ` : d`
            <div style="display: grid;
                  grid-template-columns: 50px 1fr;
                  align-items: center;
                  grid-gap: 20px;">
                <div slot="icon">
                    <svg style="width: 50px; height: 50px;">
                        <use href="${e.path}#${e.name}"></use>
                    </svg>
                </div>
                <div slot="actions">
                    <uui-button 
                        look="secondary" 
                        label="Remove" 
                        @click=${f(this, n, E)}>
                        Remove
                        <uui-icon name="remove"></uui-icon>
                    </uui-button>
                </div>
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
v = function() {
  const e = this.value;
  if (!e) return null;
  if (typeof e != "string") return e;
  try {
    const t = JSON.parse(e);
    return t && typeof t == "object" ? t : null;
  } catch {
    return null;
  }
};
o = /* @__PURE__ */ new WeakMap();
g = async function() {
  if (!s(this, o)) return;
  const t = await s(this, o).open(this, S, {
    data: {
      headline: "Choose an icon",
      spritePath: this.spritePath,
      currentValue: s(this, n, v) ?? void 0
    }
  }).onSubmit();
  t && (this.value = t, this.dispatchEvent(new CustomEvent("change", { detail: { value: t } })));
};
E = function() {
  this.value = null, this.dispatchEvent(new CustomEvent("change", { detail: { value: null } }));
};
u([
  _({ type: Object })
], l.prototype, "value", 2);
u([
  _()
], l.prototype, "config", 2);
l = u([
  w("iconpicker-property-editor-ui")
], l);
export {
  l as default
};
//# sourceMappingURL=iconpicker-property-editor-ui.element.js.map
