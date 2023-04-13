define([
  'exports',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './EllipsoidRhumbLine-77eff028',
  './GeometryAttribute-b8117bde',
  './Math-2ce22ee9',
  './WebGLConstants-7f557f93'
], function (e, t, n, r, a, i, o, s, u) {
  'use strict'
  var x = {}
  function p(e, t, n) {
    n = n || 2
    var r,
      a,
      i,
      o,
      s,
      u,
      x,
      p = t && t.length,
      h = p ? t[0] * n : e.length,
      c = l(e, 0, h, n, !0),
      f = []
    if (!c || c.next === c.prev) return f
    if (
      (p &&
        (c = (function (e, t, n, r) {
          var a,
            i,
            o,
            s = []
          for (a = 0, i = t.length; a < i; a++)
            (o = l(e, t[a] * r, a < i - 1 ? t[a + 1] * r : e.length, r, !1)) ===
              o.next && (o.steiner = !0),
              s.push(A(o))
          for (s.sort(m), a = 0; a < s.length; a++) n = C(s[a], n)
          return n
        })(e, t, c, n)),
      e.length > 80 * n)
    ) {
      ;(r = i = e[0]), (a = o = e[1])
      for (var v = n; v < h; v += n)
        (s = e[v]) < r && (r = s),
          (u = e[v + 1]) < a && (a = u),
          s > i && (i = s),
          u > o && (o = u)
      x = 0 !== (x = Math.max(i - r, o - a)) ? 32767 / x : 0
    }
    return y(c, f, n, r, a, x, 0), f
  }
  function l(e, t, n, r, a) {
    var i, o
    if (a === B(e, t, n, r) > 0)
      for (i = t; i < n; i += r) o = G(i, e[i], e[i + 1], o)
    else for (i = n - r; i >= t; i -= r) o = G(i, e[i], e[i + 1], o)
    return o && E(o, o.next) && (O(o), (o = o.next)), o
  }
  function h(e, t) {
    if (!e) return e
    t || (t = e)
    var n,
      r = e
    do {
      if (
        ((n = !1), r.steiner || (!E(r, r.next) && 0 !== S(r.prev, r, r.next)))
      )
        r = r.next
      else {
        if ((O(r), (r = t = r.prev) === r.next)) break
        n = !0
      }
    } while (n || r !== t)
    return t
  }
  function y(e, t, n, r, a, i, o) {
    if (e) {
      !o &&
        i &&
        (function (e, t, n, r) {
          var a = e
          do {
            0 === a.z && (a.z = w(a.x, a.y, t, n, r)),
              (a.prevZ = a.prev),
              (a.nextZ = a.next),
              (a = a.next)
          } while (a !== e)
          ;(a.prevZ.nextZ = null),
            (a.prevZ = null),
            (function (e) {
              var t,
                n,
                r,
                a,
                i,
                o,
                s,
                u,
                x = 1
              do {
                for (n = e, e = null, i = null, o = 0; n; ) {
                  for (
                    o++, r = n, s = 0, t = 0;
                    t < x && (s++, (r = r.nextZ));
                    t++
                  );
                  for (u = x; s > 0 || (u > 0 && r); )
                    0 !== s && (0 === u || !r || n.z <= r.z)
                      ? ((a = n), (n = n.nextZ), s--)
                      : ((a = r), (r = r.nextZ), u--),
                      i ? (i.nextZ = a) : (e = a),
                      (a.prevZ = i),
                      (i = a)
                  n = r
                }
                ;(i.nextZ = null), (x *= 2)
              } while (o > 1)
            })(a)
        })(e, r, a, i)
      for (var s, u, x = e; e.prev !== e.next; )
        if (((s = e.prev), (u = e.next), i ? f(e, r, a, i) : c(e)))
          t.push((s.i / n) | 0),
            t.push((e.i / n) | 0),
            t.push((u.i / n) | 0),
            O(e),
            (e = u.next),
            (x = u.next)
        else if ((e = u) === x) {
          o
            ? 1 === o
              ? y((e = v(h(e), t, n)), t, n, r, a, i, 2)
              : 2 === o && d(e, t, n, r, a, i)
            : y(h(e), t, n, r, a, i, 1)
          break
        }
    }
  }
  function c(e) {
    var t = e.prev,
      n = e,
      r = e.next
    if (S(t, n, r) >= 0) return !1
    for (
      var a = t.x,
        i = n.x,
        o = r.x,
        s = t.y,
        u = n.y,
        x = r.y,
        p = a < i ? (a < o ? a : o) : i < o ? i : o,
        l = s < u ? (s < x ? s : x) : u < x ? u : x,
        h = a > i ? (a > o ? a : o) : i > o ? i : o,
        y = s > u ? (s > x ? s : x) : u > x ? u : x,
        c = r.next;
      c !== t;

    ) {
      if (
        c.x >= p &&
        c.x <= h &&
        c.y >= l &&
        c.y <= y &&
        b(a, s, i, u, o, x, c.x, c.y) &&
        S(c.prev, c, c.next) >= 0
      )
        return !1
      c = c.next
    }
    return !0
  }
  function f(e, t, n, r) {
    var a = e.prev,
      i = e,
      o = e.next
    if (S(a, i, o) >= 0) return !1
    for (
      var s = a.x,
        u = i.x,
        x = o.x,
        p = a.y,
        l = i.y,
        h = o.y,
        y = s < u ? (s < x ? s : x) : u < x ? u : x,
        c = p < l ? (p < h ? p : h) : l < h ? l : h,
        f = s > u ? (s > x ? s : x) : u > x ? u : x,
        v = p > l ? (p > h ? p : h) : l > h ? l : h,
        d = w(y, c, t, n, r),
        m = w(f, v, t, n, r),
        C = e.prevZ,
        g = e.nextZ;
      C && C.z >= d && g && g.z <= m;

    ) {
      if (
        C.x >= y &&
        C.x <= f &&
        C.y >= c &&
        C.y <= v &&
        C !== a &&
        C !== o &&
        b(s, p, u, l, x, h, C.x, C.y) &&
        S(C.prev, C, C.next) >= 0
      )
        return !1
      if (
        ((C = C.prevZ),
        g.x >= y &&
          g.x <= f &&
          g.y >= c &&
          g.y <= v &&
          g !== a &&
          g !== o &&
          b(s, p, u, l, x, h, g.x, g.y) &&
          S(g.prev, g, g.next) >= 0)
      )
        return !1
      g = g.nextZ
    }
    for (; C && C.z >= d; ) {
      if (
        C.x >= y &&
        C.x <= f &&
        C.y >= c &&
        C.y <= v &&
        C !== a &&
        C !== o &&
        b(s, p, u, l, x, h, C.x, C.y) &&
        S(C.prev, C, C.next) >= 0
      )
        return !1
      C = C.prevZ
    }
    for (; g && g.z <= m; ) {
      if (
        g.x >= y &&
        g.x <= f &&
        g.y >= c &&
        g.y <= v &&
        g !== a &&
        g !== o &&
        b(s, p, u, l, x, h, g.x, g.y) &&
        S(g.prev, g, g.next) >= 0
      )
        return !1
      g = g.nextZ
    }
    return !0
  }
  function v(e, t, n) {
    var r = e
    do {
      var a = r.prev,
        i = r.next.next
      !E(a, i) &&
        Z(a, r, r.next, i) &&
        D(a, i) &&
        D(i, a) &&
        (t.push((a.i / n) | 0),
        t.push((r.i / n) | 0),
        t.push((i.i / n) | 0),
        O(r),
        O(r.next),
        (r = e = i)),
        (r = r.next)
    } while (r !== e)
    return h(r)
  }
  function d(e, t, n, r, a, i) {
    var o = e
    do {
      for (var s = o.next.next; s !== o.prev; ) {
        if (o.i !== s.i && M(o, s)) {
          var u = R(o, s)
          return (
            (o = h(o, o.next)),
            (u = h(u, u.next)),
            y(o, t, n, r, a, i, 0),
            void y(u, t, n, r, a, i, 0)
          )
        }
        s = s.next
      }
      o = o.next
    } while (o !== e)
  }
  function m(e, t) {
    return e.x - t.x
  }
  function C(e, t) {
    var n = (function (e, t) {
      var n,
        r = t,
        a = e.x,
        i = e.y,
        o = -1 / 0
      do {
        if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
          var s = r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y)
          if (
            s <= a &&
            s > o &&
            ((o = s), (n = r.x < r.next.x ? r : r.next), s === a)
          )
            return n
        }
        r = r.next
      } while (r !== t)
      if (!n) return null
      var u,
        x = n,
        p = n.x,
        l = n.y,
        h = 1 / 0
      r = n
      do {
        a >= r.x &&
          r.x >= p &&
          a !== r.x &&
          b(i < l ? a : o, i, p, l, i < l ? o : a, i, r.x, r.y) &&
          ((u = Math.abs(i - r.y) / (a - r.x)),
          D(r, e) &&
            (u < h || (u === h && (r.x > n.x || (r.x === n.x && g(n, r))))) &&
            ((n = r), (h = u))),
          (r = r.next)
      } while (r !== x)
      return n
    })(e, t)
    if (!n) return t
    var r = R(n, e)
    return h(r, r.next), h(n, n.next)
  }
  function g(e, t) {
    return S(e.prev, e, t.prev) < 0 && S(t.next, e, e.next) < 0
  }
  function w(e, t, n, r, a) {
    return (
      (e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = ((e - n) * a) | 0) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) |
      ((t =
        1431655765 &
        ((t =
          858993459 &
          ((t =
            252645135 &
            ((t = 16711935 & ((t = ((t - r) * a) | 0) | (t << 8))) |
              (t << 4))) |
            (t << 2))) |
          (t << 1))) <<
        1)
    )
  }
  function A(e) {
    var t = e,
      n = e
    do {
      ;(t.x < n.x || (t.x === n.x && t.y < n.y)) && (n = t), (t = t.next)
    } while (t !== e)
    return n
  }
  function b(e, t, n, r, a, i, o, s) {
    return (
      (a - o) * (t - s) >= (e - o) * (i - s) &&
      (e - o) * (r - s) >= (n - o) * (t - s) &&
      (n - o) * (i - s) >= (a - o) * (r - s)
    )
  }
  function M(e, t) {
    return (
      e.next.i !== t.i &&
      e.prev.i !== t.i &&
      !(function (e, t) {
        var n = e
        do {
          if (
            n.i !== e.i &&
            n.next.i !== e.i &&
            n.i !== t.i &&
            n.next.i !== t.i &&
            Z(n, n.next, e, t)
          )
            return !0
          n = n.next
        } while (n !== e)
        return !1
      })(e, t) &&
      ((D(e, t) &&
        D(t, e) &&
        (function (e, t) {
          var n = e,
            r = !1,
            a = (e.x + t.x) / 2,
            i = (e.y + t.y) / 2
          do {
            n.y > i != n.next.y > i &&
              n.next.y !== n.y &&
              a < ((n.next.x - n.x) * (i - n.y)) / (n.next.y - n.y) + n.x &&
              (r = !r),
              (n = n.next)
          } while (n !== e)
          return r
        })(e, t) &&
        (S(e.prev, e, t.prev) || S(e, t.prev, t))) ||
        (E(e, t) && S(e.prev, e, e.next) > 0 && S(t.prev, t, t.next) > 0))
    )
  }
  function S(e, t, n) {
    return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y)
  }
  function E(e, t) {
    return e.x === t.x && e.y === t.y
  }
  function Z(e, t, n, r) {
    var a = L(S(e, t, n)),
      i = L(S(e, t, r)),
      o = L(S(n, r, e)),
      s = L(S(n, r, t))
    return (
      (a !== i && o !== s) ||
      !(0 !== a || !z(e, n, t)) ||
      !(0 !== i || !z(e, r, t)) ||
      !(0 !== o || !z(n, e, r)) ||
      !(0 !== s || !z(n, t, r))
    )
  }
  function z(e, t, n) {
    return (
      t.x <= Math.max(e.x, n.x) &&
      t.x >= Math.min(e.x, n.x) &&
      t.y <= Math.max(e.y, n.y) &&
      t.y >= Math.min(e.y, n.y)
    )
  }
  function L(e) {
    return e > 0 ? 1 : e < 0 ? -1 : 0
  }
  function D(e, t) {
    return S(e.prev, e, e.next) < 0
      ? S(e, t, e.next) >= 0 && S(e, e.prev, t) >= 0
      : S(e, t, e.prev) < 0 || S(e, e.next, t) < 0
  }
  function R(e, t) {
    var n = new T(e.i, e.x, e.y),
      r = new T(t.i, t.x, t.y),
      a = e.next,
      i = t.prev
    return (
      (e.next = t),
      (t.prev = e),
      (n.next = a),
      (a.prev = n),
      (r.next = n),
      (n.prev = r),
      (i.next = r),
      (r.prev = i),
      r
    )
  }
  function G(e, t, n, r) {
    var a = new T(e, t, n)
    return (
      r
        ? ((a.next = r.next), (a.prev = r), (r.next.prev = a), (r.next = a))
        : ((a.prev = a), (a.next = a)),
      a
    )
  }
  function O(e) {
    ;(e.next.prev = e.prev),
      (e.prev.next = e.next),
      e.prevZ && (e.prevZ.nextZ = e.nextZ),
      e.nextZ && (e.nextZ.prevZ = e.prevZ)
  }
  function T(e, t, n) {
    ;(this.i = e),
      (this.x = t),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = 0),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1)
  }
  function B(e, t, n, r) {
    for (var a = 0, i = t, o = n - r; i < n; i += r)
      (a += (e[o] - e[i]) * (e[i + 1] + e[o + 1])), (o = i)
    return a
  }
  ;(({
    get exports() {
      return x
    },
    set exports(e) {
      x = e
    }
  }).exports = p),
    (x.default = p),
    (p.deviation = function (e, t, n, r) {
      var a = t && t.length,
        i = a ? t[0] * n : e.length,
        o = Math.abs(B(e, 0, i, n))
      if (a)
        for (var s = 0, u = t.length; s < u; s++) {
          var x = t[s] * n,
            p = s < u - 1 ? t[s + 1] * n : e.length
          o -= Math.abs(B(e, x, p, n))
        }
      var l = 0
      for (s = 0; s < r.length; s += 3) {
        var h = r[s] * n,
          y = r[s + 1] * n,
          c = r[s + 2] * n
        l += Math.abs(
          (e[h] - e[c]) * (e[y + 1] - e[h + 1]) -
            (e[h] - e[y]) * (e[c + 1] - e[h + 1])
        )
      }
      return 0 === o && 0 === l ? 0 : Math.abs((l - o) / o)
    }),
    (p.flatten = function (e) {
      for (
        var t = e[0][0].length,
          n = { vertices: [], holes: [], dimensions: t },
          r = 0,
          a = 0;
        a < e.length;
        a++
      ) {
        for (var i = 0; i < e[a].length; i++)
          for (var o = 0; o < t; o++) n.vertices.push(e[a][i][o])
        a > 0 && ((r += e[a - 1].length), n.holes.push(r))
      }
      return n
    })
  const W = {
    CLOCKWISE: u.WebGLConstants.CW,
    COUNTER_CLOCKWISE: u.WebGLConstants.CCW,
    validate: function (e) {
      return e === W.CLOCKWISE || e === W.COUNTER_CLOCKWISE
    }
  }
  var P = Object.freeze(W)
  const $ = new n.Cartesian3(),
    I = new n.Cartesian3(),
    N = {
      computeArea2D: function (e) {
        const t = e.length
        let n = 0
        for (let r = t - 1, a = 0; a < t; r = a++) {
          const t = e[r],
            i = e[a]
          n += t.x * i.y - i.x * t.y
        }
        return 0.5 * n
      },
      computeWindingOrder2D: function (e) {
        return N.computeArea2D(e) > 0 ? P.COUNTER_CLOCKWISE : P.CLOCKWISE
      },
      triangulate: function (e, n) {
        const r = t.Cartesian2.packArray(e)
        return x(r, n, 2)
      }
    },
    U = new n.Cartesian3(),
    _ = new n.Cartesian3(),
    K = new n.Cartesian3(),
    V = new n.Cartesian3(),
    F = new n.Cartesian3(),
    k = new n.Cartesian3(),
    q = new n.Cartesian3(),
    j = new t.Cartesian2(),
    H = new t.Cartesian2(),
    J = new t.Cartesian2(),
    Q = new t.Cartesian2()
  N.computeSubdivision = function (e, i, u, x, p) {
    p = a.defaultValue(p, s.CesiumMath.RADIANS_PER_DEGREE)
    const l = a.defined(x),
      h = u.slice(0)
    let y
    const c = i.length,
      f = new Array(3 * c),
      v = new Array(2 * c)
    let d = 0,
      m = 0
    for (y = 0; y < c; y++) {
      const e = i[y]
      if (((f[d++] = e.x), (f[d++] = e.y), (f[d++] = e.z), l)) {
        const e = x[y]
        ;(v[m++] = e.x), (v[m++] = e.y)
      }
    }
    const C = [],
      g = {},
      w = e.maximumRadius,
      A = s.CesiumMath.chordLength(p, w),
      b = A * A
    for (; h.length > 0; ) {
      const e = h.pop(),
        r = h.pop(),
        i = h.pop(),
        o = n.Cartesian3.fromArray(f, 3 * i, U),
        s = n.Cartesian3.fromArray(f, 3 * r, _),
        u = n.Cartesian3.fromArray(f, 3 * e, K)
      let x, p, c
      l &&
        ((x = t.Cartesian2.fromArray(v, 2 * i, j)),
        (p = t.Cartesian2.fromArray(v, 2 * r, H)),
        (c = t.Cartesian2.fromArray(v, 2 * e, J)))
      const d = n.Cartesian3.multiplyByScalar(
          n.Cartesian3.normalize(o, V),
          w,
          V
        ),
        m = n.Cartesian3.multiplyByScalar(n.Cartesian3.normalize(s, F), w, F),
        A = n.Cartesian3.multiplyByScalar(n.Cartesian3.normalize(u, k), w, k),
        M = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(d, m, q)),
        S = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(m, A, q)),
        E = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(A, d, q)),
        Z = Math.max(M, S, E)
      let z, L, D
      Z > b
        ? M === Z
          ? ((z = `${Math.min(i, r)} ${Math.max(i, r)}`),
            (y = g[z]),
            a.defined(y) ||
              ((L = n.Cartesian3.add(o, s, q)),
              n.Cartesian3.multiplyByScalar(L, 0.5, L),
              f.push(L.x, L.y, L.z),
              (y = f.length / 3 - 1),
              (g[z] = y),
              l &&
                ((D = t.Cartesian2.add(x, p, Q)),
                t.Cartesian2.multiplyByScalar(D, 0.5, D),
                v.push(D.x, D.y))),
            h.push(i, y, e),
            h.push(y, r, e))
          : S === Z
          ? ((z = `${Math.min(r, e)} ${Math.max(r, e)}`),
            (y = g[z]),
            a.defined(y) ||
              ((L = n.Cartesian3.add(s, u, q)),
              n.Cartesian3.multiplyByScalar(L, 0.5, L),
              f.push(L.x, L.y, L.z),
              (y = f.length / 3 - 1),
              (g[z] = y),
              l &&
                ((D = t.Cartesian2.add(p, c, Q)),
                t.Cartesian2.multiplyByScalar(D, 0.5, D),
                v.push(D.x, D.y))),
            h.push(r, y, i),
            h.push(y, e, i))
          : E === Z &&
            ((z = `${Math.min(e, i)} ${Math.max(e, i)}`),
            (y = g[z]),
            a.defined(y) ||
              ((L = n.Cartesian3.add(u, o, q)),
              n.Cartesian3.multiplyByScalar(L, 0.5, L),
              f.push(L.x, L.y, L.z),
              (y = f.length / 3 - 1),
              (g[z] = y),
              l &&
                ((D = t.Cartesian2.add(c, x, Q)),
                t.Cartesian2.multiplyByScalar(D, 0.5, D),
                v.push(D.x, D.y))),
            h.push(e, y, r),
            h.push(y, i, r))
        : (C.push(i), C.push(r), C.push(e))
    }
    const M = {
      attributes: {
        position: new o.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: f
        })
      },
      indices: C,
      primitiveType: o.PrimitiveType.TRIANGLES
    }
    return (
      l &&
        (M.attributes.st = new o.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: v
        })),
      new o.Geometry(M)
    )
  }
  const X = new n.Cartographic(),
    Y = new n.Cartographic(),
    ee = new n.Cartographic(),
    te = new n.Cartographic()
  ;(N.computeRhumbLineSubdivision = function (e, u, x, p, l) {
    l = a.defaultValue(l, s.CesiumMath.RADIANS_PER_DEGREE)
    const h = a.defined(p),
      y = x.slice(0)
    let c
    const f = u.length,
      v = new Array(3 * f),
      d = new Array(2 * f)
    let m = 0,
      C = 0
    for (c = 0; c < f; c++) {
      const e = u[c]
      if (((v[m++] = e.x), (v[m++] = e.y), (v[m++] = e.z), h)) {
        const e = p[c]
        ;(d[C++] = e.x), (d[C++] = e.y)
      }
    }
    const g = [],
      w = {},
      A = e.maximumRadius,
      b = s.CesiumMath.chordLength(l, A),
      M = new i.EllipsoidRhumbLine(void 0, void 0, e),
      S = new i.EllipsoidRhumbLine(void 0, void 0, e),
      E = new i.EllipsoidRhumbLine(void 0, void 0, e)
    for (; y.length > 0; ) {
      const r = y.pop(),
        i = y.pop(),
        o = y.pop(),
        s = n.Cartesian3.fromArray(v, 3 * o, U),
        u = n.Cartesian3.fromArray(v, 3 * i, _),
        x = n.Cartesian3.fromArray(v, 3 * r, K)
      let p, l, f
      h &&
        ((p = t.Cartesian2.fromArray(d, 2 * o, j)),
        (l = t.Cartesian2.fromArray(d, 2 * i, H)),
        (f = t.Cartesian2.fromArray(d, 2 * r, J)))
      const m = e.cartesianToCartographic(s, X),
        C = e.cartesianToCartographic(u, Y),
        A = e.cartesianToCartographic(x, ee)
      M.setEndPoints(m, C)
      const Z = M.surfaceDistance
      S.setEndPoints(C, A)
      const z = S.surfaceDistance
      E.setEndPoints(A, m)
      const L = E.surfaceDistance,
        D = Math.max(Z, z, L)
      let R, G, O, T, B
      D > b
        ? Z === D
          ? ((R = `${Math.min(o, i)} ${Math.max(o, i)}`),
            (c = w[R]),
            a.defined(c) ||
              ((G = M.interpolateUsingFraction(0.5, te)),
              (O = 0.5 * (m.height + C.height)),
              (T = n.Cartesian3.fromRadians(G.longitude, G.latitude, O, e, q)),
              v.push(T.x, T.y, T.z),
              (c = v.length / 3 - 1),
              (w[R] = c),
              h &&
                ((B = t.Cartesian2.add(p, l, Q)),
                t.Cartesian2.multiplyByScalar(B, 0.5, B),
                d.push(B.x, B.y))),
            y.push(o, c, r),
            y.push(c, i, r))
          : z === D
          ? ((R = `${Math.min(i, r)} ${Math.max(i, r)}`),
            (c = w[R]),
            a.defined(c) ||
              ((G = S.interpolateUsingFraction(0.5, te)),
              (O = 0.5 * (C.height + A.height)),
              (T = n.Cartesian3.fromRadians(G.longitude, G.latitude, O, e, q)),
              v.push(T.x, T.y, T.z),
              (c = v.length / 3 - 1),
              (w[R] = c),
              h &&
                ((B = t.Cartesian2.add(l, f, Q)),
                t.Cartesian2.multiplyByScalar(B, 0.5, B),
                d.push(B.x, B.y))),
            y.push(i, c, o),
            y.push(c, r, o))
          : L === D &&
            ((R = `${Math.min(r, o)} ${Math.max(r, o)}`),
            (c = w[R]),
            a.defined(c) ||
              ((G = E.interpolateUsingFraction(0.5, te)),
              (O = 0.5 * (A.height + m.height)),
              (T = n.Cartesian3.fromRadians(G.longitude, G.latitude, O, e, q)),
              v.push(T.x, T.y, T.z),
              (c = v.length / 3 - 1),
              (w[R] = c),
              h &&
                ((B = t.Cartesian2.add(f, p, Q)),
                t.Cartesian2.multiplyByScalar(B, 0.5, B),
                d.push(B.x, B.y))),
            y.push(r, c, i),
            y.push(c, o, i))
        : (g.push(o), g.push(i), g.push(r))
    }
    const Z = {
      attributes: {
        position: new o.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: v
        })
      },
      indices: g,
      primitiveType: o.PrimitiveType.TRIANGLES
    }
    return (
      h &&
        (Z.attributes.st = new o.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: d
        })),
      new o.Geometry(Z)
    )
  }),
    (N.scaleToGeodeticHeight = function (e, t, r, i) {
      r = a.defaultValue(r, n.Ellipsoid.WGS84)
      let o = $,
        s = I
      if (
        ((t = a.defaultValue(t, 0)), (i = a.defaultValue(i, !0)), a.defined(e))
      ) {
        const a = e.length
        for (let u = 0; u < a; u += 3)
          n.Cartesian3.fromArray(e, u, s),
            i && (s = r.scaleToGeodeticSurface(s, s)),
            0 !== t &&
              ((o = r.geodeticSurfaceNormal(s, o)),
              n.Cartesian3.multiplyByScalar(o, t, o),
              n.Cartesian3.add(s, o, s)),
            (e[u] = s.x),
            (e[u + 1] = s.y),
            (e[u + 2] = s.z)
      }
      return e
    })
  var ne = N
  ;(e.PolygonPipeline = ne), (e.WindingOrder = P)
})
