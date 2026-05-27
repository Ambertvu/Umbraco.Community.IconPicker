import { LitElement as E, html as m, property as y, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { UmbChangeEvent as b } from "@umbraco-cms/backoffice/event";
import { UMB_MODAL_MANAGER_CONTEXT as O } from "@umbraco-cms/backoffice/modal";
import { UMB_STATIC_FILE_PICKER_MODAL as U } from "@umbraco-cms/backoffice/static-file";
import { UmbServerFilePathUniqueSerializer as W } from "@umbraco-cms/backoffice/server-file-system";
var A = Object.defineProperty, R = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, w = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? R(t, i) : t, u = e.length - 1, h; u >= 0; u--)
    (h = e[u]) && (r = (a ? h(t, i, r) : h(r)) || r);
  return a && r && A(t, i, r), r;
}, f = (e, t, i) => t.has(e) || d("Cannot " + i), l = (e, t, i) => (f(e, t, "read from private field"), t.get(e)), p = (e, t, i) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), T = (e, t, i, a) => (f(e, t, "write to private field"), t.set(e, i), i), n = (e, t, i) => (f(e, t, "access private method"), i), c, s, o, _, P, S, C, k;
let v = class extends g(E) {
  constructor() {
    super(), p(this, o), this.value = "", p(this, c, new W()), p(this, s), this.consumeContext(O, (e) => {
      T(this, s, e);
    });
  }
  render() {
    return this.value ? m`
            <uui-ref-node name=${this.value}>
                <uui-icon slot="icon" name="icon-file"></uui-icon>
                <uui-action-bar slot="actions">
                    <uui-button
                        look="secondary"
                        label="Remove"
                        @click=${n(this, o, k)}>
                        Remove
                    </uui-button>
                </uui-action-bar>
            </uui-ref-node>
        ` : m`
                <uui-button
                    look="placeholder"
                    label="Select sprite"
                    style="width: 100%;"
                    @click=${n(this, o, C)}>
                    Select sprite
                </uui-button>
            `;
  }
};
c = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
_ = function() {
  this.dispatchEvent(new b());
};
P = function(e) {
  let t = e.trim().replace(/^\/+/, "");
  return t && !t.startsWith("wwwroot/") && (t = `wwwroot/${t}`), t;
};
S = function(e) {
  let t = e.trim().replace(/^\/+/, "");
  return t.startsWith("wwwroot/") && (t = t.substring(8)), t ? `/${t}` : "";
};
C = async function() {
  var i;
  if (!l(this, s)) return;
  const e = this.value ? n(this, o, P).call(this, this.value) : "", t = l(this, s).open(this, U, {
    data: {
      multiple: !1,
      pickableFilter: (a) => {
        var r;
        return !a.isFolder && (((r = a.name) == null ? void 0 : r.toLowerCase().endsWith(".svg")) ?? !1);
      },
      hideTreeRoot: !0
    },
    value: {
      selection: e ? [l(this, c).toUnique(e)] : []
    }
  });
  try {
    const a = await t.onSubmit(), r = (i = a == null ? void 0 : a.selection) == null ? void 0 : i[0];
    this.value = r ? n(this, o, S).call(this, l(this, c).toServerPath(r) || "") : "", n(this, o, _).call(this);
  } catch {
  }
};
k = function() {
  this.value = "", n(this, o, _).call(this);
};
w([
  y({ type: String })
], v.prototype, "value", 2);
v = w([
  M("sprite-picker-property-editor-ui")
], v);
export {
  v as SpritePicker
};
//# sourceMappingURL=sprite-picker-property-editor-ui.element.js.map
