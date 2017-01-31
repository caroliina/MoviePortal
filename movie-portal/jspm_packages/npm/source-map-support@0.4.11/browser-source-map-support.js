/* */ 
(function(Buffer, process) {
  (this.define || function(N, O) {
    this.sourceMapSupport = O();
  })("browser-source-map-support", function(N) {
    (function p(v, l, c) {
      function e(d, a) {
        if (!l[d]) {
          if (!v[d]) {
            var h = "function" == typeof require && require;
            if (!a && h)
              return h(d, !0);
            if (k)
              return k(d, !0);
            throw Error("Cannot find module '" + d + "'");
          }
          h = l[d] = {exports: {}};
          v[d][0].call(h.exports, function(a) {
            var c = v[d][1][a];
            return e(c ? c : a);
          }, h, h.exports, p, v, l, c);
        }
        return l[d].exports;
      }
      for (var k = "function" == typeof require && require,
          r = 0; r < c.length; r++)
        e(c[r]);
      return e;
    })({
      1: [function(p, v, l) {
        N = p("./source-map-support");
      }, {"./source-map-support": 19}],
      2: [function(p, v, l) {}, {}],
      3: [function(p, v, l) {
        function c(g, m, b) {
          if (!(this instanceof c))
            return new c(g, m, b);
          var y = typeof g;
          if ("base64" === m && "string" === y)
            for (g = g.trim ? g.trim() : g.replace(/^\s+|\s+$/g, ""); 0 !== g.length % 4; )
              g += "=";
          var a;
          if ("number" === y)
            a = A(g);
          else if ("string" === y)
            a = c.byteLength(g, m);
          else if ("object" === y)
            a = A(g.length);
          else
            throw Error("First argument needs to be a number, array or string.");
          var f;
          c._useTypedArrays ? f = c._augment(new Uint8Array(a)) : (f = this, f.length = a, f._isBuffer = !0);
          if (c._useTypedArrays && "number" === typeof g.byteLength)
            f._set(g);
          else {
            var d = g;
            if (L(d) || c.isBuffer(d) || d && "object" === typeof d && "number" === typeof d.length)
              for (m = 0; m < a; m++)
                c.isBuffer(g) ? f[m] = g.readUInt8(m) : f[m] = g[m];
            else if ("string" === y)
              f.write(g, 0, m);
            else if ("number" === y && !c._useTypedArrays && !b)
              for (m = 0; m < a; m++)
                f[m] = 0;
          }
          return f;
        }
        function e(g, m, b) {
          var y = "";
          for (b = Math.min(g.length, b); m < b; m++)
            y += String.fromCharCode(g[m]);
          return y;
        }
        function k(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(void 0 !== m && null !== m, "missing offset"), q(m + 1 < g.length, "Trying to read beyond buffer length"));
          a = g.length;
          if (!(m >= a))
            return b ? (b = g[m], m + 1 < a && (b |= g[m + 1] << 8)) : (b = g[m] << 8, m + 1 < a && (b |= g[m + 1])), b;
        }
        function r(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(void 0 !== m && null !== m, "missing offset"), q(m + 3 < g.length, "Trying to read beyond buffer length"));
          a = g.length;
          if (!(m >= a)) {
            var y;
            b ? (m + 2 < a && (y = g[m + 2] << 16), m + 1 < a && (y |= g[m + 1] << 8), y |= g[m], m + 3 < a && (y += g[m + 3] << 24 >>> 0)) : (m + 1 < a && (y = g[m + 1] << 16), m + 2 < a && (y |= g[m + 2] << 8), m + 3 < a && (y |= g[m + 3]), y += g[m] << 24 >>> 0);
            return y;
          }
        }
        function d(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(void 0 !== m && null !== m, "missing offset"), q(m + 1 < g.length, "Trying to read beyond buffer length"));
          if (!(m >= g.length))
            return g = k(g, m, b, !0), g & 32768 ? -1 * (65535 - g + 1) : g;
        }
        function a(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(void 0 !== m && null !== m, "missing offset"), q(m + 3 < g.length, "Trying to read beyond buffer length"));
          if (!(m >= g.length))
            return g = r(g, m, b, !0), g & 2147483648 ? -1 * (4294967295 - g + 1) : g;
        }
        function h(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(m + 3 < g.length, "Trying to read beyond buffer length"));
          return J.read(g, m, b, 23, 4);
        }
        function n(g, m, b, a) {
          a || (q("boolean" === typeof b, "missing or invalid endian"), q(m + 7 < g.length, "Trying to read beyond buffer length"));
          return J.read(g, m, b, 52, 8);
        }
        function t(g, m, b, a, f) {
          f || (q(void 0 !== m && null !== m, "missing value"), q("boolean" === typeof a, "missing or invalid endian"), q(void 0 !== b && null !== b, "missing offset"), q(b + 1 < g.length, "trying to write beyond buffer length"), H(m, 65535));
          var y = g.length;
          if (!(b >= y))
            for (f = 0, y = Math.min(y - b, 2); f < y; f++)
              g[b + f] = (m & 255 << 8 * (a ? f : 1 - f)) >>> 8 * (a ? f : 1 - f);
        }
        function b(g, b, a, f, c) {
          c || (q(void 0 !== b && null !== b, "missing value"), q("boolean" === typeof f, "missing or invalid endian"), q(void 0 !== a && null !== a, "missing offset"), q(a + 3 < g.length, "trying to write beyond buffer length"), H(b, 4294967295));
          var m = g.length;
          if (!(a >= m))
            for (c = 0, m = Math.min(m - a, 4); c < m; c++)
              g[a + c] = b >>> 8 * (f ? c : 3 - c) & 255;
        }
        function f(g, b, a, f, c) {
          c || (q(void 0 !== b && null !== b, "missing value"), q("boolean" === typeof f, "missing or invalid endian"), q(void 0 !== a && null !== a, "missing offset"), q(a + 1 < g.length, "Trying to write beyond buffer length"), z(b, 32767, -32768));
          a >= g.length || (0 <= b ? t(g, b, a, f, c) : t(g, 65535 + b + 1, a, f, c));
        }
        function G(g, m, a, f, c) {
          c || (q(void 0 !== m && null !== m, "missing value"), q("boolean" === typeof f, "missing or invalid endian"), q(void 0 !== a && null !== a, "missing offset"), q(a + 3 < g.length, "Trying to write beyond buffer length"), z(m, 2147483647, -2147483648));
          a >= g.length || (0 <= m ? b(g, m, a, f, c) : b(g, 4294967295 + m + 1, a, f, c));
        }
        function u(g, b, a, f, c) {
          c || (q(void 0 !== b && null !== b, "missing value"), q("boolean" === typeof f, "missing or invalid endian"), q(void 0 !== a && null !== a, "missing offset"), q(a + 3 < g.length, "Trying to write beyond buffer length"), E(b, 3.4028234663852886E38, -3.4028234663852886E38));
          a >= g.length || J.write(g, b, a, f, 23, 4);
        }
        function M(g, b, a, f, c) {
          c || (q(void 0 !== b && null !== b, "missing value"), q("boolean" === typeof f, "missing or invalid endian"), q(void 0 !== a && null !== a, "missing offset"), q(a + 7 < g.length, "Trying to write beyond buffer length"), E(b, 1.7976931348623157E308, -1.7976931348623157E308));
          a >= g.length || J.write(g, b, a, f, 52, 8);
        }
        function I(g, b, a) {
          if ("number" !== typeof g)
            return a;
          g = ~~g;
          if (g >= b)
            return b;
          if (0 <= g)
            return g;
          g += b;
          return 0 <= g ? g : 0;
        }
        function A(g) {
          g = ~~Math.ceil(+g);
          return 0 > g ? 0 : g;
        }
        function L(g) {
          return (Array.isArray || function(g) {
            return "[object Array]" === Object.prototype.toString.call(g);
          })(g);
        }
        function C(g) {
          return 16 > g ? "0" + g.toString(16) : g.toString(16);
        }
        function x(g) {
          for (var b = [],
              a = 0; a < g.length; a++) {
            var f = g.charCodeAt(a);
            if (127 >= f)
              b.push(g.charCodeAt(a));
            else {
              var c = a;
              55296 <= f && 57343 >= f && a++;
              f = encodeURIComponent(g.slice(c, a + 1)).substr(1).split("%");
              for (c = 0; c < f.length; c++)
                b.push(parseInt(f[c], 16));
            }
          }
          return b;
        }
        function K(g) {
          for (var b = [],
              a = 0; a < g.length; a++)
            b.push(g.charCodeAt(a) & 255);
          return b;
        }
        function B(g, b, a, f) {
          for (var m = 0; m < f && !(m + a >= b.length || m >= g.length); m++)
            b[m + a] = g[m];
          return m;
        }
        function F(g) {
          try {
            return decodeURIComponent(g);
          } catch (m) {
            return String.fromCharCode(65533);
          }
        }
        function H(g, b) {
          q("number" === typeof g, "cannot write a non-number as a number");
          q(0 <= g, "specified a negative value for writing an unsigned value");
          q(g <= b, "value is larger than maximum value for type");
          q(Math.floor(g) === g, "value has a fractional component");
        }
        function z(g, b, a) {
          q("number" === typeof g, "cannot write a non-number as a number");
          q(g <= b, "value larger than maximum allowed value");
          q(g >= a, "value smaller than minimum allowed value");
          q(Math.floor(g) === g, "value has a fractional component");
        }
        function E(g, b, a) {
          q("number" === typeof g, "cannot write a non-number as a number");
          q(g <= b, "value larger than maximum allowed value");
          q(g >= a, "value smaller than minimum allowed value");
        }
        function q(g, b) {
          if (!g)
            throw Error(b || "Failed assertion");
        }
        var D = p("base64-js"),
            J = p("ieee754");
        l.Buffer = c;
        l.SlowBuffer = c;
        l.INSPECT_MAX_BYTES = 50;
        c.poolSize = 8192;
        c._useTypedArrays = function() {
          try {
            var g = new ArrayBuffer(0),
                b = new Uint8Array(g);
            b.foo = function() {
              return 42;
            };
            return 42 === b.foo() && "function" === typeof b.subarray;
          } catch (y) {
            return !1;
          }
        }();
        c.isEncoding = function(g) {
          switch (String(g).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        };
        c.isBuffer = function(g) {
          return !(null === g || void 0 === g || !g._isBuffer);
        };
        c.byteLength = function(g, b) {
          var a;
          g += "";
          switch (b || "utf8") {
            case "hex":
              a = g.length / 2;
              break;
            case "utf8":
            case "utf-8":
              a = x(g).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              a = g.length;
              break;
            case "base64":
              a = D.toByteArray(g).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              a = 2 * g.length;
              break;
            default:
              throw Error("Unknown encoding");
          }
          return a;
        };
        c.concat = function(g, b) {
          q(L(g), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array.");
          if (0 === g.length)
            return new c(0);
          if (1 === g.length)
            return g[0];
          var a;
          if ("number" !== typeof b)
            for (a = b = 0; a < g.length; a++)
              b += g[a].length;
          var m = new c(b),
              f = 0;
          for (a = 0; a < g.length; a++) {
            var d = g[a];
            d.copy(m, f);
            f += d.length;
          }
          return m;
        };
        c.prototype.write = function(g, b, a, f) {
          if (isFinite(b))
            isFinite(a) || (f = a, a = void 0);
          else {
            var m = f;
            f = b;
            b = a;
            a = m;
          }
          b = Number(b) || 0;
          m = this.length - b;
          a ? (a = Number(a), a > m && (a = m)) : a = m;
          f = String(f || "utf8").toLowerCase();
          switch (f) {
            case "hex":
              b = Number(b) || 0;
              f = this.length - b;
              a ? (a = Number(a), a > f && (a = f)) : a = f;
              f = g.length;
              q(0 === f % 2, "Invalid hex string");
              a > f / 2 && (a = f / 2);
              for (f = 0; f < a; f++)
                m = parseInt(g.substr(2 * f, 2), 16), q(!isNaN(m), "Invalid hex string"), this[b + f] = m;
              c._charsWritten = 2 * f;
              g = f;
              break;
            case "utf8":
            case "utf-8":
              g = c._charsWritten = B(x(g), this, b, a);
              break;
            case "ascii":
              g = c._charsWritten = B(K(g), this, b, a);
              break;
            case "binary":
              g = c._charsWritten = B(K(g), this, b, a);
              break;
            case "base64":
              g = c._charsWritten = B(D.toByteArray(g), this, b, a);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              for (var d,
                  m = [],
                  h = 0; h < g.length; h++)
                d = g.charCodeAt(h), f = d >> 8, d %= 256, m.push(d), m.push(f);
              g = c._charsWritten = B(m, this, b, a);
              break;
            default:
              throw Error("Unknown encoding");
          }
          return g;
        };
        c.prototype.toString = function(g, b, a) {
          g = String(g || "utf8").toLowerCase();
          b = Number(b) || 0;
          a = void 0 !== a ? Number(a) : a = this.length;
          if (a === b)
            return "";
          switch (g) {
            case "hex":
              g = this.length;
              if (!b || 0 > b)
                b = 0;
              if (!a || 0 > a || a > g)
                a = g;
              for (g = ""; b < a; b++)
                g += C(this[b]);
              a = g;
              break;
            case "utf8":
            case "utf-8":
              var f = g = "";
              for (a = Math.min(this.length, a); b < a; b++)
                127 >= this[b] ? (g += F(f) + String.fromCharCode(this[b]), f = "") : f += "%" + this[b].toString(16);
              a = g + F(f);
              break;
            case "ascii":
              a = e(this, b, a);
              break;
            case "binary":
              a = e(this, b, a);
              break;
            case "base64":
              a = 0 === b && a === this.length ? D.fromByteArray(this) : D.fromByteArray(this.slice(b, a));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              a = this.slice(b, a);
              b = "";
              for (g = 0; g < a.length; g += 2)
                b += String.fromCharCode(a[g] + 256 * a[g + 1]);
              a = b;
              break;
            default:
              throw Error("Unknown encoding");
          }
          return a;
        };
        c.prototype.toJSON = function() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        c.prototype.copy = function(g, b, a, f) {
          a || (a = 0);
          f || 0 === f || (f = this.length);
          b || (b = 0);
          if (f !== a && 0 !== g.length && 0 !== this.length)
            if (q(f >= a, "sourceEnd < sourceStart"), q(0 <= b && b < g.length, "targetStart out of bounds"), q(0 <= a && a < this.length, "sourceStart out of bounds"), q(0 <= f && f <= this.length, "sourceEnd out of bounds"), f > this.length && (f = this.length), g.length - b < f - a && (f = g.length - b + a), f -= a, 100 > f || !c._useTypedArrays)
              for (var m = 0; m < f; m++)
                g[m + b] = this[m + a];
            else
              g._set(this.subarray(a, a + f), b);
        };
        c.prototype.slice = function(b, a) {
          var g = this.length;
          b = I(b, g, 0);
          a = I(a, g, g);
          if (c._useTypedArrays)
            return c._augment(this.subarray(b, a));
          for (var g = a - b,
              f = new c(g, void 0, !0),
              m = 0; m < g; m++)
            f[m] = this[m + b];
          return f;
        };
        c.prototype.get = function(b) {
          console.log(".get() is deprecated. Access using array indexes instead.");
          return this.readUInt8(b);
        };
        c.prototype.set = function(b, a) {
          console.log(".set() is deprecated. Access using array indexes instead.");
          return this.writeUInt8(b, a);
        };
        c.prototype.readUInt8 = function(b, a) {
          a || (q(void 0 !== b && null !== b, "missing offset"), q(b < this.length, "Trying to read beyond buffer length"));
          if (!(b >= this.length))
            return this[b];
        };
        c.prototype.readUInt16LE = function(b, a) {
          return k(this, b, !0, a);
        };
        c.prototype.readUInt16BE = function(b, a) {
          return k(this, b, !1, a);
        };
        c.prototype.readUInt32LE = function(b, a) {
          return r(this, b, !0, a);
        };
        c.prototype.readUInt32BE = function(b, a) {
          return r(this, b, !1, a);
        };
        c.prototype.readInt8 = function(b, a) {
          a || (q(void 0 !== b && null !== b, "missing offset"), q(b < this.length, "Trying to read beyond buffer length"));
          if (!(b >= this.length))
            return this[b] & 128 ? -1 * (255 - this[b] + 1) : this[b];
        };
        c.prototype.readInt16LE = function(b, a) {
          return d(this, b, !0, a);
        };
        c.prototype.readInt16BE = function(b, a) {
          return d(this, b, !1, a);
        };
        c.prototype.readInt32LE = function(b, f) {
          return a(this, b, !0, f);
        };
        c.prototype.readInt32BE = function(b, f) {
          return a(this, b, !1, f);
        };
        c.prototype.readFloatLE = function(b, a) {
          return h(this, b, !0, a);
        };
        c.prototype.readFloatBE = function(b, a) {
          return h(this, b, !1, a);
        };
        c.prototype.readDoubleLE = function(b, a) {
          return n(this, b, !0, a);
        };
        c.prototype.readDoubleBE = function(b, a) {
          return n(this, b, !1, a);
        };
        c.prototype.writeUInt8 = function(b, a, f) {
          f || (q(void 0 !== b && null !== b, "missing value"), q(void 0 !== a && null !== a, "missing offset"), q(a < this.length, "trying to write beyond buffer length"), H(b, 255));
          a >= this.length || (this[a] = b);
        };
        c.prototype.writeUInt16LE = function(b, a, f) {
          t(this, b, a, !0, f);
        };
        c.prototype.writeUInt16BE = function(b, a, f) {
          t(this, b, a, !1, f);
        };
        c.prototype.writeUInt32LE = function(a, f, c) {
          b(this, a, f, !0, c);
        };
        c.prototype.writeUInt32BE = function(a, f, c) {
          b(this, a, f, !1, c);
        };
        c.prototype.writeInt8 = function(b, a, f) {
          f || (q(void 0 !== b && null !== b, "missing value"), q(void 0 !== a && null !== a, "missing offset"), q(a < this.length, "Trying to write beyond buffer length"), z(b, 127, -128));
          a >= this.length || (0 <= b ? this.writeUInt8(b, a, f) : this.writeUInt8(255 + b + 1, a, f));
        };
        c.prototype.writeInt16LE = function(b, a, c) {
          f(this, b, a, !0, c);
        };
        c.prototype.writeInt16BE = function(b, a, c) {
          f(this, b, a, !1, c);
        };
        c.prototype.writeInt32LE = function(b, a, f) {
          G(this, b, a, !0, f);
        };
        c.prototype.writeInt32BE = function(b, a, f) {
          G(this, b, a, !1, f);
        };
        c.prototype.writeFloatLE = function(b, a, f) {
          u(this, b, a, !0, f);
        };
        c.prototype.writeFloatBE = function(b, a, f) {
          u(this, b, a, !1, f);
        };
        c.prototype.writeDoubleLE = function(b, a, f) {
          M(this, b, a, !0, f);
        };
        c.prototype.writeDoubleBE = function(b, a, f) {
          M(this, b, a, !1, f);
        };
        c.prototype.fill = function(b, a, f) {
          b || (b = 0);
          a || (a = 0);
          f || (f = this.length);
          "string" === typeof b && (b = b.charCodeAt(0));
          q("number" === typeof b && !isNaN(b), "value is not a number");
          q(f >= a, "end < start");
          if (f !== a && 0 !== this.length)
            for (q(0 <= a && a < this.length, "start out of bounds"), q(0 <= f && f <= this.length, "end out of bounds"); a < f; a++)
              this[a] = b;
        };
        c.prototype.inspect = function() {
          for (var b = [],
              a = this.length,
              f = 0; f < a; f++)
            if (b[f] = C(this[f]), f === l.INSPECT_MAX_BYTES) {
              b[f + 1] = "...";
              break;
            }
          return "<Buffer " + b.join(" ") + ">";
        };
        c.prototype.toArrayBuffer = function() {
          if ("undefined" !== typeof Uint8Array) {
            if (c._useTypedArrays)
              return (new c(this)).buffer;
            for (var b = new Uint8Array(this.length),
                a = 0,
                f = b.length; a < f; a += 1)
              b[a] = this[a];
            return b.buffer;
          }
          throw Error("Buffer.toArrayBuffer not supported in this browser");
        };
        var w = c.prototype;
        c._augment = function(b) {
          b._isBuffer = !0;
          b._get = b.get;
          b._set = b.set;
          b.get = w.get;
          b.set = w.set;
          b.write = w.write;
          b.toString = w.toString;
          b.toLocaleString = w.toString;
          b.toJSON = w.toJSON;
          b.copy = w.copy;
          b.slice = w.slice;
          b.readUInt8 = w.readUInt8;
          b.readUInt16LE = w.readUInt16LE;
          b.readUInt16BE = w.readUInt16BE;
          b.readUInt32LE = w.readUInt32LE;
          b.readUInt32BE = w.readUInt32BE;
          b.readInt8 = w.readInt8;
          b.readInt16LE = w.readInt16LE;
          b.readInt16BE = w.readInt16BE;
          b.readInt32LE = w.readInt32LE;
          b.readInt32BE = w.readInt32BE;
          b.readFloatLE = w.readFloatLE;
          b.readFloatBE = w.readFloatBE;
          b.readDoubleLE = w.readDoubleLE;
          b.readDoubleBE = w.readDoubleBE;
          b.writeUInt8 = w.writeUInt8;
          b.writeUInt16LE = w.writeUInt16LE;
          b.writeUInt16BE = w.writeUInt16BE;
          b.writeUInt32LE = w.writeUInt32LE;
          b.writeUInt32BE = w.writeUInt32BE;
          b.writeInt8 = w.writeInt8;
          b.writeInt16LE = w.writeInt16LE;
          b.writeInt16BE = w.writeInt16BE;
          b.writeInt32LE = w.writeInt32LE;
          b.writeInt32BE = w.writeInt32BE;
          b.writeFloatLE = w.writeFloatLE;
          b.writeFloatBE = w.writeFloatBE;
          b.writeDoubleLE = w.writeDoubleLE;
          b.writeDoubleBE = w.writeDoubleBE;
          b.fill = w.fill;
          b.inspect = w.inspect;
          b.toArrayBuffer = w.toArrayBuffer;
          return b;
        };
      }, {
        "base64-js": 4,
        ieee754: 5
      }],
      4: [function(p, v, l) {
        (function(c) {
          function e(c) {
            c = c.charCodeAt(0);
            if (43 === c || 45 === c)
              return 62;
            if (47 === c || 95 === c)
              return 63;
            if (48 > c)
              return -1;
            if (58 > c)
              return c - 48 + 52;
            if (91 > c)
              return c - 65;
            if (123 > c)
              return c - 97 + 26;
          }
          var k = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
          c.toByteArray = function(c) {
            function d(a) {
              b[f++] = a;
            }
            var a,
                h,
                n,
                t,
                b;
            if (0 < c.length % 4)
              throw Error("Invalid string. Length must be a multiple of 4");
            a = c.length;
            t = "=" === c.charAt(a - 2) ? 2 : "=" === c.charAt(a - 1) ? 1 : 0;
            b = new k(3 * c.length / 4 - t);
            h = 0 < t ? c.length - 4 : c.length;
            var f = 0;
            for (a = 0; a < h; a += 4)
              n = e(c.charAt(a)) << 18 | e(c.charAt(a + 1)) << 12 | e(c.charAt(a + 2)) << 6 | e(c.charAt(a + 3)), d((n & 16711680) >> 16), d((n & 65280) >> 8), d(n & 255);
            2 === t ? (n = e(c.charAt(a)) << 2 | e(c.charAt(a + 1)) >> 4, d(n & 255)) : 1 === t && (n = e(c.charAt(a)) << 10 | e(c.charAt(a + 1)) << 4 | e(c.charAt(a + 2)) >> 2, d(n >> 8 & 255), d(n & 255));
            return b;
          };
          c.fromByteArray = function(c) {
            var d,
                a = c.length % 3,
                h = "",
                n,
                e;
            d = 0;
            for (e = c.length - a; d < e; d += 3)
              n = (c[d] << 16) + (c[d + 1] << 8) + c[d + 2], n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 18 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n & 63), h += n;
            switch (a) {
              case 1:
                n = c[c.length - 1];
                h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 2);
                h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n << 4 & 63);
                h += "==";
                break;
              case 2:
                n = (c[c.length - 2] << 8) + c[c.length - 1], h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 10), h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 4 & 63), h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n << 2 & 63), h += "=";
            }
            return h;
          };
        })("undefined" === typeof l ? this.base64js = {} : l);
      }, {}],
      5: [function(p, v, l) {
        l.read = function(c, e, k, r, d) {
          var a;
          a = 8 * d - r - 1;
          var h = (1 << a) - 1,
              n = h >> 1,
              t = -7;
          d = k ? d - 1 : 0;
          var b = k ? -1 : 1,
              f = c[e + d];
          d += b;
          k = f & (1 << -t) - 1;
          f >>= -t;
          for (t += a; 0 < t; k = 256 * k + c[e + d], d += b, t -= 8)
            ;
          a = k & (1 << -t) - 1;
          k >>= -t;
          for (t += r; 0 < t; a = 256 * a + c[e + d], d += b, t -= 8)
            ;
          if (0 === k)
            k = 1 - n;
          else {
            if (k === h)
              return a ? NaN : Infinity * (f ? -1 : 1);
            a += Math.pow(2, r);
            k -= n;
          }
          return (f ? -1 : 1) * a * Math.pow(2, k - r);
        };
        l.write = function(c, e, k, r, d, a) {
          var h,
              n = 8 * a - d - 1,
              t = (1 << n) - 1,
              b = t >> 1,
              f = 23 === d ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          a = r ? 0 : a - 1;
          var G = r ? 1 : -1,
              u = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
          e = Math.abs(e);
          isNaN(e) || Infinity === e ? (e = isNaN(e) ? 1 : 0, r = t) : (r = Math.floor(Math.log(e) / Math.LN2), 1 > e * (h = Math.pow(2, -r)) && (r--, h *= 2), e = 1 <= r + b ? e + f / h : e + f * Math.pow(2, 1 - b), 2 <= e * h && (r++, h /= 2), r + b >= t ? (e = 0, r = t) : 1 <= r + b ? (e = (e * h - 1) * Math.pow(2, d), r += b) : (e = e * Math.pow(2, b - 1) * Math.pow(2, d), r = 0));
          for (; 8 <= d; c[k + a] = e & 255, a += G, e /= 256, d -= 8)
            ;
          r = r << d | e;
          for (n += d; 0 < n; c[k + a] = r & 255, a += G, r /= 256, n -= 8)
            ;
          c[k + a - G] |= 128 * u;
        };
      }, {}],
      6: [function(p, v, l) {
        function c() {}
        p = v.exports = {};
        p.nextTick = function() {
          if ("undefined" !== typeof window && window.setImmediate)
            return function(c) {
              return window.setImmediate(c);
            };
          if ("undefined" !== typeof window && window.postMessage && window.addEventListener) {
            var c = [];
            window.addEventListener("message", function(e) {
              var k = e.source;
              k !== window && null !== k || "process-tick" !== e.data || (e.stopPropagation(), 0 < c.length && c.shift()());
            }, !0);
            return function(e) {
              c.push(e);
              window.postMessage("process-tick", "*");
            };
          }
          return function(c) {
            setTimeout(c, 0);
          };
        }();
        p.title = "browser";
        p.browser = !0;
        p.env = {};
        p.argv = [];
        p.on = c;
        p.once = c;
        p.off = c;
        p.emit = c;
        p.binding = function(c) {
          throw Error("process.binding is not supported");
        };
        p.cwd = function() {
          return "/";
        };
        p.chdir = function(c) {
          throw Error("process.chdir is not supported");
        };
      }, {}],
      7: [function(p, v, l) {
        (function(c) {
          function e(a, c) {
            for (var d = 0,
                h = a.length - 1; 0 <= h; h--) {
              var b = a[h];
              "." === b ? a.splice(h, 1) : ".." === b ? (a.splice(h, 1), d++) : d && (a.splice(h, 1), d--);
            }
            if (c)
              for (; d--; d)
                a.unshift("..");
            return a;
          }
          function k(a, c) {
            if (a.filter)
              return a.filter(c);
            for (var d = [],
                h = 0; h < a.length; h++)
              c(a[h], h, a) && d.push(a[h]);
            return d;
          }
          var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          l.resolve = function() {
            for (var a = "",
                d = !1,
                n = arguments.length - 1; -1 <= n && !d; n--) {
              var t = 0 <= n ? arguments[n] : c.cwd();
              if ("string" !== typeof t)
                throw new TypeError("Arguments to path.resolve must be strings");
              t && (a = t + "/" + a, d = "/" === t.charAt(0));
            }
            a = e(k(a.split("/"), function(b) {
              return !!b;
            }), !d).join("/");
            return (d ? "/" : "") + a || ".";
          };
          l.normalize = function(a) {
            var c = l.isAbsolute(a),
                n = "/" === d(a, -1);
            (a = e(k(a.split("/"), function(a) {
              return !!a;
            }), !c).join("/")) || c || (a = ".");
            a && n && (a += "/");
            return (c ? "/" : "") + a;
          };
          l.isAbsolute = function(a) {
            return "/" === a.charAt(0);
          };
          l.join = function() {
            var a = Array.prototype.slice.call(arguments, 0);
            return l.normalize(k(a, function(a, c) {
              if ("string" !== typeof a)
                throw new TypeError("Arguments to path.join must be strings");
              return a;
            }).join("/"));
          };
          l.relative = function(a, c) {
            function d(b) {
              for (var a = 0; a < b.length && "" === b[a]; a++)
                ;
              for (var f = b.length - 1; 0 <= f && "" === b[f]; f--)
                ;
              return a > f ? [] : b.slice(a, f - a + 1);
            }
            a = l.resolve(a).substr(1);
            c = l.resolve(c).substr(1);
            for (var h = d(a.split("/")),
                b = d(c.split("/")),
                f = Math.min(h.length, b.length),
                G = f,
                u = 0; u < f; u++)
              if (h[u] !== b[u]) {
                G = u;
                break;
              }
            f = [];
            for (u = G; u < h.length; u++)
              f.push("..");
            f = f.concat(b.slice(G));
            return f.join("/");
          };
          l.sep = "/";
          l.delimiter = ":";
          l.dirname = function(a) {
            var c = r.exec(a).slice(1);
            a = c[0];
            c = c[1];
            if (!a && !c)
              return ".";
            c && (c = c.substr(0, c.length - 1));
            return a + c;
          };
          l.basename = function(a, c) {
            var d = r.exec(a).slice(1)[2];
            c && d.substr(-1 * c.length) === c && (d = d.substr(0, d.length - c.length));
            return d;
          };
          l.extname = function(a) {
            return r.exec(a).slice(1)[3];
          };
          var d = "b" === "ab".substr(-1) ? function(a, c, d) {
            return a.substr(c, d);
          } : function(a, c, d) {
            0 > c && (c = a.length + c);
            return a.substr(c, d);
          };
        }).call(this, p("node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"));
      }, {"node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 6}],
      8: [function(p, v, l) {
        function c() {
          this._array = [];
          this._set = Object.create(null);
        }
        var e = p("./util"),
            k = Object.prototype.hasOwnProperty;
        c.fromArray = function(e, d) {
          for (var a = new c,
              h = 0,
              n = e.length; h < n; h++)
            a.add(e[h], d);
          return a;
        };
        c.prototype.size = function() {
          return Object.getOwnPropertyNames(this._set).length;
        };
        c.prototype.add = function(c, d) {
          var a = e.toSetString(c),
              h = k.call(this._set, a),
              n = this._array.length;
          h && !d || this._array.push(c);
          h || (this._set[a] = n);
        };
        c.prototype.has = function(c) {
          c = e.toSetString(c);
          return k.call(this._set, c);
        };
        c.prototype.indexOf = function(c) {
          var d = e.toSetString(c);
          if (k.call(this._set, d))
            return this._set[d];
          throw Error('"' + c + '" is not in the set.');
        };
        c.prototype.at = function(c) {
          if (0 <= c && c < this._array.length)
            return this._array[c];
          throw Error("No element indexed by " + c);
        };
        c.prototype.toArray = function() {
          return this._array.slice();
        };
        l.ArraySet = c;
      }, {"./util": 17}],
      9: [function(p, v, l) {
        var c = p("./base64");
        l.encode = function(e) {
          var k = "",
              r = 0 > e ? (-e << 1) + 1 : (e << 1) + 0;
          do
            e = r & 31, r >>>= 5, 0 < r && (e |= 32), k += c.encode(e);
 while (0 < r);
          return k;
        };
        l.decode = function(e, k, r) {
          var d = e.length,
              a = 0,
              h = 0,
              n,
              t;
          do {
            if (k >= d)
              throw Error("Expected more digits in base 64 VLQ value.");
            t = c.decode(e.charCodeAt(k++));
            if (-1 === t)
              throw Error("Invalid base64 digit: " + e.charAt(k - 1));
            n = !!(t & 32);
            t &= 31;
            a += t << h;
            h += 5;
          } while (n);
          e = a >> 1;
          r.value = 1 === (a & 1) ? -e : e;
          r.rest = k;
        };
      }, {"./base64": 10}],
      10: [function(p, v, l) {
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        l.encode = function(e) {
          if (0 <= e && e < c.length)
            return c[e];
          throw new TypeError("Must be between 0 and 63: " + e);
        };
        l.decode = function(c) {
          return 65 <= c && 90 >= c ? c - 65 : 97 <= c && 122 >= c ? c - 97 + 26 : 48 <= c && 57 >= c ? c - 48 + 52 : 43 == c ? 62 : 47 == c ? 63 : -1;
        };
      }, {}],
      11: [function(p, v, l) {
        function c(e, k, r, d, a, h) {
          var n = Math.floor((k - e) / 2) + e,
              t = a(r, d[n], !0);
          return 0 === t ? n : 0 < t ? 1 < k - n ? c(n, k, r, d, a, h) : h == l.LEAST_UPPER_BOUND ? k < d.length ? k : -1 : n : 1 < n - e ? c(e, n, r, d, a, h) : h == l.LEAST_UPPER_BOUND ? n : 0 > e ? -1 : e;
        }
        l.GREATEST_LOWER_BOUND = 1;
        l.LEAST_UPPER_BOUND = 2;
        l.search = function(e, k, r, d) {
          if (0 === k.length)
            return -1;
          e = c(-1, k.length, e, k, r, d || l.GREATEST_LOWER_BOUND);
          if (0 > e)
            return -1;
          for (; 0 <= e - 1 && 0 === r(k[e], k[e - 1], !0); )
            --e;
          return e;
        };
      }, {}],
      12: [function(p, v, l) {
        function c() {
          this._array = [];
          this._sorted = !0;
          this._last = {
            generatedLine: -1,
            generatedColumn: 0
          };
        }
        var e = p("./util");
        c.prototype.unsortedForEach = function(c, e) {
          this._array.forEach(c, e);
        };
        c.prototype.add = function(c) {
          var k = this._last,
              d = k.generatedLine,
              a = c.generatedLine,
              h = k.generatedColumn,
              n = c.generatedColumn;
          a > d || a == d && n >= h || 0 >= e.compareByGeneratedPositionsInflated(k, c) ? this._last = c : this._sorted = !1;
          this._array.push(c);
        };
        c.prototype.toArray = function() {
          this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0);
          return this._array;
        };
        l.MappingList = c;
      }, {"./util": 17}],
      13: [function(p, v, l) {
        function c(c, e, d) {
          var a = c[e];
          c[e] = c[d];
          c[d] = a;
        }
        function e(k, l, d, a) {
          if (d < a) {
            var h = d - 1;
            c(k, Math.round(d + Math.random() * (a - d)), a);
            for (var n = k[a],
                t = d; t < a; t++)
              0 >= l(k[t], n) && (h += 1, c(k, h, t));
            c(k, h + 1, t);
            h += 1;
            e(k, l, d, h - 1);
            e(k, l, h + 1, a);
          }
        }
        l.quickSort = function(c, l) {
          e(c, l, 0, c.length - 1);
        };
      }, {}],
      14: [function(p, v, l) {
        function c(b) {
          var a = b;
          "string" === typeof b && (a = JSON.parse(b.replace(/^\)\]\}'/, "")));
          return null != a.sections ? new r(a) : new e(a);
        }
        function e(b) {
          var a = b;
          "string" === typeof b && (a = JSON.parse(b.replace(/^\)\]\}'/, "")));
          b = d.getArg(a, "version");
          var c = d.getArg(a, "sources"),
              u = d.getArg(a, "names", []),
              e = d.getArg(a, "sourceRoot", null),
              n = d.getArg(a, "sourcesContent", null),
              t = d.getArg(a, "mappings"),
              a = d.getArg(a, "file", null);
          if (b != this._version)
            throw Error("Unsupported version: " + b);
          c = c.map(String).map(d.normalize).map(function(b) {
            return e && d.isAbsolute(e) && d.isAbsolute(b) ? d.relative(e, b) : b;
          });
          this._names = h.fromArray(u.map(String), !0);
          this._sources = h.fromArray(c, !0);
          this.sourceRoot = e;
          this.sourcesContent = n;
          this._mappings = t;
          this.file = a;
        }
        function k() {
          this.generatedColumn = this.generatedLine = 0;
          this.name = this.originalColumn = this.originalLine = this.source = null;
        }
        function r(b) {
          var a = b;
          "string" === typeof b && (a = JSON.parse(b.replace(/^\)\]\}'/, "")));
          b = d.getArg(a, "version");
          a = d.getArg(a, "sections");
          if (b != this._version)
            throw Error("Unsupported version: " + b);
          this._sources = new h;
          this._names = new h;
          var e = {
            line: -1,
            column: 0
          };
          this._sections = a.map(function(b) {
            if (b.url)
              throw Error("Support for url field in sections not implemented.");
            var a = d.getArg(b, "offset"),
                f = d.getArg(a, "line"),
                u = d.getArg(a, "column");
            if (f < e.line || f === e.line && u < e.column)
              throw Error("Section offsets must be ordered and non-overlapping.");
            e = a;
            return {
              generatedOffset: {
                generatedLine: f + 1,
                generatedColumn: u + 1
              },
              consumer: new c(d.getArg(b, "map"))
            };
          });
        }
        var d = p("./util"),
            a = p("./binary-search"),
            h = p("./array-set").ArraySet,
            n = p("./base64-vlq"),
            t = p("./quick-sort").quickSort;
        c.fromSourceMap = function(b) {
          return e.fromSourceMap(b);
        };
        c.prototype._version = 3;
        c.prototype.__generatedMappings = null;
        Object.defineProperty(c.prototype, "_generatedMappings", {get: function() {
            this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot);
            return this.__generatedMappings;
          }});
        c.prototype.__originalMappings = null;
        Object.defineProperty(c.prototype, "_originalMappings", {get: function() {
            this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot);
            return this.__originalMappings;
          }});
        c.prototype._charIsMappingSeparator = function(b, a) {
          var c = b.charAt(a);
          return ";" === c || "," === c;
        };
        c.prototype._parseMappings = function(b, a) {
          throw Error("Subclasses must implement _parseMappings");
        };
        c.GENERATED_ORDER = 1;
        c.ORIGINAL_ORDER = 2;
        c.GREATEST_LOWER_BOUND = 1;
        c.LEAST_UPPER_BOUND = 2;
        c.prototype.eachMapping = function(b, a, e) {
          a = a || null;
          switch (e || c.GENERATED_ORDER) {
            case c.GENERATED_ORDER:
              e = this._generatedMappings;
              break;
            case c.ORIGINAL_ORDER:
              e = this._originalMappings;
              break;
            default:
              throw Error("Unknown order of iteration.");
          }
          var f = this.sourceRoot;
          e.map(function(b) {
            var a = null === b.source ? null : this._sources.at(b.source);
            null != a && null != f && (a = d.join(f, a));
            return {
              source: a,
              generatedLine: b.generatedLine,
              generatedColumn: b.generatedColumn,
              originalLine: b.originalLine,
              originalColumn: b.originalColumn,
              name: null === b.name ? null : this._names.at(b.name)
            };
          }, this).forEach(b, a);
        };
        c.prototype.allGeneratedPositionsFor = function(b) {
          var c = d.getArg(b, "line"),
              e = {
                source: d.getArg(b, "source"),
                originalLine: c,
                originalColumn: d.getArg(b, "column", 0)
              };
          null != this.sourceRoot && (e.source = d.relative(this.sourceRoot, e.source));
          if (!this._sources.has(e.source))
            return [];
          e.source = this._sources.indexOf(e.source);
          var u = [],
              e = this._findMapping(e, this._originalMappings, "originalLine", "originalColumn", d.compareByOriginalPositions, a.LEAST_UPPER_BOUND);
          if (0 <= e) {
            var h = this._originalMappings[e];
            if (void 0 === b.column)
              for (c = h.originalLine; h && h.originalLine === c; )
                u.push({
                  line: d.getArg(h, "generatedLine", null),
                  column: d.getArg(h, "generatedColumn", null),
                  lastColumn: d.getArg(h, "lastGeneratedColumn", null)
                }), h = this._originalMappings[++e];
            else
              for (b = h.originalColumn; h && h.originalLine === c && h.originalColumn == b; )
                u.push({
                  line: d.getArg(h, "generatedLine", null),
                  column: d.getArg(h, "generatedColumn", null),
                  lastColumn: d.getArg(h, "lastGeneratedColumn", null)
                }), h = this._originalMappings[++e];
          }
          return u;
        };
        l.SourceMapConsumer = c;
        e.prototype = Object.create(c.prototype);
        e.prototype.consumer = c;
        e.fromSourceMap = function(b) {
          var a = Object.create(e.prototype),
              c = a._names = h.fromArray(b._names.toArray(), !0),
              u = a._sources = h.fromArray(b._sources.toArray(), !0);
          a.sourceRoot = b._sourceRoot;
          a.sourcesContent = b._generateSourcesContent(a._sources.toArray(), a.sourceRoot);
          a.file = b._file;
          b = b._mappings.toArray().slice();
          for (var n = a.__generatedMappings = [],
              l = a.__originalMappings = [],
              r = 0,
              p = b.length; r < p; r++) {
            var C = b[r],
                x = new k;
            x.generatedLine = C.generatedLine;
            x.generatedColumn = C.generatedColumn;
            C.source && (x.source = u.indexOf(C.source), x.originalLine = C.originalLine, x.originalColumn = C.originalColumn, C.name && (x.name = c.indexOf(C.name)), l.push(x));
            n.push(x);
          }
          t(a.__originalMappings, d.compareByOriginalPositions);
          return a;
        };
        e.prototype._version = 3;
        Object.defineProperty(e.prototype, "sources", {get: function() {
            return this._sources.toArray().map(function(b) {
              return null != this.sourceRoot ? d.join(this.sourceRoot, b) : b;
            }, this);
          }});
        e.prototype._parseMappings = function(b, a) {
          for (var c = 1,
              f = 0,
              e = 0,
              h = 0,
              l = 0,
              r = 0,
              p = b.length,
              x = 0,
              v = {},
              B = {},
              F = [],
              H = [],
              z,
              E,
              q,
              D,
              J; x < p; )
            if (";" === b.charAt(x))
              c++, x++, f = 0;
            else if ("," === b.charAt(x))
              x++;
            else {
              z = new k;
              z.generatedLine = c;
              for (D = x; D < p && !this._charIsMappingSeparator(b, D); D++)
                ;
              E = b.slice(x, D);
              if (q = v[E])
                x += E.length;
              else {
                for (q = []; x < D; )
                  n.decode(b, x, B), J = B.value, x = B.rest, q.push(J);
                if (2 === q.length)
                  throw Error("Found a source, but no line and column");
                if (3 === q.length)
                  throw Error("Found a source and line, but no column");
                v[E] = q;
              }
              z.generatedColumn = f + q[0];
              f = z.generatedColumn;
              1 < q.length && (z.source = l + q[1], l += q[1], z.originalLine = e + q[2], e = z.originalLine, z.originalLine += 1, z.originalColumn = h + q[3], h = z.originalColumn, 4 < q.length && (z.name = r + q[4], r += q[4]));
              H.push(z);
              "number" === typeof z.originalLine && F.push(z);
            }
          t(H, d.compareByGeneratedPositionsDeflated);
          this.__generatedMappings = H;
          t(F, d.compareByOriginalPositions);
          this.__originalMappings = F;
        };
        e.prototype._findMapping = function(b, c, d, e, h, n) {
          if (0 >= b[d])
            throw new TypeError("Line must be greater than or equal to 1, got " + b[d]);
          if (0 > b[e])
            throw new TypeError("Column must be greater than or equal to 0, got " + b[e]);
          return a.search(b, c, h, n);
        };
        e.prototype.computeColumnSpans = function() {
          for (var b = 0; b < this._generatedMappings.length; ++b) {
            var a = this._generatedMappings[b];
            if (b + 1 < this._generatedMappings.length) {
              var c = this._generatedMappings[b + 1];
              if (a.generatedLine === c.generatedLine) {
                a.lastGeneratedColumn = c.generatedColumn - 1;
                continue;
              }
            }
            a.lastGeneratedColumn = Infinity;
          }
        };
        e.prototype.originalPositionFor = function(b) {
          var a = {
            generatedLine: d.getArg(b, "line"),
            generatedColumn: d.getArg(b, "column")
          };
          b = this._findMapping(a, this._generatedMappings, "generatedLine", "generatedColumn", d.compareByGeneratedPositionsDeflated, d.getArg(b, "bias", c.GREATEST_LOWER_BOUND));
          if (0 <= b && (b = this._generatedMappings[b], b.generatedLine === a.generatedLine)) {
            a = d.getArg(b, "source", null);
            null !== a && (a = this._sources.at(a), null != this.sourceRoot && (a = d.join(this.sourceRoot, a)));
            var e = d.getArg(b, "name", null);
            null !== e && (e = this._names.at(e));
            return {
              source: a,
              line: d.getArg(b, "originalLine", null),
              column: d.getArg(b, "originalColumn", null),
              name: e
            };
          }
          return {
            source: null,
            line: null,
            column: null,
            name: null
          };
        };
        e.prototype.hasContentsOfAllSources = function() {
          return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(b) {
            return null == b;
          }) : !1;
        };
        e.prototype.sourceContentFor = function(b, a) {
          if (!this.sourcesContent)
            return null;
          null != this.sourceRoot && (b = d.relative(this.sourceRoot, b));
          if (this._sources.has(b))
            return this.sourcesContent[this._sources.indexOf(b)];
          var c;
          if (null != this.sourceRoot && (c = d.urlParse(this.sourceRoot))) {
            var f = b.replace(/^file:\/\//, "");
            if ("file" == c.scheme && this._sources.has(f))
              return this.sourcesContent[this._sources.indexOf(f)];
            if ((!c.path || "/" == c.path) && this._sources.has("/" + b))
              return this.sourcesContent[this._sources.indexOf("/" + b)];
          }
          if (a)
            return null;
          throw Error('"' + b + '" is not in the SourceMap.');
        };
        e.prototype.generatedPositionFor = function(b) {
          var a = d.getArg(b, "source");
          null != this.sourceRoot && (a = d.relative(this.sourceRoot, a));
          if (!this._sources.has(a))
            return {
              line: null,
              column: null,
              lastColumn: null
            };
          a = this._sources.indexOf(a);
          a = {
            source: a,
            originalLine: d.getArg(b, "line"),
            originalColumn: d.getArg(b, "column")
          };
          b = this._findMapping(a, this._originalMappings, "originalLine", "originalColumn", d.compareByOriginalPositions, d.getArg(b, "bias", c.GREATEST_LOWER_BOUND));
          return 0 <= b && (b = this._originalMappings[b], b.source === a.source) ? {
            line: d.getArg(b, "generatedLine", null),
            column: d.getArg(b, "generatedColumn", null),
            lastColumn: d.getArg(b, "lastGeneratedColumn", null)
          } : {
            line: null,
            column: null,
            lastColumn: null
          };
        };
        l.BasicSourceMapConsumer = e;
        r.prototype = Object.create(c.prototype);
        r.prototype.constructor = c;
        r.prototype._version = 3;
        Object.defineProperty(r.prototype, "sources", {get: function() {
            for (var a = [],
                c = 0; c < this._sections.length; c++)
              for (var d = 0; d < this._sections[c].consumer.sources.length; d++)
                a.push(this._sections[c].consumer.sources[d]);
            return a;
          }});
        r.prototype.originalPositionFor = function(b) {
          var c = {
            generatedLine: d.getArg(b, "line"),
            generatedColumn: d.getArg(b, "column")
          },
              e = a.search(c, this._sections, function(a, b) {
                var c = a.generatedLine - b.generatedOffset.generatedLine;
                return c ? c : a.generatedColumn - b.generatedOffset.generatedColumn;
              });
          return (e = this._sections[e]) ? e.consumer.originalPositionFor({
            line: c.generatedLine - (e.generatedOffset.generatedLine - 1),
            column: c.generatedColumn - (e.generatedOffset.generatedLine === c.generatedLine ? e.generatedOffset.generatedColumn - 1 : 0),
            bias: b.bias
          }) : {
            source: null,
            line: null,
            column: null,
            name: null
          };
        };
        r.prototype.hasContentsOfAllSources = function() {
          return this._sections.every(function(a) {
            return a.consumer.hasContentsOfAllSources();
          });
        };
        r.prototype.sourceContentFor = function(a, c) {
          for (var b = 0; b < this._sections.length; b++) {
            var f = this._sections[b].consumer.sourceContentFor(a, !0);
            if (f)
              return f;
          }
          if (c)
            return null;
          throw Error('"' + a + '" is not in the SourceMap.');
        };
        r.prototype.generatedPositionFor = function(a) {
          for (var b = 0; b < this._sections.length; b++) {
            var c = this._sections[b];
            if (-1 !== c.consumer.sources.indexOf(d.getArg(a, "source"))) {
              var e = c.consumer.generatedPositionFor(a);
              if (e)
                return {
                  line: e.line + (c.generatedOffset.generatedLine - 1),
                  column: e.column + (c.generatedOffset.generatedLine === e.line ? c.generatedOffset.generatedColumn - 1 : 0)
                };
            }
          }
          return {
            line: null,
            column: null
          };
        };
        r.prototype._parseMappings = function(a, c) {
          this.__generatedMappings = [];
          this.__originalMappings = [];
          for (var b = 0; b < this._sections.length; b++)
            for (var f = this._sections[b],
                e = f.consumer._generatedMappings,
                h = 0; h < e.length; h++) {
              var n = e[h],
                  k = f.consumer._sources.at(n.source);
              null !== f.consumer.sourceRoot && (k = d.join(f.consumer.sourceRoot, k));
              this._sources.add(k);
              var k = this._sources.indexOf(k),
                  l = f.consumer._names.at(n.name);
              this._names.add(l);
              l = this._names.indexOf(l);
              n = {
                source: k,
                generatedLine: n.generatedLine + (f.generatedOffset.generatedLine - 1),
                generatedColumn: n.generatedColumn + (f.generatedOffset.generatedLine === n.generatedLine ? f.generatedOffset.generatedColumn - 1 : 0),
                originalLine: n.originalLine,
                originalColumn: n.originalColumn,
                name: l
              };
              this.__generatedMappings.push(n);
              "number" === typeof n.originalLine && this.__originalMappings.push(n);
            }
          t(this.__generatedMappings, d.compareByGeneratedPositionsDeflated);
          t(this.__originalMappings, d.compareByOriginalPositions);
        };
        l.IndexedSourceMapConsumer = r;
      }, {
        "./array-set": 8,
        "./base64-vlq": 9,
        "./binary-search": 11,
        "./quick-sort": 13,
        "./util": 17
      }],
      15: [function(p, v, l) {
        function c(a) {
          a || (a = {});
          this._file = k.getArg(a, "file", null);
          this._sourceRoot = k.getArg(a, "sourceRoot", null);
          this._skipValidation = k.getArg(a, "skipValidation", !1);
          this._sources = new r;
          this._names = new r;
          this._mappings = new d;
          this._sourcesContents = null;
        }
        var e = p("./base64-vlq"),
            k = p("./util"),
            r = p("./array-set").ArraySet,
            d = p("./mapping-list").MappingList;
        c.prototype._version = 3;
        c.fromSourceMap = function(a) {
          var d = a.sourceRoot,
              e = new c({
                file: a.file,
                sourceRoot: d
              });
          a.eachMapping(function(a) {
            var b = {generated: {
                line: a.generatedLine,
                column: a.generatedColumn
              }};
            null != a.source && (b.source = a.source, null != d && (b.source = k.relative(d, b.source)), b.original = {
              line: a.originalLine,
              column: a.originalColumn
            }, null != a.name && (b.name = a.name));
            e.addMapping(b);
          });
          a.sources.forEach(function(c) {
            var b = a.sourceContentFor(c);
            null != b && e.setSourceContent(c, b);
          });
          return e;
        };
        c.prototype.addMapping = function(a) {
          var c = k.getArg(a, "generated"),
              d = k.getArg(a, "original", null),
              e = k.getArg(a, "source", null);
          a = k.getArg(a, "name", null);
          this._skipValidation || this._validateMapping(c, d, e, a);
          null != e && (e = String(e), this._sources.has(e) || this._sources.add(e));
          null != a && (a = String(a), this._names.has(a) || this._names.add(a));
          this._mappings.add({
            generatedLine: c.line,
            generatedColumn: c.column,
            originalLine: null != d && d.line,
            originalColumn: null != d && d.column,
            source: e,
            name: a
          });
        };
        c.prototype.setSourceContent = function(a, c) {
          var d = a;
          null != this._sourceRoot && (d = k.relative(this._sourceRoot, d));
          null != c ? (this._sourcesContents || (this._sourcesContents = Object.create(null)), this._sourcesContents[k.toSetString(d)] = c) : this._sourcesContents && (delete this._sourcesContents[k.toSetString(d)], 0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null));
        };
        c.prototype.applySourceMap = function(a, c, d) {
          var e = c;
          if (null == c) {
            if (null == a.file)
              throw Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
            e = a.file;
          }
          var b = this._sourceRoot;
          null != b && (e = k.relative(b, e));
          var f = new r,
              h = new r;
          this._mappings.unsortedForEach(function(c) {
            if (c.source === e && null != c.originalLine) {
              var n = a.originalPositionFor({
                line: c.originalLine,
                column: c.originalColumn
              });
              null != n.source && (c.source = n.source, null != d && (c.source = k.join(d, c.source)), null != b && (c.source = k.relative(b, c.source)), c.originalLine = n.line, c.originalColumn = n.column, null != n.name && (c.name = n.name));
            }
            n = c.source;
            null == n || f.has(n) || f.add(n);
            c = c.name;
            null == c || h.has(c) || h.add(c);
          }, this);
          this._sources = f;
          this._names = h;
          a.sources.forEach(function(c) {
            var f = a.sourceContentFor(c);
            null != f && (null != d && (c = k.join(d, c)), null != b && (c = k.relative(b, c)), this.setSourceContent(c, f));
          }, this);
        };
        c.prototype._validateMapping = function(a, c, d, e) {
          if (!(a && "line" in a && "column" in a && 0 < a.line && 0 <= a.column && !c && !d && !e || a && "line" in a && "column" in a && c && "line" in c && "column" in c && 0 < a.line && 0 <= a.column && 0 < c.line && 0 <= c.column && d))
            throw Error("Invalid mapping: " + JSON.stringify({
              generated: a,
              source: d,
              original: c,
              name: e
            }));
        };
        c.prototype._serializeMappings = function() {
          for (var a = 0,
              c = 1,
              d = 0,
              l = 0,
              b = 0,
              f = 0,
              r = "",
              u,
              p,
              I,
              A = this._mappings.toArray(),
              v = 0,
              C = A.length; v < C; v++) {
            p = A[v];
            u = "";
            if (p.generatedLine !== c)
              for (a = 0; p.generatedLine !== c; )
                u += ";", c++;
            else if (0 < v) {
              if (!k.compareByGeneratedPositionsInflated(p, A[v - 1]))
                continue;
              u += ",";
            }
            u += e.encode(p.generatedColumn - a);
            a = p.generatedColumn;
            null != p.source && (I = this._sources.indexOf(p.source), u += e.encode(I - f), f = I, u += e.encode(p.originalLine - 1 - l), l = p.originalLine - 1, u += e.encode(p.originalColumn - d), d = p.originalColumn, null != p.name && (p = this._names.indexOf(p.name), u += e.encode(p - b), b = p));
            r += u;
          }
          return r;
        };
        c.prototype._generateSourcesContent = function(a, c) {
          return a.map(function(a) {
            if (!this._sourcesContents)
              return null;
            null != c && (a = k.relative(c, a));
            a = k.toSetString(a);
            return Object.prototype.hasOwnProperty.call(this._sourcesContents, a) ? this._sourcesContents[a] : null;
          }, this);
        };
        c.prototype.toJSON = function() {
          var a = {
            version: this._version,
            sources: this._sources.toArray(),
            names: this._names.toArray(),
            mappings: this._serializeMappings()
          };
          null != this._file && (a.file = this._file);
          null != this._sourceRoot && (a.sourceRoot = this._sourceRoot);
          this._sourcesContents && (a.sourcesContent = this._generateSourcesContent(a.sources, a.sourceRoot));
          return a;
        };
        c.prototype.toString = function() {
          return JSON.stringify(this.toJSON());
        };
        l.SourceMapGenerator = c;
      }, {
        "./array-set": 8,
        "./base64-vlq": 9,
        "./mapping-list": 12,
        "./util": 17
      }],
      16: [function(p, v, l) {
        function c(c, a, e, n, k) {
          this.children = [];
          this.sourceContents = {};
          this.line = null == c ? null : c;
          this.column = null == a ? null : a;
          this.source = null == e ? null : e;
          this.name = null == k ? null : k;
          this.$$$isSourceNode$$$ = !0;
          null != n && this.add(n);
        }
        var e = p("./source-map-generator").SourceMapGenerator,
            k = p("./util"),
            r = /(\r?\n)/;
        c.fromStringWithSourceMap = function(d, a, e) {
          function h(a, b) {
            if (null === a || void 0 === a.source)
              l.add(b);
            else {
              var f = e ? k.join(e, a.source) : a.source;
              l.add(new c(a.originalLine, a.originalColumn, f, b, a.name));
            }
          }
          var l = new c,
              b = d.split(r),
              f = function() {
                var a = b.shift(),
                    c = b.shift() || "";
                return a + c;
              },
              p = 1,
              u = 0,
              v = null;
          a.eachMapping(function(a) {
            if (null !== v)
              if (p < a.generatedLine)
                h(v, f()), p++, u = 0;
              else {
                var c = b[0],
                    d = c.substr(0, a.generatedColumn - u);
                b[0] = c.substr(a.generatedColumn - u);
                u = a.generatedColumn;
                h(v, d);
                v = a;
                return;
              }
            for (; p < a.generatedLine; )
              l.add(f()), p++;
            u < a.generatedColumn && (c = b[0], l.add(c.substr(0, a.generatedColumn)), b[0] = c.substr(a.generatedColumn), u = a.generatedColumn);
            v = a;
          }, this);
          0 < b.length && (v && h(v, f()), l.add(b.join("")));
          a.sources.forEach(function(b) {
            var c = a.sourceContentFor(b);
            null != c && (null != e && (b = k.join(e, b)), l.setSourceContent(b, c));
          });
          return l;
        };
        c.prototype.add = function(c) {
          if (Array.isArray(c))
            c.forEach(function(a) {
              this.add(a);
            }, this);
          else if (c.$$$isSourceNode$$$ || "string" === typeof c)
            c && this.children.push(c);
          else
            throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + c);
          return this;
        };
        c.prototype.prepend = function(c) {
          if (Array.isArray(c))
            for (var a = c.length - 1; 0 <= a; a--)
              this.prepend(c[a]);
          else if (c.$$$isSourceNode$$$ || "string" === typeof c)
            this.children.unshift(c);
          else
            throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + c);
          return this;
        };
        c.prototype.walk = function(c) {
          for (var a,
              d = 0,
              e = this.children.length; d < e; d++)
            a = this.children[d], a.$$$isSourceNode$$$ ? a.walk(c) : "" !== a && c(a, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
        };
        c.prototype.join = function(c) {
          var a,
              d,
              e = this.children.length;
          if (0 < e) {
            a = [];
            for (d = 0; d < e - 1; d++)
              a.push(this.children[d]), a.push(c);
            a.push(this.children[d]);
            this.children = a;
          }
          return this;
        };
        c.prototype.replaceRight = function(c, a) {
          var d = this.children[this.children.length - 1];
          d.$$$isSourceNode$$$ ? d.replaceRight(c, a) : "string" === typeof d ? this.children[this.children.length - 1] = d.replace(c, a) : this.children.push("".replace(c, a));
          return this;
        };
        c.prototype.setSourceContent = function(c, a) {
          this.sourceContents[k.toSetString(c)] = a;
        };
        c.prototype.walkSourceContents = function(c) {
          for (var a = 0,
              d = this.children.length; a < d; a++)
            this.children[a].$$$isSourceNode$$$ && this.children[a].walkSourceContents(c);
          for (var e = Object.keys(this.sourceContents),
              a = 0,
              d = e.length; a < d; a++)
            c(k.fromSetString(e[a]), this.sourceContents[e[a]]);
        };
        c.prototype.toString = function() {
          var c = "";
          this.walk(function(a) {
            c += a;
          });
          return c;
        };
        c.prototype.toStringWithSourceMap = function(c) {
          var a = "",
              d = 1,
              k = 0,
              l = new e(c),
              b = !1,
              f = null,
              p = null,
              u = null,
              r = null;
          this.walk(function(c, e) {
            a += c;
            null !== e.source && null !== e.line && null !== e.column ? (f === e.source && p === e.line && u === e.column && r === e.name || l.addMapping({
              source: e.source,
              original: {
                line: e.line,
                column: e.column
              },
              generated: {
                line: d,
                column: k
              },
              name: e.name
            }), f = e.source, p = e.line, u = e.column, r = e.name, b = !0) : b && (l.addMapping({generated: {
                line: d,
                column: k
              }}), f = null, b = !1);
            for (var h = 0,
                n = c.length; h < n; h++)
              10 === c.charCodeAt(h) ? (d++, k = 0, h + 1 === n ? (f = null, b = !1) : b && l.addMapping({
                source: e.source,
                original: {
                  line: e.line,
                  column: e.column
                },
                generated: {
                  line: d,
                  column: k
                },
                name: e.name
              })) : k++;
          });
          this.walkSourceContents(function(a, b) {
            l.setSourceContent(a, b);
          });
          return {
            code: a,
            map: l
          };
        };
        l.SourceNode = c;
      }, {
        "./source-map-generator": 15,
        "./util": 17
      }],
      17: [function(p, v, l) {
        function c(a) {
          return (a = a.match(n)) ? {
            scheme: a[1],
            auth: a[2],
            host: a[3],
            port: a[4],
            path: a[5]
          } : null;
        }
        function e(a) {
          var b = "";
          a.scheme && (b += a.scheme + ":");
          b += "//";
          a.auth && (b += a.auth + "@");
          a.host && (b += a.host);
          a.port && (b += ":" + a.port);
          a.path && (b += a.path);
          return b;
        }
        function k(a) {
          var b = a,
              d = c(a);
          if (d) {
            if (!d.path)
              return a;
            b = d.path;
          }
          a = l.isAbsolute(b);
          for (var b = b.split(/\/+/),
              h,
              k = 0,
              n = b.length - 1; 0 <= n; n--)
            h = b[n], "." === h ? b.splice(n, 1) : ".." === h ? k++ : 0 < k && ("" === h ? (b.splice(n + 1, k), k = 0) : (b.splice(n, 2), k--));
          b = b.join("/");
          "" === b && (b = a ? "/" : ".");
          return d ? (d.path = b, e(d)) : b;
        }
        function r(a) {
          return a;
        }
        function d(a) {
          return h(a) ? "$" + a : a;
        }
        function a(a) {
          return h(a) ? a.slice(1) : a;
        }
        function h(a) {
          if (!a)
            return !1;
          var b = a.length;
          if (9 > b || 95 !== a.charCodeAt(b - 1) || 95 !== a.charCodeAt(b - 2) || 111 !== a.charCodeAt(b - 3) || 116 !== a.charCodeAt(b - 4) || 111 !== a.charCodeAt(b - 5) || 114 !== a.charCodeAt(b - 6) || 112 !== a.charCodeAt(b - 7) || 95 !== a.charCodeAt(b - 8) || 95 !== a.charCodeAt(b - 9))
            return !1;
          for (b -= 10; 0 <= b; b--)
            if (36 !== a.charCodeAt(b))
              return !1;
          return !0;
        }
        l.getArg = function(a, c, d) {
          if (c in a)
            return a[c];
          if (3 === arguments.length)
            return d;
          throw Error('"' + c + '" is a required argument.');
        };
        var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,
            t = /^data:.+\,.+$/;
        l.urlParse = c;
        l.urlGenerate = e;
        l.normalize = k;
        l.join = function(a, d) {
          "" === a && (a = ".");
          "" === d && (d = ".");
          var b = c(d),
              f = c(a);
          f && (a = f.path || "/");
          if (b && !b.scheme)
            return f && (b.scheme = f.scheme), e(b);
          if (b || d.match(t))
            return d;
          if (f && !f.host && !f.path)
            return f.host = d, e(f);
          b = "/" === d.charAt(0) ? d : k(a.replace(/\/+$/, "") + "/" + d);
          return f ? (f.path = b, e(f)) : b;
        };
        l.isAbsolute = function(a) {
          return "/" === a.charAt(0) || !!a.match(n);
        };
        l.relative = function(a, c) {
          "" === a && (a = ".");
          a = a.replace(/\/$/, "");
          for (var b = 0; 0 !== c.indexOf(a + "/"); ) {
            var d = a.lastIndexOf("/");
            if (0 > d)
              return c;
            a = a.slice(0, d);
            if (a.match(/^([^\/]+:\/)?\/*$/))
              return c;
            ++b;
          }
          return Array(b + 1).join("../") + c.substr(a.length + 1);
        };
        p = !("__proto__" in Object.create(null));
        l.toSetString = p ? r : d;
        l.fromSetString = p ? r : a;
        l.compareByOriginalPositions = function(a, c, d) {
          var b = a.source - c.source;
          if (0 !== b)
            return b;
          b = a.originalLine - c.originalLine;
          if (0 !== b)
            return b;
          b = a.originalColumn - c.originalColumn;
          if (0 !== b || d)
            return b;
          b = a.generatedColumn - c.generatedColumn;
          if (0 !== b)
            return b;
          b = a.generatedLine - c.generatedLine;
          return 0 !== b ? b : a.name - c.name;
        };
        l.compareByGeneratedPositionsDeflated = function(a, c, d) {
          var b = a.generatedLine - c.generatedLine;
          if (0 !== b)
            return b;
          b = a.generatedColumn - c.generatedColumn;
          if (0 !== b || d)
            return b;
          b = a.source - c.source;
          if (0 !== b)
            return b;
          b = a.originalLine - c.originalLine;
          if (0 !== b)
            return b;
          b = a.originalColumn - c.originalColumn;
          return 0 !== b ? b : a.name - c.name;
        };
        l.compareByGeneratedPositionsInflated = function(a, c) {
          var b = a.generatedLine - c.generatedLine;
          if (0 !== b)
            return b;
          b = a.generatedColumn - c.generatedColumn;
          if (0 !== b)
            return b;
          var b = a.source,
              d = c.source,
              b = b === d ? 0 : b > d ? 1 : -1;
          if (0 !== b)
            return b;
          b = a.originalLine - c.originalLine;
          if (0 !== b)
            return b;
          b = a.originalColumn - c.originalColumn;
          0 === b && (b = a.name, d = c.name, b = b === d ? 0 : b > d ? 1 : -1);
          return b;
        };
      }, {}],
      18: [function(p, v, l) {
        l.SourceMapGenerator = p("./lib/source-map-generator").SourceMapGenerator;
        l.SourceMapConsumer = p("./lib/source-map-consumer").SourceMapConsumer;
        l.SourceNode = p("./lib/source-node").SourceNode;
      }, {
        "./lib/source-map-consumer": 14,
        "./lib/source-map-generator": 15,
        "./lib/source-node": 16
      }],
      19: [function(p, v, l) {
        (function(c, e) {
          function k() {
            return "browser" === K ? !0 : "node" === K ? !1 : "undefined" !== typeof window && "function" === typeof XMLHttpRequest && !(window.require && window.module && window.process && "renderer" === window.process.type);
          }
          function r(a) {
            return function(b) {
              for (var c = 0; c < a.length; c++) {
                var d = a[c](b);
                if (d)
                  return d;
              }
              return null;
            };
          }
          function d(a, b) {
            if (!a)
              return b;
            var c = I.dirname(a),
                d = /^\w+:\/\/[^\/]*/.exec(c),
                d = d ? d[0] : "";
            return d + I.resolve(c.slice(d.length), b);
          }
          function a(a) {
            var b = F[a.source];
            if (!b) {
              var c = D(a.source);
              c ? (b = F[a.source] = {
                url: c.url,
                map: new M(c.map)
              }, b.map.sourcesContent && b.map.sources.forEach(function(a, c) {
                var g = b.map.sourcesContent[c];
                if (g) {
                  var e = d(b.url, a);
                  B[e] = g;
                }
              })) : b = F[a.source] = {
                url: null,
                map: null
              };
            }
            return b && b.map && (c = b.map.originalPositionFor(a), null !== c.source) ? (c.source = d(b.url, c.source), c) : a;
          }
          function h(b) {
            var c = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(b);
            return c ? (b = a({
              source: c[2],
              line: +c[3],
              column: c[4] - 1
            }), "eval at " + c[1] + " (" + b.source + ":" + b.line + ":" + (b.column + 1) + ")") : (c = /^eval at ([^(]+) \((.+)\)$/.exec(b)) ? "eval at " + c[1] + " (" + h(c[2]) + ")" : b;
          }
          function n() {
            var a,
                b = "";
            this.isNative() ? b = "native" : (a = this.getScriptNameOrSourceURL(), !a && this.isEval() && (b = this.getEvalOrigin(), b += ", "), b = a ? b + a : b + "<anonymous>", a = this.getLineNumber(), null != a && (b += ":" + a, (a = this.getColumnNumber()) && (b += ":" + a)));
            a = "";
            var c = this.getFunctionName(),
                d = !0,
                e = this.isConstructor();
            if (this.isToplevel() || e)
              e ? a += "new " + (c || "<anonymous>") : c ? a += c : (a += b, d = !1);
            else {
              e = this.getTypeName();
              "[object Object]" === e && (e = "null");
              var f = this.getMethodName();
              c ? (e && 0 != c.indexOf(e) && (a += e + "."), a += c, f && c.indexOf("." + f) != c.length - f.length - 1 && (a += " [as " + f + "]")) : a += e + "." + (f || "<anonymous>");
            }
            d && (a += " (" + b + ")");
            return a;
          }
          function t(a) {
            var b = {};
            Object.getOwnPropertyNames(Object.getPrototypeOf(a)).forEach(function(c) {
              b[c] = /^(?:is|get)/.test(c) ? function() {
                return a[c].call(a);
              } : a[c];
            });
            b.toString = n;
            return b;
          }
          function b(b) {
            if (b.isNative())
              return b;
            var c = b.getFileName() || b.getScriptNameOrSourceURL();
            if (c) {
              var d = b.getLineNumber(),
                  e = b.getColumnNumber() - 1;
              1 !== d || k() || b.isEval() || (e -= 62);
              var f = a({
                source: c,
                line: d,
                column: e
              });
              b = t(b);
              b.getFileName = function() {
                return f.source;
              };
              b.getLineNumber = function() {
                return f.line;
              };
              b.getColumnNumber = function() {
                return f.column + 1;
              };
              b.getScriptNameOrSourceURL = function() {
                return f.source;
              };
              return b;
            }
            var l = b.isEval() && b.getEvalOrigin();
            l && (l = h(l), b = t(b), b.getEvalOrigin = function() {
              return l;
            });
            return b;
          }
          function f(a, c) {
            x && (B = {}, F = {});
            return a + c.map(function(a) {
              return "\n    at " + b(a);
            }).join("");
          }
          function v(a) {
            var b = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(a.stack);
            if (b) {
              a = b[1];
              var c = +b[2],
                  b = +b[3],
                  d = B[a];
              !d && A && A.existsSync(a) && (d = A.readFileSync(a, "utf8"));
              if (d && (d = d.split(/(?:\r\n|\r|\n)/)[c - 1]))
                return a + ":" + c + "\n" + d + "\n" + Array(b).join(" ") + "^";
            }
            return null;
          }
          function u() {
            var a = c.emit;
            c.emit = function(b) {
              if ("uncaughtException" === b) {
                var d = arguments[1] && arguments[1].stack,
                    e = 0 < this.listeners(b).length;
                if (d && !e) {
                  d = arguments[1];
                  if (e = v(d))
                    console.error(), console.error(e);
                  console.error(d.stack);
                  c.exit(1);
                  return;
                }
              }
              return a.apply(this, arguments);
            };
          }
          var M = p("source-map").SourceMapConsumer,
              I = p("path"),
              A;
          try {
            A = p("fs"), A.existsSync && A.readFileSync || (A = null);
          } catch (J) {}
          var L = !1,
              C = !1,
              x = !1,
              K = "auto",
              B = {},
              F = {},
              H = /^data:application\/json[^,]+base64,/,
              z = [],
              E = [],
              q = r(z);
          z.push(function(a) {
            a = a.trim();
            if (a in B)
              return B[a];
            var b = null;
            if (A)
              A.existsSync(a) && (b = A.readFileSync(a, "utf8"));
            else {
              var c = new XMLHttpRequest;
              c.open("GET", a, !1);
              c.send(null);
              b = null;
              4 === c.readyState && 200 === c.status && (b = c.responseText);
            }
            return B[a] = b;
          });
          var D = r(E);
          E.push(function(a) {
            var b;
            a: {
              if (k())
                try {
                  var c = new XMLHttpRequest;
                  c.open("GET", a, !1);
                  c.send(null);
                  var f = c.getResponseHeader("SourceMap") || c.getResponseHeader("X-SourceMap");
                  if (f) {
                    b = f;
                    break a;
                  }
                } catch (P) {
                  b = null;
                  break a;
                }
              b = q(a);
              for (var c = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/)[ \t]*$)/mg,
                  h; f = c.exec(b); )
                h = f;
              b = h ? h[1] : null;
            }
            if (!b)
              return null;
            H.test(b) ? (h = b.slice(b.indexOf(",") + 1), h = (new e(h, "base64")).toString(), b = a) : (b = d(a, b), h = q(b));
            return h ? {
              url: b,
              map: h
            } : null;
          });
          l.wrapCallSite = b;
          l.getErrorSource = v;
          l.mapSourcePosition = a;
          l.retrieveSourceMap = D;
          l.install = function(a) {
            a = a || {};
            if (a.environment && (K = a.environment, -1 === ["node", "browser", "auto"].indexOf(K)))
              throw Error("environment " + K + " was unknown. Available options are {auto, browser, node}");
            a.retrieveFile && (a.overrideRetrieveFile && (z.length = 0), z.unshift(a.retrieveFile));
            a.retrieveSourceMap && (a.overrideRetrieveSourceMap && (E.length = 0), E.unshift(a.retrieveSourceMap));
            if (a.hookRequire && !k()) {
              var b;
              try {
                b = p("module");
              } catch (m) {}
              var d = b.prototype._compile;
              d.__sourceMapSupport || (b.prototype._compile = function(a, b) {
                B[b] = a;
                F[b] = void 0;
                return d.call(this, a, b);
              }, b.prototype._compile.__sourceMapSupport = !0);
            }
            x || (x = "emptyCacheBetweenOperations" in a ? a.emptyCacheBetweenOperations : !1);
            L || (L = !0, Error.prepareStackTrace = f);
            !C && ("handleUncaughtExceptions" in a ? a.handleUncaughtExceptions : 1) && "object" === typeof c && null !== c && "function" === typeof c.on && (C = !0, u());
          };
        }).call(this, p("node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), p("buffer").Buffer);
      }, {
        "node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 6,
        buffer: 3,
        fs: 2,
        module: 2,
        path: 7,
        "source-map": 18
      }]
    }, {}, [1]);
    return N;
  });
})(require('buffer').Buffer, require('process'));
