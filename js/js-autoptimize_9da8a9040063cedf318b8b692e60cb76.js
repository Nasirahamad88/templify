(() => {
  "use strict";
  var t = {
      d: (e, n) => {
        for (var r in n)
          t.o(n, r) &&
            !t.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      },
    },
    e = {};
  t.r(e),
    t.d(e, {
      actions: () => S,
      addAction: () => m,
      addFilter: () => p,
      applyFilters: () => k,
      createHooks: () => h,
      currentAction: () => w,
      currentFilter: () => I,
      defaultHooks: () => f,
      didAction: () => O,
      didFilter: () => j,
      doAction: () => b,
      doingAction: () => x,
      doingFilter: () => T,
      filters: () => z,
      hasAction: () => v,
      hasFilter: () => y,
      removeAction: () => A,
      removeAllActions: () => F,
      removeAllFilters: () => g,
      removeFilter: () => _,
    });
  const n = function (t) {
      return "string" != typeof t || "" === t
        ? (console.error("The namespace must be a non-empty string."), !1)
        : !!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(t) ||
            (console.error(
              "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
            ),
            !1);
    },
    r = function (t) {
      return "string" != typeof t || "" === t
        ? (console.error("The hook name must be a non-empty string."), !1)
        : /^__/.test(t)
        ? (console.error("The hook name cannot begin with `__`."), !1)
        : !!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(t) ||
          (console.error(
            "The hook name can only contain numbers, letters, dashes, periods and underscores."
          ),
          !1);
    },
    o = function (t, e) {
      return function (o, i, s, c = 10) {
        const l = t[e];
        if (!r(o)) return;
        if (!n(i)) return;
        if ("function" != typeof s)
          return void console.error("The hook callback must be a function.");
        if ("number" != typeof c)
          return void console.error(
            "If specified, the hook priority must be a number."
          );
        const u = { callback: s, priority: c, namespace: i };
        if (l[o]) {
          const t = l[o].handlers;
          let e;
          for (e = t.length; e > 0 && !(c >= t[e - 1].priority); e--);
          e === t.length ? (t[e] = u) : t.splice(e, 0, u),
            l.__current.forEach((t) => {
              t.name === o && t.currentIndex >= e && t.currentIndex++;
            });
        } else l[o] = { handlers: [u], runs: 0 };
        "hookAdded" !== o && t.doAction("hookAdded", o, i, s, c);
      };
    },
    i = function (t, e, o = !1) {
      return function (i, s) {
        const c = t[e];
        if (!r(i)) return;
        if (!o && !n(s)) return;
        if (!c[i]) return 0;
        let l = 0;
        if (o)
          (l = c[i].handlers.length),
            (c[i] = { runs: c[i].runs, handlers: [] });
        else {
          const t = c[i].handlers;
          for (let e = t.length - 1; e >= 0; e--)
            t[e].namespace === s &&
              (t.splice(e, 1),
              l++,
              c.__current.forEach((t) => {
                t.name === i && t.currentIndex >= e && t.currentIndex--;
              }));
        }
        return "hookRemoved" !== i && t.doAction("hookRemoved", i, s), l;
      };
    },
    s = function (t, e) {
      return function (n, r) {
        const o = t[e];
        return void 0 !== r
          ? n in o && o[n].handlers.some((t) => t.namespace === r)
          : n in o;
      };
    },
    c = function (t, e, n = !1) {
      return function (r, ...o) {
        const i = t[e];
        i[r] || (i[r] = { handlers: [], runs: 0 }), i[r].runs++;
        const s = i[r].handlers;
        if (!s || !s.length) return n ? o[0] : void 0;
        const c = { name: r, currentIndex: 0 };
        for (i.__current.push(c); c.currentIndex < s.length; ) {
          const t = s[c.currentIndex].callback.apply(null, o);
          n && (o[0] = t), c.currentIndex++;
        }
        return i.__current.pop(), n ? o[0] : void 0;
      };
    },
    l = function (t, e) {
      return function () {
        var n;
        const r = t[e];
        return null !== (n = r.__current[r.__current.length - 1]?.name) &&
          void 0 !== n
          ? n
          : null;
      };
    },
    u = function (t, e) {
      return function (n) {
        const r = t[e];
        return void 0 === n
          ? void 0 !== r.__current[0]
          : !!r.__current[0] && n === r.__current[0].name;
      };
    },
    a = function (t, e) {
      return function (n) {
        const o = t[e];
        if (r(n)) return o[n] && o[n].runs ? o[n].runs : 0;
      };
    };
  class d {
    constructor() {
      (this.actions = Object.create(null)),
        (this.actions.__current = []),
        (this.filters = Object.create(null)),
        (this.filters.__current = []),
        (this.addAction = o(this, "actions")),
        (this.addFilter = o(this, "filters")),
        (this.removeAction = i(this, "actions")),
        (this.removeFilter = i(this, "filters")),
        (this.hasAction = s(this, "actions")),
        (this.hasFilter = s(this, "filters")),
        (this.removeAllActions = i(this, "actions", !0)),
        (this.removeAllFilters = i(this, "filters", !0)),
        (this.doAction = c(this, "actions")),
        (this.applyFilters = c(this, "filters", !0)),
        (this.currentAction = l(this, "actions")),
        (this.currentFilter = l(this, "filters")),
        (this.doingAction = u(this, "actions")),
        (this.doingFilter = u(this, "filters")),
        (this.didAction = a(this, "actions")),
        (this.didFilter = a(this, "filters"));
    }
  }
  const h = function () {
      return new d();
    },
    f = h(),
    {
      addAction: m,
      addFilter: p,
      removeAction: A,
      removeFilter: _,
      hasAction: v,
      hasFilter: y,
      removeAllActions: F,
      removeAllFilters: g,
      doAction: b,
      applyFilters: k,
      currentAction: w,
      currentFilter: I,
      doingAction: x,
      doingFilter: T,
      didAction: O,
      didFilter: j,
      actions: S,
      filters: z,
    } = f;
  (window.wp = window.wp || {}).hooks = e;
})();
(() => {
  var t = {
      124: (t, e, r) => {
        var n;
        !(function () {
          "use strict";
          var a = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder:
              /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[\+\-]/,
          };
          function i(t) {
            return (function (t, e) {
              var r,
                n,
                o,
                s,
                l,
                u,
                p,
                c,
                f,
                d = 1,
                g = t.length,
                h = "";
              for (n = 0; n < g; n++)
                if ("string" == typeof t[n]) h += t[n];
                else if (Array.isArray(t[n])) {
                  if ((s = t[n])[2])
                    for (r = e[d], o = 0; o < s[2].length; o++) {
                      if (!r.hasOwnProperty(s[2][o]))
                        throw new Error(
                          i('[sprintf] property "%s" does not exist', s[2][o])
                        );
                      r = r[s[2][o]];
                    }
                  else r = s[1] ? e[s[1]] : e[d++];
                  if (
                    (a.not_type.test(s[8]) &&
                      a.not_primitive.test(s[8]) &&
                      r instanceof Function &&
                      (r = r()),
                    a.numeric_arg.test(s[8]) &&
                      "number" != typeof r &&
                      isNaN(r))
                  )
                    throw new TypeError(
                      i("[sprintf] expecting number but found %T", r)
                    );
                  switch ((a.number.test(s[8]) && (c = r >= 0), s[8])) {
                    case "b":
                      r = parseInt(r, 10).toString(2);
                      break;
                    case "c":
                      r = String.fromCharCode(parseInt(r, 10));
                      break;
                    case "d":
                    case "i":
                      r = parseInt(r, 10);
                      break;
                    case "j":
                      r = JSON.stringify(r, null, s[6] ? parseInt(s[6]) : 0);
                      break;
                    case "e":
                      r = s[7]
                        ? parseFloat(r).toExponential(s[7])
                        : parseFloat(r).toExponential();
                      break;
                    case "f":
                      r = s[7] ? parseFloat(r).toFixed(s[7]) : parseFloat(r);
                      break;
                    case "g":
                      r = s[7]
                        ? String(Number(r.toPrecision(s[7])))
                        : parseFloat(r);
                      break;
                    case "o":
                      r = (parseInt(r, 10) >>> 0).toString(8);
                      break;
                    case "s":
                      (r = String(r)), (r = s[7] ? r.substring(0, s[7]) : r);
                      break;
                    case "t":
                      (r = String(!!r)), (r = s[7] ? r.substring(0, s[7]) : r);
                      break;
                    case "T":
                      (r = Object.prototype.toString
                        .call(r)
                        .slice(8, -1)
                        .toLowerCase()),
                        (r = s[7] ? r.substring(0, s[7]) : r);
                      break;
                    case "u":
                      r = parseInt(r, 10) >>> 0;
                      break;
                    case "v":
                      (r = r.valueOf()), (r = s[7] ? r.substring(0, s[7]) : r);
                      break;
                    case "x":
                      r = (parseInt(r, 10) >>> 0).toString(16);
                      break;
                    case "X":
                      r = (parseInt(r, 10) >>> 0).toString(16).toUpperCase();
                  }
                  a.json.test(s[8])
                    ? (h += r)
                    : (!a.number.test(s[8]) || (c && !s[3])
                        ? (f = "")
                        : ((f = c ? "+" : "-"),
                          (r = r.toString().replace(a.sign, ""))),
                      (u = s[4] ? ("0" === s[4] ? "0" : s[4].charAt(1)) : " "),
                      (p = s[6] - (f + r).length),
                      (l = s[6] && p > 0 ? u.repeat(p) : ""),
                      (h += s[5]
                        ? f + r + l
                        : "0" === u
                        ? f + l + r
                        : l + f + r));
                }
              return h;
            })(
              (function (t) {
                if (s[t]) return s[t];
                for (var e, r = t, n = [], i = 0; r; ) {
                  if (null !== (e = a.text.exec(r))) n.push(e[0]);
                  else if (null !== (e = a.modulo.exec(r))) n.push("%");
                  else {
                    if (null === (e = a.placeholder.exec(r)))
                      throw new SyntaxError("[sprintf] unexpected placeholder");
                    if (e[2]) {
                      i |= 1;
                      var o = [],
                        l = e[2],
                        u = [];
                      if (null === (u = a.key.exec(l)))
                        throw new SyntaxError(
                          "[sprintf] failed to parse named argument key"
                        );
                      for (
                        o.push(u[1]);
                        "" !== (l = l.substring(u[0].length));

                      )
                        if (null !== (u = a.key_access.exec(l))) o.push(u[1]);
                        else {
                          if (null === (u = a.index_access.exec(l)))
                            throw new SyntaxError(
                              "[sprintf] failed to parse named argument key"
                            );
                          o.push(u[1]);
                        }
                      e[2] = o;
                    } else i |= 2;
                    if (3 === i)
                      throw new Error(
                        "[sprintf] mixing positional and named placeholders is not (yet) supported"
                      );
                    n.push(e);
                  }
                  r = r.substring(e[0].length);
                }
                return (s[t] = n);
              })(t),
              arguments
            );
          }
          function o(t, e) {
            return i.apply(null, [t].concat(e || []));
          }
          var s = Object.create(null);
          (e.sprintf = i),
            (e.vsprintf = o),
            "undefined" != typeof window &&
              ((window.sprintf = i),
              (window.vsprintf = o),
              void 0 ===
                (n = function () {
                  return { sprintf: i, vsprintf: o };
                }.call(e, r, e, t)) || (t.exports = n));
        })();
      },
    },
    e = {};
  function r(n) {
    var a = e[n];
    if (void 0 !== a) return a.exports;
    var i = (e[n] = { exports: {} });
    return t[n](i, i.exports, r), i.exports;
  }
  (r.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return r.d(e, { a: e }), e;
  }),
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    });
  var n = {};
  (() => {
    "use strict";
    r.r(n),
      r.d(n, {
        __: () => __,
        _n: () => _n,
        _nx: () => _nx,
        _x: () => _x,
        createI18n: () => h,
        defaultI18n: () => v,
        getLocaleData: () => _,
        hasTranslation: () => k,
        isRTL: () => F,
        resetLocaleData: () => m,
        setLocaleData: () => y,
        sprintf: () => i,
        subscribe: () => w,
      });
    var t = r(124),
      e = r.n(t);
    const a = (function (t, e) {
      var r,
        n,
        a = 0;
      function i() {
        var i,
          o,
          s = r,
          l = arguments.length;
        t: for (; s; ) {
          if (s.args.length === arguments.length) {
            for (o = 0; o < l; o++)
              if (s.args[o] !== arguments[o]) {
                s = s.next;
                continue t;
              }
            return (
              s !== r &&
                (s === n && (n = s.prev),
                (s.prev.next = s.next),
                s.next && (s.next.prev = s.prev),
                (s.next = r),
                (s.prev = null),
                (r.prev = s),
                (r = s)),
              s.val
            );
          }
          s = s.next;
        }
        for (i = new Array(l), o = 0; o < l; o++) i[o] = arguments[o];
        return (
          (s = { args: i, val: t.apply(null, i) }),
          r ? ((r.prev = s), (s.next = r)) : (n = s),
          a === e.maxSize ? ((n = n.prev).next = null) : a++,
          (r = s),
          s.val
        );
      }
      return (
        (e = e || {}),
        (i.clear = function () {
          (r = null), (n = null), (a = 0);
        }),
        i
      );
    })(console.error);
    function i(t, ...r) {
      try {
        return e().sprintf(t, ...r);
      } catch (e) {
        return e instanceof Error && a("sprintf error: \n\n" + e.toString()), t;
      }
    }
    var o, s, l, u;
    (o = {
      "(": 9,
      "!": 8,
      "*": 7,
      "/": 7,
      "%": 7,
      "+": 6,
      "-": 6,
      "<": 5,
      "<=": 5,
      ">": 5,
      ">=": 5,
      "==": 4,
      "!=": 4,
      "&&": 3,
      "||": 2,
      "?": 1,
      "?:": 1,
    }),
      (s = ["(", "?"]),
      (l = { ")": ["("], ":": ["?", "?:"] }),
      (u = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/);
    var p = {
      "!": function (t) {
        return !t;
      },
      "*": function (t, e) {
        return t * e;
      },
      "/": function (t, e) {
        return t / e;
      },
      "%": function (t, e) {
        return t % e;
      },
      "+": function (t, e) {
        return t + e;
      },
      "-": function (t, e) {
        return t - e;
      },
      "<": function (t, e) {
        return t < e;
      },
      "<=": function (t, e) {
        return t <= e;
      },
      ">": function (t, e) {
        return t > e;
      },
      ">=": function (t, e) {
        return t >= e;
      },
      "==": function (t, e) {
        return t === e;
      },
      "!=": function (t, e) {
        return t !== e;
      },
      "&&": function (t, e) {
        return t && e;
      },
      "||": function (t, e) {
        return t || e;
      },
      "?:": function (t, e, r) {
        if (t) throw e;
        return r;
      },
    };
    var c = { contextDelimiter: "", onMissingKey: null };
    function f(t, e) {
      var r;
      for (r in ((this.data = t),
      (this.pluralForms = {}),
      (this.options = {}),
      c))
        this.options[r] = void 0 !== e && r in e ? e[r] : c[r];
    }
    (f.prototype.getPluralForm = function (t, e) {
      var r,
        n,
        a,
        i,
        c = this.pluralForms[t];
      return (
        c ||
          ("function" !=
            typeof (a =
              (r = this.data[t][""])["Plural-Forms"] ||
              r["plural-forms"] ||
              r.plural_forms) &&
            ((n = (function (t) {
              var e, r, n;
              for (e = t.split(";"), r = 0; r < e.length; r++)
                if (0 === (n = e[r].trim()).indexOf("plural="))
                  return n.substr(7);
            })(r["Plural-Forms"] || r["plural-forms"] || r.plural_forms)),
            (i = (function (t) {
              var e = (function (t) {
                for (var e, r, n, a, i = [], p = []; (e = t.match(u)); ) {
                  for (
                    r = e[0], (n = t.substr(0, e.index).trim()) && i.push(n);
                    (a = p.pop());

                  ) {
                    if (l[r]) {
                      if (l[r][0] === a) {
                        r = l[r][1] || r;
                        break;
                      }
                    } else if (s.indexOf(a) >= 0 || o[a] < o[r]) {
                      p.push(a);
                      break;
                    }
                    i.push(a);
                  }
                  l[r] || p.push(r), (t = t.substr(e.index + r.length));
                }
                return (t = t.trim()) && i.push(t), i.concat(p.reverse());
              })(t);
              return function (t) {
                return (function (t, e) {
                  var r,
                    n,
                    a,
                    i,
                    o,
                    s,
                    l = [];
                  for (r = 0; r < t.length; r++) {
                    if (((o = t[r]), (i = p[o]))) {
                      for (n = i.length, a = Array(n); n--; ) a[n] = l.pop();
                      try {
                        s = i.apply(null, a);
                      } catch (t) {
                        return t;
                      }
                    } else s = e.hasOwnProperty(o) ? e[o] : +o;
                    l.push(s);
                  }
                  return l[0];
                })(e, t);
              };
            })(n)),
            (a = function (t) {
              return +i({ n: t });
            })),
          (c = this.pluralForms[t] = a)),
        c(e)
      );
    }),
      (f.prototype.dcnpgettext = function (t, e, r, n, a) {
        var i, o, s;
        return (
          (i = void 0 === a ? 0 : this.getPluralForm(t, a)),
          (o = r),
          e && (o = e + this.options.contextDelimiter + r),
          (s = this.data[t][o]) && s[i]
            ? s[i]
            : (this.options.onMissingKey && this.options.onMissingKey(r, t),
              0 === i ? r : n)
        );
      });
    const d = { plural_forms: (t) => (1 === t ? 0 : 1) },
      g = /^i18n\.(n?gettext|has_translation)(_|$)/,
      h = (t, e, r) => {
        const n = new f({}),
          a = new Set(),
          i = () => {
            a.forEach((t) => t());
          },
          o = (t, e = "default") => {
            (n.data[e] = { ...n.data[e], ...t }),
              (n.data[e][""] = { ...d, ...n.data[e]?.[""] }),
              delete n.pluralForms[e];
          },
          s = (t, e) => {
            o(t, e), i();
          },
          l = (t = "default", e, r, a, i) => (
            n.data[t] || o(void 0, t), n.dcnpgettext(t, e, r, a, i)
          ),
          u = (t = "default") => t,
          _x = (t, e, n) => {
            let a = l(n, e, t);
            return r
              ? ((a = r.applyFilters("i18n.gettext_with_context", a, t, e, n)),
                r.applyFilters("i18n.gettext_with_context_" + u(n), a, t, e, n))
              : a;
          };
        if ((t && s(t, e), r)) {
          const t = (t) => {
            g.test(t) && i();
          };
          r.addAction("hookAdded", "core/i18n", t),
            r.addAction("hookRemoved", "core/i18n", t);
        }
        return {
          getLocaleData: (t = "default") => n.data[t],
          setLocaleData: s,
          addLocaleData: (t, e = "default") => {
            (n.data[e] = {
              ...n.data[e],
              ...t,
              "": { ...d, ...n.data[e]?.[""], ...t?.[""] },
            }),
              delete n.pluralForms[e],
              i();
          },
          resetLocaleData: (t, e) => {
            (n.data = {}), (n.pluralForms = {}), s(t, e);
          },
          subscribe: (t) => (a.add(t), () => a.delete(t)),
          __: (t, e) => {
            let n = l(e, void 0, t);
            return r
              ? ((n = r.applyFilters("i18n.gettext", n, t, e)),
                r.applyFilters("i18n.gettext_" + u(e), n, t, e))
              : n;
          },
          _x,
          _n: (t, e, n, a) => {
            let i = l(a, void 0, t, e, n);
            return r
              ? ((i = r.applyFilters("i18n.ngettext", i, t, e, n, a)),
                r.applyFilters("i18n.ngettext_" + u(a), i, t, e, n, a))
              : i;
          },
          _nx: (t, e, n, a, i) => {
            let o = l(i, a, t, e, n);
            return r
              ? ((o = r.applyFilters(
                  "i18n.ngettext_with_context",
                  o,
                  t,
                  e,
                  n,
                  a,
                  i
                )),
                r.applyFilters(
                  "i18n.ngettext_with_context_" + u(i),
                  o,
                  t,
                  e,
                  n,
                  a,
                  i
                ))
              : o;
          },
          isRTL: () => "rtl" === _x("ltr", "text direction"),
          hasTranslation: (t, e, a) => {
            const i = e ? e + "" + t : t;
            let o = !!n.data?.[null != a ? a : "default"]?.[i];
            return (
              r &&
                ((o = r.applyFilters("i18n.has_translation", o, t, e, a)),
                (o = r.applyFilters(
                  "i18n.has_translation_" + u(a),
                  o,
                  t,
                  e,
                  a
                ))),
              o
            );
          },
        };
      },
      x = window.wp.hooks,
      b = h(void 0, void 0, x.defaultHooks),
      v = b,
      _ = b.getLocaleData.bind(b),
      y = b.setLocaleData.bind(b),
      m = b.resetLocaleData.bind(b),
      w = b.subscribe.bind(b),
      __ = b.__.bind(b),
      _x = b._x.bind(b),
      _n = b._n.bind(b),
      _nx = b._nx.bind(b),
      F = b.isRTL.bind(b),
      k = b.hasTranslation.bind(b);
  })(),
    ((window.wp = window.wp || {}).i18n = n);
})();
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
          {}),
        t.jQuery,
        t.Popper
      );
})(this, function (t, e, i) {
  "use strict";
  function o(t) {
    return t && "object" == typeof t && "default" in t ? t : { default: t };
  }
  var c = o(e),
    s = o(i);
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, o.key, o);
    }
  }
  function l(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function r() {
    return (r =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var i,
            o = arguments[e];
          for (i in o)
            Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
        }
        return t;
      }).apply(this, arguments);
  }
  function a(t, e) {
    return (a =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  var d = "transitionend",
    u = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t;
      },
      getSelectorFromElement: function (t) {
        var e,
          i = t.getAttribute("data-target");
        (i && "#" !== i) ||
          (i = (e = t.getAttribute("href")) && "#" !== e ? e.trim() : "");
        try {
          return document.querySelector(i) ? i : null;
        } catch (t) {
          return null;
        }
      },
      getTransitionDurationFromElement: function (t) {
        if (!t) return 0;
        var e = c.default(t).css("transition-duration"),
          i = c.default(t).css("transition-delay"),
          o = parseFloat(e),
          t = parseFloat(i);
        return o || t
          ? ((e = e.split(",")[0]),
            (i = i.split(",")[0]),
            1e3 * (parseFloat(e) + parseFloat(i)))
          : 0;
      },
      reflow: function (t) {
        return t.offsetHeight;
      },
      triggerTransitionEnd: function (t) {
        c.default(t).trigger(d);
      },
      supportsTransitionEnd: function () {
        return Boolean(d);
      },
      isElement: function (t) {
        return (t[0] || t).nodeType;
      },
      typeCheckConfig: function (t, e, i) {
        for (var o in i)
          if (Object.prototype.hasOwnProperty.call(i, o)) {
            var s = i[o],
              n = e[o],
              n =
                n && u.isElement(n)
                  ? "element"
                  : null === n || void 0 === n
                  ? "" + n
                  : {}.toString
                      .call(n)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
            if (!new RegExp(s).test(n))
              throw new Error(
                t.toUpperCase() +
                  ': Option "' +
                  o +
                  '" provided type "' +
                  n +
                  '" but expected type "' +
                  s +
                  '".'
              );
          }
      },
      findShadowRoot: function (t) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" != typeof t.getRootNode)
          return t instanceof ShadowRoot
            ? t
            : t.parentNode
            ? u.findShadowRoot(t.parentNode)
            : null;
        t = t.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      },
      jQueryDetection: function () {
        if (void 0 === c.default)
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var t = c.default.fn.jquery.split(" ")[0].split(".");
        if (
          (t[0] < 2 && t[1] < 9) ||
          (1 === t[0] && 9 === t[1] && t[2] < 1) ||
          4 <= t[0]
        )
          throw new Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      },
    };
  u.jQueryDetection(),
    (c.default.fn.emulateTransitionEnd = function (t) {
      var e = this,
        i = !1;
      return (
        c.default(this).one(u.TRANSITION_END, function () {
          i = !0;
        }),
        setTimeout(function () {
          i || u.triggerTransitionEnd(e);
        }, t),
        this
      );
    }),
    (c.default.event.special[u.TRANSITION_END] = {
      bindType: d,
      delegateType: d,
      handle: function (t) {
        if (c.default(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var h = "bs.alert",
    f = c.default.fn.alert,
    p =
      (((st = g.prototype).close = function (t) {
        var e = this._element;
        t && (e = this._getRootElement(t)),
          this._triggerCloseEvent(e).isDefaultPrevented() ||
            this._removeElement(e);
      }),
      (st.dispose = function () {
        c.default.removeData(this._element, h), (this._element = null);
      }),
      (st._getRootElement = function (t) {
        var e = u.getSelectorFromElement(t),
          i = !1;
        return (i =
          (i = e ? document.querySelector(e) : i) ||
          c.default(t).closest(".alert")[0]);
      }),
      (st._triggerCloseEvent = function (t) {
        var e = c.default.Event("close.bs.alert");
        return c.default(t).trigger(e), e;
      }),
      (st._removeElement = function (e) {
        var t,
          i = this;
        c.default(e).removeClass("show"),
          c.default(e).hasClass("fade")
            ? ((t = u.getTransitionDurationFromElement(e)),
              c
                .default(e)
                .one(u.TRANSITION_END, function (t) {
                  return i._destroyElement(e, t);
                })
                .emulateTransitionEnd(t))
            : this._destroyElement(e);
      }),
      (st._destroyElement = function (t) {
        c.default(t).detach().trigger("closed.bs.alert").remove();
      }),
      (g._jQueryInterface = function (i) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(h);
          e || ((e = new g(this)), t.data(h, e)), "close" === i && e[i](this);
        });
      }),
      (g._handleDismiss = function (e) {
        return function (t) {
          t && t.preventDefault(), e.close(this);
        };
      }),
      l(g, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]),
      g);
  function g(t) {
    this._element = t;
  }
  c
    .default(document)
    .on(
      "click.bs.alert.data-api",
      '[data-dismiss="alert"]',
      p._handleDismiss(new p())
    ),
    (c.default.fn.alert = p._jQueryInterface),
    (c.default.fn.alert.Constructor = p),
    (c.default.fn.alert.noConflict = function () {
      return (c.default.fn.alert = f), p._jQueryInterface;
    });
  var m = "bs.button",
    v = c.default.fn.button,
    _ = "active",
    e = '[data-toggle^="button"]',
    y = 'input:not([type="hidden"])',
    b = ".btn",
    w =
      (((i = T.prototype).toggle = function () {
        var t,
          e = !0,
          i = !0,
          o = c.default(this._element).closest('[data-toggle="buttons"]')[0];
        !o ||
          ((t = this._element.querySelector(y)) &&
            ("radio" === t.type &&
              (t.checked && this._element.classList.contains(_)
                ? (e = !1)
                : (o = o.querySelector(".active")) &&
                  c.default(o).removeClass(_)),
            e &&
              (("checkbox" !== t.type && "radio" !== t.type) ||
                (t.checked = !this._element.classList.contains(_)),
              this.shouldAvoidTriggerChange || c.default(t).trigger("change")),
            t.focus(),
            (i = !1))),
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (i &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains(_)
              ),
            e && c.default(this._element).toggleClass(_));
      }),
      (i.dispose = function () {
        c.default.removeData(this._element, m), (this._element = null);
      }),
      (T._jQueryInterface = function (i, o) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(m);
          e || ((e = new T(this)), t.data(m, e)),
            (e.shouldAvoidTriggerChange = o),
            "toggle" === i && e[i]();
        });
      }),
      l(T, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]),
      T);
  function T(t) {
    (this._element = t), (this.shouldAvoidTriggerChange = !1);
  }
  c
    .default(document)
    .on("click.bs.button.data-api", e, function (t) {
      var e,
        i = t.target,
        o = i;
      !(i = !c.default(i).hasClass("btn") ? c.default(i).closest(b)[0] : i) ||
      i.hasAttribute("disabled") ||
      i.classList.contains("disabled") ||
      ((e = i.querySelector(y)) &&
        (e.hasAttribute("disabled") || e.classList.contains("disabled")))
        ? t.preventDefault()
        : ("INPUT" !== o.tagName && "LABEL" === i.tagName) ||
          w._jQueryInterface.call(
            c.default(i),
            "toggle",
            "INPUT" === o.tagName
          );
    })
    .on("focus.bs.button.data-api blur.bs.button.data-api", e, function (t) {
      var e = c.default(t.target).closest(b)[0];
      c.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
    }),
    c.default(window).on("load.bs.button.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-toggle="buttons"] .btn')
          ),
          e = 0,
          i = t.length;
        e < i;
        e++
      ) {
        var o = t[e],
          s = o.querySelector(y);
        s.checked || s.hasAttribute("checked")
          ? o.classList.add(_)
          : o.classList.remove(_);
      }
      for (
        var n = 0,
          l = (t = [].slice.call(
            document.querySelectorAll('[data-toggle="button"]')
          )).length;
        n < l;
        n++
      ) {
        var r = t[n];
        "true" === r.getAttribute("aria-pressed")
          ? r.classList.add(_)
          : r.classList.remove(_);
      }
    }),
    (c.default.fn.button = w._jQueryInterface),
    (c.default.fn.button.Constructor = w),
    (c.default.fn.button.noConflict = function () {
      return (c.default.fn.button = v), w._jQueryInterface;
    });
  var k = "carousel",
    S = "bs.carousel",
    C = c.default.fn[k],
    E = "active",
    $ = "next",
    A = "prev",
    x = "slid.bs.carousel",
    I = ".active.carousel-item",
    D = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    O = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    N = { TOUCH: "touch", PEN: "pen" },
    P =
      (((st = j.prototype).next = function () {
        this._isSliding || this._slide($);
      }),
      (st.nextWhenVisible = function () {
        var t = c.default(this._element);
        !document.hidden &&
          t.is(":visible") &&
          "hidden" !== t.css("visibility") &&
          this.next();
      }),
      (st.prev = function () {
        this._isSliding || this._slide(A);
      }),
      (st.pause = function (t) {
        t || (this._isPaused = !0),
          this._element.querySelector(
            ".carousel-item-next, .carousel-item-prev"
          ) && (u.triggerTransitionEnd(this._element), this.cycle(!0)),
          clearInterval(this._interval),
          (this._interval = null);
      }),
      (st.cycle = function (t) {
        t || (this._isPaused = !1),
          this._interval &&
            (clearInterval(this._interval), (this._interval = null)),
          this._config.interval &&
            !this._isPaused &&
            (this._updateInterval(),
            (this._interval = setInterval(
              (document.visibilityState
                ? this.nextWhenVisible
                : this.next
              ).bind(this),
              this._config.interval
            )));
      }),
      (st.to = function (t) {
        var e = this;
        this._activeElement = this._element.querySelector(I);
        var i = this._getItemIndex(this._activeElement);
        if (!(t > this._items.length - 1 || t < 0))
          if (this._isSliding)
            c.default(this._element).one(x, function () {
              return e.to(t);
            });
          else {
            if (i === t) return this.pause(), void this.cycle();
            this._slide(i < t ? $ : A, this._items[t]);
          }
      }),
      (st.dispose = function () {
        c.default(this._element).off(".bs.carousel"),
          c.default.removeData(this._element, S),
          (this._items = null),
          (this._config = null),
          (this._element = null),
          (this._interval = null),
          (this._isPaused = null),
          (this._isSliding = null),
          (this._activeElement = null),
          (this._indicatorsElement = null);
      }),
      (st._getConfig = function (t) {
        return (t = r({}, D, t)), u.typeCheckConfig(k, t, O), t;
      }),
      (st._handleSwipe = function () {
        var t = Math.abs(this.touchDeltaX);
        t <= 40 ||
          ((t = t / this.touchDeltaX),
          (this.touchDeltaX = 0) < t && this.prev(),
          t < 0 && this.next());
      }),
      (st._addEventListeners = function () {
        var e = this;
        this._config.keyboard &&
          c.default(this._element).on("keydown.bs.carousel", function (t) {
            return e._keydown(t);
          }),
          "hover" === this._config.pause &&
            c
              .default(this._element)
              .on("mouseenter.bs.carousel", function (t) {
                return e.pause(t);
              })
              .on("mouseleave.bs.carousel", function (t) {
                return e.cycle(t);
              }),
          this._config.touch && this._addTouchEventListeners();
      }),
      (st._addTouchEventListeners = function () {
        var t,
          e,
          i = this;
        this._touchSupported &&
          ((t = function (t) {
            i._pointerEvent && N[t.originalEvent.pointerType.toUpperCase()]
              ? (i.touchStartX = t.originalEvent.clientX)
              : i._pointerEvent ||
                (i.touchStartX = t.originalEvent.touches[0].clientX);
          }),
          (e = function (t) {
            i._pointerEvent &&
              N[t.originalEvent.pointerType.toUpperCase()] &&
              (i.touchDeltaX = t.originalEvent.clientX - i.touchStartX),
              i._handleSwipe(),
              "hover" === i._config.pause &&
                (i.pause(),
                i.touchTimeout && clearTimeout(i.touchTimeout),
                (i.touchTimeout = setTimeout(function (t) {
                  return i.cycle(t);
                }, 500 + i._config.interval)));
          }),
          c
            .default(this._element.querySelectorAll(".carousel-item img"))
            .on("dragstart.bs.carousel", function (t) {
              return t.preventDefault();
            }),
          this._pointerEvent
            ? (c.default(this._element).on("pointerdown.bs.carousel", t),
              c.default(this._element).on("pointerup.bs.carousel", e),
              this._element.classList.add("pointer-event"))
            : (c.default(this._element).on("touchstart.bs.carousel", t),
              c
                .default(this._element)
                .on("touchmove.bs.carousel", function (t) {
                  i.touchDeltaX =
                    t.originalEvent.touches &&
                    1 < t.originalEvent.touches.length
                      ? 0
                      : t.originalEvent.touches[0].clientX - i.touchStartX;
                }),
              c.default(this._element).on("touchend.bs.carousel", e)));
      }),
      (st._keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName))
          switch (t.which) {
            case 37:
              t.preventDefault(), this.prev();
              break;
            case 39:
              t.preventDefault(), this.next();
          }
      }),
      (st._getItemIndex = function (t) {
        return (
          (this._items =
            t && t.parentNode
              ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
              : []),
          this._items.indexOf(t)
        );
      }),
      (st._getItemByDirection = function (t, e) {
        var i = t === $,
          o = t === A,
          s = this._getItemIndex(e),
          n = this._items.length - 1;
        if (((o && 0 === s) || (i && s === n)) && !this._config.wrap) return e;
        t = (s + (t === A ? -1 : 1)) % this._items.length;
        return -1 == t ? this._items[this._items.length - 1] : this._items[t];
      }),
      (st._triggerSlideEvent = function (t, e) {
        var i = this._getItemIndex(t),
          o = this._getItemIndex(this._element.querySelector(I)),
          i = c.default.Event("slide.bs.carousel", {
            relatedTarget: t,
            direction: e,
            from: o,
            to: i,
          });
        return c.default(this._element).trigger(i), i;
      }),
      (st._setActiveIndicatorElement = function (t) {
        var e;
        this._indicatorsElement &&
          ((e = [].slice.call(
            this._indicatorsElement.querySelectorAll(".active")
          )),
          c.default(e).removeClass(E),
          (t = this._indicatorsElement.children[this._getItemIndex(t)]) &&
            c.default(t).addClass(E));
      }),
      (st._updateInterval = function () {
        var t = this._activeElement || this._element.querySelector(I);
        t &&
          ((t = parseInt(t.getAttribute("data-interval"), 10))
            ? ((this._config.defaultInterval =
                this._config.defaultInterval || this._config.interval),
              (this._config.interval = t))
            : (this._config.interval =
                this._config.defaultInterval || this._config.interval));
      }),
      (st._slide = function (t, e) {
        var i,
          o,
          s,
          n = this,
          l = this._element.querySelector(I),
          r = this._getItemIndex(l),
          a = e || (l && this._getItemByDirection(t, l)),
          d = this._getItemIndex(a),
          e = Boolean(this._interval),
          t =
            t === $
              ? ((i = "carousel-item-left"), (o = "carousel-item-next"), "left")
              : ((i = "carousel-item-right"),
                (o = "carousel-item-prev"),
                "right");
        a && c.default(a).hasClass(E)
          ? (this._isSliding = !1)
          : !this._triggerSlideEvent(a, t).isDefaultPrevented() &&
            l &&
            a &&
            ((this._isSliding = !0),
            e && this.pause(),
            this._setActiveIndicatorElement(a),
            (this._activeElement = a),
            (s = c.default.Event(x, {
              relatedTarget: a,
              direction: t,
              from: r,
              to: d,
            })),
            c.default(this._element).hasClass("slide")
              ? (c.default(a).addClass(o),
                u.reflow(a),
                c.default(l).addClass(i),
                c.default(a).addClass(i),
                (d = u.getTransitionDurationFromElement(l)),
                c
                  .default(l)
                  .one(u.TRANSITION_END, function () {
                    c
                      .default(a)
                      .removeClass(i + " " + o)
                      .addClass(E),
                      c.default(l).removeClass("active " + o + " " + i),
                      (n._isSliding = !1),
                      setTimeout(function () {
                        return c.default(n._element).trigger(s);
                      }, 0);
                  })
                  .emulateTransitionEnd(d))
              : (c.default(l).removeClass(E),
                c.default(a).addClass(E),
                (this._isSliding = !1),
                c.default(this._element).trigger(s)),
            e && this.cycle());
      }),
      (j._jQueryInterface = function (o) {
        return this.each(function () {
          var t = c.default(this).data(S),
            e = r({}, D, c.default(this).data());
          "object" == typeof o && (e = r({}, e, o));
          var i = "string" == typeof o ? o : e.slide;
          if (
            (t || ((t = new j(this, e)), c.default(this).data(S, t)),
            "number" == typeof o)
          )
            t.to(o);
          else if ("string" == typeof i) {
            if (void 0 === t[i])
              throw new TypeError('No method named "' + i + '"');
            t[i]();
          } else e.interval && e.ride && (t.pause(), t.cycle());
        });
      }),
      (j._dataApiClickHandler = function (t) {
        var e,
          i,
          o = u.getSelectorFromElement(this);
        !o ||
          ((e = c.default(o)[0]) &&
            c.default(e).hasClass("carousel") &&
            ((i = r({}, c.default(e).data(), c.default(this).data())),
            (o = this.getAttribute("data-slide-to")) && (i.interval = !1),
            j._jQueryInterface.call(c.default(e), i),
            o && c.default(e).data(S).to(o),
            t.preventDefault()));
      }),
      l(j, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return D;
          },
        },
      ]),
      j);
  function j(t, e) {
    (this._items = null),
      (this._interval = null),
      (this._activeElement = null),
      (this._isPaused = !1),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this.touchStartX = 0),
      (this.touchDeltaX = 0),
      (this._config = this._getConfig(e)),
      (this._element = t),
      (this._indicatorsElement = this._element.querySelector(
        ".carousel-indicators"
      )),
      (this._touchSupported =
        "ontouchstart" in document.documentElement ||
        0 < navigator.maxTouchPoints),
      (this._pointerEvent = Boolean(
        window.PointerEvent || window.MSPointerEvent
      )),
      this._addEventListeners();
  }
  c
    .default(document)
    .on(
      "click.bs.carousel.data-api",
      "[data-slide], [data-slide-to]",
      P._dataApiClickHandler
    ),
    c.default(window).on("load.bs.carousel.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-ride="carousel"]')
          ),
          e = 0,
          i = t.length;
        e < i;
        e++
      ) {
        var o = c.default(t[e]);
        P._jQueryInterface.call(o, o.data());
      }
    }),
    (c.default.fn[k] = P._jQueryInterface),
    (c.default.fn[k].Constructor = P),
    (c.default.fn[k].noConflict = function () {
      return (c.default.fn[k] = C), P._jQueryInterface;
    });
  var L = "collapse",
    H = "bs.collapse",
    z = c.default.fn[L],
    M = "show",
    q = "collapse",
    R = "collapsing",
    F = "collapsed",
    W = "width",
    U = '[data-toggle="collapse"]',
    B = { toggle: !0, parent: "" },
    Q = { toggle: "boolean", parent: "(string|element)" },
    X =
      (((i = Y.prototype).toggle = function () {
        c.default(this._element).hasClass(M) ? this.hide() : this.show();
      }),
      (i.show = function () {
        var t,
          e,
          i,
          o,
          s = this;
        this._isTransitioning ||
          c.default(this._element).hasClass(M) ||
          ((o =
            this._parent &&
            0 ===
              (o = [].slice
                .call(this._parent.querySelectorAll(".show, .collapsing"))
                .filter(function (t) {
                  return "string" == typeof s._config.parent
                    ? t.getAttribute("data-parent") === s._config.parent
                    : t.classList.contains(q);
                })).length
              ? null
              : o) &&
            (i = c.default(o).not(this._selector).data(H)) &&
            i._isTransitioning) ||
          ((t = c.default.Event("show.bs.collapse")),
          c.default(this._element).trigger(t),
          t.isDefaultPrevented() ||
            (o &&
              (Y._jQueryInterface.call(
                c.default(o).not(this._selector),
                "hide"
              ),
              i || c.default(o).data(H, null)),
            (e = this._getDimension()),
            c.default(this._element).removeClass(q).addClass(R),
            (this._element.style[e] = 0),
            this._triggerArray.length &&
              c
                .default(this._triggerArray)
                .removeClass(F)
                .attr("aria-expanded", !0),
            this.setTransitioning(!0),
            (i = "scroll" + (e[0].toUpperCase() + e.slice(1))),
            (o = u.getTransitionDurationFromElement(this._element)),
            c
              .default(this._element)
              .one(u.TRANSITION_END, function () {
                c.default(s._element).removeClass(R).addClass("collapse show"),
                  (s._element.style[e] = ""),
                  s.setTransitioning(!1),
                  c.default(s._element).trigger("shown.bs.collapse");
              })
              .emulateTransitionEnd(o),
            (this._element.style[e] = this._element[i] + "px")));
      }),
      (i.hide = function () {
        var t = this;
        if (!this._isTransitioning && c.default(this._element).hasClass(M)) {
          var e = c.default.Event("hide.bs.collapse");
          if ((c.default(this._element).trigger(e), !e.isDefaultPrevented())) {
            e = this._getDimension();
            (this._element.style[e] =
              this._element.getBoundingClientRect()[e] + "px"),
              u.reflow(this._element),
              c.default(this._element).addClass(R).removeClass("collapse show");
            var i = this._triggerArray.length;
            if (0 < i)
              for (var o = 0; o < i; o++) {
                var s = this._triggerArray[o],
                  n = u.getSelectorFromElement(s);
                null !== n &&
                  (c
                    .default([].slice.call(document.querySelectorAll(n)))
                    .hasClass(M) ||
                    c.default(s).addClass(F).attr("aria-expanded", !1));
              }
            this.setTransitioning(!0), (this._element.style[e] = "");
            e = u.getTransitionDurationFromElement(this._element);
            c.default(this._element)
              .one(u.TRANSITION_END, function () {
                t.setTransitioning(!1),
                  c
                    .default(t._element)
                    .removeClass(R)
                    .addClass(q)
                    .trigger("hidden.bs.collapse");
              })
              .emulateTransitionEnd(e);
          }
        }
      }),
      (i.setTransitioning = function (t) {
        this._isTransitioning = t;
      }),
      (i.dispose = function () {
        c.default.removeData(this._element, H),
          (this._config = null),
          (this._parent = null),
          (this._element = null),
          (this._triggerArray = null),
          (this._isTransitioning = null);
      }),
      (i._getConfig = function (t) {
        return (
          ((t = r({}, B, t)).toggle = Boolean(t.toggle)),
          u.typeCheckConfig(L, t, Q),
          t
        );
      }),
      (i._getDimension = function () {
        return c.default(this._element).hasClass(W) ? W : "height";
      }),
      (i._getParent = function () {
        var t,
          i = this;
        u.isElement(this._config.parent)
          ? ((t = this._config.parent),
            void 0 !== this._config.parent.jquery &&
              (t = this._config.parent[0]))
          : (t = document.querySelector(this._config.parent));
        var e =
            '[data-toggle="collapse"][data-parent="' +
            this._config.parent +
            '"]',
          e = [].slice.call(t.querySelectorAll(e));
        return (
          c.default(e).each(function (t, e) {
            i._addAriaAndCollapsedClass(Y._getTargetFromElement(e), [e]);
          }),
          t
        );
      }),
      (i._addAriaAndCollapsedClass = function (t, e) {
        t = c.default(t).hasClass(M);
        e.length && c.default(e).toggleClass(F, !t).attr("aria-expanded", t);
      }),
      (Y._getTargetFromElement = function (t) {
        t = u.getSelectorFromElement(t);
        return t ? document.querySelector(t) : null;
      }),
      (Y._jQueryInterface = function (o) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(H),
            i = r({}, B, t.data(), "object" == typeof o && o ? o : {});
          if (
            (!e &&
              i.toggle &&
              "string" == typeof o &&
              /show|hide/.test(o) &&
              (i.toggle = !1),
            e || ((e = new Y(this, i)), t.data(H, e)),
            "string" == typeof o)
          ) {
            if (void 0 === e[o])
              throw new TypeError('No method named "' + o + '"');
            e[o]();
          }
        });
      }),
      l(Y, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return B;
          },
        },
      ]),
      Y);
  function Y(e, t) {
    (this._isTransitioning = !1),
      (this._element = e),
      (this._config = this._getConfig(t)),
      (this._triggerArray = [].slice.call(
        document.querySelectorAll(
          '[data-toggle="collapse"][href="#' +
            e.id +
            '"],[data-toggle="collapse"][data-target="#' +
            e.id +
            '"]'
        )
      ));
    for (
      var i = [].slice.call(document.querySelectorAll(U)), o = 0, s = i.length;
      o < s;
      o++
    ) {
      var n = i[o],
        l = u.getSelectorFromElement(n),
        r = [].slice.call(document.querySelectorAll(l)).filter(function (t) {
          return t === e;
        });
      null !== l &&
        0 < r.length &&
        ((this._selector = l), this._triggerArray.push(n));
    }
    (this._parent = this._config.parent ? this._getParent() : null),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._element, this._triggerArray),
      this._config.toggle && this.toggle();
  }
  c.default(document).on("click.bs.collapse.data-api", U, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var i = c.default(this),
      t = u.getSelectorFromElement(this),
      t = [].slice.call(document.querySelectorAll(t));
    c.default(t).each(function () {
      var t = c.default(this),
        e = t.data(H) ? "toggle" : i.data();
      X._jQueryInterface.call(t, e);
    });
  }),
    (c.default.fn[L] = X._jQueryInterface),
    (c.default.fn[L].Constructor = X),
    (c.default.fn[L].noConflict = function () {
      return (c.default.fn[L] = z), X._jQueryInterface;
    });
  var V = "dropdown",
    K = "bs.dropdown",
    G = c.default.fn[V],
    J = new RegExp("38|40|27"),
    Z = "disabled",
    tt = "show",
    et = "dropdown-menu-right",
    it = "hide.bs.dropdown",
    ot = "hidden.bs.dropdown",
    e = "click.bs.dropdown.data-api",
    st = "keydown.bs.dropdown.data-api",
    nt = '[data-toggle="dropdown"]',
    lt = ".dropdown-menu",
    rt = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    at = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    dt =
      (((i = ct.prototype).toggle = function () {
        var t;
        this._element.disabled ||
          c.default(this._element).hasClass(Z) ||
          ((t = c.default(this._menu).hasClass(tt)),
          ct._clearMenus(),
          t || this.show(!0));
      }),
      (i.show = function (t) {
        if (
          (void 0 === t && (t = !1),
          !(
            this._element.disabled ||
            c.default(this._element).hasClass(Z) ||
            c.default(this._menu).hasClass(tt)
          ))
        ) {
          var e = { relatedTarget: this._element },
            i = c.default.Event("show.bs.dropdown", e),
            o = ct._getParentFromElement(this._element);
          if ((c.default(o).trigger(i), !i.isDefaultPrevented())) {
            if (!this._inNavbar && t) {
              if (void 0 === s.default)
                throw new TypeError(
                  "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                );
              t = this._element;
              "parent" === this._config.reference
                ? (t = o)
                : u.isElement(this._config.reference) &&
                  ((t = this._config.reference),
                  void 0 !== this._config.reference.jquery &&
                    (t = this._config.reference[0])),
                "scrollParent" !== this._config.boundary &&
                  c.default(o).addClass("position-static"),
                (this._popper = new s.default(
                  t,
                  this._menu,
                  this._getPopperConfig()
                ));
            }
            "ontouchstart" in document.documentElement &&
              0 === c.default(o).closest(".navbar-nav").length &&
              c
                .default(document.body)
                .children()
                .on("mouseover", null, c.default.noop),
              this._element.focus(),
              this._element.setAttribute("aria-expanded", !0),
              c.default(this._menu).toggleClass(tt),
              c
                .default(o)
                .toggleClass(tt)
                .trigger(c.default.Event("shown.bs.dropdown", e));
          }
        }
      }),
      (i.hide = function () {
        var t, e, i;
        this._element.disabled ||
          c.default(this._element).hasClass(Z) ||
          !c.default(this._menu).hasClass(tt) ||
          ((t = { relatedTarget: this._element }),
          (e = c.default.Event(it, t)),
          (i = ct._getParentFromElement(this._element)),
          c.default(i).trigger(e),
          e.isDefaultPrevented() ||
            (this._popper && this._popper.destroy(),
            c.default(this._menu).toggleClass(tt),
            c.default(i).toggleClass(tt).trigger(c.default.Event(ot, t))));
      }),
      (i.dispose = function () {
        c.default.removeData(this._element, K),
          c.default(this._element).off(".bs.dropdown"),
          (this._element = null),
          (this._menu = null) !== this._popper &&
            (this._popper.destroy(), (this._popper = null));
      }),
      (i.update = function () {
        (this._inNavbar = this._detectNavbar()),
          null !== this._popper && this._popper.scheduleUpdate();
      }),
      (i._addEventListeners = function () {
        var e = this;
        c.default(this._element).on("click.bs.dropdown", function (t) {
          t.preventDefault(), t.stopPropagation(), e.toggle();
        });
      }),
      (i._getConfig = function (t) {
        return (
          (t = r(
            {},
            this.constructor.Default,
            c.default(this._element).data(),
            t
          )),
          u.typeCheckConfig(V, t, this.constructor.DefaultType),
          t
        );
      }),
      (i._getMenuElement = function () {
        var t;
        return (
          this._menu ||
            ((t = ct._getParentFromElement(this._element)) &&
              (this._menu = t.querySelector(lt))),
          this._menu
        );
      }),
      (i._getPlacement = function () {
        var t = c.default(this._element.parentNode),
          e = "bottom-start";
        return (
          t.hasClass("dropup")
            ? (e = c.default(this._menu).hasClass(et) ? "top-end" : "top-start")
            : t.hasClass("dropright")
            ? (e = "right-start")
            : t.hasClass("dropleft")
            ? (e = "left-start")
            : c.default(this._menu).hasClass(et) && (e = "bottom-end"),
          e
        );
      }),
      (i._detectNavbar = function () {
        return 0 < c.default(this._element).closest(".navbar").length;
      }),
      (i._getOffset = function () {
        var e = this,
          t = {};
        return (
          "function" == typeof this._config.offset
            ? (t.fn = function (t) {
                return (
                  (t.offsets = r(
                    {},
                    t.offsets,
                    e._config.offset(t.offsets, e._element)
                  )),
                  t
                );
              })
            : (t.offset = this._config.offset),
          t
        );
      }),
      (i._getPopperConfig = function () {
        var t = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: { enabled: this._config.flip },
            preventOverflow: { boundariesElement: this._config.boundary },
          },
        };
        return (
          "static" === this._config.display &&
            (t.modifiers.applyStyle = { enabled: !1 }),
          r({}, t, this._config.popperConfig)
        );
      }),
      (ct._jQueryInterface = function (e) {
        return this.each(function () {
          var t = c.default(this).data(K);
          if (
            (t ||
              ((t = new ct(this, "object" == typeof e ? e : null)),
              c.default(this).data(K, t)),
            "string" == typeof e)
          ) {
            if (void 0 === t[e])
              throw new TypeError('No method named "' + e + '"');
            t[e]();
          }
        });
      }),
      (ct._clearMenus = function (t) {
        if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
          for (
            var e = [].slice.call(document.querySelectorAll(nt)),
              i = 0,
              o = e.length;
            i < o;
            i++
          ) {
            var s,
              n,
              l = ct._getParentFromElement(e[i]),
              r = c.default(e[i]).data(K),
              a = { relatedTarget: e[i] };
            t && "click" === t.type && (a.clickEvent = t),
              r &&
                ((s = r._menu),
                !c.default(l).hasClass(tt) ||
                  (t &&
                    (("click" === t.type &&
                      /input|textarea/i.test(t.target.tagName)) ||
                      ("keyup" === t.type && 9 === t.which)) &&
                    c.default.contains(l, t.target)) ||
                  ((n = c.default.Event(it, a)),
                  c.default(l).trigger(n),
                  n.isDefaultPrevented() ||
                    ("ontouchstart" in document.documentElement &&
                      c
                        .default(document.body)
                        .children()
                        .off("mouseover", null, c.default.noop),
                    e[i].setAttribute("aria-expanded", "false"),
                    r._popper && r._popper.destroy(),
                    c.default(s).removeClass(tt),
                    c
                      .default(l)
                      .removeClass(tt)
                      .trigger(c.default.Event(ot, a)))));
          }
      }),
      (ct._getParentFromElement = function (t) {
        var e,
          i = u.getSelectorFromElement(t);
        return (e = i ? document.querySelector(i) : e) || t.parentNode;
      }),
      (ct._dataApiKeydownHandler = function (t) {
        if (
          !(/input|textarea/i.test(t.target.tagName)
            ? 32 === t.which ||
              (27 !== t.which &&
                ((40 !== t.which && 38 !== t.which) ||
                  c.default(t.target).closest(lt).length))
            : !J.test(t.which)) &&
          !this.disabled &&
          !c.default(this).hasClass(Z)
        ) {
          var e = ct._getParentFromElement(this),
            i = c.default(e).hasClass(tt);
          if (i || 27 !== t.which) {
            if (
              (t.preventDefault(),
              t.stopPropagation(),
              !i || 27 === t.which || 32 === t.which)
            )
              return (
                27 === t.which &&
                  c.default(e.querySelector(nt)).trigger("focus"),
                void c.default(this).trigger("click")
              );
            i = [].slice
              .call(
                e.querySelectorAll(
                  ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                )
              )
              .filter(function (t) {
                return c.default(t).is(":visible");
              });
            0 !== i.length &&
              ((e = i.indexOf(t.target)),
              38 === t.which && 0 < e && e--,
              40 === t.which && e < i.length - 1 && e++,
              i[(e = e < 0 ? 0 : e)].focus());
          }
        }
      }),
      l(ct, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return rt;
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return at;
          },
        },
      ]),
      ct);
  function ct(t, e) {
    (this._element = t),
      (this._popper = null),
      (this._config = this._getConfig(e)),
      (this._menu = this._getMenuElement()),
      (this._inNavbar = this._detectNavbar()),
      this._addEventListeners();
  }
  c
    .default(document)
    .on(st, nt, dt._dataApiKeydownHandler)
    .on(st, lt, dt._dataApiKeydownHandler)
    .on(e + " keyup.bs.dropdown.data-api", dt._clearMenus)
    .on(e, nt, function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        dt._jQueryInterface.call(c.default(this), "toggle");
    })
    .on(e, ".dropdown form", function (t) {
      t.stopPropagation();
    }),
    (c.default.fn[V] = dt._jQueryInterface),
    (c.default.fn[V].Constructor = dt),
    (c.default.fn[V].noConflict = function () {
      return (c.default.fn[V] = G), dt._jQueryInterface;
    });
  var ut = "bs.modal",
    ht = c.default.fn.modal,
    ft = "modal-open",
    pt = "fade",
    gt = "show",
    mt = "modal-static",
    vt = "hidden.bs.modal",
    _t = "show.bs.modal",
    yt = "focusin.bs.modal",
    bt = "resize.bs.modal",
    wt = "click.dismiss.bs.modal",
    Tt = "keydown.dismiss.bs.modal",
    kt = "mousedown.dismiss.bs.modal",
    St = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Ct = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    Et = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    $t =
      (((e = At.prototype).toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t);
      }),
      (e.show = function (t) {
        var e,
          i = this;
        this._isShown ||
          this._isTransitioning ||
          ((e = c.default.Event(_t, { relatedTarget: t })),
          c.default(this._element).trigger(e),
          e.isDefaultPrevented() ||
            ((this._isShown = !0),
            c.default(this._element).hasClass(pt) &&
              (this._isTransitioning = !0),
            this._checkScrollbar(),
            this._setScrollbar(),
            this._adjustDialog(),
            this._setEscapeEvent(),
            this._setResizeEvent(),
            c
              .default(this._element)
              .on(wt, '[data-dismiss="modal"]', function (t) {
                return i.hide(t);
              }),
            c.default(this._dialog).on(kt, function () {
              c.default(i._element).one(
                "mouseup.dismiss.bs.modal",
                function (t) {
                  c.default(t.target).is(i._element) &&
                    (i._ignoreBackdropClick = !0);
                }
              );
            }),
            this._showBackdrop(function () {
              return i._showElement(t);
            })));
      }),
      (e.hide = function (t) {
        var e = this;
        t && t.preventDefault(),
          this._isShown &&
            !this._isTransitioning &&
            ((t = c.default.Event("hide.bs.modal")),
            c.default(this._element).trigger(t),
            this._isShown &&
              !t.isDefaultPrevented() &&
              ((this._isShown = !1),
              (t = c.default(this._element).hasClass(pt)) &&
                (this._isTransitioning = !0),
              this._setEscapeEvent(),
              this._setResizeEvent(),
              c.default(document).off(yt),
              c.default(this._element).removeClass(gt),
              c.default(this._element).off(wt),
              c.default(this._dialog).off(kt),
              t
                ? ((t = u.getTransitionDurationFromElement(this._element)),
                  c
                    .default(this._element)
                    .one(u.TRANSITION_END, function (t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(t))
                : this._hideModal()));
      }),
      (e.dispose = function () {
        [window, this._element, this._dialog].forEach(function (t) {
          return c.default(t).off(".bs.modal");
        }),
          c.default(document).off(yt),
          c.default.removeData(this._element, ut),
          (this._config = null),
          (this._element = null),
          (this._dialog = null),
          (this._backdrop = null),
          (this._isShown = null),
          (this._isBodyOverflowing = null),
          (this._ignoreBackdropClick = null),
          (this._isTransitioning = null),
          (this._scrollbarWidth = null);
      }),
      (e.handleUpdate = function () {
        this._adjustDialog();
      }),
      (e._getConfig = function (t) {
        return (t = r({}, Ct, t)), u.typeCheckConfig("modal", t, Et), t;
      }),
      (e._triggerBackdropTransition = function () {
        var t,
          e,
          i = this,
          o = c.default.Event("hidePrevented.bs.modal");
        c.default(this._element).trigger(o),
          o.isDefaultPrevented() ||
            ((t =
              this._element.scrollHeight >
              document.documentElement.clientHeight) ||
              (this._element.style.overflowY = "hidden"),
            this._element.classList.add(mt),
            (e = u.getTransitionDurationFromElement(this._dialog)),
            c.default(this._element).off(u.TRANSITION_END),
            c
              .default(this._element)
              .one(u.TRANSITION_END, function () {
                i._element.classList.remove(mt),
                  t ||
                    c
                      .default(i._element)
                      .one(u.TRANSITION_END, function () {
                        i._element.style.overflowY = "";
                      })
                      .emulateTransitionEnd(i._element, e);
              })
              .emulateTransitionEnd(e),
            this._element.focus());
      }),
      (e._showElement = function (t) {
        var e = this,
          i = c.default(this._element).hasClass(pt),
          o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
        (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
          document.body.appendChild(this._element),
          (this._element.style.display = "block"),
          this._element.removeAttribute("aria-hidden"),
          this._element.setAttribute("aria-modal", !0),
          this._element.setAttribute("role", "dialog"),
          c.default(this._dialog).hasClass("modal-dialog-scrollable") && o
            ? (o.scrollTop = 0)
            : (this._element.scrollTop = 0),
          i && u.reflow(this._element),
          c.default(this._element).addClass(gt),
          this._config.focus && this._enforceFocus();
        var s = c.default.Event("shown.bs.modal", { relatedTarget: t }),
          t = function () {
            e._config.focus && e._element.focus(),
              (e._isTransitioning = !1),
              c.default(e._element).trigger(s);
          };
        i
          ? ((i = u.getTransitionDurationFromElement(this._dialog)),
            c
              .default(this._dialog)
              .one(u.TRANSITION_END, t)
              .emulateTransitionEnd(i))
          : t();
      }),
      (e._enforceFocus = function () {
        var e = this;
        c.default(document)
          .off(yt)
          .on(yt, function (t) {
            document !== t.target &&
              e._element !== t.target &&
              0 === c.default(e._element).has(t.target).length &&
              e._element.focus();
          });
      }),
      (e._setEscapeEvent = function () {
        var e = this;
        this._isShown
          ? c.default(this._element).on(Tt, function (t) {
              e._config.keyboard && 27 === t.which
                ? (t.preventDefault(), e.hide())
                : e._config.keyboard ||
                  27 !== t.which ||
                  e._triggerBackdropTransition();
            })
          : this._isShown || c.default(this._element).off(Tt);
      }),
      (e._setResizeEvent = function () {
        var e = this;
        this._isShown
          ? c.default(window).on(bt, function (t) {
              return e.handleUpdate(t);
            })
          : c.default(window).off(bt);
      }),
      (e._hideModal = function () {
        var t = this;
        (this._element.style.display = "none"),
          this._element.setAttribute("aria-hidden", !0),
          this._element.removeAttribute("aria-modal"),
          this._element.removeAttribute("role"),
          (this._isTransitioning = !1),
          this._showBackdrop(function () {
            c.default(document.body).removeClass(ft),
              t._resetAdjustments(),
              t._resetScrollbar(),
              c.default(t._element).trigger(vt);
          });
      }),
      (e._removeBackdrop = function () {
        this._backdrop &&
          (c.default(this._backdrop).remove(), (this._backdrop = null));
      }),
      (e._showBackdrop = function (t) {
        var e,
          i = this,
          o = c.default(this._element).hasClass(pt) ? pt : "";
        this._isShown && this._config.backdrop
          ? ((this._backdrop = document.createElement("div")),
            (this._backdrop.className = "modal-backdrop"),
            o && this._backdrop.classList.add(o),
            c.default(this._backdrop).appendTo(document.body),
            c.default(this._element).on(wt, function (t) {
              i._ignoreBackdropClick
                ? (i._ignoreBackdropClick = !1)
                : t.target === t.currentTarget &&
                  ("static" === i._config.backdrop
                    ? i._triggerBackdropTransition()
                    : i.hide());
            }),
            o && u.reflow(this._backdrop),
            c.default(this._backdrop).addClass(gt),
            t &&
              (o
                ? ((e = u.getTransitionDurationFromElement(this._backdrop)),
                  c
                    .default(this._backdrop)
                    .one(u.TRANSITION_END, t)
                    .emulateTransitionEnd(e))
                : t()))
          : !this._isShown && this._backdrop
          ? (c.default(this._backdrop).removeClass(gt),
            (o = function () {
              i._removeBackdrop(), t && t();
            }),
            c.default(this._element).hasClass(pt)
              ? ((e = u.getTransitionDurationFromElement(this._backdrop)),
                c
                  .default(this._backdrop)
                  .one(u.TRANSITION_END, o)
                  .emulateTransitionEnd(e))
              : o())
          : t && t();
      }),
      (e._adjustDialog = function () {
        var t =
          this._element.scrollHeight > document.documentElement.clientHeight;
        !this._isBodyOverflowing &&
          t &&
          (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
          this._isBodyOverflowing &&
            !t &&
            (this._element.style.paddingRight = this._scrollbarWidth + "px");
      }),
      (e._resetAdjustments = function () {
        (this._element.style.paddingLeft = ""),
          (this._element.style.paddingRight = "");
      }),
      (e._checkScrollbar = function () {
        var t = document.body.getBoundingClientRect();
        (this._isBodyOverflowing =
          Math.round(t.left + t.right) < window.innerWidth),
          (this._scrollbarWidth = this._getScrollbarWidth());
      }),
      (e._setScrollbar = function () {
        var t,
          e,
          s = this;
        this._isBodyOverflowing &&
          ((t = [].slice.call(document.querySelectorAll(St))),
          (e = [].slice.call(document.querySelectorAll(".sticky-top"))),
          c.default(t).each(function (t, e) {
            var i = e.style.paddingRight,
              o = c.default(e).css("padding-right");
            c.default(e)
              .data("padding-right", i)
              .css("padding-right", parseFloat(o) + s._scrollbarWidth + "px");
          }),
          c.default(e).each(function (t, e) {
            var i = e.style.marginRight,
              o = c.default(e).css("margin-right");
            c.default(e)
              .data("margin-right", i)
              .css("margin-right", parseFloat(o) - s._scrollbarWidth + "px");
          }),
          (t = document.body.style.paddingRight),
          (e = c.default(document.body).css("padding-right")),
          c
            .default(document.body)
            .data("padding-right", t)
            .css("padding-right", parseFloat(e) + this._scrollbarWidth + "px")),
          c.default(document.body).addClass(ft);
      }),
      (e._resetScrollbar = function () {
        var t = [].slice.call(document.querySelectorAll(St));
        c.default(t).each(function (t, e) {
          var i = c.default(e).data("padding-right");
          c.default(e).removeData("padding-right"),
            (e.style.paddingRight = i || "");
        });
        t = [].slice.call(document.querySelectorAll(".sticky-top"));
        c.default(t).each(function (t, e) {
          var i = c.default(e).data("margin-right");
          void 0 !== i &&
            c.default(e).css("margin-right", i).removeData("margin-right");
        });
        t = c.default(document.body).data("padding-right");
        c.default(document.body).removeData("padding-right"),
          (document.body.style.paddingRight = t || "");
      }),
      (e._getScrollbarWidth = function () {
        var t = document.createElement("div");
        (t.className = "modal-scrollbar-measure"), document.body.appendChild(t);
        var e = t.getBoundingClientRect().width - t.clientWidth;
        return document.body.removeChild(t), e;
      }),
      (At._jQueryInterface = function (i, o) {
        return this.each(function () {
          var t = c.default(this).data(ut),
            e = r(
              {},
              Ct,
              c.default(this).data(),
              "object" == typeof i && i ? i : {}
            );
          if (
            (t || ((t = new At(this, e)), c.default(this).data(ut, t)),
            "string" == typeof i)
          ) {
            if (void 0 === t[i])
              throw new TypeError('No method named "' + i + '"');
            t[i](o);
          } else e.show && t.show(o);
        });
      }),
      l(At, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return Ct;
          },
        },
      ]),
      At);
  function At(t, e) {
    (this._config = this._getConfig(e)),
      (this._element = t),
      (this._dialog = t.querySelector(".modal-dialog")),
      (this._backdrop = null),
      (this._isShown = !1),
      (this._isBodyOverflowing = !1),
      (this._ignoreBackdropClick = !1),
      (this._isTransitioning = !1),
      (this._scrollbarWidth = 0);
  }
  c
    .default(document)
    .on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
      var e,
        i = this,
        o = u.getSelectorFromElement(this);
      o && (e = document.querySelector(o));
      o = c.default(e).data(ut)
        ? "toggle"
        : r({}, c.default(e).data(), c.default(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var s = c.default(e).one(_t, function (t) {
        t.isDefaultPrevented() ||
          s.one(vt, function () {
            c.default(i).is(":visible") && i.focus();
          });
      });
      $t._jQueryInterface.call(c.default(e), o, this);
    }),
    (c.default.fn.modal = $t._jQueryInterface),
    (c.default.fn.modal.Constructor = $t),
    (c.default.fn.modal.noConflict = function () {
      return (c.default.fn.modal = ht), $t._jQueryInterface;
    });
  var xt = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    It = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    Dt =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function Ot(t, s, e) {
    if (0 === t.length) return t;
    if (e && "function" == typeof e) return e(t);
    for (
      var t = new window.DOMParser().parseFromString(t, "text/html"),
        n = Object.keys(s),
        l = [].slice.call(t.body.querySelectorAll("*")),
        i = 0,
        o = l.length;
      i < o;
      i++
    )
      !(function (t) {
        var e = l[t],
          i = e.nodeName.toLowerCase();
        if (-1 === n.indexOf(e.nodeName.toLowerCase()))
          return e.parentNode.removeChild(e);
        var t = [].slice.call(e.attributes),
          o = [].concat(s["*"] || [], s[i] || []);
        t.forEach(function (t) {
          !(function (t, e) {
            var i = t.nodeName.toLowerCase();
            if (-1 !== e.indexOf(i))
              return (
                -1 === xt.indexOf(i) ||
                Boolean(It.test(t.nodeValue) || Dt.test(t.nodeValue))
              );
            for (
              var o = e.filter(function (t) {
                  return t instanceof RegExp;
                }),
                s = 0,
                n = o.length;
              s < n;
              s++
            )
              if (o[s].test(i)) return 1;
          })(t, o) && e.removeAttribute(t.nodeName);
        });
      })(i);
    return t.body.innerHTML;
  }
  var Nt = "tooltip",
    Pt = "bs.tooltip",
    jt = c.default.fn.tooltip,
    Lt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Ht = ["sanitize", "whiteList", "sanitizeFn"],
    zt = "fade",
    Mt = "show",
    qt = "show",
    Rt = "hover",
    Ft = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    Wt = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Ut = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    Bt = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    },
    Qt =
      (((e = Xt.prototype).enable = function () {
        this._isEnabled = !0;
      }),
      (e.disable = function () {
        this._isEnabled = !1;
      }),
      (e.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      }),
      (e.toggle = function (t) {
        var e, i;
        this._isEnabled &&
          (t
            ? ((e = this.constructor.DATA_KEY),
              (i = c.default(t.currentTarget).data(e)) ||
                ((i = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                c.default(t.currentTarget).data(e, i)),
              (i._activeTrigger.click = !i._activeTrigger.click),
              i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i))
            : c.default(this.getTipElement()).hasClass(Mt)
            ? this._leave(null, this)
            : this._enter(null, this));
      }),
      (e.dispose = function () {
        clearTimeout(this._timeout),
          c.default.removeData(this.element, this.constructor.DATA_KEY),
          c.default(this.element).off(this.constructor.EVENT_KEY),
          c
            .default(this.element)
            .closest(".modal")
            .off("hide.bs.modal", this._hideModalHandler),
          this.tip && c.default(this.tip).remove(),
          (this._isEnabled = null),
          (this._timeout = null),
          (this._hoverState = null),
          (this._activeTrigger = null),
          this._popper && this._popper.destroy(),
          (this._popper = null),
          (this.element = null),
          (this.config = null),
          (this.tip = null);
      }),
      (e.show = function () {
        var e = this;
        if ("none" === c.default(this.element).css("display"))
          throw new Error("Please use show on visible elements");
        var t,
          i,
          o = c.default.Event(this.constructor.Event.SHOW);
        this.isWithContent() &&
          this._isEnabled &&
          (c.default(this.element).trigger(o),
          (i = u.findShadowRoot(this.element)),
          (t = c.default.contains(
            null !== i ? i : this.element.ownerDocument.documentElement,
            this.element
          )),
          !o.isDefaultPrevented() &&
            t &&
            ((i = this.getTipElement()),
            (o = u.getUID(this.constructor.NAME)),
            i.setAttribute("id", o),
            this.element.setAttribute("aria-describedby", o),
            this.setContent(),
            this.config.animation && c.default(i).addClass(zt),
            (t =
              "function" == typeof this.config.placement
                ? this.config.placement.call(this, i, this.element)
                : this.config.placement),
            (o = this._getAttachment(t)),
            this.addAttachmentClass(o),
            (t = this._getContainer()),
            c.default(i).data(this.constructor.DATA_KEY, this),
            c.default.contains(
              this.element.ownerDocument.documentElement,
              this.tip
            ) || c.default(i).appendTo(t),
            c.default(this.element).trigger(this.constructor.Event.INSERTED),
            (this._popper = new s.default(
              this.element,
              i,
              this._getPopperConfig(o)
            )),
            c.default(i).addClass(Mt),
            c.default(i).addClass(this.config.customClass),
            "ontouchstart" in document.documentElement &&
              c
                .default(document.body)
                .children()
                .on("mouseover", null, c.default.noop),
            (o = function () {
              e.config.animation && e._fixTransition();
              var t = e._hoverState;
              (e._hoverState = null),
                c.default(e.element).trigger(e.constructor.Event.SHOWN),
                "out" === t && e._leave(null, e);
            }),
            c.default(this.tip).hasClass(zt)
              ? ((i = u.getTransitionDurationFromElement(this.tip)),
                c
                  .default(this.tip)
                  .one(u.TRANSITION_END, o)
                  .emulateTransitionEnd(i))
              : o()));
      }),
      (e.hide = function (t) {
        function e() {
          i._hoverState !== qt && o.parentNode && o.parentNode.removeChild(o),
            i._cleanTipClass(),
            i.element.removeAttribute("aria-describedby"),
            c.default(i.element).trigger(i.constructor.Event.HIDDEN),
            null !== i._popper && i._popper.destroy(),
            t && t();
        }
        var i = this,
          o = this.getTipElement(),
          s = c.default.Event(this.constructor.Event.HIDE);
        c.default(this.element).trigger(s),
          s.isDefaultPrevented() ||
            (c.default(o).removeClass(Mt),
            "ontouchstart" in document.documentElement &&
              c
                .default(document.body)
                .children()
                .off("mouseover", null, c.default.noop),
            (this._activeTrigger.click = !1),
            (this._activeTrigger.focus = !1),
            (this._activeTrigger.hover = !1),
            c.default(this.tip).hasClass(zt)
              ? ((s = u.getTransitionDurationFromElement(o)),
                c.default(o).one(u.TRANSITION_END, e).emulateTransitionEnd(s))
              : e(),
            (this._hoverState = ""));
      }),
      (e.update = function () {
        null !== this._popper && this._popper.scheduleUpdate();
      }),
      (e.isWithContent = function () {
        return Boolean(this.getTitle());
      }),
      (e.addAttachmentClass = function (t) {
        c.default(this.getTipElement()).addClass("bs-tooltip-" + t);
      }),
      (e.getTipElement = function () {
        return (
          (this.tip = this.tip || c.default(this.config.template)[0]), this.tip
        );
      }),
      (e.setContent = function () {
        var t = this.getTipElement();
        this.setElementContent(
          c.default(t.querySelectorAll(".tooltip-inner")),
          this.getTitle()
        ),
          c.default(t).removeClass("fade show");
      }),
      (e.setElementContent = function (t, e) {
        "object" != typeof e || (!e.nodeType && !e.jquery)
          ? this.config.html
            ? (this.config.sanitize &&
                (e = Ot(e, this.config.whiteList, this.config.sanitizeFn)),
              t.html(e))
            : t.text(e)
          : this.config.html
          ? c.default(e).parent().is(t) || t.empty().append(e)
          : t.text(c.default(e).text());
      }),
      (e.getTitle = function () {
        return (
          this.element.getAttribute("data-original-title") ||
          ("function" == typeof this.config.title
            ? this.config.title.call(this.element)
            : this.config.title)
        );
      }),
      (e._getPopperConfig = function (t) {
        var e = this;
        return r(
          {},
          {
            placement: t,
            modifiers: {
              offset: this._getOffset(),
              flip: { behavior: this.config.fallbackPlacement },
              arrow: { element: ".arrow" },
              preventOverflow: { boundariesElement: this.config.boundary },
            },
            onCreate: function (t) {
              t.originalPlacement !== t.placement &&
                e._handlePopperPlacementChange(t);
            },
            onUpdate: function (t) {
              return e._handlePopperPlacementChange(t);
            },
          },
          this.config.popperConfig
        );
      }),
      (e._getOffset = function () {
        var e = this,
          t = {};
        return (
          "function" == typeof this.config.offset
            ? (t.fn = function (t) {
                return (
                  (t.offsets = r(
                    {},
                    t.offsets,
                    e.config.offset(t.offsets, e.element)
                  )),
                  t
                );
              })
            : (t.offset = this.config.offset),
          t
        );
      }),
      (e._getContainer = function () {
        return !1 === this.config.container
          ? document.body
          : u.isElement(this.config.container)
          ? c.default(this.config.container)
          : c.default(document).find(this.config.container);
      }),
      (e._getAttachment = function (t) {
        return Ft[t.toUpperCase()];
      }),
      (e._setListeners = function () {
        var i = this;
        this.config.trigger.split(" ").forEach(function (t) {
          var e;
          "click" === t
            ? c
                .default(i.element)
                .on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                  return i.toggle(t);
                })
            : "manual" !== t &&
              ((e =
                t === Rt
                  ? i.constructor.Event.MOUSEENTER
                  : i.constructor.Event.FOCUSIN),
              (t =
                t === Rt
                  ? i.constructor.Event.MOUSELEAVE
                  : i.constructor.Event.FOCUSOUT),
              c
                .default(i.element)
                .on(e, i.config.selector, function (t) {
                  return i._enter(t);
                })
                .on(t, i.config.selector, function (t) {
                  return i._leave(t);
                }));
        }),
          (this._hideModalHandler = function () {
            i.element && i.hide();
          }),
          c
            .default(this.element)
            .closest(".modal")
            .on("hide.bs.modal", this._hideModalHandler),
          this.config.selector
            ? (this.config = r({}, this.config, {
                trigger: "manual",
                selector: "",
              }))
            : this._fixTitle();
      }),
      (e._fixTitle = function () {
        var t = typeof this.element.getAttribute("data-original-title");
        (!this.element.getAttribute("title") && "string" == t) ||
          (this.element.setAttribute(
            "data-original-title",
            this.element.getAttribute("title") || ""
          ),
          this.element.setAttribute("title", ""));
      }),
      (e._enter = function (t, e) {
        var i = this.constructor.DATA_KEY;
        (e = e || c.default(t.currentTarget).data(i)) ||
          ((e = new this.constructor(
            t.currentTarget,
            this._getDelegateConfig()
          )),
          c.default(t.currentTarget).data(i, e)),
          t && (e._activeTrigger["focusin" === t.type ? "focus" : Rt] = !0),
          c.default(e.getTipElement()).hasClass(Mt) || e._hoverState === qt
            ? (e._hoverState = qt)
            : (clearTimeout(e._timeout),
              (e._hoverState = qt),
              e.config.delay && e.config.delay.show
                ? (e._timeout = setTimeout(function () {
                    e._hoverState === qt && e.show();
                  }, e.config.delay.show))
                : e.show());
      }),
      (e._leave = function (t, e) {
        var i = this.constructor.DATA_KEY;
        (e = e || c.default(t.currentTarget).data(i)) ||
          ((e = new this.constructor(
            t.currentTarget,
            this._getDelegateConfig()
          )),
          c.default(t.currentTarget).data(i, e)),
          t && (e._activeTrigger["focusout" === t.type ? "focus" : Rt] = !1),
          e._isWithActiveTrigger() ||
            (clearTimeout(e._timeout),
            (e._hoverState = "out"),
            e.config.delay && e.config.delay.hide
              ? (e._timeout = setTimeout(function () {
                  "out" === e._hoverState && e.hide();
                }, e.config.delay.hide))
              : e.hide());
      }),
      (e._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger)
          if (this._activeTrigger[t]) return !0;
        return !1;
      }),
      (e._getConfig = function (t) {
        var e = c.default(this.element).data();
        return (
          Object.keys(e).forEach(function (t) {
            -1 !== Ht.indexOf(t) && delete e[t];
          }),
          "number" ==
            typeof (t = r(
              {},
              this.constructor.Default,
              e,
              "object" == typeof t && t ? t : {}
            )).delay && (t.delay = { show: t.delay, hide: t.delay }),
          "number" == typeof t.title && (t.title = t.title.toString()),
          "number" == typeof t.content && (t.content = t.content.toString()),
          u.typeCheckConfig(Nt, t, this.constructor.DefaultType),
          t.sanitize &&
            (t.template = Ot(t.template, t.whiteList, t.sanitizeFn)),
          t
        );
      }),
      (e._getDelegateConfig = function () {
        var t = {};
        if (this.config)
          for (var e in this.config)
            this.constructor.Default[e] !== this.config[e] &&
              (t[e] = this.config[e]);
        return t;
      }),
      (e._cleanTipClass = function () {
        var t = c.default(this.getTipElement()),
          e = t.attr("class").match(Lt);
        null !== e && e.length && t.removeClass(e.join(""));
      }),
      (e._handlePopperPlacementChange = function (t) {
        (this.tip = t.instance.popper),
          this._cleanTipClass(),
          this.addAttachmentClass(this._getAttachment(t.placement));
      }),
      (e._fixTransition = function () {
        var t = this.getTipElement(),
          e = this.config.animation;
        null === t.getAttribute("x-placement") &&
          (c.default(t).removeClass(zt),
          (this.config.animation = !1),
          this.hide(),
          this.show(),
          (this.config.animation = e));
      }),
      (Xt._jQueryInterface = function (o) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(Pt),
            i = "object" == typeof o && o;
          if (
            (e || !/dispose|hide/.test(o)) &&
            (e || ((e = new Xt(this, i)), t.data(Pt, e)), "string" == typeof o)
          ) {
            if (void 0 === e[o])
              throw new TypeError('No method named "' + o + '"');
            e[o]();
          }
        });
      }),
      l(Xt, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return Wt;
          },
        },
        {
          key: "NAME",
          get: function () {
            return Nt;
          },
        },
        {
          key: "DATA_KEY",
          get: function () {
            return Pt;
          },
        },
        {
          key: "Event",
          get: function () {
            return Bt;
          },
        },
        {
          key: "EVENT_KEY",
          get: function () {
            return ".bs.tooltip";
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return Ut;
          },
        },
      ]),
      Xt);
  function Xt(t, e) {
    if (void 0 === s.default)
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)"
      );
    (this._isEnabled = !0),
      (this._timeout = 0),
      (this._hoverState = ""),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this.element = t),
      (this.config = this._getConfig(e)),
      (this.tip = null),
      this._setListeners();
  }
  (c.default.fn.tooltip = Qt._jQueryInterface),
    (c.default.fn.tooltip.Constructor = Qt),
    (c.default.fn.tooltip.noConflict = function () {
      return (c.default.fn.tooltip = jt), Qt._jQueryInterface;
    });
  var Yt = "bs.popover",
    Vt = c.default.fn.popover,
    Kt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Gt = r({}, Qt.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    Jt = r({}, Qt.DefaultType, { content: "(string|element|function)" }),
    Zt = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    },
    te = (function (t) {
      var e;
      function o() {
        return t.apply(this, arguments) || this;
      }
      (i = t),
        ((e = o).prototype = Object.create(i.prototype)),
        a((e.prototype.constructor = e), i);
      var i = o.prototype;
      return (
        (i.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (i.addAttachmentClass = function (t) {
          c.default(this.getTipElement()).addClass("bs-popover-" + t);
        }),
        (i.getTipElement = function () {
          return (
            (this.tip = this.tip || c.default(this.config.template)[0]),
            this.tip
          );
        }),
        (i.setContent = function () {
          var t = c.default(this.getTipElement());
          this.setElementContent(t.find(".popover-header"), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
            this.setElementContent(t.find(".popover-body"), e),
            t.removeClass("fade show");
        }),
        (i._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (i._cleanTipClass = function () {
          var t = c.default(this.getTipElement()),
            e = t.attr("class").match(Kt);
          null !== e && 0 < e.length && t.removeClass(e.join(""));
        }),
        (o._jQueryInterface = function (i) {
          return this.each(function () {
            var t = c.default(this).data(Yt),
              e = "object" == typeof i ? i : null;
            if (
              (t || !/dispose|hide/.test(i)) &&
              (t || ((t = new o(this, e)), c.default(this).data(Yt, t)),
              "string" == typeof i)
            ) {
              if (void 0 === t[i])
                throw new TypeError('No method named "' + i + '"');
              t[i]();
            }
          });
        }),
        l(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Gt;
            },
          },
          {
            key: "NAME",
            get: function () {
              return "popover";
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Yt;
            },
          },
          {
            key: "Event",
            get: function () {
              return Zt;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.popover";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Jt;
            },
          },
        ]),
        o
      );
    })(Qt);
  (c.default.fn.popover = te._jQueryInterface),
    (c.default.fn.popover.Constructor = te),
    (c.default.fn.popover.noConflict = function () {
      return (c.default.fn.popover = Vt), te._jQueryInterface;
    });
  var ee = "scrollspy",
    ie = "bs.scrollspy",
    oe = c.default.fn[ee],
    se = "active",
    ne = "position",
    le = ".nav, .list-group",
    re = { offset: 10, method: "auto", target: "" },
    ae = { offset: "number", method: "string", target: "(string|element)" },
    de =
      (((e = ce.prototype).refresh = function () {
        var e = this,
          t =
            this._scrollElement === this._scrollElement.window ? "offset" : ne,
          o = "auto" === this._config.method ? t : this._config.method,
          s = o === ne ? this._getScrollTop() : 0;
        (this._offsets = []),
          (this._targets = []),
          (this._scrollHeight = this._getScrollHeight()),
          [].slice
            .call(document.querySelectorAll(this._selector))
            .map(function (t) {
              var e,
                i = u.getSelectorFromElement(t);
              if ((e = i ? document.querySelector(i) : e)) {
                t = e.getBoundingClientRect();
                if (t.width || t.height) return [c.default(e)[o]().top + s, i];
              }
              return null;
            })
            .filter(function (t) {
              return t;
            })
            .sort(function (t, e) {
              return t[0] - e[0];
            })
            .forEach(function (t) {
              e._offsets.push(t[0]), e._targets.push(t[1]);
            });
      }),
      (e.dispose = function () {
        c.default.removeData(this._element, ie),
          c.default(this._scrollElement).off(".bs.scrollspy"),
          (this._element = null),
          (this._scrollElement = null),
          (this._config = null),
          (this._selector = null),
          (this._offsets = null),
          (this._targets = null),
          (this._activeTarget = null),
          (this._scrollHeight = null);
      }),
      (e._getConfig = function (t) {
        var e;
        return (
          "string" !=
            typeof (t = r({}, re, "object" == typeof t && t ? t : {})).target &&
            u.isElement(t.target) &&
            ((e = c.default(t.target).attr("id")) ||
              ((e = u.getUID(ee)), c.default(t.target).attr("id", e)),
            (t.target = "#" + e)),
          u.typeCheckConfig(ee, t, ae),
          t
        );
      }),
      (e._getScrollTop = function () {
        return this._scrollElement === window
          ? this._scrollElement.pageYOffset
          : this._scrollElement.scrollTop;
      }),
      (e._getScrollHeight = function () {
        return (
          this._scrollElement.scrollHeight ||
          Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (e._getOffsetHeight = function () {
        return this._scrollElement === window
          ? window.innerHeight
          : this._scrollElement.getBoundingClientRect().height;
      }),
      (e._process = function () {
        var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          i = this._config.offset + e - this._getOffsetHeight();
        if ((this._scrollHeight !== e && this.refresh(), i <= t)) {
          i = this._targets[this._targets.length - 1];
          this._activeTarget !== i && this._activate(i);
        } else {
          if (
            this._activeTarget &&
            t < this._offsets[0] &&
            0 < this._offsets[0]
          )
            return (this._activeTarget = null), void this._clear();
          for (var o = this._offsets.length; o--; )
            this._activeTarget !== this._targets[o] &&
              t >= this._offsets[o] &&
              (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) &&
              this._activate(this._targets[o]);
        }
      }),
      (e._activate = function (e) {
        (this._activeTarget = e), this._clear();
        var t = this._selector.split(",").map(function (t) {
            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
          }),
          t = c.default([].slice.call(document.querySelectorAll(t.join(","))));
        t.hasClass("dropdown-item")
          ? (t.closest(".dropdown").find(".dropdown-toggle").addClass(se),
            t.addClass(se))
          : (t.addClass(se),
            t.parents(le).prev(".nav-link, .list-group-item").addClass(se),
            t.parents(le).prev(".nav-item").children(".nav-link").addClass(se)),
          c
            .default(this._scrollElement)
            .trigger("activate.bs.scrollspy", { relatedTarget: e });
      }),
      (e._clear = function () {
        [].slice
          .call(document.querySelectorAll(this._selector))
          .filter(function (t) {
            return t.classList.contains(se);
          })
          .forEach(function (t) {
            return t.classList.remove(se);
          });
      }),
      (ce._jQueryInterface = function (e) {
        return this.each(function () {
          var t = c.default(this).data(ie);
          if (
            (t ||
              ((t = new ce(this, "object" == typeof e && e)),
              c.default(this).data(ie, t)),
            "string" == typeof e)
          ) {
            if (void 0 === t[e])
              throw new TypeError('No method named "' + e + '"');
            t[e]();
          }
        });
      }),
      l(ce, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return re;
          },
        },
      ]),
      ce);
  function ce(t, e) {
    var i = this;
    (this._element = t),
      (this._scrollElement = "BODY" === t.tagName ? window : t),
      (this._config = this._getConfig(e)),
      (this._selector =
        this._config.target +
        " .nav-link," +
        this._config.target +
        " .list-group-item," +
        this._config.target +
        " .dropdown-item"),
      (this._offsets = []),
      (this._targets = []),
      (this._activeTarget = null),
      (this._scrollHeight = 0),
      c.default(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
        return i._process(t);
      }),
      this.refresh(),
      this._process();
  }
  c.default(window).on("load.bs.scrollspy.data-api", function () {
    for (
      var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
        e = t.length;
      e--;

    ) {
      var i = c.default(t[e]);
      de._jQueryInterface.call(i, i.data());
    }
  }),
    (c.default.fn[ee] = de._jQueryInterface),
    (c.default.fn[ee].Constructor = de),
    (c.default.fn[ee].noConflict = function () {
      return (c.default.fn[ee] = oe), de._jQueryInterface;
    });
  var ue = "bs.tab",
    he = c.default.fn.tab,
    fe = "active",
    pe = ".active",
    ge = "> li > .active",
    me =
      (((e = ve.prototype).show = function () {
        var t,
          e,
          i,
          o,
          s,
          n,
          l = this;
        (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
          c.default(this._element).hasClass(fe)) ||
          c.default(this._element).hasClass("disabled") ||
          ((n = c.default(this._element).closest(".nav, .list-group")[0]),
          (e = u.getSelectorFromElement(this._element)),
          n &&
            ((s = "UL" === n.nodeName || "OL" === n.nodeName ? ge : pe),
            (i = (i = c.default.makeArray(c.default(n).find(s)))[
              i.length - 1
            ])),
          (o = c.default.Event("hide.bs.tab", {
            relatedTarget: this._element,
          })),
          (s = c.default.Event("show.bs.tab", { relatedTarget: i })),
          i && c.default(i).trigger(o),
          c.default(this._element).trigger(s),
          s.isDefaultPrevented() ||
            o.isDefaultPrevented() ||
            (e && (t = document.querySelector(e)),
            this._activate(this._element, n),
            (n = function () {
              var t = c.default.Event("hidden.bs.tab", {
                  relatedTarget: l._element,
                }),
                e = c.default.Event("shown.bs.tab", { relatedTarget: i });
              c.default(i).trigger(t), c.default(l._element).trigger(e);
            }),
            t ? this._activate(t, t.parentNode, n) : n()));
      }),
      (e.dispose = function () {
        c.default.removeData(this._element, ue), (this._element = null);
      }),
      (e._activate = function (t, e, i) {
        var o = this,
          s = (
            !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
              ? c.default(e).children(pe)
              : c.default(e).find(ge)
          )[0],
          n = i && s && c.default(s).hasClass("fade"),
          e = function () {
            return o._transitionComplete(t, s, i);
          };
        s && n
          ? ((n = u.getTransitionDurationFromElement(s)),
            c
              .default(s)
              .removeClass("show")
              .one(u.TRANSITION_END, e)
              .emulateTransitionEnd(n))
          : e();
      }),
      (e._transitionComplete = function (t, e, i) {
        var o;
        e &&
          (c.default(e).removeClass(fe),
          (o = c.default(e.parentNode).find("> .dropdown-menu .active")[0]) &&
            c.default(o).removeClass(fe),
          "tab" === e.getAttribute("role") &&
            e.setAttribute("aria-selected", !1)),
          c.default(t).addClass(fe),
          "tab" === t.getAttribute("role") &&
            t.setAttribute("aria-selected", !0),
          u.reflow(t),
          t.classList.contains("fade") && t.classList.add("show");
        e = t.parentNode;
        (e = e && "LI" === e.nodeName ? e.parentNode : e) &&
          c.default(e).hasClass("dropdown-menu") &&
          ((e = c.default(t).closest(".dropdown")[0]) &&
            ((e = [].slice.call(e.querySelectorAll(".dropdown-toggle"))),
            c.default(e).addClass(fe)),
          t.setAttribute("aria-expanded", !0)),
          i && i();
      }),
      (ve._jQueryInterface = function (i) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(ue);
          if (
            (e || ((e = new ve(this)), t.data(ue, e)), "string" == typeof i)
          ) {
            if (void 0 === e[i])
              throw new TypeError('No method named "' + i + '"');
            e[i]();
          }
        });
      }),
      l(ve, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]),
      ve);
  function ve(t) {
    this._element = t;
  }
  c
    .default(document)
    .on(
      "click.bs.tab.data-api",
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      function (t) {
        t.preventDefault(), me._jQueryInterface.call(c.default(this), "show");
      }
    ),
    (c.default.fn.tab = me._jQueryInterface),
    (c.default.fn.tab.Constructor = me),
    (c.default.fn.tab.noConflict = function () {
      return (c.default.fn.tab = he), me._jQueryInterface;
    });
  var _e = "bs.toast",
    ye = c.default.fn.toast,
    be = "show",
    we = "showing",
    Te = "click.dismiss.bs.toast",
    ke = { animation: !0, autohide: !0, delay: 500 },
    Se = { animation: "boolean", autohide: "boolean", delay: "number" },
    Ce =
      (((e = Ee.prototype).show = function () {
        var t,
          e = this,
          i = c.default.Event("show.bs.toast");
        c.default(this._element).trigger(i),
          i.isDefaultPrevented() ||
            (this._clearTimeout(),
            this._config.animation && this._element.classList.add("fade"),
            (t = function () {
              e._element.classList.remove(we),
                e._element.classList.add(be),
                c.default(e._element).trigger("shown.bs.toast"),
                e._config.autohide &&
                  (e._timeout = setTimeout(function () {
                    e.hide();
                  }, e._config.delay));
            }),
            this._element.classList.remove("hide"),
            u.reflow(this._element),
            this._element.classList.add(we),
            this._config.animation
              ? ((i = u.getTransitionDurationFromElement(this._element)),
                c
                  .default(this._element)
                  .one(u.TRANSITION_END, t)
                  .emulateTransitionEnd(i))
              : t());
      }),
      (e.hide = function () {
        var t;
        this._element.classList.contains(be) &&
          ((t = c.default.Event("hide.bs.toast")),
          c.default(this._element).trigger(t),
          t.isDefaultPrevented() || this._close());
      }),
      (e.dispose = function () {
        this._clearTimeout(),
          this._element.classList.contains(be) &&
            this._element.classList.remove(be),
          c.default(this._element).off(Te),
          c.default.removeData(this._element, _e),
          (this._element = null),
          (this._config = null);
      }),
      (e._getConfig = function (t) {
        return (
          (t = r(
            {},
            ke,
            c.default(this._element).data(),
            "object" == typeof t && t ? t : {}
          )),
          u.typeCheckConfig("toast", t, this.constructor.DefaultType),
          t
        );
      }),
      (e._setListeners = function () {
        var t = this;
        c.default(this._element).on(Te, '[data-dismiss="toast"]', function () {
          return t.hide();
        });
      }),
      (e._close = function () {
        function t() {
          i._element.classList.add("hide"),
            c.default(i._element).trigger("hidden.bs.toast");
        }
        var e,
          i = this;
        this._element.classList.remove(be),
          this._config.animation
            ? ((e = u.getTransitionDurationFromElement(this._element)),
              c
                .default(this._element)
                .one(u.TRANSITION_END, t)
                .emulateTransitionEnd(e))
            : t();
      }),
      (e._clearTimeout = function () {
        clearTimeout(this._timeout), (this._timeout = null);
      }),
      (Ee._jQueryInterface = function (i) {
        return this.each(function () {
          var t = c.default(this),
            e = t.data(_e);
          if (
            (e ||
              ((e = new Ee(this, "object" == typeof i && i)), t.data(_e, e)),
            "string" == typeof i)
          ) {
            if (void 0 === e[i])
              throw new TypeError('No method named "' + i + '"');
            e[i](this);
          }
        });
      }),
      l(Ee, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return Se;
          },
        },
        {
          key: "Default",
          get: function () {
            return ke;
          },
        },
      ]),
      Ee);
  function Ee(t, e) {
    (this._element = t),
      (this._config = this._getConfig(e)),
      (this._timeout = null),
      this._setListeners();
  }
  (c.default.fn.toast = Ce._jQueryInterface),
    (c.default.fn.toast.Constructor = Ce),
    (c.default.fn.toast.noConflict = function () {
      return (c.default.fn.toast = ye), Ce._jQueryInterface;
    }),
    (t.Alert = p),
    (t.Button = w),
    (t.Carousel = P),
    (t.Collapse = X),
    (t.Dropdown = dt),
    (t.Modal = $t),
    (t.Popover = te),
    (t.Scrollspy = de),
    (t.Tab = me),
    (t.Toast = Ce),
    (t.Tooltip = Qt),
    (t.Util = u),
    Object.defineProperty(t, "__esModule", { value: !0 });
}),
  (function (t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "undefined" != typeof exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
  })(function (d) {
    "use strict";
    var o,
      l = window.Slick || {};
    (o = 0),
      ((l = function (t, e) {
        var i = this;
        (i.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: d(t),
          appendDots: d(t),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button"><i class="fa-solid fa-circle-chevron-left"></i></button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button"><i class="fa-solid fa-circle-chevron-right"></i></button>',
          

          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (t, e) {
            return d('<button type="button" />').text(e + 1);
          },
         
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (i.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          d.extend(i, i.initials),
          (i.activeBreakpoint = null),
          (i.animType = null),
          (i.animProp = null),
          (i.breakpoints = []),
          (i.breakpointSettings = []),
          (i.cssTransitions = !1),
          (i.focussed = !1),
          (i.interrupted = !1),
          (i.hidden = "hidden"),
          (i.paused = !0),
          (i.positionProp = null),
          (i.respondTo = null),
          (i.rowCount = 1),
          (i.shouldClick = !0),
          (i.$slider = d(t)),
          (i.$slidesCache = null),
          (i.transformType = null),
          (i.transitionType = null),
          (i.visibilityChange = "visibilitychange"),
          (i.windowWidth = 0),
          (i.windowTimer = null),
          (t = d(t).data("slick") || {}),
          (i.options = d.extend({}, i.defaults, e, t)),
          (i.currentSlide = i.options.initialSlide),
          (i.originalSettings = i.options),
          void 0 !== document.mozHidden
            ? ((i.hidden = "mozHidden"),
              (i.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((i.hidden = "webkitHidden"),
              (i.visibilityChange = "webkitvisibilitychange")),
          (i.autoPlay = d.proxy(i.autoPlay, i)),
          (i.autoPlayClear = d.proxy(i.autoPlayClear, i)),
          (i.autoPlayIterator = d.proxy(i.autoPlayIterator, i)),
          (i.changeSlide = d.proxy(i.changeSlide, i)),
          (i.clickHandler = d.proxy(i.clickHandler, i)),
          (i.selectHandler = d.proxy(i.selectHandler, i)),
          (i.setPosition = d.proxy(i.setPosition, i)),
          (i.swipeHandler = d.proxy(i.swipeHandler, i)),
          (i.dragHandler = d.proxy(i.dragHandler, i)),
          (i.keyHandler = d.proxy(i.keyHandler, i)),
          (i.instanceUid = o++),
          (i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          i.registerBreakpoints(),
          i.init(!0);
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
      (l.prototype.addSlide = l.prototype.slickAdd =
        function (t, e, i) {
          var o = this;
          if ("boolean" == typeof e) (i = e), (e = null);
          else if (e < 0 || e >= o.slideCount) return !1;
          o.unload(),
            "number" == typeof e
              ? 0 === e && 0 === o.$slides.length
                ? d(t).appendTo(o.$slideTrack)
                : i
                ? d(t).insertBefore(o.$slides.eq(e))
                : d(t).insertAfter(o.$slides.eq(e))
              : !0 === i
              ? d(t).prependTo(o.$slideTrack)
              : d(t).appendTo(o.$slideTrack),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            o.$slides.each(function (t, e) {
              d(e).attr("data-slick-index", t);
            }),
            (o.$slidesCache = o.$slides),
            o.reinit();
        }),
      (l.prototype.animateHeight = function () {
        var t,
          e = this;
        1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical &&
          ((t = e.$slides.eq(e.currentSlide).outerHeight(!0)),
          e.$list.animate({ height: t }, e.options.speed));
      }),
      (l.prototype.animateSlide = function (t, e) {
        var i = {},
          o = this;
        o.animateHeight(),
          !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
          !1 === o.transformsEnabled
            ? !1 === o.options.vertical
              ? o.$slideTrack.animate(
                  { left: t },
                  o.options.speed,
                  o.options.easing,
                  e
                )
              : o.$slideTrack.animate(
                  { top: t },
                  o.options.speed,
                  o.options.easing,
                  e
                )
            : !1 === o.cssTransitions
            ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
              d({ animStart: o.currentLeft }).animate(
                { animStart: t },
                {
                  duration: o.options.speed,
                  easing: o.options.easing,
                  step: function (t) {
                    (t = Math.ceil(t)),
                      !1 === o.options.vertical
                        ? (i[o.animType] = "translate(" + t + "px, 0px)")
                        : (i[o.animType] = "translate(0px," + t + "px)"),
                      o.$slideTrack.css(i);
                  },
                  complete: function () {
                    e && e.call();
                  },
                }
              ))
            : (o.applyTransition(),
              (t = Math.ceil(t)),
              !1 === o.options.vertical
                ? (i[o.animType] = "translate3d(" + t + "px, 0px, 0px)")
                : (i[o.animType] = "translate3d(0px," + t + "px, 0px)"),
              o.$slideTrack.css(i),
              e &&
                setTimeout(function () {
                  o.disableTransition(), e.call();
                }, o.options.speed));
      }),
      (l.prototype.getNavTarget = function () {
        var t = this.options.asNavFor;
        return (t = t && null !== t ? d(t).not(this.$slider) : t);
      }),
      (l.prototype.asNavFor = function (e) {
        var t = this.getNavTarget();
        null !== t &&
          "object" == typeof t &&
          t.each(function () {
            var t = d(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
          });
      }),
      (l.prototype.applyTransition = function (t) {
        var e = this,
          i = {};
        !1 === e.options.fade
          ? (i[e.transitionType] =
              e.transformType +
              " " +
              e.options.speed +
              "ms " +
              e.options.cssEase)
          : (i[e.transitionType] =
              "opacity " + e.options.speed + "ms " + e.options.cssEase),
          (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(t)).css(i);
      }),
      (l.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayClear(),
          t.slideCount > t.options.slidesToShow &&
            (t.autoPlayTimer = setInterval(
              t.autoPlayIterator,
              t.options.autoplaySpeed
            ));
      }),
      (l.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (l.prototype.autoPlayIterator = function () {
        var t = this,
          e = t.currentSlide + t.options.slidesToScroll;
        t.paused ||
          t.interrupted ||
          t.focussed ||
          (!1 === t.options.infinite &&
            (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
              ? (t.direction = 0)
              : 0 === t.direction &&
                ((e = t.currentSlide - t.options.slidesToScroll),
                t.currentSlide - 1 == 0 && (t.direction = 1))),
          t.slideHandler(e));
      }),
      (l.prototype.buildArrows = function () {
        var t = this;
        !0 === t.options.arrows &&
          ((t.$prevArrow = d(t.options.prevArrow).addClass("slick-arrow")),
          (t.$nextArrow = d(t.options.nextArrow).addClass("slick-arrow")),
          t.slideCount > t.options.slidesToShow
            ? (t.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.htmlExpr.test(t.options.prevArrow) &&
                t.$prevArrow.prependTo(t.options.appendArrows),
              t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.appendTo(t.options.appendArrows),
              !0 !== t.options.infinite &&
                t.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : t.$prevArrow
                .add(t.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (l.prototype.buildDots = function () {
        var t,
          e,
          i = this;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
          for (
            i.$slider.addClass("slick-dotted"),
              e = d("<ul />").addClass(i.options.dotsClass),
              t = 0;
            t <= i.getDotCount();
            t += 1
          )
            e.append(
              d("<li />").append(i.options.customPaging.call(this, i, t))
            );
          (i.$dots = e.appendTo(i.options.appendDots)),
            i.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (l.prototype.buildOut = function () {
        var t = this;
        (t.$slides = t.$slider
          .children(t.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.$slides.each(function (t, e) {
            d(e)
              .attr("data-slick-index", t)
              .data("originalStyling", d(e).attr("style") || "");
          }),
          t.$slider.addClass("slick-slider"),
          (t.$slideTrack =
            0 === t.slideCount
              ? d('<div class="slick-track"/>').appendTo(t.$slider)
              : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          t.$slideTrack.css("opacity", 0),
          (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
            (t.options.slidesToScroll = 1),
          d("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
          t.setupInfinite(),
          t.buildArrows(),
          t.buildDots(),
          t.updateDots(),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          !0 === t.options.draggable && t.$list.addClass("draggable");
      }),
      (l.prototype.buildRows = function () {
        var t,
          e,
          i,
          o = this,
          s = document.createDocumentFragment(),
          n = o.$slider.children();
        if (0 < o.options.rows) {
          for (
            i = o.options.slidesPerRow * o.options.rows,
              e = Math.ceil(n.length / i),
              t = 0;
            t < e;
            t++
          ) {
            for (
              var l = document.createElement("div"), r = 0;
              r < o.options.rows;
              r++
            ) {
              for (
                var a = document.createElement("div"), d = 0;
                d < o.options.slidesPerRow;
                d++
              ) {
                var c = t * i + (r * o.options.slidesPerRow + d);
                n.get(c) && a.appendChild(n.get(c));
              }
              l.appendChild(a);
            }
            s.appendChild(l);
          }
          o.$slider.empty().append(s),
            o.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (l.prototype.checkResponsive = function (t, e) {
        var i,
          o,
          s,
          n = this,
          l = !1,
          r = n.$slider.width(),
          a = window.innerWidth || d(window).width();
        if (
          ("window" === n.respondTo
            ? (s = a)
            : "slider" === n.respondTo
            ? (s = r)
            : "min" === n.respondTo && (s = Math.min(a, r)),
          n.options.responsive &&
            n.options.responsive.length &&
            null !== n.options.responsive)
        ) {
          for (i in ((o = null), n.breakpoints))
            n.breakpoints.hasOwnProperty(i) &&
              (!1 === n.originalSettings.mobileFirst
                ? s < n.breakpoints[i] && (o = n.breakpoints[i])
                : s > n.breakpoints[i] && (o = n.breakpoints[i]));
          null !== o
            ? (null !== n.activeBreakpoint && o === n.activeBreakpoint && !e) ||
              ((n.activeBreakpoint = o),
              "unslick" === n.breakpointSettings[o]
                ? n.unslick(o)
                : ((n.options = d.extend(
                    {},
                    n.originalSettings,
                    n.breakpointSettings[o]
                  )),
                  !0 === t && (n.currentSlide = n.options.initialSlide),
                  n.refresh(t)),
              (l = o))
            : null !== n.activeBreakpoint &&
              ((n.activeBreakpoint = null),
              (n.options = n.originalSettings),
              !0 === t && (n.currentSlide = n.options.initialSlide),
              n.refresh(t),
              (l = o)),
            t || !1 === l || n.$slider.trigger("breakpoint", [n, l]);
        }
      }),
      (l.prototype.changeSlide = function (t, e) {
        var i,
          o = this,
          s = d(t.currentTarget);
        switch (
          (s.is("a") && t.preventDefault(),
          s.is("li") || (s = s.closest("li")),
          (i =
            o.slideCount % o.options.slidesToScroll != 0
              ? 0
              : (o.slideCount - o.currentSlide) % o.options.slidesToScroll),
          t.data.message)
        ) {
          case "previous":
            (n =
              0 == i ? o.options.slidesToScroll : o.options.slidesToShow - i),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide - n, !1, e);
            break;
          case "next":
            (n = 0 == i ? o.options.slidesToScroll : i),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide + n, !1, e);
            break;
          case "index":
            var n =
              0 === t.data.index
                ? 0
                : t.data.index || s.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(n), !1, e),
              s.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (l.prototype.checkNavigable = function (t) {
        var e = this.getNavigableIndexes(),
          i = 0;
        if (t > e[e.length - 1]) t = e[e.length - 1];
        else
          for (var o in e) {
            if (t < e[o]) {
              t = i;
              break;
            }
            i = e[o];
          }
        return t;
      }),
      (l.prototype.cleanUpEvents = function () {
        var t = this;
        t.options.dots &&
          null !== t.$dots &&
          (d("li", t.$dots)
            .off("click.slick", t.changeSlide)
            .off("mouseenter.slick", d.proxy(t.interrupt, t, !0))
            .off("mouseleave.slick", d.proxy(t.interrupt, t, !1)),
          !0 === t.options.accessibility &&
            t.$dots.off("keydown.slick", t.keyHandler)),
          t.$slider.off("focus.slick blur.slick"),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
            t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
            !0 === t.options.accessibility &&
              (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler),
              t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
          t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
          t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
          t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
          t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
          t.$list.off("click.slick", t.clickHandler),
          d(document).off(t.visibilityChange, t.visibility),
          t.cleanUpSlideEvents(),
          !0 === t.options.accessibility &&
            t.$list.off("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().off("click.slick", t.selectHandler),
          d(window).off(
            "orientationchange.slick.slick-" + t.instanceUid,
            t.orientationChange
          ),
          d(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
          d("[draggable!=true]", t.$slideTrack).off(
            "dragstart",
            t.preventDefault
          ),
          d(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
      }),
      (l.prototype.cleanUpSlideEvents = function () {
        var t = this;
        t.$list.off("mouseenter.slick", d.proxy(t.interrupt, t, !0)),
          t.$list.off("mouseleave.slick", d.proxy(t.interrupt, t, !1));
      }),
      (l.prototype.cleanUpRows = function () {
        var t;
        0 < this.options.rows &&
          ((t = this.$slides.children().children()).removeAttr("style"),
          this.$slider.empty().append(t));
      }),
      (l.prototype.clickHandler = function (t) {
        !1 === this.shouldClick &&
          (t.stopImmediatePropagation(),
          t.stopPropagation(),
          t.preventDefault());
      }),
      (l.prototype.destroy = function (t) {
        var e = this;
        e.autoPlayClear(),
          (e.touchObject = {}),
          e.cleanUpEvents(),
          d(".slick-cloned", e.$slider).detach(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.$prevArrow.length &&
            (e.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
          e.$nextArrow &&
            e.$nextArrow.length &&
            (e.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
          e.$slides &&
            (e.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                d(this).attr("style", d(this).data("originalStyling"));
              }),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slideTrack.detach(),
            e.$list.detach(),
            e.$slider.append(e.$slides)),
          e.cleanUpRows(),
          e.$slider.removeClass("slick-slider"),
          e.$slider.removeClass("slick-initialized"),
          e.$slider.removeClass("slick-dotted"),
          (e.unslicked = !0),
          t || e.$slider.trigger("destroy", [e]);
      }),
      (l.prototype.disableTransition = function (t) {
        var e = {};
        (e[this.transitionType] = ""),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(t)
          ).css(e);
      }),
      (l.prototype.fadeSlide = function (t, e) {
        var i = this;
        !1 === i.cssTransitions
          ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
            i.$slides
              .eq(t)
              .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
          : (i.applyTransition(t),
            i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
            e &&
              setTimeout(function () {
                i.disableTransition(t), e.call();
              }, i.options.speed));
      }),
      (l.prototype.fadeSlideOut = function (t) {
        var e = this;
        !1 === e.cssTransitions
          ? e.$slides
              .eq(t)
              .animate(
                { opacity: 0, zIndex: e.options.zIndex - 2 },
                e.options.speed,
                e.options.easing
              )
          : (e.applyTransition(t),
            e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
      }),
      (l.prototype.filterSlides = l.prototype.slickFilter =
        function (t) {
          var e = this;
          null !== t &&
            ((e.$slidesCache = e.$slides),
            e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.filter(t).appendTo(e.$slideTrack),
            e.reinit());
        }),
      (l.prototype.focusHandler = function () {
        var i = this;
        i.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (t) {
            t.stopImmediatePropagation();
            var e = d(this);
            setTimeout(function () {
              i.options.pauseOnFocus &&
                ((i.focussed = e.is(":focus")), i.autoPlay());
            }, 0);
          });
      }),
      (l.prototype.getCurrent = l.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide;
        }),
      (l.prototype.getDotCount = function () {
        var t = this,
          e = 0,
          i = 0,
          o = 0;
        if (!0 === t.options.infinite)
          if (t.slideCount <= t.options.slidesToShow) ++o;
          else
            for (; e < t.slideCount; )
              ++o,
                (e = i + t.options.slidesToScroll),
                (i +=
                  t.options.slidesToScroll <= t.options.slidesToShow
                    ? t.options.slidesToScroll
                    : t.options.slidesToShow);
        else if (!0 === t.options.centerMode) o = t.slideCount;
        else if (t.options.asNavFor)
          for (; e < t.slideCount; )
            ++o,
              (e = i + t.options.slidesToScroll),
              (i +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow);
        else
          o =
            1 +
            Math.ceil(
              (t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll
            );
        return o - 1;
      }),
      (l.prototype.getLeft = function (t) {
        var e,
          i,
          o = this,
          s = 0;
        return (
          (o.slideOffset = 0),
          (e = o.$slides.first().outerHeight(!0)),
          !0 === o.options.infinite
            ? (o.slideCount > o.options.slidesToShow &&
                ((o.slideOffset = o.slideWidth * o.options.slidesToShow * -1),
                (i = -1),
                !0 === o.options.vertical &&
                  !0 === o.options.centerMode &&
                  (2 === o.options.slidesToShow
                    ? (i = -1.5)
                    : 1 === o.options.slidesToShow && (i = -2)),
                (s = e * o.options.slidesToShow * i)),
              o.slideCount % o.options.slidesToScroll != 0 &&
                t + o.options.slidesToScroll > o.slideCount &&
                o.slideCount > o.options.slidesToShow &&
                (s =
                  t > o.slideCount
                    ? ((o.slideOffset =
                        (o.options.slidesToShow - (t - o.slideCount)) *
                        o.slideWidth *
                        -1),
                      (o.options.slidesToShow - (t - o.slideCount)) * e * -1)
                    : ((o.slideOffset =
                        (o.slideCount % o.options.slidesToScroll) *
                        o.slideWidth *
                        -1),
                      (o.slideCount % o.options.slidesToScroll) * e * -1)))
            : t + o.options.slidesToShow > o.slideCount &&
              ((o.slideOffset =
                (t + o.options.slidesToShow - o.slideCount) * o.slideWidth),
              (s = (t + o.options.slidesToShow - o.slideCount) * e)),
          o.slideCount <= o.options.slidesToShow && (s = o.slideOffset = 0),
          !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow
            ? (o.slideOffset =
                (o.slideWidth * Math.floor(o.options.slidesToShow)) / 2 -
                (o.slideWidth * o.slideCount) / 2)
            : !0 === o.options.centerMode && !0 === o.options.infinite
            ? (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                o.slideWidth)
            : !0 === o.options.centerMode &&
              ((o.slideOffset = 0),
              (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
          (e =
            !1 === o.options.vertical
              ? t * o.slideWidth * -1 + o.slideOffset
              : t * e * -1 + s),
          !0 === o.options.variableWidth &&
            ((s =
              o.slideCount <= o.options.slidesToShow ||
              !1 === o.options.infinite
                ? o.$slideTrack.children(".slick-slide").eq(t)
                : o.$slideTrack
                    .children(".slick-slide")
                    .eq(t + o.options.slidesToShow)),
            (e =
              !0 === o.options.rtl
                ? s[0]
                  ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                  : 0
                : s[0]
                ? -1 * s[0].offsetLeft
                : 0),
            !0 === o.options.centerMode &&
              ((s =
                o.slideCount <= o.options.slidesToShow ||
                !1 === o.options.infinite
                  ? o.$slideTrack.children(".slick-slide").eq(t)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(t + o.options.slidesToShow + 1)),
              (e =
                !0 === o.options.rtl
                  ? s[0]
                    ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                    : 0
                  : s[0]
                  ? -1 * s[0].offsetLeft
                  : 0),
              (e += (o.$list.width() - s.outerWidth()) / 2))),
          e
        );
      }),
      (l.prototype.getOption = l.prototype.slickGetOption =
        function (t) {
          return this.options[t];
        }),
      (l.prototype.getNavigableIndexes = function () {
        for (
          var t = this,
            e = 0,
            i = 0,
            o = [],
            s =
              !1 === t.options.infinite
                ? t.slideCount
                : ((e = -1 * t.options.slidesToScroll),
                  (i = -1 * t.options.slidesToScroll),
                  2 * t.slideCount);
          e < s;

        )
          o.push(e),
            (e = i + t.options.slidesToScroll),
            (i +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow);
        return o;
      }),
      (l.prototype.getSlick = function () {
        return this;
      }),
      (l.prototype.getSlideCount = function () {
        var i,
          o = this,
          s =
            !0 === o.options.centerMode
              ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
              : 0;
        return !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (t, e) {
              if (e.offsetLeft - s + d(e).outerWidth() / 2 > -1 * o.swipeLeft)
                return (i = e), !1;
            }),
            Math.abs(d(i).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll;
      }),
      (l.prototype.goTo = l.prototype.slickGoTo =
        function (t, e) {
          this.changeSlide(
            { data: { message: "index", index: parseInt(t) } },
            e
          );
        }),
      (l.prototype.init = function (t) {
        var e = this;
        d(e.$slider).hasClass("slick-initialized") ||
          (d(e.$slider).addClass("slick-initialized"),
          e.buildRows(),
          e.buildOut(),
          e.setProps(),
          e.startLoad(),
          e.loadSlider(),
          e.initializeEvents(),
          e.updateArrows(),
          e.updateDots(),
          e.checkResponsive(!0),
          e.focusHandler()),
          t && e.$slider.trigger("init", [e]),
          !0 === e.options.accessibility && e.initADA(),
          e.options.autoplay && ((e.paused = !1), e.autoPlay());
      }),
      (l.prototype.initADA = function () {
        var i = this,
          o = Math.ceil(i.slideCount / i.options.slidesToShow),
          s = i.getNavigableIndexes().filter(function (t) {
            return 0 <= t && t < i.slideCount;
          });
        i.$slides
          .add(i.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          null !== i.$dots &&
            (i.$slides
              .not(i.$slideTrack.find(".slick-cloned"))
              .each(function (t) {
                var e = s.indexOf(t);
                d(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + i.instanceUid + t,
                  tabindex: -1,
                }),
                  -1 !== e &&
                    ((e = "slick-slide-control" + i.instanceUid + e),
                    d("#" + e).length &&
                      d(this).attr({ "aria-describedby": e }));
              }),
            i.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (t) {
                var e = s[t];
                d(this).attr({ role: "" }),
                  d(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + i.instanceUid + t,
                      "aria-controls": "slick-slide" + i.instanceUid + e,
                      "aria-label": t + 1 + " of " + o,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(i.currentSlide)
              .find("button")
              .attr({ "aria-selected": "true", tabindex: "0" })
              .end());
        for (var t = i.currentSlide, e = t + i.options.slidesToShow; t < e; t++)
          i.options.focusOnChange
            ? i.$slides.eq(t).attr({ tabindex: "0" })
            : i.$slides.eq(t).removeAttr("tabindex");
        i.activateADA();
      }),
      (l.prototype.initArrowEvents = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, t.changeSlide),
          t.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, t.changeSlide),
          !0 === t.options.accessibility &&
            (t.$prevArrow.on("keydown.slick", t.keyHandler),
            t.$nextArrow.on("keydown.slick", t.keyHandler)));
      }),
      (l.prototype.initDotEvents = function () {
        var t = this;
        !0 === t.options.dots &&
        t.slideCount > t.options.slidesToShow &&
        (d("li", t.$dots).css('visibility', 'hidden').on(
          "click.slick",
          { message: "index" },
          t.changeSlide
        ),
        !0 === t.options.accessibility &&
        t.$dots.on("keydown.slick", t.keyHandler)),
        !0 === t.options.dots &&
        !0 === t.options.pauseOnDotsHover &&
        t.slideCount > t.options.slidesToShow &&
        d("li", t.$dots)
          .on("mouseenter.slick", d.proxy(t.interrupt, t, !0))
          .on("mouseleave.slick", d.proxy(t.interrupt, t, !1));
    }
    ),
      


      (l.prototype.initSlideEvents = function () {
        var t = this;
        t.options.pauseOnHover &&
          (t.$list.on("mouseenter.slick", d.proxy(t.interrupt, t, !0)),
          t.$list.on("mouseleave.slick", d.proxy(t.interrupt, t, !1)));
      }),
      (l.prototype.initializeEvents = function () {
        var t = this;
        t.initArrowEvents(),
          t.initDotEvents(),
          t.initSlideEvents(),
          t.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            t.swipeHandler
          ),
          t.$list.on("click.slick", t.clickHandler),
          d(document).on(t.visibilityChange, d.proxy(t.visibility, t)),
          !0 === t.options.accessibility &&
            t.$list.on("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().on("click.slick", t.selectHandler),
          d(window).on(
            "orientationchange.slick.slick-" + t.instanceUid,
            d.proxy(t.orientationChange, t)
          ),
          d(window).on(
            "resize.slick.slick-" + t.instanceUid,
            d.proxy(t.resize, t)
          ),
          d("[draggable!=true]", t.$slideTrack).on(
            "dragstart",
            t.preventDefault
          ),
          d(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
          d(t.setPosition);
      }),
      (l.prototype.initUI = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.show(), t.$nextArrow.show()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.show();
      }),
      (l.prototype.keyHandler = function (t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === t.keyCode && !0 === e.options.accessibility
            ? e.changeSlide({
                data: { message: !0 === e.options.rtl ? "next" : "previous" },
              })
            : 39 === t.keyCode &&
              !0 === e.options.accessibility &&
              e.changeSlide({
                data: { message: !0 === e.options.rtl ? "previous" : "next" },
              }));
      }),
      (l.prototype.lazyLoad = function () {
        var t,
          e,
          i,
          n = this;
        function o(t) {
          d("img[data-lazy]", t).each(function () {
            var t = d(this),
              e = d(this).attr("data-lazy"),
              i = d(this).attr("data-srcset"),
              o = d(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
              s = document.createElement("img");
            (s.onload = function () {
              t.animate({ opacity: 0 }, 100, function () {
                i && (t.attr("srcset", i), o && t.attr("sizes", o)),
                  t.attr("src", e).animate({ opacity: 1 }, 200, function () {
                    t.removeAttr(
                      "data-lazy data-srcset data-sizes"
                    ).removeClass("slick-loading");
                  }),
                  n.$slider.trigger("lazyLoaded", [n, t, e]);
              });
            }),
              (s.onerror = function () {
                t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  n.$slider.trigger("lazyLoadError", [n, t, e]);
              }),
              (s.src = e);
          });
        }
        if (
          (!0 === n.options.centerMode
            ? (i =
                !0 === n.options.infinite
                  ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                    n.options.slidesToShow +
                    2
                  : ((e = Math.max(
                      0,
                      n.currentSlide - (n.options.slidesToShow / 2 + 1)
                    )),
                    n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
            : ((e = n.options.infinite
                ? n.options.slidesToShow + n.currentSlide
                : n.currentSlide),
              (i = Math.ceil(e + n.options.slidesToShow)),
              !0 === n.options.fade &&
                (0 < e && e--, i <= n.slideCount && i++)),
          (t = n.$slider.find(".slick-slide").slice(e, i)),
          "anticipated" === n.options.lazyLoad)
        )
          for (
            var s = e - 1, l = i, r = n.$slider.find(".slick-slide"), a = 0;
            a < n.options.slidesToScroll;
            a++
          )
            s < 0 && (s = n.slideCount - 1),
              (t = (t = t.add(r.eq(s))).add(r.eq(l))),
              s--,
              l++;
        o(t),
          n.slideCount <= n.options.slidesToShow
            ? o(n.$slider.find(".slick-slide"))
            : n.currentSlide >= n.slideCount - n.options.slidesToShow
            ? o(
                n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)
              )
            : 0 === n.currentSlide &&
              o(
                n.$slider
                  .find(".slick-cloned")
                  .slice(-1 * n.options.slidesToShow)
              );
      }),
      (l.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(),
          t.$slideTrack.css({ opacity: 1 }),
          t.$slider.removeClass("slick-loading"),
          t.initUI(),
          "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
      }),
      (l.prototype.next = l.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: "next" } });
        }),
      (l.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (l.prototype.pause = l.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0);
        }),
      (l.prototype.play = l.prototype.slickPlay =
        function () {
          var t = this;
          t.autoPlay(),
            (t.options.autoplay = !0),
            (t.paused = !1),
            (t.focussed = !1),
            (t.interrupted = !1);
        }),
      (l.prototype.postSlide = function (t) {
        var e = this;
        e.unslicked ||
          (e.$slider.trigger("afterChange", [e, t]),
          (e.animating = !1),
          e.slideCount > e.options.slidesToShow && e.setPosition(),
          (e.swipeLeft = null),
          e.options.autoplay && e.autoPlay(),
          !0 === e.options.accessibility &&
            (e.initADA(),
            e.options.focusOnChange &&
              d(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (l.prototype.prev = l.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: "previous" } });
        }),
      (l.prototype.preventDefault = function (t) {
        t.preventDefault();
      }),
      (l.prototype.progressiveLazyLoad = function (t) {
        t = t || 1;
        var e,
          i,
          o,
          s,
          n = this,
          l = d("img[data-lazy]", n.$slider);
        l.length
          ? ((e = l.first()),
            (i = e.attr("data-lazy")),
            (o = e.attr("data-srcset")),
            (s = e.attr("data-sizes") || n.$slider.attr("data-sizes")),
            ((l = document.createElement("img")).onload = function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e
                  .attr("src", i)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === n.options.adaptiveHeight && n.setPosition(),
                n.$slider.trigger("lazyLoaded", [n, e, i]),
                n.progressiveLazyLoad();
            }),
            (l.onerror = function () {
              t < 3
                ? setTimeout(function () {
                    n.progressiveLazyLoad(t + 1);
                  }, 500)
                : (e
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  n.$slider.trigger("lazyLoadError", [n, e, i]),
                  n.progressiveLazyLoad());
            }),
            (l.src = i))
          : n.$slider.trigger("allImagesLoaded", [n]);
      }),
      (l.prototype.refresh = function (t) {
        var e = this,
          i = e.slideCount - e.options.slidesToShow;
        !e.options.infinite && e.currentSlide > i && (e.currentSlide = i),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          (i = e.currentSlide),
          e.destroy(!0),
          d.extend(e, e.initials, { currentSlide: i }),
          e.init(),
          t || e.changeSlide({ data: { message: "index", index: i } }, !1);
      }),
      (l.prototype.registerBreakpoints = function () {
        var t,
          e,
          i,
          o = this,
          s = o.options.responsive || null;
        if ("array" === d.type(s) && s.length) {
          for (t in ((o.respondTo = o.options.respondTo || "window"), s))
            if (((i = o.breakpoints.length - 1), s.hasOwnProperty(t))) {
              for (e = s[t].breakpoint; 0 <= i; )
                o.breakpoints[i] &&
                  o.breakpoints[i] === e &&
                  o.breakpoints.splice(i, 1),
                  i--;
              o.breakpoints.push(e), (o.breakpointSettings[e] = s[t].settings);
            }
          o.breakpoints.sort(function (t, e) {
            return o.options.mobileFirst ? t - e : e - t;
          });
        }
      }),
      (l.prototype.reinit = function () {
        var t = this;
        (t.$slides = t.$slideTrack
          .children(t.options.slide)
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.currentSlide >= t.slideCount &&
            0 !== t.currentSlide &&
            (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          t.registerBreakpoints(),
          t.setProps(),
          t.setupInfinite(),
          t.buildArrows(),
          t.updateArrows(),
          t.initArrowEvents(),
          t.buildDots(),
          t.updateDots(),
          t.initDotEvents(),
          t.cleanUpSlideEvents(),
          t.initSlideEvents(),
          t.checkResponsive(!1, !0),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().on("click.slick", t.selectHandler),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          t.setPosition(),
          t.focusHandler(),
          (t.paused = !t.options.autoplay),
          t.autoPlay(),
          t.$slider.trigger("reInit", [t]);
      }),
      (l.prototype.resize = function () {
        var t = this;
        d(window).width() !== t.windowWidth &&
          (clearTimeout(t.windowDelay),
          (t.windowDelay = window.setTimeout(function () {
            (t.windowWidth = d(window).width()),
              t.checkResponsive(),
              t.unslicked || t.setPosition();
          }, 50)));
      }),
      (l.prototype.removeSlide = l.prototype.slickRemove =
        function (t, e, i) {
          var o = this;
          if (
            ((t =
              "boolean" == typeof t
                ? !0 === (e = t)
                  ? 0
                  : o.slideCount - 1
                : !0 === e
                ? --t
                : t),
            o.slideCount < 1 || t < 0 || t > o.slideCount - 1)
          )
            return !1;
          o.unload(),
            (!0 === i
              ? o.$slideTrack.children()
              : o.$slideTrack.children(this.options.slide).eq(t)
            ).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            o.reinit();
        }),
      (l.prototype.setCSS = function (t) {
        var e,
          i,
          o = this,
          s = {};
        !0 === o.options.rtl && (t = -t),
          (e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
          (i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
          (s[o.positionProp] = t),
          !1 === o.transformsEnabled ||
            (!(s = {}) === o.cssTransitions
              ? (s[o.animType] = "translate(" + e + ", " + i + ")")
              : (s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)")),
          o.$slideTrack.css(s);
      }),
      (l.prototype.setDimensions = function () {
        var t = this;
        !1 === t.options.vertical
          ? !0 === t.options.centerMode &&
            t.$list.css({ padding: "0px " + t.options.centerPadding })
          : (t.$list.height(
              t.$slides.first().outerHeight(!0) * t.options.slidesToShow
            ),
            !0 === t.options.centerMode &&
              t.$list.css({ padding: t.options.centerPadding + " 0px" })),
          (t.listWidth = t.$list.width()),
          (t.listHeight = t.$list.height()),
          !1 === t.options.vertical && !1 === t.options.variableWidth
            ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)),
              t.$slideTrack.width(
                Math.ceil(
                  t.slideWidth * t.$slideTrack.children(".slick-slide").length
                )
              ))
            : !0 === t.options.variableWidth
            ? t.$slideTrack.width(5e3 * t.slideCount)
            : ((t.slideWidth = Math.ceil(t.listWidth)),
              t.$slideTrack.height(
                Math.ceil(
                  t.$slides.first().outerHeight(!0) *
                    t.$slideTrack.children(".slick-slide").length
                )
              ));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth &&
          t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
      }),
      (l.prototype.setFade = function () {
        var i,
          o = this;
        o.$slides.each(function (t, e) {
          (i = o.slideWidth * t * -1),
            !0 === o.options.rtl
              ? d(e).css({
                  position: "relative",
                  right: i,
                  top: 0,
                  zIndex: o.options.zIndex - 2,
                  opacity: 0,
                })
              : d(e).css({
                  position: "relative",
                  left: i,
                  top: 0,
                  zIndex: o.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          o.$slides
            .eq(o.currentSlide)
            .css({ zIndex: o.options.zIndex - 1, opacity: 1 });
      }),
      (l.prototype.setHeight = function () {
        var t,
          e = this;
        1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical &&
          ((t = e.$slides.eq(e.currentSlide).outerHeight(!0)),
          e.$list.css("height", t));
      }),
      (l.prototype.setOption = l.prototype.slickSetOption =
        function () {
          var t,
            e,
            i,
            o,
            s,
            n = this,
            l = !1;
          if (
            ("object" === d.type(arguments[0])
              ? ((i = arguments[0]), (l = arguments[1]), (s = "multiple"))
              : "string" === d.type(arguments[0]) &&
                ((i = arguments[0]),
                (o = arguments[1]),
                (l = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === d.type(arguments[1])
                  ? (s = "responsive")
                  : void 0 !== arguments[1] && (s = "single")),
            "single" === s)
          )
            n.options[i] = o;
          else if ("multiple" === s)
            d.each(i, function (t, e) {
              n.options[t] = e;
            });
          else if ("responsive" === s)
            for (e in o)
              if ("array" !== d.type(n.options.responsive))
                n.options.responsive = [o[e]];
              else {
                for (t = n.options.responsive.length - 1; 0 <= t; )
                  n.options.responsive[t].breakpoint === o[e].breakpoint &&
                    n.options.responsive.splice(t, 1),
                    t--;
                n.options.responsive.push(o[e]);
              }
          l && (n.unload(), n.reinit());
        }),
      (l.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(),
          t.setHeight(),
          !1 === t.options.fade
            ? t.setCSS(t.getLeft(t.currentSlide))
            : t.setFade(),
          t.$slider.trigger("setPosition", [t]);
      }),
      (l.prototype.setProps = function () {
        var t = this,
          e = document.body.style;
        (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
          "top" === t.positionProp
            ? t.$slider.addClass("slick-vertical")
            : t.$slider.removeClass("slick-vertical"),
          (void 0 === e.WebkitTransition &&
            void 0 === e.MozTransition &&
            void 0 === e.msTransition) ||
            (!0 === t.options.useCSS && (t.cssTransitions = !0)),
          t.options.fade &&
            ("number" == typeof t.options.zIndex
              ? t.options.zIndex < 3 && (t.options.zIndex = 3)
              : (t.options.zIndex = t.defaults.zIndex)),
          void 0 !== e.OTransform &&
            ((t.animType = "OTransform"),
            (t.transformType = "-o-transform"),
            (t.transitionType = "OTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== e.MozTransform &&
            ((t.animType = "MozTransform"),
            (t.transformType = "-moz-transform"),
            (t.transitionType = "MozTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.MozPerspective &&
              (t.animType = !1)),
          void 0 !== e.webkitTransform &&
            ((t.animType = "webkitTransform"),
            (t.transformType = "-webkit-transform"),
            (t.transitionType = "webkitTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (t.animType = !1)),
          void 0 !== e.msTransform &&
            ((t.animType = "msTransform"),
            (t.transformType = "-ms-transform"),
            (t.transitionType = "msTransition"),
            void 0 === e.msTransform && (t.animType = !1)),
          void 0 !== e.transform &&
            !1 !== t.animType &&
            ((t.animType = "transform"),
            (t.transformType = "transform"),
            (t.transitionType = "transition")),
          (t.transformsEnabled =
            t.options.useTransform && null !== t.animType && !1 !== t.animType);
      }),
      (l.prototype.setSlideClasses = function (t) {
        var e,
          i,
          o,
          s = this,
          n = s.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true");
        s.$slides.eq(t).addClass("slick-current"),
          !0 === s.options.centerMode
            ? ((i = s.options.slidesToShow % 2 == 0 ? 1 : 0),
              (o = Math.floor(s.options.slidesToShow / 2)),
              !0 === s.options.infinite &&
                (o <= t && t <= s.slideCount - 1 - o
                  ? s.$slides
                      .slice(t - o + i, t + o + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((e = s.options.slidesToShow + t),
                    n
                      .slice(e - o + 1 + i, e + o + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === t
                  ? n
                      .eq(n.length - 1 - s.options.slidesToShow)
                      .addClass("slick-center")
                  : t === s.slideCount - 1 &&
                    n.eq(s.options.slidesToShow).addClass("slick-center")),
              s.$slides.eq(t).addClass("slick-center"))
            : 0 <= t && t <= s.slideCount - s.options.slidesToShow
            ? s.$slides
                .slice(t, t + s.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : n.length <= s.options.slidesToShow
            ? n.addClass("slick-active").attr("aria-hidden", "false")
            : ((o = s.slideCount % s.options.slidesToShow),
              (e = !0 === s.options.infinite ? s.options.slidesToShow + t : t),
              (s.options.slidesToShow == s.options.slidesToScroll &&
              s.slideCount - t < s.options.slidesToShow
                ? n.slice(e - (s.options.slidesToShow - o), e + o)
                : n.slice(e, e + s.options.slidesToShow)
              )
                .addClass("slick-active")
                .attr("aria-hidden", "false")),
          ("ondemand" !== s.options.lazyLoad &&
            "anticipated" !== s.options.lazyLoad) ||
            s.lazyLoad();
      }),
      (l.prototype.setupInfinite = function () {
        var t,
          e,
          i,
          o = this;
        if (
          (!0 === o.options.fade && (o.options.centerMode = !1),
          !0 === o.options.infinite &&
            !1 === o.options.fade &&
            ((e = null), o.slideCount > o.options.slidesToShow))
        ) {
          for (
            i =
              !0 === o.options.centerMode
                ? o.options.slidesToShow + 1
                : o.options.slidesToShow,
              t = o.slideCount;
            t > o.slideCount - i;
            --t
          )
            d(o.$slides[(e = t - 1)])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", e - o.slideCount)
              .prependTo(o.$slideTrack)
              .addClass("slick-cloned");
          for (t = 0; t < i + o.slideCount; t += 1)
            d(o.$slides[(e = t)])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", e + o.slideCount)
              .appendTo(o.$slideTrack)
              .addClass("slick-cloned");
          o.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              d(this).attr("id", "");
            });
        }
      }),
      (l.prototype.interrupt = function (t) {
        t || this.autoPlay(), (this.interrupted = t);
      }),
      (l.prototype.selectHandler = function (t) {
        (t = d(t.target).is(".slick-slide")
          ? d(t.target)
          : d(t.target).parents(".slick-slide")),
          (t = (t = parseInt(t.attr("data-slick-index"))) || 0);
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(t, !1, !0)
          : this.slideHandler(t);
      }),
      (l.prototype.slideHandler = function (t, e, i) {
        var o,
          s,
          n,
          l,
          r = this;
        if (
          ((e = e || !1),
          !(
            (!0 === r.animating && !0 === r.options.waitForAnimate) ||
            (!0 === r.options.fade && r.currentSlide === t)
          ))
        )
          if (
            (!1 === e && r.asNavFor(t),
            (n = r.getLeft((o = t))),
            (e = r.getLeft(r.currentSlide)),
            (r.currentLeft = null === r.swipeLeft ? e : r.swipeLeft),
            !1 === r.options.infinite &&
              !1 === r.options.centerMode &&
              (t < 0 || t > r.getDotCount() * r.options.slidesToScroll))
          )
            !1 === r.options.fade &&
              ((o = r.currentSlide),
              !0 !== i && r.slideCount > r.options.slidesToShow
                ? r.animateSlide(e, function () {
                    r.postSlide(o);
                  })
                : r.postSlide(o));
          else if (
            !1 === r.options.infinite &&
            !0 === r.options.centerMode &&
            (t < 0 || t > r.slideCount - r.options.slidesToScroll)
          )
            !1 === r.options.fade &&
              ((o = r.currentSlide),
              !0 !== i && r.slideCount > r.options.slidesToShow
                ? r.animateSlide(e, function () {
                    r.postSlide(o);
                  })
                : r.postSlide(o));
          else {
            if (
              (r.options.autoplay && clearInterval(r.autoPlayTimer),
              (s =
                o < 0
                  ? r.slideCount % r.options.slidesToScroll != 0
                    ? r.slideCount - (r.slideCount % r.options.slidesToScroll)
                    : r.slideCount + o
                  : o >= r.slideCount
                  ? r.slideCount % r.options.slidesToScroll != 0
                    ? 0
                    : o - r.slideCount
                  : o),
              (r.animating = !0),
              r.$slider.trigger("beforeChange", [r, r.currentSlide, s]),
              (e = r.currentSlide),
              (r.currentSlide = s),
              r.setSlideClasses(r.currentSlide),
              r.options.asNavFor &&
                (l = (l = r.getNavTarget()).slick("getSlick")).slideCount <=
                  l.options.slidesToShow &&
                l.setSlideClasses(r.currentSlide),
              r.updateDots(),
              r.updateArrows(),
              !0 === r.options.fade)
            )
              return (
                !0 !== i
                  ? (r.fadeSlideOut(e),
                    r.fadeSlide(s, function () {
                      r.postSlide(s);
                    }))
                  : r.postSlide(s),
                void r.animateHeight()
              );
            !0 !== i && r.slideCount > r.options.slidesToShow
              ? r.animateSlide(n, function () {
                  r.postSlide(s);
                })
              : r.postSlide(s);
          }
      }),
      (l.prototype.startLoad = function () {
        var t = this;
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.hide(), t.$nextArrow.hide()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.hide(),
          t.$slider.addClass("slick-loading");
      }),
      (l.prototype.swipeDirection = function () {
        var t = this,
          e = t.touchObject.startX - t.touchObject.curX,
          i = t.touchObject.startY - t.touchObject.curY,
          e = Math.atan2(i, e),
          e = Math.round((180 * e) / Math.PI);
        return ((e = e < 0 ? 360 - Math.abs(e) : e) <= 45 && 0 <= e) ||
          (e <= 360 && 315 <= e)
          ? !1 === t.options.rtl
            ? "left"
            : "right"
          : 135 <= e && e <= 225
          ? !1 === t.options.rtl
            ? "right"
            : "left"
          : !0 === t.options.verticalSwiping
          ? 35 <= e && e <= 135
            ? "down"
            : "up"
          : "vertical";
      }),
      (l.prototype.swipeEnd = function (t) {
        var e,
          i,
          o = this;
        if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
          return (o.scrolling = !1);
        if (
          ((o.interrupted = !1),
          (o.shouldClick = !(10 < o.touchObject.swipeLength)),
          void 0 === o.touchObject.curX)
        )
          return !1;
        if (
          (!0 === o.touchObject.edgeHit &&
            o.$slider.trigger("edge", [o, o.swipeDirection()]),
          o.touchObject.swipeLength >= o.touchObject.minSwipe)
        ) {
          switch ((i = o.swipeDirection())) {
            case "left":
            case "down":
              (e = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide + o.getSlideCount())
                : o.currentSlide + o.getSlideCount()),
                (o.currentDirection = 0);
              break;
            case "right":
            case "up":
              (e = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide - o.getSlideCount())
                : o.currentSlide - o.getSlideCount()),
                (o.currentDirection = 1);
          }
          "vertical" != i &&
            (o.slideHandler(e),
            (o.touchObject = {}),
            o.$slider.trigger("swipe", [o, i]));
        } else
          o.touchObject.startX !== o.touchObject.curX &&
            (o.slideHandler(o.currentSlide), (o.touchObject = {}));
      }),
      (l.prototype.swipeHandler = function (t) {
        var e = this;
        if (
          !(
            !1 === e.options.swipe ||
            ("ontouchend" in document && !1 === e.options.swipe) ||
            (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))
          )
        )
          switch (
            ((e.touchObject.fingerCount =
              t.originalEvent && void 0 !== t.originalEvent.touches
                ? t.originalEvent.touches.length
                : 1),
            (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
            !0 === e.options.verticalSwiping &&
              (e.touchObject.minSwipe =
                e.listHeight / e.options.touchThreshold),
            t.data.action)
          ) {
            case "start":
              e.swipeStart(t);
              break;
            case "move":
              e.swipeMove(t);
              break;
            case "end":
              e.swipeEnd(t);
          }
      }),
      (l.prototype.swipeMove = function (t) {
        var e,
          i,
          o = this,
          s = void 0 !== t.originalEvent ? t.originalEvent.touches : null;
        return (
          !(!o.dragging || o.scrolling || (s && 1 !== s.length)) &&
          ((e = o.getLeft(o.currentSlide)),
          (o.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX),
          (o.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY),
          (o.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))
          )),
          (i = Math.round(
            Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))
          )),
          !o.options.verticalSwiping && !o.swiping && 4 < i
            ? !(o.scrolling = !0)
            : (!0 === o.options.verticalSwiping &&
                (o.touchObject.swipeLength = i),
              (s = o.swipeDirection()),
              void 0 !== t.originalEvent &&
                4 < o.touchObject.swipeLength &&
                ((o.swiping = !0), t.preventDefault()),
              (i =
                (!1 === o.options.rtl ? 1 : -1) *
                (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
              !0 === o.options.verticalSwiping &&
                (i = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
              (t = o.touchObject.swipeLength),
              (o.touchObject.edgeHit = !1) === o.options.infinite &&
                ((0 === o.currentSlide && "right" === s) ||
                  (o.currentSlide >= o.getDotCount() && "left" === s)) &&
                ((t = o.touchObject.swipeLength * o.options.edgeFriction),
                (o.touchObject.edgeHit = !0)),
              !1 === o.options.vertical
                ? (o.swipeLeft = e + t * i)
                : (o.swipeLeft = e + t * (o.$list.height() / o.listWidth) * i),
              !0 === o.options.verticalSwiping && (o.swipeLeft = e + t * i),
              !0 !== o.options.fade &&
                !1 !== o.options.touchMove &&
                (!0 === o.animating
                  ? ((o.swipeLeft = null), !1)
                  : void o.setCSS(o.swipeLeft))))
        );
      }),
      (l.prototype.swipeStart = function (t) {
        var e,
          i = this;
        if (
          ((i.interrupted = !0),
          1 !== i.touchObject.fingerCount ||
            i.slideCount <= i.options.slidesToShow)
        )
          return !(i.touchObject = {});
        void 0 !== t.originalEvent &&
          void 0 !== t.originalEvent.touches &&
          (e = t.originalEvent.touches[0]),
          (i.touchObject.startX = i.touchObject.curX =
            void 0 !== e ? e.pageX : t.clientX),
          (i.touchObject.startY = i.touchObject.curY =
            void 0 !== e ? e.pageY : t.clientY),
          (i.dragging = !0);
      }),
      (l.prototype.unfilterSlides = l.prototype.slickUnfilter =
        function () {
          var t = this;
          null !== t.$slidesCache &&
            (t.unload(),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slidesCache.appendTo(t.$slideTrack),
            t.reinit());
        }),
      (l.prototype.unload = function () {
        var t = this;
        d(".slick-cloned", t.$slider).remove(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.remove(),
          t.$nextArrow &&
            t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.remove(),
          t.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (l.prototype.unslick = function (t) {
        this.$slider.trigger("unslick", [this, t]), this.destroy();
      }),
      (l.prototype.updateArrows = function () {
        var t = this;
        Math.floor(t.options.slidesToShow / 2);
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          !t.options.infinite &&
          (t.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          t.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === t.currentSlide
            ? (t.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : ((t.currentSlide >= t.slideCount - t.options.slidesToShow &&
                !1 === t.options.centerMode) ||
                (t.currentSlide >= t.slideCount - 1 &&
                  !0 === t.options.centerMode)) &&
              (t.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
      }),
      (l.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots &&
          (t.$dots.find("li").removeClass("slick-active").end(),
          t.$dots
            .find("li")
            .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (l.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1));
      }),
      (d.fn.slick = function () {
        for (
          var t,
            e = this,
            i = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            s = e.length,
            n = 0;
          n < s;
          n++
        )
          if (
            ("object" == typeof i || void 0 === i
              ? (e[n].slick = new l(e[n], i))
              : (t = e[n].slick[i].apply(e[n].slick, o)),
            void 0 !== t)
          )
            return t;
        return e;
      });
  }),
  jQuery(document).ready(function (r) {
    var t;
    r(".sandwich").on("click", function () {
      var t = r(".sandwich__icon-bar");
      t.hide(), r(".popup-menu").fadeToggle(300);
      var e = r(".popup-state");
      e.hasClass("icon-active")
        ? (e.removeClass("icon-active"),
          t.show(),
          r(".site-content").delay(300).css("opacity", "1"))
        : (e.addClass("icon-active"),
          r(".site-content").delay(300).css("opacity", "0.5"));
    }),
      r(".testimonials-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: !1,
        fade: !1,
        infinite: !1,
        useTransform: !0,
        speed: 400,
        rows: 0,
        dots: !0,
        cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1 },
          },
          { breakpoint: 750, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 540, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          {
            breakpoint: 375,
            settings: { slidesToShow: 1, slidesToScroll: 1, variableWidth: !0 },
          },
          {
            breakpoint: 360,
            settings: { slidesToShow: 1, slidesToScroll: 1, variableWidth: !1 },
          },
        ],
      }),
      r(".tiktok-slider").slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: !1,
        fade: !1,
        infinite: !1,
        useTransform: !0,
        speed: 400,
        rows: 0,
        dots: !0,
        cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
        variableWidth: !0,
        responsive: [
          {
            breakpoint: 1130,
            settings: { slidesToShow: 3, slidesToScroll: 1 },
          },
          { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 540, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      }),
      0 < r(".home").length
        ? ((t = 3),
          (i = "unslick"),
          r(window).on("resize orientationchange", function () {
            r(".pricing-slider").slick("resize");
          }))
        : ((t = 4), (i = ""));
    var e = r(".features-tab__content");
    e.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: !1,
      infinite: !1,
      useTransform: !1,
      speed: 0,
      rows: 0,
      dots: !1,
      swipe: !1,
      cssTransitions: !1,
      responsive: [{ breakpoint: 767, settings: { settings: "unslick" } }],
    }),
      r("[data-tab-id]").on("click tap", function (t) {
        t.preventDefault();
        t = r(this).data("tab-id");
        e.slick("slickGoTo", +t);
      }),
      e.on("beforeChange", function (t, e, i, o) {
        i !== o &&
          r(".features-tab__content video").each(function () {
            this.pause(), (this.currentTime = 0);
          });
      }),
      r(".pricing-slider").slick({
        slidesToShow: t,
        slidesToScroll: t,
        arrows: !1,
        fade: !1,
        infinite: !1,
        useTransform: !0,
        speed: 400,
        rows: 0,
        dots: !0,
        variableWidth: !0,
        responsive: [
          { breakpoint: 4e3, settings: i },
          {
            breakpoint: 1160,
            settings: { slidesToShow: 3, slidesToScroll: 1, variableWidth: !1 },
          },
          {
            breakpoint: 991,
            settings: { slidesToShow: 2, slidesToScroll: 1, variableWidth: !1 },
          },
          {
            breakpoint: 575,
            settings: { centerMode: !0, slidesToShow: 1, slidesToScroll: 1 },
          },
        ],
      }),
      r(".video-templates").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: !0,
        fade: !1,
        infinite: !1,
        speed: 400,
        rows: 0,
        dots: !1,
        variableWidth: !0,
        
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 1,
              arrows: !1,
            },
          },
          {
            breakpoint: 500,
            settings: {
              arrows: !1,
              centerMode: !0,
              initialSlide: 2,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      }),
      r(".category-filter-wrap").slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: !1,
        fade: !1,
        infinite: !1,
        speed: 400,
        rows: 0,
        dots: !1,
        variableWidth: !0,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 3 },
          },
          { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      });
    var i = r(".video-templates__item");
    r(".modal-dialog .video").on("mouseenter mouseleave", function () {
      this.hasAttribute("controls")
        ? this.removeAttribute("controls")
        : this.setAttribute("controls", "controls");
    }),
      i.on("click tap", function () {
        var t = r(this).data("template-modal");
        r("#template-modal-" + t).modal("show"),
          r("#template-modal-" + t)
            .find("video")[0]
            .play();
      }),
      r(".video-modal").on("hidden.bs.modal", function (t) {
        r(this).find("video")[0].pause(),
          (r(this).find("video")[0].currentTime = 0);
      });
    let a = {
      action: "process_load_posts",
      nonce: fmp_global.nonce,
      postType: null,
      catId: "all",
      catIdService: ["all"],
      catIdIndustry: ["all"],
      url: fmp_global.ajax_url,
      currentPage: 1,
    };
    function d(t, e) {
      let i = r(e),
        o = r(".js-posts-section");
      r.ajax({
        url: t.url,
        data: t,
        type: "POST",
        success(t) {
          r(".archive-posts-row").html(t);
        },
        complete() {
          i.hasClass("page-numbers") &&
            r("html, body").animate({ scrollTop: o.offset().top }, 400);
        },
      });
    }
    r("body").on("click", ".js-load-post", function () {
      let t = r(this),
        e = t.data("post-type"),
        i = r(".js-category-filter__title"),
        o = r(".js-category-filter__filter-wrap"),
        s = r(".js-posts-section"),
        n = t.data("cat-id");
      var l;
      i.removeClass("active"),
        o.removeClass("active"),
        t.hasClass("category-active") ||
          (r("html, body").animate({ scrollTop: s.offset().top }, 400),
          r(".js-load-post").removeClass("category-active"),
          t.addClass("category-active")),
        n
          ? (a.catId = n || "all")
          : (l = document.body.className.match(/(^|\s)category-(\d+)(\s|$)/)) &&
            (a.catId = l[2]),
        (a.currentPage = 1),
        (a.postType = e),
        d(a, t);
    }),
      r(".archive-posts-row").on("click", ".page-numbers", function (t) {
        t.preventDefault();
        let e = r(this),
          i = e.parents(".post-pagination").data("post-type"),
          o = e.parents(".post-pagination").data("cat-id");
        o
          ? (a.catId = o || "all")
          : (t = document.body.className.match(/(^|\s)category-(\d+)(\s|$)/)) &&
            (a.catId = t[2]),
          (a.postType = i || "post"),
          (a.currentPage = Number(r(this).html())),
          r(this).hasClass("next") &&
            (a.currentPage = +Number(r(".current").html()) + 1),
          r(this).hasClass("prev") &&
            (a.currentPage = +Number(r(".current").html()) - 1),
          d(a, e);
      });
    var o = 0;
    setInterval(function () {
      r(".words").fadeOut(function () {
        r(this)
          .html(words[(o = (o + 1) % words.length)])
          .fadeIn();
      });
    }, 1700),
      r('[data-toggle="tab"]').on("shown.bs.tab", function (t) {
        var e = t.target.getAttribute("href");
        (r(e).find("video")[0].currentTime = 0), r(e).find("video")[0].play();
        t.relatedTarget;
      });
    i = r(".tiktok-videos__item");
    i.on("mouseenter", function () {
      r(this).find("img").hide(),
        r(this).find(".overlay").hide(),
        r(this).find("video").show(),
        r(this).find("video")[0].play();
    }),
      i.on("mouseleave", function () {
        r(this).find("video").hide(),
          r(this).find(".overlay").show(),
          r(this).find("img").show(),
          r(this).find("video")[0].pause(),
          (r(this).find("video")[0].currentTime = 0);
      }),
      i.on("click tap", function () {
        r(".tiktok-section video").prop("muted")
          ? (r(".tiktok-section video").prop("muted", !1),
            r(".tiktok-section button").removeClass("button-mute"),
            r(".tiktok-section button").addClass("button-unmuted"))
          : (r(".tiktok-section button").removeClass("button-unmuted"),
            r(".tiktok-section button").addClass("button-mute"),
            r(".tiktok-section video").prop("muted", !0));
      });
    var s = r("[data-scroll-to-top]");
    r(window).scroll(function () {
      500 < r(this).scrollTop() ? s.show().fadeIn() : s.fadeOut().hide();
    }),
      s.click(function (t) {
        t.preventDefault(), r("html, body").animate({ scrollTop: 0 }, 800);
      }),
      r("a[href^=#]").on("click", function (t) {
        t.preventDefault();
        t = r(this).attr("href");
        r("html, body").animate({ scrollTop: r(t).offset().top }, "slow");
      }),
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        (r(document.head).append(
          "<style>*{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}</style>"
        ),
        r(window).on("gesturestart touchmove", function (t) {
          1 !== t.originalEvent.scale &&
            (t.originalEvent.preventDefault(),
            (document.body.style.transform = "scale(1)"));
        }));
  });
(() => {
  const e = document.querySelectorAll(".coblocks-animate");
  if ("IntersectionObserver" in window) {
    const t = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          e.isIntersecting &&
            (e.target.classList.add(e.target.dataset.coblocksAnimation),
            t.unobserve(e.target));
        });
      },
      { threshold: [0.15] }
    );
    e.forEach((e) => {
      t.observe(e);
    });
  } else
    e.forEach((e) => {
      e.classList.remove("coblocks-animate"),
        delete e.dataset.coblocksAnimation;
    });
})();
(() => {
  var e = {
      2590: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n)
                      Object.prototype.hasOwnProperty.call(n, i) &&
                        (e[i] = n[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          function t(e, t) {
            void 0 === t && (t = []),
              Array.isArray(t) || (t = [t]),
              t.forEach(function (t) {
                return !e.classList.contains(t) && e.classList.add(t);
              });
          }
          function n(e, t, n, i) {
            e.addEventListener(t, n, i);
          }
          function i(e, t, n) {
            e.removeEventListener(t, n);
          }
          function r(e, t, n) {
            return void 0 === n && (n = ""), e.setAttribute(t, n), e;
          }
          function o(e, t, n) {
            return (
              Object.keys(t).forEach(function (n) {
                e.style[n] = t[n];
              }),
              n && getComputedStyle(e),
              e
            );
          }
          var a = {
            direction: "horizontal",
            touchRatio: 1,
            touchAngle: 45,
            longSwipesRatio: 0.5,
            initialSlide: 0,
            loop: !1,
            freeMode: !1,
            passiveListeners: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            speed: 300,
            longSwipesMs: 300,
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: !1,
            slidePrevClass: "swiper-slide-prev",
            slideNextClass: "swiper-slide-next",
            slideActiveClass: "swiper-slide-active",
            slideClass: "swiper-slide",
            wrapperClass: "swiper-wrapper",
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchMoveStopPropagation: !1,
            excludeElements: [],
            injections: {
              translate: function (e, t, n, i) {
                o(t.element.$wrapper, {
                  transition: e.isStart ? "none" : "transform ease " + i + "ms",
                  transform: n.isHorizontal
                    ? "translate3d(" + e.transforms + "px, 0, 0)"
                    : "translate3d(0, " + e.transforms + "px, 0)",
                });
              },
            },
          };
          var s = "before-init",
            c = "after-init",
            u = "before-slide",
            l = "scroll",
            f = "after-slide",
            p = "before-destroy",
            d = "after-destroy";
          var m = 180 / Math.PI;
          function v() {
            var t = [];
            return {
              getDuration: function () {
                var e = t[0],
                  n = t[t.length - 1];
                return e ? n.time - e.time : 0;
              },
              getOffset: function () {
                var e = t[0],
                  n = t[t.length - 1];
                return e ? { x: n.x - e.x, y: n.y - e.y } : { x: 0, y: 0 };
              },
              getLogs: function () {
                return t;
              },
              vector: function () {
                return (function (t, n) {
                  var i = t[n],
                    r = t[n - 1] || i,
                    o = { x: i.x - r.x, y: i.y - r.y },
                    a = i.time - r.time,
                    s = o.x / a || 0,
                    c = o.y / a || 0;
                  return e({}, o, {
                    angle: Math.atan2(Math.abs(o.y), Math.abs(o.x)) * m,
                    velocityX: s,
                    velocityY: c,
                  });
                })(t, t.length - 1);
              },
              clear: function () {
                t = [];
              },
              push: function (n) {
                t.push(e({ time: Date.now() }, n));
              },
            };
          }
          function h() {
            return performance ? performance.now() : Date.now();
          }
          var x =
              requestAnimationFrame ||
              webkitRequestAnimationFrame ||
              setTimeout,
            g =
              cancelAnimationFrame ||
              webkitCancelAnimationFrame ||
              clearTimeout;
          function S() {
            var e,
              t,
              n = {
                run: function (n) {
                  (e = void 0 === e ? h() : e),
                    (t = x(function () {
                      var t = h(),
                        i = t - e;
                      (e = t), n(i);
                    }));
                },
                stop: function () {
                  (e = void 0), g(t);
                },
              };
            return {
              run: function e(t) {
                n.run(function (n) {
                  e(t), t(n);
                });
              },
              stop: function () {
                n.stop();
              },
            };
          }
          function w(e, t) {
            var n = e.tracker,
              i = t.initStatus;
            n.clear(), i();
          }
          function y(e, t, r, o) {
            var a = e.touchable,
              s = ["INPUT", "SELECT", "OPTION", "TEXTAREA", "BUTTON", "VIDEO"],
              c = (function (e, t, n, i) {
                var r = i.initLayout,
                  o = i.initStatus,
                  a = i.render,
                  s = i.scrollPixel,
                  c = i.slideTo,
                  u = i.getOffsetSteps,
                  l = S();
                return {
                  preheat: function (e, t) {
                    var i = n.tracker;
                    l.stop(),
                      i.clear(),
                      i.push(e),
                      r(t),
                      o(t),
                      (n.isStart = !0),
                      a();
                  },
                  move: function (t) {
                    var i = n.tracker,
                      r = e.touchRatio,
                      o = e.touchAngle,
                      c = e.isHorizontal;
                    if (n.isStart && !n.isScrolling) {
                      i.push(t);
                      var u = i.vector(),
                        l = i.getOffset();
                      if (l.x || l.y)
                        if (
                          (c && u.angle < o) ||
                          (!c && 90 - u.angle < o) ||
                          n.isTouching
                        ) {
                          var f = u[c ? "x" : "y"] * r;
                          (n.isTouching = !0), s(f), a();
                        } else (n.isScrolling = !0), i.clear();
                    }
                  },
                  stop: function () {
                    var r = n.index,
                      o = n.tracker,
                      f = t.measure;
                    if (n.isStart)
                      if (((n.isStart = !1), e.freeMode)) {
                        var p =
                          o.vector()[
                            e.isHorizontal ? "velocityX" : "velocityY"
                          ];
                        l.run(function (e) {
                          var t = p * e;
                          (p *= 0.98),
                            Math.abs(t) < 0.01
                              ? (l.stop(), w(n, i))
                              : (s(t), a(0));
                        });
                      } else {
                        var d = o.getDuration(),
                          m = o.getOffset()[e.isHorizontal ? "x" : "y"],
                          v = Math.ceil(Math.abs(m) / f.boxSize),
                          h = u(m);
                        d > e.longSwipesMs
                          ? c(r + h * (m > 0 ? -1 : 1))
                          : c(m > 0 ? r - v : r + v),
                          w(n, i);
                      }
                  },
                };
              })(r, e, t, o),
              u = c.preheat,
              l = c.move,
              f = c.stop;
            function p(e) {
              var t = a ? e.changedTouches[0] : e;
              return { x: t.pageX, y: t.pageY };
            }
            function d(t) {
              for (var n = 0; n < r.excludeElements.length; n++)
                if (r.excludeElements[n].contains(t.target)) return;
              var i,
                o,
                c,
                l,
                f = e.element.$wrapper,
                d =
                  (r.touchStartPreventDefault &&
                    -1 === s.indexOf(t.target.nodeName)) ||
                  r.touchStartForcePreventDefault;
              !a && d && t.preventDefault(),
                u(
                  p(t),
                  ((i = f),
                  (o = r.isHorizontal),
                  (c = getComputedStyle(i)
                    .transform.replace(/[a-z]|\(|\)|\s/g, "")
                    .split(",")
                    .map(parseFloat)),
                  (l = []),
                  16 === c.length
                    ? (l = c.slice(12, 14))
                    : 6 === c.length && (l = c.slice(4, 6)),
                  l[o ? 0 : 1] || 0)
                );
            }
            function m(e) {
              r.touchMoveStopPropagation && e.stopPropagation(),
                l(p(e)),
                t.isTouching && !1 !== e.cancelable && e.preventDefault();
            }
            function v() {
              f();
            }
            return {
              attach: function () {
                var t = e.element.$el;
                a
                  ? (n(t, "touchstart", d, {
                      passive: r.passiveListeners,
                      capture: !1,
                    }),
                    n(t, "touchmove", m),
                    n(t, "touchend", v),
                    n(t, "touchcancel", v))
                  : (n(t, "mousedown", d),
                    n(document, "mousemove", m),
                    n(document, "mouseup", v));
              },
              detach: function () {
                var t = e.element.$el;
                i(t, "touchstart", d),
                  i(t, "touchmove", m),
                  i(t, "touchend", v),
                  i(t, "touchcancel", v),
                  i(t, "mousedown", d),
                  i(document, "mousemove", m),
                  i(document, "mouseup", v);
              },
            };
          }
          function b(e, t, n) {
            var i = e.$list,
              r = t.viewSize,
              o = t.slideSize,
              a = t.boxSize,
              s = (function (e) {
                return e.loop ? Math.ceil(e.slidesPerView) : 0;
              })(n),
              c = s * a,
              u = -c + (n.centeredSlides ? (r - o) / 2 : 0);
            return {
              max: u,
              min: n.spaceBetween + (n.loop ? o : r) + u - a * i.length,
              base: u,
              expand: s,
              buffer: c,
              minIndex: 0,
              maxIndex:
                i.length -
                (n.centeredSlides || n.loop ? 1 : Math.ceil(n.slidesPerView)),
            };
          }
          function z(e, t) {
            var n = {};
            function i(e) {
              var i = (function (e, t) {
                  var n = t.$el,
                    i = e.isHorizontal ? n.offsetWidth : n.offsetHeight,
                    r =
                      (i - Math.ceil(e.slidesPerView - 1) * e.spaceBetween) /
                      e.slidesPerView;
                  return {
                    boxSize: r + e.spaceBetween,
                    viewSize: i,
                    slideSize: r,
                  };
                })(t, e),
                r = b(e, i, t),
                o = Boolean(
                  "ontouchstart" in window ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0 ||
                    (window.DocumentTouch && document instanceof DocumentTouch)
                );
              Object.assign(n, {
                touchable: o,
                element: e,
                measure: i,
                limitation: r,
              });
            }
            return (n.update = i), i(e), n;
          }
          var T = "data-shallow-slider",
            P = "data-slider";
          function E(e, n) {
            function i(i) {
              var r = e.element.$wrapper,
                o = i.index;
              r.querySelectorAll("[" + P + "]").forEach(function (e) {
                var i,
                  r,
                  a = ~~e.getAttribute(P);
                (i = e),
                  void 0 ===
                    (r = [
                      n.slidePrevClass,
                      n.slideNextClass,
                      n.slideActiveClass,
                    ]) && (r = []),
                  Array.isArray(r) || (r = [r]),
                  r.forEach(function (e) {
                    return i.classList.contains(e) && i.classList.remove(e);
                  }),
                  a === o && t(e, n.slideActiveClass),
                  a === o - 1 && t(e, n.slidePrevClass),
                  a === o + 1 && t(e, n.slideNextClass);
              });
            }
            function a() {
              e.element.$wrapper
                .querySelectorAll("[" + T + "]")
                .forEach(function (t) {
                  return e.element.$wrapper.removeChild(t);
                });
            }
            function s() {
              e.element.$list.forEach(function (e, t) {
                return r(e, P, t);
              }),
                a(),
                (function () {
                  if (n.loop) {
                    var t = e.element,
                      i = e.limitation,
                      o = t.$list,
                      a = t.$wrapper,
                      s = i.expand,
                      c = o.slice(-s).map(function (e) {
                        return e.cloneNode(!0);
                      }),
                      u = o.slice(0, s).map(function (e) {
                        return e.cloneNode(!0);
                      });
                    c.forEach(function (e, t) {
                      a.appendChild(r(u[t], T)),
                        a.insertBefore(r(c[t], T), o[0]);
                    });
                  }
                })();
            }
            function c() {
              var t,
                i = e.element,
                r = e.measure,
                a = i.$wrapper,
                s = {
                  display: "flex",
                  willChange: "transform",
                  flexDirection: n.isHorizontal ? "row" : "column",
                },
                c =
                  (((t = {})[n.isHorizontal ? "width" : "height"] =
                    r.slideSize + "px"),
                  (t[n.isHorizontal ? "margin-right" : "margin-bottom"] =
                    n.spaceBetween + "px"),
                  t);
              o(a, s),
                a.querySelectorAll("[" + P + "]").forEach(function (e) {
                  return o(e, c);
                });
            }
            return {
              init: function () {
                s(), c();
              },
              render: function (t, r, o, a) {
                var s = e.element.$wrapper,
                  c = void 0 === r ? n.speed : r;
                n.injections.translate(t, e, n, c),
                  t.isStart || i(t),
                  a && getComputedStyle(s).transform,
                  o && setTimeout(o, c);
              },
              destroy: function () {
                var t = e.element,
                  i = t.$list,
                  r = t.$wrapper,
                  o = n.isHorizontal ? "margin-right" : "margin-bottom";
                ["display", "will-change", "flex-direction"].forEach(function (
                  e
                ) {
                  r.style.removeProperty(e);
                }),
                  i.forEach(function (e) {
                    return e.style.removeProperty(o);
                  }),
                  a();
              },
              updateSize: c,
            };
          }
          function M(e, t) {
            var n = e - t.max,
              i = e - t.min;
            return n > 0 ? n : i < 0 ? i : 0;
          }
          function A(t, n, i, r, o) {
            function a(e) {
              var n = t.measure;
              return Math.ceil(Math.abs(e) / n.boxSize - i.longSwipesRatio);
            }
            function s(e, t, i) {
              r.render(n, e, t, i);
            }
            function c(r) {
              var a,
                s = t.limitation,
                c = s.min,
                u = s.max,
                f = u - c + (i.loop ? t.measure.boxSize : 0),
                p = f + 1;
              (n.transforms = r),
                i.loop
                  ? ((a = ((u - r) % p) / f),
                    (n.progress = a < 0 ? 1 + a : a > 1 ? a - 1 : a))
                  : ((a = (u - r) / f),
                    (n.progress = a < 0 ? 0 : a > 1 ? 1 : a)),
                o.emit(l, e({}, n));
            }
            function p(e, r) {
              var l = t.measure,
                p = t.limitation,
                d = p.maxIndex - p.minIndex + 1,
                m = i.loop
                  ? ((e % d) + d) % d
                  : e > p.maxIndex
                  ? p.maxIndex
                  : e < p.minIndex
                  ? p.minIndex
                  : e,
                v = -m * l.boxSize + p.base;
              if (0 !== a(v - n.transforms) && i.loop) {
                var h = M(n.transforms, p),
                  x = m - n.index,
                  g = (function (e, t, n, i) {
                    var r = n.maxIndex,
                      o = (i > 0 ? 1 : -1) * (n.minIndex - r - 1) + t - e;
                    return Math.abs(i) > Math.abs(o) ? o : i;
                  })(n.index, m, p, x);
                g === x || h
                  ? n.index === m &&
                    c(h > 0 ? p.min - l.boxSize + h : p.max + l.boxSize + h)
                  : c(g < 0 ? p.min - l.boxSize : p.max + l.boxSize),
                  s(0, void 0, !0);
              }
              o.emit(u, n.index, n, m),
                (n.index = m),
                c(v),
                s(r, function () {
                  o.emit(f, m, n);
                });
            }
            return {
              update: function () {
                p(n.index, 0), r.updateSize();
              },
              render: s,
              transform: c,
              slideTo: p,
              scrollPixel: function (e) {
                var r = n.transforms,
                  o = t.measure,
                  a = t.limitation,
                  s = Number(e.toExponential().split("e")[1]),
                  u = s <= 0 ? Math.pow(10, -(s - 1)) : 1,
                  l = r;
                if (
                  (i.resistance &&
                    !i.loop &&
                    (e > 0 && r >= a.max
                      ? (e -= Math.pow(e * u, i.resistanceRatio) / u)
                      : e < 0 &&
                        r <= a.min &&
                        (e += Math.pow(-e * u, i.resistanceRatio) / u)),
                  (l += e),
                  i.loop)
                ) {
                  var f = n.tracker.vector(),
                    p = i.isHorizontal ? f.velocityX : f.velocityY,
                    d = M(r, a);
                  d &&
                    (function (e, t, n) {
                      return (e > 0 && t > n.max) || (e < 0 && t < n.min);
                    })(p, r, a) &&
                    (l = d > 0 ? a.min - o.boxSize + d : a.max + o.boxSize + d);
                }
                c(l);
              },
              initStatus: function (e) {
                void 0 === e && (e = 0),
                  (n.startTransform = e),
                  (n.isStart = !1),
                  (n.isScrolling = !1),
                  (n.isTouching = !1);
              },
              initLayout: function (e) {
                c(e);
              },
              getOffsetSteps: a,
            };
          }
          function C(e, t) {
            var n = "string" == typeof e ? document.body.querySelector(e) : e,
              i = n.querySelector("." + t.wrapperClass),
              r = [].slice.call(n.getElementsByClassName(t.slideClass));
            return {
              $el: n,
              $wrapper: i,
              $list: (r = r.filter(function (e) {
                return null === e.getAttribute("data-shallow-slider");
              })),
            };
          }
          var $ = function t(n, i) {
            var r,
              o = (function (t) {
                var n = e({}, a, t);
                return e({}, n, { isHorizontal: "horizontal" === n.direction });
              })(i),
              u =
                ((r = {}),
                {
                  on: function (e, t) {
                    r[e] ? r[e].push(t) : (r[e] = [t]);
                  },
                  off: function (e, t) {
                    if (r[e]) {
                      var n = r[e].indexOf(t);
                      n > -1 && r[e].splice(n, 1);
                    }
                  },
                  emit: function (e) {
                    for (
                      var t = arguments.length,
                        n = new Array(t > 1 ? t - 1 : 0),
                        i = 1;
                      i < t;
                      i++
                    )
                      n[i - 1] = arguments[i];
                    r[e] &&
                      r[e].forEach(function (e) {
                        return e.apply(void 0, n);
                      });
                  },
                  clear: function () {
                    r = {};
                  },
                }),
              l = z(C(n, o), o),
              f = {
                tracker: v(),
                index: 0,
                startTransform: 0,
                isStart: !1,
                isScrolling: !1,
                isTouching: !1,
                transforms: 0,
                progress: 0,
              },
              m = u.on,
              h = u.off,
              x = u.emit,
              g = { on: m, off: h, env: l, state: f, options: o };
            (o.plugins || t.plugins || []).forEach(function (e) {
              return e(g, o);
            }),
              x(s, g);
            var S = E(l, o),
              w = A(l, f, o, S, u),
              b = y(l, f, o, w);
            var T = w.slideTo;
            return (
              Object.assign(g, {
                update: function () {
                  S.destroy(), l.update(C(n, o)), S.init(), w.update();
                },
                destroy: function () {
                  x(p, g), b.detach(), S.destroy(), x(d, g), u.clear();
                },
                slideTo: T,
                updateSize: function () {
                  l.update(C(n, o)), w.update();
                },
              }),
              S.init(),
              b.attach(),
              T(o.initialSlide, 0),
              x(c, g),
              g
            );
          };
          return (
            ($.use = function (e) {
              $.plugins = e;
            }),
            $
          );
        })();
      },
    },
    t = {};
  !(function n(i) {
    var r = t[i];
    if (void 0 !== r) return r.exports;
    var o = (t[i] = { exports: {} });
    return e[i].call(o.exports, o, o.exports, n), o.exports;
  })(2590);
})();
(() => {
  var e = {
      7152: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (e =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n,
                    i = arguments[t];
                  for (n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
                }
                return e;
              }).apply(this, arguments);
          }
          function t(e, t) {
            void 0 === t && (t = []),
              Array.isArray(t) || (t = [t]),
              t.forEach(function (t) {
                return !e.classList.contains(t) && e.classList.add(t);
              });
          }
          function n(e, t, n, i) {
            e.addEventListener(t, n, i);
          }
          function i(e, t, n) {
            e.removeEventListener(t, n);
          }
          function o(e, t, n) {
            return void 0 === n && (n = ""), e.setAttribute(t, n), e;
          }
          function r(e, t, n) {
            return (
              Object.keys(t).forEach(function (n) {
                e.style[n] = t[n];
              }),
              n && getComputedStyle(e),
              e
            );
          }
          var a = {
              direction: "horizontal",
              touchRatio: 1,
              touchAngle: 45,
              longSwipesRatio: 0.5,
              initialSlide: 0,
              loop: !1,
              freeMode: !1,
              passiveListeners: !0,
              resistance: !0,
              resistanceRatio: 0.85,
              speed: 300,
              longSwipesMs: 300,
              spaceBetween: 0,
              slidesPerView: 1,
              centeredSlides: !1,
              slidePrevClass: "swiper-slide-prev",
              slideNextClass: "swiper-slide-next",
              slideActiveClass: "swiper-slide-active",
              slideClass: "swiper-slide",
              wrapperClass: "swiper-wrapper",
              touchStartPreventDefault: !0,
              touchStartForcePreventDefault: !1,
              touchMoveStopPropagation: !1,
              excludeElements: [],
              injections: {
                translate: function (e, t, n, i) {
                  r(t.element.$wrapper, {
                    transition: e.isStart
                      ? "none"
                      : "transform ease " + i + "ms",
                    transform: n.isHorizontal
                      ? "translate3d(" + e.transforms + "px, 0, 0)"
                      : "translate3d(0, " + e.transforms + "px, 0)",
                  });
                },
              },
            },
            s = "before-slide",
            l = "scroll",
            c = "after-slide";
          var u = 180 / Math.PI;
          function d() {
            var t = [];
            return {
              getDuration: function () {
                var e = t[0],
                  n = t[t.length - 1];
                return e ? n.time - e.time : 0;
              },
              getOffset: function () {
                var e = t[0],
                  n = t[t.length - 1];
                return e ? { x: n.x - e.x, y: n.y - e.y } : { x: 0, y: 0 };
              },
              getLogs: function () {
                return t;
              },
              vector: function () {
                return (
                  (i = (n = t).length - 1),
                  (o = n[i]),
                  (n = n[i - 1] || o),
                  (i = { x: o.x - n.x, y: o.y - n.y }),
                  (o = o.time - n.time),
                  (n = i.x / o || 0),
                  (o = i.y / o || 0),
                  e({}, i, {
                    angle: Math.atan2(Math.abs(i.y), Math.abs(i.x)) * u,
                    velocityX: n,
                    velocityY: o,
                  })
                );
                var n, i, o;
              },
              clear: function () {
                t = [];
              },
              push: function (n) {
                t.push(e({ time: Date.now() }, n));
              },
            };
          }
          function p() {
            return (performance || Date).now();
          }
          var f =
              requestAnimationFrame ||
              webkitRequestAnimationFrame ||
              setTimeout,
            m =
              cancelAnimationFrame ||
              webkitCancelAnimationFrame ||
              clearTimeout;
          function v() {
            var e = (function () {
              var e, t;
              return {
                run: function (n) {
                  (e = void 0 === e ? p() : e),
                    (t = f(function () {
                      var t = p(),
                        i = t - e;
                      (e = t), n(i);
                    }));
                },
                stop: function () {
                  (e = void 0), m(t);
                },
              };
            })();
            return {
              run: function t(n) {
                e.run(function (e) {
                  t(n), n(e);
                });
              },
              stop: function () {
                e.stop();
              },
            };
          }
          function x(e, t) {
            (e = e.tracker), (t = t.initStatus), e.clear(), t();
          }
          function h(e, t, n, i) {
            var o = i.initLayout,
              r = i.initStatus,
              a = i.render,
              s = i.scrollPixel,
              l = i.slideTo,
              c = i.getOffsetSteps,
              u = v();
            return {
              preheat: function (e, t) {
                var i = n.tracker;
                u.stop(),
                  i.clear(),
                  i.push(e),
                  o(t),
                  r(t),
                  (n.isStart = !0),
                  a();
              },
              move: function (t) {
                var i,
                  o = n.tracker,
                  r = e.touchRatio,
                  l = e.touchAngle,
                  c = e.isHorizontal;
                n.isStart &&
                  !n.isScrolling &&
                  (o.push(t),
                  (i = o.vector()),
                  ((t = o.getOffset()).x || t.y) &&
                    ((c && i.angle < l) ||
                    (!c && 90 - i.angle < l) ||
                    n.isTouching
                      ? ((r = i[c ? "x" : "y"] * r),
                        (n.isTouching = !0),
                        s(r),
                        a())
                      : ((n.isScrolling = !0), o.clear())));
              },
              stop: function () {
                var o,
                  r,
                  d,
                  p = n.index,
                  f = n.tracker,
                  m = t.measure;
                n.isStart &&
                  ((n.isStart = !1),
                  e.freeMode
                    ? ((o =
                        f.vector()[e.isHorizontal ? "velocityX" : "velocityY"]),
                      u.run(function (e) {
                        (e *= o),
                          (o *= 0.98),
                          Math.abs(e) < 0.01
                            ? (u.stop(), x(n, i))
                            : (s(e), a(0));
                      }))
                    : ((r = f.getDuration()),
                      (d = f.getOffset()[e.isHorizontal ? "x" : "y"]),
                      (f = Math.ceil(Math.abs(d) / m.boxSize)),
                      (m = c(d)),
                      r > e.longSwipesMs
                        ? l(p + m * (0 < d ? -1 : 1))
                        : l(0 < d ? p - f : p + f),
                      x(n, i)));
              },
            };
          }
          function g(e, t) {
            var n = {};
            return (
              (n.update = function (e) {
                var i,
                  o = (function (e, t, n) {
                    var i = e.$list,
                      o = t.viewSize,
                      r = t.slideSize,
                      a = t.boxSize,
                      s =
                        -(t =
                          (e = (s = n).loop ? Math.ceil(s.slidesPerView) : 0) *
                          a) + (n.centeredSlides ? (o - r) / 2 : 0);
                    return {
                      max: s,
                      min: n.spaceBetween + (n.loop ? r : o) + s - a * i.length,
                      base: s,
                      expand: e,
                      buffer: t,
                      minIndex: 0,
                      maxIndex:
                        i.length -
                        (n.centeredSlides || n.loop
                          ? 1
                          : Math.ceil(n.slidesPerView)),
                    };
                  })(
                    e,
                    ((i = t),
                    (r = (o = e).$el),
                    (i = {
                      boxSize:
                        (r =
                          ((o = i.isHorizontal
                            ? r.offsetWidth
                            : r.offsetHeight) -
                            Math.ceil(i.slidesPerView - 1) * i.spaceBetween) /
                          i.slidesPerView) + i.spaceBetween,
                      viewSize: o,
                      slideSize: r,
                    })),
                    t
                  ),
                  r = Boolean(
                    "ontouchstart" in window ||
                      0 < navigator.maxTouchPoints ||
                      0 < navigator.msMaxTouchPoints ||
                      (window.DocumentTouch &&
                        document instanceof DocumentTouch)
                  );
                Object.assign(n, {
                  touchable: r,
                  element: e,
                  measure: i,
                  limitation: o,
                });
              })(e),
              n
            );
          }
          var b = "data-shallow-slider",
            y = "data-slider";
          function S(e, n) {
            function i() {
              e.element.$wrapper
                .querySelectorAll("[" + b + "]")
                .forEach(function (t) {
                  return e.element.$wrapper.removeChild(t);
                });
            }
            function a() {
              var t = e.element,
                i = e.measure,
                o = t.$wrapper,
                a = {
                  display: "flex",
                  willChange: "transform",
                  flexDirection: n.isHorizontal ? "row" : "column",
                },
                s =
                  (((t = {})[n.isHorizontal ? "width" : "height"] =
                    i.slideSize + "px"),
                  (t[n.isHorizontal ? "margin-right" : "margin-bottom"] =
                    n.spaceBetween + "px"),
                  t);
              r(o, a),
                o.querySelectorAll("[" + y + "]").forEach(function (e) {
                  return r(e, s);
                });
            }
            return {
              init: function () {
                (function () {
                  var t, r, a, s, l, c;
                  e.element.$list.forEach(function (e, t) {
                    return o(e, y, t);
                  }),
                    i(),
                    n.loop &&
                      ((t = e.element),
                      (s = e.limitation),
                      (r = t.$list),
                      (a = t.$wrapper),
                      (s = s.expand),
                      (l = r.slice(-s).map(function (e) {
                        return e.cloneNode(!0);
                      })),
                      (c = r.slice(0, s).map(function (e) {
                        return e.cloneNode(!0);
                      })),
                      l.forEach(function (e, t) {
                        a.appendChild(o(c[t], b)),
                          a.insertBefore(o(l[t], b), r[0]);
                      }));
                })(),
                  a();
              },
              render: function (i, o, r, a) {
                var s = e.element.$wrapper;
                (o = void 0 === o ? n.speed : o),
                  n.injections.translate(i, e, n, o),
                  i.isStart ||
                    (function (i) {
                      var o = e.element.$wrapper,
                        r = i.index;
                      o.querySelectorAll("[" + y + "]").forEach(function (e) {
                        var i,
                          o,
                          a = ~~e.getAttribute(y);
                        (i = e),
                          void 0 ===
                            (o = [
                              n.slidePrevClass,
                              n.slideNextClass,
                              n.slideActiveClass,
                            ]) && (o = []),
                          Array.isArray(o) || (o = [o]),
                          o.forEach(function (e) {
                            return (
                              i.classList.contains(e) && i.classList.remove(e)
                            );
                          }),
                          a === r && t(e, n.slideActiveClass),
                          a == r - 1 && t(e, n.slidePrevClass),
                          a === r + 1 && t(e, n.slideNextClass);
                      });
                    })(i),
                  a && getComputedStyle(s).transform,
                  r && setTimeout(r, o);
              },
              destroy: function () {
                var t = e.element,
                  o = t.$list,
                  r = t.$wrapper,
                  a = n.isHorizontal ? "margin-right" : "margin-bottom";
                ["display", "will-change", "flex-direction"].forEach(function (
                  e
                ) {
                  r.style.removeProperty(e);
                }),
                  o.forEach(function (e) {
                    return e.style.removeProperty(a);
                  }),
                  i();
              },
              updateSize: a,
            };
          }
          function w(e, t) {
            var n = e - t.max;
            return (t = e - t.min), 0 < n ? n : t < 0 ? t : 0;
          }
          function E(t, n, i, o, r) {
            function a(e) {
              var n = t.measure;
              return Math.ceil(Math.abs(e) / n.boxSize - i.longSwipesRatio);
            }
            function u(e, t, i) {
              o.render(n, e, t, i);
            }
            function d(o) {
              var a,
                s,
                c = (s = t.limitation).min,
                u = s.max;
              (c = (s = u - c + (i.loop ? t.measure.boxSize : 0)) + 1),
                (n.transforms = o),
                i.loop
                  ? ((a = ((u - o) % c) / s),
                    (n.progress = a < 0 ? 1 + a : 1 < a ? a - 1 : a))
                  : ((a = (u - o) / s),
                    (n.progress = a < 0 ? 0 : 1 < a ? 1 : a)),
                r.emit(l, e({}, n));
            }
            function p(e, o) {
              var l,
                p,
                f,
                m,
                v,
                x = t.measure,
                h = t.limitation,
                g = h.maxIndex - h.minIndex + 1,
                b = i.loop
                  ? ((e % g) + g) % g
                  : e > h.maxIndex
                  ? h.maxIndex
                  : e < h.minIndex
                  ? h.minIndex
                  : e,
                y = -b * x.boxSize + h.base;
              0 !== a(y - n.transforms) &&
                i.loop &&
                ((l = w(n.transforms, h)),
                (p = b - n.index),
                (f = n.index),
                (m = b),
                (v = p),
                (e = (g = h).maxIndex),
                (f = (0 < v ? 1 : -1) * (g.minIndex - e - 1) + m - f),
                (v = Math.abs(v) > Math.abs(f) ? f : v) === p || l
                  ? n.index === b &&
                    d(0 < l ? h.min - x.boxSize + l : h.max + x.boxSize + l)
                  : d(v < 0 ? h.min - x.boxSize : h.max + x.boxSize),
                u(0, void 0, !0)),
                r.emit(s, n.index, n, b),
                (n.index = b),
                d(y),
                u(o, function () {
                  r.emit(c, b, n);
                });
            }
            return {
              update: function () {
                p(n.index, 0), o.updateSize();
              },
              render: u,
              transform: d,
              slideTo: p,
              scrollPixel: function (e) {
                var o,
                  r = n.transforms,
                  a = t.measure,
                  s = t.limitation,
                  l =
                    (o = Number(e.toExponential().split("e")[1])) <= 0
                      ? Math.pow(10, -(o - 1))
                      : 1,
                  c = r;
                i.resistance &&
                  !i.loop &&
                  (0 < e && r >= s.max
                    ? (e -= Math.pow(e * l, i.resistanceRatio) / l)
                    : e < 0 &&
                      r <= s.min &&
                      (e += Math.pow(-e * l, i.resistanceRatio) / l)),
                  (c += e),
                  i.loop &&
                    ((o = n.tracker.vector()),
                    (l = i.isHorizontal ? o.velocityX : o.velocityY),
                    (e = w(r, s)) &&
                      ((o = r),
                      (r = s),
                      (0 < l && o > r.max) || (l < 0 && o < r.min)) &&
                      (c =
                        0 < e ? s.min - a.boxSize + e : s.max + a.boxSize + e)),
                  d(c);
              },
              initStatus: function (e) {
                void 0 === e && (e = 0),
                  (n.startTransform = e),
                  (n.isStart = !1),
                  (n.isScrolling = !1),
                  (n.isTouching = !1);
              },
              initLayout: function (e) {
                d(e);
              },
              getOffsetSteps: a,
            };
          }
          function z(e, t) {
            var n = "string" == typeof e ? document.body.querySelector(e) : e;
            return (
              (e = n.querySelector("." + t.wrapperClass)),
              (t = [].slice.call(n.getElementsByClassName(t.slideClass))),
              {
                $el: n,
                $wrapper: e,
                $list: (t = t.filter(function (e) {
                  return null === e.getAttribute("data-shallow-slider");
                })),
              }
            );
          }
          function L(t, o) {
            var r =
                ((u = e({}, a, (u = o))),
                e({}, u, { isHorizontal: "horizontal" === u.direction })),
              s = (function () {
                var e = {};
                return {
                  on: function (t, n) {
                    e[t] ? e[t].push(n) : (e[t] = [n]);
                  },
                  off: function (t, n) {
                    !e[t] || (-1 < (n = e[t].indexOf(n)) && e[t].splice(n, 1));
                  },
                  emit: function (t) {
                    for (
                      var n = arguments.length,
                        i = new Array(1 < n ? n - 1 : 0),
                        o = 1;
                      o < n;
                      o++
                    )
                      i[o - 1] = arguments[o];
                    e[t] &&
                      e[t].forEach(function (e) {
                        return e.apply(void 0, i);
                      });
                  },
                  clear: function () {
                    e = {};
                  },
                };
              })(),
              l = g(z(t, r), r),
              c = {
                tracker: d(),
                index: 0,
                startTransform: 0,
                isStart: !1,
                isScrolling: !1,
                isTouching: !1,
                transforms: 0,
                progress: 0,
              },
              u = ((o = s.on), s.off),
              p = s.emit,
              f = { on: o, off: u, env: l, state: c, options: r };
            (r.plugins || L.plugins || []).forEach(function (e) {
              return e(f, r);
            }),
              p("before-init", f);
            var m = S(l, r),
              v = E(l, c, r, m, s),
              x = (function (e, t, o, r) {
                var a = e.touchable,
                  s = [
                    "INPUT",
                    "SELECT",
                    "OPTION",
                    "TEXTAREA",
                    "BUTTON",
                    "VIDEO",
                  ],
                  l = (r = h(o, e, t, r)).preheat,
                  c = r.move,
                  u = r.stop;
                function d(e) {
                  return {
                    x: (e = a ? e.changedTouches[0] : e).pageX,
                    y: e.pageY,
                  };
                }
                function p(t) {
                  for (var n = 0; n < o.excludeElements.length; n++)
                    if (o.excludeElements[n].contains(t.target)) return;
                  var i,
                    r = e.element.$wrapper,
                    c =
                      (o.touchStartPreventDefault &&
                        -1 === s.indexOf(t.target.nodeName)) ||
                      o.touchStartForcePreventDefault;
                  !a && c && t.preventDefault(),
                    l(
                      d(t),
                      ((i = r),
                      (c = o.isHorizontal),
                      (r = getComputedStyle(i)
                        .transform.replace(/[a-z]|\(|\)|\s/g, "")
                        .split(",")
                        .map(parseFloat)),
                      (i = []),
                      16 === r.length
                        ? (i = r.slice(12, 14))
                        : 6 === r.length && (i = r.slice(4, 6)),
                      i[c ? 0 : 1] || 0)
                    );
                }
                function f(e) {
                  o.touchMoveStopPropagation && e.stopPropagation(),
                    c(d(e)),
                    t.isTouching && !1 !== e.cancelable && e.preventDefault();
                }
                function m() {
                  u();
                }
                return {
                  attach: function () {
                    var t = e.element.$el;
                    a
                      ? (n(t, "touchstart", p, {
                          passive: o.passiveListeners,
                          capture: !1,
                        }),
                        n(t, "touchmove", f),
                        n(t, "touchend", m),
                        n(t, "touchcancel", m))
                      : (n(t, "mousedown", p),
                        n(document, "mousemove", f),
                        n(document, "mouseup", m));
                  },
                  detach: function () {
                    var t = e.element.$el;
                    i(t, "touchstart", p),
                      i(t, "touchmove", f),
                      i(t, "touchend", m),
                      i(t, "touchcancel", m),
                      i(t, "mousedown", p),
                      i(document, "mousemove", f),
                      i(document, "mouseup", m);
                  },
                };
              })(l, c, r, v);
            return (
              (c = v.slideTo),
              Object.assign(f, {
                update: function () {
                  m.destroy(), l.update(z(t, r)), m.init(), v.update();
                },
                destroy: function () {
                  p("before-destroy", f),
                    x.detach(),
                    m.destroy(),
                    p("after-destroy", f),
                    s.clear();
                },
                slideTo: c,
                updateSize: function () {
                  l.update(z(t, r)), v.update();
                },
              }),
              m.init(),
              x.attach(),
              c(r.initialSlide, 0),
              p("after-init", f),
              f
            );
          }
          return (
            (L.use = function (e) {
              L.plugins = e;
            }),
            L
          );
        })();
      },
      3266: function (e) {
        e.exports = (function () {
          "use strict";
          function e(e, t, n, i) {
            e.addEventListener(t, n, i);
          }
          function t(e, t, n) {
            e.removeEventListener(t, n);
          }
          return function (n, i) {
            function o(e) {
              c(e.target, "next");
            }
            function r(e) {
              c(e.target, "prev");
            }
            var a = Boolean(i.navigation),
              s = { nextEl: null, prevEl: null },
              l = Object.assign(
                { disabledClass: "swiper-button-disabled" },
                i.navigation
              ),
              c = function (e, t) {
                (u(e) && !n.options.loop) ||
                  ((e = n.state.index),
                  "next" === t && n.slideTo(e + 1),
                  "prev" === t && n.slideTo(e - 1));
              },
              u = function (e) {
                return e.classList.contains(l.disabledClass);
              };
            n.on("before-slide", function (e, t, i) {
              var o, r;
              n.options.loop ||
                ((o = i),
                (i = (r = n.env.limitation).minIndex),
                (r = r.maxIndex),
                s &&
                  s.prevEl &&
                  s.nextEl &&
                  (s.nextEl.classList.contains(l.disabledClass) &&
                    i <= o &&
                    s.nextEl.classList.remove(l.disabledClass),
                  s.prevEl.classList.contains(l.disabledClass) &&
                    o <= r &&
                    s.prevEl.classList.remove(l.disabledClass),
                  o === i && s.prevEl.classList.add(l.disabledClass),
                  o === r && s.nextEl.classList.add(l.disabledClass)));
            }),
              n.on("after-init", function () {
                var t, i, c;
                a &&
                  ((s.nextEl =
                    "string" == typeof l.nextEl
                      ? document.body.querySelector(l.nextEl)
                      : l.nextEl),
                  (s.prevEl =
                    "string" == typeof l.prevEl
                      ? document.body.querySelector(l.prevEl)
                      : l.prevEl),
                  n.options.loop ||
                    ((t = n.state.index),
                    (i = n.env.element.$list),
                    t === (c = n.env.limitation.minIndex) &&
                      s.prevEl &&
                      s.prevEl.classList.add(l.disabledClass),
                    i.length === c &&
                      s.nextEl &&
                      s.nextEl.classList.add(l.disabledClass)),
                  e(s.nextEl, "click", o),
                  e(s.prevEl, "click", r));
              }),
              n.on("after-destroy", function () {
                s &&
                  s.prevEl &&
                  s.nextEl &&
                  (t(s.nextEl, "click", o),
                  t(s.prevEl, "click", r),
                  delete s.nextEl,
                  delete s.prevEl);
              });
          };
        })();
      },
    },
    t = {};
  function n(i) {
    var o = t[i];
    if (void 0 !== o) return o.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var i in t)
        n.o(t, i) &&
          !n.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      var e = n(7152),
        t = n.n(e),
        i = n(3266),
        o = n.n(i);
      !(function () {
        const e = document.querySelectorAll(
          ".wp-block-coblocks-gallery-carousel"
        );
        for (let n = 0; n < e.length; n++) {
          let i = null,
            r = 0,
            a = !1;
          const s = e[n],
            l = (e) => {
              const t = s.querySelector(
                `.wp-block-coblocks-gallery-carousel-thumbnail-${r}`
              );
              if (t) {
                t.classList.remove("is-active");
                const n = s.querySelector(
                  `.wp-block-coblocks-gallery-carousel-thumbnail-${e}`
                );
                n && n.classList.add("is-active");
              }
            },
            c = (e) => {
              i?.slideTo(e), l(e), (r = e);
            },
            u = (e) => {
              e !== r && (l(e), (r = e));
            },
            d = s.querySelector(".swiper-container");
          if (d) {
            const e = d.getAttribute("data-swiper");
            if (e) {
              const n = JSON.parse(e),
                r = s.querySelector(".nav-button__prev"),
                l = s.querySelector(".nav-button__next");
              r &&
                r.setAttribute(
                  "aria-label",
                  coblocksTinyswiper.carouselPrevButtonAriaLabel
                ),
                l &&
                  l.setAttribute(
                    "aria-label",
                    coblocksTinyswiper.carouselNextButtonAriaLabel
                  );
              const p = s.querySelectorAll("img");
              for (let e = 0; e < p.length; ++e)
                p[e].alt ||
                  (p[e].alt = coblocksTinyswiper.sliderImageAriaLabel);
              const f = {
                centeredSlides: !1,
                freeMode: !1,
                longSwipesRatio: 0.8,
                loop: !1,
                passiveListeners: !0,
                plugins: [],
                slidesPerView: 1,
              };
              if (
                (!0 === n.loop && (f.loop = n.loop),
                n.slidesPerView && (f.slidesPerView = n.slidesPerView),
                n.navigation &&
                  ((f.plugins = [...f.plugins, o()]),
                  (f.navigation = { nextEl: l, prevEl: r })),
                (i = new (t())(d, f)),
                new ResizeObserver(() => {
                  i.update();
                }).observe(d),
                n.thumbnails)
              ) {
                const e = s.querySelectorAll(
                  ".wp-block-coblocks-gallery-carousel-thumbnail"
                );
                for (const [t, n] of Object.entries(e))
                  n.addEventListener("click", () => c(t));
                const t = s.querySelector(
                  ".wp-block-coblocks-gallery-carousel-thumbnail-0"
                );
                t && t.classList.add("is-active");
              }
              if (!n.thumbnails && n.pageDots) {
                const e = s.querySelectorAll(
                  ".wp-block-coblocks-gallery-carousel-page-dot-pagination"
                );
                for (const [t, n] of Object.entries(e))
                  n.addEventListener("click", () => c(t));
                const t = s.querySelector(
                  ".wp-block-coblocks-gallery-carousel-page-dot--0"
                );
                t && t.classList.add("is-active");
              }
              if (!0 !== n.draggable) {
                const e = s.querySelector(".swiper-wrapper");
                e?.addEventListener("mousedown", (e) => {
                  e.stopPropagation();
                });
              }
              !0 === n.autoPlay &&
                n.autoPlaySpeed &&
                (!0 === n.pauseHover &&
                  (d.addEventListener("mouseenter", () => {
                    a = !0;
                  }),
                  d.addEventListener("mouseleave", () => {
                    a = !1;
                  })),
                setInterval(() => {
                  (!0 === n.pauseHover && !0 === a) ||
                    i?.slideTo(i.state.index + 1);
                }, n.autoPlaySpeed)),
                i.on("after-slide", u);
            }
          }
        }
      })();
    })();
})();
(() => {
  "use strict";
  var t = {
      d: (e, i) => {
        for (var s in i)
          t.o(i, s) &&
            !t.o(e, s) &&
            Object.defineProperty(e, s, { enumerable: !0, get: i[s] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      },
    },
    e = {};
  function i(t) {
    if (((this.formData = {}), (this.tree = {}), !(t instanceof FormData)))
      return this;
    this.formData = t;
    const e = () => {
      const t = new Map();
      return (
        (t.largestIndex = 0),
        (t.set = function (e, i) {
          "" === e
            ? (e = t.largestIndex++)
            : /^[0-9]+$/.test(e) &&
              ((e = parseInt(e)),
              t.largestIndex <= e && (t.largestIndex = e + 1)),
            Map.prototype.set.call(t, e, i);
        }),
        t
      );
    };
    this.tree = e();
    const i =
      /^(?<name>[a-z][-a-z0-9_:]*)(?<array>(?:\[(?:[a-z][-a-z0-9_:]*|[0-9]*)\])*)/i;
    for (const [t, s] of this.formData) {
      const o = t.match(i);
      if (o)
        if ("" === o.groups.array) this.tree.set(o.groups.name, s);
        else {
          const t = [
            ...o.groups.array.matchAll(/\[([a-z][-a-z0-9_:]*|[0-9]*)\]/gi),
          ].map(([t, e]) => e);
          t.unshift(o.groups.name);
          const i = t.pop();
          t.reduce((t, i) => {
            if (
              (/^[0-9]+$/.test(i) && (i = parseInt(i)), t.get(i) instanceof Map)
            )
              return t.get(i);
            const s = e();
            return t.set(i, s), s;
          }, this.tree).set(i, s);
        }
    }
  }
  t.r(e),
    t.d(e, {
      all: () => D,
      any: () => M,
      date: () => f,
      dayofweek: () => u,
      email: () => r,
      enum: () => h,
      file: () => m,
      maxdate: () => z,
      maxfilesize: () => $,
      maxitems: () => v,
      maxlength: () => x,
      maxnumber: () => b,
      mindate: () => A,
      minfilesize: () => j,
      minitems: () => w,
      minlength: () => g,
      minnumber: () => y,
      number: () => c,
      required: () => n,
      requiredfile: () => a,
      tel: () => l,
      time: () => d,
      url: () => p,
    }),
    (i.prototype.entries = function () {
      return this.tree.entries();
    }),
    (i.prototype.get = function (t) {
      return this.tree.get(t);
    }),
    (i.prototype.getAll = function (t) {
      if (!this.has(t)) return [];
      const e = (t) => {
        const i = [];
        if (t instanceof Map) for (const [s, o] of t) i.push(...e(o));
        else "" !== t && i.push(t);
        return i;
      };
      return e(this.get(t));
    }),
    (i.prototype.has = function (t) {
      return this.tree.has(t);
    }),
    (i.prototype.keys = function () {
      return this.tree.keys();
    }),
    (i.prototype.values = function () {
      return this.tree.values();
    });
  const s = i;
  function o({ rule: t, field: e, error: i, ...s }) {
    (this.rule = t), (this.field = e), (this.error = i), (this.properties = s);
  }
  const n = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    a = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    r = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          if ((t = t.trim()).length < 6) return !1;
          if (-1 === t.indexOf("@", 1)) return !1;
          if (t.indexOf("@") !== t.lastIndexOf("@")) return !1;
          const [e, i] = t.split("@", 2);
          if (!/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test(e)) return !1;
          if (/\.{2,}/.test(i)) return !1;
          if (/(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test(i)) return !1;
          const s = i.split(".");
          if (s.length < 2) return !1;
          for (const t of s) {
            if (/(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test(t)) return !1;
            if (!/^[a-z0-9-]+$/i.test(t)) return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    },
    p = function (t) {
      const e = t.getAll(this.field);
      if (
        !e.every((t) => {
          if ("" === (t = t.trim())) return !1;
          try {
            return ((t) =>
              -1 !==
              [
                "http",
                "https",
                "ftp",
                "ftps",
                "mailto",
                "news",
                "irc",
                "irc6",
                "ircs",
                "gopher",
                "nntp",
                "feed",
                "telnet",
                "mms",
                "rtsp",
                "sms",
                "svn",
                "tel",
                "fax",
                "xmpp",
                "webcal",
                "urn",
              ].indexOf(t))(new URL(t).protocol.replace(/:$/, ""));
          } catch {
            return !1;
          }
        })
      )
        throw new o(this);
    },
    l = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = (t = t.trim()).replaceAll(/[()/.*#\s-]+/g, "")),
              /^[+]?[0-9]+$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    c = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !!/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t) ||
                !!/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    f = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          if (((t = t.trim()), !/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t)))
            return !1;
          const e = new Date(t);
          return !Number.isNaN(e.valueOf());
        })
      )
        throw new o(this);
    },
    d = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          const e = t.trim().match(/^([0-9]{2})\:([0-9]{2})(?:\:([0-9]{2}))?$/);
          if (!e) return !1;
          const i = parseInt(e[1]),
            s = parseInt(e[2]),
            o = e[3] ? parseInt(e[3]) : 0;
          return 0 <= i && i <= 23 && 0 <= s && s <= 59 && 0 <= o && o <= 59;
        })
      )
        throw new o(this);
    },
    m = function (t) {
      if (
        !t.getAll(this.field).every(
          (t) =>
            t instanceof File &&
            this.accept?.some((e) =>
              /^\.[a-z0-9]+$/i.test(e)
                ? t.name.toLowerCase().endsWith(e.toLowerCase())
                : ((t) => {
                    const e = [],
                      i = t.match(
                        /^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i
                      );
                    if (i) {
                      const t = i.groups.toplevel.toLowerCase(),
                        s = i.groups.sub.toLowerCase();
                      for (const [o, n] of (() => {
                        const t = new Map();
                        return (
                          t.set("jpg|jpeg|jpe", "image/jpeg"),
                          t.set("gif", "image/gif"),
                          t.set("png", "image/png"),
                          t.set("bmp", "image/bmp"),
                          t.set("tiff|tif", "image/tiff"),
                          t.set("webp", "image/webp"),
                          t.set("ico", "image/x-icon"),
                          t.set("heic", "image/heic"),
                          t.set("asf|asx", "video/x-ms-asf"),
                          t.set("wmv", "video/x-ms-wmv"),
                          t.set("wmx", "video/x-ms-wmx"),
                          t.set("wm", "video/x-ms-wm"),
                          t.set("avi", "video/avi"),
                          t.set("divx", "video/divx"),
                          t.set("flv", "video/x-flv"),
                          t.set("mov|qt", "video/quicktime"),
                          t.set("mpeg|mpg|mpe", "video/mpeg"),
                          t.set("mp4|m4v", "video/mp4"),
                          t.set("ogv", "video/ogg"),
                          t.set("webm", "video/webm"),
                          t.set("mkv", "video/x-matroska"),
                          t.set("3gp|3gpp", "video/3gpp"),
                          t.set("3g2|3gp2", "video/3gpp2"),
                          t.set("txt|asc|c|cc|h|srt", "text/plain"),
                          t.set("csv", "text/csv"),
                          t.set("tsv", "text/tab-separated-values"),
                          t.set("ics", "text/calendar"),
                          t.set("rtx", "text/richtext"),
                          t.set("css", "text/css"),
                          t.set("htm|html", "text/html"),
                          t.set("vtt", "text/vtt"),
                          t.set("dfxp", "application/ttaf+xml"),
                          t.set("mp3|m4a|m4b", "audio/mpeg"),
                          t.set("aac", "audio/aac"),
                          t.set("ra|ram", "audio/x-realaudio"),
                          t.set("wav", "audio/wav"),
                          t.set("ogg|oga", "audio/ogg"),
                          t.set("flac", "audio/flac"),
                          t.set("mid|midi", "audio/midi"),
                          t.set("wma", "audio/x-ms-wma"),
                          t.set("wax", "audio/x-ms-wax"),
                          t.set("mka", "audio/x-matroska"),
                          t.set("rtf", "application/rtf"),
                          t.set("js", "application/javascript"),
                          t.set("pdf", "application/pdf"),
                          t.set("swf", "application/x-shockwave-flash"),
                          t.set("class", "application/java"),
                          t.set("tar", "application/x-tar"),
                          t.set("zip", "application/zip"),
                          t.set("gz|gzip", "application/x-gzip"),
                          t.set("rar", "application/rar"),
                          t.set("7z", "application/x-7z-compressed"),
                          t.set("exe", "application/x-msdownload"),
                          t.set("psd", "application/octet-stream"),
                          t.set("xcf", "application/octet-stream"),
                          t.set("doc", "application/msword"),
                          t.set("pot|pps|ppt", "application/vnd.ms-powerpoint"),
                          t.set("wri", "application/vnd.ms-write"),
                          t.set("xla|xls|xlt|xlw", "application/vnd.ms-excel"),
                          t.set("mdb", "application/vnd.ms-access"),
                          t.set("mpp", "application/vnd.ms-project"),
                          t.set(
                            "docx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ),
                          t.set(
                            "docm",
                            "application/vnd.ms-word.document.macroEnabled.12"
                          ),
                          t.set(
                            "dotx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
                          ),
                          t.set(
                            "dotm",
                            "application/vnd.ms-word.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlsx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ),
                          t.set(
                            "xlsm",
                            "application/vnd.ms-excel.sheet.macroEnabled.12"
                          ),
                          t.set(
                            "xlsb",
                            "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
                          ),
                          t.set(
                            "xltx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
                          ),
                          t.set(
                            "xltm",
                            "application/vnd.ms-excel.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlam",
                            "application/vnd.ms-excel.addin.macroEnabled.12"
                          ),
                          t.set(
                            "pptx",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          ),
                          t.set(
                            "pptm",
                            "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
                          ),
                          t.set(
                            "ppsx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slideshow"
                          ),
                          t.set(
                            "ppsm",
                            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
                          ),
                          t.set(
                            "potx",
                            "application/vnd.openxmlformats-officedocument.presentationml.template"
                          ),
                          t.set(
                            "potm",
                            "application/vnd.ms-powerpoint.template.macroEnabled.12"
                          ),
                          t.set(
                            "ppam",
                            "application/vnd.ms-powerpoint.addin.macroEnabled.12"
                          ),
                          t.set(
                            "sldx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slide"
                          ),
                          t.set(
                            "sldm",
                            "application/vnd.ms-powerpoint.slide.macroEnabled.12"
                          ),
                          t.set(
                            "onetoc|onetoc2|onetmp|onepkg",
                            "application/onenote"
                          ),
                          t.set("oxps", "application/oxps"),
                          t.set("xps", "application/vnd.ms-xpsdocument"),
                          t.set(
                            "odt",
                            "application/vnd.oasis.opendocument.text"
                          ),
                          t.set(
                            "odp",
                            "application/vnd.oasis.opendocument.presentation"
                          ),
                          t.set(
                            "ods",
                            "application/vnd.oasis.opendocument.spreadsheet"
                          ),
                          t.set(
                            "odg",
                            "application/vnd.oasis.opendocument.graphics"
                          ),
                          t.set(
                            "odc",
                            "application/vnd.oasis.opendocument.chart"
                          ),
                          t.set(
                            "odb",
                            "application/vnd.oasis.opendocument.database"
                          ),
                          t.set(
                            "odf",
                            "application/vnd.oasis.opendocument.formula"
                          ),
                          t.set("wp|wpd", "application/wordperfect"),
                          t.set("key", "application/vnd.apple.keynote"),
                          t.set("numbers", "application/vnd.apple.numbers"),
                          t.set("pages", "application/vnd.apple.pages"),
                          t
                        );
                      })())
                        (("*" === s && n.startsWith(t + "/")) || n === i[0]) &&
                          e.push(...o.split("|"));
                    }
                    return e;
                  })(e).some(
                    (e) => (
                      (e = "." + e.trim()),
                      t.name.toLowerCase().endsWith(e.toLowerCase())
                    )
                  )
            )
        )
      )
        throw new o(this);
    },
    h = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => this.accept?.some((e) => t === String(e)))
      )
        throw new o(this);
    },
    u = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          const e = 0 === (i = new Date(t).getDay()) ? 7 : i;
          var i;
          return this.accept?.some((t) => e === parseInt(t));
        })
      )
        throw new o(this);
    },
    w = function (t) {
      if (t.getAll(this.field).length < parseInt(this.threshold))
        throw new o(this);
    },
    v = function (t) {
      const e = t.getAll(this.field);
      if (parseInt(this.threshold) < e.length) throw new o(this);
    },
    g = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (i += t.length);
        }),
        0 !== i && i < parseInt(this.threshold))
      )
        throw new o(this);
    },
    x = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (i += t.length);
        }),
        parseInt(this.threshold) < i)
      )
        throw new o(this);
    },
    y = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(t) < parseFloat(this.threshold)))
      )
        throw new o(this);
    },
    b = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(this.threshold) < parseFloat(t)))
      )
        throw new o(this);
    },
    A = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                t < this.threshold
              )
            )
          )
      )
        throw new o(this);
    },
    z = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                this.threshold < t
              )
            )
          )
      )
        throw new o(this);
    },
    j = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          t instanceof File && (i += t.size);
        }),
        i < parseInt(this.threshold))
      )
        throw new o(this);
    },
    $ = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          t instanceof File && (i += t.size);
        }),
        parseInt(this.threshold) < i)
      )
        throw new o(this);
    },
    I = ({ ruleObj: t, options: i }) => {
      const { rule: s, ...o } = t;
      return (
        "function" == typeof e[s] &&
        ("function" != typeof e[s].matches || e[s].matches(o, i))
      );
    },
    O = ({ ruleObj: t, formDataTree: i, options: s }) => {
      const { rule: o } = t;
      e[o].call(t, i, s);
    },
    E = [],
    k = (t) => [...E].reduce((t, e) => (i) => e(i, t), t),
    D = function (t, e = {}) {
      const i = (this.rules ?? []).filter((t) => I({ ruleObj: t, options: e })),
        s = k(O);
      if (
        !i.every((i) => {
          try {
            s({ ruleObj: i, formDataTree: t, options: e });
          } catch (t) {
            if (!(t instanceof o)) throw t;
            if (void 0 !== t.error) throw t;
            return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    },
    M = function (t, e = {}) {
      const i = (this.rules ?? []).filter((t) => I({ ruleObj: t, options: e })),
        s = k(O);
      if (
        !i.some((i) => {
          try {
            s({ ruleObj: i, formDataTree: t, options: e });
          } catch (t) {
            if (!(t instanceof o)) throw t;
            return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    };
  var F;
  window.swv = {
    validators: e,
    validate: (t, e, i = {}) => {
      const n = (t.rules ?? []).filter((t) => I({ ruleObj: t, options: i }));
      if (!n.length) return new Map();
      const a = k(O),
        r = new s(e),
        p = n.reduce((t, e) => {
          try {
            a({ ruleObj: e, formDataTree: r, options: i });
          } catch (e) {
            if (!(e instanceof o)) throw e;
            if (void 0 !== e.field && !t.has(e.field) && void 0 !== e.error)
              return t.set(e.field, e);
          }
          return t;
        }, new Map());
      for (const t of r.keys())
        p.has(t) || p.set(t, { validInputs: r.getAll(t) });
      return p;
    },
    use: (t) => {
      E.push(t);
    },
    ...(null !== (F = window.swv) && void 0 !== F ? F : {}),
  };
})();
(() => {
  "use strict";
  const e = window.wp.i18n,
    t = (e) => Math.abs(parseInt(e, 10)),
    a = (e, t, a) => {
      const n = new CustomEvent(`wpcf7${t}`, { bubbles: !0, detail: a });
      "string" == typeof e && (e = document.querySelector(e)),
        e.dispatchEvent(n);
    },
    n = (e, t) => {
      const n = new Map([
        ["init", "init"],
        ["validation_failed", "invalid"],
        ["acceptance_missing", "unaccepted"],
        ["spam", "spam"],
        ["aborted", "aborted"],
        ["mail_sent", "sent"],
        ["mail_failed", "failed"],
        ["submitting", "submitting"],
        ["resetting", "resetting"],
        ["validating", "validating"],
        ["payment_required", "payment-required"],
      ]);
      n.has(t) && (t = n.get(t)),
        Array.from(n.values()).includes(t) ||
          (t = `custom-${(t = (t = t
            .replace(/[^0-9a-z]+/i, " ")
            .trim()).replace(/\s+/, "-"))}`);
      const r = e.getAttribute("data-status");
      if (
        ((e.wpcf7.status = t),
        e.setAttribute("data-status", t),
        e.classList.add(t),
        r && r !== t)
      ) {
        e.classList.remove(r);
        const t = {
          contactFormId: e.wpcf7.id,
          pluginVersion: e.wpcf7.pluginVersion,
          contactFormLocale: e.wpcf7.locale,
          unitTag: e.wpcf7.unitTag,
          containerPostId: e.wpcf7.containerPost,
          status: e.wpcf7.status,
          prevStatus: r,
        };
        a(e, "statuschanged", t);
      }
      return t;
    },
    r = (e) => {
      const { root: t, namespace: a = "contact-form-7/v1" } = wpcf7.api;
      return o.reduceRight(
        (e, t) => (a) => t(a, e),
        (e) => {
          let n,
            r,
            {
              url: o,
              path: c,
              endpoint: s,
              headers: i,
              body: l,
              data: p,
              ...d
            } = e;
          "string" == typeof s &&
            ((n = a.replace(/^\/|\/$/g, "")),
            (r = s.replace(/^\//, "")),
            (c = r ? n + "/" + r : n)),
            "string" == typeof c &&
              (-1 !== t.indexOf("?") && (c = c.replace("?", "&")),
              (c = c.replace(/^\//, "")),
              (o = t + c)),
            (i = { Accept: "application/json, */*;q=0.1", ...i }),
            delete i["X-WP-Nonce"],
            p &&
              ((l = JSON.stringify(p)),
              (i["Content-Type"] = "application/json"));
          const f = {
              code: "fetch_error",
              message: "You are probably offline.",
            },
            u = {
              code: "invalid_json",
              message: "The response is not a valid JSON response.",
            };
          return window
            .fetch(o || c || window.location.href, {
              ...d,
              headers: i,
              body: l,
            })
            .then(
              (e) =>
                Promise.resolve(e)
                  .then((e) => {
                    if (e.status >= 200 && e.status < 300) return e;
                    throw e;
                  })
                  .then((e) => {
                    if (204 === e.status) return null;
                    if (e && e.json)
                      return e.json().catch(() => {
                        throw u;
                      });
                    throw u;
                  }),
              () => {
                throw f;
              }
            );
        }
      )(e);
    },
    o = [];
  function c(e, t = {}) {
    const { target: a, scope: r = e, ...o } = t;
    if (void 0 === e.wpcf7?.schema) return;
    const c = { ...e.wpcf7.schema };
    if (void 0 !== a) {
      if (!e.contains(a)) return;
      if (!a.closest(".wpcf7-form-control-wrap[data-name]")) return;
      if (a.closest(".novalidate")) return;
    }
    const p = r.querySelectorAll(".wpcf7-form-control-wrap"),
      d = Array.from(p).reduce(
        (e, t) => (
          t.closest(".novalidate") ||
            t
              .querySelectorAll(":where( input, textarea, select ):enabled")
              .forEach((t) => {
                if (t.name)
                  switch (t.type) {
                    case "button":
                    case "image":
                    case "reset":
                    case "submit":
                      break;
                    case "checkbox":
                    case "radio":
                      t.checked && e.append(t.name, t.value);
                      break;
                    case "select-multiple":
                      for (const a of t.selectedOptions)
                        e.append(t.name, a.value);
                      break;
                    case "file":
                      for (const a of t.files) e.append(t.name, a);
                      break;
                    default:
                      e.append(t.name, t.value);
                  }
              }),
          e
        ),
        new FormData()
      ),
      f = e.getAttribute("data-status");
    Promise.resolve(n(e, "validating"))
      .then((n) => {
        if (void 0 !== swv) {
          const n = swv.validate(c, d, t);
          for (const t of p) {
            if (void 0 === t.dataset.name) continue;
            const o = t.dataset.name;
            if (n.has(o)) {
              const { error: t, validInputs: a } = n.get(o);
              i(e, o),
                void 0 !== t && s(e, o, t, { scope: r }),
                l(e, o, null != a ? a : []);
            }
            if (t.contains(a)) break;
          }
        }
      })
      .finally(() => {
        n(e, f);
      });
  }
  r.use = (e) => {
    o.unshift(e);
  };
  const s = (e, t, a, n) => {
      const { scope: r = e, ...o } = null != n ? n : {},
        c = `${e.wpcf7?.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi, ""),
        s = e.querySelector(
          `.wpcf7-form-control-wrap[data-name="${t}"] .wpcf7-form-control`
        );
      (() => {
        const t = document.createElement("li");
        t.setAttribute("id", c),
          s && s.id
            ? t.insertAdjacentHTML("beforeend", `<a href="#${s.id}">${a}</a>`)
            : t.insertAdjacentText("beforeend", a),
          e.wpcf7.parent
            .querySelector(".screen-reader-response ul")
            .appendChild(t);
      })(),
        r
          .querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`)
          .forEach((e) => {
            const t = document.createElement("span");
            t.classList.add("wpcf7-not-valid-tip"),
              t.setAttribute("aria-hidden", "true"),
              t.insertAdjacentText("beforeend", a),
              e.appendChild(t),
              e.querySelectorAll("[aria-invalid]").forEach((e) => {
                e.setAttribute("aria-invalid", "true");
              }),
              e.querySelectorAll(".wpcf7-form-control").forEach((e) => {
                e.classList.add("wpcf7-not-valid"),
                  e.setAttribute("aria-describedby", c),
                  "function" == typeof e.setCustomValidity &&
                    e.setCustomValidity(a),
                  e.closest(".use-floating-validation-tip") &&
                    (e.addEventListener("focus", (e) => {
                      t.setAttribute("style", "display: none");
                    }),
                    t.addEventListener("click", (e) => {
                      t.setAttribute("style", "display: none");
                    }));
              });
          });
    },
    i = (e, t) => {
      const a = `${e.wpcf7?.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi, "");
      e.wpcf7.parent
        .querySelector(`.screen-reader-response ul li#${a}`)
        ?.remove(),
        e
          .querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`)
          .forEach((e) => {
            e.querySelector(".wpcf7-not-valid-tip")?.remove(),
              e.querySelectorAll("[aria-invalid]").forEach((e) => {
                e.setAttribute("aria-invalid", "false");
              }),
              e.querySelectorAll(".wpcf7-form-control").forEach((e) => {
                e.removeAttribute("aria-describedby"),
                  e.classList.remove("wpcf7-not-valid"),
                  "function" == typeof e.setCustomValidity &&
                    e.setCustomValidity("");
              });
          });
    },
    l = (e, t, a) => {
      e.querySelectorAll(`[data-reflection-of="${t}"]`).forEach((e) => {
        if ("output" === e.tagName.toLowerCase()) {
          const t = e;
          0 === a.length && a.push(t.dataset.default),
            a.slice(0, 1).forEach((e) => {
              e instanceof File && (e = e.name), (t.textContent = e);
            });
        } else
          e.querySelectorAll("output").forEach((e) => {
            e.hasAttribute("data-default")
              ? 0 === a.length
                ? e.removeAttribute("hidden")
                : e.setAttribute("hidden", "hidden")
              : e.remove();
          }),
            a.forEach((a) => {
              a instanceof File && (a = a.name);
              const n = document.createElement("output");
              n.setAttribute("name", t), (n.textContent = a), e.appendChild(n);
            });
      });
    };
  function p(e, t = {}) {
    if (wpcf7.blocked) return d(e), void n(e, "submitting");
    const o = new FormData(e);
    t.submitter &&
      t.submitter.name &&
      o.append(t.submitter.name, t.submitter.value);
    const c = {
      contactFormId: e.wpcf7.id,
      pluginVersion: e.wpcf7.pluginVersion,
      contactFormLocale: e.wpcf7.locale,
      unitTag: e.wpcf7.unitTag,
      containerPostId: e.wpcf7.containerPost,
      status: e.wpcf7.status,
      inputs: Array.from(o, (e) => {
        const t = e[0],
          a = e[1];
        return !t.match(/^_/) && { name: t, value: a };
      }).filter((e) => !1 !== e),
      formData: o,
    };
    r({
      endpoint: `contact-forms/${e.wpcf7.id}/feedback`,
      method: "POST",
      body: o,
      wpcf7: { endpoint: "feedback", form: e, detail: c },
    })
      .then((t) => {
        const r = n(e, t.status);
        return (
          (c.status = t.status),
          (c.apiResponse = t),
          ["invalid", "unaccepted", "spam", "aborted"].includes(r)
            ? a(e, r, c)
            : ["sent", "failed"].includes(r) && a(e, `mail${r}`, c),
          a(e, "submit", c),
          t
        );
      })
      .then((t) => {
        t.posted_data_hash &&
          (e.querySelector('input[name="_wpcf7_posted_data_hash"]').value =
            t.posted_data_hash),
          "mail_sent" === t.status &&
            (e.reset(), (e.wpcf7.resetOnMailSent = !0)),
          t.invalid_fields &&
            t.invalid_fields.forEach((t) => {
              s(e, t.field, t.message);
            }),
          e.wpcf7.parent
            .querySelector('.screen-reader-response [role="status"]')
            .insertAdjacentText("beforeend", t.message),
          e.querySelectorAll(".wpcf7-response-output").forEach((e) => {
            e.innerText = t.message;
          });
      })
      .catch((e) => console.error(e));
  }
  r.use((e, t) => {
    if (e.wpcf7 && "feedback" === e.wpcf7.endpoint) {
      const { form: t, detail: r } = e.wpcf7;
      d(t), a(t, "beforesubmit", r), n(t, "submitting");
    }
    return t(e);
  });
  const d = (e) => {
    e.querySelectorAll(".wpcf7-form-control-wrap").forEach((t) => {
      t.dataset.name && i(e, t.dataset.name);
    }),
      (e.wpcf7.parent.querySelector(
        '.screen-reader-response [role="status"]'
      ).innerText = ""),
      e.querySelectorAll(".wpcf7-response-output").forEach((e) => {
        e.innerText = "";
      });
  };
  function f(e) {
    const t = new FormData(e),
      o = {
        contactFormId: e.wpcf7.id,
        pluginVersion: e.wpcf7.pluginVersion,
        contactFormLocale: e.wpcf7.locale,
        unitTag: e.wpcf7.unitTag,
        containerPostId: e.wpcf7.containerPost,
        status: e.wpcf7.status,
        inputs: Array.from(t, (e) => {
          const t = e[0],
            a = e[1];
          return !t.match(/^_/) && { name: t, value: a };
        }).filter((e) => !1 !== e),
        formData: t,
      };
    r({
      endpoint: `contact-forms/${e.wpcf7.id}/refill`,
      method: "GET",
      wpcf7: { endpoint: "refill", form: e, detail: o },
    })
      .then((t) => {
        e.wpcf7.resetOnMailSent
          ? (delete e.wpcf7.resetOnMailSent, n(e, "mail_sent"))
          : n(e, "init"),
          (o.apiResponse = t),
          a(e, "reset", o);
      })
      .catch((e) => console.error(e));
  }
  r.use((e, t) => {
    if (e.wpcf7 && "refill" === e.wpcf7.endpoint) {
      const { form: t, detail: a } = e.wpcf7;
      d(t), n(t, "resetting");
    }
    return t(e);
  });
  const u = (e, t) => {
      for (const a in t) {
        const n = t[a];
        e.querySelectorAll(`input[name="${a}"]`).forEach((e) => {
          e.value = "";
        }),
          e
            .querySelectorAll(`img.wpcf7-captcha-${a.replaceAll(":", "")}`)
            .forEach((e) => {
              e.setAttribute("src", n);
            });
        const r = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
        r &&
          e
            .querySelectorAll(`input[name="_wpcf7_captcha_challenge_${a}"]`)
            .forEach((e) => {
              e.value = r[1];
            });
      }
    },
    m = (e, t) => {
      for (const a in t) {
        const n = t[a][0],
          r = t[a][1];
        e.querySelectorAll(
          `.wpcf7-form-control-wrap[data-name="${a}"]`
        ).forEach((e) => {
          (e.querySelector(`input[name="${a}"]`).value = ""),
            (e.querySelector(".wpcf7-quiz-label").textContent = n),
            (e.querySelector(`input[name="_wpcf7_quiz_answer_${a}"]`).value =
              r);
        });
      }
    };
  function w(e) {
    const a = new FormData(e);
    (e.wpcf7 = {
      id: t(a.get("_wpcf7")),
      status: e.getAttribute("data-status"),
      pluginVersion: a.get("_wpcf7_version"),
      locale: a.get("_wpcf7_locale"),
      unitTag: a.get("_wpcf7_unit_tag"),
      containerPost: t(a.get("_wpcf7_container_post")),
      parent: e.closest(".wpcf7"),
      get schema() {
        return wpcf7.schemas.get(this.id);
      },
    }),
      wpcf7.schemas.set(e.wpcf7.id, void 0),
      e.querySelectorAll(".has-spinner").forEach((e) => {
        e.insertAdjacentHTML("afterend", '<span class="wpcf7-spinner"></span>');
      }),
      ((e) => {
        e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t) => {
          t.addEventListener("change", (t) => {
            const a = t.target.getAttribute("name");
            e.querySelectorAll(`input[type="checkbox"][name="${a}"]`).forEach(
              (e) => {
                e !== t.target && (e.checked = !1);
              }
            );
          });
        });
      })(e),
      ((e) => {
        e.querySelectorAll(".has-free-text").forEach((t) => {
          const a = t.querySelector("input.wpcf7-free-text"),
            n = t.querySelector('input[type="checkbox"], input[type="radio"]');
          (a.disabled = !n.checked),
            e.addEventListener("change", (e) => {
              (a.disabled = !n.checked),
                e.target === n && n.checked && a.focus();
            });
        });
      })(e),
      ((e) => {
        e.querySelectorAll(".wpcf7-validates-as-url").forEach((e) => {
          e.addEventListener("change", (t) => {
            let a = e.value.trim();
            a &&
              !a.match(/^[a-z][a-z0-9.+-]*:/i) &&
              -1 !== a.indexOf(".") &&
              ((a = a.replace(/^\/+/, "")), (a = "http://" + a)),
              (e.value = a);
          });
        });
      })(e),
      ((e) => {
        if (
          !e.querySelector(".wpcf7-acceptance") ||
          e.classList.contains("wpcf7-acceptance-as-validation")
        )
          return;
        const t = () => {
          let t = !0;
          e.querySelectorAll(".wpcf7-acceptance").forEach((e) => {
            if (!t || e.classList.contains("optional")) return;
            const a = e.querySelector('input[type="checkbox"]');
            ((e.classList.contains("invert") && a.checked) ||
              (!e.classList.contains("invert") && !a.checked)) &&
              (t = !1);
          }),
            e.querySelectorAll(".wpcf7-submit").forEach((e) => {
              e.disabled = !t;
            });
        };
        t(),
          e.addEventListener("change", (e) => {
            t();
          }),
          e.addEventListener("wpcf7reset", (e) => {
            t();
          });
      })(e),
      ((e) => {
        const a = (e, a) => {
            const n = t(e.getAttribute("data-starting-value")),
              r = t(e.getAttribute("data-maximum-value")),
              o = t(e.getAttribute("data-minimum-value")),
              c = e.classList.contains("down")
                ? n - a.value.length
                : a.value.length;
            e.setAttribute("data-current-value", c),
              (e.innerText = c),
              r && r < a.value.length
                ? e.classList.add("too-long")
                : e.classList.remove("too-long"),
              o && a.value.length < o
                ? e.classList.add("too-short")
                : e.classList.remove("too-short");
          },
          n = (t) => {
            (t = { init: !1, ...t }),
              e.querySelectorAll(".wpcf7-character-count").forEach((n) => {
                const r = n.getAttribute("data-target-name"),
                  o = e.querySelector(`[name="${r}"]`);
                o &&
                  ((o.value = o.defaultValue),
                  a(n, o),
                  t.init &&
                    o.addEventListener("keyup", (e) => {
                      a(n, o);
                    }));
              });
          };
        n({ init: !0 }),
          e.addEventListener("wpcf7reset", (e) => {
            n();
          });
      })(e),
      window.addEventListener("load", (t) => {
        wpcf7.cached && e.reset();
      }),
      e.addEventListener("reset", (t) => {
        wpcf7.reset(e);
      }),
      e.addEventListener("submit", (t) => {
        wpcf7.submit(e, { submitter: t.submitter }), t.preventDefault();
      }),
      e.addEventListener("wpcf7submit", (t) => {
        t.detail.apiResponse.captcha && u(e, t.detail.apiResponse.captcha),
          t.detail.apiResponse.quiz && m(e, t.detail.apiResponse.quiz);
      }),
      e.addEventListener("wpcf7reset", (t) => {
        t.detail.apiResponse.captcha && u(e, t.detail.apiResponse.captcha),
          t.detail.apiResponse.quiz && m(e, t.detail.apiResponse.quiz);
      }),
      e.addEventListener("change", (t) => {
        t.target.closest(".wpcf7-form-control") &&
          wpcf7.validate(e, { target: t.target });
      }),
      e.addEventListener("wpcf7statuschanged", (t) => {
        const a = t.detail.status;
        e.querySelectorAll(".active-on-any").forEach((e) => {
          e.removeAttribute("inert"), e.classList.remove("active-on-any");
        }),
          e.querySelectorAll(`.inert-on-${a}`).forEach((e) => {
            e.setAttribute("inert", "inert"), e.classList.add("active-on-any");
          });
      });
  }
  document.addEventListener("DOMContentLoaded", (t) => {
    var a;
    if ("undefined" != typeof wpcf7)
      if (void 0 !== wpcf7.api)
        if ("function" == typeof window.fetch)
          if ("function" == typeof window.FormData)
            if ("function" == typeof NodeList.prototype.forEach)
              if ("function" == typeof String.prototype.replaceAll) {
                (wpcf7 = {
                  init: w,
                  submit: p,
                  reset: f,
                  validate: c,
                  schemas: new Map(),
                  ...(null !== (a = wpcf7) && void 0 !== a ? a : {}),
                }),
                  document.querySelectorAll("form .wpcf7").forEach((t) => {
                    const a = document.createElement("p");
                    a.setAttribute("class", "wpcf7-form-in-wrong-place");
                    const n = document.createElement("strong");
                    n.append((0, e.__)("Error:", "contact-form-7"));
                    const r = (0, e.__)(
                      "This contact form is placed in the wrong place.",
                      "contact-form-7"
                    );
                    a.append(n, " ", r), t.replaceWith(a);
                  }),
                  document.querySelectorAll(".wpcf7 > form").forEach((e) => {
                    wpcf7.init(e),
                      e.closest(".wpcf7").classList.replace("no-js", "js");
                  });
                for (const e of wpcf7.schemas.keys())
                  r({
                    endpoint: `contact-forms/${e}/feedback/schema`,
                    method: "GET",
                  }).then((t) => {
                    wpcf7.schemas.set(e, t);
                  });
              } else
                console.error(
                  "Your browser does not support String.replaceAll()."
                );
            else
              console.error(
                "Your browser does not support NodeList.forEach()."
              );
          else
            console.error("Your browser does not support window.FormData().");
        else console.error("Your browser does not support window.fetch().");
      else console.error("wpcf7.api is not defined.");
    else console.error("wpcf7 is not defined.");
  });
})();
