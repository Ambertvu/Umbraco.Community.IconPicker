import { LitElement as E, html as h, property as _, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as P, UMB_MODAL_MANAGER_CONTEXT as w } from "@umbraco-cms/backoffice/modal";
import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
var x = Object.defineProperty, M = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, p = (e, t, i, a) => {
  for (var o = a > 1 ? void 0 : a ? M(t, i) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (o = (a ? c(t, i, o) : c(o)) || o);
  return a && o && x(t, i, o), o;
}, u = (e, t, i) => t.has(e) || f("Cannot " + i), v = (e, t, i) => (u(e, t, "read from private field"), t.get(e)), d = (e, t, i) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), O = (e, t, i, a) => (u(e, t, "write to private field"), t.set(e, i), i), m = (e, t, i) => (u(e, t, "access private method"), i), r, n, g, y;
const A = new P("icon-picker-modal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
let s = class extends k(E) {
  constructor() {
    super(), d(this, n), this.value = null, d(this, r), this.consumeContext(w, (e) => {
      O(this, r, e);
    });
  }
  get spritePath() {
    var e;
    return (e = this.config) == null ? void 0 : e.getValueByAlias("spriteLocation");
  }
  render() {
    return this.value ? h`
            <div style="display: grid;
                  grid-template-columns: 50px 1fr;
                  align-items: center;
                  grid-gap: 20px;">
                <div slot="icon">
                    <svg style="width: 50px; height: 50px;">
                        <use href="${this.value.path}#${this.value.name}"></use>
                    </svg>
                </div>
                <div slot="actions">
                    <uui-button 
                        look="secondary" 
                        label="Remove" 
                        @click=${m(this, n, y)}>
                        Remove
                        <uui-icon name="remove"></uui-icon>
                    </uui-button>
                </div>
            </div>
        ` : h`
                <uui-button 
                    look="placeholder" 
                    label="Select icon"
                    @click=${m(this, n, g)}>
                    Select icon
                </uui-button>
            `;
  }
};
r = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
g = async function() {
  if (!v(this, r)) return;
  console.log(this.config.getValueByAlias("spriteLocation")), console.log(this.spritePath);
  const t = await v(this, r).open(this, A, {
    data: {
      headline: "Choose an icon",
      spritePath: this.spritePath,
      currentValue: this.value ?? void 0
    }
  }).onSubmit();
  t && (this.value = t, this.dispatchEvent(new CustomEvent("change", { detail: { value: t } })));
};
y = function() {
  this.value = null, this.dispatchEvent(new CustomEvent("change", { detail: { value: null } }));
};
p([
  _({ type: Object })
], s.prototype, "value", 2);
p([
  _()
], s.prototype, "config", 2);
s = p([
  C("iconpicker-property-editor-ui")
], s);
export {
  s as default
};
//# sourceMappingURL=iconpicker-property-editor-ui.element.js.map
