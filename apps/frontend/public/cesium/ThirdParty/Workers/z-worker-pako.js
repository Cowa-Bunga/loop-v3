;(function () {
  'use strict'
  const {
      Array: G,
      Object: y,
      Math: k,
      Error: m,
      Uint8Array: p,
      Uint16Array: ve,
      Uint32Array: M,
      Int32Array: ze,
      DataView: j,
      TextEncoder: x,
      crypto: b,
      postMessage: A
    } = globalThis,
    F = []
  for (let n = 0; 256 > n; n++) {
    let e = n
    for (let t = 0; 8 > t; t++)
      1 & e ? (e = (e >>> 1) ^ 3988292384) : (e >>>= 1)
    F[n] = e
  }
  class R {
    constructor(e) {
      this.crc = e || -1
    }
    append(e) {
      let t = 0 | this.crc
      for (let s = 0, a = 0 | e.length; a > s; s++)
        t = (t >>> 8) ^ F[255 & (t ^ e[s])]
      this.crc = t
    }
    get() {
      return ~this.crc
    }
  }
  const u = {
      concat(n, e) {
        if (n.length === 0 || e.length === 0) return n.concat(e)
        const t = n[n.length - 1],
          s = u.getPartial(t)
        return s === 32
          ? n.concat(e)
          : u._shiftRight(e, s, 0 | t, n.slice(0, n.length - 1))
      },
      bitLength(n) {
        const e = n.length
        if (e === 0) return 0
        const t = n[e - 1]
        return 32 * (e - 1) + u.getPartial(t)
      },
      clamp(n, e) {
        if (32 * n.length < e) return n
        const t = (n = n.slice(0, k.ceil(e / 32))).length
        return (
          (e &= 31),
          t > 0 &&
            e &&
            (n[t - 1] = u.partial(e, n[t - 1] & (2147483648 >> (e - 1)), 1)),
          n
        )
      },
      partial: (n, e, t) =>
        n === 32 ? e : (t ? 0 | e : e << (32 - n)) + 1099511627776 * n,
      getPartial: (n) => k.round(n / 1099511627776) || 32,
      _shiftRight(n, e, t, s) {
        for (s === void 0 && (s = []); e >= 32; e -= 32) s.push(t), (t = 0)
        if (e === 0) return s.concat(n)
        for (let i = 0; i < n.length; i++)
          s.push(t | (n[i] >>> e)), (t = n[i] << (32 - e))
        const a = n.length ? n[n.length - 1] : 0,
          r = u.getPartial(a)
        return s.push(u.partial((e + r) & 31, e + r > 32 ? t : s.pop(), 1)), s
      }
    },
    W = {
      bytes: {
        fromBits(n) {
          const e = u.bitLength(n) / 8,
            t = new p(e)
          let s
          for (let a = 0; e > a; a++)
            !(3 & a) && (s = n[a / 4]), (t[a] = s >>> 24), (s <<= 8)
          return t
        },
        toBits(n) {
          const e = []
          let t,
            s = 0
          for (t = 0; t < n.length; t++)
            (s = (s << 8) | n[t]), (3 & t) == 3 && (e.push(s), (s = 0))
          return 3 & t && e.push(u.partial(8 * (3 & t), s)), e
        }
      }
    },
    O = {
      sha1: function (n) {
        n
          ? ((this._h = n._h.slice(0)),
            (this._buffer = n._buffer.slice(0)),
            (this._length = n._length))
          : this.reset()
      }
    }
  O.sha1.prototype = {
    blockSize: 512,
    reset: function () {
      const n = this
      return (n._h = this._init.slice(0)), (n._buffer = []), (n._length = 0), n
    },
    update: function (n) {
      const e = this
      typeof n == 'string' && (n = W.utf8String.toBits(n))
      const t = (e._buffer = u.concat(e._buffer, n)),
        s = e._length,
        a = (e._length = s + u.bitLength(n))
      if (a > 9007199254740991)
        throw new m('Cannot hash more than 2^53 - 1 bits')
      const r = new M(t)
      let i = 0
      for (
        let c = e.blockSize + s - ((e.blockSize + s) & (e.blockSize - 1));
        a >= c;
        c += e.blockSize
      )
        e._block(r.subarray(16 * i, 16 * (i + 1))), (i += 1)
      return t.splice(0, 16 * i), e
    },
    finalize: function () {
      const n = this
      let e = n._buffer
      const t = n._h
      e = u.concat(e, [u.partial(1, 1)])
      for (let s = e.length + 2; 15 & s; s++) e.push(0)
      for (
        e.push(k.floor(n._length / 4294967296)), e.push(0 | n._length);
        e.length;

      )
        n._block(e.splice(0, 16))
      return n.reset(), t
    },
    _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
    _key: [1518500249, 1859775393, 2400959708, 3395469782],
    _f: (n, e, t, s) =>
      n > 19
        ? n > 39
          ? n > 59
            ? n > 79
              ? void 0
              : e ^ t ^ s
            : (e & t) | (e & s) | (t & s)
          : e ^ t ^ s
        : (e & t) | (~e & s),
    _S: (n, e) => (e << n) | (e >>> (32 - n)),
    _block: function (n) {
      const e = this,
        t = e._h,
        s = G(80)
      for (let o = 0; 16 > o; o++) s[o] = n[o]
      let a = t[0],
        r = t[1],
        i = t[2],
        c = t[3],
        l = t[4]
      for (let o = 0; 79 >= o; o++) {
        16 > o || (s[o] = e._S(1, s[o - 3] ^ s[o - 8] ^ s[o - 14] ^ s[o - 16]))
        const h =
          (e._S(5, a) + e._f(o, r, i, c) + l + s[o] + e._key[k.floor(o / 20)]) |
          0
        ;(l = c), (c = i), (i = e._S(30, r)), (r = a), (a = h)
      }
      ;(t[0] = (t[0] + a) | 0),
        (t[1] = (t[1] + r) | 0),
        (t[2] = (t[2] + i) | 0),
        (t[3] = (t[3] + c) | 0),
        (t[4] = (t[4] + l) | 0)
    }
  }
  const de = {
      getRandomValues(n) {
        const e = new M(n.buffer),
          t = (s) => {
            let a = 987654321
            const r = 4294967295
            return () => (
              (a = (36969 * (65535 & a) + (a >> 16)) & r),
              ((((a << 16) + (s = (18e3 * (65535 & s) + (s >> 16)) & r)) & r) /
                4294967296 +
                0.5) *
                (k.random() > 0.5 ? 1 : -1)
            )
          }
        for (let s, a = 0; a < n.length; a += 4) {
          const r = t(4294967296 * (s || k.random()))
          ;(s = 987654071 * r()), (e[a / 4] = (4294967296 * r()) | 0)
        }
        return n
      }
    },
    T = {
      importKey: (n) => new T.hmacSha1(W.bytes.toBits(n)),
      pbkdf2(n, e, t, s) {
        if (((t = t || 1e4), 0 > s || 0 > t))
          throw new m('invalid params to pbkdf2')
        const a = (1 + (s >> 5)) << 2
        let r, i, c, l, o
        const h = new ArrayBuffer(a),
          d = new j(h)
        let w = 0
        const z = u
        for (e = W.bytes.toBits(e), o = 1; (a || 1) > w; o++) {
          for (r = i = n.encrypt(z.concat(e, [o])), c = 1; t > c; c++)
            for (i = n.encrypt(i), l = 0; l < i.length; l++) r[l] ^= i[l]
          for (c = 0; (a || 1) > w && c < r.length; c++)
            d.setInt32(w, r[c]), (w += 4)
        }
        return h.slice(0, s / 8)
      },
      hmacSha1: class {
        constructor(n) {
          const e = this,
            t = (e._hash = O.sha1),
            s = [[], []],
            a = t.prototype.blockSize / 32
          ;(e._baseHash = [new t(), new t()]), n.length > a && (n = t.hash(n))
          for (let r = 0; a > r; r++)
            (s[0][r] = 909522486 ^ n[r]), (s[1][r] = 1549556828 ^ n[r])
          e._baseHash[0].update(s[0]),
            e._baseHash[1].update(s[1]),
            (e._resultHash = new t(e._baseHash[0]))
        }
        reset() {
          const n = this
          ;(n._resultHash = new n._hash(n._baseHash[0])), (n._updated = !1)
        }
        update(n) {
          ;(this._updated = !0), this._resultHash.update(n)
        }
        digest() {
          const n = this,
            e = n._resultHash.finalize(),
            t = new n._hash(n._baseHash[1]).update(e).finalize()
          return n.reset(), t
        }
        encrypt(n) {
          if (this._updated)
            throw new m('encrypt on already updated hmac called!')
          return this.update(n), this.digest(n)
        }
      }
    },
    q = 'Invalid pasword',
    D = 16,
    J = { name: 'PBKDF2' },
    ue = y.assign({ hash: { name: 'HMAC' } }, J),
    N = y.assign({ iterations: 1e3, hash: { name: 'SHA-1' } }, J),
    fe = ['deriveBits'],
    H = [8, 12, 16],
    K = [16, 24, 32],
    v = 10,
    Q = [0, 0, 0, 0],
    U = b !== void 0,
    X = U && b.subtle !== void 0,
    _ = W.bytes,
    Y = class {
      constructor(n) {
        const e = this
        ;(e._tables = [
          [[], [], [], [], []],
          [[], [], [], [], []]
        ]),
          e._tables[0][0][0] || e._precompute()
        const t = e._tables[0][4],
          s = e._tables[1],
          a = n.length
        let r,
          i,
          c,
          l = 1
        if (a !== 4 && a !== 6 && a !== 8) throw new m('invalid aes key size')
        for (
          e._key = [(i = n.slice(0)), (c = [])], r = a;
          4 * a + 28 > r;
          r++
        ) {
          let o = i[r - 1]
          ;(r % a == 0 || (a === 8 && r % a == 4)) &&
            ((o =
              (t[o >>> 24] << 24) ^
              (t[(o >> 16) & 255] << 16) ^
              (t[(o >> 8) & 255] << 8) ^
              t[255 & o]),
            r % a == 0 &&
              ((o = (o << 8) ^ (o >>> 24) ^ (l << 24)),
              (l = (l << 1) ^ (283 * (l >> 7))))),
            (i[r] = i[r - a] ^ o)
        }
        for (let o = 0; r; o++, r--) {
          const h = i[3 & o ? r : r - 4]
          c[o] =
            4 >= r || 4 > o
              ? h
              : s[0][t[h >>> 24]] ^
                s[1][t[(h >> 16) & 255]] ^
                s[2][t[(h >> 8) & 255]] ^
                s[3][t[255 & h]]
        }
      }
      encrypt(n) {
        return this._crypt(n, 0)
      }
      decrypt(n) {
        return this._crypt(n, 1)
      }
      _precompute() {
        const n = this._tables[0],
          e = this._tables[1],
          t = n[4],
          s = e[4],
          a = [],
          r = []
        let i, c, l, o
        for (let h = 0; 256 > h; h++)
          r[(a[h] = (h << 1) ^ (283 * (h >> 7))) ^ h] = h
        for (let h = (i = 0); !t[h]; h ^= c || 1, i = r[i] || 1) {
          let d = i ^ (i << 1) ^ (i << 2) ^ (i << 3) ^ (i << 4)
          ;(d = (d >> 8) ^ (255 & d) ^ 99),
            (t[h] = d),
            (s[d] = h),
            (o = a[(l = a[(c = a[h])])])
          let w = (16843009 * o) ^ (65537 * l) ^ (257 * c) ^ (16843008 * h),
            z = (257 * a[d]) ^ (16843008 * d)
          for (let g = 0; 4 > g; g++)
            (n[g][h] = z = (z << 24) ^ (z >>> 8)),
              (e[g][d] = w = (w << 24) ^ (w >>> 8))
        }
        for (let h = 0; 5 > h; h++)
          (n[h] = n[h].slice(0)), (e[h] = e[h].slice(0))
      }
      _crypt(n, e) {
        if (n.length !== 4) throw new m('invalid aes block size')
        const t = this._key[e],
          s = t.length / 4 - 2,
          a = [0, 0, 0, 0],
          r = this._tables[e],
          i = r[0],
          c = r[1],
          l = r[2],
          o = r[3],
          h = r[4]
        let d,
          w,
          z,
          g = n[0] ^ t[0],
          C = n[e ? 3 : 1] ^ t[1],
          S = n[2] ^ t[2],
          B = n[e ? 1 : 3] ^ t[3],
          V = 4
        for (let I = 0; s > I; I++)
          (d =
            i[g >>> 24] ^
            c[(C >> 16) & 255] ^
            l[(S >> 8) & 255] ^
            o[255 & B] ^
            t[V]),
            (w =
              i[C >>> 24] ^
              c[(S >> 16) & 255] ^
              l[(B >> 8) & 255] ^
              o[255 & g] ^
              t[V + 1]),
            (z =
              i[S >>> 24] ^
              c[(B >> 16) & 255] ^
              l[(g >> 8) & 255] ^
              o[255 & C] ^
              t[V + 2]),
            (B =
              i[B >>> 24] ^
              c[(g >> 16) & 255] ^
              l[(C >> 8) & 255] ^
              o[255 & S] ^
              t[V + 3]),
            (V += 4),
            (g = d),
            (C = w),
            (S = z)
        for (let I = 0; 4 > I; I++)
          (a[e ? 3 & -I : I] =
            (h[g >>> 24] << 24) ^
            (h[(C >> 16) & 255] << 16) ^
            (h[(S >> 8) & 255] << 8) ^
            h[255 & B] ^
            t[V++]),
            (d = g),
            (g = C),
            (C = S),
            (S = B),
            (B = d)
        return a
      }
    },
    Z = class {
      constructor(n, e) {
        ;(this._prf = n), (this._initIv = e), (this._iv = e)
      }
      reset() {
        this._iv = this._initIv
      }
      update(n) {
        return this.calculate(this._prf, n, this._iv)
      }
      incWord(n) {
        if (((n >> 24) & 255) == 255) {
          let e = (n >> 16) & 255,
            t = (n >> 8) & 255,
            s = 255 & n
          e === 255
            ? ((e = 0), t === 255 ? ((t = 0), s === 255 ? (s = 0) : ++s) : ++t)
            : ++e,
            (n = 0),
            (n += e << 16),
            (n += t << 8),
            (n += s)
        } else n += 1 << 24
        return n
      }
      incCounter(n) {
        ;(n[0] = this.incWord(n[0])) === 0 && (n[1] = this.incWord(n[1]))
      }
      calculate(n, e, t) {
        let s
        if (!(s = e.length)) return []
        const a = u.bitLength(e)
        for (let r = 0; s > r; r += 4) {
          this.incCounter(t)
          const i = n.encrypt(t)
          ;(e[r] ^= i[0]),
            (e[r + 1] ^= i[1]),
            (e[r + 2] ^= i[2]),
            (e[r + 3] ^= i[3])
        }
        return u.clamp(e, a)
      }
    },
    $ = T.hmacSha1
  class ge {
    constructor(e, t, s) {
      y.assign(this, {
        password: e,
        signed: t,
        strength: s - 1,
        pendingInput: new p(0)
      })
    }
    async append(e) {
      const t = this
      if (t.password) {
        const s = f(e, 0, H[t.strength] + 2)
        await (async (a, r, i) => {
          await te(a, i, f(r, 0, H[a.strength]))
          const c = f(r, H[a.strength]),
            l = a.keys.passwordVerification
          if (l[0] != c[0] || l[1] != c[1]) throw new m(q)
        })(t, s, t.password),
          (t.password = null),
          (t.aesCtrGladman = new Z(new Y(t.keys.key), G.from(Q))),
          (t.hmac = new $(t.keys.authentication)),
          (e = f(e, H[t.strength] + 2))
      }
      return ee(t, e, new p(e.length - v - ((e.length - v) % D)), 0, v, !0)
    }
    flush() {
      const e = this,
        t = e.pendingInput,
        s = f(t, 0, t.length - v),
        a = f(t, t.length - v)
      let r = new p(0)
      if (s.length) {
        const c = _.toBits(s)
        e.hmac.update(c)
        const l = e.aesCtrGladman.update(c)
        r = _.fromBits(l)
      }
      let i = !0
      if (e.signed) {
        const c = f(_.fromBits(e.hmac.digest()), 0, v)
        for (let l = 0; v > l; l++) c[l] != a[l] && (i = !1)
      }
      return { valid: i, data: r }
    }
  }
  class we {
    constructor(e, t) {
      y.assign(this, { password: e, strength: t - 1, pendingInput: new p(0) })
    }
    async append(e) {
      const t = this
      let s = new p(0)
      t.password &&
        ((s = await (async (r, i) => {
          const c =
            ((l = new p(H[r.strength])),
            U && typeof b.getRandomValues == 'function'
              ? b.getRandomValues(l)
              : de.getRandomValues(l))
          var l
          return await te(r, i, c), L(c, r.keys.passwordVerification)
        })(t, t.password)),
        (t.password = null),
        (t.aesCtrGladman = new Z(new Y(t.keys.key), G.from(Q))),
        (t.hmac = new $(t.keys.authentication)))
      const a = new p(s.length + e.length - (e.length % D))
      return a.set(s, 0), ee(t, e, a, s.length, 0)
    }
    flush() {
      const e = this
      let t = new p(0)
      if (e.pendingInput.length) {
        const a = e.aesCtrGladman.update(_.toBits(e.pendingInput))
        e.hmac.update(a), (t = _.fromBits(a))
      }
      const s = f(_.fromBits(e.hmac.digest()), 0, v)
      return { data: L(t, s), signature: s }
    }
  }
  function ee(n, e, t, s, a, r) {
    const i = e.length - a
    let c
    for (
      n.pendingInput.length &&
        ((e = L(n.pendingInput, e)),
        (t = ((l, o) => {
          if (o && o > l.length) {
            const h = l
            ;(l = new p(o)).set(h, 0)
          }
          return l
        })(t, i - (i % D)))),
        c = 0;
      i - D >= c;
      c += D
    ) {
      const l = _.toBits(f(e, c, c + D))
      r && n.hmac.update(l)
      const o = n.aesCtrGladman.update(l)
      r || n.hmac.update(o), t.set(_.fromBits(o), c + s)
    }
    return (n.pendingInput = f(e, c)), t
  }
  async function te(n, e, t) {
    const s = ((c) => {
        if (x === void 0) {
          const l = new p((c = unescape(encodeURIComponent(c))).length)
          for (let o = 0; o < l.length; o++) l[o] = c.charCodeAt(o)
          return l
        }
        return new x().encode(c)
      })(e),
      a = await ((c, l, o, h, d) =>
        U && X && typeof b.subtle.importKey == 'function'
          ? b.subtle.importKey('raw', l, o, !1, d)
          : T.importKey(l))(0, s, ue, 0, fe),
      r = await (async (c, l, o) =>
        U && X && typeof b.subtle.deriveBits == 'function'
          ? await b.subtle.deriveBits(c, l, o)
          : T.pbkdf2(l, c.salt, N.iterations, o))(
        y.assign({ salt: t }, N),
        a,
        8 * (2 * K[n.strength] + 2)
      ),
      i = new p(r)
    n.keys = {
      key: _.toBits(f(i, 0, K[n.strength])),
      authentication: _.toBits(f(i, K[n.strength], 2 * K[n.strength])),
      passwordVerification: f(i, 2 * K[n.strength])
    }
  }
  function L(n, e) {
    let t = n
    return (
      n.length + e.length &&
        ((t = new p(n.length + e.length)), t.set(n, 0), t.set(e, n.length)),
      t
    )
  }
  function f(n, e, t) {
    return n.subarray(e, t)
  }
  class ye {
    constructor(e, t) {
      y.assign(this, { password: e, passwordVerification: t }), ae(this, e)
    }
    append(e) {
      const t = this
      if (t.password) {
        const s = ne(t, e.subarray(0, 12))
        if (((t.password = null), s[11] != t.passwordVerification))
          throw new m(q)
        e = e.subarray(12)
      }
      return ne(t, e)
    }
    flush() {
      return { valid: !0, data: new p(0) }
    }
  }
  class _e {
    constructor(e, t) {
      y.assign(this, { password: e, passwordVerification: t }), ae(this, e)
    }
    append(e) {
      const t = this
      let s, a
      if (t.password) {
        t.password = null
        const r = b.getRandomValues(new p(12))
        ;(r[11] = t.passwordVerification),
          (s = new p(e.length + r.length)),
          s.set(se(t, r), 0),
          (a = 12)
      } else (s = new p(e.length)), (a = 0)
      return s.set(se(t, e), a), s
    }
    flush() {
      return { data: new p(0) }
    }
  }
  function ne(n, e) {
    const t = new p(e.length)
    for (let s = 0; s < e.length; s++) (t[s] = re(n) ^ e[s]), P(n, t[s])
    return t
  }
  function se(n, e) {
    const t = new p(e.length)
    for (let s = 0; s < e.length; s++) (t[s] = re(n) ^ e[s]), P(n, e[s])
    return t
  }
  function ae(n, e) {
    ;(n.keys = [305419896, 591751049, 878082192]),
      (n.crcKey0 = new R(n.keys[0])),
      (n.crcKey2 = new R(n.keys[2]))
    for (let t = 0; t < e.length; t++) P(n, e.charCodeAt(t))
  }
  function P(n, e) {
    n.crcKey0.append([e]),
      (n.keys[0] = ~n.crcKey0.get()),
      (n.keys[1] = ce(n.keys[1] + ie(n.keys[0]))),
      (n.keys[1] = ce(k.imul(n.keys[1], 134775813) + 1)),
      n.crcKey2.append([n.keys[1] >>> 24]),
      (n.keys[2] = ~n.crcKey2.get())
  }
  function re(n) {
    const e = 2 | n.keys[2]
    return ie(k.imul(e, 1 ^ e) >>> 8)
  }
  function ie(n) {
    return 255 & n
  }
  function ce(n) {
    return 4294967295 & n
  }
  const oe = 'deflate',
    le = 'inflate',
    he = 'Invalid signature'
  class me {
    constructor(
      e,
      {
        signature: t,
        password: s,
        signed: a,
        compressed: r,
        zipCrypto: i,
        passwordVerification: c,
        encryptionStrength: l
      },
      { chunkSize: o }
    ) {
      const h = !!s
      y.assign(this, {
        signature: t,
        encrypted: h,
        signed: a,
        compressed: r,
        inflate: r && new e({ chunkSize: o }),
        crc32: a && new R(),
        zipCrypto: i,
        decrypt: h && i ? new ye(s, c) : new ge(s, a, l)
      })
    }
    async append(e) {
      const t = this
      return (
        t.encrypted && e.length && (e = await t.decrypt.append(e)),
        t.compressed && e.length && (e = await t.inflate.append(e)),
        (!t.encrypted || t.zipCrypto) &&
          t.signed &&
          e.length &&
          t.crc32.append(e),
        e
      )
    }
    async flush() {
      const e = this
      let t,
        s = new p(0)
      if (e.encrypted) {
        const a = e.decrypt.flush()
        if (!a.valid) throw new m(he)
        s = a.data
      }
      if ((!e.encrypted || e.zipCrypto) && e.signed) {
        const a = new j(new p(4).buffer)
        if (
          ((t = e.crc32.get()),
          a.setUint32(0, t),
          e.signature != a.getUint32(0, !1))
        )
          throw new m(he)
      }
      return (
        e.compressed &&
          ((s = (await e.inflate.append(s)) || new p(0)),
          await e.inflate.flush()),
        { data: s, signature: t }
      )
    }
  }
  class be {
    constructor(
      e,
      {
        encrypted: t,
        signed: s,
        compressed: a,
        level: r,
        zipCrypto: i,
        password: c,
        passwordVerification: l,
        encryptionStrength: o
      },
      { chunkSize: h }
    ) {
      y.assign(this, {
        encrypted: t,
        signed: s,
        compressed: a,
        deflate: a && new e({ level: r || 5, chunkSize: h }),
        crc32: s && new R(),
        zipCrypto: i,
        encrypt: t && i ? new _e(c, l) : new we(c, o)
      })
    }
    async append(e) {
      const t = this
      let s = e
      return (
        t.compressed && e.length && (s = await t.deflate.append(e)),
        t.encrypted && s.length && (s = await t.encrypt.append(s)),
        (!t.encrypted || t.zipCrypto) &&
          t.signed &&
          e.length &&
          t.crc32.append(e),
        s
      )
    }
    async flush() {
      const e = this
      let t,
        s = new p(0)
      if (
        (e.compressed && (s = (await e.deflate.flush()) || new p(0)),
        e.encrypted)
      ) {
        s = await e.encrypt.append(s)
        const a = e.encrypt.flush()
        t = a.signature
        const r = new p(s.length + a.data.length)
        r.set(s, 0), r.set(a.data, s.length), (s = r)
      }
      return (
        (e.encrypted && !e.zipCrypto) || !e.signed || (t = e.crc32.get()),
        { data: s, signature: t }
      )
    }
  }
  const ke = {
    init(n) {
      n.scripts && n.scripts.length && importScripts.apply(void 0, n.scripts)
      const e = n.options
      let t
      self.initCodec && self.initCodec(),
        e.codecType.startsWith(oe)
          ? (t = self.Deflate)
          : e.codecType.startsWith(le) && (t = self.Inflate),
        (E = ((s, a, r) =>
          a.codecType.startsWith(oe)
            ? new be(s, a, r)
            : a.codecType.startsWith(le)
            ? new me(s, a, r)
            : void 0)(t, e, n.config))
    },
    append: async (n) => ({ data: await E.append(n.data) }),
    flush: () => E.flush()
  }
  let E
  function pe(n, e, t) {
    return class {
      constructor(a) {
        const r = this
        ;(r.codec = new n(y.assign({}, e, a))),
          t(r.codec, (i) => {
            if (r.pendingData) {
              const c = r.pendingData
              ;(r.pendingData = new p(c.length + i.length)),
                r.pendingData.set(c, 0),
                r.pendingData.set(i, c.length)
            } else r.pendingData = new p(i)
          })
      }
      append(a) {
        return this.codec.push(a), s(this)
      }
      flush() {
        return this.codec.push(new p(0), !0), s(this)
      }
    }
    function s(a) {
      if (a.pendingData) {
        const r = a.pendingData
        return (a.pendingData = null), r
      }
      return new p(0)
    }
  }
  addEventListener('message', async (n) => {
    const e = n.data,
      t = e.type,
      s = ke[t]
    if (s)
      try {
        e.data && (e.data = new p(e.data))
        const a = (await s(e)) || {}
        if (((a.type = t), a.data))
          try {
            ;(a.data = a.data.buffer), A(a, [a.data])
          } catch {
            A(a)
          }
        else A(a)
      } catch (a) {
        A({ type: t, error: { message: a.message, stack: a.stack } })
      }
  }),
    (self.initCodec = () => {
      const { Deflate: n, Inflate: e } = ((t, s = {}, a) => ({
        Deflate: pe(t.Deflate, s.deflate, a),
        Inflate: pe(t.Inflate, s.inflate, a)
      }))(
        pako,
        { deflate: { raw: !0 }, inflate: { raw: !0 } },
        (t, s) => (t.onData = s)
      )
      ;(self.Deflate = n), (self.Inflate = e)
    })
})()
