define([
  'exports',
  './defaultValue-f6d5e6da',
  './Transforms-20461479',
  './Math-2ce22ee9'
], function (e, r, t, o) {
  'use strict'
  function f(e, r, t) {
    return (
      t < 0 && (t += 1),
      t > 1 && (t -= 1),
      6 * t < 1
        ? e + 6 * (r - e) * t
        : 2 * t < 1
        ? r
        : 3 * t < 2
        ? e + (r - e) * (2 / 3 - t) * 6
        : e
    )
  }
  function s(e, t, o, f) {
    ;(this.red = r.defaultValue(e, 1)),
      (this.green = r.defaultValue(t, 1)),
      (this.blue = r.defaultValue(o, 1)),
      (this.alpha = r.defaultValue(f, 1))
  }
  let n, l, C
  ;(s.fromCartesian4 = function (e, t) {
    return r.defined(t)
      ? ((t.red = e.x), (t.green = e.y), (t.blue = e.z), (t.alpha = e.w), t)
      : new s(e.x, e.y, e.z, e.w)
  }),
    (s.fromBytes = function (e, t, o, f, n) {
      return (
        (e = s.byteToFloat(r.defaultValue(e, 255))),
        (t = s.byteToFloat(r.defaultValue(t, 255))),
        (o = s.byteToFloat(r.defaultValue(o, 255))),
        (f = s.byteToFloat(r.defaultValue(f, 255))),
        r.defined(n)
          ? ((n.red = e), (n.green = t), (n.blue = o), (n.alpha = f), n)
          : new s(e, t, o, f)
      )
    }),
    (s.fromAlpha = function (e, t, o) {
      return r.defined(o)
        ? ((o.red = e.red),
          (o.green = e.green),
          (o.blue = e.blue),
          (o.alpha = t),
          o)
        : new s(e.red, e.green, e.blue, t)
    }),
    t.FeatureDetection.supportsTypedArrays() &&
      ((n = new ArrayBuffer(4)),
      (l = new Uint32Array(n)),
      (C = new Uint8Array(n))),
    (s.fromRgba = function (e, r) {
      return (l[0] = e), s.fromBytes(C[0], C[1], C[2], C[3], r)
    }),
    (s.fromHsl = function (e, t, o, n, l) {
      ;(e = r.defaultValue(e, 0) % 1),
        (t = r.defaultValue(t, 0)),
        (o = r.defaultValue(o, 0)),
        (n = r.defaultValue(n, 1))
      let C = o,
        i = o,
        a = o
      if (0 !== t) {
        let r
        r = o < 0.5 ? o * (1 + t) : o + t - o * t
        const s = 2 * o - r
        ;(C = f(s, r, e + 1 / 3)), (i = f(s, r, e)), (a = f(s, r, e - 1 / 3))
      }
      return r.defined(l)
        ? ((l.red = C), (l.green = i), (l.blue = a), (l.alpha = n), l)
        : new s(C, i, a, n)
    }),
    (s.fromRandom = function (e, t) {
      let f = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).red
      if (!r.defined(f)) {
        const t = r.defaultValue(e.minimumRed, 0),
          s = r.defaultValue(e.maximumRed, 1)
        f = t + o.CesiumMath.nextRandomNumber() * (s - t)
      }
      let n = e.green
      if (!r.defined(n)) {
        const t = r.defaultValue(e.minimumGreen, 0),
          f = r.defaultValue(e.maximumGreen, 1)
        n = t + o.CesiumMath.nextRandomNumber() * (f - t)
      }
      let l = e.blue
      if (!r.defined(l)) {
        const t = r.defaultValue(e.minimumBlue, 0),
          f = r.defaultValue(e.maximumBlue, 1)
        l = t + o.CesiumMath.nextRandomNumber() * (f - t)
      }
      let C = e.alpha
      if (!r.defined(C)) {
        const t = r.defaultValue(e.minimumAlpha, 0),
          f = r.defaultValue(e.maximumAlpha, 1)
        C = t + o.CesiumMath.nextRandomNumber() * (f - t)
      }
      return r.defined(t)
        ? ((t.red = f), (t.green = n), (t.blue = l), (t.alpha = C), t)
        : new s(f, n, l, C)
    })
  const i = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,
    a = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
    E =
      /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
    u =
      /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i
  ;(s.fromCssColorString = function (e, t) {
    r.defined(t) || (t = new s())
    const o = s[(e = e.replace(/\s/g, '')).toUpperCase()]
    if (r.defined(o)) return s.clone(o, t), t
    let f = i.exec(e)
    return null !== f
      ? ((t.red = parseInt(f[1], 16) / 15),
        (t.green = parseInt(f[2], 16) / 15),
        (t.blue = parseInt(f[3], 16) / 15),
        (t.alpha = parseInt(r.defaultValue(f[4], 'f'), 16) / 15),
        t)
      : ((f = a.exec(e)),
        null !== f
          ? ((t.red = parseInt(f[1], 16) / 255),
            (t.green = parseInt(f[2], 16) / 255),
            (t.blue = parseInt(f[3], 16) / 255),
            (t.alpha = parseInt(r.defaultValue(f[4], 'ff'), 16) / 255),
            t)
          : ((f = E.exec(e)),
            null !== f
              ? ((t.red =
                  parseFloat(f[1]) / ('%' === f[1].substr(-1) ? 100 : 255)),
                (t.green =
                  parseFloat(f[2]) / ('%' === f[2].substr(-1) ? 100 : 255)),
                (t.blue =
                  parseFloat(f[3]) / ('%' === f[3].substr(-1) ? 100 : 255)),
                (t.alpha = parseFloat(r.defaultValue(f[4], '1.0'))),
                t)
              : ((f = u.exec(e)),
                null !== f
                  ? s.fromHsl(
                      parseFloat(f[1]) / 360,
                      parseFloat(f[2]) / 100,
                      parseFloat(f[3]) / 100,
                      parseFloat(r.defaultValue(f[4], '1.0')),
                      t
                    )
                  : (t = void 0))))
  }),
    (s.packedLength = 4),
    (s.pack = function (e, t, o) {
      return (
        (o = r.defaultValue(o, 0)),
        (t[o++] = e.red),
        (t[o++] = e.green),
        (t[o++] = e.blue),
        (t[o] = e.alpha),
        t
      )
    }),
    (s.unpack = function (e, t, o) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(o) || (o = new s()),
        (o.red = e[t++]),
        (o.green = e[t++]),
        (o.blue = e[t++]),
        (o.alpha = e[t]),
        o
      )
    }),
    (s.byteToFloat = function (e) {
      return e / 255
    }),
    (s.floatToByte = function (e) {
      return 1 === e ? 255 : (256 * e) | 0
    }),
    (s.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.red = e.red),
            (t.green = e.green),
            (t.blue = e.blue),
            (t.alpha = e.alpha),
            t)
          : new s(e.red, e.green, e.blue, e.alpha)
    }),
    (s.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.red === t.red &&
          e.green === t.green &&
          e.blue === t.blue &&
          e.alpha === t.alpha)
      )
    }),
    (s.equalsArray = function (e, r, t) {
      return (
        e.red === r[t] &&
        e.green === r[t + 1] &&
        e.blue === r[t + 2] &&
        e.alpha === r[t + 3]
      )
    }),
    (s.prototype.clone = function (e) {
      return s.clone(this, e)
    }),
    (s.prototype.equals = function (e) {
      return s.equals(this, e)
    }),
    (s.prototype.equalsEpsilon = function (e, t) {
      return (
        this === e ||
        (r.defined(e) &&
          Math.abs(this.red - e.red) <= t &&
          Math.abs(this.green - e.green) <= t &&
          Math.abs(this.blue - e.blue) <= t &&
          Math.abs(this.alpha - e.alpha) <= t)
      )
    }),
    (s.prototype.toString = function () {
      return `(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }),
    (s.prototype.toCssColorString = function () {
      const e = s.floatToByte(this.red),
        r = s.floatToByte(this.green),
        t = s.floatToByte(this.blue)
      return 1 === this.alpha
        ? `rgb(${e},${r},${t})`
        : `rgba(${e},${r},${t},${this.alpha})`
    }),
    (s.prototype.toCssHexString = function () {
      let e = s.floatToByte(this.red).toString(16)
      e.length < 2 && (e = `0${e}`)
      let r = s.floatToByte(this.green).toString(16)
      r.length < 2 && (r = `0${r}`)
      let t = s.floatToByte(this.blue).toString(16)
      if ((t.length < 2 && (t = `0${t}`), this.alpha < 1)) {
        let o = s.floatToByte(this.alpha).toString(16)
        return o.length < 2 && (o = `0${o}`), `#${e}${r}${t}${o}`
      }
      return `#${e}${r}${t}`
    }),
    (s.prototype.toBytes = function (e) {
      const t = s.floatToByte(this.red),
        o = s.floatToByte(this.green),
        f = s.floatToByte(this.blue),
        n = s.floatToByte(this.alpha)
      return r.defined(e)
        ? ((e[0] = t), (e[1] = o), (e[2] = f), (e[3] = n), e)
        : [t, o, f, n]
    }),
    (s.prototype.toRgba = function () {
      return (
        (C[0] = s.floatToByte(this.red)),
        (C[1] = s.floatToByte(this.green)),
        (C[2] = s.floatToByte(this.blue)),
        (C[3] = s.floatToByte(this.alpha)),
        l[0]
      )
    }),
    (s.prototype.brighten = function (e, r) {
      return (
        (e = 1 - e),
        (r.red = 1 - (1 - this.red) * e),
        (r.green = 1 - (1 - this.green) * e),
        (r.blue = 1 - (1 - this.blue) * e),
        (r.alpha = this.alpha),
        r
      )
    }),
    (s.prototype.darken = function (e, r) {
      return (
        (e = 1 - e),
        (r.red = this.red * e),
        (r.green = this.green * e),
        (r.blue = this.blue * e),
        (r.alpha = this.alpha),
        r
      )
    }),
    (s.prototype.withAlpha = function (e, r) {
      return s.fromAlpha(this, e, r)
    }),
    (s.add = function (e, r, t) {
      return (
        (t.red = e.red + r.red),
        (t.green = e.green + r.green),
        (t.blue = e.blue + r.blue),
        (t.alpha = e.alpha + r.alpha),
        t
      )
    }),
    (s.subtract = function (e, r, t) {
      return (
        (t.red = e.red - r.red),
        (t.green = e.green - r.green),
        (t.blue = e.blue - r.blue),
        (t.alpha = e.alpha - r.alpha),
        t
      )
    }),
    (s.multiply = function (e, r, t) {
      return (
        (t.red = e.red * r.red),
        (t.green = e.green * r.green),
        (t.blue = e.blue * r.blue),
        (t.alpha = e.alpha * r.alpha),
        t
      )
    }),
    (s.divide = function (e, r, t) {
      return (
        (t.red = e.red / r.red),
        (t.green = e.green / r.green),
        (t.blue = e.blue / r.blue),
        (t.alpha = e.alpha / r.alpha),
        t
      )
    }),
    (s.mod = function (e, r, t) {
      return (
        (t.red = e.red % r.red),
        (t.green = e.green % r.green),
        (t.blue = e.blue % r.blue),
        (t.alpha = e.alpha % r.alpha),
        t
      )
    }),
    (s.lerp = function (e, r, t, f) {
      return (
        (f.red = o.CesiumMath.lerp(e.red, r.red, t)),
        (f.green = o.CesiumMath.lerp(e.green, r.green, t)),
        (f.blue = o.CesiumMath.lerp(e.blue, r.blue, t)),
        (f.alpha = o.CesiumMath.lerp(e.alpha, r.alpha, t)),
        f
      )
    }),
    (s.multiplyByScalar = function (e, r, t) {
      return (
        (t.red = e.red * r),
        (t.green = e.green * r),
        (t.blue = e.blue * r),
        (t.alpha = e.alpha * r),
        t
      )
    }),
    (s.divideByScalar = function (e, r, t) {
      return (
        (t.red = e.red / r),
        (t.green = e.green / r),
        (t.blue = e.blue / r),
        (t.alpha = e.alpha / r),
        t
      )
    }),
    (s.ALICEBLUE = Object.freeze(s.fromCssColorString('#F0F8FF'))),
    (s.ANTIQUEWHITE = Object.freeze(s.fromCssColorString('#FAEBD7'))),
    (s.AQUA = Object.freeze(s.fromCssColorString('#00FFFF'))),
    (s.AQUAMARINE = Object.freeze(s.fromCssColorString('#7FFFD4'))),
    (s.AZURE = Object.freeze(s.fromCssColorString('#F0FFFF'))),
    (s.BEIGE = Object.freeze(s.fromCssColorString('#F5F5DC'))),
    (s.BISQUE = Object.freeze(s.fromCssColorString('#FFE4C4'))),
    (s.BLACK = Object.freeze(s.fromCssColorString('#000000'))),
    (s.BLANCHEDALMOND = Object.freeze(s.fromCssColorString('#FFEBCD'))),
    (s.BLUE = Object.freeze(s.fromCssColorString('#0000FF'))),
    (s.BLUEVIOLET = Object.freeze(s.fromCssColorString('#8A2BE2'))),
    (s.BROWN = Object.freeze(s.fromCssColorString('#A52A2A'))),
    (s.BURLYWOOD = Object.freeze(s.fromCssColorString('#DEB887'))),
    (s.CADETBLUE = Object.freeze(s.fromCssColorString('#5F9EA0'))),
    (s.CHARTREUSE = Object.freeze(s.fromCssColorString('#7FFF00'))),
    (s.CHOCOLATE = Object.freeze(s.fromCssColorString('#D2691E'))),
    (s.CORAL = Object.freeze(s.fromCssColorString('#FF7F50'))),
    (s.CORNFLOWERBLUE = Object.freeze(s.fromCssColorString('#6495ED'))),
    (s.CORNSILK = Object.freeze(s.fromCssColorString('#FFF8DC'))),
    (s.CRIMSON = Object.freeze(s.fromCssColorString('#DC143C'))),
    (s.CYAN = Object.freeze(s.fromCssColorString('#00FFFF'))),
    (s.DARKBLUE = Object.freeze(s.fromCssColorString('#00008B'))),
    (s.DARKCYAN = Object.freeze(s.fromCssColorString('#008B8B'))),
    (s.DARKGOLDENROD = Object.freeze(s.fromCssColorString('#B8860B'))),
    (s.DARKGRAY = Object.freeze(s.fromCssColorString('#A9A9A9'))),
    (s.DARKGREEN = Object.freeze(s.fromCssColorString('#006400'))),
    (s.DARKGREY = s.DARKGRAY),
    (s.DARKKHAKI = Object.freeze(s.fromCssColorString('#BDB76B'))),
    (s.DARKMAGENTA = Object.freeze(s.fromCssColorString('#8B008B'))),
    (s.DARKOLIVEGREEN = Object.freeze(s.fromCssColorString('#556B2F'))),
    (s.DARKORANGE = Object.freeze(s.fromCssColorString('#FF8C00'))),
    (s.DARKORCHID = Object.freeze(s.fromCssColorString('#9932CC'))),
    (s.DARKRED = Object.freeze(s.fromCssColorString('#8B0000'))),
    (s.DARKSALMON = Object.freeze(s.fromCssColorString('#E9967A'))),
    (s.DARKSEAGREEN = Object.freeze(s.fromCssColorString('#8FBC8F'))),
    (s.DARKSLATEBLUE = Object.freeze(s.fromCssColorString('#483D8B'))),
    (s.DARKSLATEGRAY = Object.freeze(s.fromCssColorString('#2F4F4F'))),
    (s.DARKSLATEGREY = s.DARKSLATEGRAY),
    (s.DARKTURQUOISE = Object.freeze(s.fromCssColorString('#00CED1'))),
    (s.DARKVIOLET = Object.freeze(s.fromCssColorString('#9400D3'))),
    (s.DEEPPINK = Object.freeze(s.fromCssColorString('#FF1493'))),
    (s.DEEPSKYBLUE = Object.freeze(s.fromCssColorString('#00BFFF'))),
    (s.DIMGRAY = Object.freeze(s.fromCssColorString('#696969'))),
    (s.DIMGREY = s.DIMGRAY),
    (s.DODGERBLUE = Object.freeze(s.fromCssColorString('#1E90FF'))),
    (s.FIREBRICK = Object.freeze(s.fromCssColorString('#B22222'))),
    (s.FLORALWHITE = Object.freeze(s.fromCssColorString('#FFFAF0'))),
    (s.FORESTGREEN = Object.freeze(s.fromCssColorString('#228B22'))),
    (s.FUCHSIA = Object.freeze(s.fromCssColorString('#FF00FF'))),
    (s.GAINSBORO = Object.freeze(s.fromCssColorString('#DCDCDC'))),
    (s.GHOSTWHITE = Object.freeze(s.fromCssColorString('#F8F8FF'))),
    (s.GOLD = Object.freeze(s.fromCssColorString('#FFD700'))),
    (s.GOLDENROD = Object.freeze(s.fromCssColorString('#DAA520'))),
    (s.GRAY = Object.freeze(s.fromCssColorString('#808080'))),
    (s.GREEN = Object.freeze(s.fromCssColorString('#008000'))),
    (s.GREENYELLOW = Object.freeze(s.fromCssColorString('#ADFF2F'))),
    (s.GREY = s.GRAY),
    (s.HONEYDEW = Object.freeze(s.fromCssColorString('#F0FFF0'))),
    (s.HOTPINK = Object.freeze(s.fromCssColorString('#FF69B4'))),
    (s.INDIANRED = Object.freeze(s.fromCssColorString('#CD5C5C'))),
    (s.INDIGO = Object.freeze(s.fromCssColorString('#4B0082'))),
    (s.IVORY = Object.freeze(s.fromCssColorString('#FFFFF0'))),
    (s.KHAKI = Object.freeze(s.fromCssColorString('#F0E68C'))),
    (s.LAVENDER = Object.freeze(s.fromCssColorString('#E6E6FA'))),
    (s.LAVENDAR_BLUSH = Object.freeze(s.fromCssColorString('#FFF0F5'))),
    (s.LAWNGREEN = Object.freeze(s.fromCssColorString('#7CFC00'))),
    (s.LEMONCHIFFON = Object.freeze(s.fromCssColorString('#FFFACD'))),
    (s.LIGHTBLUE = Object.freeze(s.fromCssColorString('#ADD8E6'))),
    (s.LIGHTCORAL = Object.freeze(s.fromCssColorString('#F08080'))),
    (s.LIGHTCYAN = Object.freeze(s.fromCssColorString('#E0FFFF'))),
    (s.LIGHTGOLDENRODYELLOW = Object.freeze(s.fromCssColorString('#FAFAD2'))),
    (s.LIGHTGRAY = Object.freeze(s.fromCssColorString('#D3D3D3'))),
    (s.LIGHTGREEN = Object.freeze(s.fromCssColorString('#90EE90'))),
    (s.LIGHTGREY = s.LIGHTGRAY),
    (s.LIGHTPINK = Object.freeze(s.fromCssColorString('#FFB6C1'))),
    (s.LIGHTSEAGREEN = Object.freeze(s.fromCssColorString('#20B2AA'))),
    (s.LIGHTSKYBLUE = Object.freeze(s.fromCssColorString('#87CEFA'))),
    (s.LIGHTSLATEGRAY = Object.freeze(s.fromCssColorString('#778899'))),
    (s.LIGHTSLATEGREY = s.LIGHTSLATEGRAY),
    (s.LIGHTSTEELBLUE = Object.freeze(s.fromCssColorString('#B0C4DE'))),
    (s.LIGHTYELLOW = Object.freeze(s.fromCssColorString('#FFFFE0'))),
    (s.LIME = Object.freeze(s.fromCssColorString('#00FF00'))),
    (s.LIMEGREEN = Object.freeze(s.fromCssColorString('#32CD32'))),
    (s.LINEN = Object.freeze(s.fromCssColorString('#FAF0E6'))),
    (s.MAGENTA = Object.freeze(s.fromCssColorString('#FF00FF'))),
    (s.MAROON = Object.freeze(s.fromCssColorString('#800000'))),
    (s.MEDIUMAQUAMARINE = Object.freeze(s.fromCssColorString('#66CDAA'))),
    (s.MEDIUMBLUE = Object.freeze(s.fromCssColorString('#0000CD'))),
    (s.MEDIUMORCHID = Object.freeze(s.fromCssColorString('#BA55D3'))),
    (s.MEDIUMPURPLE = Object.freeze(s.fromCssColorString('#9370DB'))),
    (s.MEDIUMSEAGREEN = Object.freeze(s.fromCssColorString('#3CB371'))),
    (s.MEDIUMSLATEBLUE = Object.freeze(s.fromCssColorString('#7B68EE'))),
    (s.MEDIUMSPRINGGREEN = Object.freeze(s.fromCssColorString('#00FA9A'))),
    (s.MEDIUMTURQUOISE = Object.freeze(s.fromCssColorString('#48D1CC'))),
    (s.MEDIUMVIOLETRED = Object.freeze(s.fromCssColorString('#C71585'))),
    (s.MIDNIGHTBLUE = Object.freeze(s.fromCssColorString('#191970'))),
    (s.MINTCREAM = Object.freeze(s.fromCssColorString('#F5FFFA'))),
    (s.MISTYROSE = Object.freeze(s.fromCssColorString('#FFE4E1'))),
    (s.MOCCASIN = Object.freeze(s.fromCssColorString('#FFE4B5'))),
    (s.NAVAJOWHITE = Object.freeze(s.fromCssColorString('#FFDEAD'))),
    (s.NAVY = Object.freeze(s.fromCssColorString('#000080'))),
    (s.OLDLACE = Object.freeze(s.fromCssColorString('#FDF5E6'))),
    (s.OLIVE = Object.freeze(s.fromCssColorString('#808000'))),
    (s.OLIVEDRAB = Object.freeze(s.fromCssColorString('#6B8E23'))),
    (s.ORANGE = Object.freeze(s.fromCssColorString('#FFA500'))),
    (s.ORANGERED = Object.freeze(s.fromCssColorString('#FF4500'))),
    (s.ORCHID = Object.freeze(s.fromCssColorString('#DA70D6'))),
    (s.PALEGOLDENROD = Object.freeze(s.fromCssColorString('#EEE8AA'))),
    (s.PALEGREEN = Object.freeze(s.fromCssColorString('#98FB98'))),
    (s.PALETURQUOISE = Object.freeze(s.fromCssColorString('#AFEEEE'))),
    (s.PALEVIOLETRED = Object.freeze(s.fromCssColorString('#DB7093'))),
    (s.PAPAYAWHIP = Object.freeze(s.fromCssColorString('#FFEFD5'))),
    (s.PEACHPUFF = Object.freeze(s.fromCssColorString('#FFDAB9'))),
    (s.PERU = Object.freeze(s.fromCssColorString('#CD853F'))),
    (s.PINK = Object.freeze(s.fromCssColorString('#FFC0CB'))),
    (s.PLUM = Object.freeze(s.fromCssColorString('#DDA0DD'))),
    (s.POWDERBLUE = Object.freeze(s.fromCssColorString('#B0E0E6'))),
    (s.PURPLE = Object.freeze(s.fromCssColorString('#800080'))),
    (s.RED = Object.freeze(s.fromCssColorString('#FF0000'))),
    (s.ROSYBROWN = Object.freeze(s.fromCssColorString('#BC8F8F'))),
    (s.ROYALBLUE = Object.freeze(s.fromCssColorString('#4169E1'))),
    (s.SADDLEBROWN = Object.freeze(s.fromCssColorString('#8B4513'))),
    (s.SALMON = Object.freeze(s.fromCssColorString('#FA8072'))),
    (s.SANDYBROWN = Object.freeze(s.fromCssColorString('#F4A460'))),
    (s.SEAGREEN = Object.freeze(s.fromCssColorString('#2E8B57'))),
    (s.SEASHELL = Object.freeze(s.fromCssColorString('#FFF5EE'))),
    (s.SIENNA = Object.freeze(s.fromCssColorString('#A0522D'))),
    (s.SILVER = Object.freeze(s.fromCssColorString('#C0C0C0'))),
    (s.SKYBLUE = Object.freeze(s.fromCssColorString('#87CEEB'))),
    (s.SLATEBLUE = Object.freeze(s.fromCssColorString('#6A5ACD'))),
    (s.SLATEGRAY = Object.freeze(s.fromCssColorString('#708090'))),
    (s.SLATEGREY = s.SLATEGRAY),
    (s.SNOW = Object.freeze(s.fromCssColorString('#FFFAFA'))),
    (s.SPRINGGREEN = Object.freeze(s.fromCssColorString('#00FF7F'))),
    (s.STEELBLUE = Object.freeze(s.fromCssColorString('#4682B4'))),
    (s.TAN = Object.freeze(s.fromCssColorString('#D2B48C'))),
    (s.TEAL = Object.freeze(s.fromCssColorString('#008080'))),
    (s.THISTLE = Object.freeze(s.fromCssColorString('#D8BFD8'))),
    (s.TOMATO = Object.freeze(s.fromCssColorString('#FF6347'))),
    (s.TURQUOISE = Object.freeze(s.fromCssColorString('#40E0D0'))),
    (s.VIOLET = Object.freeze(s.fromCssColorString('#EE82EE'))),
    (s.WHEAT = Object.freeze(s.fromCssColorString('#F5DEB3'))),
    (s.WHITE = Object.freeze(s.fromCssColorString('#FFFFFF'))),
    (s.WHITESMOKE = Object.freeze(s.fromCssColorString('#F5F5F5'))),
    (s.YELLOW = Object.freeze(s.fromCssColorString('#FFFF00'))),
    (s.YELLOWGREEN = Object.freeze(s.fromCssColorString('#9ACD32'))),
    (s.TRANSPARENT = Object.freeze(new s(0, 0, 0, 0))),
    (e.Color = s)
})
