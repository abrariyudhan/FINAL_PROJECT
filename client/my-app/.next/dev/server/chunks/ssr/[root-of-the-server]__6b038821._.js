module.exports = [
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/mongodb)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb-6bba9c9eeacf53d7", () => require("mongodb-6bba9c9eeacf53d7"));

module.exports = mod;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compare",
    ()=>compare,
    "compareSync",
    ()=>compareSync,
    "decodeBase64",
    ()=>decodeBase64,
    "default",
    ()=>__TURBOPACK__default__export__,
    "encodeBase64",
    ()=>encodeBase64,
    "genSalt",
    ()=>genSalt,
    "genSaltSync",
    ()=>genSaltSync,
    "getRounds",
    ()=>getRounds,
    "getSalt",
    ()=>getSalt,
    "hash",
    ()=>hash,
    "hashSync",
    ()=>hashSync,
    "setRandomFallback",
    ()=>setRandomFallback,
    "truncates",
    ()=>truncates
]);
/*
 Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
 Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
 Copyright (c) 2025 Daniel Wirtz <dcode@dcode.io>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ // The Node.js crypto module is used as a fallback for the Web Crypto API. When
// building for the browser, inclusion of the crypto module should be disabled,
// which the package hints at in its package.json for bundlers that support it.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
/**
 * The random implementation to use as a fallback.
 * @type {?function(number):!Array.<number>}
 * @inner
 */ var randomFallback = null;
/**
 * Generates cryptographically secure random bytes.
 * @function
 * @param {number} len Bytes length
 * @returns {!Array.<number>} Random bytes
 * @throws {Error} If no random implementation is available
 * @inner
 */ function randomBytes(len) {
    // Web Crypto API. Globally available in the browser and in Node.js >=23.
    try {
        return crypto.getRandomValues(new Uint8Array(len));
    } catch  {}
    // Node.js crypto module for non-browser environments.
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(len);
    } catch  {}
    // Custom fallback specified with `setRandomFallback`.
    if (!randomFallback) {
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
    }
    return randomFallback(len);
}
function setRandomFallback(random) {
    randomFallback = random;
}
function genSaltSync(rounds, seed_length) {
    rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof rounds !== "number") throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
    if (rounds < 4) rounds = 4;
    else if (rounds > 31) rounds = 31;
    var salt = [];
    salt.push("$2b$");
    if (rounds < 10) salt.push("0");
    salt.push(rounds.toString());
    salt.push("$");
    salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
    return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
    if (typeof seed_length === "function") callback = seed_length, seed_length = undefined; // Not supported.
    if (typeof rounds === "function") callback = rounds, rounds = undefined;
    if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
    else if (typeof rounds !== "number") throw Error("illegal arguments: " + typeof rounds);
    function _async(callback) {
        nextTick(function() {
            // Pretty thin, but salting is fast enough
            try {
                callback(null, genSaltSync(rounds));
            } catch (err) {
                callback(err);
            }
        });
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function hashSync(password, salt) {
    if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof salt === "number") salt = genSaltSync(salt);
    if (typeof password !== "string" || typeof salt !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
    return _hash(password, salt);
}
function hash(password, salt, callback, progressCallback) {
    function _async(callback) {
        if (typeof password === "string" && typeof salt === "number") genSalt(salt, function(err, salt) {
            _hash(password, salt, callback, progressCallback);
        });
        else if (typeof password === "string" && typeof salt === "string") _hash(password, salt, callback, progressCallback);
        else nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof salt)));
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
/**
 * Compares two strings of the same length in constant time.
 * @param {string} known Must be of the correct length
 * @param {string} unknown Must be the same length as `known`
 * @returns {boolean}
 * @inner
 */ function safeStringCompare(known, unknown) {
    var diff = known.length ^ unknown.length;
    for(var i = 0; i < known.length; ++i){
        diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
    }
    return diff === 0;
}
function compareSync(password, hash) {
    if (typeof password !== "string" || typeof hash !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
    if (hash.length !== 60) return false;
    return safeStringCompare(hashSync(password, hash.substring(0, hash.length - 31)), hash);
}
function compare(password, hashValue, callback, progressCallback) {
    function _async(callback) {
        if (typeof password !== "string" || typeof hashValue !== "string") {
            nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof hashValue)));
            return;
        }
        if (hashValue.length !== 60) {
            nextTick(callback.bind(this, null, false));
            return;
        }
        hash(password, hashValue.substring(0, 29), function(err, comp) {
            if (err) callback(err);
            else callback(null, safeStringCompare(comp, hashValue));
        }, progressCallback);
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function getRounds(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    return parseInt(hash.split("$")[2], 10);
}
function getSalt(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    if (hash.length !== 60) throw Error("Illegal hash length: " + hash.length + " != 60");
    return hash.substring(0, 29);
}
function truncates(password) {
    if (typeof password !== "string") throw Error("Illegal arguments: " + typeof password);
    return utf8Length(password) > 72;
}
/**
 * Continues with the callback after yielding to the event loop.
 * @function
 * @param {function(...[*])} callback Callback to execute
 * @inner
 */ var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
/** Calculates the byte length of a string encoded as UTF8. */ function utf8Length(string) {
    var len = 0, c = 0;
    for(var i = 0; i < string.length; ++i){
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 0xfc00) === 0xd800 && (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            ++i;
            len += 4;
        } else len += 3;
    }
    return len;
}
/** Converts a string to an array of UTF8 bytes. */ function utf8Array(string) {
    var offset = 0, c1, c2;
    var buffer = new Array(utf8Length(string));
    for(var i = 0, k = string.length; i < k; ++i){
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 0xfc00) === 0xd800 && ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00) {
            c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        }
    }
    return buffer;
}
// A base64 implementation for the bcrypt algorithm. This is partly non-standard.
/**
 * bcrypt's own non-standard base64 dictionary.
 * @type {!Array.<string>}
 * @const
 * @inner
 **/ var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
/**
 * @type {!Array.<number>}
 * @const
 * @inner
 **/ var BASE64_INDEX = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    -1,
    -1,
    -1,
    -1,
    -1
];
/**
 * Encodes a byte array to base64 with up to len bytes of input.
 * @param {!Array.<number>} b Byte array
 * @param {number} len Maximum input length
 * @returns {string}
 * @inner
 */ function base64_encode(b, len) {
    var off = 0, rs = [], c1, c2;
    if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
    while(off < len){
        c1 = b[off++] & 0xff;
        rs.push(BASE64_CODE[c1 >> 2 & 0x3f]);
        c1 = (c1 & 0x03) << 4;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 4 & 0x0f;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        c1 = (c2 & 0x0f) << 2;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 6 & 0x03;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        rs.push(BASE64_CODE[c2 & 0x3f]);
    }
    return rs.join("");
}
/**
 * Decodes a base64 encoded string to up to len bytes of output.
 * @param {string} s String to decode
 * @param {number} len Maximum output length
 * @returns {!Array.<number>}
 * @inner
 */ function base64_decode(s, len) {
    var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
    if (len <= 0) throw Error("Illegal len: " + len);
    while(off < slen - 1 && olen < len){
        code = s.charCodeAt(off++);
        c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        code = s.charCodeAt(off++);
        c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c1 == -1 || c2 == -1) break;
        o = c1 << 2 >>> 0;
        o |= (c2 & 0x30) >> 4;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c3 == -1) break;
        o = (c2 & 0x0f) << 4 >>> 0;
        o |= (c3 & 0x3c) >> 2;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        o = (c3 & 0x03) << 6 >>> 0;
        o |= c4;
        rs.push(String.fromCharCode(o));
        ++olen;
    }
    var res = [];
    for(off = 0; off < olen; off++)res.push(rs[off].charCodeAt(0));
    return res;
}
/**
 * @type {number}
 * @const
 * @inner
 */ var BCRYPT_SALT_LEN = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
/**
 * @type {number}
 * @const
 * @inner
 */ var BLOWFISH_NUM_ROUNDS = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var MAX_EXECUTION_TIME = 100;
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var P_ORIG = [
    0x243f6a88,
    0x85a308d3,
    0x13198a2e,
    0x03707344,
    0xa4093822,
    0x299f31d0,
    0x082efa98,
    0xec4e6c89,
    0x452821e6,
    0x38d01377,
    0xbe5466cf,
    0x34e90c6c,
    0xc0ac29b7,
    0xc97c50dd,
    0x3f84d5b5,
    0xb5470917,
    0x9216d5d9,
    0x8979fb1b
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var S_ORIG = [
    0xd1310ba6,
    0x98dfb5ac,
    0x2ffd72db,
    0xd01adfb7,
    0xb8e1afed,
    0x6a267e96,
    0xba7c9045,
    0xf12c7f99,
    0x24a19947,
    0xb3916cf7,
    0x0801f2e2,
    0x858efc16,
    0x636920d8,
    0x71574e69,
    0xa458fea3,
    0xf4933d7e,
    0x0d95748f,
    0x728eb658,
    0x718bcd58,
    0x82154aee,
    0x7b54a41d,
    0xc25a59b5,
    0x9c30d539,
    0x2af26013,
    0xc5d1b023,
    0x286085f0,
    0xca417918,
    0xb8db38ef,
    0x8e79dcb0,
    0x603a180e,
    0x6c9e0e8b,
    0xb01e8a3e,
    0xd71577c1,
    0xbd314b27,
    0x78af2fda,
    0x55605c60,
    0xe65525f3,
    0xaa55ab94,
    0x57489862,
    0x63e81440,
    0x55ca396a,
    0x2aab10b6,
    0xb4cc5c34,
    0x1141e8ce,
    0xa15486af,
    0x7c72e993,
    0xb3ee1411,
    0x636fbc2a,
    0x2ba9c55d,
    0x741831f6,
    0xce5c3e16,
    0x9b87931e,
    0xafd6ba33,
    0x6c24cf5c,
    0x7a325381,
    0x28958677,
    0x3b8f4898,
    0x6b4bb9af,
    0xc4bfe81b,
    0x66282193,
    0x61d809cc,
    0xfb21a991,
    0x487cac60,
    0x5dec8032,
    0xef845d5d,
    0xe98575b1,
    0xdc262302,
    0xeb651b88,
    0x23893e81,
    0xd396acc5,
    0x0f6d6ff3,
    0x83f44239,
    0x2e0b4482,
    0xa4842004,
    0x69c8f04a,
    0x9e1f9b5e,
    0x21c66842,
    0xf6e96c9a,
    0x670c9c61,
    0xabd388f0,
    0x6a51a0d2,
    0xd8542f68,
    0x960fa728,
    0xab5133a3,
    0x6eef0b6c,
    0x137a3be4,
    0xba3bf050,
    0x7efb2a98,
    0xa1f1651d,
    0x39af0176,
    0x66ca593e,
    0x82430e88,
    0x8cee8619,
    0x456f9fb4,
    0x7d84a5c3,
    0x3b8b5ebe,
    0xe06f75d8,
    0x85c12073,
    0x401a449f,
    0x56c16aa6,
    0x4ed3aa62,
    0x363f7706,
    0x1bfedf72,
    0x429b023d,
    0x37d0d724,
    0xd00a1248,
    0xdb0fead3,
    0x49f1c09b,
    0x075372c9,
    0x80991b7b,
    0x25d479d8,
    0xf6e8def7,
    0xe3fe501a,
    0xb6794c3b,
    0x976ce0bd,
    0x04c006ba,
    0xc1a94fb6,
    0x409f60c4,
    0x5e5c9ec2,
    0x196a2463,
    0x68fb6faf,
    0x3e6c53b5,
    0x1339b2eb,
    0x3b52ec6f,
    0x6dfc511f,
    0x9b30952c,
    0xcc814544,
    0xaf5ebd09,
    0xbee3d004,
    0xde334afd,
    0x660f2807,
    0x192e4bb3,
    0xc0cba857,
    0x45c8740f,
    0xd20b5f39,
    0xb9d3fbdb,
    0x5579c0bd,
    0x1a60320a,
    0xd6a100c6,
    0x402c7279,
    0x679f25fe,
    0xfb1fa3cc,
    0x8ea5e9f8,
    0xdb3222f8,
    0x3c7516df,
    0xfd616b15,
    0x2f501ec8,
    0xad0552ab,
    0x323db5fa,
    0xfd238760,
    0x53317b48,
    0x3e00df82,
    0x9e5c57bb,
    0xca6f8ca0,
    0x1a87562e,
    0xdf1769db,
    0xd542a8f6,
    0x287effc3,
    0xac6732c6,
    0x8c4f5573,
    0x695b27b0,
    0xbbca58c8,
    0xe1ffa35d,
    0xb8f011a0,
    0x10fa3d98,
    0xfd2183b8,
    0x4afcb56c,
    0x2dd1d35b,
    0x9a53e479,
    0xb6f84565,
    0xd28e49bc,
    0x4bfb9790,
    0xe1ddf2da,
    0xa4cb7e33,
    0x62fb1341,
    0xcee4c6e8,
    0xef20cada,
    0x36774c01,
    0xd07e9efe,
    0x2bf11fb4,
    0x95dbda4d,
    0xae909198,
    0xeaad8e71,
    0x6b93d5a0,
    0xd08ed1d0,
    0xafc725e0,
    0x8e3c5b2f,
    0x8e7594b7,
    0x8ff6e2fb,
    0xf2122b64,
    0x8888b812,
    0x900df01c,
    0x4fad5ea0,
    0x688fc31c,
    0xd1cff191,
    0xb3a8c1ad,
    0x2f2f2218,
    0xbe0e1777,
    0xea752dfe,
    0x8b021fa1,
    0xe5a0cc0f,
    0xb56f74e8,
    0x18acf3d6,
    0xce89e299,
    0xb4a84fe0,
    0xfd13e0b7,
    0x7cc43b81,
    0xd2ada8d9,
    0x165fa266,
    0x80957705,
    0x93cc7314,
    0x211a1477,
    0xe6ad2065,
    0x77b5fa86,
    0xc75442f5,
    0xfb9d35cf,
    0xebcdaf0c,
    0x7b3e89a0,
    0xd6411bd3,
    0xae1e7e49,
    0x00250e2d,
    0x2071b35e,
    0x226800bb,
    0x57b8e0af,
    0x2464369b,
    0xf009b91e,
    0x5563911d,
    0x59dfa6aa,
    0x78c14389,
    0xd95a537f,
    0x207d5ba2,
    0x02e5b9c5,
    0x83260376,
    0x6295cfa9,
    0x11c81968,
    0x4e734a41,
    0xb3472dca,
    0x7b14a94a,
    0x1b510052,
    0x9a532915,
    0xd60f573f,
    0xbc9bc6e4,
    0x2b60a476,
    0x81e67400,
    0x08ba6fb5,
    0x571be91f,
    0xf296ec6b,
    0x2a0dd915,
    0xb6636521,
    0xe7b9f9b6,
    0xff34052e,
    0xc5855664,
    0x53b02d5d,
    0xa99f8fa1,
    0x08ba4799,
    0x6e85076a,
    0x4b7a70e9,
    0xb5b32944,
    0xdb75092e,
    0xc4192623,
    0xad6ea6b0,
    0x49a7df7d,
    0x9cee60b8,
    0x8fedb266,
    0xecaa8c71,
    0x699a17ff,
    0x5664526c,
    0xc2b19ee1,
    0x193602a5,
    0x75094c29,
    0xa0591340,
    0xe4183a3e,
    0x3f54989a,
    0x5b429d65,
    0x6b8fe4d6,
    0x99f73fd6,
    0xa1d29c07,
    0xefe830f5,
    0x4d2d38e6,
    0xf0255dc1,
    0x4cdd2086,
    0x8470eb26,
    0x6382e9c6,
    0x021ecc5e,
    0x09686b3f,
    0x3ebaefc9,
    0x3c971814,
    0x6b6a70a1,
    0x687f3584,
    0x52a0e286,
    0xb79c5305,
    0xaa500737,
    0x3e07841c,
    0x7fdeae5c,
    0x8e7d44ec,
    0x5716f2b8,
    0xb03ada37,
    0xf0500c0d,
    0xf01c1f04,
    0x0200b3ff,
    0xae0cf51a,
    0x3cb574b2,
    0x25837a58,
    0xdc0921bd,
    0xd19113f9,
    0x7ca92ff6,
    0x94324773,
    0x22f54701,
    0x3ae5e581,
    0x37c2dadc,
    0xc8b57634,
    0x9af3dda7,
    0xa9446146,
    0x0fd0030e,
    0xecc8c73e,
    0xa4751e41,
    0xe238cd99,
    0x3bea0e2f,
    0x3280bba1,
    0x183eb331,
    0x4e548b38,
    0x4f6db908,
    0x6f420d03,
    0xf60a04bf,
    0x2cb81290,
    0x24977c79,
    0x5679b072,
    0xbcaf89af,
    0xde9a771f,
    0xd9930810,
    0xb38bae12,
    0xdccf3f2e,
    0x5512721f,
    0x2e6b7124,
    0x501adde6,
    0x9f84cd87,
    0x7a584718,
    0x7408da17,
    0xbc9f9abc,
    0xe94b7d8c,
    0xec7aec3a,
    0xdb851dfa,
    0x63094366,
    0xc464c3d2,
    0xef1c1847,
    0x3215d908,
    0xdd433b37,
    0x24c2ba16,
    0x12a14d43,
    0x2a65c451,
    0x50940002,
    0x133ae4dd,
    0x71dff89e,
    0x10314e55,
    0x81ac77d6,
    0x5f11199b,
    0x043556f1,
    0xd7a3c76b,
    0x3c11183b,
    0x5924a509,
    0xf28fe6ed,
    0x97f1fbfa,
    0x9ebabf2c,
    0x1e153c6e,
    0x86e34570,
    0xeae96fb1,
    0x860e5e0a,
    0x5a3e2ab3,
    0x771fe71c,
    0x4e3d06fa,
    0x2965dcb9,
    0x99e71d0f,
    0x803e89d6,
    0x5266c825,
    0x2e4cc978,
    0x9c10b36a,
    0xc6150eba,
    0x94e2ea78,
    0xa5fc3c53,
    0x1e0a2df4,
    0xf2f74ea7,
    0x361d2b3d,
    0x1939260f,
    0x19c27960,
    0x5223a708,
    0xf71312b6,
    0xebadfe6e,
    0xeac31f66,
    0xe3bc4595,
    0xa67bc883,
    0xb17f37d1,
    0x018cff28,
    0xc332ddef,
    0xbe6c5aa5,
    0x65582185,
    0x68ab9802,
    0xeecea50f,
    0xdb2f953b,
    0x2aef7dad,
    0x5b6e2f84,
    0x1521b628,
    0x29076170,
    0xecdd4775,
    0x619f1510,
    0x13cca830,
    0xeb61bd96,
    0x0334fe1e,
    0xaa0363cf,
    0xb5735c90,
    0x4c70a239,
    0xd59e9e0b,
    0xcbaade14,
    0xeecc86bc,
    0x60622ca7,
    0x9cab5cab,
    0xb2f3846e,
    0x648b1eaf,
    0x19bdf0ca,
    0xa02369b9,
    0x655abb50,
    0x40685a32,
    0x3c2ab4b3,
    0x319ee9d5,
    0xc021b8f7,
    0x9b540b19,
    0x875fa099,
    0x95f7997e,
    0x623d7da8,
    0xf837889a,
    0x97e32d77,
    0x11ed935f,
    0x16681281,
    0x0e358829,
    0xc7e61fd6,
    0x96dedfa1,
    0x7858ba99,
    0x57f584a5,
    0x1b227263,
    0x9b83c3ff,
    0x1ac24696,
    0xcdb30aeb,
    0x532e3054,
    0x8fd948e4,
    0x6dbc3128,
    0x58ebf2ef,
    0x34c6ffea,
    0xfe28ed61,
    0xee7c3c73,
    0x5d4a14d9,
    0xe864b7e3,
    0x42105d14,
    0x203e13e0,
    0x45eee2b6,
    0xa3aaabea,
    0xdb6c4f15,
    0xfacb4fd0,
    0xc742f442,
    0xef6abbb5,
    0x654f3b1d,
    0x41cd2105,
    0xd81e799e,
    0x86854dc7,
    0xe44b476a,
    0x3d816250,
    0xcf62a1f2,
    0x5b8d2646,
    0xfc8883a0,
    0xc1c7b6a3,
    0x7f1524c3,
    0x69cb7492,
    0x47848a0b,
    0x5692b285,
    0x095bbf00,
    0xad19489d,
    0x1462b174,
    0x23820e00,
    0x58428d2a,
    0x0c55f5ea,
    0x1dadf43e,
    0x233f7061,
    0x3372f092,
    0x8d937e41,
    0xd65fecf1,
    0x6c223bdb,
    0x7cde3759,
    0xcbee7460,
    0x4085f2a7,
    0xce77326e,
    0xa6078084,
    0x19f8509e,
    0xe8efd855,
    0x61d99735,
    0xa969a7aa,
    0xc50c06c2,
    0x5a04abfc,
    0x800bcadc,
    0x9e447a2e,
    0xc3453484,
    0xfdd56705,
    0x0e1e9ec9,
    0xdb73dbd3,
    0x105588cd,
    0x675fda79,
    0xe3674340,
    0xc5c43465,
    0x713e38d8,
    0x3d28f89e,
    0xf16dff20,
    0x153e21e7,
    0x8fb03d4a,
    0xe6e39f2b,
    0xdb83adf7,
    0xe93d5a68,
    0x948140f7,
    0xf64c261c,
    0x94692934,
    0x411520f7,
    0x7602d4f7,
    0xbcf46b2e,
    0xd4a20068,
    0xd4082471,
    0x3320f46a,
    0x43b7d4b7,
    0x500061af,
    0x1e39f62e,
    0x97244546,
    0x14214f74,
    0xbf8b8840,
    0x4d95fc1d,
    0x96b591af,
    0x70f4ddd3,
    0x66a02f45,
    0xbfbc09ec,
    0x03bd9785,
    0x7fac6dd0,
    0x31cb8504,
    0x96eb27b3,
    0x55fd3941,
    0xda2547e6,
    0xabca0a9a,
    0x28507825,
    0x530429f4,
    0x0a2c86da,
    0xe9b66dfb,
    0x68dc1462,
    0xd7486900,
    0x680ec0a4,
    0x27a18dee,
    0x4f3ffea2,
    0xe887ad8c,
    0xb58ce006,
    0x7af4d6b6,
    0xaace1e7c,
    0xd3375fec,
    0xce78a399,
    0x406b2a42,
    0x20fe9e35,
    0xd9f385b9,
    0xee39d7ab,
    0x3b124e8b,
    0x1dc9faf7,
    0x4b6d1856,
    0x26a36631,
    0xeae397b2,
    0x3a6efa74,
    0xdd5b4332,
    0x6841e7f7,
    0xca7820fb,
    0xfb0af54e,
    0xd8feb397,
    0x454056ac,
    0xba489527,
    0x55533a3a,
    0x20838d87,
    0xfe6ba9b7,
    0xd096954b,
    0x55a867bc,
    0xa1159a58,
    0xcca92963,
    0x99e1db33,
    0xa62a4a56,
    0x3f3125f9,
    0x5ef47e1c,
    0x9029317c,
    0xfdf8e802,
    0x04272f70,
    0x80bb155c,
    0x05282ce3,
    0x95c11548,
    0xe4c66d22,
    0x48c1133f,
    0xc70f86dc,
    0x07f9c9ee,
    0x41041f0f,
    0x404779a4,
    0x5d886e17,
    0x325f51eb,
    0xd59bc0d1,
    0xf2bcc18f,
    0x41113564,
    0x257b7834,
    0x602a9c60,
    0xdff8e8a3,
    0x1f636c1b,
    0x0e12b4c2,
    0x02e1329e,
    0xaf664fd1,
    0xcad18115,
    0x6b2395e0,
    0x333e92e1,
    0x3b240b62,
    0xeebeb922,
    0x85b2a20e,
    0xe6ba0d99,
    0xde720c8c,
    0x2da2f728,
    0xd0127845,
    0x95b794fd,
    0x647d0862,
    0xe7ccf5f0,
    0x5449a36f,
    0x877d48fa,
    0xc39dfd27,
    0xf33e8d1e,
    0x0a476341,
    0x992eff74,
    0x3a6f6eab,
    0xf4f8fd37,
    0xa812dc60,
    0xa1ebddf8,
    0x991be14c,
    0xdb6e6b0d,
    0xc67b5510,
    0x6d672c37,
    0x2765d43b,
    0xdcd0e804,
    0xf1290dc7,
    0xcc00ffa3,
    0xb5390f92,
    0x690fed0b,
    0x667b9ffb,
    0xcedb7d9c,
    0xa091cf0b,
    0xd9155ea3,
    0xbb132f88,
    0x515bad24,
    0x7b9479bf,
    0x763bd6eb,
    0x37392eb3,
    0xcc115979,
    0x8026e297,
    0xf42e312d,
    0x6842ada7,
    0xc66a2b3b,
    0x12754ccc,
    0x782ef11c,
    0x6a124237,
    0xb79251e7,
    0x06a1bbe6,
    0x4bfb6350,
    0x1a6b1018,
    0x11caedfa,
    0x3d25bdd8,
    0xe2e1c3c9,
    0x44421659,
    0x0a121386,
    0xd90cec6e,
    0xd5abea2a,
    0x64af674e,
    0xda86a85f,
    0xbebfe988,
    0x64e4c3fe,
    0x9dbc8057,
    0xf0f7c086,
    0x60787bf8,
    0x6003604d,
    0xd1fd8346,
    0xf6381fb0,
    0x7745ae04,
    0xd736fccc,
    0x83426b33,
    0xf01eab71,
    0xb0804187,
    0x3c005e5f,
    0x77a057be,
    0xbde8ae24,
    0x55464299,
    0xbf582e61,
    0x4e58f48f,
    0xf2ddfda2,
    0xf474ef38,
    0x8789bdc2,
    0x5366f9c3,
    0xc8b38e74,
    0xb475f255,
    0x46fcd9b9,
    0x7aeb2661,
    0x8b1ddf84,
    0x846a0e79,
    0x915f95e2,
    0x466e598e,
    0x20b45770,
    0x8cd55591,
    0xc902de4c,
    0xb90bace1,
    0xbb8205d0,
    0x11a86248,
    0x7574a99e,
    0xb77f19b6,
    0xe0a9dc09,
    0x662d09a1,
    0xc4324633,
    0xe85a1f02,
    0x09f0be8c,
    0x4a99a025,
    0x1d6efe10,
    0x1ab93d1d,
    0x0ba5a4df,
    0xa186f20f,
    0x2868f169,
    0xdcb7da83,
    0x573906fe,
    0xa1e2ce9b,
    0x4fcd7f52,
    0x50115e01,
    0xa70683fa,
    0xa002b5c4,
    0x0de6d027,
    0x9af88c27,
    0x773f8641,
    0xc3604c06,
    0x61a806b5,
    0xf0177a28,
    0xc0f586e0,
    0x006058aa,
    0x30dc7d62,
    0x11e69ed7,
    0x2338ea63,
    0x53c2dd94,
    0xc2c21634,
    0xbbcbee56,
    0x90bcb6de,
    0xebfc7da1,
    0xce591d76,
    0x6f05e409,
    0x4b7c0188,
    0x39720a3d,
    0x7c927c24,
    0x86e3725f,
    0x724d9db9,
    0x1ac15bb4,
    0xd39eb8fc,
    0xed545578,
    0x08fca5b5,
    0xd83d7cd3,
    0x4dad0fc4,
    0x1e50ef5e,
    0xb161e6f8,
    0xa28514d9,
    0x6c51133c,
    0x6fd5c7e7,
    0x56e14ec4,
    0x362abfce,
    0xddc6c837,
    0xd79a3234,
    0x92638212,
    0x670efa8e,
    0x406000e0,
    0x3a39ce37,
    0xd3faf5cf,
    0xabc27737,
    0x5ac52d1b,
    0x5cb0679e,
    0x4fa33742,
    0xd3822740,
    0x99bc9bbe,
    0xd5118e9d,
    0xbf0f7315,
    0xd62d1c7e,
    0xc700c47b,
    0xb78c1b6b,
    0x21a19045,
    0xb26eb1be,
    0x6a366eb4,
    0x5748ab2f,
    0xbc946e79,
    0xc6a376d2,
    0x6549c2c8,
    0x530ff8ee,
    0x468dde7d,
    0xd5730a1d,
    0x4cd04dc6,
    0x2939bbdb,
    0xa9ba4650,
    0xac9526e8,
    0xbe5ee304,
    0xa1fad5f0,
    0x6a2d519a,
    0x63ef8ce2,
    0x9a86ee22,
    0xc089c2b8,
    0x43242ef6,
    0xa51e03aa,
    0x9cf2d0a4,
    0x83c061ba,
    0x9be96a4d,
    0x8fe51550,
    0xba645bd6,
    0x2826a2f9,
    0xa73a3ae1,
    0x4ba99586,
    0xef5562e9,
    0xc72fefd3,
    0xf752f7da,
    0x3f046f69,
    0x77fa0a59,
    0x80e4a915,
    0x87b08601,
    0x9b09e6ad,
    0x3b3ee593,
    0xe990fd5a,
    0x9e34d797,
    0x2cf0b7d9,
    0x022b8b51,
    0x96d5ac3a,
    0x017da67d,
    0xd1cf3ed6,
    0x7c7d2d28,
    0x1f9f25cf,
    0xadf2b89b,
    0x5ad6b472,
    0x5a88f54c,
    0xe029ac71,
    0xe019a5e6,
    0x47b0acfd,
    0xed93fa9b,
    0xe8d3c48d,
    0x283b57cc,
    0xf8d56629,
    0x79132e28,
    0x785f0191,
    0xed756055,
    0xf7960e44,
    0xe3d35e8c,
    0x15056dd4,
    0x88f46dba,
    0x03a16125,
    0x0564f0bd,
    0xc3eb9e15,
    0x3c9057a2,
    0x97271aec,
    0xa93a072a,
    0x1b3f6d9b,
    0x1e6321f5,
    0xf59c66fb,
    0x26dcf319,
    0x7533d928,
    0xb155fdf5,
    0x03563482,
    0x8aba3cbb,
    0x28517711,
    0xc20ad9f8,
    0xabcc5167,
    0xccad925f,
    0x4de81751,
    0x3830dc8e,
    0x379d5862,
    0x9320f991,
    0xea7a90c2,
    0xfb3e7bce,
    0x5121ce64,
    0x774fbe32,
    0xa8b6e37e,
    0xc3293d46,
    0x48de5369,
    0x6413e680,
    0xa2ae0810,
    0xdd6db224,
    0x69852dfd,
    0x09072166,
    0xb39a460a,
    0x6445c0dd,
    0x586cdecf,
    0x1c20c8ae,
    0x5bbef7dd,
    0x1b588d40,
    0xccd2017f,
    0x6bb4e3bb,
    0xdda26a7e,
    0x3a59ff45,
    0x3e350a44,
    0xbcb4cdd5,
    0x72eacea8,
    0xfa6484bb,
    0x8d6612ae,
    0xbf3c6f47,
    0xd29be463,
    0x542f5d9e,
    0xaec2771b,
    0xf64e6370,
    0x740e0d8d,
    0xe75b1357,
    0xf8721671,
    0xaf537d5d,
    0x4040cb08,
    0x4eb4e2cc,
    0x34d2466a,
    0x0115af84,
    0xe1b00428,
    0x95983a1d,
    0x06b89fb4,
    0xce6ea048,
    0x6f3f3b82,
    0x3520ab82,
    0x011a1d4b,
    0x277227f8,
    0x611560b1,
    0xe7933fdc,
    0xbb3a792b,
    0x344525bd,
    0xa08839e1,
    0x51ce794b,
    0x2f32c9b7,
    0xa01fbac9,
    0xe01cc87e,
    0xbcc7d1f6,
    0xcf0111c3,
    0xa1e8aac7,
    0x1a908749,
    0xd44fbd9a,
    0xd0dadecb,
    0xd50ada38,
    0x0339c32a,
    0xc6913667,
    0x8df9317c,
    0xe0b12b4f,
    0xf79e59b7,
    0x43f5bb3a,
    0xf2d519ff,
    0x27d9459c,
    0xbf97222c,
    0x15e6fc2a,
    0x0f91fc71,
    0x9b941525,
    0xfae59361,
    0xceb69ceb,
    0xc2a86459,
    0x12baa8d1,
    0xb6c1075e,
    0xe3056a0c,
    0x10d25065,
    0xcb03a442,
    0xe0ec6e0e,
    0x1698db3b,
    0x4c98a0be,
    0x3278e964,
    0x9f1f9532,
    0xe0d392df,
    0xd3a0342b,
    0x8971f21e,
    0x1b0a7441,
    0x4ba3348c,
    0xc5be7120,
    0xc37632d8,
    0xdf359f8d,
    0x9b992f2e,
    0xe60b6f47,
    0x0fe3f11d,
    0xe54cda54,
    0x1edad891,
    0xce6279cf,
    0xcd3e7e6f,
    0x1618b166,
    0xfd2c1d05,
    0x848fd2c5,
    0xf6fb2299,
    0xf523f357,
    0xa6327623,
    0x93a83531,
    0x56cccd02,
    0xacf08162,
    0x5a75ebb5,
    0x6e163697,
    0x88d273cc,
    0xde966292,
    0x81b949d0,
    0x4c50901b,
    0x71c65614,
    0xe6c6c7bd,
    0x327a140a,
    0x45e1d006,
    0xc3f27b9a,
    0xc9aa53fd,
    0x62a80f00,
    0xbb25bfe2,
    0x35bdd2f6,
    0x71126905,
    0xb2040222,
    0xb6cbcf7c,
    0xcd769c2b,
    0x53113ec0,
    0x1640e3d3,
    0x38abbd60,
    0x2547adf0,
    0xba38209c,
    0xf746ce76,
    0x77afa1c5,
    0x20756060,
    0x85cbfe4e,
    0x8ae88dd8,
    0x7aaaf9b0,
    0x4cf9aa7e,
    0x1948c25c,
    0x02fb8a8c,
    0x01c36ae4,
    0xd6ebe1f9,
    0x90d4f869,
    0xa65cdea0,
    0x3f09252d,
    0xc208e69f,
    0xb74e6132,
    0xce77e25b,
    0x578fdfe3,
    0x3ac372e6
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var C_ORIG = [
    0x4f727068,
    0x65616e42,
    0x65686f6c,
    0x64657253,
    0x63727944,
    0x6f756274
];
/**
 * @param {Array.<number>} lr
 * @param {number} off
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @returns {Array.<number>}
 * @inner
 */ function _encipher(lr, off, P, S) {
    // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
    var n, l = lr[off], r = lr[off + 1];
    l ^= P[0];
    /*
    for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
        // Feistel substitution on left word
        n  = S[l >>> 24],
        n += S[0x100 | ((l >> 16) & 0xff)],
        n ^= S[0x200 | ((l >> 8) & 0xff)],
        n += S[0x300 | (l & 0xff)],
        r ^= n ^ P[++i],
        // Feistel substitution on right word
        n  = S[r >>> 24],
        n += S[0x100 | ((r >> 16) & 0xff)],
        n ^= S[0x200 | ((r >> 8) & 0xff)],
        n += S[0x300 | (r & 0xff)],
        l ^= n ^ P[++i];
    */ //The following is an unrolled version of the above loop.
    //Iteration 0
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[1];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[2];
    //Iteration 1
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[3];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[4];
    //Iteration 2
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[5];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[6];
    //Iteration 3
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[7];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[8];
    //Iteration 4
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[9];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[10];
    //Iteration 5
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[11];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[12];
    //Iteration 6
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[13];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[14];
    //Iteration 7
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[15];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[16];
    lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
    lr[off + 1] = l;
    return lr;
}
/**
 * @param {Array.<number>} data
 * @param {number} offp
 * @returns {{key: number, offp: number}}
 * @inner
 */ function _streamtoword(data, offp) {
    for(var i = 0, word = 0; i < 4; ++i)word = word << 8 | data[offp] & 0xff, offp = (offp + 1) % data.length;
    return {
        key: word,
        offp: offp
    };
}
/**
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _key(key, P, S) {
    var offset = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
    for(i = 0; i < plen; i += 2)lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Expensive key schedule Blowfish.
 * @param {Array.<number>} data
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _ekskey(data, key, P, S) {
    var offp = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
    offp = 0;
    for(i = 0; i < plen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Internaly crypts a string.
 * @param {Array.<number>} b Bytes to crypt
 * @param {Array.<number>} salt Salt bytes to use
 * @param {number} rounds Number of rounds
 * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
 *  omitted, the operation will be performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _crypt(b, salt, rounds, callback, progressCallback) {
    var cdata = C_ORIG.slice(), clen = cdata.length, err;
    // Validate
    if (rounds < 4 || rounds > 31) {
        err = Error("Illegal number of rounds (4-31): " + rounds);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.length !== BCRYPT_SALT_LEN) {
        err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    rounds = 1 << rounds >>> 0;
    var P, S, i = 0, j;
    //Use typed arrays when available - huge speedup!
    if (typeof Int32Array === "function") {
        P = new Int32Array(P_ORIG);
        S = new Int32Array(S_ORIG);
    } else {
        P = P_ORIG.slice();
        S = S_ORIG.slice();
    }
    _ekskey(salt, b, P, S);
    /**
   * Calcualtes the next round.
   * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
   * @inner
   */ function next() {
        if (progressCallback) progressCallback(i / rounds);
        if (i < rounds) {
            var start = Date.now();
            for(; i < rounds;){
                i = i + 1;
                _key(b, P, S);
                _key(salt, P, S);
                if (Date.now() - start > MAX_EXECUTION_TIME) break;
            }
        } else {
            for(i = 0; i < 64; i++)for(j = 0; j < clen >> 1; j++)_encipher(cdata, j << 1, P, S);
            var ret = [];
            for(i = 0; i < clen; i++)ret.push((cdata[i] >> 24 & 0xff) >>> 0), ret.push((cdata[i] >> 16 & 0xff) >>> 0), ret.push((cdata[i] >> 8 & 0xff) >>> 0), ret.push((cdata[i] & 0xff) >>> 0);
            if (callback) {
                callback(null, ret);
                return;
            } else return ret;
        }
        if (callback) nextTick(next);
    }
    // Async
    if (typeof callback !== "undefined") {
        next();
    // Sync
    } else {
        var res;
        while(true)if (typeof (res = next()) !== "undefined") return res || [];
    }
}
/**
 * Internally hashes a password.
 * @param {string} password Password to hash
 * @param {?string} salt Salt to use, actually never null
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
 *  hashing is performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _hash(password, salt, callback, progressCallback) {
    var err;
    if (typeof password !== "string" || typeof salt !== "string") {
        err = Error("Invalid string / salt: Not a string");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    // Validate the salt
    var minor, offset;
    if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
        err = Error("Invalid salt version: " + salt.substring(0, 2));
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
    else {
        minor = salt.charAt(2);
        if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        offset = 4;
    }
    // Extract number of rounds
    if (salt.charAt(offset + 2) > "$") {
        err = Error("Missing salt rounds");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
    password += minor >= "a" ? "\x00" : "";
    var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
    /**
   * Finishes hashing.
   * @param {Array.<number>} bytes Byte array
   * @returns {string}
   * @inner
   */ function finish(bytes) {
        var res = [];
        res.push("$2");
        if (minor >= "a") res.push(minor);
        res.push("$");
        if (rounds < 10) res.push("0");
        res.push(rounds.toString());
        res.push("$");
        res.push(base64_encode(saltb, saltb.length));
        res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
        return res.join("");
    }
    // Sync
    if (typeof callback == "undefined") return finish(_crypt(passwordb, saltb, rounds));
    else {
        _crypt(passwordb, saltb, rounds, function(err, bytes) {
            if (err) callback(err, null);
            else callback(null, finish(bytes));
        }, progressCallback);
    }
}
function encodeBase64(bytes, length) {
    return base64_encode(bytes, length);
}
function decodeBase64(string, length) {
    return base64_decode(string, length);
}
const __TURBOPACK__default__export__ = {
    setRandomFallback,
    genSaltSync,
    genSalt,
    hashSync,
    hash,
    compareSync,
    compare,
    getRounds,
    getSalt,
    truncates,
    encodeBase64,
    decodeBase64
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/data-stream.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module, process*/ var Buffer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)").Buffer;
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function DataStream(data) {
    this.buffer = null;
    this.writable = true;
    this.readable = true;
    // No input
    if (!data) {
        this.buffer = Buffer.alloc(0);
        return this;
    }
    // Stream
    if (typeof data.pipe === 'function') {
        this.buffer = Buffer.alloc(0);
        data.pipe(this);
        return this;
    }
    // Buffer or String
    // or Object (assumedly a passworded key)
    if (data.length || typeof data === 'object') {
        this.buffer = data;
        this.writable = false;
        process.nextTick((function() {
            this.emit('end', data);
            this.readable = false;
            this.emit('close');
        }).bind(this));
        return this;
    }
    throw new TypeError('Unexpected data type (' + typeof data + ')');
}
util.inherits(DataStream, Stream);
DataStream.prototype.write = function write(data) {
    this.buffer = Buffer.concat([
        this.buffer,
        Buffer.from(data)
    ]);
    this.emit('data', data);
};
DataStream.prototype.end = function end(data) {
    if (data) this.write(data);
    this.emit('end', data);
    this.emit('close');
    this.writable = false;
    this.readable = false;
};
module.exports = DataStream;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function getParamSize(keySize) {
    var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
    return result;
}
var paramBytesForAlg = {
    ES256: getParamSize(256),
    ES384: getParamSize(384),
    ES512: getParamSize(521)
};
function getParamBytesForAlg(alg) {
    var paramBytes = paramBytesForAlg[alg];
    if (paramBytes) {
        return paramBytes;
    }
    throw new Error('Unknown algorithm "' + alg + '"');
}
module.exports = getParamBytesForAlg;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Buffer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)").Buffer;
var getParamBytesForAlg = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-rsc] (ecmascript)");
var MAX_OCTET = 0x80, CLASS_UNIVERSAL = 0, PRIMITIVE_BIT = 0x20, TAG_SEQ = 0x10, TAG_INT = 0x02, ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6, ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
function base64Url(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function signatureAsBuffer(signature) {
    if (Buffer.isBuffer(signature)) {
        return signature;
    } else if ('string' === typeof signature) {
        return Buffer.from(signature, 'base64');
    }
    throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}
function derToJose(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    // the DER encoded param should at most be the param size, plus a padding
    // zero, since due to being a signed integer
    var maxEncodedParamLength = paramBytes + 1;
    var inputLength = signature.length;
    var offset = 0;
    if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
    }
    var seqLength = signature[offset++];
    if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
    }
    if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
    }
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
    }
    var rLength = signature[offset++];
    if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
    }
    if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var rOffset = offset;
    offset += rLength;
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
    }
    var sLength = signature[offset++];
    if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
    }
    if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var sOffset = offset;
    offset += sLength;
    if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
    }
    var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
    var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);
    for(offset = 0; offset < rPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
    offset = paramBytes;
    for(var o = offset; offset < o + sPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
    dst = dst.toString('base64');
    dst = base64Url(dst);
    return dst;
}
function countPadding(buf, start, stop) {
    var padding = 0;
    while(start + padding < stop && buf[start + padding] === 0){
        ++padding;
    }
    var needsSign = buf[start + padding] >= MAX_OCTET;
    if (needsSign) {
        --padding;
    }
    return padding;
}
function joseToDer(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    var signatureBytes = signature.length;
    if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
    }
    var rPadding = countPadding(signature, 0, paramBytes);
    var sPadding = countPadding(signature, paramBytes, signature.length);
    var rLength = paramBytes - rPadding;
    var sLength = paramBytes - sPadding;
    var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
    var shortLength = rsBytes < MAX_OCTET;
    var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
    var offset = 0;
    dst[offset++] = ENCODED_TAG_SEQ;
    if (shortLength) {
        // Bit 8 has value "0"
        // bits 7-1 give the length.
        dst[offset++] = rsBytes;
    } else {
        // Bit 8 of first octet has value "1"
        // bits 7-1 give the number of additional length octets.
        dst[offset++] = MAX_OCTET | 1;
        // length, base 256
        dst[offset++] = rsBytes & 0xff;
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = rLength;
    if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
    } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = sLength;
    if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
    } else {
        signature.copy(dst, offset, paramBytes + sPadding);
    }
    return dst;
}
module.exports = {
    derToJose: derToJose,
    joseToDer: joseToDer
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/buffer-equal-constant-time/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*jshint node:true */ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer; // browserify
var SlowBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").SlowBuffer;
module.exports = bufferEq;
function bufferEq(a, b) {
    // shortcutting on type is necessary for correctness
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        return false;
    }
    // buffer sizes should be well-known information, so despite this
    // shortcutting, it doesn't leak any information about the *contents* of the
    // buffers.
    if (a.length !== b.length) {
        return false;
    }
    var c = 0;
    for(var i = 0; i < a.length; i++){
        /*jshint bitwise:false */ c |= a[i] ^ b[i]; // XOR
    }
    return c === 0;
}
bufferEq.install = function() {
    Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
    };
};
var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
    Buffer.prototype.equal = origBufEqual;
    SlowBuffer.prototype.equal = origSlowBufEqual;
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jwa/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Buffer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)").Buffer;
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var formatEcdsa = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-rsc] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';
var supportsKeyObjects = typeof crypto.createPublicKey === 'function';
if (supportsKeyObjects) {
    MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
    MSG_INVALID_SECRET += 'or a KeyObject';
}
function checkIsPublicKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.type !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.asymmetricKeyType !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
}
;
function checkIsPrivateKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (typeof key === 'object') {
        return;
    }
    throw typeError(MSG_INVALID_SIGNER_KEY);
}
;
function checkIsSecretKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return key;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (key.type !== 'secret') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_SECRET);
    }
}
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function toBase64(base64url) {
    base64url = base64url.toString();
    var padding = 4 - base64url.length % 4;
    if (padding !== 4) {
        for(var i = 0; i < padding; ++i){
            base64url += '=';
        }
    }
    return base64url.replace(/\-/g, '+').replace(/_/g, '/');
}
function typeError(template) {
    var args = [].slice.call(arguments, 1);
    var errMsg = util.format.bind(util, template).apply(null, args);
    return new TypeError(errMsg);
}
function bufferOrString(obj) {
    return Buffer.isBuffer(obj) || typeof obj === 'string';
}
function normalizeInput(thing) {
    if (!bufferOrString(thing)) thing = JSON.stringify(thing);
    return thing;
}
function createHmacSigner(bits) {
    return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac('sha' + bits, secret);
        var sig = (hmac.update(thing), hmac.digest('base64'));
        return fromBase64(sig);
    };
}
var bufferEqual;
var timingSafeEqual = 'timingSafeEqual' in crypto ? function timingSafeEqual(a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    return crypto.timingSafeEqual(a, b);
} : function timingSafeEqual(a, b) {
    if (!bufferEqual) {
        bufferEqual = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/buffer-equal-constant-time/index.js [app-rsc] (ecmascript)");
    }
    return bufferEqual(a, b);
};
function createHmacVerifier(bits) {
    return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSig));
    };
}
function createKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        // Even though we are specifying "RSA" here, this works with ECDSA
        // keys as well.
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
        return fromBase64(sig);
    };
}
function createKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, 'base64');
    };
}
function createPSSKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, 'base64'));
        return fromBase64(sig);
    };
}
function createPSSKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, 'base64');
    };
}
function createECDSASigner(bits) {
    var inner = createKeySigner(bits);
    return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, 'ES' + bits);
        return signature;
    };
}
function createECDSAVerifer(bits) {
    var inner = createKeyVerifier(bits);
    return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
        var result = inner(thing, signature, publicKey);
        return result;
    };
}
function createNoneSigner() {
    return function sign() {
        return '';
    };
}
function createNoneVerifier() {
    return function verify(thing, signature) {
        return signature === '';
    };
}
module.exports = function jwa(algorithm) {
    var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
    };
    var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
    };
    var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
    if (!match) throw typeError(MSG_INVALID_ALGORITHM, algorithm);
    var algo = (match[1] || match[3]).toLowerCase();
    var bits = match[2];
    return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
    };
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/tostring.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
module.exports = function toString(obj) {
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || Buffer.isBuffer(obj)) return obj.toString();
    return JSON.stringify(obj);
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/sign-stream.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/data-stream.js [app-rsc] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jwa/index.js [app-rsc] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/tostring.js [app-rsc] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function base64url(string, encoding) {
    return Buffer.from(string, encoding).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function jwsSecuredInput(header, payload, encoding) {
    encoding = encoding || 'utf8';
    var encodedHeader = base64url(toString(header), 'binary');
    var encodedPayload = base64url(toString(payload), encoding);
    return util.format('%s.%s', encodedHeader, encodedPayload);
}
function jwsSign(opts) {
    var header = opts.header;
    var payload = opts.payload;
    var secretOrKey = opts.secret || opts.privateKey;
    var encoding = opts.encoding;
    var algo = jwa(header.alg);
    var securedInput = jwsSecuredInput(header, payload, encoding);
    var signature = algo.sign(securedInput, secretOrKey);
    return util.format('%s.%s', securedInput, signature);
}
function SignStream(opts) {
    var secret = opts.secret;
    secret = secret == null ? opts.privateKey : secret;
    secret = secret == null ? opts.key : secret;
    if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError('secret must be a string or buffer or a KeyObject');
    }
    var secretStream = new DataStream(secret);
    this.readable = true;
    this.header = opts.header;
    this.encoding = opts.encoding;
    this.secret = this.privateKey = this.key = secretStream;
    this.payload = new DataStream(opts.payload);
    this.secret.once('close', (function() {
        if (!this.payload.writable && this.readable) this.sign();
    }).bind(this));
    this.payload.once('close', (function() {
        if (!this.secret.writable && this.readable) this.sign();
    }).bind(this));
}
util.inherits(SignStream, Stream);
SignStream.prototype.sign = function sign() {
    try {
        var signature = jwsSign({
            header: this.header,
            payload: this.payload.buffer,
            secret: this.secret.buffer,
            encoding: this.encoding
        });
        this.emit('done', signature);
        this.emit('data', signature);
        this.emit('end');
        this.readable = false;
        return signature;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
SignStream.sign = jwsSign;
module.exports = SignStream;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/verify-stream.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/safe-buffer/index.js [app-rsc] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/data-stream.js [app-rsc] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jwa/index.js [app-rsc] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/tostring.js [app-rsc] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
function isObject(thing) {
    return Object.prototype.toString.call(thing) === '[object Object]';
}
function safeJsonParse(thing) {
    if (isObject(thing)) return thing;
    try {
        return JSON.parse(thing);
    } catch (e) {
        return undefined;
    }
}
function headerFromJWS(jwsSig) {
    var encodedHeader = jwsSig.split('.', 1)[0];
    return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}
function securedInputFromJWS(jwsSig) {
    return jwsSig.split('.', 2).join('.');
}
function signatureFromJWS(jwsSig) {
    return jwsSig.split('.')[2];
}
function payloadFromJWS(jwsSig, encoding) {
    encoding = encoding || 'utf8';
    var payload = jwsSig.split('.')[1];
    return Buffer.from(payload, 'base64').toString(encoding);
}
function isValidJws(string) {
    return JWS_REGEX.test(string) && !!headerFromJWS(string);
}
function jwsVerify(jwsSig, algorithm, secretOrKey) {
    if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
    }
    jwsSig = toString(jwsSig);
    var signature = signatureFromJWS(jwsSig);
    var securedInput = securedInputFromJWS(jwsSig);
    var algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
}
function jwsDecode(jwsSig, opts) {
    opts = opts || {};
    jwsSig = toString(jwsSig);
    if (!isValidJws(jwsSig)) return null;
    var header = headerFromJWS(jwsSig);
    if (!header) return null;
    var payload = payloadFromJWS(jwsSig);
    if (header.typ === 'JWT' || opts.json) payload = JSON.parse(payload, opts.encoding);
    return {
        header: header,
        payload: payload,
        signature: signatureFromJWS(jwsSig)
    };
}
function VerifyStream(opts) {
    opts = opts || {};
    var secretOrKey = opts.secret;
    secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
    secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
    if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError('secret must be a string or buffer or a KeyObject');
    }
    var secretStream = new DataStream(secretOrKey);
    this.readable = true;
    this.algorithm = opts.algorithm;
    this.encoding = opts.encoding;
    this.secret = this.publicKey = this.key = secretStream;
    this.signature = new DataStream(opts.signature);
    this.secret.once('close', (function() {
        if (!this.signature.writable && this.readable) this.verify();
    }).bind(this));
    this.signature.once('close', (function() {
        if (!this.secret.writable && this.readable) this.verify();
    }).bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
    try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit('done', valid, obj);
        this.emit('data', valid);
        this.emit('end');
        this.readable = false;
        return valid;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;
module.exports = VerifyStream;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global exports*/ var SignStream = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/sign-stream.js [app-rsc] (ecmascript)");
var VerifyStream = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/lib/verify-stream.js [app-rsc] (ecmascript)");
var ALGORITHMS = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'PS256',
    'PS384',
    'PS512',
    'ES256',
    'ES384',
    'ES512'
];
exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
    return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
    return new VerifyStream(opts);
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/decode.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var jws = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/index.js [app-rsc] (ecmascript)");
module.exports = function(jwt, options) {
    options = options || {};
    var decoded = jws.decode(jwt, options);
    if (!decoded) {
        return null;
    }
    var payload = decoded.payload;
    //try parse the payload
    if (typeof payload === 'string') {
        try {
            var obj = JSON.parse(payload);
            if (obj !== null && typeof obj === 'object') {
                payload = obj;
            }
        } catch (e) {}
    }
    //return header if `complete` option is enabled.  header includes claims
    //such as `kid` and `alg` used to select the key within a JWKS needed to
    //verify the signature
    if (options.complete === true) {
        return {
            header: decoded.header,
            payload: payload,
            signature: decoded.signature
        };
    }
    return payload;
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = function(message, error) {
    Error.call(this, message);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
    this.name = 'JsonWebTokenError';
    this.message = message;
    if (error) this.inner = error;
};
JsonWebTokenError.prototype = Object.create(Error.prototype);
JsonWebTokenError.prototype.constructor = JsonWebTokenError;
module.exports = JsonWebTokenError;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-rsc] (ecmascript)");
var NotBeforeError = function(message, date) {
    JsonWebTokenError.call(this, message);
    this.name = 'NotBeforeError';
    this.date = date;
};
NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
NotBeforeError.prototype.constructor = NotBeforeError;
module.exports = NotBeforeError;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var JsonWebTokenError = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-rsc] (ecmascript)");
var TokenExpiredError = function(message, expiredAt) {
    JsonWebTokenError.call(this, message);
    this.name = 'TokenExpiredError';
    this.expiredAt = expiredAt;
};
TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
TokenExpiredError.prototype.constructor = TokenExpiredError;
module.exports = TokenExpiredError;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ms/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/timespan.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var ms = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/ms/index.js [app-rsc] (ecmascript)");
module.exports = function(time, iat) {
    var timestamp = iat || Math.floor(Date.now() / 1000);
    if (typeof time === 'string') {
        var milliseconds = ms(time);
        if (typeof milliseconds === 'undefined') {
            return;
        }
        return Math.floor(timestamp + milliseconds / 1000);
    } else if (typeof time === 'number') {
        return timestamp + time;
    } else {
        return;
    }
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';
const MAX_LENGTH = 256;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;
// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
const RELEASE_TYPES = [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease'
];
module.exports = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 0b001,
    FLAG_LOOSE: 0b010
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/debug.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const debug = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args)=>console.error('SEMVER', ...args) : ()=>{};
module.exports = debug;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/constants.js [app-rsc] (ecmascript)");
const debug = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/debug.js [app-rsc] (ecmascript)");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const safeRe = exports.safeRe = [];
const src = exports.src = [];
const safeSrc = exports.safeSrc = [];
const t = exports.t = {};
let R = 0;
const LETTERDASHNUMBER = '[a-zA-Z0-9-]';
// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
    [
        '\\s',
        1
    ],
    [
        '\\d',
        MAX_LENGTH
    ],
    [
        LETTERDASHNUMBER,
        MAX_SAFE_BUILD_LENGTH
    ]
];
const makeSafeRegex = (value)=>{
    for (const [token, max] of safeRegexReplacements){
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
};
const createToken = (name, value, isGlobal)=>{
    const safe = makeSafeRegex(value);
    const index = R++;
    debug(name, index, value);
    t[name] = index;
    src[index] = value;
    safeSrc[index] = safe;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
};
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '\\d+');
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
// ## Main Version
// Three dot-separated numeric identifiers.
createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
// Non-numeric identifiers include numeric identifiers but can be longer.
// Therefore non-numeric identifiers must go first.
createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken('FULL', `^${src[t.FULLPLAIN]}$`);
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
createToken('GTLT', '((?:<|>)?=?)');
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
createToken('COERCEFULL', src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?` + `(?:${src[t.BUILD]})?` + `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);
createToken('COERCERTLFULL', src[t.COERCEFULL], true);
// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');
createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';
createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');
createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';
createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/parse-options.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// parse out just the options we care about
const looseOption = Object.freeze({
    loose: true
});
const emptyOpts = Object.freeze({});
const parseOptions = (options)=>{
    if (!options) {
        return emptyOpts;
    }
    if (typeof options !== 'object') {
        return looseOption;
    }
    return options;
};
module.exports = parseOptions;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/identifiers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const numeric = /^[0-9]+$/;
const compareIdentifiers = (a, b)=>{
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b ? 0 : a < b ? -1 : 1;
    }
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b)=>compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers,
    rcompareIdentifiers
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const debug = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/debug.js [app-rsc] (ecmascript)");
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/constants.js [app-rsc] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)");
const parseOptions = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/parse-options.js [app-rsc] (ecmascript)");
const { compareIdentifiers } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/identifiers.js [app-rsc] (ecmascript)");
class SemVer {
    constructor(version, options){
        options = parseOptions(options);
        if (version instanceof SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
                return version;
            } else {
                version = version.version;
            }
        } else if (typeof version !== 'string') {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
            throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
            throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError('Invalid major version');
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError('Invalid minor version');
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError('Invalid patch version');
        }
        // numberify any prerelease numeric ids
        if (!m[4]) {
            this.prerelease = [];
        } else {
            this.prerelease = m[4].split('.').map((id)=>{
                if (/^[0-9]+$/.test(id)) {
                    const num = +id;
                    if (num >= 0 && num < MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        }
        this.build = m[5] ? m[5].split('.') : [];
        this.format();
    }
    format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
            this.version += `-${this.prerelease.join('.')}`;
        }
        return this.version;
    }
    toString() {
        return this.version;
    }
    compare(other) {
        debug('SemVer.compare', this.version, this.options, other);
        if (!(other instanceof SemVer)) {
            if (typeof other === 'string' && other === this.version) {
                return 0;
            }
            other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
            return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        if (this.major < other.major) {
            return -1;
        }
        if (this.major > other.major) {
            return 1;
        }
        if (this.minor < other.minor) {
            return -1;
        }
        if (this.minor > other.minor) {
            return 1;
        }
        if (this.patch < other.patch) {
            return -1;
        }
        if (this.patch > other.patch) {
            return 1;
        }
        return 0;
    }
    comparePre(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) {
            return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
        }
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug('prerelease compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    compareBuild(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            debug('build compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
        if (release.startsWith('pre')) {
            if (!identifier && identifierBase === false) {
                throw new Error('invalid increment argument: identifier is empty');
            }
            // Avoid an invalid semver results
            if (identifier) {
                const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
                if (!match || match[1] !== identifier) {
                    throw new Error(`invalid identifier: ${identifier}`);
                }
            }
        }
        switch(release){
            case 'premajor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'preminor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'prepatch':
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc('patch', identifier, identifierBase);
                this.inc('pre', identifier, identifierBase);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case 'prerelease':
                if (this.prerelease.length === 0) {
                    this.inc('patch', identifier, identifierBase);
                }
                this.inc('pre', identifier, identifierBase);
                break;
            case 'release':
                if (this.prerelease.length === 0) {
                    throw new Error(`version ${this.raw} is not a prerelease`);
                }
                this.prerelease.length = 0;
                break;
            case 'major':
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                    this.major++;
                }
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'minor':
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) {
                    this.minor++;
                }
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'patch':
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) {
                    this.patch++;
                }
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case 'pre':
                {
                    const base = Number(identifierBase) ? 1 : 0;
                    if (this.prerelease.length === 0) {
                        this.prerelease = [
                            base
                        ];
                    } else {
                        let i = this.prerelease.length;
                        while(--i >= 0){
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1) {
                            // didn't increment anything
                            if (identifier === this.prerelease.join('.') && identifierBase === false) {
                                throw new Error('invalid increment argument: identifier already exists');
                            }
                            this.prerelease.push(base);
                        }
                    }
                    if (identifier) {
                        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                        let prerelease = [
                            identifier,
                            base
                        ];
                        if (identifierBase === false) {
                            prerelease = [
                                identifier
                            ];
                        }
                        if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                            if (isNaN(this.prerelease[1])) {
                                this.prerelease = prerelease;
                            }
                        } else {
                            this.prerelease = prerelease;
                        }
                    }
                    break;
                }
            default:
                throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
            this.raw += `+${this.build.join('.')}`;
        }
        return this;
    }
}
module.exports = SemVer;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const parse = (version, options, throwErrors = false)=>{
    if (version instanceof SemVer) {
        return version;
    }
    try {
        return new SemVer(version, options);
    } catch (er) {
        if (!throwErrors) {
            return null;
        }
        throw er;
    }
};
module.exports = parse;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/valid.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const valid = (version, options)=>{
    const v = parse(version, options);
    return v ? v.version : null;
};
module.exports = valid;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/clean.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const clean = (version, options)=>{
    const s = parse(version.trim().replace(/^[=v]+/, ''), options);
    return s ? s.version : null;
};
module.exports = clean;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/inc.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const inc = (version, release, options, identifier, identifierBase)=>{
    if (typeof options === 'string') {
        identifierBase = identifier;
        identifier = options;
        options = undefined;
    }
    try {
        return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
    } catch (er) {
        return null;
    }
};
module.exports = inc;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/diff.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const diff = (version1, version2)=>{
    const v1 = parse(version1, null, true);
    const v2 = parse(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
        return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
        // Going from prerelease -> no prerelease requires some special casing
        // If the low version has only a major, then it will always be a major
        // Some examples:
        // 1.0.0-1 -> 1.0.0
        // 1.0.0-1 -> 1.1.1
        // 1.0.0-1 -> 2.0.0
        if (!lowVersion.patch && !lowVersion.minor) {
            return 'major';
        }
        // If the main part has no difference
        if (lowVersion.compareMain(highVersion) === 0) {
            if (lowVersion.minor && !lowVersion.patch) {
                return 'minor';
            }
            return 'patch';
        }
    }
    // add the `pre` prefix if we are going to a prerelease version
    const prefix = highHasPre ? 'pre' : '';
    if (v1.major !== v2.major) {
        return prefix + 'major';
    }
    if (v1.minor !== v2.minor) {
        return prefix + 'minor';
    }
    if (v1.patch !== v2.patch) {
        return prefix + 'patch';
    }
    // high and low are prereleases
    return 'prerelease';
};
module.exports = diff;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/major.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const major = (a, loose)=>new SemVer(a, loose).major;
module.exports = major;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/minor.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const minor = (a, loose)=>new SemVer(a, loose).minor;
module.exports = minor;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/patch.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const patch = (a, loose)=>new SemVer(a, loose).patch;
module.exports = patch;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/prerelease.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const prerelease = (version, options)=>{
    const parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = prerelease;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const compare = (a, b, loose)=>new SemVer(a, loose).compare(new SemVer(b, loose));
module.exports = compare;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/rcompare.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const rcompare = (a, b, loose)=>compare(b, a, loose);
module.exports = rcompare;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-loose.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const compareLoose = (a, b)=>compare(a, b, true);
module.exports = compareLoose;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-build.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const compareBuild = (a, b, loose)=>{
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = compareBuild;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/sort.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compareBuild = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-build.js [app-rsc] (ecmascript)");
const sort = (list, loose)=>list.sort((a, b)=>compareBuild(a, b, loose));
module.exports = sort;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/rsort.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compareBuild = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-build.js [app-rsc] (ecmascript)");
const rsort = (list, loose)=>list.sort((a, b)=>compareBuild(b, a, loose));
module.exports = rsort;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gt.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const gt = (a, b, loose)=>compare(a, b, loose) > 0;
module.exports = gt;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lt.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const lt = (a, b, loose)=>compare(a, b, loose) < 0;
module.exports = lt;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/eq.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const eq = (a, b, loose)=>compare(a, b, loose) === 0;
module.exports = eq;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/neq.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const neq = (a, b, loose)=>compare(a, b, loose) !== 0;
module.exports = neq;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gte.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const gte = (a, b, loose)=>compare(a, b, loose) >= 0;
module.exports = gte;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lte.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const lte = (a, b, loose)=>compare(a, b, loose) <= 0;
module.exports = lte;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/cmp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const eq = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/eq.js [app-rsc] (ecmascript)");
const neq = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/neq.js [app-rsc] (ecmascript)");
const gt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gt.js [app-rsc] (ecmascript)");
const gte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gte.js [app-rsc] (ecmascript)");
const lt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lt.js [app-rsc] (ecmascript)");
const lte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lte.js [app-rsc] (ecmascript)");
const cmp = (a, op, b, loose)=>{
    switch(op){
        case '===':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a === b;
        case '!==':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a !== b;
        case '':
        case '=':
        case '==':
            return eq(a, b, loose);
        case '!=':
            return neq(a, b, loose);
        case '>':
            return gt(a, b, loose);
        case '>=':
            return gte(a, b, loose);
        case '<':
            return lt(a, b, loose);
        case '<=':
            return lte(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = cmp;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/coerce.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)");
const coerce = (version, options)=>{
    if (version instanceof SemVer) {
        return version;
    }
    if (typeof version === 'number') {
        version = String(version);
    }
    if (typeof version !== 'string') {
        return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
    } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
                match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
        return null;
    }
    const major = match[2];
    const minor = match[3] || '0';
    const patch = match[4] || '0';
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
};
module.exports = coerce;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/lrucache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class LRUCache {
    constructor(){
        this.max = 1000;
        this.map = new Map();
    }
    get(key) {
        const value = this.map.get(key);
        if (value === undefined) {
            return undefined;
        } else {
            // Remove the key from the map and add it to the end
            this.map.delete(key);
            this.map.set(key, value);
            return value;
        }
    }
    delete(key) {
        return this.map.delete(key);
    }
    set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== undefined) {
            // If cache is full, delete the least recently used item
            if (this.map.size >= this.max) {
                const firstKey = this.map.keys().next().value;
                this.delete(firstKey);
            }
            this.map.set(key, value);
        }
        return this;
    }
}
module.exports = LRUCache;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SPACE_CHARACTERS = /\s+/g;
// hoisted class for cyclic dependency
class Range {
    constructor(range, options){
        options = parseOptions(options);
        if (range instanceof Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                return range;
            } else {
                return new Range(range.raw, options);
            }
        }
        if (range instanceof Comparator) {
            // just put it in the set and return
            this.raw = range.value;
            this.set = [
                [
                    range
                ]
            ];
            this.formatted = undefined;
            return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        // First reduce all whitespace as much as possible so we do not have to rely
        // on potentially slow regexes like \s*. This is then stored and used for
        // future error messages as well.
        this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');
        // First, split on ||
        this.set = this.raw.split('||')// map the range to a 2d array of comparators
        .map((r)=>this.parseRange(r.trim()))// throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter((c)=>c.length);
        if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
            // keep the first one, in case they're all null sets
            const first = this.set[0];
            this.set = this.set.filter((c)=>!isNullSet(c[0]));
            if (this.set.length === 0) {
                this.set = [
                    first
                ];
            } else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set){
                    if (c.length === 1 && isAny(c[0])) {
                        this.set = [
                            c
                        ];
                        break;
                    }
                }
            }
        }
        this.formatted = undefined;
    }
    get range() {
        if (this.formatted === undefined) {
            this.formatted = '';
            for(let i = 0; i < this.set.length; i++){
                if (i > 0) {
                    this.formatted += '||';
                }
                const comps = this.set[i];
                for(let k = 0; k < comps.length; k++){
                    if (k > 0) {
                        this.formatted += ' ';
                    }
                    this.formatted += comps[k].toString().trim();
                }
            }
        }
        return this.formatted;
    }
    format() {
        return this.range;
    }
    toString() {
        return this.range;
    }
    parseRange(range) {
        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ':' + range;
        const cached = cache.get(memoKey);
        if (cached) {
            return cached;
        }
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug('hyphen replace', range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug('comparator trim', range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug('tilde trim', range);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug('caret trim', range);
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(' ').map((comp)=>parseComparator(comp, this.options)).join(' ').split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>replaceGTE0(comp, this.options));
        if (loose) {
            // in loose mode, throw out any that are not valid comparators
            rangeList = rangeList.filter((comp)=>{
                debug('loose invalid filter', comp, this.options);
                return !!comp.match(re[t.COMPARATORLOOSE]);
            });
        }
        debug('range list', rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new Comparator(comp, this.options));
        for (const comp of comparators){
            if (isNullSet(comp)) {
                return [
                    comp
                ];
            }
            rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has('')) {
            rangeMap.delete('');
        }
        const result = [
            ...rangeMap.values()
        ];
        cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof Range)) {
            throw new TypeError('a Range is required');
        }
        return this.set.some((thisComparators)=>{
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
                    return rangeComparators.every((rangeComparator)=>{
                        return thisComparator.intersects(rangeComparator, options);
                    });
                });
            });
        });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
        if (!version) {
            return false;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        for(let i = 0; i < this.set.length; i++){
            if (testSet(this.set[i], version, this.options)) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Range;
const LRU = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/lrucache.js [app-rsc] (ecmascript)");
const cache = new LRU();
const parseOptions = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/parse-options.js [app-rsc] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/comparator.js [app-rsc] (ecmascript)");
const debug = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/debug.js [app-rsc] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)");
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/constants.js [app-rsc] (ecmascript)");
const isNullSet = (c)=>c.value === '<0.0.0-0';
const isAny = (c)=>c.value === '';
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options)=>{
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every((otherComparator)=>{
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
};
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options)=>{
    comp = comp.replace(re[t.BUILD], '');
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp;
};
const isX = (id)=>!id || id.toLowerCase() === 'x' || id === '*';
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceTilde(c, options)).join(' ');
};
const replaceTilde = (comp, options)=>{
    const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('tilde', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            // ~1.2 == >=1.2.0 <1.3.0-0
            ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
            debug('replaceTilde pr', pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
            // ~1.2.3 == >=1.2.3 <1.3.0-0
            ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug('tilde return', ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceCaret(c, options)).join(' ');
};
const replaceCaret = (comp, options)=>{
    debug('caret', comp, options);
    const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('caret', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            if (M === '0') {
                ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
                ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
        } else if (pr) {
            debug('replaceCaret pr', pr);
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
            }
        } else {
            debug('no pr');
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
            }
        }
        debug('caret return', ret);
        return ret;
    });
};
const replaceXRanges = (comp, options)=>{
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map((c)=>replaceXRange(c, options)).join(' ');
};
const replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === '=' && anyX) {
            gtlt = '';
        }
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? '-0' : '';
        if (xM) {
            if (gtlt === '>' || gtlt === '<') {
                // nothing is allowed
                ret = '<0.0.0-0';
            } else {
                // nothing is forbidden
                ret = '*';
            }
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) {
                m = 0;
            }
            p = 0;
            if (gtlt === '>') {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                gtlt = '>=';
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === '<=') {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = '<';
                if (xm) {
                    M = +M + 1;
                } else {
                    m = +m + 1;
                }
            }
            if (gtlt === '<') {
                pr = '-0';
            }
            ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug('xRange return', ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options)=>{
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '');
};
const replaceGTE0 = (comp, options)=>{
    debug('replaceGTE0', comp, options);
    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
// TODO build?
const hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr)=>{
        if (isX(fM)) {
            from = '';
        } else if (isX(fm)) {
            from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
        } else if (isX(fp)) {
            from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
        } else if (fpr) {
            from = `>=${from}`;
        } else {
            from = `>=${from}${incPr ? '-0' : ''}`;
        }
        if (isX(tM)) {
            to = '';
        } else if (isX(tm)) {
            to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
            to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
            to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
            to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
            to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
    };
const testSet = (set, version, options)=>{
    for(let i = 0; i < set.length; i++){
        if (!set[i].test(version)) {
            return false;
        }
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(let i = 0; i < set.length; i++){
            debug(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
                continue;
            }
            if (set[i].semver.prerelease.length > 0) {
                const allowed = set[i].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                    return true;
                }
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/comparator.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const ANY = Symbol('SemVer ANY');
// hoisted class for cyclic dependency
class Comparator {
    static get ANY() {
        return ANY;
    }
    constructor(comp, options){
        options = parseOptions(options);
        if (comp instanceof Comparator) {
            if (comp.loose === !!options.loose) {
                return comp;
            } else {
                comp = comp.value;
            }
        }
        comp = comp.trim().split(/\s+/).join(' ');
        debug('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
            this.value = '';
        } else {
            this.value = this.operator + this.semver.version;
        }
        debug('comp', this);
    }
    parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== undefined ? m[1] : '';
        if (this.operator === '=') {
            this.operator = '';
        }
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) {
            this.semver = ANY;
        } else {
            this.semver = new SemVer(m[2], this.options.loose);
        }
    }
    toString() {
        return this.value;
    }
    test(version) {
        debug('Comparator.test', version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
            return true;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
            throw new TypeError('a Comparator is required');
        }
        if (this.operator === '') {
            if (this.value === '') {
                return true;
            }
            return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
            if (comp.value === '') {
                return true;
            }
            return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        // Special cases where nothing can possibly be lower
        if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
            return false;
        }
        if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
            return false;
        }
        // Same direction increasing (> or >=)
        if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
            return true;
        }
        // Same direction decreasing (< or <=)
        if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
            return true;
        }
        // same SemVer and both sides are inclusive (<= or >=)
        if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
            return true;
        }
        // opposite directions less than
        if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
            return true;
        }
        // opposite directions greater than
        if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
            return true;
        }
        return false;
    }
}
module.exports = Comparator;
const parseOptions = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/parse-options.js [app-rsc] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)");
const cmp = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/cmp.js [app-rsc] (ecmascript)");
const debug = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/debug.js [app-rsc] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/satisfies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const satisfies = (version, range, options)=>{
    try {
        range = new Range(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = satisfies;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/to-comparators.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
// Mostly just for testing and legacy API reasons
const toComparators = (range, options)=>new Range(range, options).set.map((comp)=>comp.map((c)=>c.value).join(' ').trim().split(' '));
module.exports = toComparators;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/max-satisfying.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const maxSatisfying = (versions, range, options)=>{
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
        rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) {
            // satisfies(v, range, options)
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new SemVer(max, options);
            }
        }
    });
    return max;
};
module.exports = maxSatisfying;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/min-satisfying.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const minSatisfying = (versions, range, options)=>{
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
        rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) {
            // satisfies(v, range, options)
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new SemVer(min, options);
            }
        }
    });
    return min;
};
module.exports = minSatisfying;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/min-version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const gt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gt.js [app-rsc] (ecmascript)");
const minVersion = (range, loose)=>{
    range = new Range(range, loose);
    let minver = new SemVer('0.0.0');
    if (range.test(minver)) {
        return minver;
    }
    minver = new SemVer('0.0.0-0');
    if (range.test(minver)) {
        return minver;
    }
    minver = null;
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator)=>{
            // Clone to avoid manipulating the comparator's semver object.
            const compver = new SemVer(comparator.semver.version);
            switch(comparator.operator){
                case '>':
                    if (compver.prerelease.length === 0) {
                        compver.patch++;
                    } else {
                        compver.prerelease.push(0);
                    }
                    compver.raw = compver.format();
                /* fallthrough */ case '':
                case '>=':
                    if (!setMin || gt(compver, setMin)) {
                        setMin = compver;
                    }
                    break;
                case '<':
                case '<=':
                    break;
                /* istanbul ignore next */ default:
                    throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
            minver = setMin;
        }
    }
    if (minver && range.test(minver)) {
        return minver;
    }
    return null;
};
module.exports = minVersion;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/valid.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const validRange = (range, options)=>{
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*';
    } catch (er) {
        return null;
    }
};
module.exports = validRange;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/outside.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/comparator.js [app-rsc] (ecmascript)");
const { ANY } = Comparator;
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const satisfies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/satisfies.js [app-rsc] (ecmascript)");
const gt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gt.js [app-rsc] (ecmascript)");
const lt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lt.js [app-rsc] (ecmascript)");
const lte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lte.js [app-rsc] (ecmascript)");
const gte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gte.js [app-rsc] (ecmascript)");
const outside = (version, range, hilo, options)=>{
    version = new SemVer(version, options);
    range = new Range(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case '>':
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = '>';
            ecomp = '>=';
            break;
        case '<':
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = '<';
            ecomp = '<=';
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisfies the range it is not outside
    if (satisfies(version, range, options)) {
        return false;
    }
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator)=>{
            if (comparator.semver === ANY) {
                comparator = new Comparator('>=0.0.0');
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
                high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
                low = comparator;
            }
        });
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
            return false;
        }
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
            return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
            return false;
        }
    }
    return true;
};
module.exports = outside;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/gtr.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Determine if version is greater than all the versions possible in the range.
const outside = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/outside.js [app-rsc] (ecmascript)");
const gtr = (version, range, options)=>outside(version, range, '>', options);
module.exports = gtr;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/ltr.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const outside = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/outside.js [app-rsc] (ecmascript)");
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options)=>outside(version, range, '<', options);
module.exports = ltr;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/intersects.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const intersects = (r1, r2, options)=>{
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
};
module.exports = intersects;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/simplify.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/satisfies.js [app-rsc] (ecmascript)");
const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
module.exports = (versions, range, options)=>{
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b)=>compare(a, b, options));
    for (const version of v){
        const included = satisfies(version, range, options);
        if (included) {
            prev = version;
            if (!first) {
                first = version;
            }
        } else {
            if (prev) {
                set.push([
                    first,
                    prev
                ]);
            }
            prev = null;
            first = null;
        }
    }
    if (first) {
        set.push([
            first,
            null
        ]);
    }
    const ranges = [];
    for (const [min, max] of set){
        if (min === max) {
            ranges.push(min);
        } else if (!max && min === v[0]) {
            ranges.push('*');
        } else if (!max) {
            ranges.push(`>=${min}`);
        } else if (min === v[0]) {
            ranges.push(`<=${max}`);
        } else {
            ranges.push(`${min} - ${max}`);
        }
    }
    const simplified = ranges.join(' || ');
    const original = typeof range.raw === 'string' ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/subset.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/comparator.js [app-rsc] (ecmascript)");
const { ANY } = Comparator;
const satisfies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/satisfies.js [app-rsc] (ecmascript)");
const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If LT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true
const subset = (sub, dom, options = {})=>{
    if (sub === dom) {
        return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set){
        for (const simpleDom of dom.set){
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
                continue OUTER;
            }
        }
        // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.
        if (sawNonNull) {
            return false;
        }
    }
    return true;
};
const minimumVersionWithPreRelease = [
    new Comparator('>=0.0.0-0')
];
const minimumVersion = [
    new Comparator('>=0.0.0')
];
const simpleSubset = (sub, dom, options)=>{
    if (sub === dom) {
        return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
        } else if (options.includePrerelease) {
            sub = minimumVersionWithPreRelease;
        } else {
            sub = minimumVersion;
        }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
            return true;
        } else {
            dom = minimumVersion;
        }
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub){
        if (c.operator === '>' || c.operator === '>=') {
            gt = higherGT(gt, c, options);
        } else if (c.operator === '<' || c.operator === '<=') {
            lt = lowerLT(lt, c, options);
        } else {
            eqSet.add(c.semver);
        }
    }
    if (eqSet.size > 1) {
        return null;
    }
    let gtltComp;
    if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
            return null;
        } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
            return null;
        }
    }
    // will iterate one or zero times
    for (const eq of eqSet){
        if (gt && !satisfies(eq, String(gt), options)) {
            return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
            return null;
        }
        for (const c of dom){
            if (!satisfies(eq, String(c), options)) {
                return false;
            }
        }
        return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
    }
    for (const c of dom){
        hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
        hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
        if (gt) {
            if (needDomGTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
                    needDomGTPre = false;
                }
            }
            if (c.operator === '>' || c.operator === '>=') {
                higher = higherGT(gt, c, options);
                if (higher === c && higher !== gt) {
                    return false;
                }
            } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
                return false;
            }
        }
        if (lt) {
            if (needDomLTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
                    needDomLTPre = false;
                }
            }
            if (c.operator === '<' || c.operator === '<=') {
                lower = lowerLT(lt, c, options);
                if (lower === c && lower !== lt) {
                    return false;
                }
            } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
                return false;
            }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
            return false;
        }
    }
    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
    }
    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre) {
        return false;
    }
    return true;
};
// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options)=>{
    if (!a) {
        return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
};
// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options)=>{
    if (!a) {
        return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
};
module.exports = subset;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// just pre-load all the stuff that index.js lazily exports
const internalRe = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/re.js [app-rsc] (ecmascript)");
const constants = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/constants.js [app-rsc] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/semver.js [app-rsc] (ecmascript)");
const identifiers = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/internal/identifiers.js [app-rsc] (ecmascript)");
const parse = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/parse.js [app-rsc] (ecmascript)");
const valid = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/valid.js [app-rsc] (ecmascript)");
const clean = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/clean.js [app-rsc] (ecmascript)");
const inc = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/inc.js [app-rsc] (ecmascript)");
const diff = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/diff.js [app-rsc] (ecmascript)");
const major = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/major.js [app-rsc] (ecmascript)");
const minor = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/minor.js [app-rsc] (ecmascript)");
const patch = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/patch.js [app-rsc] (ecmascript)");
const prerelease = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/prerelease.js [app-rsc] (ecmascript)");
const compare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare.js [app-rsc] (ecmascript)");
const rcompare = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/rcompare.js [app-rsc] (ecmascript)");
const compareLoose = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-loose.js [app-rsc] (ecmascript)");
const compareBuild = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/compare-build.js [app-rsc] (ecmascript)");
const sort = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/sort.js [app-rsc] (ecmascript)");
const rsort = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/rsort.js [app-rsc] (ecmascript)");
const gt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gt.js [app-rsc] (ecmascript)");
const lt = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lt.js [app-rsc] (ecmascript)");
const eq = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/eq.js [app-rsc] (ecmascript)");
const neq = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/neq.js [app-rsc] (ecmascript)");
const gte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/gte.js [app-rsc] (ecmascript)");
const lte = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/lte.js [app-rsc] (ecmascript)");
const cmp = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/cmp.js [app-rsc] (ecmascript)");
const coerce = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/coerce.js [app-rsc] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/comparator.js [app-rsc] (ecmascript)");
const Range = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/classes/range.js [app-rsc] (ecmascript)");
const satisfies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/functions/satisfies.js [app-rsc] (ecmascript)");
const toComparators = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/to-comparators.js [app-rsc] (ecmascript)");
const maxSatisfying = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/max-satisfying.js [app-rsc] (ecmascript)");
const minSatisfying = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/min-satisfying.js [app-rsc] (ecmascript)");
const minVersion = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/min-version.js [app-rsc] (ecmascript)");
const validRange = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/valid.js [app-rsc] (ecmascript)");
const outside = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/outside.js [app-rsc] (ecmascript)");
const gtr = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/gtr.js [app-rsc] (ecmascript)");
const ltr = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/ltr.js [app-rsc] (ecmascript)");
const intersects = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/intersects.js [app-rsc] (ecmascript)");
const simplifyRange = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/simplify.js [app-rsc] (ecmascript)");
const subset = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/ranges/subset.js [app-rsc] (ecmascript)");
module.exports = {
    parse,
    valid,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants.RELEASE_TYPES,
    compareIdentifiers: identifiers.compareIdentifiers,
    rcompareIdentifiers: identifiers.rcompareIdentifiers
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const semver = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/index.js [app-rsc] (ecmascript)");
module.exports = semver.satisfies(process.version, '>=15.7.0');
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const semver = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/index.js [app-rsc] (ecmascript)");
module.exports = semver.satisfies(process.version, '>=16.9.0');
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ASYMMETRIC_KEY_DETAILS_SUPPORTED = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js [app-rsc] (ecmascript)");
const RSA_PSS_KEY_DETAILS_SUPPORTED = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js [app-rsc] (ecmascript)");
const allowedAlgorithmsForKeys = {
    'ec': [
        'ES256',
        'ES384',
        'ES512'
    ],
    'rsa': [
        'RS256',
        'PS256',
        'RS384',
        'PS384',
        'RS512',
        'PS512'
    ],
    'rsa-pss': [
        'PS256',
        'PS384',
        'PS512'
    ]
};
const allowedCurves = {
    ES256: 'prime256v1',
    ES384: 'secp384r1',
    ES512: 'secp521r1'
};
module.exports = function(algorithm, key) {
    if (!algorithm || !key) return;
    const keyType = key.asymmetricKeyType;
    if (!keyType) return;
    const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
    if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
    }
    if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(', ')}.`);
    }
    /*
   * Ignore the next block from test coverage because it gets executed
   * conditionally depending on the Node version. Not ignoring it would
   * prevent us from reaching the target % of coverage for versions of
   * Node under 15.7.0.
   */ /* istanbul ignore next */ if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch(keyType){
            case 'ec':
                const keyCurve = key.asymmetricKeyDetails.namedCurve;
                const allowedCurve = allowedCurves[algorithm];
                if (keyCurve !== allowedCurve) {
                    throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
                }
                break;
            case 'rsa-pss':
                if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
                    const length = parseInt(algorithm.slice(-3), 10);
                    const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
                    if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                        throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
                    }
                    if (saltLength !== undefined && saltLength > length >> 3) {
                        throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
                    }
                }
                break;
        }
    }
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/psSupported.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var semver = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/node_modules/semver/index.js [app-rsc] (ecmascript)");
module.exports = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/verify.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const JsonWebTokenError = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-rsc] (ecmascript)");
const NotBeforeError = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-rsc] (ecmascript)");
const TokenExpiredError = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-rsc] (ecmascript)");
const decode = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/decode.js [app-rsc] (ecmascript)");
const timespan = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/timespan.js [app-rsc] (ecmascript)");
const validateAsymmetricKey = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-rsc] (ecmascript)");
const PS_SUPPORTED = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/psSupported.js [app-rsc] (ecmascript)");
const jws = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/index.js [app-rsc] (ecmascript)");
const { KeyObject, createSecretKey, createPublicKey } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const PUB_KEY_ALGS = [
    'RS256',
    'RS384',
    'RS512'
];
const EC_KEY_ALGS = [
    'ES256',
    'ES384',
    'ES512'
];
const RSA_KEY_ALGS = [
    'RS256',
    'RS384',
    'RS512'
];
const HS_ALGS = [
    'HS256',
    'HS384',
    'HS512'
];
if (PS_SUPPORTED) {
    PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
    RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
}
module.exports = function(jwtString, secretOrPublicKey, options, callback) {
    if (typeof options === 'function' && !callback) {
        callback = options;
        options = {};
    }
    if (!options) {
        options = {};
    }
    //clone this object since we are going to mutate it.
    options = Object.assign({}, options);
    let done;
    if (callback) {
        done = callback;
    } else {
        done = function(err, data) {
            if (err) throw err;
            return data;
        };
    }
    if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
        return done(new JsonWebTokenError('clockTimestamp must be a number'));
    }
    if (options.nonce !== undefined && (typeof options.nonce !== 'string' || options.nonce.trim() === '')) {
        return done(new JsonWebTokenError('nonce must be a non-empty string'));
    }
    if (options.allowInvalidAsymmetricKeyTypes !== undefined && typeof options.allowInvalidAsymmetricKeyTypes !== 'boolean') {
        return done(new JsonWebTokenError('allowInvalidAsymmetricKeyTypes must be a boolean'));
    }
    const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);
    if (!jwtString) {
        return done(new JsonWebTokenError('jwt must be provided'));
    }
    if (typeof jwtString !== 'string') {
        return done(new JsonWebTokenError('jwt must be a string'));
    }
    const parts = jwtString.split('.');
    if (parts.length !== 3) {
        return done(new JsonWebTokenError('jwt malformed'));
    }
    let decodedToken;
    try {
        decodedToken = decode(jwtString, {
            complete: true
        });
    } catch (err) {
        return done(err);
    }
    if (!decodedToken) {
        return done(new JsonWebTokenError('invalid token'));
    }
    const header = decodedToken.header;
    let getSecret;
    if (typeof secretOrPublicKey === 'function') {
        if (!callback) {
            return done(new JsonWebTokenError('verify must be called asynchronous if secret or public key is provided as a callback'));
        }
        getSecret = secretOrPublicKey;
    } else {
        getSecret = function(header, secretCallback) {
            return secretCallback(null, secretOrPublicKey);
        };
    }
    return getSecret(header, function(err, secretOrPublicKey) {
        if (err) {
            return done(new JsonWebTokenError('error in secret or public key callback: ' + err.message));
        }
        const hasSignature = parts[2].trim() !== '';
        if (!hasSignature && secretOrPublicKey) {
            return done(new JsonWebTokenError('jwt signature is required'));
        }
        if (hasSignature && !secretOrPublicKey) {
            return done(new JsonWebTokenError('secret or public key must be provided'));
        }
        if (!hasSignature && !options.algorithms) {
            return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey != null && !(secretOrPublicKey instanceof KeyObject)) {
            try {
                secretOrPublicKey = createPublicKey(secretOrPublicKey);
            } catch (_) {
                try {
                    secretOrPublicKey = createSecretKey(typeof secretOrPublicKey === 'string' ? Buffer.from(secretOrPublicKey) : secretOrPublicKey);
                } catch (_) {
                    return done(new JsonWebTokenError('secretOrPublicKey is not valid key material'));
                }
            }
        }
        if (!options.algorithms) {
            if (secretOrPublicKey.type === 'secret') {
                options.algorithms = HS_ALGS;
            } else if ([
                'rsa',
                'rsa-pss'
            ].includes(secretOrPublicKey.asymmetricKeyType)) {
                options.algorithms = RSA_KEY_ALGS;
            } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
                options.algorithms = EC_KEY_ALGS;
            } else {
                options.algorithms = PUB_KEY_ALGS;
            }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
            return done(new JsonWebTokenError('invalid algorithm'));
        }
        if (header.alg.startsWith('HS') && secretOrPublicKey.type !== 'secret') {
            return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey.type !== 'public') {
            return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
            try {
                validateAsymmetricKey(header.alg, secretOrPublicKey);
            } catch (e) {
                return done(e);
            }
        }
        let valid;
        try {
            valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);
        } catch (e) {
            return done(e);
        }
        if (!valid) {
            return done(new JsonWebTokenError('invalid signature'));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
            if (typeof payload.nbf !== 'number') {
                return done(new JsonWebTokenError('invalid nbf value'));
            }
            if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
                return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
            }
        }
        if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
            if (typeof payload.exp !== 'number') {
                return done(new JsonWebTokenError('invalid exp value'));
            }
            if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
                return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
            }
        }
        if (options.audience) {
            const audiences = Array.isArray(options.audience) ? options.audience : [
                options.audience
            ];
            const target = Array.isArray(payload.aud) ? payload.aud : [
                payload.aud
            ];
            const match = target.some(function(targetAudience) {
                return audiences.some(function(audience) {
                    return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
                });
            });
            if (!match) {
                return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
            }
        }
        if (options.issuer) {
            const invalid_issuer = typeof options.issuer === 'string' && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
            if (invalid_issuer) {
                return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
            }
        }
        if (options.subject) {
            if (payload.sub !== options.subject) {
                return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
            }
        }
        if (options.jwtid) {
            if (payload.jti !== options.jwtid) {
                return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
            }
        }
        if (options.nonce) {
            if (payload.nonce !== options.nonce) {
                return done(new JsonWebTokenError('jwt nonce invalid. expected: ' + options.nonce));
            }
        }
        if (options.maxAge) {
            if (typeof payload.iat !== 'number') {
                return done(new JsonWebTokenError('iat required when maxAge is specified'));
            }
            const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
            if (typeof maxAgeTimestamp === 'undefined') {
                return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
            }
            if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
                return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
            }
        }
        if (options.complete === true) {
            const signature = decodedToken.signature;
            return done(null, {
                header: header,
                payload: payload,
                signature: signature
            });
        }
        return done(null, payload);
    });
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.includes/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var argsTag = '[object Arguments]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', stringTag = '[object String]', symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */ function arrayMap(array, iteratee) {
    var index = -1, length = array ? array.length : 0, result = Array(length);
    while(++index < length){
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while(fromRight ? index-- : ++index < length){
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var index = fromIndex - 1, length = array.length;
    while(++index < length){
        if (array[index] === value) {
            return index;
        }
    }
    return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */ function baseIsNaN(value) {
    return value !== value;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n){
        result[index] = iteratee(index);
    }
    return result;
}
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */ function baseValues(object, props) {
    return arrayMap(props, function(key) {
        return object[key];
    });
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/** Used for built-in method references. */ var objectProto = Object.prototype;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for(var key in value){
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for(var key in Object(object)){
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */ function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike(collection) ? collection : values(collection);
    fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
    var length = collection.length;
    if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
    }
    return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */ function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */ function values(object) {
    return object ? baseValues(object, keys(object)) : [];
}
module.exports = includes;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isboolean/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var boolTag = '[object Boolean]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */ function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
module.exports = isBoolean;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isinteger/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */ function isInteger(value) {
    return typeof value == 'number' && value == toInteger(value);
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = isInteger;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isnumber/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var numberTag = '[object Number]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */ function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && objectToString.call(value) == numberTag;
}
module.exports = isNumber;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isplainobject/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** `Object#toString` result references. */ var objectTag = '[object Object]';
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
        try {
            result = !!(value + '');
        } catch (e) {}
    }
    return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/** Used for built-in method references. */ var funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */ var objectCtorString = funcToString.call(Object);
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var getPrototype = overArg(Object.getPrototypeOf, Object);
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */ function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
        return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
module.exports = isPlainObject;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isstring/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */ /** `Object#toString` result references. */ var stringTag = '[object String]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */ function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
}
module.exports = isString;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.once/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the `TypeError` message for "Functions" methods. */ var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */ function before(n, func) {
    var result;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger(n);
    return function() {
        if (--n > 0) {
            result = func.apply(this, arguments);
        }
        if (n <= 1) {
            func = undefined;
        }
        return result;
    };
}
/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */ function once(func) {
    return before(2, func);
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = once;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/sign.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const timespan = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/timespan.js [app-rsc] (ecmascript)");
const PS_SUPPORTED = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/psSupported.js [app-rsc] (ecmascript)");
const validateAsymmetricKey = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js [app-rsc] (ecmascript)");
const jws = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jws/index.js [app-rsc] (ecmascript)");
const includes = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.includes/index.js [app-rsc] (ecmascript)");
const isBoolean = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isboolean/index.js [app-rsc] (ecmascript)");
const isInteger = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isinteger/index.js [app-rsc] (ecmascript)");
const isNumber = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isnumber/index.js [app-rsc] (ecmascript)");
const isPlainObject = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isplainobject/index.js [app-rsc] (ecmascript)");
const isString = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.isstring/index.js [app-rsc] (ecmascript)");
const once = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/lodash.once/index.js [app-rsc] (ecmascript)");
const { KeyObject, createSecretKey, createPrivateKey } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const SUPPORTED_ALGS = [
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'HS256',
    'HS384',
    'HS512',
    'none'
];
if (PS_SUPPORTED) {
    SUPPORTED_ALGS.splice(3, 0, 'PS256', 'PS384', 'PS512');
}
const sign_options_schema = {
    expiresIn: {
        isValid: function(value) {
            return isInteger(value) || isString(value) && value;
        },
        message: '"expiresIn" should be a number of seconds or string representing a timespan'
    },
    notBefore: {
        isValid: function(value) {
            return isInteger(value) || isString(value) && value;
        },
        message: '"notBefore" should be a number of seconds or string representing a timespan'
    },
    audience: {
        isValid: function(value) {
            return isString(value) || Array.isArray(value);
        },
        message: '"audience" must be a string or array'
    },
    algorithm: {
        isValid: includes.bind(null, SUPPORTED_ALGS),
        message: '"algorithm" must be a valid string enum value'
    },
    header: {
        isValid: isPlainObject,
        message: '"header" must be an object'
    },
    encoding: {
        isValid: isString,
        message: '"encoding" must be a string'
    },
    issuer: {
        isValid: isString,
        message: '"issuer" must be a string'
    },
    subject: {
        isValid: isString,
        message: '"subject" must be a string'
    },
    jwtid: {
        isValid: isString,
        message: '"jwtid" must be a string'
    },
    noTimestamp: {
        isValid: isBoolean,
        message: '"noTimestamp" must be a boolean'
    },
    keyid: {
        isValid: isString,
        message: '"keyid" must be a string'
    },
    mutatePayload: {
        isValid: isBoolean,
        message: '"mutatePayload" must be a boolean'
    },
    allowInsecureKeySizes: {
        isValid: isBoolean,
        message: '"allowInsecureKeySizes" must be a boolean'
    },
    allowInvalidAsymmetricKeyTypes: {
        isValid: isBoolean,
        message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'
    }
};
const registered_claims_schema = {
    iat: {
        isValid: isNumber,
        message: '"iat" should be a number of seconds'
    },
    exp: {
        isValid: isNumber,
        message: '"exp" should be a number of seconds'
    },
    nbf: {
        isValid: isNumber,
        message: '"nbf" should be a number of seconds'
    }
};
function validate(schema, allowUnknown, object, parameterName) {
    if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
    }
    Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
            if (!allowUnknown) {
                throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
            }
            return;
        }
        if (!validator.isValid(object[key])) {
            throw new Error(validator.message);
        }
    });
}
function validateOptions(options) {
    return validate(sign_options_schema, false, options, 'options');
}
function validatePayload(payload) {
    return validate(registered_claims_schema, true, payload, 'payload');
}
const options_to_payload = {
    'audience': 'aud',
    'issuer': 'iss',
    'subject': 'sub',
    'jwtid': 'jti'
};
const options_for_objects = [
    'expiresIn',
    'notBefore',
    'noTimestamp',
    'audience',
    'issuer',
    'subject',
    'jwtid'
];
module.exports = function(payload, secretOrPrivateKey, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    } else {
        options = options || {};
    }
    const isObjectPayload = typeof payload === 'object' && !Buffer.isBuffer(payload);
    const header = Object.assign({
        alg: options.algorithm || 'HS256',
        typ: isObjectPayload ? 'JWT' : undefined,
        kid: options.keyid
    }, options.header);
    function failure(err) {
        if (callback) {
            return callback(err);
        }
        throw err;
    }
    if (!secretOrPrivateKey && options.algorithm !== 'none') {
        return failure(new Error('secretOrPrivateKey must have a value'));
    }
    if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
            secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
            try {
                secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
            } catch (_) {
                return failure(new Error('secretOrPrivateKey is not valid key material'));
            }
        }
    }
    if (header.alg.startsWith('HS') && secretOrPrivateKey.type !== 'secret') {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
    } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== 'private') {
            return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith('ES') && secretOrPrivateKey.asymmetricKeyDetails !== undefined && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
            return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
    }
    if (typeof payload === 'undefined') {
        return failure(new Error('payload is required'));
    } else if (isObjectPayload) {
        try {
            validatePayload(payload);
        } catch (error) {
            return failure(error);
        }
        if (!options.mutatePayload) {
            payload = Object.assign({}, payload);
        }
    } else {
        const invalid_options = options_for_objects.filter(function(opt) {
            return typeof options[opt] !== 'undefined';
        });
        if (invalid_options.length > 0) {
            return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + typeof payload + ' payload'));
        }
    }
    if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
    }
    if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
    }
    try {
        validateOptions(options);
    } catch (error) {
        return failure(error);
    }
    if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
            validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error) {
            return failure(error);
        }
    }
    const timestamp = payload.iat || Math.floor(Date.now() / 1000);
    if (options.noTimestamp) {
        delete payload.iat;
    } else if (isObjectPayload) {
        payload.iat = timestamp;
    }
    if (typeof options.notBefore !== 'undefined') {
        try {
            payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
            return failure(err);
        }
        if (typeof payload.nbf === 'undefined') {
            return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
    }
    if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
        try {
            payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
            return failure(err);
        }
        if (typeof payload.exp === 'undefined') {
            return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
    }
    Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== 'undefined') {
            if (typeof payload[claim] !== 'undefined') {
                return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
            }
            payload[claim] = options[key];
        }
    });
    const encoding = options.encoding || 'utf8';
    if (typeof callback === 'function') {
        callback = callback && once(callback);
        jws.createSign({
            header: header,
            privateKey: secretOrPrivateKey,
            payload: payload,
            encoding: encoding
        }).once('error', callback).once('done', function(signature) {
            // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
            if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
                return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
            }
            callback(null, signature);
        });
    } else {
        let signature = jws.sign({
            header: header,
            payload: payload,
            secret: secretOrPrivateKey,
            encoding: encoding
        });
        // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
    }
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    decode: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/decode.js [app-rsc] (ecmascript)"),
    verify: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/verify.js [app-rsc] (ecmascript)"),
    sign: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/sign.js [app-rsc] (ecmascript)"),
    JsonWebTokenError: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/JsonWebTokenError.js [app-rsc] (ecmascript)"),
    NotBeforeError: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/NotBeforeError.js [app-rsc] (ecmascript)"),
    TokenExpiredError: __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/jsonwebtoken/lib/TokenExpiredError.js [app-rsc] (ecmascript)")
};
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RequestCookies: null,
    ResponseCookies: null,
    stringifyCookie: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RequestCookies: function() {
        return _cookies.RequestCookies;
    },
    ResponseCookies: function() {
        return _cookies.ResponseCookies;
    },
    stringifyCookie: function() {
        return _cookies.stringifyCookie;
    }
});
const _cookies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-rsc] (ecmascript)"); //# sourceMappingURL=cookies.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/action-revalidation-kind.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ActionDidNotRevalidate: null,
    ActionDidRevalidateDynamicOnly: null,
    ActionDidRevalidateStaticAndDynamic: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ActionDidNotRevalidate: function() {
        return ActionDidNotRevalidate;
    },
    ActionDidRevalidateDynamicOnly: function() {
        return ActionDidRevalidateDynamicOnly;
    },
    ActionDidRevalidateStaticAndDynamic: function() {
        return ActionDidRevalidateStaticAndDynamic;
    }
});
const ActionDidNotRevalidate = 0;
const ActionDidRevalidateStaticAndDynamic = 1;
const ActionDidRevalidateDynamicOnly = 2; //# sourceMappingURL=action-revalidation-kind.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MutableRequestCookiesAdapter: null,
    ReadonlyRequestCookiesError: null,
    RequestCookiesAdapter: null,
    appendMutableCookies: null,
    areCookiesMutableInCurrentPhase: null,
    createCookiesWithMutableAccessCheck: null,
    getModifiedCookieValues: null,
    responseCookiesToRequestCookies: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    },
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    areCookiesMutableInCurrentPhase: function() {
        return areCookiesMutableInCurrentPhase;
    },
    createCookiesWithMutableAccessCheck: function() {
        return createCookiesWithMutableAccessCheck;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    responseCookiesToRequestCookies: function() {
        return responseCookiesToRequestCookies;
    }
});
const _cookies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _actionrevalidationkind = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/action-revalidation-kind.js [app-rsc] (ecmascript)");
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new _cookies.ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function createCookiesWithMutableAccessCheck(requestStore) {
    const wrappedCookies = new Proxy(requestStore.mutableCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new _cookies.RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
} //# sourceMappingURL=request-cookies.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DynamicServerError: null,
    isDynamicServerError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    StaticGenBailoutError: null,
    isStaticGenBailoutError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHangingPromiseRejectionError: null,
    makeDevtoolsIOAwarePromise: null,
    makeHangingPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeDevtoolsIOAwarePromise: function() {
        return makeDevtoolsIOAwarePromise;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, route, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(route, expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
        // We resolve each stage in a timeout, so React DevTools will pick this up as IO.
        return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
} //# sourceMappingURL=dynamic-rendering-utils.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/lib/framework/boundary-constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_BOUNDARY_NAME: null,
    OUTLET_BOUNDARY_NAME: null,
    ROOT_LAYOUT_BOUNDARY_NAME: null,
    VIEWPORT_BOUNDARY_NAME: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__'; //# sourceMappingURL=boundary-constants.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    atLeastOneTask: null,
    scheduleImmediate: null,
    scheduleOnNextTick: null,
    waitAtLeastOneReactRenderTask: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
} //# sourceMappingURL=scheduler.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Postpone: null,
    PreludeState: null,
    abortAndThrowOnSynchronousRequestDataAccess: null,
    abortOnSynchronousPlatformIOAccess: null,
    accessedDynamicData: null,
    annotateDynamicAccess: null,
    consumeDynamicAccess: null,
    createDynamicTrackingState: null,
    createDynamicValidationState: null,
    createHangingInputAbortSignal: null,
    createRenderInBrowserAbortSignal: null,
    delayUntilRuntimeStage: null,
    formatDynamicAPIAccesses: null,
    getFirstDynamicReason: null,
    getStaticShellDisallowedDynamicReasons: null,
    isDynamicPostpone: null,
    isPrerenderInterruptedError: null,
    logDisallowedDynamicError: null,
    markCurrentScopeAsDynamic: null,
    postponeWithTracking: null,
    throwIfDisallowedDynamic: null,
    throwToInterruptStaticGeneration: null,
    trackAllowedDynamicAccess: null,
    trackDynamicDataInDynamicRender: null,
    trackDynamicHoleInRuntimeShell: null,
    trackDynamicHoleInStaticShell: null,
    useDynamicRouteParams: null,
    useDynamicSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    PreludeState: function() {
        return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createRenderInBrowserAbortSignal: function() {
        return createRenderInBrowserAbortSignal;
    },
    delayUntilRuntimeStage: function() {
        return delayUntilRuntimeStage;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    getStaticShellDisallowedDynamicReasons: function() {
        return getStaticShellDisallowedDynamicReasons;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    logDisallowedDynamicError: function() {
        return logDisallowedDynamicError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackDynamicHoleInRuntimeShell: function() {
        return trackDynamicHoleInRuntimeShell;
    },
    trackDynamicHoleInStaticShell: function() {
        return trackDynamicHoleInStaticShell;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    },
    useDynamicSearchParams: function() {
        return useDynamicSearchParams;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
const _hooksservercontext = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _boundaryconstants = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/lib/framework/boundary-constants.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        dynamicMetadata: null,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    workUnitStore.usedDynamic = true;
                }
                break;
            default:
                workUnitStore;
        }
    }
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
            break;
        case 'request':
            if ("TURBOPACK compile-time truthy", 1) {
                workUnitStore.usedDynamic = true;
            }
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    // It is important that we set this tracking value after aborting. Aborts are executed
    // synchronously except for the case where you abort during render itself. By setting this
    // value late we can use it to determine if any of the aborted tasks are the task that
    // called the sync IO expression in the first place.
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // It is important that we set this tracking value after aborting. Aborts are executed
        // synchronously except for the case where you abort during render itself. By setting this
        // value late we can use it to determine if any of the aborted tasks are the task that
        // called the sync IO expression in the first place.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the runtime stage,
                // at which point all runtime inputs will be resolved.
                // (otherwise, a runtime prerender might consider `cookies()` hanging
                //  even though they'd resolve in the next task.)
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const runtimeStagePromise = (0, _workunitasyncstorageexternal.getRuntimeStagePromise)(workUnitStore);
                if (runtimeStagePromise) {
                    runtimeStagePromise.then(()=>(0, _scheduler.scheduleOnNextTick)(()=>controller.abort()));
                } else {
                    (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return undefined;
        default:
            workUnitStore;
    }
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
            case 'prerender':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                    }
                    break;
                }
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
function useDynamicSearchParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore) {
        // We assume pages router context and just return
        return;
    }
    if (!workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(expression);
    }
    switch(workUnitStore.type){
        case 'prerender-client':
            {
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                break;
            }
        case 'prerender-legacy':
        case 'prerender-ppr':
            {
                if (workStore.forceStatic) {
                    return;
                }
                throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-runtime':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E795",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
            });
        case 'request':
            return;
        default:
            workUnitStore;
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": Uncached data was accessed outside of ` + '<Suspense>. This delays the entire page from rendering, resulting in a ' + 'slow user experience. Learn more: ' + 'https://nextjs.org/docs/messages/blocking-route';
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
function trackDynamicHoleInRuntimeShell(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
function trackDynamicHoleInStaticShell(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicMetadata = error;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 */ function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    // TODO go back to owner stack here if available. This is temporarily using componentStack to get the right
    //
    error.stack = error.name + ': ' + message + (ownerStack || componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
        if (workStore.hasReadableErrorStacks) {
            console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        } else {
            console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        }
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
        logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    if (prelude !== 0) {
        if (dynamicValidation.hasSuspenseAboveBody) {
            // This route has opted into allowing fully dynamic rendering
            // by including a Suspense boundary above the body. In this case
            // a lack of a shell is not considered disallowed so we simply return
            return;
        }
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    } else {
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    }
}
function getStaticShellDisallowedDynamicReasons(workStore, prelude, dynamicValidation) {
    if (dynamicValidation.hasSuspenseAboveBody) {
        // This route has opted into allowing fully dynamic rendering
        // by including a Suspense boundary above the body. In this case
        // a lack of a shell is not considered disallowed so we simply return
        return [];
    }
    if (prelude !== 0) {
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            return dynamicErrors;
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            return [
                Object.defineProperty(new _invarianterror.InvariantError(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                    value: "E936",
                    enumerable: false,
                    configurable: true
                })
            ];
        }
    } else {
        // We have a prelude but we might still have dynamic metadata without any other dynamic access
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicErrors.length === 0 && dynamicValidation.dynamicMetadata) {
            return [
                dynamicValidation.dynamicMetadata
            ];
        }
    }
    // We had a non-empty prelude and there are no dynamic holes
    return [];
}
function delayUntilRuntimeStage(prerenderStore, result) {
    if (prerenderStore.runtimeStagePromise) {
        return prerenderStore.runtimeStagePromise.then(()=>result);
    }
    return result;
} //# sourceMappingURL=dynamic-rendering.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", {
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Cache Components is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache((key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if ("TURBOPACK compile-time truthy", 1) {
            var _stack;
            const callStackFrames = (_stack = new Error().stack) == null ? void 0 : _stack.split('\n');
            if (callStackFrames === undefined || callStackFrames.length < 4) {
                logErrorOrWarn(message);
            } else {
                // Error:
                //   logDedupedError
                //   asyncApiBeingAccessedSynchronously
                //   <userland callsite>
                // TODO: This breaks if sourcemaps with ignore lists are enabled.
                const key = callStackFrames[4];
                errorRef.current = message;
                flushCurrentErrorIfNew(key);
            }
        } else //TURBOPACK unreachable
        ;
    };
} //# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isRequestAPICallableInsideAfter: null,
    throwForSearchParamsAccessInUseCache: null,
    throwWithStaticGenerationBailoutErrorWithDynamicError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isRequestAPICallableInsideAfter: function() {
        return isRequestAPICallableInsideAfter;
    },
    throwForSearchParamsAccessInUseCache: function() {
        return throwForSearchParamsAccessInUseCache;
    },
    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
    }
});
const _staticgenerationbailout = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _aftertaskasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)");
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E842",
        enumerable: false,
        configurable: true
    });
    Error.captureStackTrace(error, constructorOpt);
    workStore.invalidDynamicUsageError ??= error;
    throw error;
}
function isRequestAPICallableInsideAfter() {
    const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
} //# sourceMappingURL=utils.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPromiseWithResolvers", {
    enumerable: true,
    get: function() {
        return createPromiseWithResolvers;
    }
});
function createPromiseWithResolvers() {
    // Shim of Stage 4 Promise.withResolvers proposal
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise
    };
} //# sourceMappingURL=promise-with-resolvers.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/staged-rendering.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RenderStage: null,
    StagedRenderingController: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RenderStage: function() {
        return RenderStage;
    },
    StagedRenderingController: function() {
        return StagedRenderingController;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _promisewithresolvers = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-rsc] (ecmascript)");
var RenderStage = /*#__PURE__*/ function(RenderStage) {
    RenderStage[RenderStage["Before"] = 1] = "Before";
    RenderStage[RenderStage["Static"] = 2] = "Static";
    RenderStage[RenderStage["Runtime"] = 3] = "Runtime";
    RenderStage[RenderStage["Dynamic"] = 4] = "Dynamic";
    RenderStage[RenderStage["Abandoned"] = 5] = "Abandoned";
    return RenderStage;
}({});
class StagedRenderingController {
    constructor(abortSignal = null, hasRuntimePrefetch){
        this.abortSignal = abortSignal;
        this.hasRuntimePrefetch = hasRuntimePrefetch;
        this.currentStage = 1;
        this.staticInterruptReason = null;
        this.runtimeInterruptReason = null;
        this.staticStageEndTime = Infinity;
        this.runtimeStageEndTime = Infinity;
        this.runtimeStageListeners = [];
        this.dynamicStageListeners = [];
        this.runtimeStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        this.dynamicStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        this.mayAbandon = false;
        if (abortSignal) {
            abortSignal.addEventListener('abort', ()=>{
                const { reason } = abortSignal;
                if (this.currentStage < 3) {
                    this.runtimeStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.runtimeStagePromise.reject(reason);
                }
                if (this.currentStage < 4 || this.currentStage === 5) {
                    this.dynamicStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.dynamicStagePromise.reject(reason);
                }
            }, {
                once: true
            });
            this.mayAbandon = true;
        }
    }
    onStage(stage, callback) {
        if (this.currentStage >= stage) {
            callback();
        } else if (stage === 3) {
            this.runtimeStageListeners.push(callback);
        } else if (stage === 4) {
            this.dynamicStageListeners.push(callback);
        } else {
            // This should never happen
            throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
                value: "E881",
                enumerable: false,
                configurable: true
            });
        }
    }
    canSyncInterrupt() {
        // If we haven't started the render yet, it can't be interrupted.
        if (this.currentStage === 1) {
            return false;
        }
        const boundaryStage = this.hasRuntimePrefetch ? 4 : 3;
        return this.currentStage < boundaryStage;
    }
    syncInterruptCurrentStageWithReason(reason) {
        if (this.currentStage === 1) {
            return;
        }
        // If Sync IO occurs during the initial (abandonable) render, we'll retry it,
        // so we want a slightly different flow.
        // See the implementation of `abandonRenderImpl` for more explanation.
        if (this.mayAbandon) {
            return this.abandonRenderImpl();
        }
        // If we're in the final render, we cannot abandon it. We need to advance to the Dynamic stage
        // and capture the interruption reason.
        switch(this.currentStage){
            case 2:
                {
                    this.staticInterruptReason = reason;
                    this.advanceStage(4);
                    return;
                }
            case 3:
                {
                    // We only error for Sync IO in the runtime stage if the route
                    // is configured to use runtime prefetching.
                    // We do this to reflect the fact that during a runtime prefetch,
                    // Sync IO aborts aborts the render.
                    // Note that `canSyncInterrupt` should prevent us from getting here at all
                    // if runtime prefetching isn't enabled.
                    if (this.hasRuntimePrefetch) {
                        this.runtimeInterruptReason = reason;
                        this.advanceStage(4);
                    }
                    return;
                }
            case 4:
            case 5:
            default:
        }
    }
    getStaticInterruptReason() {
        return this.staticInterruptReason;
    }
    getRuntimeInterruptReason() {
        return this.runtimeInterruptReason;
    }
    getStaticStageEndTime() {
        return this.staticStageEndTime;
    }
    getRuntimeStageEndTime() {
        return this.runtimeStageEndTime;
    }
    abandonRender() {
        if (!this.mayAbandon) {
            throw Object.defineProperty(new _invarianterror.InvariantError('`abandonRender` called on a stage controller that cannot be abandoned.'), "__NEXT_ERROR_CODE", {
                value: "E938",
                enumerable: false,
                configurable: true
            });
        }
        this.abandonRenderImpl();
    }
    abandonRenderImpl() {
        // In staged rendering, only the initial render is abandonable.
        // We can abandon the initial render if
        //   1. We notice a cache miss, and need to wait for caches to fill
        //   2. A sync IO error occurs, and the render should be interrupted
        //      (this might be a lazy intitialization of a module,
        //       so we still want to restart in this case and see if it still occurs)
        // In either case, we'll be doing another render after this one,
        // so we only want to unblock the Runtime stage, not Dynamic, because
        // unblocking the dynamic stage would likely lead to wasted (uncached) IO.
        const { currentStage } = this;
        switch(currentStage){
            case 2:
                {
                    this.currentStage = 5;
                    this.resolveRuntimeStage();
                    return;
                }
            case 3:
                {
                    this.currentStage = 5;
                    return;
                }
            case 4:
            case 1:
            case 5:
                break;
            default:
                {
                    currentStage;
                }
        }
    }
    advanceStage(stage) {
        // If we're already at the target stage or beyond, do nothing.
        // (this can happen e.g. if sync IO advanced us to the dynamic stage)
        if (stage <= this.currentStage) {
            return;
        }
        let currentStage = this.currentStage;
        this.currentStage = stage;
        if (currentStage < 3 && stage >= 3) {
            this.staticStageEndTime = performance.now() + performance.timeOrigin;
            this.resolveRuntimeStage();
        }
        if (currentStage < 4 && stage >= 4) {
            this.runtimeStageEndTime = performance.now() + performance.timeOrigin;
            this.resolveDynamicStage();
            return;
        }
    }
    /** Fire the `onStage` listeners for the runtime stage and unblock any promises waiting for it. */ resolveRuntimeStage() {
        const runtimeListeners = this.runtimeStageListeners;
        for(let i = 0; i < runtimeListeners.length; i++){
            runtimeListeners[i]();
        }
        runtimeListeners.length = 0;
        this.runtimeStagePromise.resolve();
    }
    /** Fire the `onStage` listeners for the dynamic stage and unblock any promises waiting for it. */ resolveDynamicStage() {
        const dynamicListeners = this.dynamicStageListeners;
        for(let i = 0; i < dynamicListeners.length; i++){
            dynamicListeners[i]();
        }
        dynamicListeners.length = 0;
        this.dynamicStagePromise.resolve();
    }
    getStagePromise(stage) {
        switch(stage){
            case 3:
                {
                    return this.runtimeStagePromise.promise;
                }
            case 4:
                {
                    return this.dynamicStagePromise.promise;
                }
            default:
                {
                    stage;
                    throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
                        value: "E881",
                        enumerable: false,
                        configurable: true
                    });
                }
        }
    }
    waitForStage(stage) {
        return this.getStagePromise(stage);
    }
    delayUntilStage(stage, displayName, resolvedValue) {
        const ioTriggerPromise = this.getStagePromise(stage);
        const promise = makeDevtoolsIOPromiseFromIOTrigger(ioTriggerPromise, displayName, resolvedValue);
        // Analogously to `makeHangingPromise`, we might reject this promise if the signal is invoked.
        // (e.g. in the case where we don't want want the render to proceed to the dynamic stage and abort it).
        // We shouldn't consider this an unhandled rejection, so we attach a noop catch handler here to suppress this warning.
        if (this.abortSignal) {
            promise.catch(ignoreReject);
        }
        return promise;
    }
}
function ignoreReject() {}
// TODO(restart-on-cache-miss): the layering of `delayUntilStage`,
// `makeDevtoolsIOPromiseFromIOTrigger` and and `makeDevtoolsIOAwarePromise`
// is confusing, we should clean it up.
function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
    // If we create a `new Promise` and give it a displayName
    // (with no userspace code above us in the stack)
    // React Devtools will use it as the IO cause when determining "suspended by".
    // In particular, it should shadow any inner IO that resolved/rejected the promise
    // (in case of staged rendering, this will be the `setTimeout` that triggers the relevant stage)
    const promise = new Promise((resolve, reject)=>{
        ioTrigger.then(resolve.bind(null, resolvedValue), reject);
    });
    if (displayName !== undefined) {
        // @ts-expect-error
        promise.displayName = displayName;
    }
    return promise;
} //# sourceMappingURL=staged-rendering.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cookies", {
    enumerable: true,
    get: function() {
        return cookies;
    }
});
const _requestcookies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js [app-rsc] (ecmascript)");
const _cookies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/staged-rendering.js [app-rsc] (ecmascript)");
function cookies() {
    const callingExpression = 'cookies';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E843",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // cookies object without tracking
            const underlyingCookies = createEmptyCookies();
            return makeUntrackedCookies(underlyingCookies);
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E849",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                        value: "E831",
                        enumerable: false,
                        configurable: true
                    });
                    Error.captureStackTrace(error, cookies);
                    workStore.invalidDynamicUsageError ??= error;
                    throw error;
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E846",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                    return makeHangingCookies(workStore, workUnitStore);
                case 'prerender-client':
                    const exportName = '`cookies`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a Client Component. Next.js should be preventing ${exportName} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E832",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    // We need track dynamic access here eagerly to keep continuity with
                    // how cookies has worked in PPR without cacheComponents.
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // We track dynamic access here so we don't need to wrap the cookies
                    // in individual property access tracking.
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
                case 'prerender-runtime':
                    return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, makeUntrackedCookies(workUnitStore.cookies));
                case 'private-cache':
                    // Private caches are delayed until the runtime stage in use-cache-wrapper,
                    // so we don't need an additional delay here.
                    return makeUntrackedCookies(workUnitStore.cookies);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    let underlyingCookies;
                    if ((0, _requestcookies.areCookiesMutableInCurrentPhase)(workUnitStore)) {
                        // We can't conditionally return different types here based on the context.
                        // To avoid confusion, we always return the readonly type here.
                        underlyingCookies = workUnitStore.userspaceMutableCookies;
                    } else {
                        underlyingCookies = workUnitStore.cookies;
                    }
                    if ("TURBOPACK compile-time truthy", 1) {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        return makeUntrackedCookiesWithDevWarnings(workUnitStore, underlyingCookies, workStore == null ? void 0 : workStore.route);
                    } else //TURBOPACK unreachable
                    ;
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
}
function createEmptyCookies() {
    return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
}
const CachedCookies = new WeakMap();
function makeHangingCookies(workStore, prerenderStore) {
    const cachedPromise = CachedCookies.get(prerenderStore);
    if (cachedPromise) {
        return cachedPromise;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`cookies()`');
    CachedCookies.set(prerenderStore, promise);
    return promise;
}
function makeUntrackedCookies(underlyingCookies) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = Promise.resolve(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    return promise;
}
function makeUntrackedCookiesWithDevWarnings(requestStore, underlyingCookies, route) {
    if (requestStore.asyncApiPromises) {
        let promise;
        if (underlyingCookies === requestStore.mutableCookies) {
            promise = requestStore.asyncApiPromises.mutableCookies;
        } else if (underlyingCookies === requestStore.cookies) {
            promise = requestStore.asyncApiPromises.cookies;
        } else {
            throw Object.defineProperty(new _invarianterror.InvariantError('Received an underlying cookies object that does not match either `cookies` or `mutableCookies`'), "__NEXT_ERROR_CODE", {
                value: "E890",
                enumerable: false,
                configurable: true
            });
        }
        return instrumentCookiesPromiseWithDevWarnings(promise, route);
    }
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingCookies, requestStore, _stagedrendering.RenderStage.Runtime);
    const proxiedPromise = instrumentCookiesPromiseWithDevWarnings(promise, route);
    CachedCookies.set(underlyingCookies, proxiedPromise);
    return proxiedPromise;
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createCookiesAccessError);
function instrumentCookiesPromiseWithDevWarnings(promise, route) {
    Object.defineProperties(promise, {
        [Symbol.iterator]: replaceableWarningDescriptorForSymbolIterator(promise, route),
        size: replaceableWarningDescriptor(promise, 'size', route),
        get: replaceableWarningDescriptor(promise, 'get', route),
        getAll: replaceableWarningDescriptor(promise, 'getAll', route),
        has: replaceableWarningDescriptor(promise, 'has', route),
        set: replaceableWarningDescriptor(promise, 'set', route),
        delete: replaceableWarningDescriptor(promise, 'delete', route),
        clear: replaceableWarningDescriptor(promise, 'clear', route),
        toString: replaceableWarningDescriptor(promise, 'toString', route)
    });
    return promise;
}
function replaceableWarningDescriptor(target, prop, route) {
    return {
        enumerable: false,
        get () {
            warnForSyncAccess(route, `\`cookies().${prop}\``);
            return undefined;
        },
        set (value) {
            Object.defineProperty(target, prop, {
                value,
                writable: true,
                configurable: true
            });
        },
        configurable: true
    };
}
function replaceableWarningDescriptorForSymbolIterator(target, route) {
    return {
        enumerable: false,
        get () {
            warnForSyncAccess(route, '`...cookies()` or similar iteration');
            return undefined;
        },
        set (value) {
            Object.defineProperty(target, Symbol.iterator, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        },
        configurable: true
    };
}
function createCookiesAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E830",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=cookies.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HeadersAdapter: null,
    ReadonlyHeadersError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HeadersAdapter: function() {
        return HeadersAdapter;
    },
    ReadonlyHeadersError: function() {
        return ReadonlyHeadersError;
    }
});
const _reflect = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "headers", {
    enumerable: true,
    get: function() {
        return headers;
    }
});
const _headers = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/staged-rendering.js [app-rsc] (ecmascript)");
function headers() {
    const callingExpression = 'headers';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E839",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            const underlyingHeaders = _headers.HeadersAdapter.seal(new Headers({}));
            return makeUntrackedHeaders(underlyingHeaders);
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E833",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, headers);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E838",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-client':
                case 'private-cache':
                case 'prerender-runtime':
                case 'prerender-ppr':
                case 'prerender-legacy':
                case 'request':
                    break;
                default:
                    workUnitStore;
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E828",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'prerender':
                    return makeHangingHeaders(workStore, workUnitStore);
                case 'prerender-client':
                    const exportName = '`headers`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E693",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    // PPR Prerender (no cacheComponents)
                    // We are prerendering with PPR. We need track dynamic access here eagerly
                    // to keep continuity with how headers has worked in PPR without cacheComponents.
                    // TODO consider switching the semantic to throw on property access instead
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // Legacy Prerender
                    // We are in a legacy static generation mode while prerendering
                    // We track dynamic access here so we don't need to wrap the headers in
                    // individual property access tracking.
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
                case 'prerender-runtime':
                    return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, makeUntrackedHeaders(workUnitStore.headers));
                case 'private-cache':
                    // Private caches are delayed until the runtime stage in use-cache-wrapper,
                    // so we don't need an additional delay here.
                    return makeUntrackedHeaders(workUnitStore.headers);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    if ("TURBOPACK compile-time truthy", 1) {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        return makeUntrackedHeadersWithDevWarnings(workUnitStore.headers, workStore == null ? void 0 : workStore.route, workUnitStore);
                    } else //TURBOPACK unreachable
                    ;
                    //TURBOPACK unreachable
                    ;
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
}
const CachedHeaders = new WeakMap();
function makeHangingHeaders(workStore, prerenderStore) {
    const cachedHeaders = CachedHeaders.get(prerenderStore);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`headers()`');
    CachedHeaders.set(prerenderStore, promise);
    return promise;
}
function makeUntrackedHeaders(underlyingHeaders) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = Promise.resolve(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    return promise;
}
function makeUntrackedHeadersWithDevWarnings(underlyingHeaders, route, requestStore) {
    if (requestStore.asyncApiPromises) {
        const promise = requestStore.asyncApiPromises.headers;
        return instrumentHeadersPromiseWithDevWarnings(promise, route);
    }
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingHeaders, requestStore, _stagedrendering.RenderStage.Runtime);
    const proxiedPromise = instrumentHeadersPromiseWithDevWarnings(promise, route);
    CachedHeaders.set(underlyingHeaders, proxiedPromise);
    return proxiedPromise;
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createHeadersAccessError);
function instrumentHeadersPromiseWithDevWarnings(promise, route) {
    Object.defineProperties(promise, {
        [Symbol.iterator]: replaceableWarningDescriptorForSymbolIterator(promise, route),
        append: replaceableWarningDescriptor(promise, 'append', route),
        delete: replaceableWarningDescriptor(promise, 'delete', route),
        get: replaceableWarningDescriptor(promise, 'get', route),
        has: replaceableWarningDescriptor(promise, 'has', route),
        set: replaceableWarningDescriptor(promise, 'set', route),
        getSetCookie: replaceableWarningDescriptor(promise, 'getSetCookie', route),
        forEach: replaceableWarningDescriptor(promise, 'forEach', route),
        keys: replaceableWarningDescriptor(promise, 'keys', route),
        values: replaceableWarningDescriptor(promise, 'values', route),
        entries: replaceableWarningDescriptor(promise, 'entries', route)
    });
    return promise;
}
function replaceableWarningDescriptor(target, prop, route) {
    return {
        enumerable: false,
        get () {
            warnForSyncAccess(route, `\`headers().${prop}\``);
            return undefined;
        },
        set (value) {
            Object.defineProperty(target, prop, {
                value,
                writable: true,
                configurable: true
            });
        },
        configurable: true
    };
}
function replaceableWarningDescriptorForSymbolIterator(target, route) {
    return {
        enumerable: false,
        get () {
            warnForSyncAccess(route, '`...headers()` or similar iteration');
            return undefined;
        },
        set (value) {
            Object.defineProperty(target, Symbol.iterator, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        },
        configurable: true
    };
}
function createHeadersAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E836",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=headers.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/draft-mode.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "draftMode", {
    enumerable: true,
    get: function() {
        return draftMode;
    }
});
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
function draftMode() {
    const callingExpression = 'draftMode';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || !workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
    }
    switch(workUnitStore.type){
        case 'prerender-runtime':
            // TODO(runtime-ppr): does it make sense to delay this? normally it's always microtasky
            return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, createOrGetCachedDraftMode(workUnitStore.draftMode, workStore));
        case 'request':
            return createOrGetCachedDraftMode(workUnitStore.draftMode, workStore);
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            // Inside of `"use cache"` or `unstable_cache`, draft mode is available if
            // the outmost work unit store is a request store (or a runtime prerender),
            // and if draft mode is enabled.
            const draftModeProvider = (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore);
            if (draftModeProvider) {
                return createOrGetCachedDraftMode(draftModeProvider, workStore);
            }
        // Otherwise, we fall through to providing an empty draft mode.
        // eslint-disable-next-line no-fallthrough
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
            // Return empty draft mode
            return createOrGetCachedDraftMode(null, workStore);
        default:
            return workUnitStore;
    }
}
function createOrGetCachedDraftMode(draftModeProvider, workStore) {
    const cacheKey = draftModeProvider ?? NullDraftMode;
    const cachedDraftMode = CachedDraftModes.get(cacheKey);
    if (cachedDraftMode) {
        return cachedDraftMode;
    }
    if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
        const route = workStore == null ? void 0 : workStore.route;
        return createDraftModeWithDevWarnings(draftModeProvider, route);
    } else {
        return Promise.resolve(new DraftMode(draftModeProvider));
    }
}
const NullDraftMode = {};
const CachedDraftModes = new WeakMap();
function createDraftModeWithDevWarnings(underlyingProvider, route) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            switch(prop){
                case 'isEnabled':
                    warnForSyncAccess(route, `\`draftMode().${prop}\``);
                    break;
                case 'enable':
                case 'disable':
                    {
                        warnForSyncAccess(route, `\`draftMode().${prop}()\``);
                        break;
                    }
                default:
                    {
                    // We only warn for well-defined properties of the draftMode object.
                    }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        }
    });
    return proxiedPromise;
}
class DraftMode {
    constructor(provider){
        this._provider = provider;
    }
    get isEnabled() {
        if (this._provider !== null) {
            return this._provider.isEnabled;
        }
        return false;
    }
    enable() {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        trackDynamicDraftMode('draftMode().enable()', this.enable);
        if (this._provider !== null) {
            this._provider.enable();
        }
    }
    disable() {
        trackDynamicDraftMode('draftMode().disable()', this.disable);
        if (this._provider !== null) {
            this._provider.disable();
        }
    }
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createDraftModeAccessError);
function createDraftModeAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E835",
        enumerable: false,
        configurable: true
    });
}
function trackDynamicDraftMode(expression, constructorOpt) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        if ((workUnitStore == null ? void 0 : workUnitStore.phase) === 'after') {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside \`after()\`. The enabled status of \`draftMode()\` can be read inside \`after()\` but you cannot enable or disable \`draftMode()\`. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E845",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E553",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                case 'private-cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside "use cache". The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E829",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, constructorOpt);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside a function cached with \`unstable_cache()\`. The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E844",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-runtime':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used ${expression} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
                            value: "E126",
                            enumerable: false,
                            configurable: true
                        });
                        return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(workStore.route, expression, error, workUnitStore);
                    }
                case 'prerender-client':
                    const exportName = '`draftMode`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a Client Component. Next.js should be preventing ${exportName} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E832",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    workUnitStore.revalidate = 0;
                    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${workStore.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                        value: "E558",
                        enumerable: false,
                        configurable: true
                    });
                    workStore.dynamicUsageDescription = expression;
                    workStore.dynamicUsageStack = err.stack;
                    throw err;
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    break;
                default:
                    workUnitStore;
            }
        }
    }
} //# sourceMappingURL=draft-mode.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports.cookies = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/cookies.js [app-rsc] (ecmascript)").cookies;
module.exports.headers = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/headers.js [app-rsc] (ecmascript)").headers;
module.exports.draftMode = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/request/draft-mode.js [app-rsc] (ecmascript)").draftMode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/readonly-url-search-params.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * ReadonlyURLSearchParams implementation shared between client and server.
 * This file is intentionally not marked as 'use client' or 'use server'
 * so it can be imported by both environments.
 */ /** @internal */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReadonlyURLSearchParams", {
    enumerable: true,
    get: function() {
        return ReadonlyURLSearchParams;
    }
});
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=readonly-url-search-params.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-status-code.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedirectStatusCode", {
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
});
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    REDIRECT_ERROR_CODE: null,
    RedirectType: null,
    isRedirectError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRedirectError: null,
    getRedirectStatusCodeFromError: null,
    getRedirectTypeFromError: null,
    getURLFromRedirectError: null,
    permanentRedirect: null,
    redirect: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-error.js [app-rsc] (ecmascript)");
const actionAsyncStorage = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)").actionAsyncStorage : "TURBOPACK unreachable";
function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    type ??= actionAsyncStorage?.getStore()?.isAction ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type = _redirecterror.RedirectType.replace) {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTTPAccessErrorStatus: null,
    HTTP_ERROR_FALLBACK_ERROR_CODE: null,
    getAccessFallbackErrorTypeByStatus: null,
    getAccessFallbackHTTPStatus: null,
    isHTTPAccessFallbackError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/not-found.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "notFound", {
    enumerable: true,
    get: function() {
        return notFound;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)");
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/forbidden.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "forbidden", {
    enumerable: true,
    get: function() {
        return forbidden;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)");
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
function forbidden() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unauthorized.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unauthorized", {
    enumerable: true,
    get: function() {
        return unauthorized;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)");
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
function unauthorized() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
        return isPostpone;
    }
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/is-next-router-error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-rsc] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-error.js [app-rsc] (ecmascript)");
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const _dynamicrenderingutils = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-rsc] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-rsc] (ecmascript)");
const _isnextroutererror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/is-next-router-error.js [app-rsc] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.server.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unstable-rethrow.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const unstable_rethrow = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-rsc] (ecmascript)").unstable_rethrow : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_isUnrecognizedActionError: null,
    unstable_rethrow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _redirecterror.RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _readonlyurlsearchparams = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/readonly-url-search-params.js [app-rsc] (ecmascript)");
const _redirect = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect.js [app-rsc] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/redirect-error.js [app-rsc] (ecmascript)");
const _notfound = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/not-found.js [app-rsc] (ecmascript)");
const _forbidden = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/forbidden.js [app-rsc] (ecmascript)");
const _unauthorized = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unauthorized.js [app-rsc] (ecmascript)");
const _unstablerethrow = __turbopack_context__.r("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/unstable-rethrow.js [app-rsc] (ecmascript)");
function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=navigation.react-server.js.map
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACESFilmicToneMapping",
    ()=>ACESFilmicToneMapping,
    "AddEquation",
    ()=>AddEquation,
    "AddOperation",
    ()=>AddOperation,
    "AdditiveAnimationBlendMode",
    ()=>AdditiveAnimationBlendMode,
    "AdditiveBlending",
    ()=>AdditiveBlending,
    "AgXToneMapping",
    ()=>AgXToneMapping,
    "AlphaFormat",
    ()=>AlphaFormat,
    "AlwaysCompare",
    ()=>AlwaysCompare,
    "AlwaysDepth",
    ()=>AlwaysDepth,
    "AlwaysStencilFunc",
    ()=>AlwaysStencilFunc,
    "AttachedBindMode",
    ()=>AttachedBindMode,
    "BackSide",
    ()=>BackSide,
    "BasicDepthPacking",
    ()=>BasicDepthPacking,
    "BasicShadowMap",
    ()=>BasicShadowMap,
    "ByteType",
    ()=>ByteType,
    "CineonToneMapping",
    ()=>CineonToneMapping,
    "ClampToEdgeWrapping",
    ()=>ClampToEdgeWrapping,
    "Compatibility",
    ()=>Compatibility,
    "ConstantAlphaFactor",
    ()=>ConstantAlphaFactor,
    "ConstantColorFactor",
    ()=>ConstantColorFactor,
    "CubeReflectionMapping",
    ()=>CubeReflectionMapping,
    "CubeRefractionMapping",
    ()=>CubeRefractionMapping,
    "CubeUVReflectionMapping",
    ()=>CubeUVReflectionMapping,
    "CullFaceBack",
    ()=>CullFaceBack,
    "CullFaceFront",
    ()=>CullFaceFront,
    "CullFaceFrontBack",
    ()=>CullFaceFrontBack,
    "CullFaceNone",
    ()=>CullFaceNone,
    "CustomBlending",
    ()=>CustomBlending,
    "CustomToneMapping",
    ()=>CustomToneMapping,
    "DecrementStencilOp",
    ()=>DecrementStencilOp,
    "DecrementWrapStencilOp",
    ()=>DecrementWrapStencilOp,
    "DepthFormat",
    ()=>DepthFormat,
    "DepthStencilFormat",
    ()=>DepthStencilFormat,
    "DetachedBindMode",
    ()=>DetachedBindMode,
    "DoubleSide",
    ()=>DoubleSide,
    "DstAlphaFactor",
    ()=>DstAlphaFactor,
    "DstColorFactor",
    ()=>DstColorFactor,
    "DynamicCopyUsage",
    ()=>DynamicCopyUsage,
    "DynamicDrawUsage",
    ()=>DynamicDrawUsage,
    "DynamicReadUsage",
    ()=>DynamicReadUsage,
    "EqualCompare",
    ()=>EqualCompare,
    "EqualDepth",
    ()=>EqualDepth,
    "EqualStencilFunc",
    ()=>EqualStencilFunc,
    "EquirectangularReflectionMapping",
    ()=>EquirectangularReflectionMapping,
    "EquirectangularRefractionMapping",
    ()=>EquirectangularRefractionMapping,
    "FloatType",
    ()=>FloatType,
    "FrontSide",
    ()=>FrontSide,
    "GLSL1",
    ()=>GLSL1,
    "GLSL3",
    ()=>GLSL3,
    "GreaterCompare",
    ()=>GreaterCompare,
    "GreaterDepth",
    ()=>GreaterDepth,
    "GreaterEqualCompare",
    ()=>GreaterEqualCompare,
    "GreaterEqualDepth",
    ()=>GreaterEqualDepth,
    "GreaterEqualStencilFunc",
    ()=>GreaterEqualStencilFunc,
    "GreaterStencilFunc",
    ()=>GreaterStencilFunc,
    "HalfFloatType",
    ()=>HalfFloatType,
    "IncrementStencilOp",
    ()=>IncrementStencilOp,
    "IncrementWrapStencilOp",
    ()=>IncrementWrapStencilOp,
    "IntType",
    ()=>IntType,
    "InterpolateBezier",
    ()=>InterpolateBezier,
    "InterpolateDiscrete",
    ()=>InterpolateDiscrete,
    "InterpolateLinear",
    ()=>InterpolateLinear,
    "InterpolateSmooth",
    ()=>InterpolateSmooth,
    "InterpolationSamplingMode",
    ()=>InterpolationSamplingMode,
    "InterpolationSamplingType",
    ()=>InterpolationSamplingType,
    "InvertStencilOp",
    ()=>InvertStencilOp,
    "KeepStencilOp",
    ()=>KeepStencilOp,
    "LessCompare",
    ()=>LessCompare,
    "LessDepth",
    ()=>LessDepth,
    "LessEqualCompare",
    ()=>LessEqualCompare,
    "LessEqualDepth",
    ()=>LessEqualDepth,
    "LessEqualStencilFunc",
    ()=>LessEqualStencilFunc,
    "LessStencilFunc",
    ()=>LessStencilFunc,
    "LinearFilter",
    ()=>LinearFilter,
    "LinearMipMapLinearFilter",
    ()=>LinearMipMapLinearFilter,
    "LinearMipMapNearestFilter",
    ()=>LinearMipMapNearestFilter,
    "LinearMipmapLinearFilter",
    ()=>LinearMipmapLinearFilter,
    "LinearMipmapNearestFilter",
    ()=>LinearMipmapNearestFilter,
    "LinearSRGBColorSpace",
    ()=>LinearSRGBColorSpace,
    "LinearToneMapping",
    ()=>LinearToneMapping,
    "LinearTransfer",
    ()=>LinearTransfer,
    "LoopOnce",
    ()=>LoopOnce,
    "LoopPingPong",
    ()=>LoopPingPong,
    "LoopRepeat",
    ()=>LoopRepeat,
    "MOUSE",
    ()=>MOUSE,
    "MaterialBlending",
    ()=>MaterialBlending,
    "MaxEquation",
    ()=>MaxEquation,
    "MinEquation",
    ()=>MinEquation,
    "MirroredRepeatWrapping",
    ()=>MirroredRepeatWrapping,
    "MixOperation",
    ()=>MixOperation,
    "MultiplyBlending",
    ()=>MultiplyBlending,
    "MultiplyOperation",
    ()=>MultiplyOperation,
    "NearestFilter",
    ()=>NearestFilter,
    "NearestMipMapLinearFilter",
    ()=>NearestMipMapLinearFilter,
    "NearestMipMapNearestFilter",
    ()=>NearestMipMapNearestFilter,
    "NearestMipmapLinearFilter",
    ()=>NearestMipmapLinearFilter,
    "NearestMipmapNearestFilter",
    ()=>NearestMipmapNearestFilter,
    "NeutralToneMapping",
    ()=>NeutralToneMapping,
    "NeverCompare",
    ()=>NeverCompare,
    "NeverDepth",
    ()=>NeverDepth,
    "NeverStencilFunc",
    ()=>NeverStencilFunc,
    "NoBlending",
    ()=>NoBlending,
    "NoColorSpace",
    ()=>NoColorSpace,
    "NoNormalPacking",
    ()=>NoNormalPacking,
    "NoToneMapping",
    ()=>NoToneMapping,
    "NormalAnimationBlendMode",
    ()=>NormalAnimationBlendMode,
    "NormalBlending",
    ()=>NormalBlending,
    "NormalGAPacking",
    ()=>NormalGAPacking,
    "NormalRGPacking",
    ()=>NormalRGPacking,
    "NotEqualCompare",
    ()=>NotEqualCompare,
    "NotEqualDepth",
    ()=>NotEqualDepth,
    "NotEqualStencilFunc",
    ()=>NotEqualStencilFunc,
    "ObjectSpaceNormalMap",
    ()=>ObjectSpaceNormalMap,
    "OneFactor",
    ()=>OneFactor,
    "OneMinusConstantAlphaFactor",
    ()=>OneMinusConstantAlphaFactor,
    "OneMinusConstantColorFactor",
    ()=>OneMinusConstantColorFactor,
    "OneMinusDstAlphaFactor",
    ()=>OneMinusDstAlphaFactor,
    "OneMinusDstColorFactor",
    ()=>OneMinusDstColorFactor,
    "OneMinusSrcAlphaFactor",
    ()=>OneMinusSrcAlphaFactor,
    "OneMinusSrcColorFactor",
    ()=>OneMinusSrcColorFactor,
    "PCFShadowMap",
    ()=>PCFShadowMap,
    "PCFSoftShadowMap",
    ()=>PCFSoftShadowMap,
    "R11_EAC_Format",
    ()=>R11_EAC_Format,
    "RED_GREEN_RGTC2_Format",
    ()=>RED_GREEN_RGTC2_Format,
    "RED_RGTC1_Format",
    ()=>RED_RGTC1_Format,
    "REVISION",
    ()=>REVISION,
    "RG11_EAC_Format",
    ()=>RG11_EAC_Format,
    "RGBADepthPacking",
    ()=>RGBADepthPacking,
    "RGBAFormat",
    ()=>RGBAFormat,
    "RGBAIntegerFormat",
    ()=>RGBAIntegerFormat,
    "RGBA_ASTC_10x10_Format",
    ()=>RGBA_ASTC_10x10_Format,
    "RGBA_ASTC_10x5_Format",
    ()=>RGBA_ASTC_10x5_Format,
    "RGBA_ASTC_10x6_Format",
    ()=>RGBA_ASTC_10x6_Format,
    "RGBA_ASTC_10x8_Format",
    ()=>RGBA_ASTC_10x8_Format,
    "RGBA_ASTC_12x10_Format",
    ()=>RGBA_ASTC_12x10_Format,
    "RGBA_ASTC_12x12_Format",
    ()=>RGBA_ASTC_12x12_Format,
    "RGBA_ASTC_4x4_Format",
    ()=>RGBA_ASTC_4x4_Format,
    "RGBA_ASTC_5x4_Format",
    ()=>RGBA_ASTC_5x4_Format,
    "RGBA_ASTC_5x5_Format",
    ()=>RGBA_ASTC_5x5_Format,
    "RGBA_ASTC_6x5_Format",
    ()=>RGBA_ASTC_6x5_Format,
    "RGBA_ASTC_6x6_Format",
    ()=>RGBA_ASTC_6x6_Format,
    "RGBA_ASTC_8x5_Format",
    ()=>RGBA_ASTC_8x5_Format,
    "RGBA_ASTC_8x6_Format",
    ()=>RGBA_ASTC_8x6_Format,
    "RGBA_ASTC_8x8_Format",
    ()=>RGBA_ASTC_8x8_Format,
    "RGBA_BPTC_Format",
    ()=>RGBA_BPTC_Format,
    "RGBA_ETC2_EAC_Format",
    ()=>RGBA_ETC2_EAC_Format,
    "RGBA_PVRTC_2BPPV1_Format",
    ()=>RGBA_PVRTC_2BPPV1_Format,
    "RGBA_PVRTC_4BPPV1_Format",
    ()=>RGBA_PVRTC_4BPPV1_Format,
    "RGBA_S3TC_DXT1_Format",
    ()=>RGBA_S3TC_DXT1_Format,
    "RGBA_S3TC_DXT3_Format",
    ()=>RGBA_S3TC_DXT3_Format,
    "RGBA_S3TC_DXT5_Format",
    ()=>RGBA_S3TC_DXT5_Format,
    "RGBDepthPacking",
    ()=>RGBDepthPacking,
    "RGBFormat",
    ()=>RGBFormat,
    "RGBIntegerFormat",
    ()=>RGBIntegerFormat,
    "RGB_BPTC_SIGNED_Format",
    ()=>RGB_BPTC_SIGNED_Format,
    "RGB_BPTC_UNSIGNED_Format",
    ()=>RGB_BPTC_UNSIGNED_Format,
    "RGB_ETC1_Format",
    ()=>RGB_ETC1_Format,
    "RGB_ETC2_Format",
    ()=>RGB_ETC2_Format,
    "RGB_PVRTC_2BPPV1_Format",
    ()=>RGB_PVRTC_2BPPV1_Format,
    "RGB_PVRTC_4BPPV1_Format",
    ()=>RGB_PVRTC_4BPPV1_Format,
    "RGB_S3TC_DXT1_Format",
    ()=>RGB_S3TC_DXT1_Format,
    "RGDepthPacking",
    ()=>RGDepthPacking,
    "RGFormat",
    ()=>RGFormat,
    "RGIntegerFormat",
    ()=>RGIntegerFormat,
    "RedFormat",
    ()=>RedFormat,
    "RedIntegerFormat",
    ()=>RedIntegerFormat,
    "ReinhardToneMapping",
    ()=>ReinhardToneMapping,
    "RepeatWrapping",
    ()=>RepeatWrapping,
    "ReplaceStencilOp",
    ()=>ReplaceStencilOp,
    "ReverseSubtractEquation",
    ()=>ReverseSubtractEquation,
    "SIGNED_R11_EAC_Format",
    ()=>SIGNED_R11_EAC_Format,
    "SIGNED_RED_GREEN_RGTC2_Format",
    ()=>SIGNED_RED_GREEN_RGTC2_Format,
    "SIGNED_RED_RGTC1_Format",
    ()=>SIGNED_RED_RGTC1_Format,
    "SIGNED_RG11_EAC_Format",
    ()=>SIGNED_RG11_EAC_Format,
    "SRGBColorSpace",
    ()=>SRGBColorSpace,
    "SRGBTransfer",
    ()=>SRGBTransfer,
    "ShortType",
    ()=>ShortType,
    "SrcAlphaFactor",
    ()=>SrcAlphaFactor,
    "SrcAlphaSaturateFactor",
    ()=>SrcAlphaSaturateFactor,
    "SrcColorFactor",
    ()=>SrcColorFactor,
    "StaticCopyUsage",
    ()=>StaticCopyUsage,
    "StaticDrawUsage",
    ()=>StaticDrawUsage,
    "StaticReadUsage",
    ()=>StaticReadUsage,
    "StreamCopyUsage",
    ()=>StreamCopyUsage,
    "StreamDrawUsage",
    ()=>StreamDrawUsage,
    "StreamReadUsage",
    ()=>StreamReadUsage,
    "SubtractEquation",
    ()=>SubtractEquation,
    "SubtractiveBlending",
    ()=>SubtractiveBlending,
    "TOUCH",
    ()=>TOUCH,
    "TangentSpaceNormalMap",
    ()=>TangentSpaceNormalMap,
    "TimestampQuery",
    ()=>TimestampQuery,
    "TriangleFanDrawMode",
    ()=>TriangleFanDrawMode,
    "TriangleStripDrawMode",
    ()=>TriangleStripDrawMode,
    "TrianglesDrawMode",
    ()=>TrianglesDrawMode,
    "UVMapping",
    ()=>UVMapping,
    "UnsignedByteType",
    ()=>UnsignedByteType,
    "UnsignedInt101111Type",
    ()=>UnsignedInt101111Type,
    "UnsignedInt248Type",
    ()=>UnsignedInt248Type,
    "UnsignedInt5999Type",
    ()=>UnsignedInt5999Type,
    "UnsignedIntType",
    ()=>UnsignedIntType,
    "UnsignedShort4444Type",
    ()=>UnsignedShort4444Type,
    "UnsignedShort5551Type",
    ()=>UnsignedShort5551Type,
    "UnsignedShortType",
    ()=>UnsignedShortType,
    "VSMShadowMap",
    ()=>VSMShadowMap,
    "WebGLCoordinateSystem",
    ()=>WebGLCoordinateSystem,
    "WebGPUCoordinateSystem",
    ()=>WebGPUCoordinateSystem,
    "WrapAroundEnding",
    ()=>WrapAroundEnding,
    "ZeroCurvatureEnding",
    ()=>ZeroCurvatureEnding,
    "ZeroFactor",
    ()=>ZeroFactor,
    "ZeroSlopeEnding",
    ()=>ZeroSlopeEnding,
    "ZeroStencilOp",
    ()=>ZeroStencilOp
]);
const REVISION = '183';
const MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
};
const TOUCH = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
};
const CullFaceNone = 0;
const CullFaceBack = 1;
const CullFaceFront = 2;
const CullFaceFrontBack = 3;
const BasicShadowMap = 0;
const PCFShadowMap = 1;
const PCFSoftShadowMap = 2;
const VSMShadowMap = 3;
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const NoBlending = 0;
const NormalBlending = 1;
const AdditiveBlending = 2;
const SubtractiveBlending = 3;
const MultiplyBlending = 4;
const CustomBlending = 5;
const MaterialBlending = 6;
const AddEquation = 100;
const SubtractEquation = 101;
const ReverseSubtractEquation = 102;
const MinEquation = 103;
const MaxEquation = 104;
const ZeroFactor = 200;
const OneFactor = 201;
const SrcColorFactor = 202;
const OneMinusSrcColorFactor = 203;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const DstAlphaFactor = 206;
const OneMinusDstAlphaFactor = 207;
const DstColorFactor = 208;
const OneMinusDstColorFactor = 209;
const SrcAlphaSaturateFactor = 210;
const ConstantColorFactor = 211;
const OneMinusConstantColorFactor = 212;
const ConstantAlphaFactor = 213;
const OneMinusConstantAlphaFactor = 214;
const NeverDepth = 0;
const AlwaysDepth = 1;
const LessDepth = 2;
const LessEqualDepth = 3;
const EqualDepth = 4;
const GreaterEqualDepth = 5;
const GreaterDepth = 6;
const NotEqualDepth = 7;
const MultiplyOperation = 0;
const MixOperation = 1;
const AddOperation = 2;
const NoToneMapping = 0;
const LinearToneMapping = 1;
const ReinhardToneMapping = 2;
const CineonToneMapping = 3;
const ACESFilmicToneMapping = 4;
const CustomToneMapping = 5;
const AgXToneMapping = 6;
const NeutralToneMapping = 7;
const AttachedBindMode = 'attached';
const DetachedBindMode = 'detached';
const UVMapping = 300;
const CubeReflectionMapping = 301;
const CubeRefractionMapping = 302;
const EquirectangularReflectionMapping = 303;
const EquirectangularRefractionMapping = 304;
const CubeUVReflectionMapping = 306;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const NearestFilter = 1003;
const NearestMipmapNearestFilter = 1004;
const NearestMipMapNearestFilter = 1004; // legacy
const NearestMipmapLinearFilter = 1005;
const NearestMipMapLinearFilter = 1005; // legacy
const LinearFilter = 1006;
const LinearMipmapNearestFilter = 1007;
const LinearMipMapNearestFilter = 1007; // legacy
const LinearMipmapLinearFilter = 1008;
const LinearMipMapLinearFilter = 1008; // legacy
const UnsignedByteType = 1009;
const ByteType = 1010;
const ShortType = 1011;
const UnsignedShortType = 1012;
const IntType = 1013;
const UnsignedIntType = 1014;
const FloatType = 1015;
const HalfFloatType = 1016;
const UnsignedShort4444Type = 1017;
const UnsignedShort5551Type = 1018;
const UnsignedInt248Type = 1020;
const UnsignedInt5999Type = 35902;
const UnsignedInt101111Type = 35899;
const AlphaFormat = 1021;
const RGBFormat = 1022;
const RGBAFormat = 1023;
const DepthFormat = 1026;
const DepthStencilFormat = 1027;
const RedFormat = 1028;
const RedIntegerFormat = 1029;
const RGFormat = 1030;
const RGIntegerFormat = 1031;
const RGBIntegerFormat = 1032;
const RGBAIntegerFormat = 1033;
const RGB_S3TC_DXT1_Format = 33776;
const RGBA_S3TC_DXT1_Format = 33777;
const RGBA_S3TC_DXT3_Format = 33778;
const RGBA_S3TC_DXT5_Format = 33779;
const RGB_PVRTC_4BPPV1_Format = 35840;
const RGB_PVRTC_2BPPV1_Format = 35841;
const RGBA_PVRTC_4BPPV1_Format = 35842;
const RGBA_PVRTC_2BPPV1_Format = 35843;
const RGB_ETC1_Format = 36196;
const RGB_ETC2_Format = 37492;
const RGBA_ETC2_EAC_Format = 37496;
const R11_EAC_Format = 37488; // 0x9270
const SIGNED_R11_EAC_Format = 37489; // 0x9271
const RG11_EAC_Format = 37490; // 0x9272
const SIGNED_RG11_EAC_Format = 37491; // 0x9273
const RGBA_ASTC_4x4_Format = 37808;
const RGBA_ASTC_5x4_Format = 37809;
const RGBA_ASTC_5x5_Format = 37810;
const RGBA_ASTC_6x5_Format = 37811;
const RGBA_ASTC_6x6_Format = 37812;
const RGBA_ASTC_8x5_Format = 37813;
const RGBA_ASTC_8x6_Format = 37814;
const RGBA_ASTC_8x8_Format = 37815;
const RGBA_ASTC_10x5_Format = 37816;
const RGBA_ASTC_10x6_Format = 37817;
const RGBA_ASTC_10x8_Format = 37818;
const RGBA_ASTC_10x10_Format = 37819;
const RGBA_ASTC_12x10_Format = 37820;
const RGBA_ASTC_12x12_Format = 37821;
const RGBA_BPTC_Format = 36492;
const RGB_BPTC_SIGNED_Format = 36494;
const RGB_BPTC_UNSIGNED_Format = 36495;
const RED_RGTC1_Format = 36283;
const SIGNED_RED_RGTC1_Format = 36284;
const RED_GREEN_RGTC2_Format = 36285;
const SIGNED_RED_GREEN_RGTC2_Format = 36286;
const LoopOnce = 2200;
const LoopRepeat = 2201;
const LoopPingPong = 2202;
const InterpolateDiscrete = 2300;
const InterpolateLinear = 2301;
const InterpolateSmooth = 2302;
const InterpolateBezier = 2303;
const ZeroCurvatureEnding = 2400;
const ZeroSlopeEnding = 2401;
const WrapAroundEnding = 2402;
const NormalAnimationBlendMode = 2500;
const AdditiveAnimationBlendMode = 2501;
const TrianglesDrawMode = 0;
const TriangleStripDrawMode = 1;
const TriangleFanDrawMode = 2;
const BasicDepthPacking = 3200;
const RGBADepthPacking = 3201;
const RGBDepthPacking = 3202;
const RGDepthPacking = 3203;
const TangentSpaceNormalMap = 0;
const ObjectSpaceNormalMap = 1;
const NoColorSpace = '';
const SRGBColorSpace = 'srgb';
const LinearSRGBColorSpace = 'srgb-linear';
const LinearTransfer = 'linear';
const SRGBTransfer = 'srgb';
const NoNormalPacking = '';
const NormalRGPacking = 'rg';
const NormalGAPacking = 'ga';
const ZeroStencilOp = 0;
const KeepStencilOp = 7680;
const ReplaceStencilOp = 7681;
const IncrementStencilOp = 7682;
const DecrementStencilOp = 7683;
const IncrementWrapStencilOp = 34055;
const DecrementWrapStencilOp = 34056;
const InvertStencilOp = 5386;
const NeverStencilFunc = 512;
const LessStencilFunc = 513;
const EqualStencilFunc = 514;
const LessEqualStencilFunc = 515;
const GreaterStencilFunc = 516;
const NotEqualStencilFunc = 517;
const GreaterEqualStencilFunc = 518;
const AlwaysStencilFunc = 519;
const NeverCompare = 512;
const LessCompare = 513;
const EqualCompare = 514;
const LessEqualCompare = 515;
const GreaterCompare = 516;
const NotEqualCompare = 517;
const GreaterEqualCompare = 518;
const AlwaysCompare = 519;
const StaticDrawUsage = 35044;
const DynamicDrawUsage = 35048;
const StreamDrawUsage = 35040;
const StaticReadUsage = 35045;
const DynamicReadUsage = 35049;
const StreamReadUsage = 35041;
const StaticCopyUsage = 35046;
const DynamicCopyUsage = 35050;
const StreamCopyUsage = 35042;
const GLSL1 = '100';
const GLSL3 = '300 es';
const WebGLCoordinateSystem = 2000;
const WebGPUCoordinateSystem = 2001;
const TimestampQuery = {
    COMPUTE: 'compute',
    RENDER: 'render'
};
const InterpolationSamplingType = {
    PERSPECTIVE: 'perspective',
    LINEAR: 'linear',
    FLAT: 'flat'
};
const InterpolationSamplingMode = {
    NORMAL: 'normal',
    CENTROID: 'centroid',
    SAMPLE: 'sample',
    FIRST: 'first',
    EITHER: 'either'
};
const Compatibility = {
    TEXTURE_COMPARE: 'depthTextureCompare'
}; /**
 * This type represents mouse buttons and interaction types in context of controls.
 *
 * @typedef {Object} ConstantsMouse
 * @property {number} MIDDLE - The left mouse button.
 * @property {number} LEFT - The middle mouse button.
 * @property {number} RIGHT - The right mouse button.
 * @property {number} ROTATE - A rotate interaction.
 * @property {number} DOLLY - A dolly interaction.
 * @property {number} PAN - A pan interaction.
 **/  /**
 * This type represents touch interaction types in context of controls.
 *
 * @typedef {Object} ConstantsTouch
 * @property {number} ROTATE - A rotate interaction.
 * @property {number} PAN - A pan interaction.
 * @property {number} DOLLY_PAN - The dolly-pan interaction.
 * @property {number} DOLLY_ROTATE - A dolly-rotate interaction.
 **/  /**
 * This type represents the different timestamp query types.
 *
 * @typedef {Object} ConstantsTimestampQuery
 * @property {string} COMPUTE - A `compute` timestamp query.
 * @property {string} RENDER - A `render` timestamp query.
 **/  /**
 * Represents the different interpolation sampling types.
 *
 * @typedef {Object} ConstantsInterpolationSamplingType
 * @property {string} PERSPECTIVE - Perspective-correct interpolation.
 * @property {string} LINEAR - Linear interpolation.
 * @property {string} FLAT - Flat interpolation.
 */  /**
 * Represents the different interpolation sampling modes.
 *
 * @typedef {Object} ConstantsInterpolationSamplingMode
 * @property {string} NORMAL - Normal sampling mode.
 * @property {string} CENTROID - Centroid sampling mode.
 * @property {string} SAMPLE - Sample-specific sampling mode.
 * @property {string} FIRST - Flat interpolation using the first vertex.
 * @property {string} EITHER - Flat interpolation using either vertex.
 */ 
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Possible shader stages.
 *
 * @property {string} VERTEX The vertex shader stage.
 * @property {string} FRAGMENT The fragment shader stage.
 */ __turbopack_context__.s([
    "NodeAccess",
    ()=>NodeAccess,
    "NodeShaderStage",
    ()=>NodeShaderStage,
    "NodeType",
    ()=>NodeType,
    "NodeUpdateType",
    ()=>NodeUpdateType,
    "defaultBuildStages",
    ()=>defaultBuildStages,
    "defaultShaderStages",
    ()=>defaultShaderStages,
    "shaderStages",
    ()=>shaderStages,
    "vectorComponents",
    ()=>vectorComponents
]);
const NodeShaderStage = {
    VERTEX: 'vertex',
    FRAGMENT: 'fragment'
};
const NodeUpdateType = {
    NONE: 'none',
    FRAME: 'frame',
    RENDER: 'render',
    OBJECT: 'object'
};
const NodeType = {
    BOOLEAN: 'bool',
    INTEGER: 'int',
    FLOAT: 'float',
    VECTOR2: 'vec2',
    VECTOR3: 'vec3',
    VECTOR4: 'vec4',
    MATRIX2: 'mat2',
    MATRIX3: 'mat3',
    MATRIX4: 'mat4'
};
const NodeAccess = {
    READ_ONLY: 'readOnly',
    WRITE_ONLY: 'writeOnly',
    READ_WRITE: 'readWrite'
};
const defaultShaderStages = [
    'fragment',
    'vertex'
];
const defaultBuildStages = [
    'setup',
    'analyze',
    'generate'
];
const shaderStages = [
    ...defaultShaderStages,
    'compute'
];
const vectorComponents = [
    'x',
    'y',
    'z',
    'w'
];
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReversedDepthFuncs",
    ()=>ReversedDepthFuncs,
    "arrayMax",
    ()=>arrayMax,
    "arrayMin",
    ()=>arrayMin,
    "arrayNeedsUint32",
    ()=>arrayNeedsUint32,
    "createCanvasElement",
    ()=>createCanvasElement,
    "createElementNS",
    ()=>createElementNS,
    "error",
    ()=>error,
    "getConsoleFunction",
    ()=>getConsoleFunction,
    "getTypedArray",
    ()=>getTypedArray,
    "isTypedArray",
    ()=>isTypedArray,
    "log",
    ()=>log,
    "probeAsync",
    ()=>probeAsync,
    "setConsoleFunction",
    ()=>setConsoleFunction,
    "toNormalizedProjectionMatrix",
    ()=>toNormalizedProjectionMatrix,
    "toReversedProjectionMatrix",
    ()=>toReversedProjectionMatrix,
    "warn",
    ()=>warn,
    "warnOnce",
    ()=>warnOnce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)");
;
/**
 * Finds the minimum value in an array.
 *
 * @private
 * @param {Array<number>} array - The array to search for the minimum value.
 * @return {number} The minimum value in the array, or Infinity if the array is empty.
 */ function arrayMin(array) {
    if (array.length === 0) return Infinity;
    let min = array[0];
    for(let i = 1, l = array.length; i < l; ++i){
        if (array[i] < min) min = array[i];
    }
    return min;
}
/**
 * Finds the maximum value in an array.
 *
 * @private
 * @param {Array<number>} array - The array to search for the maximum value.
 * @return {number} The maximum value in the array, or -Infinity if the array is empty.
 */ function arrayMax(array) {
    if (array.length === 0) return -Infinity;
    let max = array[0];
    for(let i = 1, l = array.length; i < l; ++i){
        if (array[i] > max) max = array[i];
    }
    return max;
}
/**
 * Checks if an array contains values that require Uint32 representation.
 *
 * This function determines whether the array contains any values >= 65535,
 * which would require a Uint32Array rather than a Uint16Array for proper storage.
 * The function iterates from the end of the array, assuming larger values are
 * typically located at the end.
 *
 * @private
 * @param {Array<number>} array - The array to check.
 * @return {boolean} True if the array contains values >= 65535, false otherwise.
 */ function arrayNeedsUint32(array) {
    // assumes larger values usually on last
    for(let i = array.length - 1; i >= 0; --i){
        if (array[i] >= 65535) return true; // account for PRIMITIVE_RESTART_FIXED_INDEX, #24565
    }
    return false;
}
/**
 * Map of typed array constructor names to their constructors.
 * This mapping enables dynamic creation of typed arrays based on string type names.
 *
 * @private
 * @constant
 * @type {Object<string, TypedArrayConstructor>}
 */ const TYPED_ARRAYS = {
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array
};
/**
 * Creates a typed array of the specified type from the given buffer.
 *
 * @private
 * @param {string} type - The name of the typed array type (e.g., 'Float32Array', 'Uint16Array').
 * @param {ArrayBuffer} buffer - The buffer to create the typed array from.
 * @return {TypedArray} A new typed array of the specified type.
 */ function getTypedArray(type, buffer) {
    return new TYPED_ARRAYS[type](buffer);
}
/**
 * Returns `true` if the given object is a typed array.
 *
 * @param {any} array - The object to check.
 * @return {boolean} Whether the given object is a typed array.
 */ function isTypedArray(array) {
    return ArrayBuffer.isView(array) && !(array instanceof DataView);
}
/**
 * Creates an XHTML element with the specified tag name.
 *
 * This function uses the XHTML namespace to create DOM elements,
 * ensuring proper element creation in XML-based contexts.
 *
 * @private
 * @param {string} name - The tag name of the element to create (e.g., 'canvas', 'div').
 * @return {HTMLElement} The created XHTML element.
 */ function createElementNS(name) {
    return document.createElementNS('http://www.w3.org/1999/xhtml', name);
}
/**
 * Creates a canvas element configured for block display.
 *
 * This is a convenience function that creates a canvas element with
 * display style set to 'block', which is commonly used in three.js
 * rendering contexts to avoid inline element spacing issues.
 *
 * @return {HTMLCanvasElement} A canvas element with display set to 'block'.
 */ function createCanvasElement() {
    const canvas = createElementNS('canvas');
    canvas.style.display = 'block';
    return canvas;
}
/**
 * Internal cache for tracking warning messages to prevent duplicate warnings.
 *
 * @private
 * @type {Object<string, boolean>}
 */ const _cache = {};
/**
 * Custom console function handler for intercepting log, warn, and error calls.
 *
 * @private
 * @type {Function|null}
 */ let _setConsoleFunction = null;
/**
 * Sets a custom function to handle console output.
 *
 * This allows external code to intercept and handle console.log, console.warn,
 * and console.error calls made by three.js, which is useful for custom logging,
 * testing, or debugging workflows.
 *
 * @param {Function} fn - The function to handle console output. Should accept
 *                        (type, message, ...params) where type is 'log', 'warn', or 'error'.
 */ function setConsoleFunction(fn) {
    _setConsoleFunction = fn;
}
/**
 * Gets the currently set custom console function.
 *
 * @return {Function|null} The custom console function, or null if not set.
 */ function getConsoleFunction() {
    return _setConsoleFunction;
}
/**
 * Logs an informational message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.log. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */ function log(...params) {
    const message = 'THREE.' + params.shift();
    if (_setConsoleFunction) {
        _setConsoleFunction('log', message, ...params);
    } else {
        console.log(message, ...params);
    }
}
/**
 * Enhances log/warn/error messages related to TSL.
 *
 * @param {Array<any>} params - The original message parameters.
 * @returns {Array<any>} The filtered and enhanced message parameters.
 */ function enhanceLogMessage(params) {
    const message = params[0];
    if (typeof message === 'string' && message.startsWith('TSL:')) {
        const stackTrace = params[1];
        if (stackTrace && stackTrace.isStackTrace) {
            params[0] += ' ' + stackTrace.getLocation();
        } else {
            params[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
        }
    }
    return params;
}
/**
 * Logs a warning message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.warn. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */ function warn(...params) {
    params = enhanceLogMessage(params);
    const message = 'THREE.' + params.shift();
    if (_setConsoleFunction) {
        _setConsoleFunction('warn', message, ...params);
    } else {
        const stackTrace = params[0];
        if (stackTrace && stackTrace.isStackTrace) {
            console.warn(stackTrace.getError(message));
        } else {
            console.warn(message, ...params);
        }
    }
}
/**
 * Logs an error message with the 'THREE.' prefix.
 *
 * If a custom console function is set via setConsoleFunction(), it will be used
 * instead of the native console.error. The first parameter is treated as the
 * method name and is automatically prefixed with 'THREE.'.
 *
 * @param {...any} params - The message components. The first param is used as
 *                          the method name and prefixed with 'THREE.'.
 */ function error(...params) {
    params = enhanceLogMessage(params);
    const message = 'THREE.' + params.shift();
    if (_setConsoleFunction) {
        _setConsoleFunction('error', message, ...params);
    } else {
        const stackTrace = params[0];
        if (stackTrace && stackTrace.isStackTrace) {
            console.error(stackTrace.getError(message));
        } else {
            console.error(message, ...params);
        }
    }
}
/**
 * Logs a warning message only once, preventing duplicate warnings.
 *
 * This function maintains an internal cache of warning messages and will only
 * output each unique warning message once. Useful for warnings that may be
 * triggered repeatedly but should only be shown to the user once.
 *
 * @param {...any} params - The warning message components.
 */ function warnOnce(...params) {
    const message = params.join(' ');
    if (message in _cache) return;
    _cache[message] = true;
    warn(...params);
}
/**
 * Asynchronously probes for WebGL sync object completion.
 *
 * This function creates a promise that resolves when the WebGL sync object
 * signals completion or rejects if the sync operation fails. It uses polling
 * at the specified interval to check the sync status without blocking the
 * main thread. This is useful for GPU-CPU synchronization in WebGL contexts.
 *
 * @private
 * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
 * @param {WebGLSync} sync - The WebGL sync object to wait for.
 * @param {number} interval - The polling interval in milliseconds.
 * @return {Promise<void>} A promise that resolves when the sync completes or rejects if it fails.
 */ function probeAsync(gl, sync, interval) {
    return new Promise(function(resolve, reject) {
        function probe() {
            switch(gl.clientWaitSync(sync, gl.SYNC_FLUSH_COMMANDS_BIT, 0)){
                case gl.WAIT_FAILED:
                    reject();
                    break;
                case gl.TIMEOUT_EXPIRED:
                    setTimeout(probe, interval);
                    break;
                default:
                    resolve();
            }
        }
        setTimeout(probe, interval);
    });
}
/**
 * Converts a projection matrix from normalized device coordinates (NDC)
 * range [-1, 1] to [0, 1].
 *
 * This conversion is commonly needed when working with depth textures or
 * render targets that expect depth values in the [0, 1] range rather than
 * the standard OpenGL NDC range of [-1, 1]. The function modifies the
 * projection matrix in place.
 *
 * @private
 * @param {Matrix4} projectionMatrix - The projection matrix to convert (modified in place).
 */ function toNormalizedProjectionMatrix(projectionMatrix) {
    const m = projectionMatrix.elements;
    // Convert [-1, 1] to [0, 1] projection matrix
    m[2] = 0.5 * m[2] + 0.5 * m[3];
    m[6] = 0.5 * m[6] + 0.5 * m[7];
    m[10] = 0.5 * m[10] + 0.5 * m[11];
    m[14] = 0.5 * m[14] + 0.5 * m[15];
}
/**
 * Reverses the depth range of a projection matrix.
 *
 * This function inverts the depth mapping of a projection matrix, which is
 * useful for reversed-Z depth buffer techniques that can improve depth
 * precision. The function handles both perspective and orthographic projection
 * matrices differently and modifies the matrix in place.
 *
 * For perspective matrices (where m[11] === -1), the depth mapping is
 * reversed with an offset. For orthographic matrices, a simpler reversal
 * is applied.
 *
 * @private
 * @param {Matrix4} projectionMatrix - The projection matrix to reverse (modified in place).
 */ function toReversedProjectionMatrix(projectionMatrix) {
    const m = projectionMatrix.elements;
    const isPerspectiveMatrix = m[11] === -1;
    // Reverse [0, 1] projection matrix
    if (isPerspectiveMatrix) {
        m[10] = -m[10] - 1;
        m[14] = -m[14];
    } else {
        m[10] = -m[10];
        m[14] = -m[14] + 1;
    }
}
/**
 * Used to select the correct depth functions
 * when reversed depth buffer is used.
 *
 * @private
 * @type {Object}
 */ const ReversedDepthFuncs = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NeverDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AlwaysDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LessDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GreaterDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EqualDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotEqualDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LessEqualDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GreaterEqualDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AlwaysDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NeverDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GreaterDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LessDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotEqualDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EqualDepth"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GreaterEqualDepth"]]: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LessEqualDepth"]
};
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEG2RAD",
    ()=>DEG2RAD,
    "MathUtils",
    ()=>MathUtils,
    "RAD2DEG",
    ()=>RAD2DEG,
    "ceilPowerOfTwo",
    ()=>ceilPowerOfTwo,
    "clamp",
    ()=>clamp,
    "damp",
    ()=>damp,
    "degToRad",
    ()=>degToRad,
    "denormalize",
    ()=>denormalize,
    "euclideanModulo",
    ()=>euclideanModulo,
    "floorPowerOfTwo",
    ()=>floorPowerOfTwo,
    "generateUUID",
    ()=>generateUUID,
    "inverseLerp",
    ()=>inverseLerp,
    "isPowerOfTwo",
    ()=>isPowerOfTwo,
    "lerp",
    ()=>lerp,
    "mapLinear",
    ()=>mapLinear,
    "normalize",
    ()=>normalize,
    "pingpong",
    ()=>pingpong,
    "radToDeg",
    ()=>radToDeg,
    "randFloat",
    ()=>randFloat,
    "randFloatSpread",
    ()=>randFloatSpread,
    "randInt",
    ()=>randInt,
    "seededRandom",
    ()=>seededRandom,
    "setQuaternionFromProperEuler",
    ()=>setQuaternionFromProperEuler,
    "smootherstep",
    ()=>smootherstep,
    "smoothstep",
    ()=>smoothstep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
const _lut = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '0a',
    '0b',
    '0c',
    '0d',
    '0e',
    '0f',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '1a',
    '1b',
    '1c',
    '1d',
    '1e',
    '1f',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '2a',
    '2b',
    '2c',
    '2d',
    '2e',
    '2f',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '3a',
    '3b',
    '3c',
    '3d',
    '3e',
    '3f',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '4a',
    '4b',
    '4c',
    '4d',
    '4e',
    '4f',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '5a',
    '5b',
    '5c',
    '5d',
    '5e',
    '5f',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '6a',
    '6b',
    '6c',
    '6d',
    '6e',
    '6f',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '7a',
    '7b',
    '7c',
    '7d',
    '7e',
    '7f',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '8a',
    '8b',
    '8c',
    '8d',
    '8e',
    '8f',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
    '9a',
    '9b',
    '9c',
    '9d',
    '9e',
    '9f',
    'a0',
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'aa',
    'ab',
    'ac',
    'ad',
    'ae',
    'af',
    'b0',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'ba',
    'bb',
    'bc',
    'bd',
    'be',
    'bf',
    'c0',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'ca',
    'cb',
    'cc',
    'cd',
    'ce',
    'cf',
    'd0',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'd8',
    'd9',
    'da',
    'db',
    'dc',
    'dd',
    'de',
    'df',
    'e0',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
    'ea',
    'eb',
    'ec',
    'ed',
    'ee',
    'ef',
    'f0',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'fa',
    'fb',
    'fc',
    'fd',
    'fe',
    'ff'
];
let _seed = 1234567;
const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
/**
 * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
 * (universally unique identifier).
 *
 * @return {string} The UUID.
 */ function generateUUID() {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
    // .toLowerCase() here flattens concatenated strings to save heap memory space.
    return uuid.toLowerCase();
}
/**
 * Clamps the given value between min and max.
 *
 * @param {number} value - The value to clamp.
 * @param {number} min - The min value.
 * @param {number} max - The max value.
 * @return {number} The clamped value.
 */ function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * Computes the Euclidean modulo of the given parameters that
 * is `( ( n % m ) + m ) % m`.
 *
 * @param {number} n - The first parameter.
 * @param {number} m - The second parameter.
 * @return {number} The Euclidean modulo.
 */ function euclideanModulo(n, m) {
    // https://en.wikipedia.org/wiki/Modulo_operation
    return (n % m + m) % m;
}
/**
 * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
 * for the given value. `a2` must be greater than `a1`.
 *
 * @param {number} x - The value to be mapped.
 * @param {number} a1 - Minimum value for range A.
 * @param {number} a2 - Maximum value for range A.
 * @param {number} b1 - Minimum value for range B.
 * @param {number} b2 - Maximum value for range B.
 * @return {number} The mapped value.
 */ function mapLinear(x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}
/**
 * Returns the percentage in the closed interval `[0, 1]` of the given value
 * between the start and end point.
 *
 * @param {number} x - The start point
 * @param {number} y - The end point.
 * @param {number} value - A value between start and end.
 * @return {number} The interpolation factor.
 */ function inverseLerp(x, y, value) {
    // https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
    if (x !== y) {
        return (value - x) / (y - x);
    } else {
        return 0;
    }
}
/**
 * Returns a value linearly interpolated from two known points based on the given interval -
 * `t = 0` will return `x` and `t = 1` will return `y`.
 *
 * @param {number} x - The start point
 * @param {number} y - The end point.
 * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
 * @return {number} The interpolated value.
 */ function lerp(x, y, t) {
    return (1 - t) * x + t * y;
}
/**
 * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
 * time to maintain frame rate independent movement. For details, see
 * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
 *
 * @param {number} x - The current point.
 * @param {number} y - The target point.
 * @param {number} lambda - A higher lambda value will make the movement more sudden,
 * and a lower value will make the movement more gradual.
 * @param {number} dt - Delta time in seconds.
 * @return {number} The interpolated value.
 */ function damp(x, y, lambda, dt) {
    return lerp(x, y, 1 - Math.exp(-lambda * dt));
}
/**
 * Returns a value that alternates between `0` and the given `length` parameter.
 *
 * @param {number} x - The value to pingpong.
 * @param {number} [length=1] - The positive value the function will pingpong to.
 * @return {number} The alternated value.
 */ function pingpong(x, length = 1) {
    // https://www.desmos.com/calculator/vcsjnyz7x4
    return length - Math.abs(euclideanModulo(x, length * 2) - length);
}
/**
 * Returns a value in the range `[0,1]` that represents the percentage that `x` has
 * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
 * the `min` and `max`.
 *
 * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
 *
 * @param {number} x - The value to evaluate based on its position between `min` and `max`.
 * @param {number} min - The min value. Any `x` value below `min` will be `0`. `min` must be lower than `max`.
 * @param {number} max - The max value. Any `x` value above `max` will be `1`. `max` must be greater than `min`.
 * @return {number} The alternated value.
 */ function smoothstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}
/**
 * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
 * that has zero 1st and 2nd order derivatives at `x=0` and `x=1`.
 *
 * @param {number} x - The value to evaluate based on its position between `min` and `max`.
 * @param {number} min - The min value. Any `x` value below `min` will be `0`. `min` must be lower than `max`.
 * @param {number} max - The max value. Any `x` value above `max` will be `1`. `max` must be greater than `min`.
 * @return {number} The alternated value.
 */ function smootherstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
}
/**
 * Returns a random integer from `<low, high>` interval.
 *
 * @param {number} low - The lower value boundary.
 * @param {number} high - The upper value boundary
 * @return {number} A random integer.
 */ function randInt(low, high) {
    return low + Math.floor(Math.random() * (high - low + 1));
}
/**
 * Returns a random float from `<low, high>` interval.
 *
 * @param {number} low - The lower value boundary.
 * @param {number} high - The upper value boundary
 * @return {number} A random float.
 */ function randFloat(low, high) {
    return low + Math.random() * (high - low);
}
/**
 * Returns a random integer from `<-range/2, range/2>` interval.
 *
 * @param {number} range - Defines the value range.
 * @return {number} A random float.
 */ function randFloatSpread(range) {
    return range * (0.5 - Math.random());
}
/**
 * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
 *
 * @param {number} [s] - The integer seed.
 * @return {number} A random float.
 */ function seededRandom(s) {
    if (s !== undefined) _seed = s;
    // Mulberry32 generator
    let t = _seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - A value in degrees.
 * @return {number} The converted value in radians.
 */ function degToRad(degrees) {
    return degrees * DEG2RAD;
}
/**
 * Converts radians to degrees.
 *
 * @param {number} radians - A value in radians.
 * @return {number} The converted value in degrees.
 */ function radToDeg(radians) {
    return radians * RAD2DEG;
}
/**
 * Returns `true` if the given number is a power of two.
 *
 * @param {number} value - The value to check.
 * @return {boolean} Whether the given number is a power of two or not.
 */ function isPowerOfTwo(value) {
    return (value & value - 1) === 0 && value !== 0;
}
/**
 * Returns the smallest power of two that is greater than or equal to the given number.
 *
 * @param {number} value - The value to find a POT for. Must be greater than `0`.
 * @return {number} The smallest power of two that is greater than or equal to the given number.
 */ function ceilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}
/**
 * Returns the largest power of two that is less than or equal to the given number.
 *
 * @param {number} value - The value to find a POT for. Must be greater than `0`.
 * @return {number} The largest power of two that is less than or equal to the given number.
 */ function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
/**
 * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
 * defined by the given angles and order.
 *
 * Rotations are applied to the axes in the order specified by order:
 * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
 *
 * @param {Quaternion} q - The quaternion to set.
 * @param {number} a - The rotation applied to the first axis, in radians.
 * @param {number} b - The rotation applied to the second axis, in radians.
 * @param {number} c - The rotation applied to the third axis, in radians.
 * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
 */ function setQuaternionFromProperEuler(q, a, b, c, order) {
    const cos = Math.cos;
    const sin = Math.sin;
    const c2 = cos(b / 2);
    const s2 = sin(b / 2);
    const c13 = cos((a + c) / 2);
    const s13 = sin((a + c) / 2);
    const c1_3 = cos((a - c) / 2);
    const s1_3 = sin((a - c) / 2);
    const c3_1 = cos((c - a) / 2);
    const s3_1 = sin((c - a) / 2);
    switch(order){
        case 'XYX':
            q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
            break;
        case 'YZY':
            q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
            break;
        case 'ZXZ':
            q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
            break;
        case 'XZX':
            q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
            break;
        case 'YXY':
            q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
            break;
        case 'ZYZ':
            q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
            break;
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);
    }
}
/**
 * Denormalizes the given value according to the given typed array.
 *
 * @param {number} value - The value to denormalize.
 * @param {TypedArray} array - The typed array that defines the data type of the value.
 * @return {number} The denormalize (float) value in the range `[0,1]`.
 */ function denormalize(value, array) {
    switch(array.constructor){
        case Float32Array:
            return value;
        case Uint32Array:
            return value / 4294967295.0;
        case Uint16Array:
            return value / 65535.0;
        case Uint8Array:
            return value / 255.0;
        case Int32Array:
            return Math.max(value / 2147483647.0, -1.0);
        case Int16Array:
            return Math.max(value / 32767.0, -1.0);
        case Int8Array:
            return Math.max(value / 127.0, -1.0);
        default:
            throw new Error('Invalid component type.');
    }
}
/**
 * Normalizes the given value according to the given typed array.
 *
 * @param {number} value - The float value in the range `[0,1]` to normalize.
 * @param {TypedArray} array - The typed array that defines the data type of the value.
 * @return {number} The normalize value.
 */ function normalize(value, array) {
    switch(array.constructor){
        case Float32Array:
            return value;
        case Uint32Array:
            return Math.round(value * 4294967295.0);
        case Uint16Array:
            return Math.round(value * 65535.0);
        case Uint8Array:
            return Math.round(value * 255.0);
        case Int32Array:
            return Math.round(value * 2147483647.0);
        case Int16Array:
            return Math.round(value * 32767.0);
        case Int8Array:
            return Math.round(value * 127.0);
        default:
            throw new Error('Invalid component type.');
    }
}
/**
 * @class
 * @classdesc A collection of math utility functions.
 * @hideconstructor
 */ const MathUtils = {
    DEG2RAD: DEG2RAD,
    RAD2DEG: RAD2DEG,
    /**
	 * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
	 * (universally unique identifier).
	 *
	 * @static
	 * @method
	 * @return {string} The UUID.
	 */ generateUUID: generateUUID,
    /**
	 * Clamps the given value between min and max.
	 *
	 * @static
	 * @method
	 * @param {number} value - The value to clamp.
	 * @param {number} min - The min value.
	 * @param {number} max - The max value.
	 * @return {number} The clamped value.
	 */ clamp: clamp,
    /**
	 * Computes the Euclidean modulo of the given parameters that
	 * is `( ( n % m ) + m ) % m`.
	 *
	 * @static
	 * @method
	 * @param {number} n - The first parameter.
	 * @param {number} m - The second parameter.
	 * @return {number} The Euclidean modulo.
	 */ euclideanModulo: euclideanModulo,
    /**
	 * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
	 * for the given value.
	 *
	 * @static
	 * @method
	 * @param {number} x - The value to be mapped.
	 * @param {number} a1 - Minimum value for range A.
	 * @param {number} a2 - Maximum value for range A.
	 * @param {number} b1 - Minimum value for range B.
	 * @param {number} b2 - Maximum value for range B.
	 * @return {number} The mapped value.
	 */ mapLinear: mapLinear,
    /**
	 * Returns the percentage in the closed interval `[0, 1]` of the given value
	 * between the start and end point.
	 *
	 * @static
	 * @method
	 * @param {number} x - The start point
	 * @param {number} y - The end point.
	 * @param {number} value - A value between start and end.
	 * @return {number} The interpolation factor.
	 */ inverseLerp: inverseLerp,
    /**
	 * Returns a value linearly interpolated from two known points based on the given interval -
	 * `t = 0` will return `x` and `t = 1` will return `y`.
	 *
	 * @static
	 * @method
	 * @param {number} x - The start point
	 * @param {number} y - The end point.
	 * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
	 * @return {number} The interpolated value.
	 */ lerp: lerp,
    /**
	 * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
	 * time to maintain frame rate independent movement. For details, see
	 * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
	 *
	 * @static
	 * @method
	 * @param {number} x - The current point.
	 * @param {number} y - The target point.
	 * @param {number} lambda - A higher lambda value will make the movement more sudden,
	 * and a lower value will make the movement more gradual.
	 * @param {number} dt - Delta time in seconds.
	 * @return {number} The interpolated value.
	 */ damp: damp,
    /**
	 * Returns a value that alternates between `0` and the given `length` parameter.
	 *
	 * @static
	 * @method
	 * @param {number} x - The value to pingpong.
	 * @param {number} [length=1] - The positive value the function will pingpong to.
	 * @return {number} The alternated value.
	 */ pingpong: pingpong,
    /**
	 * Returns a value in the range `[0,1]` that represents the percentage that `x` has
	 * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
	 * the `min` and `max`.
	 *
	 * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
	 *
	 * @static
	 * @method
	 * @param {number} x - The value to evaluate based on its position between min and max.
	 * @param {number} min - The min value. Any x value below min will be `0`.
	 * @param {number} max - The max value. Any x value above max will be `1`.
	 * @return {number} The alternated value.
	 */ smoothstep: smoothstep,
    /**
	 * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
	 * that has zero 1st and 2nd order derivatives at x=0 and x=1.
	 *
	 * @static
	 * @method
	 * @param {number} x - The value to evaluate based on its position between min and max.
	 * @param {number} min - The min value. Any x value below min will be `0`.
	 * @param {number} max - The max value. Any x value above max will be `1`.
	 * @return {number} The alternated value.
	 */ smootherstep: smootherstep,
    /**
	 * Returns a random integer from `<low, high>` interval.
	 *
	 * @static
	 * @method
	 * @param {number} low - The lower value boundary.
	 * @param {number} high - The upper value boundary
	 * @return {number} A random integer.
	 */ randInt: randInt,
    /**
	 * Returns a random float from `<low, high>` interval.
	 *
	 * @static
	 * @method
	 * @param {number} low - The lower value boundary.
	 * @param {number} high - The upper value boundary
	 * @return {number} A random float.
	 */ randFloat: randFloat,
    /**
	 * Returns a random integer from `<-range/2, range/2>` interval.
	 *
	 * @static
	 * @method
	 * @param {number} range - Defines the value range.
	 * @return {number} A random float.
	 */ randFloatSpread: randFloatSpread,
    /**
	 * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
	 *
	 * @static
	 * @method
	 * @param {number} [s] - The integer seed.
	 * @return {number} A random float.
	 */ seededRandom: seededRandom,
    /**
	 * Converts degrees to radians.
	 *
	 * @static
	 * @method
	 * @param {number} degrees - A value in degrees.
	 * @return {number} The converted value in radians.
	 */ degToRad: degToRad,
    /**
	 * Converts radians to degrees.
	 *
	 * @static
	 * @method
	 * @param {number} radians - A value in radians.
	 * @return {number} The converted value in degrees.
	 */ radToDeg: radToDeg,
    /**
	 * Returns `true` if the given number is a power of two.
	 *
	 * @static
	 * @method
	 * @param {number} value - The value to check.
	 * @return {boolean} Whether the given number is a power of two or not.
	 */ isPowerOfTwo: isPowerOfTwo,
    /**
	 * Returns the smallest power of two that is greater than or equal to the given number.
	 *
	 * @static
	 * @method
	 * @param {number} value - The value to find a POT for.
	 * @return {number} The smallest power of two that is greater than or equal to the given number.
	 */ ceilPowerOfTwo: ceilPowerOfTwo,
    /**
	 * Returns the largest power of two that is less than or equal to the given number.
	 *
	 * @static
	 * @method
	 * @param {number} value - The value to find a POT for.
	 * @return {number} The largest power of two that is less than or equal to the given number.
	 */ floorPowerOfTwo: floorPowerOfTwo,
    /**
	 * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
	 * defined by the given angles and order.
	 *
	 * Rotations are applied to the axes in the order specified by order:
	 * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
	 *
	 * @static
	 * @method
	 * @param {Quaternion} q - The quaternion to set.
	 * @param {number} a - The rotation applied to the first axis, in radians.
	 * @param {number} b - The rotation applied to the second axis, in radians.
	 * @param {number} c - The rotation applied to the third axis, in radians.
	 * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
	 */ setQuaternionFromProperEuler: setQuaternionFromProperEuler,
    /**
	 * Normalizes the given value according to the given typed array.
	 *
	 * @static
	 * @method
	 * @param {number} value - The float value in the range `[0,1]` to normalize.
	 * @param {TypedArray} array - The typed array that defines the data type of the value.
	 * @return {number} The normalize value.
	 */ normalize: normalize,
    /**
	 * Denormalizes the given value according to the given typed array.
	 *
	 * @static
	 * @method
	 * @param {number} value - The value to denormalize.
	 * @param {TypedArray} array - The typed array that defines the data type of the value.
	 * @return {number} The denormalize (float) value in the range `[0,1]`.
	 */ denormalize: denormalize
};
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix3.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Matrix3",
    ()=>Matrix3
]);
/**
 * Represents a 3x3 matrix.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix3#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix();
 * m.set( 11, 12, 13,
 *        21, 22, 23,
 *        31, 32, 33 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21, 31,
 *                12, 22, 32,
 *                13, 23, 33 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */ class Matrix3 {
    /**
	 * Constructs a new 3x3 matrix. The arguments are supposed to be
	 * in row-major order. If no arguments are provided, the constructor
	 * initializes the matrix as an identity matrix.
	 *
	 * @param {number} [n11] - 1-1 matrix element.
	 * @param {number} [n12] - 1-2 matrix element.
	 * @param {number} [n13] - 1-3 matrix element.
	 * @param {number} [n21] - 2-1 matrix element.
	 * @param {number} [n22] - 2-2 matrix element.
	 * @param {number} [n23] - 2-3 matrix element.
	 * @param {number} [n31] - 3-1 matrix element.
	 * @param {number} [n32] - 3-2 matrix element.
	 * @param {number} [n33] - 3-3 matrix element.
	 */ constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Matrix3.prototype.isMatrix3 = true;
        /**
		 * A column-major list of matrix values.
		 *
		 * @type {Array<number>}
		 */ this.elements = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
        if (n11 !== undefined) {
            this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
        }
    }
    /**
	 * Sets the elements of the matrix.The arguments are supposed to be
	 * in row-major order.
	 *
	 * @param {number} [n11] - 1-1 matrix element.
	 * @param {number} [n12] - 1-2 matrix element.
	 * @param {number} [n13] - 1-3 matrix element.
	 * @param {number} [n21] - 2-1 matrix element.
	 * @param {number} [n22] - 2-2 matrix element.
	 * @param {number} [n23] - 2-3 matrix element.
	 * @param {number} [n31] - 3-1 matrix element.
	 * @param {number} [n32] - 3-2 matrix element.
	 * @param {number} [n33] - 3-3 matrix element.
	 * @return {Matrix3} A reference to this matrix.
	 */ set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        const te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    }
    /**
	 * Sets this matrix to the 3x3 identity matrix.
	 *
	 * @return {Matrix3} A reference to this matrix.
	 */ identity() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Copies the values of the given matrix to this instance.
	 *
	 * @param {Matrix3} m - The matrix to copy.
	 * @return {Matrix3} A reference to this matrix.
	 */ copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        return this;
    }
    /**
	 * Extracts the basis of this matrix into the three axis vectors provided.
	 *
	 * @param {Vector3} xAxis - The basis's x axis.
	 * @param {Vector3} yAxis - The basis's y axis.
	 * @param {Vector3} zAxis - The basis's z axis.
	 * @return {Matrix3} A reference to this matrix.
	 */ extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrix3Column(this, 0);
        yAxis.setFromMatrix3Column(this, 1);
        zAxis.setFromMatrix3Column(this, 2);
        return this;
    }
    /**
	 * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @return {Matrix3} A reference to this matrix.
	 */ setFromMatrix4(m) {
        const me = m.elements;
        this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
        return this;
    }
    /**
	 * Post-multiplies this matrix by the given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The matrix to multiply with.
	 * @return {Matrix3} A reference to this matrix.
	 */ multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    /**
	 * Pre-multiplies this matrix by the given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The matrix to multiply with.
	 * @return {Matrix3} A reference to this matrix.
	 */ premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    /**
	 * Multiples the given 3x3 matrices and stores the result
	 * in this matrix.
	 *
	 * @param {Matrix3} a - The first matrix.
	 * @param {Matrix3} b - The second matrix.
	 * @return {Matrix3} A reference to this matrix.
	 */ multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];
        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    }
    /**
	 * Multiplies every component of the matrix by the given scalar.
	 *
	 * @param {number} s - The scalar.
	 * @return {Matrix3} A reference to this matrix.
	 */ multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    }
    /**
	 * Computes and returns the determinant of this matrix.
	 *
	 * @return {number} The determinant.
	 */ determinant() {
        const te = this.elements;
        const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
    /**
	 * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	 * You can not invert with a determinant of zero. If you attempt this, the method produces
	 * a zero matrix instead.
	 *
	 * @return {Matrix3} A reference to this matrix.
	 */ invert() {
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;
        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;
        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;
        return this;
    }
    /**
	 * Transposes this matrix in place.
	 *
	 * @return {Matrix3} A reference to this matrix.
	 */ transpose() {
        let tmp;
        const m = this.elements;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    }
    /**
	 * Computes the normal matrix which is the inverse transpose of the upper
	 * left 3x3 portion of the given 4x4 matrix.
	 *
	 * @param {Matrix4} matrix4 - The 4x4 matrix.
	 * @return {Matrix3} A reference to this matrix.
	 */ getNormalMatrix(matrix4) {
        return this.setFromMatrix4(matrix4).invert().transpose();
    }
    /**
	 * Transposes this matrix into the supplied array, and returns itself unchanged.
	 *
	 * @param {Array<number>} r - An array to store the transposed matrix elements.
	 * @return {Matrix3} A reference to this matrix.
	 */ transposeIntoArray(r) {
        const m = this.elements;
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return this;
    }
    /**
	 * Sets the UV transform matrix from offset, repeat, rotation, and center.
	 *
	 * @param {number} tx - Offset x.
	 * @param {number} ty - Offset y.
	 * @param {number} sx - Repeat x.
	 * @param {number} sy - Repeat y.
	 * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
	 * @param {number} cx - Center x of rotation.
	 * @param {number} cy - Center y of rotation
	 * @return {Matrix3} A reference to this matrix.
	 */ setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
        return this;
    }
    /**
	 * Scales this matrix with the given scalar values.
	 *
	 * @param {number} sx - The amount to scale in the X axis.
	 * @param {number} sy - The amount to scale in the Y axis.
	 * @return {Matrix3} A reference to this matrix.
	 */ scale(sx, sy) {
        this.premultiply(_m3.makeScale(sx, sy));
        return this;
    }
    /**
	 * Rotates this matrix by the given angle.
	 *
	 * @param {number} theta - The rotation in radians.
	 * @return {Matrix3} A reference to this matrix.
	 */ rotate(theta) {
        this.premultiply(_m3.makeRotation(-theta));
        return this;
    }
    /**
	 * Translates this matrix by the given scalar values.
	 *
	 * @param {number} tx - The amount to translate in the X axis.
	 * @param {number} ty - The amount to translate in the Y axis.
	 * @return {Matrix3} A reference to this matrix.
	 */ translate(tx, ty) {
        this.premultiply(_m3.makeTranslation(tx, ty));
        return this;
    }
    // for 2D Transforms
    /**
	 * Sets this matrix as a 2D translation transform.
	 *
	 * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
	 * @param {number} y - The amount to translate in the Y axis.
	 * @return {Matrix3} A reference to this matrix.
	 */ makeTranslation(x, y) {
        if (x.isVector2) {
            this.set(1, 0, x.x, 0, 1, x.y, 0, 0, 1);
        } else {
            this.set(1, 0, x, 0, 1, y, 0, 0, 1);
        }
        return this;
    }
    /**
	 * Sets this matrix as a 2D rotational transformation.
	 *
	 * @param {number} theta - The rotation in radians.
	 * @return {Matrix3} A reference to this matrix.
	 */ makeRotation(theta) {
        // counterclockwise
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        this.set(c, -s, 0, s, c, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a 2D scale transform.
	 *
	 * @param {number} x - The amount to scale in the X axis.
	 * @param {number} y - The amount to scale in the Y axis.
	 * @return {Matrix3} A reference to this matrix.
	 */ makeScale(x, y) {
        this.set(x, 0, 0, 0, y, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Returns `true` if this matrix is equal with the given one.
	 *
	 * @param {Matrix3} matrix - The matrix to test for equality.
	 * @return {boolean} Whether this matrix is equal with the given one.
	 */ equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 9; i++){
            if (te[i] !== me[i]) return false;
        }
        return true;
    }
    /**
	 * Sets the elements of the matrix from the given array.
	 *
	 * @param {Array<number>} array - The matrix elements in column-major order.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Matrix3} A reference to this matrix.
	 */ fromArray(array, offset = 0) {
        for(let i = 0; i < 9; i++){
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    /**
	 * Writes the elements of this matrix to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The matrix elements in column-major order.
	 */ toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        return array;
    }
    /**
	 * Returns a matrix with copied values from this instance.
	 *
	 * @return {Matrix3} A clone of this instance.
	 */ clone() {
        return new this.constructor().fromArray(this.elements);
    }
}
const _m3 = /*@__PURE__*/ new Matrix3();
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/ColorManagement.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorManagement",
    ()=>ColorManagement,
    "LinearToSRGB",
    ()=>LinearToSRGB,
    "SRGBToLinear",
    ()=>SRGBToLinear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix3.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
;
const LINEAR_REC709_TO_XYZ = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Matrix3"]().set(0.4123908, 0.3575843, 0.1804808, 0.2126390, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322);
const XYZ_TO_LINEAR_REC709 = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Matrix3"]().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.2039770, 1.0569715);
function createColorManagement() {
    const ColorManagement = {
        enabled: true,
        workingColorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"],
        /**
		 * Implementations of supported color spaces.
		 *
		 * Required:
		 *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
		 *	- whitePoint: reference white [ x y ]
		 *	- transfer: transfer function (pre-defined)
		 *	- toXYZ: Matrix3 RGB to XYZ transform
		 *	- fromXYZ: Matrix3 XYZ to RGB transform
		 *	- luminanceCoefficients: RGB luminance coefficients
		 *
		 * Optional:
		 *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
		 *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
		 *
		 * Reference:
		 * - https://www.russellcottrell.com/photo/matrixCalculator.htm
		 */ spaces: {},
        convert: function(color, sourceColorSpace, targetColorSpace) {
            if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
                return color;
            }
            if (this.spaces[sourceColorSpace].transfer === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBTransfer"]) {
                color.r = SRGBToLinear(color.r);
                color.g = SRGBToLinear(color.g);
                color.b = SRGBToLinear(color.b);
            }
            if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
                color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
                color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
            }
            if (this.spaces[targetColorSpace].transfer === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBTransfer"]) {
                color.r = LinearToSRGB(color.r);
                color.g = LinearToSRGB(color.g);
                color.b = LinearToSRGB(color.b);
            }
            return color;
        },
        workingToColorSpace: function(color, targetColorSpace) {
            return this.convert(color, this.workingColorSpace, targetColorSpace);
        },
        colorSpaceToWorking: function(color, sourceColorSpace) {
            return this.convert(color, sourceColorSpace, this.workingColorSpace);
        },
        getPrimaries: function(colorSpace) {
            return this.spaces[colorSpace].primaries;
        },
        getTransfer: function(colorSpace) {
            if (colorSpace === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoColorSpace"]) return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearTransfer"];
            return this.spaces[colorSpace].transfer;
        },
        getToneMappingMode: function(colorSpace) {
            return this.spaces[colorSpace].outputColorSpaceConfig.toneMappingMode || 'standard';
        },
        getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
            return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
        },
        define: function(colorSpaces) {
            Object.assign(this.spaces, colorSpaces);
        },
        // Internal APIs
        _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
            return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
        },
        _getDrawingBufferColorSpace: function(colorSpace) {
            return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
        },
        _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
            return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
        },
        // Deprecated
        fromWorkingColorSpace: function(color, targetColorSpace) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnOnce"])('ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().'); // @deprecated, r177
            return ColorManagement.workingToColorSpace(color, targetColorSpace);
        },
        toWorkingColorSpace: function(color, sourceColorSpace) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnOnce"])('ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().'); // @deprecated, r177
            return ColorManagement.colorSpaceToWorking(color, sourceColorSpace);
        }
    };
    /******************************************************************************
	 * sRGB definitions
	 */ const REC709_PRIMARIES = [
        0.640,
        0.330,
        0.300,
        0.600,
        0.150,
        0.060
    ];
    const REC709_LUMINANCE_COEFFICIENTS = [
        0.2126,
        0.7152,
        0.0722
    ];
    const D65 = [
        0.3127,
        0.3290
    ];
    ColorManagement.define({
        [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"]]: {
            primaries: REC709_PRIMARIES,
            whitePoint: D65,
            transfer: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearTransfer"],
            toXYZ: LINEAR_REC709_TO_XYZ,
            fromXYZ: XYZ_TO_LINEAR_REC709,
            luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
            workingColorSpaceConfig: {
                unpackColorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            },
            outputColorSpaceConfig: {
                drawingBufferColorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            }
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]]: {
            primaries: REC709_PRIMARIES,
            whitePoint: D65,
            transfer: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBTransfer"],
            toXYZ: LINEAR_REC709_TO_XYZ,
            fromXYZ: XYZ_TO_LINEAR_REC709,
            luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
            outputColorSpaceConfig: {
                drawingBufferColorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            }
        }
    });
    return ColorManagement;
}
const ColorManagement = /*@__PURE__*/ createColorManagement();
function SRGBToLinear(c) {
    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
    return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Color.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Color",
    ()=>Color
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/ColorManagement.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
;
;
const _colorKeywords = {
    'aliceblue': 0xF0F8FF,
    'antiquewhite': 0xFAEBD7,
    'aqua': 0x00FFFF,
    'aquamarine': 0x7FFFD4,
    'azure': 0xF0FFFF,
    'beige': 0xF5F5DC,
    'bisque': 0xFFE4C4,
    'black': 0x000000,
    'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF,
    'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A,
    'burlywood': 0xDEB887,
    'cadetblue': 0x5F9EA0,
    'chartreuse': 0x7FFF00,
    'chocolate': 0xD2691E,
    'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC,
    'crimson': 0xDC143C,
    'cyan': 0x00FFFF,
    'darkblue': 0x00008B,
    'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B,
    'darkgray': 0xA9A9A9,
    'darkgreen': 0x006400,
    'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B,
    'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F,
    'darkorange': 0xFF8C00,
    'darkorchid': 0x9932CC,
    'darkred': 0x8B0000,
    'darksalmon': 0xE9967A,
    'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B,
    'darkslategray': 0x2F4F4F,
    'darkslategrey': 0x2F4F4F,
    'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493,
    'deepskyblue': 0x00BFFF,
    'dimgray': 0x696969,
    'dimgrey': 0x696969,
    'dodgerblue': 0x1E90FF,
    'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0,
    'forestgreen': 0x228B22,
    'fuchsia': 0xFF00FF,
    'gainsboro': 0xDCDCDC,
    'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700,
    'goldenrod': 0xDAA520,
    'gray': 0x808080,
    'green': 0x008000,
    'greenyellow': 0xADFF2F,
    'grey': 0x808080,
    'honeydew': 0xF0FFF0,
    'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C,
    'indigo': 0x4B0082,
    'ivory': 0xFFFFF0,
    'khaki': 0xF0E68C,
    'lavender': 0xE6E6FA,
    'lavenderblush': 0xFFF0F5,
    'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD,
    'lightblue': 0xADD8E6,
    'lightcoral': 0xF08080,
    'lightcyan': 0xE0FFFF,
    'lightgoldenrodyellow': 0xFAFAD2,
    'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90,
    'lightgrey': 0xD3D3D3,
    'lightpink': 0xFFB6C1,
    'lightsalmon': 0xFFA07A,
    'lightseagreen': 0x20B2AA,
    'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899,
    'lightslategrey': 0x778899,
    'lightsteelblue': 0xB0C4DE,
    'lightyellow': 0xFFFFE0,
    'lime': 0x00FF00,
    'limegreen': 0x32CD32,
    'linen': 0xFAF0E6,
    'magenta': 0xFF00FF,
    'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA,
    'mediumblue': 0x0000CD,
    'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB,
    'mediumseagreen': 0x3CB371,
    'mediumslateblue': 0x7B68EE,
    'mediumspringgreen': 0x00FA9A,
    'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585,
    'midnightblue': 0x191970,
    'mintcream': 0xF5FFFA,
    'mistyrose': 0xFFE4E1,
    'moccasin': 0xFFE4B5,
    'navajowhite': 0xFFDEAD,
    'navy': 0x000080,
    'oldlace': 0xFDF5E6,
    'olive': 0x808000,
    'olivedrab': 0x6B8E23,
    'orange': 0xFFA500,
    'orangered': 0xFF4500,
    'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA,
    'palegreen': 0x98FB98,
    'paleturquoise': 0xAFEEEE,
    'palevioletred': 0xDB7093,
    'papayawhip': 0xFFEFD5,
    'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F,
    'pink': 0xFFC0CB,
    'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6,
    'purple': 0x800080,
    'rebeccapurple': 0x663399,
    'red': 0xFF0000,
    'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1,
    'saddlebrown': 0x8B4513,
    'salmon': 0xFA8072,
    'sandybrown': 0xF4A460,
    'seagreen': 0x2E8B57,
    'seashell': 0xFFF5EE,
    'sienna': 0xA0522D,
    'silver': 0xC0C0C0,
    'skyblue': 0x87CEEB,
    'slateblue': 0x6A5ACD,
    'slategray': 0x708090,
    'slategrey': 0x708090,
    'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F,
    'steelblue': 0x4682B4,
    'tan': 0xD2B48C,
    'teal': 0x008080,
    'thistle': 0xD8BFD8,
    'tomato': 0xFF6347,
    'turquoise': 0x40E0D0,
    'violet': 0xEE82EE,
    'wheat': 0xF5DEB3,
    'white': 0xFFFFFF,
    'whitesmoke': 0xF5F5F5,
    'yellow': 0xFFFF00,
    'yellowgreen': 0x9ACD32
};
const _hslA = {
    h: 0,
    s: 0,
    l: 0
};
const _hslB = {
    h: 0,
    s: 0,
    l: 0
};
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
}
/**
 * A Color instance is represented by RGB components in the linear <i>working
 * color space</i>, which defaults to `LinearSRGBColorSpace`. Inputs
 * conventionally using `SRGBColorSpace` (such as hexadecimals and CSS
 * strings) are converted to the working color space automatically.
 *
 * ```js
 * // converted automatically from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setHex( 0x112233 );
 * ```
 * Source color spaces may be specified explicitly, to ensure correct conversions.
 * ```js
 * // assumed already LinearSRGBColorSpace; no conversion
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 );
 *
 * // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace );
 * ```
 * If THREE.ColorManagement is disabled, no conversions occur. For details,
 * see <i>Color management</i>. Iterating through a Color instance will yield
 * its components (r, g, b) in the corresponding order. A Color can be initialised
 * in any of the following ways:
 * ```js
 * //empty constructor - will default white
 * const color1 = new THREE.Color();
 *
 * //Hexadecimal color (recommended)
 * const color2 = new THREE.Color( 0xff0000 );
 *
 * //RGB string
 * const color3 = new THREE.Color("rgb(255, 0, 0)");
 * const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
 *
 * //X11 color name - all 140 color names are supported.
 * //Note the lack of CamelCase in the name
 * const color5 = new THREE.Color( 'skyblue' );
 * //HSL string
 * const color6 = new THREE.Color("hsl(0, 100%, 50%)");
 *
 * //Separate RGB values between 0 and 1
 * const color7 = new THREE.Color( 1, 0, 0 );
 * ```
 */ class Color {
    /**
	 * Constructs a new color.
	 *
	 * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
	 * and that method is used throughout the rest of the documentation.
	 *
	 * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
	 * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
	 * @param {number} [g] - The green component.
	 * @param {number} [b] - The blue component.
	 */ constructor(r, g, b){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isColor = true;
        /**
		 * The red component.
		 *
		 * @type {number}
		 * @default 1
		 */ this.r = 1;
        /**
		 * The green component.
		 *
		 * @type {number}
		 * @default 1
		 */ this.g = 1;
        /**
		 * The blue component.
		 *
		 * @type {number}
		 * @default 1
		 */ this.b = 1;
        return this.set(r, g, b);
    }
    /**
	 * Sets the colors's components from the given values.
	 *
	 * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
	 * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
	 * @param {number} [g] - The green component.
	 * @param {number} [b] - The blue component.
	 * @return {Color} A reference to this color.
	 */ set(r, g, b) {
        if (g === undefined && b === undefined) {
            // r is THREE.Color, hex or string
            const value = r;
            if (value && value.isColor) {
                this.copy(value);
            } else if (typeof value === 'number') {
                this.setHex(value);
            } else if (typeof value === 'string') {
                this.setStyle(value);
            }
        } else {
            this.setRGB(r, g, b);
        }
        return this;
    }
    /**
	 * Sets the colors's components to the given scalar value.
	 *
	 * @param {number} scalar - The scalar value.
	 * @return {Color} A reference to this color.
	 */ setScalar(scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
        return this;
    }
    /**
	 * Sets this color from a hexadecimal value.
	 *
	 * @param {number} hex - The hexadecimal value.
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {Color} A reference to this color.
	 */ setHex(hex, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].colorSpaceToWorking(this, colorSpace);
        return this;
    }
    /**
	 * Sets this color from RGB values.
	 *
	 * @param {number} r - Red channel value between `0.0` and `1.0`.
	 * @param {number} g - Green channel value between `0.0` and `1.0`.
	 * @param {number} b - Blue channel value between `0.0` and `1.0`.
	 * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	 * @return {Color} A reference to this color.
	 */ setRGB(r, g, b, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingColorSpace) {
        this.r = r;
        this.g = g;
        this.b = b;
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].colorSpaceToWorking(this, colorSpace);
        return this;
    }
    /**
	 * Sets this color from RGB values.
	 *
	 * @param {number} h - Hue value between `0.0` and `1.0`.
	 * @param {number} s - Saturation value between `0.0` and `1.0`.
	 * @param {number} l - Lightness value between `0.0` and `1.0`.
	 * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	 * @return {Color} A reference to this color.
	 */ setHSL(h, s, l, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingColorSpace) {
        // h,s,l ranges are in 0.0 - 1.0
        h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["euclideanModulo"])(h, 1);
        s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(s, 0, 1);
        l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(l, 0, 1);
        if (s === 0) {
            this.r = this.g = this.b = l;
        } else {
            const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            const q = 2 * l - p;
            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].colorSpaceToWorking(this, colorSpace);
        return this;
    }
    /**
	 * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
	 * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
	 * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
	 * all 140 color names are supported).
	 *
	 * @param {string} style - Color as a CSS-style string.
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {Color} A reference to this color.
	 */ setStyle(style, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        function handleAlpha(string) {
            if (string === undefined) return;
            if (parseFloat(string) < 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Color: Alpha component of ' + style + ' will be ignored.');
            }
        }
        let m;
        if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
            // rgb / hsl
            let color;
            const name = m[1];
            const components = m[2];
            switch(name){
                case 'rgb':
                case 'rgba':
                    if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // rgb(255,0,0) rgba(255,0,0,0.5)
                        handleAlpha(color[4]);
                        return this.setRGB(Math.min(255, parseInt(color[1], 10)) / 255, Math.min(255, parseInt(color[2], 10)) / 255, Math.min(255, parseInt(color[3], 10)) / 255, colorSpace);
                    }
                    if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                        handleAlpha(color[4]);
                        return this.setRGB(Math.min(100, parseInt(color[1], 10)) / 100, Math.min(100, parseInt(color[2], 10)) / 100, Math.min(100, parseInt(color[3], 10)) / 100, colorSpace);
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                        handleAlpha(color[4]);
                        return this.setHSL(parseFloat(color[1]) / 360, parseFloat(color[2]) / 100, parseFloat(color[3]) / 100, colorSpace);
                    }
                    break;
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Color: Unknown color model ' + style);
            }
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
            // hex color
            const hex = m[1];
            const size = hex.length;
            if (size === 3) {
                // #ff0
                return this.setRGB(parseInt(hex.charAt(0), 16) / 15, parseInt(hex.charAt(1), 16) / 15, parseInt(hex.charAt(2), 16) / 15, colorSpace);
            } else if (size === 6) {
                // #ff0000
                return this.setHex(parseInt(hex, 16), colorSpace);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Color: Invalid hex color ' + style);
            }
        } else if (style && style.length > 0) {
            return this.setColorName(style, colorSpace);
        }
        return this;
    }
    /**
	 * Sets this color from a color name. Faster than {@link Color#setStyle} if
	 * you don't need the other CSS-style formats.
	 *
	 * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
	 * ```js
	 * Color.NAMES.aliceblue // returns 0xF0F8FF
	 * ```
	 *
	 * @param {string} style - The color name.
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {Color} A reference to this color.
	 */ setColorName(style, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        // color keywords
        const hex = _colorKeywords[style.toLowerCase()];
        if (hex !== undefined) {
            // red
            this.setHex(hex, colorSpace);
        } else {
            // unknown color
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Color: Unknown color ' + style);
        }
        return this;
    }
    /**
	 * Returns a new color with copied values from this instance.
	 *
	 * @return {Color} A clone of this instance.
	 */ clone() {
        return new this.constructor(this.r, this.g, this.b);
    }
    /**
	 * Copies the values of the given color to this instance.
	 *
	 * @param {Color} color - The color to copy.
	 * @return {Color} A reference to this color.
	 */ copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    }
    /**
	 * Copies the given color into this color, and then converts this color from
	 * `SRGBColorSpace` to `LinearSRGBColorSpace`.
	 *
	 * @param {Color} color - The color to copy/convert.
	 * @return {Color} A reference to this color.
	 */ copySRGBToLinear(color) {
        this.r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBToLinear"])(color.r);
        this.g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBToLinear"])(color.g);
        this.b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBToLinear"])(color.b);
        return this;
    }
    /**
	 * Copies the given color into this color, and then converts this color from
	 * `LinearSRGBColorSpace` to `SRGBColorSpace`.
	 *
	 * @param {Color} color - The color to copy/convert.
	 * @return {Color} A reference to this color.
	 */ copyLinearToSRGB(color) {
        this.r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearToSRGB"])(color.r);
        this.g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearToSRGB"])(color.g);
        this.b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LinearToSRGB"])(color.b);
        return this;
    }
    /**
	 * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
	 *
	 * @return {Color} A reference to this color.
	 */ convertSRGBToLinear() {
        this.copySRGBToLinear(this);
        return this;
    }
    /**
	 * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
	 *
	 * @return {Color} A reference to this color.
	 */ convertLinearToSRGB() {
        this.copyLinearToSRGB(this);
        return this;
    }
    /**
	 * Returns the hexadecimal value of this color.
	 *
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {number} The hexadecimal value.
	 */ getHex(colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingToColorSpace(_color.copy(this), colorSpace);
        return Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(_color.r * 255, 0, 255)) * 65536 + Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(_color.g * 255, 0, 255)) * 256 + Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(_color.b * 255, 0, 255));
    }
    /**
	 * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
	 *
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {string} The hexadecimal value as a string.
	 */ getHexString(colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        return ('000000' + this.getHex(colorSpace).toString(16)).slice(-6);
    }
    /**
	 * Converts the colors RGB values into the HSL format and stores them into the
	 * given target object.
	 *
	 * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
	 * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	 * @return {{h:number,s:number,l:number}} The HSL representation of this color.
	 */ getHSL(target, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingColorSpace) {
        // h,s,l ranges are in 0.0 - 1.0
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingToColorSpace(_color.copy(this), colorSpace);
        const r = _color.r, g = _color.g, b = _color.b;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue, saturation;
        const lightness = (min + max) / 2.0;
        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            const delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch(max){
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        target.h = hue;
        target.s = saturation;
        target.l = lightness;
        return target;
    }
    /**
	 * Returns the RGB values of this color and stores them into the given target object.
	 *
	 * @param {Color} target - The target color that is used to store the method's result.
	 * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
	 * @return {Color} The RGB representation of this color.
	 */ getRGB(target, colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingColorSpace) {
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingToColorSpace(_color.copy(this), colorSpace);
        target.r = _color.r;
        target.g = _color.g;
        target.b = _color.b;
        return target;
    }
    /**
	 * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
	 *
	 * @param {string} [colorSpace=SRGBColorSpace] - The color space.
	 * @return {string} The CSS representation of this color.
	 */ getStyle(colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$ColorManagement$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColorManagement"].workingToColorSpace(_color.copy(this), colorSpace);
        const r = _color.r, g = _color.g, b = _color.b;
        if (colorSpace !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SRGBColorSpace"]) {
            // Requires CSS Color Module Level 4 (https://www.w3.org/TR/css-color-4/).
            return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
        }
        return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
    }
    /**
	 * Adds the given HSL values to this color's values.
	 * Internally, this converts the color's RGB values to HSL, adds HSL
	 * and then converts the color back to RGB.
	 *
	 * @param {number} h - Hue value between `0.0` and `1.0`.
	 * @param {number} s - Saturation value between `0.0` and `1.0`.
	 * @param {number} l - Lightness value between `0.0` and `1.0`.
	 * @return {Color} A reference to this color.
	 */ offsetHSL(h, s, l) {
        this.getHSL(_hslA);
        return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
    }
    /**
	 * Adds the RGB values of the given color to the RGB values of this color.
	 *
	 * @param {Color} color - The color to add.
	 * @return {Color} A reference to this color.
	 */ add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }
    /**
	 * Adds the RGB values of the given colors and stores the result in this instance.
	 *
	 * @param {Color} color1 - The first color.
	 * @param {Color} color2 - The second color.
	 * @return {Color} A reference to this color.
	 */ addColors(color1, color2) {
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;
        return this;
    }
    /**
	 * Adds the given scalar value to the RGB values of this color.
	 *
	 * @param {number} s - The scalar to add.
	 * @return {Color} A reference to this color.
	 */ addScalar(s) {
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    }
    /**
	 * Subtracts the RGB values of the given color from the RGB values of this color.
	 *
	 * @param {Color} color - The color to subtract.
	 * @return {Color} A reference to this color.
	 */ sub(color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    }
    /**
	 * Multiplies the RGB values of the given color with the RGB values of this color.
	 *
	 * @param {Color} color - The color to multiply.
	 * @return {Color} A reference to this color.
	 */ multiply(color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    }
    /**
	 * Multiplies the given scalar value with the RGB values of this color.
	 *
	 * @param {number} s - The scalar to multiply.
	 * @return {Color} A reference to this color.
	 */ multiplyScalar(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    }
    /**
	 * Linearly interpolates this color's RGB values toward the RGB values of the
	 * given color. The alpha argument can be thought of as the ratio between
	 * the two colors, where `0.0` is this color and `1.0` is the first argument.
	 *
	 * @param {Color} color - The color to converge on.
	 * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	 * @return {Color} A reference to this color.
	 */ lerp(color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        return this;
    }
    /**
	 * Linearly interpolates between the given colors and stores the result in this instance.
	 * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
	 * is the first and `1.0` is the second color.
	 *
	 * @param {Color} color1 - The first color.
	 * @param {Color} color2 - The second color.
	 * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	 * @return {Color} A reference to this color.
	 */ lerpColors(color1, color2, alpha) {
        this.r = color1.r + (color2.r - color1.r) * alpha;
        this.g = color1.g + (color2.g - color1.g) * alpha;
        this.b = color1.b + (color2.b - color1.b) * alpha;
        return this;
    }
    /**
	 * Linearly interpolates this color's HSL values toward the HSL values of the
	 * given color. It differs from {@link Color#lerp} by not interpolating straight
	 * from one color to the other, but instead going through all the hues in between
	 * those two colors. The alpha argument can be thought of as the ratio between
	 * the two colors, where 0.0 is this color and 1.0 is the first argument.
	 *
	 * @param {Color} color - The color to converge on.
	 * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
	 * @return {Color} A reference to this color.
	 */ lerpHSL(color, alpha) {
        this.getHSL(_hslA);
        color.getHSL(_hslB);
        const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lerp"])(_hslA.h, _hslB.h, alpha);
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lerp"])(_hslA.s, _hslB.s, alpha);
        const l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lerp"])(_hslA.l, _hslB.l, alpha);
        this.setHSL(h, s, l);
        return this;
    }
    /**
	 * Sets the color's RGB components from the given 3D vector.
	 *
	 * @param {Vector3} v - The vector to set.
	 * @return {Color} A reference to this color.
	 */ setFromVector3(v) {
        this.r = v.x;
        this.g = v.y;
        this.b = v.z;
        return this;
    }
    /**
	 * Transforms this color with the given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The matrix.
	 * @return {Color} A reference to this color.
	 */ applyMatrix3(m) {
        const r = this.r, g = this.g, b = this.b;
        const e = m.elements;
        this.r = e[0] * r + e[3] * g + e[6] * b;
        this.g = e[1] * r + e[4] * g + e[7] * b;
        this.b = e[2] * r + e[5] * g + e[8] * b;
        return this;
    }
    /**
	 * Returns `true` if this color is equal with the given one.
	 *
	 * @param {Color} c - The color to test for equality.
	 * @return {boolean} Whether this bounding color is equal with the given one.
	 */ equals(c) {
        return c.r === this.r && c.g === this.g && c.b === this.b;
    }
    /**
	 * Sets this color's RGB components from the given array.
	 *
	 * @param {Array<number>} array - An array holding the RGB values.
	 * @param {number} [offset=0] - The offset into the array.
	 * @return {Color} A reference to this color.
	 */ fromArray(array, offset = 0) {
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];
        return this;
    }
    /**
	 * Writes the RGB components of this color to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the color components.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The color components.
	 */ toArray(array = [], offset = 0) {
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }
    /**
	 * Sets the components of this color from the given buffer attribute.
	 *
	 * @param {BufferAttribute} attribute - The buffer attribute holding color data.
	 * @param {number} index - The index into the attribute.
	 * @return {Color} A reference to this color.
	 */ fromBufferAttribute(attribute, index) {
        this.r = attribute.getX(index);
        this.g = attribute.getY(index);
        this.b = attribute.getZ(index);
        return this;
    }
    /**
	 * This methods defines the serialization result of this class. Returns the color
	 * as a hexadecimal value.
	 *
	 * @return {number} The hexadecimal value.
	 */ toJSON() {
        return this.getHex();
    }
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
    }
}
const _color = /*@__PURE__*/ new Color();
/**
 * A dictionary with X11 color names.
 *
 * Note that multiple words such as Dark Orange become the string 'darkorange'.
 *
 * @static
 * @type {Object}
 */ Color.NAMES = _colorKeywords;
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix2.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Represents a 2x2 matrix.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix2#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix2#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix2();
 * m.set( 11, 12,
 *        21, 22 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21,
 *                12, 22 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */ __turbopack_context__.s([
    "Matrix2",
    ()=>Matrix2
]);
class Matrix2 {
    /**
	 * Constructs a new 2x2 matrix. The arguments are supposed to be
	 * in row-major order. If no arguments are provided, the constructor
	 * initializes the matrix as an identity matrix.
	 *
	 * @param {number} [n11] - 1-1 matrix element.
	 * @param {number} [n12] - 1-2 matrix element.
	 * @param {number} [n21] - 2-1 matrix element.
	 * @param {number} [n22] - 2-2 matrix element.
	 */ constructor(n11, n12, n21, n22){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Matrix2.prototype.isMatrix2 = true;
        /**
		 * A column-major list of matrix values.
		 *
		 * @type {Array<number>}
		 */ this.elements = [
            1,
            0,
            0,
            1
        ];
        if (n11 !== undefined) {
            this.set(n11, n12, n21, n22);
        }
    }
    /**
	 * Sets this matrix to the 2x2 identity matrix.
	 *
	 * @return {Matrix2} A reference to this matrix.
	 */ identity() {
        this.set(1, 0, 0, 1);
        return this;
    }
    /**
	 * Sets the elements of the matrix from the given array.
	 *
	 * @param {Array<number>} array - The matrix elements in column-major order.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Matrix2} A reference to this matrix.
	 */ fromArray(array, offset = 0) {
        for(let i = 0; i < 4; i++){
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    /**
	 * Sets the elements of the matrix.The arguments are supposed to be
	 * in row-major order.
	 *
	 * @param {number} n11 - 1-1 matrix element.
	 * @param {number} n12 - 1-2 matrix element.
	 * @param {number} n21 - 2-1 matrix element.
	 * @param {number} n22 - 2-2 matrix element.
	 * @return {Matrix2} A reference to this matrix.
	 */ set(n11, n12, n21, n22) {
        const te = this.elements;
        te[0] = n11;
        te[2] = n12;
        te[1] = n21;
        te[3] = n22;
        return this;
    }
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Quaternion.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Quaternion",
    ()=>Quaternion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
/**
 * Class for representing a Quaternion. Quaternions are used in three.js to represent rotations.
 *
 * Iterating through a vector instance will yield its components `(x, y, z, w)` in
 * the corresponding order.
 *
 * Note that three.js expects Quaternions to be normalized.
 * ```js
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 *
 * const vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 * ```
 */ class Quaternion {
    /**
	 * Constructs a new quaternion.
	 *
	 * @param {number} [x=0] - The x value of this quaternion.
	 * @param {number} [y=0] - The y value of this quaternion.
	 * @param {number} [z=0] - The z value of this quaternion.
	 * @param {number} [w=1] - The w value of this quaternion.
	 */ constructor(x = 0, y = 0, z = 0, w = 1){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isQuaternion = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    /**
	 * Interpolates between two quaternions via SLERP. This implementation assumes the
	 * quaternion data are managed in flat arrays.
	 *
	 * @param {Array<number>} dst - The destination array.
	 * @param {number} dstOffset - An offset into the destination array.
	 * @param {Array<number>} src0 - The source array of the first quaternion.
	 * @param {number} srcOffset0 - An offset into the first source array.
	 * @param {Array<number>} src1 -  The source array of the second quaternion.
	 * @param {number} srcOffset1 - An offset into the second source array.
	 * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
	 * @see {@link Quaternion#slerp}
	 */ static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
        let x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
            let dot = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
            if (dot < 0) {
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
                w1 = -w1;
                dot = -dot;
            }
            let s = 1 - t;
            if (dot < 0.9995) {
                // slerp
                const theta = Math.acos(dot);
                const sin = Math.sin(theta);
                s = Math.sin(s * theta) / sin;
                t = Math.sin(t * theta) / sin;
                x0 = x0 * s + x1 * t;
                y0 = y0 * s + y1 * t;
                z0 = z0 * s + z1 * t;
                w0 = w0 * s + w1 * t;
            } else {
                // for small angles, lerp then normalize
                x0 = x0 * s + x1 * t;
                y0 = y0 * s + y1 * t;
                z0 = z0 * s + z1 * t;
                w0 = w0 * s + w1 * t;
                const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;
            }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    }
    /**
	 * Multiplies two quaternions. This implementation assumes the quaternion data are managed
	 * in flat arrays.
	 *
	 * @param {Array<number>} dst - The destination array.
	 * @param {number} dstOffset - An offset into the destination array.
	 * @param {Array<number>} src0 - The source array of the first quaternion.
	 * @param {number} srcOffset0 - An offset into the first source array.
	 * @param {Array<number>} src1 -  The source array of the second quaternion.
	 * @param {number} srcOffset1 - An offset into the second source array.
	 * @return {Array<number>} The destination array.
	 * @see {@link Quaternion#multiplyQuaternions}.
	 */ static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
        const x0 = src0[srcOffset0];
        const y0 = src0[srcOffset0 + 1];
        const z0 = src0[srcOffset0 + 2];
        const w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1];
        const y1 = src1[srcOffset1 + 1];
        const z1 = src1[srcOffset1 + 2];
        const w1 = src1[srcOffset1 + 3];
        dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
        dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
        dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
        dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
        return dst;
    }
    /**
	 * The x value of this quaternion.
	 *
	 * @type {number}
	 * @default 0
	 */ get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }
    /**
	 * The y value of this quaternion.
	 *
	 * @type {number}
	 * @default 0
	 */ get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }
    /**
	 * The z value of this quaternion.
	 *
	 * @type {number}
	 * @default 0
	 */ get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }
    /**
	 * The w value of this quaternion.
	 *
	 * @type {number}
	 * @default 1
	 */ get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this._onChangeCallback();
    }
    /**
	 * Sets the quaternion components.
	 *
	 * @param {number} x - The x value of this quaternion.
	 * @param {number} y - The y value of this quaternion.
	 * @param {number} z - The z value of this quaternion.
	 * @param {number} w - The w value of this quaternion.
	 * @return {Quaternion} A reference to this quaternion.
	 */ set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this._onChangeCallback();
        return this;
    }
    /**
	 * Returns a new quaternion with copied values from this instance.
	 *
	 * @return {Quaternion} A clone of this instance.
	 */ clone() {
        return new this.constructor(this._x, this._y, this._z, this._w);
    }
    /**
	 * Copies the values of the given quaternion to this instance.
	 *
	 * @param {Quaternion} quaternion - The quaternion to copy.
	 * @return {Quaternion} A reference to this quaternion.
	 */ copy(quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this._onChangeCallback();
        return this;
    }
    /**
	 * Sets this quaternion from the rotation specified by the given
	 * Euler angles.
	 *
	 * @param {Euler} euler - The Euler angles.
	 * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
	 * @return {Quaternion} A reference to this quaternion.
	 */ setFromEuler(euler, update = true) {
        const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
        // http://www.mathworks.com/matlabcentral/fileexchange/
        // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //	content/SpinCalc.m
        const cos = Math.cos;
        const sin = Math.sin;
        const c1 = cos(x / 2);
        const c2 = cos(y / 2);
        const c3 = cos(z / 2);
        const s1 = sin(x / 2);
        const s2 = sin(y / 2);
        const s3 = sin(z / 2);
        switch(order){
            case 'XYZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'YXZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'ZXY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'ZYX':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'YZX':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'XZY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Quaternion: .setFromEuler() encountered an unknown order: ' + order);
        }
        if (update === true) this._onChangeCallback();
        return this;
    }
    /**
	 * Sets this quaternion from the given axis and angle.
	 *
	 * @param {Vector3} axis - The normalized axis.
	 * @param {number} angle - The angle in radians.
	 * @return {Quaternion} A reference to this quaternion.
	 */ setFromAxisAngle(axis, angle) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
        const halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this._onChangeCallback();
        return this;
    }
    /**
	 * Sets this quaternion from the given rotation matrix.
	 *
	 * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
	 * @return {Quaternion} A reference to this quaternion.
	 */ setFromRotationMatrix(m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s;
            this._x = 0.25 * s;
            this._y = (m12 + m21) / s;
            this._z = (m13 + m31) / s;
        } else if (m22 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s;
            this._x = (m12 + m21) / s;
            this._y = 0.25 * s;
            this._z = (m23 + m32) / s;
        } else {
            const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s;
            this._x = (m13 + m31) / s;
            this._y = (m23 + m32) / s;
            this._z = 0.25 * s;
        }
        this._onChangeCallback();
        return this;
    }
    /**
	 * Sets this quaternion to the rotation required to rotate the direction vector
	 * `vFrom` to the direction vector `vTo`.
	 *
	 * @param {Vector3} vFrom - The first (normalized) direction vector.
	 * @param {Vector3} vTo - The second (normalized) direction vector.
	 * @return {Quaternion} A reference to this quaternion.
	 */ setFromUnitVectors(vFrom, vTo) {
        // assumes direction vectors vFrom and vTo are normalized
        let r = vFrom.dot(vTo) + 1;
        if (r < 1e-8) {
            // vFrom and vTo point in opposite directions
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                this._x = -vFrom.y;
                this._y = vFrom.x;
                this._z = 0;
                this._w = r;
            } else {
                this._x = 0;
                this._y = -vFrom.z;
                this._z = vFrom.y;
                this._w = r;
            }
        } else {
            // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
            this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
            this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
            this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
            this._w = r;
        }
        return this.normalize();
    }
    /**
	 * Returns the angle between this quaternion and the given one in radians.
	 *
	 * @param {Quaternion} q - The quaternion to compute the angle with.
	 * @return {number} The angle in radians.
	 */ angleTo(q) {
        return 2 * Math.acos(Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.dot(q), -1, 1)));
    }
    /**
	 * Rotates this quaternion by a given angular step to the given quaternion.
	 * The method ensures that the final quaternion will not overshoot `q`.
	 *
	 * @param {Quaternion} q - The target quaternion.
	 * @param {number} step - The angular step in radians.
	 * @return {Quaternion} A reference to this quaternion.
	 */ rotateTowards(q, step) {
        const angle = this.angleTo(q);
        if (angle === 0) return this;
        const t = Math.min(1, step / angle);
        this.slerp(q, t);
        return this;
    }
    /**
	 * Sets this quaternion to the identity quaternion; that is, to the
	 * quaternion that represents "no rotation".
	 *
	 * @return {Quaternion} A reference to this quaternion.
	 */ identity() {
        return this.set(0, 0, 0, 1);
    }
    /**
	 * Inverts this quaternion via {@link Quaternion#conjugate}. The
	 * quaternion is assumed to have unit length.
	 *
	 * @return {Quaternion} A reference to this quaternion.
	 */ invert() {
        return this.conjugate();
    }
    /**
	 * Returns the rotational conjugate of this quaternion. The conjugate of a
	 * quaternion represents the same rotation in the opposite direction about
	 * the rotational axis.
	 *
	 * @return {Quaternion} A reference to this quaternion.
	 */ conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._onChangeCallback();
        return this;
    }
    /**
	 * Calculates the dot product of this quaternion and the given one.
	 *
	 * @param {Quaternion} v - The quaternion to compute the dot product with.
	 * @return {number} The result of the dot product.
	 */ dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    /**
	 * Computes the squared Euclidean length (straight-line length) of this quaternion,
	 * considered as a 4 dimensional vector. This can be useful if you are comparing the
	 * lengths of two quaternions, as this is a slightly more efficient calculation than
	 * {@link Quaternion#length}.
	 *
	 * @return {number} The squared Euclidean length.
	 */ lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    /**
	 * Computes the Euclidean length (straight-line length) of this quaternion,
	 * considered as a 4 dimensional vector.
	 *
	 * @return {number} The Euclidean length.
	 */ length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    /**
	 * Normalizes this quaternion - that is, calculated the quaternion that performs
	 * the same rotation as this one, but has a length equal to `1`.
	 *
	 * @return {Quaternion} A reference to this quaternion.
	 */ normalize() {
        let l = this.length();
        if (l === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        } else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        this._onChangeCallback();
        return this;
    }
    /**
	 * Multiplies this quaternion by the given one.
	 *
	 * @param {Quaternion} q - The quaternion.
	 * @return {Quaternion} A reference to this quaternion.
	 */ multiply(q) {
        return this.multiplyQuaternions(this, q);
    }
    /**
	 * Pre-multiplies this quaternion by the given one.
	 *
	 * @param {Quaternion} q - The quaternion.
	 * @return {Quaternion} A reference to this quaternion.
	 */ premultiply(q) {
        return this.multiplyQuaternions(q, this);
    }
    /**
	 * Multiplies the given quaternions and stores the result in this instance.
	 *
	 * @param {Quaternion} a - The first quaternion.
	 * @param {Quaternion} b - The second quaternion.
	 * @return {Quaternion} A reference to this quaternion.
	 */ multiplyQuaternions(a, b) {
        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
        const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this._onChangeCallback();
        return this;
    }
    /**
	 * Performs a spherical linear interpolation between this quaternion and the target quaternion.
	 *
	 * @param {Quaternion} qb - The target quaternion.
	 * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
	 * @return {Quaternion} A reference to this quaternion.
	 */ slerp(qb, t) {
        let x = qb._x, y = qb._y, z = qb._z, w = qb._w;
        let dot = this.dot(qb);
        if (dot < 0) {
            x = -x;
            y = -y;
            z = -z;
            w = -w;
            dot = -dot;
        }
        let s = 1 - t;
        if (dot < 0.9995) {
            // slerp
            const theta = Math.acos(dot);
            const sin = Math.sin(theta);
            s = Math.sin(s * theta) / sin;
            t = Math.sin(t * theta) / sin;
            this._x = this._x * s + x * t;
            this._y = this._y * s + y * t;
            this._z = this._z * s + z * t;
            this._w = this._w * s + w * t;
            this._onChangeCallback();
        } else {
            // for small angles, lerp then normalize
            this._x = this._x * s + x * t;
            this._y = this._y * s + y * t;
            this._z = this._z * s + z * t;
            this._w = this._w * s + w * t;
            this.normalize(); // normalize calls _onChangeCallback()
        }
        return this;
    }
    /**
	 * Performs a spherical linear interpolation between the given quaternions
	 * and stores the result in this quaternion.
	 *
	 * @param {Quaternion} qa - The source quaternion.
	 * @param {Quaternion} qb - The target quaternion.
	 * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
	 * @return {Quaternion} A reference to this quaternion.
	 */ slerpQuaternions(qa, qb, t) {
        return this.copy(qa).slerp(qb, t);
    }
    /**
	 * Sets this quaternion to a uniformly random, normalized quaternion.
	 *
	 * @return {Quaternion} A reference to this quaternion.
	 */ random() {
        // Ken Shoemake
        // Uniform random rotations
        // D. Kirk, editor, Graphics Gems III, pages 124-132. Academic Press, New York, 1992.
        const theta1 = 2 * Math.PI * Math.random();
        const theta2 = 2 * Math.PI * Math.random();
        const x0 = Math.random();
        const r1 = Math.sqrt(1 - x0);
        const r2 = Math.sqrt(x0);
        return this.set(r1 * Math.sin(theta1), r1 * Math.cos(theta1), r2 * Math.sin(theta2), r2 * Math.cos(theta2));
    }
    /**
	 * Returns `true` if this quaternion is equal with the given one.
	 *
	 * @param {Quaternion} quaternion - The quaternion to test for equality.
	 * @return {boolean} Whether this quaternion is equal with the given one.
	 */ equals(quaternion) {
        return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    /**
	 * Sets this quaternion's components from the given array.
	 *
	 * @param {Array<number>} array - An array holding the quaternion component values.
	 * @param {number} [offset=0] - The offset into the array.
	 * @return {Quaternion} A reference to this quaternion.
	 */ fromArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this._onChangeCallback();
        return this;
    }
    /**
	 * Writes the components of this quaternion to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The quaternion components.
	 */ toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    }
    /**
	 * Sets the components of this quaternion from the given buffer attribute.
	 *
	 * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
	 * @param {number} index - The index into the attribute.
	 * @return {Quaternion} A reference to this quaternion.
	 */ fromBufferAttribute(attribute, index) {
        this._x = attribute.getX(index);
        this._y = attribute.getY(index);
        this._z = attribute.getZ(index);
        this._w = attribute.getW(index);
        this._onChangeCallback();
        return this;
    }
    /**
	 * This methods defines the serialization result of this class. Returns the
	 * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
	 *
	 * @return {Array<number>} The serialized quaternion.
	 */ toJSON() {
        return this.toArray();
    }
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._w;
    }
}
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector3.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Vector3",
    ()=>Vector3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Quaternion$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Quaternion.js [app-rsc] (ecmascript)");
;
;
/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers
 * (labeled x, y and z), which can be used to represent a number of things, such as:
 *
 * - A point in 3D space.
 * - A direction and length in 3D space. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0, 0)` to `(x, y, z)`
 * and the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
 * - Any arbitrary ordered triplet of numbers.
 *
 * There are other things a 3D vector can be used to represent, such as
 * momentum vectors and so on, however these are the most
 * common uses in three.js.
 *
 * Iterating through a vector instance will yield its components `(x, y, z)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector3( 0, 1, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0)
 * const b = new THREE.Vector3( );
 *
 * const d = a.distanceTo( b );
 * ```
 */ class Vector3 {
    /**
	 * Constructs a new 3D vector.
	 *
	 * @param {number} [x=0] - The x value of this vector.
	 * @param {number} [y=0] - The y value of this vector.
	 * @param {number} [z=0] - The z value of this vector.
	 */ constructor(x = 0, y = 0, z = 0){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Vector3.prototype.isVector3 = true;
        /**
		 * The x value of this vector.
		 *
		 * @type {number}
		 */ this.x = x;
        /**
		 * The y value of this vector.
		 *
		 * @type {number}
		 */ this.y = y;
        /**
		 * The z value of this vector.
		 *
		 * @type {number}
		 */ this.z = z;
    }
    /**
	 * Sets the vector components.
	 *
	 * @param {number} x - The value of the x component.
	 * @param {number} y - The value of the y component.
	 * @param {number} z - The value of the z component.
	 * @return {Vector3} A reference to this vector.
	 */ set(x, y, z) {
        if (z === undefined) z = this.z; // sprite.scale.set(x,y)
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    /**
	 * Sets the vector components to the same value.
	 *
	 * @param {number} scalar - The value to set for all vector components.
	 * @return {Vector3} A reference to this vector.
	 */ setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }
    /**
	 * Sets the vector's x component to the given value.
	 *
	 * @param {number} x - The value to set.
	 * @return {Vector3} A reference to this vector.
	 */ setX(x) {
        this.x = x;
        return this;
    }
    /**
	 * Sets the vector's y component to the given value.
	 *
	 * @param {number} y - The value to set.
	 * @return {Vector3} A reference to this vector.
	 */ setY(y) {
        this.y = y;
        return this;
    }
    /**
	 * Sets the vector's z component to the given value.
	 *
	 * @param {number} z - The value to set.
	 * @return {Vector3} A reference to this vector.
	 */ setZ(z) {
        this.z = z;
        return this;
    }
    /**
	 * Allows to set a vector component with an index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
	 * @param {number} value - The value to set.
	 * @return {Vector3} A reference to this vector.
	 */ setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    /**
	 * Returns the value of the vector component which matches the given index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
	 * @return {number} A vector component value.
	 */ getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    /**
	 * Returns a new vector with copied values from this instance.
	 *
	 * @return {Vector3} A clone of this instance.
	 */ clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
    /**
	 * Copies the values of the given vector to this instance.
	 *
	 * @param {Vector3} v - The vector to copy.
	 * @return {Vector3} A reference to this vector.
	 */ copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    /**
	 * Adds the given vector to this instance.
	 *
	 * @param {Vector3} v - The vector to add.
	 * @return {Vector3} A reference to this vector.
	 */ add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    /**
	 * Adds the given scalar value to all components of this instance.
	 *
	 * @param {number} s - The scalar to add.
	 * @return {Vector3} A reference to this vector.
	 */ addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }
    /**
	 * Adds the given vectors and stores the result in this instance.
	 *
	 * @param {Vector3} a - The first vector.
	 * @param {Vector3} b - The second vector.
	 * @return {Vector3} A reference to this vector.
	 */ addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }
    /**
	 * Adds the given vector scaled by the given factor to this instance.
	 *
	 * @param {Vector3|Vector4} v - The vector.
	 * @param {number} s - The factor that scales `v`.
	 * @return {Vector3} A reference to this vector.
	 */ addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }
    /**
	 * Subtracts the given vector from this instance.
	 *
	 * @param {Vector3} v - The vector to subtract.
	 * @return {Vector3} A reference to this vector.
	 */ sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    /**
	 * Subtracts the given scalar value from all components of this instance.
	 *
	 * @param {number} s - The scalar to subtract.
	 * @return {Vector3} A reference to this vector.
	 */ subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }
    /**
	 * Subtracts the given vectors and stores the result in this instance.
	 *
	 * @param {Vector3} a - The first vector.
	 * @param {Vector3} b - The second vector.
	 * @return {Vector3} A reference to this vector.
	 */ subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }
    /**
	 * Multiplies the given vector with this instance.
	 *
	 * @param {Vector3} v - The vector to multiply.
	 * @return {Vector3} A reference to this vector.
	 */ multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    /**
	 * Multiplies the given scalar value with all components of this instance.
	 *
	 * @param {number} scalar - The scalar to multiply.
	 * @return {Vector3} A reference to this vector.
	 */ multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    /**
	 * Multiplies the given vectors and stores the result in this instance.
	 *
	 * @param {Vector3} a - The first vector.
	 * @param {Vector3} b - The second vector.
	 * @return {Vector3} A reference to this vector.
	 */ multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }
    /**
	 * Applies the given Euler rotation to this vector.
	 *
	 * @param {Euler} euler - The Euler angles.
	 * @return {Vector3} A reference to this vector.
	 */ applyEuler(euler) {
        return this.applyQuaternion(_quaternion.setFromEuler(euler));
    }
    /**
	 * Applies a rotation specified by an axis and an angle to this vector.
	 *
	 * @param {Vector3} axis - A normalized vector representing the rotation axis.
	 * @param {number} angle - The angle in radians.
	 * @return {Vector3} A reference to this vector.
	 */ applyAxisAngle(axis, angle) {
        return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));
    }
    /**
	 * Multiplies this vector with the given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The 3x3 matrix.
	 * @return {Vector3} A reference to this vector.
	 */ applyMatrix3(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }
    /**
	 * Multiplies this vector by the given normal matrix and normalizes
	 * the result.
	 *
	 * @param {Matrix3} m - The normal matrix.
	 * @return {Vector3} A reference to this vector.
	 */ applyNormalMatrix(m) {
        return this.applyMatrix3(m).normalize();
    }
    /**
	 * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
	 * divides by perspective.
	 *
	 * @param {Matrix4} m - The matrix to apply.
	 * @return {Vector3} A reference to this vector.
	 */ applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
    }
    /**
	 * Applies the given Quaternion to this vector.
	 *
	 * @param {Quaternion} q - The Quaternion.
	 * @return {Vector3} A reference to this vector.
	 */ applyQuaternion(q) {
        // quaternion q is assumed to have unit length
        const vx = this.x, vy = this.y, vz = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        // t = 2 * cross( q.xyz, v );
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);
        // v + q.w * t + cross( q.xyz, t );
        this.x = vx + qw * tx + qy * tz - qz * ty;
        this.y = vy + qw * ty + qz * tx - qx * tz;
        this.z = vz + qw * tz + qx * ty - qy * tx;
        return this;
    }
    /**
	 * Projects this vector from world space into the camera's normalized
	 * device coordinate (NDC) space.
	 *
	 * @param {Camera} camera - The camera.
	 * @return {Vector3} A reference to this vector.
	 */ project(camera) {
        return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
    /**
	 * Unprojects this vector from the camera's normalized device coordinate (NDC)
	 * space into world space.
	 *
	 * @param {Camera} camera - The camera.
	 * @return {Vector3} A reference to this vector.
	 */ unproject(camera) {
        return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
    /**
	 * Transforms the direction of this vector by a matrix (the upper left 3 x 3
	 * subset of the given 4x4 matrix and then normalizes the result.
	 *
	 * @param {Matrix4} m - The matrix.
	 * @return {Vector3} A reference to this vector.
	 */ transformDirection(m) {
        // input: THREE.Matrix4 affine matrix
        // vector interpreted as a direction
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    }
    /**
	 * Divides this instance by the given vector.
	 *
	 * @param {Vector3} v - The vector to divide.
	 * @return {Vector3} A reference to this vector.
	 */ divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    /**
	 * Divides this vector by the given scalar.
	 *
	 * @param {number} scalar - The scalar to divide.
	 * @return {Vector3} A reference to this vector.
	 */ divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    /**
	 * If this vector's x, y or z value is greater than the given vector's x, y or z
	 * value, replace that value with the corresponding min value.
	 *
	 * @param {Vector3} v - The vector.
	 * @return {Vector3} A reference to this vector.
	 */ min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }
    /**
	 * If this vector's x, y or z value is less than the given vector's x, y or z
	 * value, replace that value with the corresponding max value.
	 *
	 * @param {Vector3} v - The vector.
	 * @return {Vector3} A reference to this vector.
	 */ max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }
    /**
	 * If this vector's x, y or z value is greater than the max vector's x, y or z
	 * value, it is replaced by the corresponding value.
	 * If this vector's x, y or z value is less than the min vector's x, y or z value,
	 * it is replaced by the corresponding value.
	 *
	 * @param {Vector3} min - The minimum x, y and z values.
	 * @param {Vector3} max - The maximum x, y and z values in the desired range.
	 * @return {Vector3} A reference to this vector.
	 */ clamp(min, max) {
        // assumes min < max, componentwise
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, min.x, max.x);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, min.y, max.y);
        this.z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.z, min.z, max.z);
        return this;
    }
    /**
	 * If this vector's x, y or z values are greater than the max value, they are
	 * replaced by the max value.
	 * If this vector's x, y or z values are less than the min value, they are
	 * replaced by the min value.
	 *
	 * @param {number} minVal - The minimum value the components will be clamped to.
	 * @param {number} maxVal - The maximum value the components will be clamped to.
	 * @return {Vector3} A reference to this vector.
	 */ clampScalar(minVal, maxVal) {
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, minVal, maxVal);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, minVal, maxVal);
        this.z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.z, minVal, maxVal);
        return this;
    }
    /**
	 * If this vector's length is greater than the max value, it is replaced by
	 * the max value.
	 * If this vector's length is less than the min value, it is replaced by the
	 * min value.
	 *
	 * @param {number} min - The minimum value the vector length will be clamped to.
	 * @param {number} max - The maximum value the vector length will be clamped to.
	 * @return {Vector3} A reference to this vector.
	 */ clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(length, min, max));
    }
    /**
	 * The components of this vector are rounded down to the nearest integer value.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    /**
	 * The components of this vector are rounded up to the nearest integer value.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    /**
	 * The components of this vector are rounded to the nearest integer value
	 *
	 * @return {Vector3} A reference to this vector.
	 */ round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    /**
	 * The components of this vector are rounded towards zero (up if negative,
	 * down if positive) to an integer value.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        return this;
    }
    /**
	 * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    /**
	 * Calculates the dot product of the given vector with this instance.
	 *
	 * @param {Vector3} v - The vector to compute the dot product with.
	 * @return {number} The result of the dot product.
	 */ dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    /**
	 * Computes the square of the Euclidean length (straight-line length) from
	 * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
	 * compare the length squared instead as it is slightly more efficient to calculate.
	 *
	 * @return {number} The square length of this vector.
	 */ lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /**
	 * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
	 *
	 * @return {number} The length of this vector.
	 */ length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number} The length of this vector.
	 */ manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    /**
	 * Converts this vector to a unit vector - that is, sets it equal to a vector
	 * with the same direction as this one, but with a vector length of `1`.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ normalize() {
        return this.divideScalar(this.length() || 1);
    }
    /**
	 * Sets this vector to a vector with the same direction as this one, but
	 * with the specified length.
	 *
	 * @param {number} length - The new length of this vector.
	 * @return {Vector3} A reference to this vector.
	 */ setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    /**
	 * Linearly interpolates between the given vector and this instance, where
	 * alpha is the percent distance along the line - alpha = 0 will be this
	 * vector, and alpha = 1 will be the given one.
	 *
	 * @param {Vector3} v - The vector to interpolate towards.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector3} A reference to this vector.
	 */ lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }
    /**
	 * Linearly interpolates between the given vectors, where alpha is the percent
	 * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	 * be the second one. The result is stored in this instance.
	 *
	 * @param {Vector3} v1 - The first vector.
	 * @param {Vector3} v2 - The second vector.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector3} A reference to this vector.
	 */ lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        return this;
    }
    /**
	 * Calculates the cross product of the given vector with this instance.
	 *
	 * @param {Vector3} v - The vector to compute the cross product with.
	 * @return {Vector3} The result of the cross product.
	 */ cross(v) {
        return this.crossVectors(this, v);
    }
    /**
	 * Calculates the cross product of the given vectors and stores the result
	 * in this instance.
	 *
	 * @param {Vector3} a - The first vector.
	 * @param {Vector3} b - The second vector.
	 * @return {Vector3} A reference to this vector.
	 */ crossVectors(a, b) {
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    /**
	 * Projects this vector onto the given one.
	 *
	 * @param {Vector3} v - The vector to project to.
	 * @return {Vector3} A reference to this vector.
	 */ projectOnVector(v) {
        const denominator = v.lengthSq();
        if (denominator === 0) return this.set(0, 0, 0);
        const scalar = v.dot(this) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }
    /**
	 * Projects this vector onto a plane by subtracting this
	 * vector projected onto the plane's normal from this vector.
	 *
	 * @param {Vector3} planeNormal - The plane normal.
	 * @return {Vector3} A reference to this vector.
	 */ projectOnPlane(planeNormal) {
        _vector.copy(this).projectOnVector(planeNormal);
        return this.sub(_vector);
    }
    /**
	 * Reflects this vector off a plane orthogonal to the given normal vector.
	 *
	 * @param {Vector3} normal - The (normalized) normal vector.
	 * @return {Vector3} A reference to this vector.
	 */ reflect(normal) {
        return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    /**
	 * Returns the angle between the given vector and this instance in radians.
	 *
	 * @param {Vector3} v - The vector to compute the angle with.
	 * @return {number} The angle in radians.
	 */ angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        // clamp, to handle numerical problems
        return Math.acos((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(theta, -1, 1));
    }
    /**
	 * Computes the distance from the given vector to this instance.
	 *
	 * @param {Vector3} v - The vector to compute the distance to.
	 * @return {number} The distance.
	 */ distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    /**
	 * Computes the squared distance from the given vector to this instance.
	 * If you are just comparing the distance with another distance, you should compare
	 * the distance squared instead as it is slightly more efficient to calculate.
	 *
	 * @param {Vector3} v - The vector to compute the squared distance to.
	 * @return {number} The squared distance.
	 */ distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
	 * Computes the Manhattan distance from the given vector to this instance.
	 *
	 * @param {Vector3} v - The vector to compute the Manhattan distance to.
	 * @return {number} The Manhattan distance.
	 */ manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    /**
	 * Sets the vector components from the given spherical coordinates.
	 *
	 * @param {Spherical} s - The spherical coordinates.
	 * @return {Vector3} A reference to this vector.
	 */ setFromSpherical(s) {
        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
    /**
	 * Sets the vector components from the given spherical coordinates.
	 *
	 * @param {number} radius - The radius.
	 * @param {number} phi - The phi angle in radians.
	 * @param {number} theta - The theta angle in radians.
	 * @return {Vector3} A reference to this vector.
	 */ setFromSphericalCoords(radius, phi, theta) {
        const sinPhiRadius = Math.sin(phi) * radius;
        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);
        return this;
    }
    /**
	 * Sets the vector components from the given cylindrical coordinates.
	 *
	 * @param {Cylindrical} c - The cylindrical coordinates.
	 * @return {Vector3} A reference to this vector.
	 */ setFromCylindrical(c) {
        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
    /**
	 * Sets the vector components from the given cylindrical coordinates.
	 *
	 * @param {number} radius - The radius.
	 * @param {number} theta - The theta angle in radians.
	 * @param {number} y - The y value.
	 * @return {Vector3} A reference to this vector.
	 */ setFromCylindricalCoords(radius, theta, y) {
        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);
        return this;
    }
    /**
	 * Sets the vector components to the position elements of the
	 * given transformation matrix.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @return {Vector3} A reference to this vector.
	 */ setFromMatrixPosition(m) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }
    /**
	 * Sets the vector components to the scale elements of the
	 * given transformation matrix.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @return {Vector3} A reference to this vector.
	 */ setFromMatrixScale(m) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }
    /**
	 * Sets the vector components from the specified matrix column.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @param {number} index - The column index.
	 * @return {Vector3} A reference to this vector.
	 */ setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, index * 4);
    }
    /**
	 * Sets the vector components from the specified matrix column.
	 *
	 * @param {Matrix3} m - The 3x3 matrix.
	 * @param {number} index - The column index.
	 * @return {Vector3} A reference to this vector.
	 */ setFromMatrix3Column(m, index) {
        return this.fromArray(m.elements, index * 3);
    }
    /**
	 * Sets the vector components from the given Euler angles.
	 *
	 * @param {Euler} e - The Euler angles to set.
	 * @return {Vector3} A reference to this vector.
	 */ setFromEuler(e) {
        this.x = e._x;
        this.y = e._y;
        this.z = e._z;
        return this;
    }
    /**
	 * Sets the vector components from the RGB components of the
	 * given color.
	 *
	 * @param {Color} c - The color to set.
	 * @return {Vector3} A reference to this vector.
	 */ setFromColor(c) {
        this.x = c.r;
        this.y = c.g;
        this.z = c.b;
        return this;
    }
    /**
	 * Returns `true` if this vector is equal with the given one.
	 *
	 * @param {Vector3} v - The vector to test for equality.
	 * @return {boolean} Whether this vector is equal with the given one.
	 */ equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    /**
	 * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
	 * and z value to be `array[ offset + 2 ]`.
	 *
	 * @param {Array<number>} array - An array holding the vector component values.
	 * @param {number} [offset=0] - The offset into the array.
	 * @return {Vector3} A reference to this vector.
	 */ fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }
    /**
	 * Writes the components of this vector to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the vector components.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The vector components.
	 */ toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    /**
	 * Sets the components of this vector from the given buffer attribute.
	 *
	 * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	 * @param {number} index - The index into the attribute.
	 * @return {Vector3} A reference to this vector.
	 */ fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }
    /**
	 * Sets each component of this vector to a pseudo-random value between `0` and
	 * `1`, excluding `1`.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }
    /**
	 * Sets this vector to a uniformly random point on a unit sphere.
	 *
	 * @return {Vector3} A reference to this vector.
	 */ randomDirection() {
        // https://mathworld.wolfram.com/SpherePointPicking.html
        const theta = Math.random() * Math.PI * 2;
        const u = Math.random() * 2 - 1;
        const c = Math.sqrt(1 - u * u);
        this.x = c * Math.cos(theta);
        this.y = u;
        this.z = c * Math.sin(theta);
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Quaternion$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Quaternion"]();
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix4.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Matrix4",
    ()=>Matrix4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector3.js [app-rsc] (ecmascript)");
;
;
/**
 * Represents a 4x4 matrix.
 *
 * The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix.
 * For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices)
 *
 * This allows a 3D vector representing a point in 3D space to undergo
 * transformations such as translation, rotation, shear, scale, reflection,
 * orthogonal or perspective projection and so on, by being multiplied by the
 * matrix. This is known as `applying` the matrix to the vector.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix3#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix4();
 * m.set( 11, 12, 13, 14,
 *        21, 22, 23, 24,
 *        31, 32, 33, 34,
 *        41, 42, 43, 44 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21, 31, 41,
 *                12, 22, 32, 42,
 *                13, 23, 33, 43,
 *                14, 24, 34, 44 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */ class Matrix4 {
    /**
	 * Constructs a new 4x4 matrix. The arguments are supposed to be
	 * in row-major order. If no arguments are provided, the constructor
	 * initializes the matrix as an identity matrix.
	 *
	 * @param {number} [n11] - 1-1 matrix element.
	 * @param {number} [n12] - 1-2 matrix element.
	 * @param {number} [n13] - 1-3 matrix element.
	 * @param {number} [n14] - 1-4 matrix element.
	 * @param {number} [n21] - 2-1 matrix element.
	 * @param {number} [n22] - 2-2 matrix element.
	 * @param {number} [n23] - 2-3 matrix element.
	 * @param {number} [n24] - 2-4 matrix element.
	 * @param {number} [n31] - 3-1 matrix element.
	 * @param {number} [n32] - 3-2 matrix element.
	 * @param {number} [n33] - 3-3 matrix element.
	 * @param {number} [n34] - 3-4 matrix element.
	 * @param {number} [n41] - 4-1 matrix element.
	 * @param {number} [n42] - 4-2 matrix element.
	 * @param {number} [n43] - 4-3 matrix element.
	 * @param {number} [n44] - 4-4 matrix element.
	 */ constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Matrix4.prototype.isMatrix4 = true;
        /**
		 * A column-major list of matrix values.
		 *
		 * @type {Array<number>}
		 */ this.elements = [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
        ];
        if (n11 !== undefined) {
            this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
        }
    }
    /**
	 * Sets the elements of the matrix.The arguments are supposed to be
	 * in row-major order.
	 *
	 * @param {number} [n11] - 1-1 matrix element.
	 * @param {number} [n12] - 1-2 matrix element.
	 * @param {number} [n13] - 1-3 matrix element.
	 * @param {number} [n14] - 1-4 matrix element.
	 * @param {number} [n21] - 2-1 matrix element.
	 * @param {number} [n22] - 2-2 matrix element.
	 * @param {number} [n23] - 2-3 matrix element.
	 * @param {number} [n24] - 2-4 matrix element.
	 * @param {number} [n31] - 3-1 matrix element.
	 * @param {number} [n32] - 3-2 matrix element.
	 * @param {number} [n33] - 3-3 matrix element.
	 * @param {number} [n34] - 3-4 matrix element.
	 * @param {number} [n41] - 4-1 matrix element.
	 * @param {number} [n42] - 4-2 matrix element.
	 * @param {number} [n43] - 4-3 matrix element.
	 * @param {number} [n44] - 4-4 matrix element.
	 * @return {Matrix4} A reference to this matrix.
	 */ set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        const te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    }
    /**
	 * Sets this matrix to the 4x4 identity matrix.
	 *
	 * @return {Matrix4} A reference to this matrix.
	 */ identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Returns a matrix with copied values from this instance.
	 *
	 * @return {Matrix4} A clone of this instance.
	 */ clone() {
        return new Matrix4().fromArray(this.elements);
    }
    /**
	 * Copies the values of the given matrix to this instance.
	 *
	 * @param {Matrix4} m - The matrix to copy.
	 * @return {Matrix4} A reference to this matrix.
	 */ copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        te[9] = me[9];
        te[10] = me[10];
        te[11] = me[11];
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        te[15] = me[15];
        return this;
    }
    /**
	 * Copies the translation component of the given matrix
	 * into this matrix's translation component.
	 *
	 * @param {Matrix4} m - The matrix to copy the translation component.
	 * @return {Matrix4} A reference to this matrix.
	 */ copyPosition(m) {
        const te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }
    /**
	 * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The 3x3 matrix.
	 * @return {Matrix4} A reference to this matrix.
	 */ setFromMatrix3(m) {
        const me = m.elements;
        this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Extracts the basis of this matrix into the three axis vectors provided.
	 *
	 * @param {Vector3} xAxis - The basis's x axis.
	 * @param {Vector3} yAxis - The basis's y axis.
	 * @param {Vector3} zAxis - The basis's z axis.
	 * @return {Matrix4} A reference to this matrix.
	 */ extractBasis(xAxis, yAxis, zAxis) {
        if (this.determinant() === 0) {
            xAxis.set(1, 0, 0);
            yAxis.set(0, 1, 0);
            zAxis.set(0, 0, 1);
            return this;
        }
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this;
    }
    /**
	 * Sets the given basis vectors to this matrix.
	 *
	 * @param {Vector3} xAxis - The basis's x axis.
	 * @param {Vector3} yAxis - The basis's y axis.
	 * @param {Vector3} zAxis - The basis's z axis.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeBasis(xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Extracts the rotation component of the given matrix
	 * into this matrix's rotation component.
	 *
	 * Note: This method does not support reflection matrices.
	 *
	 * @param {Matrix4} m - The matrix.
	 * @return {Matrix4} A reference to this matrix.
	 */ extractRotation(m) {
        if (m.determinant() === 0) {
            return this.identity();
        }
        const te = this.elements;
        const me = m.elements;
        const scaleX = 1 / _v1.setFromMatrixColumn(m, 0).length();
        const scaleY = 1 / _v1.setFromMatrixColumn(m, 1).length();
        const scaleZ = 1 / _v1.setFromMatrixColumn(m, 2).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[3] = 0;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[7] = 0;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    /**
	 * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
	 * the rotation specified by the given Euler angles. The rest of
	 * the matrix is set to the identity. Depending on the {@link Euler#order},
	 * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
	 * for a complete list.
	 *
	 * @param {Euler} euler - The Euler angles.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationFromEuler(euler) {
        const te = this.elements;
        const x = euler.x, y = euler.y, z = euler.z;
        const a = Math.cos(x), b = Math.sin(x);
        const c = Math.cos(y), d = Math.sin(y);
        const e = Math.cos(z), f = Math.sin(z);
        if (euler.order === 'XYZ') {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        } else if (euler.order === 'YXZ') {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        } else if (euler.order === 'ZXY') {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;
            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        } else if (euler.order === 'ZYX') {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;
            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        } else if (euler.order === 'YZX') {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        } else if (euler.order === 'XZY') {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;
            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }
        // bottom row
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        // last column
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    /**
	 * Sets the rotation component of this matrix to the rotation specified by
	 * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
	 * The rest of the matrix is set to the identity.
	 *
	 * @param {Quaternion} q - The Quaternion.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationFromQuaternion(q) {
        return this.compose(_zero, q, _one);
    }
    /**
	 * Sets the rotation component of the transformation matrix, looking from `eye` towards
	 * `target`, and oriented by the up-direction.
	 *
	 * @param {Vector3} eye - The eye vector.
	 * @param {Vector3} target - The target vector.
	 * @param {Vector3} up - The up vector.
	 * @return {Matrix4} A reference to this matrix.
	 */ lookAt(eye, target, up) {
        const te = this.elements;
        _z.subVectors(eye, target);
        if (_z.lengthSq() === 0) {
            // eye and target are in the same position
            _z.z = 1;
        }
        _z.normalize();
        _x.crossVectors(up, _z);
        if (_x.lengthSq() === 0) {
            // up and z are parallel
            if (Math.abs(up.z) === 1) {
                _z.x += 0.0001;
            } else {
                _z.z += 0.0001;
            }
            _z.normalize();
            _x.crossVectors(up, _z);
        }
        _x.normalize();
        _y.crossVectors(_z, _x);
        te[0] = _x.x;
        te[4] = _y.x;
        te[8] = _z.x;
        te[1] = _x.y;
        te[5] = _y.y;
        te[9] = _z.y;
        te[2] = _x.z;
        te[6] = _y.z;
        te[10] = _z.z;
        return this;
    }
    /**
	 * Post-multiplies this matrix by the given 4x4 matrix.
	 *
	 * @param {Matrix4} m - The matrix to multiply with.
	 * @return {Matrix4} A reference to this matrix.
	 */ multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    /**
	 * Pre-multiplies this matrix by the given 4x4 matrix.
	 *
	 * @param {Matrix4} m - The matrix to multiply with.
	 * @return {Matrix4} A reference to this matrix.
	 */ premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    /**
	 * Multiples the given 4x4 matrices and stores the result
	 * in this matrix.
	 *
	 * @param {Matrix4} a - The first matrix.
	 * @param {Matrix4} b - The second matrix.
	 * @return {Matrix4} A reference to this matrix.
	 */ multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
        const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this;
    }
    /**
	 * Multiplies every component of the matrix by the given scalar.
	 *
	 * @param {number} s - The scalar.
	 * @return {Matrix4} A reference to this matrix.
	 */ multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    }
    /**
	 * Computes and returns the determinant of this matrix.
	 *
	 * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
	 *
	 * @return {number} The determinant.
	 */ determinant() {
        const te = this.elements;
        const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        const t11 = n23 * n34 - n24 * n33;
        const t12 = n22 * n34 - n24 * n32;
        const t13 = n22 * n33 - n23 * n32;
        const t21 = n21 * n34 - n24 * n31;
        const t22 = n21 * n33 - n23 * n31;
        const t23 = n21 * n32 - n22 * n31;
        return n11 * (n42 * t11 - n43 * t12 + n44 * t13) - n12 * (n41 * t11 - n43 * t21 + n44 * t22) + n13 * (n41 * t12 - n42 * t21 + n44 * t23) - n14 * (n41 * t13 - n42 * t22 + n43 * t23);
    }
    /**
	 * Transposes this matrix in place.
	 *
	 * @return {Matrix4} A reference to this matrix.
	 */ transpose() {
        const te = this.elements;
        let tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    }
    /**
	 * Sets the position component for this matrix from the given vector,
	 * without affecting the rest of the matrix.
	 *
	 * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
	 * @param {number} y - The y component of the vector.
	 * @param {number} z - The z component of the vector.
	 * @return {Matrix4} A reference to this matrix.
	 */ setPosition(x, y, z) {
        const te = this.elements;
        if (x.isVector3) {
            te[12] = x.x;
            te[13] = x.y;
            te[14] = x.z;
        } else {
            te[12] = x;
            te[13] = y;
            te[14] = z;
        }
        return this;
    }
    /**
	 * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	 * You can not invert with a determinant of zero. If you attempt this, the method produces
	 * a zero matrix instead.
	 *
	 * @return {Matrix4} A reference to this matrix.
	 */ invert() {
        // based on https://github.com/toji/gl-matrix
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t1 = n11 * n22 - n21 * n12, t2 = n11 * n32 - n31 * n12, t3 = n11 * n42 - n41 * n12, t4 = n21 * n32 - n31 * n22, t5 = n21 * n42 - n41 * n22, t6 = n31 * n42 - n41 * n32, t7 = n13 * n24 - n23 * n14, t8 = n13 * n34 - n33 * n14, t9 = n13 * n44 - n43 * n14, t10 = n23 * n34 - n33 * n24, t11 = n23 * n44 - n43 * n24, t12 = n33 * n44 - n43 * n34;
        const det = t1 * t12 - t2 * t11 + t3 * t10 + t4 * t9 - t5 * t8 + t6 * t7;
        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = (n22 * t12 - n32 * t11 + n42 * t10) * detInv;
        te[1] = (n31 * t11 - n21 * t12 - n41 * t10) * detInv;
        te[2] = (n24 * t6 - n34 * t5 + n44 * t4) * detInv;
        te[3] = (n33 * t5 - n23 * t6 - n43 * t4) * detInv;
        te[4] = (n32 * t9 - n12 * t12 - n42 * t8) * detInv;
        te[5] = (n11 * t12 - n31 * t9 + n41 * t8) * detInv;
        te[6] = (n34 * t3 - n14 * t6 - n44 * t2) * detInv;
        te[7] = (n13 * t6 - n33 * t3 + n43 * t2) * detInv;
        te[8] = (n12 * t11 - n22 * t9 + n42 * t7) * detInv;
        te[9] = (n21 * t9 - n11 * t11 - n41 * t7) * detInv;
        te[10] = (n14 * t5 - n24 * t3 + n44 * t1) * detInv;
        te[11] = (n23 * t3 - n13 * t5 - n43 * t1) * detInv;
        te[12] = (n22 * t8 - n12 * t10 - n32 * t7) * detInv;
        te[13] = (n11 * t10 - n21 * t8 + n31 * t7) * detInv;
        te[14] = (n24 * t2 - n14 * t4 - n34 * t1) * detInv;
        te[15] = (n13 * t4 - n23 * t2 + n33 * t1) * detInv;
        return this;
    }
    /**
	 * Multiplies the columns of this matrix by the given vector.
	 *
	 * @param {Vector3} v - The scale vector.
	 * @return {Matrix4} A reference to this matrix.
	 */ scale(v) {
        const te = this.elements;
        const x = v.x, y = v.y, z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    }
    /**
	 * Gets the maximum scale value of the three axes.
	 *
	 * @return {number} The maximum scale.
	 */ getMaxScaleOnAxis() {
        const te = this.elements;
        const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
    /**
	 * Sets this matrix as a translation transform from the given vector.
	 *
	 * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
	 * @param {number} y - The amount to translate in the Y axis.
	 * @param {number} z - The amount to translate in the z axis.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeTranslation(x, y, z) {
        if (x.isVector3) {
            this.set(1, 0, 0, x.x, 0, 1, 0, x.y, 0, 0, 1, x.z, 0, 0, 0, 1);
        } else {
            this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        }
        return this;
    }
    /**
	 * Sets this matrix as a rotational transformation around the X axis by
	 * the given angle.
	 *
	 * @param {number} theta - The rotation in radians.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationX(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a rotational transformation around the Y axis by
	 * the given angle.
	 *
	 * @param {number} theta - The rotation in radians.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationY(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a rotational transformation around the Z axis by
	 * the given angle.
	 *
	 * @param {number} theta - The rotation in radians.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationZ(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a rotational transformation around the given axis by
	 * the given angle.
	 *
	 * This is a somewhat controversial but mathematically sound alternative to
	 * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
	 *
	 * @param {Vector3} axis - The normalized rotation axis.
	 * @param {number} angle - The rotation in radians.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeRotationAxis(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;
        const x = axis.x, y = axis.y, z = axis.z;
        const tx = t * x, ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a scale transformation.
	 *
	 * @param {number} x - The amount to scale in the X axis.
	 * @param {number} y - The amount to scale in the Y axis.
	 * @param {number} z - The amount to scale in the Z axis.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeScale(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix as a shear transformation.
	 *
	 * @param {number} xy - The amount to shear X by Y.
	 * @param {number} xz - The amount to shear X by Z.
	 * @param {number} yx - The amount to shear Y by X.
	 * @param {number} yz - The amount to shear Y by Z.
	 * @param {number} zx - The amount to shear Z by X.
	 * @param {number} zy - The amount to shear Z by Y.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeShear(xy, xz, yx, yz, zx, zy) {
        this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
        return this;
    }
    /**
	 * Sets this matrix to the transformation composed of the given position,
	 * rotation (Quaternion) and scale.
	 *
	 * @param {Vector3} position - The position vector.
	 * @param {Quaternion} quaternion - The rotation as a Quaternion.
	 * @param {Vector3} scale - The scale vector.
	 * @return {Matrix4} A reference to this matrix.
	 */ compose(position, quaternion, scale) {
        const te = this.elements;
        const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;
        const sx = scale.x, sy = scale.y, sz = scale.z;
        te[0] = (1 - (yy + zz)) * sx;
        te[1] = (xy + wz) * sx;
        te[2] = (xz - wy) * sx;
        te[3] = 0;
        te[4] = (xy - wz) * sy;
        te[5] = (1 - (xx + zz)) * sy;
        te[6] = (yz + wx) * sy;
        te[7] = 0;
        te[8] = (xz + wy) * sz;
        te[9] = (yz - wx) * sz;
        te[10] = (1 - (xx + yy)) * sz;
        te[11] = 0;
        te[12] = position.x;
        te[13] = position.y;
        te[14] = position.z;
        te[15] = 1;
        return this;
    }
    /**
	 * Decomposes this matrix into its position, rotation and scale components
	 * and provides the result in the given objects.
	 *
	 * Note: Not all matrices are decomposable in this way. For example, if an
	 * object has a non-uniformly scaled parent, then the object's world matrix
	 * may not be decomposable, and this method may not be appropriate.
	 *
	 * @param {Vector3} position - The position vector.
	 * @param {Quaternion} quaternion - The rotation as a Quaternion.
	 * @param {Vector3} scale - The scale vector.
	 * @return {Matrix4} A reference to this matrix.
	 */ decompose(position, quaternion, scale) {
        const te = this.elements;
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        const det = this.determinant();
        if (det === 0) {
            scale.set(1, 1, 1);
            quaternion.identity();
            return this;
        }
        let sx = _v1.set(te[0], te[1], te[2]).length();
        const sy = _v1.set(te[4], te[5], te[6]).length();
        const sz = _v1.set(te[8], te[9], te[10]).length();
        // if determinant is negative, we need to invert one scale
        if (det < 0) sx = -sx;
        // scale the rotation part
        _m1.copy(this);
        const invSX = 1 / sx;
        const invSY = 1 / sy;
        const invSZ = 1 / sz;
        _m1.elements[0] *= invSX;
        _m1.elements[1] *= invSX;
        _m1.elements[2] *= invSX;
        _m1.elements[4] *= invSY;
        _m1.elements[5] *= invSY;
        _m1.elements[6] *= invSY;
        _m1.elements[8] *= invSZ;
        _m1.elements[9] *= invSZ;
        _m1.elements[10] *= invSZ;
        quaternion.setFromRotationMatrix(_m1);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    }
    /**
	 * Creates a perspective projection matrix. This is used internally by
	 * {@link PerspectiveCamera#updateProjectionMatrix}.

	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
	 * @param {number} near - The distance from the camera to the near plane.
	 * @param {number} far - The distance from the camera to the far plane.
	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
	 * @return {Matrix4} A reference to this matrix.
	 */ makePerspective(left, right, top, bottom, near, far, coordinateSystem = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGLCoordinateSystem"], reversedDepth = false) {
        const te = this.elements;
        const x = 2 * near / (right - left);
        const y = 2 * near / (top - bottom);
        const a = (right + left) / (right - left);
        const b = (top + bottom) / (top - bottom);
        let c, d;
        if (reversedDepth) {
            c = near / (far - near);
            d = far * near / (far - near);
        } else {
            if (coordinateSystem === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGLCoordinateSystem"]) {
                c = -(far + near) / (far - near);
                d = -2 * far * near / (far - near);
            } else if (coordinateSystem === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGPUCoordinateSystem"]) {
                c = -far / (far - near);
                d = -far * near / (far - near);
            } else {
                throw new Error('THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + coordinateSystem);
            }
        }
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this;
    }
    /**
	 * Creates a orthographic projection matrix. This is used internally by
	 * {@link OrthographicCamera#updateProjectionMatrix}.

	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
	 * @param {number} near - The distance from the camera to the near plane.
	 * @param {number} far - The distance from the camera to the far plane.
	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
	 * @return {Matrix4} A reference to this matrix.
	 */ makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGLCoordinateSystem"], reversedDepth = false) {
        const te = this.elements;
        const x = 2 / (right - left);
        const y = 2 / (top - bottom);
        const a = -(right + left) / (right - left);
        const b = -(top + bottom) / (top - bottom);
        let c, d;
        if (reversedDepth) {
            c = 1 / (far - near);
            d = far / (far - near);
        } else {
            if (coordinateSystem === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGLCoordinateSystem"]) {
                c = -2 / (far - near);
                d = -(far + near) / (far - near);
            } else if (coordinateSystem === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGPUCoordinateSystem"]) {
                c = -1 / (far - near);
                d = -near / (far - near);
            } else {
                throw new Error('THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + coordinateSystem);
            }
        }
        te[0] = x;
        te[4] = 0;
        te[8] = 0;
        te[12] = a;
        te[1] = 0;
        te[5] = y;
        te[9] = 0;
        te[13] = b;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this;
    }
    /**
	 * Returns `true` if this matrix is equal with the given one.
	 *
	 * @param {Matrix4} matrix - The matrix to test for equality.
	 * @return {boolean} Whether this matrix is equal with the given one.
	 */ equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 16; i++){
            if (te[i] !== me[i]) return false;
        }
        return true;
    }
    /**
	 * Sets the elements of the matrix from the given array.
	 *
	 * @param {Array<number>} array - The matrix elements in column-major order.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Matrix4} A reference to this matrix.
	 */ fromArray(array, offset = 0) {
        for(let i = 0; i < 16; i++){
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    /**
	 * Writes the elements of this matrix to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The matrix elements in column-major order.
	 */ toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    }
}
const _v1 = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"]();
const _m1 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
const _one = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1);
const _x = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"]();
const _y = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"]();
const _z = /*@__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"]();
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector2.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Vector2",
    ()=>Vector2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
;
/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers
 * (labeled x and y), which can be used to represent a number of things, such as:
 *
 * - A point in 2D space (i.e. a position on a plane).
 * - A direction and length across a plane. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0)` to `(x, y)`
 * and the direction is also measured from `(0, 0)` towards `(x, y)`.
 * - Any arbitrary ordered pair of numbers.
 *
 * There are other things a 2D vector can be used to represent, such as
 * momentum vectors, complex numbers and so on, however these are the most
 * common uses in three.js.
 *
 * Iterating through a vector instance will yield its components `(x, y)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector2( 0, 1 );
 *
 * //no arguments; will be initialised to (0, 0)
 * const b = new THREE.Vector2( );
 *
 * const d = a.distanceTo( b );
 * ```
 */ class Vector2 {
    /**
	 * Constructs a new 2D vector.
	 *
	 * @param {number} [x=0] - The x value of this vector.
	 * @param {number} [y=0] - The y value of this vector.
	 */ constructor(x = 0, y = 0){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Vector2.prototype.isVector2 = true;
        /**
		 * The x value of this vector.
		 *
		 * @type {number}
		 */ this.x = x;
        /**
		 * The y value of this vector.
		 *
		 * @type {number}
		 */ this.y = y;
    }
    /**
	 * Alias for {@link Vector2#x}.
	 *
	 * @type {number}
	 */ get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    /**
	 * Alias for {@link Vector2#y}.
	 *
	 * @type {number}
	 */ get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    /**
	 * Sets the vector components.
	 *
	 * @param {number} x - The value of the x component.
	 * @param {number} y - The value of the y component.
	 * @return {Vector2} A reference to this vector.
	 */ set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
	 * Sets the vector components to the same value.
	 *
	 * @param {number} scalar - The value to set for all vector components.
	 * @return {Vector2} A reference to this vector.
	 */ setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        return this;
    }
    /**
	 * Sets the vector's x component to the given value
	 *
	 * @param {number} x - The value to set.
	 * @return {Vector2} A reference to this vector.
	 */ setX(x) {
        this.x = x;
        return this;
    }
    /**
	 * Sets the vector's y component to the given value
	 *
	 * @param {number} y - The value to set.
	 * @return {Vector2} A reference to this vector.
	 */ setY(y) {
        this.y = y;
        return this;
    }
    /**
	 * Allows to set a vector component with an index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y.
	 * @param {number} value - The value to set.
	 * @return {Vector2} A reference to this vector.
	 */ setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    /**
	 * Returns the value of the vector component which matches the given index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y.
	 * @return {number} A vector component value.
	 */ getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    /**
	 * Returns a new vector with copied values from this instance.
	 *
	 * @return {Vector2} A clone of this instance.
	 */ clone() {
        return new this.constructor(this.x, this.y);
    }
    /**
	 * Copies the values of the given vector to this instance.
	 *
	 * @param {Vector2} v - The vector to copy.
	 * @return {Vector2} A reference to this vector.
	 */ copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    /**
	 * Adds the given vector to this instance.
	 *
	 * @param {Vector2} v - The vector to add.
	 * @return {Vector2} A reference to this vector.
	 */ add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
	 * Adds the given scalar value to all components of this instance.
	 *
	 * @param {number} s - The scalar to add.
	 * @return {Vector2} A reference to this vector.
	 */ addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }
    /**
	 * Adds the given vectors and stores the result in this instance.
	 *
	 * @param {Vector2} a - The first vector.
	 * @param {Vector2} b - The second vector.
	 * @return {Vector2} A reference to this vector.
	 */ addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }
    /**
	 * Adds the given vector scaled by the given factor to this instance.
	 *
	 * @param {Vector2} v - The vector.
	 * @param {number} s - The factor that scales `v`.
	 * @return {Vector2} A reference to this vector.
	 */ addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }
    /**
	 * Subtracts the given vector from this instance.
	 *
	 * @param {Vector2} v - The vector to subtract.
	 * @return {Vector2} A reference to this vector.
	 */ sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
	 * Subtracts the given scalar value from all components of this instance.
	 *
	 * @param {number} s - The scalar to subtract.
	 * @return {Vector2} A reference to this vector.
	 */ subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    /**
	 * Subtracts the given vectors and stores the result in this instance.
	 *
	 * @param {Vector2} a - The first vector.
	 * @param {Vector2} b - The second vector.
	 * @return {Vector2} A reference to this vector.
	 */ subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }
    /**
	 * Multiplies the given vector with this instance.
	 *
	 * @param {Vector2} v - The vector to multiply.
	 * @return {Vector2} A reference to this vector.
	 */ multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
	 * Multiplies the given scalar value with all components of this instance.
	 *
	 * @param {number} scalar - The scalar to multiply.
	 * @return {Vector2} A reference to this vector.
	 */ multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /**
	 * Divides this instance by the given vector.
	 *
	 * @param {Vector2} v - The vector to divide.
	 * @return {Vector2} A reference to this vector.
	 */ divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
	 * Divides this vector by the given scalar.
	 *
	 * @param {number} scalar - The scalar to divide.
	 * @return {Vector2} A reference to this vector.
	 */ divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    /**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by
	 * the given 3x3 matrix.
	 *
	 * @param {Matrix3} m - The matrix to apply.
	 * @return {Vector2} A reference to this vector.
	 */ applyMatrix3(m) {
        const x = this.x, y = this.y;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }
    /**
	 * If this vector's x or y value is greater than the given vector's x or y
	 * value, replace that value with the corresponding min value.
	 *
	 * @param {Vector2} v - The vector.
	 * @return {Vector2} A reference to this vector.
	 */ min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    /**
	 * If this vector's x or y value is less than the given vector's x or y
	 * value, replace that value with the corresponding max value.
	 *
	 * @param {Vector2} v - The vector.
	 * @return {Vector2} A reference to this vector.
	 */ max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    /**
	 * If this vector's x or y value is greater than the max vector's x or y
	 * value, it is replaced by the corresponding value.
	 * If this vector's x or y value is less than the min vector's x or y value,
	 * it is replaced by the corresponding value.
	 *
	 * @param {Vector2} min - The minimum x and y values.
	 * @param {Vector2} max - The maximum x and y values in the desired range.
	 * @return {Vector2} A reference to this vector.
	 */ clamp(min, max) {
        // assumes min < max, componentwise
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, min.x, max.x);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, min.y, max.y);
        return this;
    }
    /**
	 * If this vector's x or y values are greater than the max value, they are
	 * replaced by the max value.
	 * If this vector's x or y values are less than the min value, they are
	 * replaced by the min value.
	 *
	 * @param {number} minVal - The minimum value the components will be clamped to.
	 * @param {number} maxVal - The maximum value the components will be clamped to.
	 * @return {Vector2} A reference to this vector.
	 */ clampScalar(minVal, maxVal) {
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, minVal, maxVal);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, minVal, maxVal);
        return this;
    }
    /**
	 * If this vector's length is greater than the max value, it is replaced by
	 * the max value.
	 * If this vector's length is less than the min value, it is replaced by the
	 * min value.
	 *
	 * @param {number} min - The minimum value the vector length will be clamped to.
	 * @param {number} max - The maximum value the vector length will be clamped to.
	 * @return {Vector2} A reference to this vector.
	 */ clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(length, min, max));
    }
    /**
	 * The components of this vector are rounded down to the nearest integer value.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    /**
	 * The components of this vector are rounded up to the nearest integer value.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    /**
	 * The components of this vector are rounded to the nearest integer value
	 *
	 * @return {Vector2} A reference to this vector.
	 */ round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    /**
	 * The components of this vector are rounded towards zero (up if negative,
	 * down if positive) to an integer value.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        return this;
    }
    /**
	 * Inverts this vector - i.e. sets x = -x and y = -y.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
	 * Calculates the dot product of the given vector with this instance.
	 *
	 * @param {Vector2} v - The vector to compute the dot product with.
	 * @return {number} The result of the dot product.
	 */ dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    /**
	 * Calculates the cross product of the given vector with this instance.
	 *
	 * @param {Vector2} v - The vector to compute the cross product with.
	 * @return {number} The result of the cross product.
	 */ cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    /**
	 * Computes the square of the Euclidean length (straight-line length) from
	 * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
	 * compare the length squared instead as it is slightly more efficient to calculate.
	 *
	 * @return {number} The square length of this vector.
	 */ lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    /**
	 * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
	 *
	 * @return {number} The length of this vector.
	 */ length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number} The length of this vector.
	 */ manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    /**
	 * Converts this vector to a unit vector - that is, sets it equal to a vector
	 * with the same direction as this one, but with a vector length of `1`.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ normalize() {
        return this.divideScalar(this.length() || 1);
    }
    /**
	 * Computes the angle in radians of this vector with respect to the positive x-axis.
	 *
	 * @return {number} The angle in radians.
	 */ angle() {
        const angle = Math.atan2(-this.y, -this.x) + Math.PI;
        return angle;
    }
    /**
	 * Returns the angle between the given vector and this instance in radians.
	 *
	 * @param {Vector2} v - The vector to compute the angle with.
	 * @return {number} The angle in radians.
	 */ angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        // clamp, to handle numerical problems
        return Math.acos((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(theta, -1, 1));
    }
    /**
	 * Computes the distance from the given vector to this instance.
	 *
	 * @param {Vector2} v - The vector to compute the distance to.
	 * @return {number} The distance.
	 */ distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    /**
	 * Computes the squared distance from the given vector to this instance.
	 * If you are just comparing the distance with another distance, you should compare
	 * the distance squared instead as it is slightly more efficient to calculate.
	 *
	 * @param {Vector2} v - The vector to compute the squared distance to.
	 * @return {number} The squared distance.
	 */ distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    /**
	 * Computes the Manhattan distance from the given vector to this instance.
	 *
	 * @param {Vector2} v - The vector to compute the Manhattan distance to.
	 * @return {number} The Manhattan distance.
	 */ manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
    /**
	 * Sets this vector to a vector with the same direction as this one, but
	 * with the specified length.
	 *
	 * @param {number} length - The new length of this vector.
	 * @return {Vector2} A reference to this vector.
	 */ setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    /**
	 * Linearly interpolates between the given vector and this instance, where
	 * alpha is the percent distance along the line - alpha = 0 will be this
	 * vector, and alpha = 1 will be the given one.
	 *
	 * @param {Vector2} v - The vector to interpolate towards.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector2} A reference to this vector.
	 */ lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    /**
	 * Linearly interpolates between the given vectors, where alpha is the percent
	 * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	 * be the second one. The result is stored in this instance.
	 *
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector2} A reference to this vector.
	 */ lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        return this;
    }
    /**
	 * Returns `true` if this vector is equal with the given one.
	 *
	 * @param {Vector2} v - The vector to test for equality.
	 * @return {boolean} Whether this vector is equal with the given one.
	 */ equals(v) {
        return v.x === this.x && v.y === this.y;
    }
    /**
	 * Sets this vector's x value to be `array[ offset ]` and y
	 * value to be `array[ offset + 1 ]`.
	 *
	 * @param {Array<number>} array - An array holding the vector component values.
	 * @param {number} [offset=0] - The offset into the array.
	 * @return {Vector2} A reference to this vector.
	 */ fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }
    /**
	 * Writes the components of this vector to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the vector components.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The vector components.
	 */ toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    /**
	 * Sets the components of this vector from the given buffer attribute.
	 *
	 * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	 * @param {number} index - The index into the attribute.
	 * @return {Vector2} A reference to this vector.
	 */ fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }
    /**
	 * Rotates this vector around the given center by the given angle.
	 *
	 * @param {Vector2} center - The point around which to rotate.
	 * @param {number} angle - The angle to rotate, in radians.
	 * @return {Vector2} A reference to this vector.
	 */ rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    /**
	 * Sets each component of this vector to a pseudo-random value between `0` and
	 * `1`, excluding `1`.
	 *
	 * @return {Vector2} A reference to this vector.
	 */ random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector4.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Vector4",
    ()=>Vector4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
;
/**
 * Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers
 * (labeled x, y, z and w), which can be used to represent a number of things, such as:
 *
 * - A point in 4D space.
 * - A direction and length in 4D space. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0, 0, 0)` to `(x, y, z, w)`
 * and the direction is also measured from `(0, 0, 0, 0)` towards `(x, y, z, w)`.
 * - Any arbitrary ordered quadruplet of numbers.
 *
 * There are other things a 4D vector can be used to represent, however these
 * are the most common uses in *three.js*.
 *
 * Iterating through a vector instance will yield its components `(x, y, z, w)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector4( 0, 1, 0, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0, 1)
 * const b = new THREE.Vector4( );
 *
 * const d = a.dot( b );
 * ```
 */ class Vector4 {
    /**
	 * Constructs a new 4D vector.
	 *
	 * @param {number} [x=0] - The x value of this vector.
	 * @param {number} [y=0] - The y value of this vector.
	 * @param {number} [z=0] - The z value of this vector.
	 * @param {number} [w=1] - The w value of this vector.
	 */ constructor(x = 0, y = 0, z = 0, w = 1){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ Vector4.prototype.isVector4 = true;
        /**
		 * The x value of this vector.
		 *
		 * @type {number}
		 */ this.x = x;
        /**
		 * The y value of this vector.
		 *
		 * @type {number}
		 */ this.y = y;
        /**
		 * The z value of this vector.
		 *
		 * @type {number}
		 */ this.z = z;
        /**
		 * The w value of this vector.
		 *
		 * @type {number}
		 */ this.w = w;
    }
    /**
	 * Alias for {@link Vector4#z}.
	 *
	 * @type {number}
	 */ get width() {
        return this.z;
    }
    set width(value) {
        this.z = value;
    }
    /**
	 * Alias for {@link Vector4#w}.
	 *
	 * @type {number}
	 */ get height() {
        return this.w;
    }
    set height(value) {
        this.w = value;
    }
    /**
	 * Sets the vector components.
	 *
	 * @param {number} x - The value of the x component.
	 * @param {number} y - The value of the y component.
	 * @param {number} z - The value of the z component.
	 * @param {number} w - The value of the w component.
	 * @return {Vector4} A reference to this vector.
	 */ set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    /**
	 * Sets the vector components to the same value.
	 *
	 * @param {number} scalar - The value to set for all vector components.
	 * @return {Vector4} A reference to this vector.
	 */ setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
        return this;
    }
    /**
	 * Sets the vector's x component to the given value
	 *
	 * @param {number} x - The value to set.
	 * @return {Vector4} A reference to this vector.
	 */ setX(x) {
        this.x = x;
        return this;
    }
    /**
	 * Sets the vector's y component to the given value
	 *
	 * @param {number} y - The value to set.
	 * @return {Vector4} A reference to this vector.
	 */ setY(y) {
        this.y = y;
        return this;
    }
    /**
	 * Sets the vector's z component to the given value
	 *
	 * @param {number} z - The value to set.
	 * @return {Vector4} A reference to this vector.
	 */ setZ(z) {
        this.z = z;
        return this;
    }
    /**
	 * Sets the vector's w component to the given value
	 *
	 * @param {number} w - The value to set.
	 * @return {Vector4} A reference to this vector.
	 */ setW(w) {
        this.w = w;
        return this;
    }
    /**
	 * Allows to set a vector component with an index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y,
	 * `2` equals to z, `3` equals to w.
	 * @param {number} value - The value to set.
	 * @return {Vector4} A reference to this vector.
	 */ setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.w = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    /**
	 * Returns the value of the vector component which matches the given index.
	 *
	 * @param {number} index - The component index. `0` equals to x, `1` equals to y,
	 * `2` equals to z, `3` equals to w.
	 * @return {number} A vector component value.
	 */ getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    /**
	 * Returns a new vector with copied values from this instance.
	 *
	 * @return {Vector4} A clone of this instance.
	 */ clone() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }
    /**
	 * Copies the values of the given vector to this instance.
	 *
	 * @param {Vector3|Vector4} v - The vector to copy.
	 * @return {Vector4} A reference to this vector.
	 */ copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w !== undefined ? v.w : 1;
        return this;
    }
    /**
	 * Adds the given vector to this instance.
	 *
	 * @param {Vector4} v - The vector to add.
	 * @return {Vector4} A reference to this vector.
	 */ add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }
    /**
	 * Adds the given scalar value to all components of this instance.
	 *
	 * @param {number} s - The scalar to add.
	 * @return {Vector4} A reference to this vector.
	 */ addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;
        return this;
    }
    /**
	 * Adds the given vectors and stores the result in this instance.
	 *
	 * @param {Vector4} a - The first vector.
	 * @param {Vector4} b - The second vector.
	 * @return {Vector4} A reference to this vector.
	 */ addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this;
    }
    /**
	 * Adds the given vector scaled by the given factor to this instance.
	 *
	 * @param {Vector4} v - The vector.
	 * @param {number} s - The factor that scales `v`.
	 * @return {Vector4} A reference to this vector.
	 */ addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        this.w += v.w * s;
        return this;
    }
    /**
	 * Subtracts the given vector from this instance.
	 *
	 * @param {Vector4} v - The vector to subtract.
	 * @return {Vector4} A reference to this vector.
	 */ sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }
    /**
	 * Subtracts the given scalar value from all components of this instance.
	 *
	 * @param {number} s - The scalar to subtract.
	 * @return {Vector4} A reference to this vector.
	 */ subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;
        return this;
    }
    /**
	 * Subtracts the given vectors and stores the result in this instance.
	 *
	 * @param {Vector4} a - The first vector.
	 * @param {Vector4} b - The second vector.
	 * @return {Vector4} A reference to this vector.
	 */ subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this;
    }
    /**
	 * Multiplies the given vector with this instance.
	 *
	 * @param {Vector4} v - The vector to multiply.
	 * @return {Vector4} A reference to this vector.
	 */ multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }
    /**
	 * Multiplies the given scalar value with all components of this instance.
	 *
	 * @param {number} scalar - The scalar to multiply.
	 * @return {Vector4} A reference to this vector.
	 */ multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    /**
	 * Multiplies this vector with the given 4x4 matrix.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @return {Vector4} A reference to this vector.
	 */ applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        return this;
    }
    /**
	 * Divides this instance by the given vector.
	 *
	 * @param {Vector4} v - The vector to divide.
	 * @return {Vector4} A reference to this vector.
	 */ divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;
    }
    /**
	 * Divides this vector by the given scalar.
	 *
	 * @param {number} scalar - The scalar to divide.
	 * @return {Vector4} A reference to this vector.
	 */ divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    /**
	 * Sets the x, y and z components of this
	 * vector to the quaternion's axis and w to the angle.
	 *
	 * @param {Quaternion} q - The Quaternion to set.
	 * @return {Vector4} A reference to this vector.
	 */ setAxisAngleFromQuaternion(q) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
        // q is assumed to be normalized
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }
        return this;
    }
    /**
	 * Sets the x, y and z components of this
	 * vector to the axis of rotation and w to the angle.
	 *
	 * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
	 * @return {Vector4} A reference to this vector.
	 */ setAxisAngleFromRotationMatrix(m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        let angle, x, y, z; // variables for result
        const epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
        if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
            // singularity found
            // first check for identity matrix which must have +1 for all terms
            // in leading diagonal and zero in other terms
            if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
                // this singularity is identity matrix so angle = 0
                this.set(1, 0, 0, 0);
                return this; // zero angle, arbitrary axis
            }
            // otherwise this singularity is angle = 180
            angle = Math.PI;
            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;
            if (xx > yy && xx > zz) {
                // m11 is the largest diagonal term
                if (xx < epsilon) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                } else {
                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            } else if (yy > zz) {
                // m22 is the largest diagonal term
                if (yy < epsilon) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                } else {
                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            } else {
                // m33 is the largest diagonal term so base result on this
                if (zz < epsilon) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                } else {
                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }
            this.set(x, y, z, angle);
            return this; // return 180 deg rotation
        }
        // as we have reached here there are no singularities so we can handle normally
        let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize
        if (Math.abs(s) < 0.001) s = 1;
        // prevent divide by zero, should not happen if matrix is orthogonal and should be
        // caught by singularity test above, but I've left it in just in case
        this.x = (m32 - m23) / s;
        this.y = (m13 - m31) / s;
        this.z = (m21 - m12) / s;
        this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
        return this;
    }
    /**
	 * Sets the vector components to the position elements of the
	 * given transformation matrix.
	 *
	 * @param {Matrix4} m - The 4x4 matrix.
	 * @return {Vector4} A reference to this vector.
	 */ setFromMatrixPosition(m) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        this.w = e[15];
        return this;
    }
    /**
	 * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
	 * value, replace that value with the corresponding min value.
	 *
	 * @param {Vector4} v - The vector.
	 * @return {Vector4} A reference to this vector.
	 */ min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }
    /**
	 * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
	 * value, replace that value with the corresponding max value.
	 *
	 * @param {Vector4} v - The vector.
	 * @return {Vector4} A reference to this vector.
	 */ max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }
    /**
	 * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
	 * value, it is replaced by the corresponding value.
	 * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
	 * it is replaced by the corresponding value.
	 *
	 * @param {Vector4} min - The minimum x, y and z values.
	 * @param {Vector4} max - The maximum x, y and z values in the desired range.
	 * @return {Vector4} A reference to this vector.
	 */ clamp(min, max) {
        // assumes min < max, componentwise
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, min.x, max.x);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, min.y, max.y);
        this.z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.z, min.z, max.z);
        this.w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.w, min.w, max.w);
        return this;
    }
    /**
	 * If this vector's x, y, z or w values are greater than the max value, they are
	 * replaced by the max value.
	 * If this vector's x, y, z or w values are less than the min value, they are
	 * replaced by the min value.
	 *
	 * @param {number} minVal - The minimum value the components will be clamped to.
	 * @param {number} maxVal - The maximum value the components will be clamped to.
	 * @return {Vector4} A reference to this vector.
	 */ clampScalar(minVal, maxVal) {
        this.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.x, minVal, maxVal);
        this.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.y, minVal, maxVal);
        this.z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.z, minVal, maxVal);
        this.w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(this.w, minVal, maxVal);
        return this;
    }
    /**
	 * If this vector's length is greater than the max value, it is replaced by
	 * the max value.
	 * If this vector's length is less than the min value, it is replaced by the
	 * min value.
	 *
	 * @param {number} min - The minimum value the vector length will be clamped to.
	 * @param {number} max - The maximum value the vector length will be clamped to.
	 * @return {Vector4} A reference to this vector.
	 */ clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clamp"])(length, min, max));
    }
    /**
	 * The components of this vector are rounded down to the nearest integer value.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }
    /**
	 * The components of this vector are rounded up to the nearest integer value.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }
    /**
	 * The components of this vector are rounded to the nearest integer value
	 *
	 * @return {Vector4} A reference to this vector.
	 */ round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }
    /**
	 * The components of this vector are rounded towards zero (up if negative,
	 * down if positive) to an integer value.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        this.w = Math.trunc(this.w);
        return this;
    }
    /**
	 * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    /**
	 * Calculates the dot product of the given vector with this instance.
	 *
	 * @param {Vector4} v - The vector to compute the dot product with.
	 * @return {number} The result of the dot product.
	 */ dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    /**
	 * Computes the square of the Euclidean length (straight-line length) from
	 * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
	 * compare the length squared instead as it is slightly more efficient to calculate.
	 *
	 * @return {number} The square length of this vector.
	 */ lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    /**
	 * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
	 *
	 * @return {number} The length of this vector.
	 */ length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    /**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number} The length of this vector.
	 */ manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    /**
	 * Converts this vector to a unit vector - that is, sets it equal to a vector
	 * with the same direction as this one, but with a vector length of `1`.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ normalize() {
        return this.divideScalar(this.length() || 1);
    }
    /**
	 * Sets this vector to a vector with the same direction as this one, but
	 * with the specified length.
	 *
	 * @param {number} length - The new length of this vector.
	 * @return {Vector4} A reference to this vector.
	 */ setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    /**
	 * Linearly interpolates between the given vector and this instance, where
	 * alpha is the percent distance along the line - alpha = 0 will be this
	 * vector, and alpha = 1 will be the given one.
	 *
	 * @param {Vector4} v - The vector to interpolate towards.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector4} A reference to this vector.
	 */ lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    }
    /**
	 * Linearly interpolates between the given vectors, where alpha is the percent
	 * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
	 * be the second one. The result is stored in this instance.
	 *
	 * @param {Vector4} v1 - The first vector.
	 * @param {Vector4} v2 - The second vector.
	 * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
	 * @return {Vector4} A reference to this vector.
	 */ lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        this.w = v1.w + (v2.w - v1.w) * alpha;
        return this;
    }
    /**
	 * Returns `true` if this vector is equal with the given one.
	 *
	 * @param {Vector4} v - The vector to test for equality.
	 * @return {boolean} Whether this vector is equal with the given one.
	 */ equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
    /**
	 * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
	 * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
	 *
	 * @param {Array<number>} array - An array holding the vector component values.
	 * @param {number} [offset=0] - The offset into the array.
	 * @return {Vector4} A reference to this vector.
	 */ fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }
    /**
	 * Writes the components of this vector to the given array. If no array is provided,
	 * the method returns a new instance.
	 *
	 * @param {Array<number>} [array=[]] - The target array holding the vector components.
	 * @param {number} [offset=0] - Index of the first element in the array.
	 * @return {Array<number>} The vector components.
	 */ toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }
    /**
	 * Sets the components of this vector from the given buffer attribute.
	 *
	 * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
	 * @param {number} index - The index into the attribute.
	 * @return {Vector4} A reference to this vector.
	 */ fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        this.w = attribute.getW(index);
        return this;
    }
    /**
	 * Sets each component of this vector to a pseudo-random value between `0` and
	 * `1`, excluding `1`.
	 *
	 * @return {Vector4} A reference to this vector.
	 */ random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/StackTrace.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Pre-compiled RegExp patterns for ignored files
const IGNORED_FILES = [
    /^StackTrace\.js$/,
    /^TSLCore\.js$/,
    /^.*Node\.js$/,
    /^three\.webgpu.*\.js$/
];
/**
 * Parses the stack trace and filters out ignored files.
 * Returns an array with function name, file, line, and column.
 */ function getFilteredStack(stack) {
    // Pattern to extract function name, file, line, and column from different browsers
    // Chrome: "at functionName (file.js:1:2)" or "at file.js:1:2"
    // Firefox: "functionName@file.js:1:2"
    const regex = /(?:at\s+(.+?)\s+\()?(?:(.+?)@)?([^@\s()]+):(\d+):(\d+)/;
    return stack.split('\n').map((line)=>{
        const match = line.match(regex);
        if (!match) return null; // Skip if line format is invalid
        // Chrome: match[1], Firefox: match[2]
        const fn = match[1] || match[2] || '';
        const file = match[3].split('?')[0]; // Clean file name (Vite/HMR)
        const lineNum = parseInt(match[4], 10);
        const column = parseInt(match[5], 10);
        // Extract only the filename from full path
        const fileName = file.split('/').pop();
        return {
            fn: fn,
            file: fileName,
            line: lineNum,
            column: column
        };
    }).filter((frame)=>{
        // Only keep frames that are valid and not in the ignore list
        return frame && !IGNORED_FILES.some((regex)=>regex.test(frame.file));
    });
}
/**
 * Class representing a stack trace for debugging purposes.
 */ class StackTrace {
    /**
	 * Creates a StackTrace instance by capturing and filtering the current stack trace.
	 *
	 * @param {Error|string|null} stackMessage - An optional stack trace to use instead of capturing a new one.
	 */ constructor(stackMessage = null){
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isStackTrace = true;
        /**
		 * The stack trace.
		 *
		 * @type {Array<{fn: string, file: string, line: number, column: number}>}
		 */ this.stack = getFilteredStack(stackMessage ? stackMessage : new Error().stack);
    }
    /**
	 * Returns a formatted location string of the top stack frame.
	 *
	 * @returns {string} The formatted stack trace message.
	 */ getLocation() {
        if (this.stack.length === 0) {
            return '[Unknown location]';
        }
        const mainStack = this.stack[0];
        const fn = mainStack.fn;
        const fnName = fn ? `"${fn}()" at ` : '';
        return `${fnName}"${mainStack.file}:${mainStack.line}"`; // :${mainStack.column}
    }
    /**
	 * Returns the full error message including the stack trace.
	 *
	 * @param {string} message - The error message.
	 * @returns {string} The full error message with stack trace.
	 */ getError(message) {
        if (this.stack.length === 0) {
            return message;
        }
        // Output: "Error: message\n    at functionName (file.js:line:column)"
        const stackString = this.stack.map((frame)=>{
            const location = `${frame.file}:${frame.line}:${frame.column}`;
            if (frame.fn) {
                return `    at ${frame.fn} (${location})`;
            }
            return `    at ${location}`;
        }).join('\n');
        return `${message}\n${stackString}`;
    }
}
const __TURBOPACK__default__export__ = StackTrace;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/NodeUtils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrayBufferToBase64",
    ()=>arrayBufferToBase64,
    "base64ToArrayBuffer",
    ()=>base64ToArrayBuffer,
    "getAlignmentFromType",
    ()=>getAlignmentFromType,
    "getDataFromObject",
    ()=>getDataFromObject,
    "getLengthFromType",
    ()=>getLengthFromType,
    "getMemoryLengthFromType",
    ()=>getMemoryLengthFromType,
    "getTypeFromLength",
    ()=>getTypeFromLength,
    "getTypedArrayFromType",
    ()=>getTypedArrayFromType,
    "getValueFromType",
    ()=>getValueFromType,
    "getValueType",
    ()=>getValueType,
    "hash",
    ()=>hash,
    "hashArray",
    ()=>hashArray,
    "hashString",
    ()=>hashString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Color$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Color.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix2.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix3.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Matrix4.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector2.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector3.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/Vector4.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/StackTrace.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
// cyrb53 (c) 2018 bryc (github.com/bryc). License: Public domain. Attribution appreciated.
// A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
// Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
// See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
// https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
function cyrb53(value, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    if (value instanceof Array) {
        for(let i = 0, val; i < value.length; i++){
            val = value[i];
            h1 = Math.imul(h1 ^ val, 2654435761);
            h2 = Math.imul(h2 ^ val, 1597334677);
        }
    } else {
        for(let i = 0, ch; i < value.length; i++){
            ch = value.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
    h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
    h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
const hashString = (str)=>cyrb53(str);
const hashArray = (array)=>cyrb53(array);
const hash = (...params)=>cyrb53(params);
const typeFromLength = /*@__PURE__*/ new Map([
    [
        1,
        'float'
    ],
    [
        2,
        'vec2'
    ],
    [
        3,
        'vec3'
    ],
    [
        4,
        'vec4'
    ],
    [
        9,
        'mat3'
    ],
    [
        16,
        'mat4'
    ]
]);
const dataFromObject = /*@__PURE__*/ new WeakMap();
function getTypeFromLength(length) {
    return typeFromLength.get(length);
}
function getTypedArrayFromType(type) {
    // Handle component type for vectors and matrices
    if (/[iu]?vec\d/.test(type)) {
        // Handle int vectors
        if (type.startsWith('ivec')) return Int32Array;
        // Handle uint vectors
        if (type.startsWith('uvec')) return Uint32Array;
        // Default to float vectors
        return Float32Array;
    }
    // Handle matrices (always float)
    if (/mat\d/.test(type)) return Float32Array;
    // Basic types
    if (/float/.test(type)) return Float32Array;
    if (/uint/.test(type)) return Uint32Array;
    if (/int/.test(type)) return Int32Array;
    throw new Error(`THREE.NodeUtils: Unsupported type: ${type}`);
}
function getLengthFromType(type) {
    if (/float|int|uint/.test(type)) return 1;
    if (/vec2/.test(type)) return 2;
    if (/vec3/.test(type)) return 3;
    if (/vec4/.test(type)) return 4;
    if (/mat2/.test(type)) return 4;
    if (/mat3/.test(type)) return 9;
    if (/mat4/.test(type)) return 16;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Unsupported type: ${type}`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
}
function getMemoryLengthFromType(type) {
    if (/float|int|uint/.test(type)) return 1;
    if (/vec2/.test(type)) return 2;
    if (/vec3/.test(type)) return 3;
    if (/vec4/.test(type)) return 4;
    if (/mat2/.test(type)) return 4;
    if (/mat3/.test(type)) return 12;
    if (/mat4/.test(type)) return 16;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Unsupported type: ${type}`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
}
function getAlignmentFromType(type) {
    if (/float|int|uint/.test(type)) return 4;
    if (/vec2/.test(type)) return 8;
    if (/vec3/.test(type)) return 16;
    if (/vec4/.test(type)) return 16;
    if (/mat2/.test(type)) return 8;
    if (/mat3/.test(type)) return 16;
    if (/mat4/.test(type)) return 16;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Unsupported type: ${type}`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
}
function getValueType(value) {
    if (value === undefined || value === null) return null;
    const typeOf = typeof value;
    if (value.isNode === true) {
        return 'node';
    } else if (typeOf === 'number') {
        return 'float';
    } else if (typeOf === 'boolean') {
        return 'bool';
    } else if (typeOf === 'string') {
        return 'string';
    } else if (typeOf === 'function') {
        return 'shader';
    } else if (value.isVector2 === true) {
        return 'vec2';
    } else if (value.isVector3 === true) {
        return 'vec3';
    } else if (value.isVector4 === true) {
        return 'vec4';
    } else if (value.isMatrix2 === true) {
        return 'mat2';
    } else if (value.isMatrix3 === true) {
        return 'mat3';
    } else if (value.isMatrix4 === true) {
        return 'mat4';
    } else if (value.isColor === true) {
        return 'color';
    } else if (value instanceof ArrayBuffer) {
        return 'ArrayBuffer';
    }
    return null;
}
function getValueFromType(type, ...params) {
    const last4 = type ? type.slice(-4) : undefined;
    if (params.length === 1) {
        if (last4 === 'vec2') params = [
            params[0],
            params[0]
        ];
        else if (last4 === 'vec3') params = [
            params[0],
            params[0],
            params[0]
        ];
        else if (last4 === 'vec4') params = [
            params[0],
            params[0],
            params[0],
            params[0]
        ];
    }
    if (type === 'color') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Color$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Color"](...params);
    } else if (last4 === 'vec2') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector2"](...params);
    } else if (last4 === 'vec3') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector3"](...params);
    } else if (last4 === 'vec4') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Vector4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Vector4"](...params);
    } else if (last4 === 'mat2') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Matrix2"](...params);
    } else if (last4 === 'mat3') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix3$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Matrix3"](...params);
    } else if (last4 === 'mat4') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$Matrix4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Matrix4"](...params);
    } else if (type === 'bool') {
        return params[0] || false;
    } else if (type === 'float' || type === 'int' || type === 'uint') {
        return params[0] || 0;
    } else if (type === 'string') {
        return params[0] || '';
    } else if (type === 'ArrayBuffer') {
        return base64ToArrayBuffer(params[0]);
    }
    return null;
}
function getDataFromObject(object) {
    let data = dataFromObject.get(object);
    if (data === undefined) {
        data = {};
        dataFromObject.set(object, data);
    }
    return data;
}
function arrayBufferToBase64(arrayBuffer) {
    let chars = '';
    const array = new Uint8Array(arrayBuffer);
    for(let i = 0; i < array.length; i++){
        chars += String.fromCharCode(array[i]);
    }
    return btoa(chars);
}
function base64ToArrayBuffer(base64) {
    return Uint8Array.from(atob(base64), (c)=>c.charCodeAt(0)).buffer;
}
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/core/EventDispatcher.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventDispatcher",
    ()=>EventDispatcher
]);
/**
 * This modules allows to dispatch event objects on custom JavaScript objects.
 *
 * Main repository: [eventdispatcher.js](https://github.com/mrdoob/eventdispatcher.js/)
 *
 * Code Example:
 * ```js
 * class Car extends EventDispatcher {
 * 	start() {
 *		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 *	}
 *};
 *
 * // Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', function ( event ) {
 * 	alert( event.message );
 * } );
 *
 * car.start();
 * ```
 */ class EventDispatcher {
    /**
	 * Adds the given event listener to the given event type.
	 *
	 * @param {string} type - The type of event to listen to.
	 * @param {Function} listener - The function that gets called when the event is fired.
	 */ addEventListener(type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        const listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    }
    /**
	 * Returns `true` if the given event listener has been added to the given event type.
	 *
	 * @param {string} type - The type of event.
	 * @param {Function} listener - The listener to check.
	 * @return {boolean} Whether the given event listener has been added to the given event type.
	 */ hasEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === undefined) return false;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    }
    /**
	 * Removes the given event listener from the given event type.
	 *
	 * @param {string} type - The type of event.
	 * @param {Function} listener - The listener to remove.
	 */ removeEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === undefined) return;
        const listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }
    /**
	 * Dispatches an event object.
	 *
	 * @param {Object} event - The event that gets fired.
	 */ dispatchEvent(event) {
        const listeners = this._listeners;
        if (listeners === undefined) return;
        const listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            // Make a copy, in case listeners are removed while iterating.
            const array = listenerArray.slice(0);
            for(let i = 0, l = array.length; i < l; i++){
                array[i].call(this, event);
            }
            event.target = null;
        }
    }
}
;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/NodeUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$core$2f$EventDispatcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/core/EventDispatcher.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/math/MathUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/StackTrace.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const _parentBuildStage = {
    analyze: 'setup',
    generate: 'analyze'
};
let _nodeId = 0;
/**
 * Base class for all nodes.
 *
 * @augments EventDispatcher
 */ class Node extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$core$2f$EventDispatcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    static get type() {
        return 'Node';
    }
    /**
	 * Constructs a new node.
	 *
	 * @param {?string} nodeType - The node type.
	 */ constructor(nodeType = null){
        super();
        /**
		 * The node type. This represents the result type of the node (e.g. `float` or `vec3`).
		 *
		 * @type {?string}
		 * @default null
		 */ this.nodeType = nodeType;
        /**
		 * The update type of the node's {@link Node#update} method. Possible values are listed in {@link NodeUpdateType}.
		 *
		 * @type {string}
		 * @default 'none'
		 */ this.updateType = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].NONE;
        /**
		 * The update type of the node's {@link Node#updateBefore} method. Possible values are listed in {@link NodeUpdateType}.
		 *
		 * @type {string}
		 * @default 'none'
		 */ this.updateBeforeType = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].NONE;
        /**
		 * The update type of the node's {@link Node#updateAfter} method. Possible values are listed in {@link NodeUpdateType}.
		 *
		 * @type {string}
		 * @default 'none'
		 */ this.updateAfterType = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].NONE;
        /**
		 * The UUID of the node.
		 *
		 * @type {string}
		 * @readonly
		 */ this.uuid = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$math$2f$MathUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MathUtils"].generateUUID();
        /**
		 * The version of the node. The version automatically is increased when {@link Node#needsUpdate} is set to `true`.
		 *
		 * @type {number}
		 * @readonly
		 * @default 0
		 */ this.version = 0;
        /**
		 * The name of the node.
		 *
		 * @type {string}
		 * @default ''
		 */ this.name = '';
        /**
		 * Whether this node is global or not. This property is relevant for the internal
		 * node caching system. All nodes which should be declared just once should
		 * set this flag to `true` (a typical example is {@link AttributeNode}).
		 *
		 * @type {boolean}
		 * @default false
		 */ this.global = false;
        /**
		 * Create a list of parents for this node during the build process.
		 *
		 * @type {boolean}
		 * @default false
		 */ this.parents = false;
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isNode = true;
        // private
        this._beforeNodes = null;
        /**
		 * The cache key of this node.
		 *
		 * @private
		 * @type {?number}
		 * @default null
		 */ this._cacheKey = null;
        /**
		 * The cache key's version.
		 *
		 * @private
		 * @type {number}
		 * @default 0
		 */ this._cacheKeyVersion = 0;
        Object.defineProperty(this, 'id', {
            value: _nodeId++
        });
        /**
		 * The stack trace of the node for debugging purposes.
		 *
		 * @type {?string}
		 * @default null
		 */ this.stackTrace = null;
        if (Node.captureStackTrace === true) {
            this.stackTrace = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]();
        }
    }
    /**
	 * Set this property to `true` when the node should be regenerated.
	 *
	 * @type {boolean}
	 * @default false
	 * @param {boolean} value
	 */ set needsUpdate(value) {
        if (value === true) {
            this.version++;
        }
    }
    /**
	 * The type of the class. The value is usually the constructor name.
	 *
	 * @type {string}
 	 * @readonly
	 */ get type() {
        return this.constructor.type;
    }
    /**
	 * Convenient method for defining {@link Node#update}.
	 *
	 * @param {Function} callback - The update method.
	 * @param {string} updateType - The update type.
	 * @return {Node} A reference to this node.
	 */ onUpdate(callback, updateType) {
        this.updateType = updateType;
        this.update = callback.bind(this);
        return this;
    }
    /**
	 * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
	 * this method automatically sets the update type to `FRAME`.
	 *
	 * @param {Function} callback - The update method.
	 * @return {Node} A reference to this node.
	 */ onFrameUpdate(callback) {
        return this.onUpdate(callback, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].FRAME);
    }
    /**
	 * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
	 * this method automatically sets the update type to `RENDER`.
	 *
	 * @param {Function} callback - The update method.
	 * @return {Node} A reference to this node.
	 */ onRenderUpdate(callback) {
        return this.onUpdate(callback, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].RENDER);
    }
    /**
	 * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
	 * this method automatically sets the update type to `OBJECT`.
	 *
	 * @param {Function} callback - The update method.
	 * @return {Node} A reference to this node.
	 */ onObjectUpdate(callback) {
        return this.onUpdate(callback, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeUpdateType"].OBJECT);
    }
    /**
	 * Convenient method for defining {@link Node#updateReference}.
	 *
	 * @param {Function} callback - The update method.
	 * @return {Node} A reference to this node.
	 */ onReference(callback) {
        this.updateReference = callback.bind(this);
        return this;
    }
    /**
	 * Nodes might refer to other objects like materials. This method allows to dynamically update the reference
	 * to such objects based on a given state (e.g. the current node frame or builder).
	 *
	 * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
	 * @return {any} The updated reference.
	 */ updateReference() {
        return this;
    }
    /**
	 * By default this method returns the value of the {@link Node#global} flag. This method
	 * can be overwritten in derived classes if an analytical way is required to determine the
	 * global cache referring to the current shader-stage.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {boolean} Whether this node is global or not.
	 */ isGlobal() {
        return this.global;
    }
    /**
	 * Generator function that can be used to iterate over the child nodes.
	 *
	 * @generator
	 * @yields {Node} A child node.
	 */ *getChildren() {
        for (const { childNode } of this._getChildren()){
            yield childNode;
        }
    }
    /**
	 * Calling this method dispatches the `dispose` event. This event can be used
	 * to register event listeners for clean up tasks.
	 */ dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
    /**
	 * Callback for {@link Node#traverse}.
	 *
	 * @callback traverseCallback
	 * @param {Node} node - The current node.
	 */ /**
	 * Can be used to traverse through the node's hierarchy.
	 *
	 * @param {traverseCallback} callback - A callback that is executed per node.
	 */ traverse(callback) {
        callback(this);
        for (const childNode of this.getChildren()){
            childNode.traverse(callback);
        }
    }
    /**
	 * Returns the child nodes of this node.
	 *
	 * @private
	 * @param {Set<Node>} [ignores=new Set()] - A set of nodes to ignore during the search to avoid circular references.
	 * @returns {Array<Object>} An array of objects describing the child nodes.
	 */ _getChildren(ignores = new Set()) {
        const children = [];
        // avoid circular references
        ignores.add(this);
        for (const property of Object.getOwnPropertyNames(this)){
            const object = this[property];
            // Ignore private properties and ignored nodes.
            if (property.startsWith('_') === true || ignores.has(object)) continue;
            if (Array.isArray(object) === true) {
                for(let i = 0; i < object.length; i++){
                    const child = object[i];
                    if (child && child.isNode === true) {
                        children.push({
                            property,
                            index: i,
                            childNode: child
                        });
                    }
                }
            } else if (object && object.isNode === true) {
                children.push({
                    property,
                    childNode: object
                });
            } else if (object && Object.getPrototypeOf(object) === Object.prototype) {
                for(const subProperty in object){
                    // Ignore private sub-properties.
                    if (subProperty.startsWith('_') === true) continue;
                    const child = object[subProperty];
                    if (child && child.isNode === true) {
                        children.push({
                            property,
                            index: subProperty,
                            childNode: child
                        });
                    }
                }
            }
        }
        //
        return children;
    }
    /**
	 * Returns the cache key for this node.
	 *
	 * @param {boolean} [force=false] - When set to `true`, a recomputation of the cache key is forced.
	 * @param {Set<Node>} [ignores=null] - A set of nodes to ignore during the computation of the cache key.
	 * @return {number} The cache key of the node.
	 */ getCacheKey(force = false, ignores = null) {
        force = force || this.version !== this._cacheKeyVersion;
        if (force === true || this._cacheKey === null) {
            if (ignores === null) ignores = new Set();
            //
            const values = [];
            for (const { property, childNode } of this._getChildren(ignores)){
                values.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashString"])(property.slice(0, -4)), childNode.getCacheKey(force, ignores));
            }
            //
            this._cacheKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashArray"])(values), this.customCacheKey());
            this._cacheKeyVersion = this.version;
        }
        return this._cacheKey;
    }
    /**
	 * Generate a custom cache key for this node.
	 *
	 * @return {number} The cache key of the node.
	 */ customCacheKey() {
        return this.id;
    }
    /**
	 * Returns the references to this node which is by default `this`.
	 *
	 * @return {Node} A reference to this node.
	 */ getScope() {
        return this;
    }
    /**
	 * Returns the hash of the node which is used to identify the node. By default it's
	 * the {@link Node#uuid} however derived node classes might have to overwrite this method
	 * depending on their implementation.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The hash.
	 */ getHash() {
        return this.uuid;
    }
    /**
	 * Returns the update type of {@link Node#update}.
	 *
	 * @return {NodeUpdateType} The update type.
	 */ getUpdateType() {
        return this.updateType;
    }
    /**
	 * Returns the update type of {@link Node#updateBefore}.
	 *
	 * @return {NodeUpdateType} The update type.
	 */ getUpdateBeforeType() {
        return this.updateBeforeType;
    }
    /**
	 * Returns the update type of {@link Node#updateAfter}.
	 *
	 * @return {NodeUpdateType} The update type.
	 */ getUpdateAfterType() {
        return this.updateAfterType;
    }
    /**
	 * Certain types are composed of multiple elements. For example a `vec3`
	 * is composed of three `float` values. This method returns the type of
	 * these elements.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The type of the node.
	 */ getElementType(builder) {
        const type = this.getNodeType(builder);
        const elementType = builder.getElementType(type);
        return elementType;
    }
    /**
	 * Returns the node member type for the given name.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {string} name - The name of the member.
	 * @return {string} The type of the node.
	 */ getMemberType() {
        return 'void';
    }
    /**
	 * Returns the node's type.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The type of the node.
	 */ getNodeType(builder) {
        const nodeProperties = builder.getNodeProperties(this);
        if (nodeProperties.outputNode) {
            return nodeProperties.outputNode.getNodeType(builder);
        }
        return this.nodeType;
    }
    /**
	 * This method is used during the build process of a node and ensures
	 * equal nodes are not built multiple times but just once. For example if
	 * `attribute( 'uv' )` is used multiple times by the user, the build
	 * process makes sure to process just the first node.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {Node} The shared node if possible. Otherwise `this` is returned.
	 */ getShared(builder) {
        const hash = this.getHash(builder);
        const nodeFromHash = builder.getNodeFromHash(hash);
        return nodeFromHash || this;
    }
    /**
	 * Returns the number of elements in the node array.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {?number} The number of elements in the node array.
	 */ getArrayCount() {
        return null;
    }
    /**
	 * Represents the setup stage which is the first step of the build process, see {@link Node#build} method.
	 * This method is often overwritten in derived modules to prepare the node which is used as a node's output/result.
	 * If an output node is prepared, then it must be returned in the `return` statement of the derived module's setup function.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {?Node} The output node.
	 */ setup(builder) {
        const nodeProperties = builder.getNodeProperties(this);
        let index = 0;
        for (const childNode of this.getChildren()){
            nodeProperties['node' + index++] = childNode;
        }
        // return a outputNode if exists or null
        return nodeProperties.outputNode || null;
    }
    /**
	 * Represents the analyze stage which is the second step of the build process, see {@link Node#build} method.
	 * This stage analyzes the node hierarchy and ensures descendent nodes are built.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {?Node} output - The target output node.
	 */ analyze(builder, output = null) {
        const usageCount = builder.increaseUsage(this);
        if (this.parents === true) {
            const nodeData = builder.getDataFromNode(this, 'any');
            nodeData.stages = nodeData.stages || {};
            nodeData.stages[builder.shaderStage] = nodeData.stages[builder.shaderStage] || [];
            nodeData.stages[builder.shaderStage].push(output);
        }
        if (usageCount === 1) {
            // node flow children
            const nodeProperties = builder.getNodeProperties(this);
            for (const childNode of Object.values(nodeProperties)){
                if (childNode && childNode.isNode === true) {
                    childNode.build(builder, this);
                }
            }
        }
    }
    /**
	 * Represents the generate stage which is the third step of the build process, see {@link Node#build} method.
	 * This state builds the output node and returns the resulting shader string.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {?string} [output] - Can be used to define the output type.
	 * @return {?string} The generated shader string.
	 */ generate(builder, output) {
        const { outputNode } = builder.getNodeProperties(this);
        if (outputNode && outputNode.isNode === true) {
            return outputNode.build(builder, output);
        }
    }
    /**
	 * The method can be implemented to update the node's internal state before it is used to render an object.
	 * The {@link Node#updateBeforeType} property defines how often the update is executed.
	 *
	 * @abstract
	 * @param {NodeFrame} frame - A reference to the current node frame.
	 * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
	 */ updateBefore() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Abstract function.');
    }
    /**
	 * The method can be implemented to update the node's internal state after it was used to render an object.
	 * The {@link Node#updateAfterType} property defines how often the update is executed.
	 *
	 * @abstract
	 * @param {NodeFrame} frame - A reference to the current node frame.
	 * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
	 */ updateAfter() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Abstract function.');
    }
    /**
	 * The method can be implemented to update the node's internal state when it is used to render an object.
	 * The {@link Node#updateType} property defines how often the update is executed.
	 *
	 * @abstract
	 * @param {NodeFrame} frame - A reference to the current node frame.
	 * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
	 */ update() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Abstract function.');
    }
    before(node) {
        if (this._beforeNodes === null) this._beforeNodes = [];
        this._beforeNodes.push(node);
        return this;
    }
    /**
	 * This method performs the build of a node. The behavior and return value depend on the current build stage:
	 * - **setup**: Prepares the node and its children for the build process. This process can also create new nodes. Returns the node itself or a variant.
	 * - **analyze**: Analyzes the node hierarchy for optimizations in the code generation stage. Returns `null`.
	 * - **generate**: Generates the shader code for the node. Returns the generated shader string.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {?(string|Node)} [output=null] - Can be used to define the output type.
	 * @return {?(Node|string)} The result of the build process, depending on the build stage.
	 */ build(builder, output = null) {
        const refNode = this.getShared(builder);
        if (this !== refNode) {
            return refNode.build(builder, output);
        }
        //
        if (this._beforeNodes !== null) {
            const currentBeforeNodes = this._beforeNodes;
            this._beforeNodes = null;
            for (const beforeNode of currentBeforeNodes){
                beforeNode.build(builder, output);
            }
            this._beforeNodes = currentBeforeNodes;
        }
        //
        const nodeData = builder.getDataFromNode(this);
        nodeData.buildStages = nodeData.buildStages || {};
        nodeData.buildStages[builder.buildStage] = true;
        const parentBuildStage = _parentBuildStage[builder.buildStage];
        if (parentBuildStage && nodeData.buildStages[parentBuildStage] !== true) {
            // force parent build stage (setup or analyze)
            const previousBuildStage = builder.getBuildStage();
            builder.setBuildStage(parentBuildStage);
            this.build(builder);
            builder.setBuildStage(previousBuildStage);
        }
        //
        builder.addChain(this);
        /* Build stages expected results:
			- "setup"		-> Node
			- "analyze"		-> null
			- "generate"	-> String
		*/ let result = null;
        const buildStage = builder.getBuildStage();
        if (buildStage === 'setup') {
            builder.addNode(this);
            this.updateReference(builder);
            const properties = builder.getNodeProperties(this);
            if (properties.initialized !== true) {
                //const stackNodesBeforeSetup = builder.stack.nodes.length;
                properties.initialized = true;
                properties.outputNode = this.setup(builder) || properties.outputNode || null;
                /*if ( isNodeOutput && builder.stack.nodes.length !== stackNodesBeforeSetup ) {

					// !! no outputNode !!
					//outputNode = builder.stack;

				}*/ for (const childNode of Object.values(properties)){
                    if (childNode && childNode.isNode === true) {
                        if (childNode.parents === true) {
                            const childProperties = builder.getNodeProperties(childNode);
                            childProperties.parents = childProperties.parents || [];
                            childProperties.parents.push(this);
                        }
                        childNode.build(builder);
                    }
                }
                builder.addSequentialNode(this);
            }
            result = properties.outputNode;
        } else if (buildStage === 'analyze') {
            this.analyze(builder, output);
        } else if (buildStage === 'generate') {
            // If generate has just one argument, it means the output type is not required.
            // This means that the node does not handle output conversions internally,
            // so the value is stored in a cache and the builder handles the conversion
            // for all requested output types.
            const isGenerateOnce = this.generate.length < 2;
            if (isGenerateOnce) {
                const type = this.getNodeType(builder);
                const nodeData = builder.getDataFromNode(this);
                result = nodeData.snippet;
                if (result === undefined) {
                    if (nodeData.generated === undefined) {
                        nodeData.generated = true;
                        result = this.generate(builder) || '';
                        nodeData.snippet = result;
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Node: Recursion detected.', this);
                        result = '/* Recursion detected. */';
                    }
                } else if (nodeData.flowCodes !== undefined && builder.context.nodeBlock !== undefined) {
                    builder.addFlowCodeHierarchy(this, builder.context.nodeBlock);
                }
                result = builder.format(result, type, output);
            } else {
                result = this.generate(builder, output) || '';
            }
            if (result === '' && output !== null && output !== 'void' && output !== 'OutputType') {
                // if no snippet is generated, return a default value
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Invalid generated code, expected a "${output}".`);
                result = builder.generateConst(output);
            }
        }
        builder.removeChain(this);
        return result;
    }
    /**
	 * Returns the child nodes as a JSON object.
	 *
	 * @return {Generator<Object>} An iterable list of serialized child objects as JSON.
	 */ getSerializeChildren() {
        return this._getChildren();
    }
    /**
	 * Serializes the node to JSON.
	 *
	 * @param {Object} json - The output JSON object.
	 */ serialize(json) {
        const nodeChildren = this.getSerializeChildren();
        const inputNodes = {};
        for (const { property, index, childNode } of nodeChildren){
            if (index !== undefined) {
                if (inputNodes[property] === undefined) {
                    inputNodes[property] = Number.isInteger(index) ? [] : {};
                }
                inputNodes[property][index] = childNode.toJSON(json.meta).uuid;
            } else {
                inputNodes[property] = childNode.toJSON(json.meta).uuid;
            }
        }
        if (Object.keys(inputNodes).length > 0) {
            json.inputNodes = inputNodes;
        }
    }
    /**
	 * Deserializes the node from the given JSON.
	 *
	 * @param {Object} json - The JSON object.
	 */ deserialize(json) {
        if (json.inputNodes !== undefined) {
            const nodes = json.meta.nodes;
            for(const property in json.inputNodes){
                if (Array.isArray(json.inputNodes[property])) {
                    const inputArray = [];
                    for (const uuid of json.inputNodes[property]){
                        inputArray.push(nodes[uuid]);
                    }
                    this[property] = inputArray;
                } else if (typeof json.inputNodes[property] === 'object') {
                    const inputObject = {};
                    for(const subProperty in json.inputNodes[property]){
                        const uuid = json.inputNodes[property][subProperty];
                        inputObject[subProperty] = nodes[uuid];
                    }
                    this[property] = inputObject;
                } else {
                    const uuid = json.inputNodes[property];
                    this[property] = nodes[uuid];
                }
            }
        }
    }
    /**
	 * Serializes the node into the three.js JSON Object/Scene format.
	 *
	 * @param {?Object} meta - An optional JSON object that already holds serialized data from other scene objects.
	 * @return {Object} The serialized node.
	 */ toJSON(meta) {
        const { uuid, type } = this;
        const isRoot = meta === undefined || typeof meta === 'string';
        if (isRoot) {
            meta = {
                textures: {},
                images: {},
                nodes: {}
            };
        }
        // serialize
        let data = meta.nodes[uuid];
        if (data === undefined) {
            data = {
                uuid,
                type,
                meta,
                metadata: {
                    version: 4.7,
                    type: 'Node',
                    generator: 'Node.toJSON'
                }
            };
            if (isRoot !== true) meta.nodes[data.uuid] = data;
            this.serialize(data);
            delete data.meta;
        }
        // TODO: Copied from Object3D.toJSON
        function extractFromCache(cache) {
            const values = [];
            for(const key in cache){
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
        if (isRoot) {
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            const nodes = extractFromCache(meta.nodes);
            if (textures.length > 0) data.textures = textures;
            if (images.length > 0) data.images = images;
            if (nodes.length > 0) data.nodes = nodes;
        }
        return data;
    }
}
/**
 * Enables or disables the automatic capturing of stack traces for nodes.
 *
 * @type {boolean}
 * @default false
 */ Node.captureStackTrace = false;
const __TURBOPACK__default__export__ = Node;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/TempNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
;
/**
 * This module uses cache management to create temporary variables
 * if the node is used more than once to prevent duplicate calculations.
 *
 * The class acts as a base class for many other nodes types.
 *
 * @augments Node
 */ class TempNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'TempNode';
    }
    /**
	 * Constructs a temp node.
	 *
	 * @param {?string} nodeType - The node type.
	 */ constructor(nodeType = null){
        super(nodeType);
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isTempNode = true;
    }
    /**
	 * Whether this node is used more than once in context of other nodes.
	 *
	 * @param {NodeBuilder} builder - The node builder.
	 * @return {boolean} A flag that indicates if there is more than one dependency to other nodes.
	 */ hasDependencies(builder) {
        return builder.getDataFromNode(this).usageCount > 1;
    }
    build(builder, output) {
        const buildStage = builder.getBuildStage();
        if (buildStage === 'generate') {
            const type = builder.getVectorType(this.getNodeType(builder, output));
            const nodeData = builder.getDataFromNode(this);
            if (nodeData.propertyName !== undefined) {
                return builder.format(nodeData.propertyName, type, output);
            } else if (type !== 'void' && output !== 'void' && this.hasDependencies(builder)) {
                const snippet = super.build(builder, type);
                const nodeVar = builder.getVarFromNode(this, null, type);
                const propertyName = builder.getPropertyName(nodeVar);
                builder.addLineFlowCode(`${propertyName} = ${snippet}`, this);
                nodeData.snippet = snippet;
                nodeData.propertyName = propertyName;
                return builder.format(nodeData.propertyName, type, output);
            }
        }
        return super.build(builder, output);
    }
}
const __TURBOPACK__default__export__ = TempNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/ArrayElementNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
;
/**
 * Base class for representing element access on an array-like
 * node data structures.
 *
 * @augments Node
 */ class ArrayElementNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'ArrayElementNode';
    }
    /**
	 * Constructs an array element node.
	 *
	 * @param {Node} node - The array-like node.
	 * @param {Node} indexNode - The index node that defines the element access.
	 */ constructor(node, indexNode){
        super();
        /**
		 * The array-like node.
		 *
		 * @type {Node}
		 */ this.node = node;
        /**
		 * The index node that defines the element access.
		 *
		 * @type {Node}
		 */ this.indexNode = indexNode;
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isArrayElementNode = true;
    }
    /**
	 * This method is overwritten since the node type is inferred from the array-like node.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        return this.node.getElementType(builder);
    }
    /**
	 * This method is overwritten since the member type is inferred from the array-like node.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {string} name - The member name.
	 * @return {string} The member type.
	 */ getMemberType(builder, name) {
        return this.node.getMemberType(builder, name);
    }
    generate(builder) {
        const indexType = this.indexNode.getNodeType(builder);
        const nodeSnippet = this.node.build(builder);
        const indexSnippet = this.indexNode.build(builder, !builder.isVector(indexType) && builder.isInteger(indexType) ? indexType : 'uint');
        return `${nodeSnippet}[ ${indexSnippet} ]`;
    }
}
const __TURBOPACK__default__export__ = ArrayElementNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/ConvertNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a convert operation during the shader generation process
 * meaning it converts the data type of a node to a target data type.
 *
 * @augments Node
 */ class ConvertNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'ConvertNode';
    }
    /**
	 * Constructs a new convert node.
	 *
	 * @param {Node} node - The node which type should be converted.
	 * @param {string} convertTo - The target node type. Multiple types can be defined by separating them with a `|` sign.
	 */ constructor(node, convertTo){
        super();
        /**
		 * The node which type should be converted.
		 *
		 * @type {Node}
		 */ this.node = node;
        /**
		 * The target node type. Multiple types can be defined by separating them with a `|` sign.
		 *
		 * @type {string}
		 */ this.convertTo = convertTo;
    }
    /**
	 * This method is overwritten since the implementation tries to infer the best
	 * matching type from the {@link ConvertNode#convertTo} property.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        const requestType = this.node.getNodeType(builder);
        let convertTo = null;
        for (const overloadingType of this.convertTo.split('|')){
            if (convertTo === null || builder.getTypeLength(requestType) === builder.getTypeLength(overloadingType)) {
                convertTo = overloadingType;
            }
        }
        return convertTo;
    }
    serialize(data) {
        super.serialize(data);
        data.convertTo = this.convertTo;
    }
    deserialize(data) {
        super.deserialize(data);
        this.convertTo = data.convertTo;
    }
    generate(builder, output) {
        const node = this.node;
        const type = this.getNodeType(builder);
        const snippet = node.build(builder, type);
        return builder.format(snippet, type, output);
    }
}
const __TURBOPACK__default__export__ = ConvertNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/JoinNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/TempNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a join operation during the shader generation process.
 * For example in can compose/join two single floats into a `vec2` type.
 *
 * @augments TempNode
 */ class JoinNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'JoinNode';
    }
    /**
	 * Constructs a new join node.
	 *
	 * @param {Array<Node>} nodes - An array of nodes that should be joined.
	 * @param {?string} [nodeType=null] - The node type.
	 */ constructor(nodes = [], nodeType = null){
        super(nodeType);
        /**
		 * An array of nodes that should be joined.
		 *
		 * @type {Array<Node>}
		 */ this.nodes = nodes;
    }
    /**
	 * This method is overwritten since the node type must be inferred from the
	 * joined data length if not explicitly defined.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        if (this.nodeType !== null) {
            return builder.getVectorType(this.nodeType);
        }
        return builder.getTypeFromLength(this.nodes.reduce((count, cur)=>count + builder.getTypeLength(cur.getNodeType(builder)), 0));
    }
    generate(builder, output) {
        const type = this.getNodeType(builder);
        const maxLength = builder.getTypeLength(type);
        const nodes = this.nodes;
        const primitiveType = builder.getComponentType(type);
        const snippetValues = [];
        let length = 0;
        for (const input of nodes){
            if (length >= maxLength) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Length of parameters exceeds maximum length of function '${type}()' type.`, this.stackTrace);
                break;
            }
            let inputType = input.getNodeType(builder);
            let inputTypeLength = builder.getTypeLength(inputType);
            let inputSnippet;
            if (length + inputTypeLength > maxLength) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Length of '${type}()' data exceeds maximum length of output type.`, this.stackTrace);
                inputTypeLength = maxLength - length;
                inputType = builder.getTypeFromLength(inputTypeLength);
            }
            length += inputTypeLength;
            inputSnippet = input.build(builder, inputType);
            const inputPrimitiveType = builder.getComponentType(inputType);
            if (inputPrimitiveType !== primitiveType) {
                const targetType = builder.getTypeFromLength(inputTypeLength, primitiveType);
                inputSnippet = builder.format(inputSnippet, inputType, targetType);
            }
            snippetValues.push(inputSnippet);
        }
        const snippet = `${builder.getType(type)}( ${snippetValues.join(', ')} )`;
        return builder.format(snippet, type, output);
    }
}
const __TURBOPACK__default__export__ = JoinNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/SplitNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/constants.js [app-rsc] (ecmascript)");
;
;
const _stringVectorComponents = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vectorComponents"].join('');
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SplitNode` represents a property access operation which means it is
 * used to implement any `.xyzw`, `.rgba` and `stpq` usage on node objects.
 * For example:
 * ```js
 * const redValue = color.r;
 * ```
 *
 * @augments Node
 */ class SplitNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'SplitNode';
    }
    /**
	 * Constructs a new split node.
	 *
	 * @param {Node} node - The node that should be accessed.
	 * @param {string} [components='x'] - The components that should be accessed.
	 */ constructor(node, components = 'x'){
        super();
        /**
		 * The node that should be accessed.
		 *
		 * @type {Node}
		 */ this.node = node;
        /**
		 * The components that should be accessed.
		 *
		 * @type {string}
		 */ this.components = components;
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isSplitNode = true;
    }
    /**
	 * Returns the vector length which is computed based on the requested components.
	 *
	 * @return {number} The vector length.
	 */ getVectorLength() {
        let vectorLength = this.components.length;
        for (const c of this.components){
            vectorLength = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vectorComponents"].indexOf(c) + 1, vectorLength);
        }
        return vectorLength;
    }
    /**
	 * Returns the component type of the node's type.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The component type.
	 */ getComponentType(builder) {
        return builder.getComponentType(this.node.getNodeType(builder));
    }
    /**
	 * This method is overwritten since the node type is inferred from requested components.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        return builder.getTypeFromLength(this.components.length, this.getComponentType(builder));
    }
    /**
	 * Returns the scope of the node.
	 *
	 * @return {Node} The scope of the node.
	 */ getScope() {
        return this.node.getScope();
    }
    generate(builder, output) {
        const node = this.node;
        const nodeTypeLength = builder.getTypeLength(node.getNodeType(builder));
        let snippet = null;
        if (nodeTypeLength > 1) {
            let type = null;
            const componentsLength = this.getVectorLength();
            if (componentsLength >= nodeTypeLength) {
                // needed expand the input node
                type = builder.getTypeFromLength(this.getVectorLength(), this.getComponentType(builder));
            }
            const nodeSnippet = node.build(builder, type);
            if (this.components.length === nodeTypeLength && this.components === _stringVectorComponents.slice(0, this.components.length)) {
                // unnecessary swizzle
                snippet = builder.format(nodeSnippet, type, output);
            } else {
                snippet = builder.format(`${nodeSnippet}.${this.components}`, this.getNodeType(builder), output);
            }
        } else {
            // ignore .components if .node returns float/integer
            snippet = node.build(builder, output);
        }
        return snippet;
    }
    serialize(data) {
        super.serialize(data);
        data.components = this.components;
    }
    deserialize(data) {
        super.deserialize(data);
        this.components = data.components;
    }
}
const __TURBOPACK__default__export__ = SplitNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/SetNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/TempNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/constants.js [app-rsc] (ecmascript)");
;
;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SetNode` represents a set operation which means it is used to implement any
 * `setXYZW()`, `setRGBA()` and `setSTPQ()` method invocations on node objects.
 * For example:
 * ```js
 * materialLine.colorNode = color( 0, 0, 0 ).setR( float( 1 ) );
 * ```
 *
 * @augments TempNode
 */ class SetNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'SetNode';
    }
    /**
	 * Constructs a new set node.
	 *
	 * @param {Node} sourceNode - The node that should be updated.
	 * @param {string} components - The components that should be updated.
	 * @param {Node} targetNode - The value node.
	 */ constructor(sourceNode, components, targetNode){
        super();
        /**
		 * The node that should be updated.
		 *
		 * @type {Node}
		 */ this.sourceNode = sourceNode;
        /**
		 * The components that should be updated.
		 *
		 * @type {string}
		 */ this.components = components;
        /**
		 * The value node.
		 *
		 * @type {Node}
		 */ this.targetNode = targetNode;
    }
    /**
	 * This method is overwritten since the node type is inferred from {@link SetNode#sourceNode}.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        return this.sourceNode.getNodeType(builder);
    }
    generate(builder) {
        const { sourceNode, components, targetNode } = this;
        const sourceType = this.getNodeType(builder);
        const componentType = builder.getComponentType(targetNode.getNodeType(builder));
        const targetType = builder.getTypeFromLength(components.length, componentType);
        const targetSnippet = targetNode.build(builder, targetType);
        const sourceSnippet = sourceNode.build(builder, sourceType);
        const length = builder.getTypeLength(sourceType);
        const snippetValues = [];
        for(let i = 0; i < length; i++){
            const component = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vectorComponents"][i];
            if (component === components[0]) {
                snippetValues.push(targetSnippet);
                i += components.length - 1;
            } else {
                snippetValues.push(sourceSnippet + '.' + component);
            }
        }
        return `${builder.getType(sourceType)}( ${snippetValues.join(', ')} )`;
    }
}
const __TURBOPACK__default__export__ = SetNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/FlipNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/TempNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/constants.js [app-rsc] (ecmascript)");
;
;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a flip operation during the shader generation process
 * meaning it flips normalized values with the following formula:
 * ```
 * x = 1 - x;
 * ```
 * `FlipNode` is internally used to implement any `flipXYZW()`, `flipRGBA()` and
 * `flipSTPQ()` method invocations on node objects. For example:
 * ```js
 * uvNode = uvNode.flipY();
 * ```
 *
 * @augments TempNode
 */ class FlipNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'FlipNode';
    }
    /**
	 * Constructs a new flip node.
	 *
	 * @param {Node} sourceNode - The node which component(s) should be flipped.
	 * @param {string} components - The components that should be flipped e.g. `'x'` or `'xy'`.
	 */ constructor(sourceNode, components){
        super();
        /**
		 * The node which component(s) should be flipped.
		 *
		 * @type {Node}
		 */ this.sourceNode = sourceNode;
        /**
		 * The components that should be flipped e.g. `'x'` or `'xy'`.
		 *
		 * @type {string}
		 */ this.components = components;
    }
    /**
	 * This method is overwritten since the node type is inferred from the source node.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The node type.
	 */ getNodeType(builder) {
        return this.sourceNode.getNodeType(builder);
    }
    generate(builder) {
        const { components, sourceNode } = this;
        const sourceType = this.getNodeType(builder);
        const sourceSnippet = sourceNode.build(builder);
        const sourceCache = builder.getVarFromNode(this);
        const sourceProperty = builder.getPropertyName(sourceCache);
        builder.addLineFlowCode(sourceProperty + ' = ' + sourceSnippet, this);
        const length = builder.getTypeLength(sourceType);
        const snippetValues = [];
        let componentIndex = 0;
        for(let i = 0; i < length; i++){
            const component = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vectorComponents"][i];
            if (component === components[componentIndex]) {
                snippetValues.push('1.0 - ' + (sourceProperty + '.' + component));
                componentIndex++;
            } else {
                snippetValues.push(sourceProperty + '.' + component);
            }
        }
        return `${builder.getType(sourceType)}( ${snippetValues.join(', ')} )`;
    }
}
const __TURBOPACK__default__export__ = FlipNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/InputNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/NodeUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
;
/**
 * Base class for representing data input nodes.
 *
 * @augments Node
 */ class InputNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'InputNode';
    }
    /**
	 * Constructs a new input node.
	 *
	 * @param {any} value - The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
	 * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
	 */ constructor(value, nodeType = null){
        super(nodeType);
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isInputNode = true;
        /**
		 * The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
		 *
		 * @type {any}
		 */ this.value = value;
        /**
		 * The precision of the value in the shader.
		 *
		 * @type {?('low'|'medium'|'high')}
		 * @default null
		 */ this.precision = null;
    }
    getNodeType() {
        if (this.nodeType === null) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueType"])(this.value);
        }
        return this.nodeType;
    }
    /**
	 * Returns the input type of the node which is by default the node type. Derived modules
	 * might overwrite this method and use a fixed type or compute one analytically.
	 *
	 * A typical example for different input and node types are textures. The input type of a
	 * normal RGBA texture is `texture` whereas its node type is `vec4`.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The input type.
	 */ getInputType(builder) {
        return this.getNodeType(builder);
    }
    /**
	 * Sets the precision to the given value. The method can be
	 * overwritten in derived classes if the final precision must be computed
	 * analytically.
	 *
	 * @param {('low'|'medium'|'high')} precision - The precision of the input value in the shader.
	 * @return {InputNode} A reference to this node.
	 */ setPrecision(precision) {
        this.precision = precision;
        return this;
    }
    serialize(data) {
        super.serialize(data);
        data.value = this.value;
        if (this.value && this.value.toArray) data.value = this.value.toArray();
        data.valueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueType"])(this.value);
        data.nodeType = this.nodeType;
        if (data.valueType === 'ArrayBuffer') data.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["arrayBufferToBase64"])(data.value);
        data.precision = this.precision;
    }
    deserialize(data) {
        super.deserialize(data);
        this.nodeType = data.nodeType;
        this.value = Array.isArray(data.value) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueFromType"])(data.valueType, ...data.value) : data.value;
        this.precision = data.precision || null;
        if (this.value && this.value.fromArray) this.value = this.value.fromArray(data.value);
    }
    generate() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('Abstract function.');
    }
}
const __TURBOPACK__default__export__ = InputNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/ConstNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$InputNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/InputNode.js [app-rsc] (ecmascript)");
;
const _regNum = /float|u?int/;
/**
 * Class for representing a constant value in the shader.
 *
 * @augments InputNode
 */ class ConstNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$InputNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'ConstNode';
    }
    /**
	 * Constructs a new input node.
	 *
	 * @param {any} value - The value of this node. Usually a JS primitive or three.js object (vector, matrix, color).
	 * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
	 */ constructor(value, nodeType = null){
        super(value, nodeType);
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isConstNode = true;
    }
    /**
	 * Generates the shader string of the value with the current node builder.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @return {string} The generated value as a shader string.
	 */ generateConst(builder) {
        return builder.generateConst(this.getNodeType(builder), this.value);
    }
    generate(builder, output) {
        const type = this.getNodeType(builder);
        if (_regNum.test(type) && _regNum.test(output)) {
            return builder.generateConst(output, this.value);
        }
        return builder.format(this.generateConst(builder), type, output);
    }
}
const __TURBOPACK__default__export__ = ConstNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/MemberNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
/**
 * Base class for representing member access on an object-like
 * node data structures.
 *
 * @augments Node
 */ class MemberNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'MemberNode';
    }
    /**
	 * Constructs a member node.
	 *
	 * @param {Node} structNode - The struct node.
	 * @param {string} property - The property name.
	 */ constructor(structNode, property){
        super();
        /**
		 * The struct node.
		 *
		 * @type {Node}
		 */ this.structNode = structNode;
        /**
		 * The property name.
		 *
		 * @type {Node}
		 */ this.property = property;
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isMemberNode = true;
    }
    hasMember(builder) {
        if (this.structNode.isMemberNode) {
            if (this.structNode.hasMember(builder) === false) {
                return false;
            }
        }
        return this.structNode.getMemberType(builder, this.property) !== 'void';
    }
    getNodeType(builder) {
        if (this.hasMember(builder) === false) {
            // default type if member does not exist
            return 'float';
        }
        return this.structNode.getMemberType(builder, this.property);
    }
    getMemberType(builder, name) {
        if (this.hasMember(builder) === false) {
            // default type if member does not exist
            return 'float';
        }
        const type = this.getNodeType(builder);
        const struct = builder.getStructTypeNode(type);
        return struct.getMemberType(builder, name);
    }
    generate(builder) {
        if (this.hasMember(builder) === false) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])(`TSL: Member "${this.property}" does not exist in struct.`, this.stackTrace);
            const type = this.getNodeType(builder);
            return builder.generateConst(type);
        }
        const propertyName = this.structNode.build(builder);
        return propertyName + '.' + this.property;
    }
}
const __TURBOPACK__default__export__ = MemberNode;
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/tsl/TSLCore.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fn",
    ()=>Fn,
    "If",
    ()=>If,
    "ShaderNode",
    ()=>ShaderNode,
    "Stack",
    ()=>Stack,
    "Switch",
    ()=>Switch,
    "addMethodChaining",
    ()=>addMethodChaining,
    "append",
    ()=>append,
    "arrayBuffer",
    ()=>arrayBuffer,
    "bool",
    ()=>bool,
    "bvec2",
    ()=>bvec2,
    "bvec3",
    ()=>bvec3,
    "bvec4",
    ()=>bvec4,
    "color",
    ()=>color,
    "convert",
    ()=>convert,
    "defined",
    ()=>defined,
    "element",
    ()=>element,
    "float",
    ()=>float,
    "getConstNodeType",
    ()=>getConstNodeType,
    "getCurrentStack",
    ()=>getCurrentStack,
    "int",
    ()=>int,
    "ivec2",
    ()=>ivec2,
    "ivec3",
    ()=>ivec3,
    "ivec4",
    ()=>ivec4,
    "mat2",
    ()=>mat2,
    "mat3",
    ()=>mat3,
    "mat4",
    ()=>mat4,
    "nodeArray",
    ()=>nodeArray,
    "nodeImmutable",
    ()=>nodeImmutable,
    "nodeObject",
    ()=>nodeObject,
    "nodeObjectIntent",
    ()=>nodeObjectIntent,
    "nodeObjects",
    ()=>nodeObjects,
    "nodeProxy",
    ()=>nodeProxy,
    "nodeProxyIntent",
    ()=>nodeProxyIntent,
    "setCurrentStack",
    ()=>setCurrentStack,
    "split",
    ()=>split,
    "string",
    ()=>string,
    "uint",
    ()=>uint,
    "uvec2",
    ()=>uvec2,
    "uvec3",
    ()=>uvec3,
    "uvec4",
    ()=>uvec4,
    "vec2",
    ()=>vec2,
    "vec3",
    ()=>vec3,
    "vec4",
    ()=>vec4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/Node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ArrayElementNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/ArrayElementNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ConvertNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/ConvertNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$JoinNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/JoinNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$SplitNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/SplitNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$SetNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/SetNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$FlipNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/FlipNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/ConstNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$MemberNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/utils/MemberNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/StackTrace.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/NodeUtils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
let currentStack = null;
const NodeElements = new Map();
function addMethodChaining(name, nodeElement) {
    // No require StackTrace because this is internal API
    if (NodeElements.has(name)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])(`TSL: Redefinition of method chaining '${name}'.`);
        return;
    }
    if (typeof nodeElement !== 'function') throw new Error(`THREE.TSL: Node element ${name} is not a function`);
    NodeElements.set(name, nodeElement);
    if (name !== 'assign') {
        // Changing Node prototype to add method chaining
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype[name] = function(...params) {
            //if ( name === 'toVarIntent' ) return this;
            return this.isStackNode ? this.addToStack(nodeElement(...params)) : nodeElement(this, ...params);
        };
        // Adding assign method chaining
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype[name + 'Assign'] = function(...params) {
            return this.isStackNode ? this.assign(params[0], nodeElement(...params)) : this.assign(nodeElement(this, ...params));
        };
    }
}
const parseSwizzle = (props)=>props.replace(/r|s/g, 'x').replace(/g|t/g, 'y').replace(/b|p/g, 'z').replace(/a|q/g, 'w');
const parseSwizzleAndSort = (props)=>parseSwizzle(props).split('').sort().join('');
__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype.assign = function(...params) {
    if (this.isStackNode !== true) {
        if (currentStack !== null) {
            currentStack.assign(this, ...params);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])('TSL: No stack defined for assign operation. Make sure the assign is inside a Fn().', new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
        }
        return this;
    } else {
        const nodeElement = NodeElements.get('assign');
        return this.addToStack(nodeElement(...params));
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype.toVarIntent = function() {
    return this;
};
__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype.get = function(value) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$MemberNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this, value);
};
// Cache prototype for TSL
const proto = {};
// Set swizzle properties for xyzw, rgba, and stpq.
function setProtoSwizzle(property, altA, altB) {
    // swizzle properties
    proto[property] = proto[altA] = proto[altB] = {
        get () {
            this._cache = this._cache || {};
            //
            let split = this._cache[property];
            if (split === undefined) {
                split = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$SplitNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this, property);
                this._cache[property] = split;
            }
            return split;
        },
        set (value) {
            this[property].assign(nodeObject(value));
        }
    };
    // set properties ( swizzle ) and sort to xyzw sequence
    const propUpper = property.toUpperCase();
    const altAUpper = altA.toUpperCase();
    const altBUpper = altB.toUpperCase();
    // Set methods for swizzle properties
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['set' + propUpper] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['set' + altAUpper] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['set' + altBUpper] = function(value) {
        const swizzle = parseSwizzleAndSort(property);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$SetNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this, swizzle, nodeObject(value));
    };
    // Set methods for flip properties
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['flip' + propUpper] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['flip' + altAUpper] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype['flip' + altBUpper] = function() {
        const swizzle = parseSwizzleAndSort(property);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$FlipNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this, swizzle);
    };
}
const swizzleA = [
    'x',
    'y',
    'z',
    'w'
];
const swizzleB = [
    'r',
    'g',
    'b',
    'a'
];
const swizzleC = [
    's',
    't',
    'p',
    'q'
];
for(let a = 0; a < 4; a++){
    let prop = swizzleA[a];
    let altA = swizzleB[a];
    let altB = swizzleC[a];
    setProtoSwizzle(prop, altA, altB);
    for(let b = 0; b < 4; b++){
        prop = swizzleA[a] + swizzleA[b];
        altA = swizzleB[a] + swizzleB[b];
        altB = swizzleC[a] + swizzleC[b];
        setProtoSwizzle(prop, altA, altB);
        for(let c = 0; c < 4; c++){
            prop = swizzleA[a] + swizzleA[b] + swizzleA[c];
            altA = swizzleB[a] + swizzleB[b] + swizzleB[c];
            altB = swizzleC[a] + swizzleC[b] + swizzleC[c];
            setProtoSwizzle(prop, altA, altB);
            for(let d = 0; d < 4; d++){
                prop = swizzleA[a] + swizzleA[b] + swizzleA[c] + swizzleA[d];
                altA = swizzleB[a] + swizzleB[b] + swizzleB[c] + swizzleB[d];
                altB = swizzleC[a] + swizzleC[b] + swizzleC[c] + swizzleC[d];
                setProtoSwizzle(prop, altA, altB);
            }
        }
    }
}
// Set/get static properties for array elements (0-31).
for(let i = 0; i < 32; i++){
    proto[i] = {
        get () {
            this._cache = this._cache || {};
            //
            let element = this._cache[i];
            if (element === undefined) {
                element = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ArrayElementNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](i, 'uint'));
                this._cache[i] = element;
            }
            return element;
        },
        set (value) {
            this[i].assign(nodeObject(value));
        }
    };
}
/*
// Set properties for width, height, and depth.

function setProtoProperty( property, target ) {

	proto[ property ] = {

		get() {

			this._cache = this._cache || {};

			//

			let split = this._cache[ target ];

			if ( split === undefined ) {

				split = new SplitNode( this, target );

				this._cache[ target ] = split;

			}

			return split;

		},

		set( value ) {

			this[ target ].assign( nodeObject( value ) );

		}

	};

}

setProtoProperty( 'width', 'x' );
setProtoProperty( 'height', 'y' );
setProtoProperty( 'depth', 'z' );
*/ Object.defineProperties(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].prototype, proto);
// --- FINISH ---
const nodeBuilderFunctionsCacheMap = new WeakMap();
const ShaderNodeObject = function(obj, altType = null) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueType"])(obj);
    if (type === 'node') {
        return obj;
    } else if (altType === null && (type === 'float' || type === 'boolean') || type && type !== 'shader' && type !== 'string') {
        return nodeObject(getConstNode(obj, altType));
    } else if (type === 'shader') {
        return obj.isFn ? obj : Fn(obj);
    }
    return obj;
};
const ShaderNodeObjects = function(objects, altType = null) {
    for(const name in objects){
        objects[name] = nodeObject(objects[name], altType);
    }
    return objects;
};
const ShaderNodeArray = function(array, altType = null) {
    const len = array.length;
    for(let i = 0; i < len; i++){
        array[i] = nodeObject(array[i], altType);
    }
    return array;
};
const ShaderNodeProxy = function(NodeClass, scope = null, factor = null, settings = null) {
    function assignNode(node) {
        if (settings !== null) {
            node = nodeObject(Object.assign(node, settings));
            if (settings.intent === true) {
                node = node.toVarIntent();
            }
        } else {
            node = nodeObject(node);
        }
        return node;
    }
    let fn, name = scope, minParams, maxParams;
    function verifyParamsLimit(params) {
        let tslName;
        if (name) tslName = /[a-z]/i.test(name) ? name + '()' : name;
        else tslName = NodeClass.type;
        if (minParams !== undefined && params.length < minParams) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: "${tslName}" parameter length is less than minimum required.`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
            return params.concat(new Array(minParams - params.length).fill(0));
        } else if (maxParams !== undefined && params.length > maxParams) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: "${tslName}" parameter length exceeds limit.`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
            return params.slice(0, maxParams);
        }
        return params;
    }
    if (scope === null) {
        fn = (...params)=>{
            return assignNode(new NodeClass(...nodeArray(verifyParamsLimit(params))));
        };
    } else if (factor !== null) {
        factor = nodeObject(factor);
        fn = (...params)=>{
            return assignNode(new NodeClass(scope, ...nodeArray(verifyParamsLimit(params)), factor));
        };
    } else {
        fn = (...params)=>{
            return assignNode(new NodeClass(scope, ...nodeArray(verifyParamsLimit(params))));
        };
    }
    fn.setParameterLength = (...params)=>{
        if (params.length === 1) minParams = maxParams = params[0];
        else if (params.length === 2) [minParams, maxParams] = params;
        return fn;
    };
    fn.setName = (value)=>{
        name = value;
        return fn;
    };
    return fn;
};
const ShaderNodeImmutable = function(NodeClass, ...params) {
    return new NodeClass(...nodeArray(params));
};
class ShaderCallNodeInternal extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    constructor(shaderNode, rawInputs){
        super();
        this.shaderNode = shaderNode;
        this.rawInputs = rawInputs;
        this.isShaderCallNodeInternal = true;
    }
    getNodeType(builder) {
        return this.shaderNode.nodeType || this.getOutputNode(builder).getNodeType(builder);
    }
    getElementType(builder) {
        return this.getOutputNode(builder).getElementType(builder);
    }
    getMemberType(builder, name) {
        return this.getOutputNode(builder).getMemberType(builder, name);
    }
    call(builder) {
        const { shaderNode, rawInputs } = this;
        const properties = builder.getNodeProperties(shaderNode);
        const subBuild = builder.getClosestSubBuild(shaderNode.subBuilds) || '';
        const subBuildProperty = subBuild || 'default';
        if (properties[subBuildProperty]) {
            return properties[subBuildProperty];
        }
        //
        const previousSubBuildFn = builder.subBuildFn;
        const previousFnCall = builder.fnCall;
        builder.subBuildFn = subBuild;
        builder.fnCall = this;
        let result = null;
        if (shaderNode.layout) {
            let functionNodesCacheMap = nodeBuilderFunctionsCacheMap.get(builder.constructor);
            if (functionNodesCacheMap === undefined) {
                functionNodesCacheMap = new WeakMap();
                nodeBuilderFunctionsCacheMap.set(builder.constructor, functionNodesCacheMap);
            }
            let functionNode = functionNodesCacheMap.get(shaderNode);
            if (functionNode === undefined) {
                functionNode = nodeObject(builder.buildFunctionNode(shaderNode));
                functionNodesCacheMap.set(shaderNode, functionNode);
            }
            builder.addInclude(functionNode);
            //
            const inputs = rawInputs ? getLayoutParameters(rawInputs) : null;
            result = nodeObject(functionNode.call(inputs));
        } else {
            const secureNodeBuilder = new Proxy(builder, {
                get: (target, property, receiver)=>{
                    let value;
                    if (Symbol.iterator === property) {
                        value = function*() {
                            yield undefined;
                        };
                    } else {
                        value = Reflect.get(target, property, receiver);
                    }
                    return value;
                }
            });
            //
            const inputs = rawInputs ? getProxyParameters(rawInputs) : null;
            const hasParameters = Array.isArray(rawInputs) ? rawInputs.length > 0 : rawInputs !== null;
            const jsFunc = shaderNode.jsFunc;
            const outputNode = hasParameters || jsFunc.length > 1 ? jsFunc(inputs, secureNodeBuilder) : jsFunc(secureNodeBuilder);
            result = nodeObject(outputNode);
        }
        builder.subBuildFn = previousSubBuildFn;
        builder.fnCall = previousFnCall;
        if (shaderNode.once) {
            properties[subBuildProperty] = result;
        }
        return result;
    }
    setupOutput(builder) {
        builder.addStack();
        builder.stack.outputNode = this.call(builder);
        return builder.removeStack();
    }
    getOutputNode(builder) {
        const properties = builder.getNodeProperties(this);
        const subBuildOutput = builder.getSubBuildOutput(this);
        properties[subBuildOutput] = properties[subBuildOutput] || this.setupOutput(builder);
        properties[subBuildOutput].subBuild = builder.getClosestSubBuild(this);
        return properties[subBuildOutput];
    }
    build(builder, output = null) {
        let result = null;
        const buildStage = builder.getBuildStage();
        const properties = builder.getNodeProperties(this);
        const subBuildOutput = builder.getSubBuildOutput(this);
        const outputNode = this.getOutputNode(builder);
        const previousFnCall = builder.fnCall;
        builder.fnCall = this;
        if (buildStage === 'setup') {
            const subBuildInitialized = builder.getSubBuildProperty('initialized', this);
            if (properties[subBuildInitialized] !== true) {
                properties[subBuildInitialized] = true;
                properties[subBuildOutput] = this.getOutputNode(builder);
                properties[subBuildOutput].build(builder);
                // If the shaderNode has subBuilds, add them to the chaining nodes
                // so they can be built later in the build process.
                if (this.shaderNode.subBuilds) {
                    for (const node of builder.chaining){
                        const nodeData = builder.getDataFromNode(node, 'any');
                        nodeData.subBuilds = nodeData.subBuilds || new Set();
                        for (const subBuild of this.shaderNode.subBuilds){
                            nodeData.subBuilds.add(subBuild);
                        }
                    //builder.getDataFromNode( node ).subBuilds = nodeData.subBuilds;
                    }
                }
            }
            result = properties[subBuildOutput];
        } else if (buildStage === 'analyze') {
            outputNode.build(builder, output);
        } else if (buildStage === 'generate') {
            result = outputNode.build(builder, output) || '';
        }
        builder.fnCall = previousFnCall;
        return result;
    }
}
function getLayoutParameters(params) {
    let output;
    nodeObjects(params);
    const isArrayAsParameter = params[0] && (params[0].isNode || Object.getPrototypeOf(params[0]) !== Object.prototype);
    if (isArrayAsParameter) {
        output = [
            ...params
        ];
    } else {
        output = params[0];
    }
    return output;
}
function getProxyParameters(params) {
    let index = 0;
    nodeObjects(params);
    return new Proxy(params, {
        get: (target, property, receiver)=>{
            let value;
            if (property === 'length') {
                value = params.length;
                return value;
            }
            if (Symbol.iterator === property) {
                value = function*() {
                    for (const inputNode of params){
                        yield nodeObject(inputNode);
                    }
                };
            } else {
                if (params.length > 0) {
                    if (Object.getPrototypeOf(params[0]) === Object.prototype) {
                        const objectTarget = params[0];
                        if (objectTarget[property] === undefined) {
                            value = objectTarget[index++];
                        } else {
                            value = Reflect.get(objectTarget, property, receiver);
                        }
                    } else if (params[0] instanceof __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]) {
                        if (params[property] === undefined) {
                            value = params[index++];
                        } else {
                            value = Reflect.get(params, property, receiver);
                        }
                    }
                } else {
                    value = Reflect.get(target, property, receiver);
                }
                value = nodeObject(value);
            }
            return value;
        }
    });
}
class ShaderNodeInternal extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    constructor(jsFunc, nodeType){
        super(nodeType);
        this.jsFunc = jsFunc;
        this.layout = null;
        this.global = true;
        this.once = false;
    }
    setLayout(layout) {
        this.layout = layout;
        return this;
    }
    getLayout() {
        return this.layout;
    }
    call(rawInputs = null) {
        return new ShaderCallNodeInternal(this, rawInputs);
    }
    setup() {
        return this.call();
    }
}
const bools = [
    false,
    true
];
const uints = [
    0,
    1,
    2,
    3
];
const ints = [
    -1,
    -2
];
const floats = [
    0.5,
    1.5,
    1 / 3,
    1e-6,
    1e6,
    Math.PI,
    Math.PI * 2,
    1 / Math.PI,
    2 / Math.PI,
    1 / (Math.PI * 2),
    Math.PI / 2
];
const boolsCacheMap = new Map();
for (const bool of bools)boolsCacheMap.set(bool, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](bool));
const uintsCacheMap = new Map();
for (const uint of uints)uintsCacheMap.set(uint, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](uint, 'uint'));
const intsCacheMap = new Map([
    ...uintsCacheMap
].map((el)=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](el.value, 'int')));
for (const int of ints)intsCacheMap.set(int, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](int, 'int'));
const floatsCacheMap = new Map([
    ...intsCacheMap
].map((el)=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](el.value)));
for (const float of floats)floatsCacheMap.set(float, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](float));
for (const float of floats)floatsCacheMap.set(-float, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](-float));
const cacheMaps = {
    bool: boolsCacheMap,
    uint: uintsCacheMap,
    ints: intsCacheMap,
    float: floatsCacheMap
};
const constNodesCacheMap = new Map([
    ...boolsCacheMap,
    ...floatsCacheMap
]);
const getConstNode = (value, type)=>{
    if (constNodesCacheMap.has(value)) {
        return constNodesCacheMap.get(value);
    } else if (value.isNode === true) {
        return value;
    } else {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](value, type);
    }
};
const ConvertType = function(type, cacheMap = null) {
    return (...params)=>{
        for (const param of params){
            if (param === undefined) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])(`TSL: Invalid parameter for the type "${type}".`, new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
                return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](0, type);
            }
        }
        if (params.length === 0 || ![
            'bool',
            'float',
            'int',
            'uint'
        ].includes(type) && params.every((param)=>{
            const paramType = typeof param;
            return paramType !== 'object' && paramType !== 'function';
        })) {
            params = [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$NodeUtils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueFromType"])(type, ...params)
            ];
        }
        if (params.length === 1 && cacheMap !== null && cacheMap.has(params[0])) {
            return nodeObjectIntent(cacheMap.get(params[0]));
        }
        if (params.length === 1) {
            const node = getConstNode(params[0], type);
            if (node.nodeType === type) return nodeObjectIntent(node);
            return nodeObjectIntent(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ConvertNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](node, type));
        }
        const nodes = params.map((param)=>getConstNode(param));
        return nodeObjectIntent(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$JoinNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](nodes, type));
    };
};
const defined = (v)=>typeof v === 'object' && v !== null ? v.value : v; // TODO: remove boolean conversion and defined function
const getConstNodeType = (value)=>value !== undefined && value !== null ? value.nodeType || value.convertTo || (typeof value === 'string' ? value : null) : null;
function ShaderNode(jsFunc, nodeType) {
    return new ShaderNodeInternal(jsFunc, nodeType);
}
const nodeObject = (val, altType = null)=>/* new */ ShaderNodeObject(val, altType);
const nodeObjectIntent = (val, altType = null)=>/* new */ nodeObject(val, altType).toVarIntent();
const nodeObjects = (val, altType = null)=>new ShaderNodeObjects(val, altType);
const nodeArray = (val, altType = null)=>new ShaderNodeArray(val, altType);
const nodeProxy = (NodeClass, scope = null, factor = null, settings = null)=>new ShaderNodeProxy(NodeClass, scope, factor, settings);
const nodeImmutable = (NodeClass, ...params)=>new ShaderNodeImmutable(NodeClass, ...params);
const nodeProxyIntent = (NodeClass, scope = null, factor = null, settings = {})=>new ShaderNodeProxy(NodeClass, scope, factor, {
        ...settings,
        intent: true
    });
let fnId = 0;
class FnNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$Node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    constructor(jsFunc, layout = null){
        super();
        let nodeType = null;
        if (layout !== null) {
            if (typeof layout === 'object') {
                nodeType = layout.return;
            } else {
                if (typeof layout === 'string') {
                    nodeType = layout;
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])('TSL: Invalid layout type.', new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
                }
                layout = null;
            }
        }
        this.shaderNode = new ShaderNode(jsFunc, nodeType);
        if (layout !== null) {
            this.setLayout(layout);
        }
        this.isFn = true;
    }
    setLayout(layout) {
        const nodeType = this.shaderNode.nodeType;
        if (typeof layout.inputs !== 'object') {
            const fullLayout = {
                name: 'fn' + fnId++,
                type: nodeType,
                inputs: []
            };
            for(const name in layout){
                if (name === 'return') continue;
                fullLayout.inputs.push({
                    name: name,
                    type: layout[name]
                });
            }
            layout = fullLayout;
        }
        this.shaderNode.setLayout(layout);
        return this;
    }
    getNodeType(builder) {
        return this.shaderNode.getNodeType(builder) || 'float';
    }
    call(...params) {
        const fnCall = this.shaderNode.call(params);
        if (this.shaderNode.nodeType === 'void') fnCall.toStack();
        return fnCall.toVarIntent();
    }
    once(subBuilds = null) {
        this.shaderNode.once = true;
        this.shaderNode.subBuilds = subBuilds;
        return this;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"])('TSL: "Fn()" was declared but not invoked. Try calling it like "Fn()( ...params )".', this.stackTrace);
        return builder.generateConst(type);
    }
}
function Fn(jsFunc, layout = null) {
    const instance = new FnNode(jsFunc, layout);
    return new Proxy(()=>{}, {
        apply (target, thisArg, params) {
            return instance.call(...params);
        },
        get (target, prop, receiver) {
            return Reflect.get(instance, prop, receiver);
        },
        set (target, prop, value, receiver) {
            return Reflect.set(instance, prop, value, receiver);
        }
    });
}
const setCurrentStack = (stack)=>{
    if (currentStack === stack) {
    //throw new Error( 'Stack already defined.' );
    }
    currentStack = stack;
};
const getCurrentStack = ()=>currentStack;
const If = (...params)=>currentStack.If(...params);
const Switch = (...params)=>currentStack.Switch(...params);
function Stack(node) {
    if (currentStack) currentStack.addToStack(node);
    return node;
}
addMethodChaining('toStack', Stack);
const color = new ConvertType('color');
const float = new ConvertType('float', cacheMaps.float);
const int = new ConvertType('int', cacheMaps.ints);
const uint = new ConvertType('uint', cacheMaps.uint);
const bool = new ConvertType('bool', cacheMaps.bool);
const vec2 = new ConvertType('vec2');
const ivec2 = new ConvertType('ivec2');
const uvec2 = new ConvertType('uvec2');
const bvec2 = new ConvertType('bvec2');
const vec3 = new ConvertType('vec3');
const ivec3 = new ConvertType('ivec3');
const uvec3 = new ConvertType('uvec3');
const bvec3 = new ConvertType('bvec3');
const vec4 = new ConvertType('vec4');
const ivec4 = new ConvertType('ivec4');
const uvec4 = new ConvertType('uvec4');
const bvec4 = new ConvertType('bvec4');
const mat2 = new ConvertType('mat2');
const mat3 = new ConvertType('mat3');
const mat4 = new ConvertType('mat4');
const string = (value = '')=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](value, 'string');
const arrayBuffer = (value)=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$ConstNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](value, 'ArrayBuffer');
addMethodChaining('toColor', color);
addMethodChaining('toFloat', float);
addMethodChaining('toInt', int);
addMethodChaining('toUint', uint);
addMethodChaining('toBool', bool);
addMethodChaining('toVec2', vec2);
addMethodChaining('toIVec2', ivec2);
addMethodChaining('toUVec2', uvec2);
addMethodChaining('toBVec2', bvec2);
addMethodChaining('toVec3', vec3);
addMethodChaining('toIVec3', ivec3);
addMethodChaining('toUVec3', uvec3);
addMethodChaining('toBVec3', bvec3);
addMethodChaining('toVec4', vec4);
addMethodChaining('toIVec4', ivec4);
addMethodChaining('toUVec4', uvec4);
addMethodChaining('toBVec4', bvec4);
addMethodChaining('toMat2', mat2);
addMethodChaining('toMat3', mat3);
addMethodChaining('toMat4', mat4);
const element = /*@__PURE__*/ nodeProxy(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ArrayElementNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]).setParameterLength(2);
const convert = (node, types)=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$ConvertNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](nodeObject(node), types);
const split = (node, channels)=>new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$utils$2f$SplitNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](nodeObject(node), channels);
addMethodChaining('element', element);
addMethodChaining('convert', convert);
const append = (node)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('TSL: append() has been renamed to Stack().', new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
    return Stack(node);
};
addMethodChaining('append', (node)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('TSL: .append() has been renamed to .toStack().', new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
    return Stack(node);
});
}),
"[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/math/OperatorNode.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "and",
    ()=>and,
    "bitAnd",
    ()=>bitAnd,
    "bitNot",
    ()=>bitNot,
    "bitOr",
    ()=>bitOr,
    "bitXor",
    ()=>bitXor,
    "decrement",
    ()=>decrement,
    "decrementBefore",
    ()=>decrementBefore,
    "default",
    ()=>__TURBOPACK__default__export__,
    "div",
    ()=>div,
    "equal",
    ()=>equal,
    "greaterThan",
    ()=>greaterThan,
    "greaterThanEqual",
    ()=>greaterThanEqual,
    "increment",
    ()=>increment,
    "incrementBefore",
    ()=>incrementBefore,
    "lessThan",
    ()=>lessThan,
    "lessThanEqual",
    ()=>lessThanEqual,
    "mod",
    ()=>mod,
    "modInt",
    ()=>modInt,
    "mul",
    ()=>mul,
    "not",
    ()=>not,
    "notEqual",
    ()=>notEqual,
    "or",
    ()=>or,
    "shiftLeft",
    ()=>shiftLeft,
    "shiftRight",
    ()=>shiftRight,
    "sub",
    ()=>sub,
    "xor",
    ()=>xor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/TempNode.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/core/StackTrace.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/nodes/tsl/TSLCore.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Dokumen/Hacktiv8/phase 3/FINAL_PROJECT/client/my-app/node_modules/three/src/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
const _vectorOperators = {
    '==': 'equal',
    '!=': 'notEqual',
    '<': 'lessThan',
    '>': 'greaterThan',
    '<=': 'lessThanEqual',
    '>=': 'greaterThanEqual',
    '%': 'mod'
};
/**
 * This node represents basic mathematical and logical operations like addition,
 * subtraction or comparisons (e.g. `equal()`).
 *
 * @augments TempNode
 */ class OperatorNode extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$TempNode$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] {
    static get type() {
        return 'OperatorNode';
    }
    /**
	 * Constructs a new operator node.
	 *
	 * @param {string} op - The operator.
	 * @param {Node} aNode - The first input.
	 * @param {Node} bNode - The second input.
	 * @param {...Node} params - Additional input parameters.
	 */ constructor(op, aNode, bNode, ...params){
        super();
        if (params.length > 0) {
            let finalOp = new OperatorNode(op, aNode, bNode);
            for(let i = 0; i < params.length - 1; i++){
                finalOp = new OperatorNode(op, finalOp, params[i]);
            }
            aNode = finalOp;
            bNode = params[params.length - 1];
        }
        /**
		 * The operator.
		 *
		 * @type {string}
		 */ this.op = op;
        /**
		 * The first input.
		 *
		 * @type {Node}
		 */ this.aNode = aNode;
        /**
		 * The second input.
		 *
		 * @type {Node}
		 */ this.bNode = bNode;
        /**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */ this.isOperatorNode = true;
    }
    /**
	 * Returns the operator method name.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {string} output - The output type.
	 * @returns {string} The operator method name.
	 */ getOperatorMethod(builder, output) {
        return builder.getMethod(_vectorOperators[this.op], output);
    }
    /**
	 * This method is overwritten since the node type is inferred from the operator
	 * and the input node types.
	 *
	 * @param {NodeBuilder} builder - The current node builder.
	 * @param {?string} [output=null] - The output type.
	 * @return {string} The node type.
	 */ getNodeType(builder, output = null) {
        const op = this.op;
        const aNode = this.aNode;
        const bNode = this.bNode;
        const typeA = aNode.getNodeType(builder);
        const typeB = bNode ? bNode.getNodeType(builder) : null;
        if (typeA === 'void' || typeB === 'void') {
            return output || 'void';
        } else if (op === '%') {
            return typeA;
        } else if (op === '~' || op === '&' || op === '|' || op === '^' || op === '>>' || op === '<<') {
            return builder.getIntegerType(typeA);
        } else if (op === '!' || op === '&&' || op === '||' || op === '^^') {
            return 'bool';
        } else if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
            const typeLength = Math.max(builder.getTypeLength(typeA), builder.getTypeLength(typeB));
            return typeLength > 1 ? `bvec${typeLength}` : 'bool';
        } else {
            // Handle matrix operations
            if (builder.isMatrix(typeA)) {
                if (typeB === 'float') {
                    return typeA; // matrix * scalar = matrix
                } else if (builder.isVector(typeB)) {
                    return builder.getVectorFromMatrix(typeA); // matrix * vector
                } else if (builder.isMatrix(typeB)) {
                    return typeA; // matrix * matrix
                }
            } else if (builder.isMatrix(typeB)) {
                if (typeA === 'float') {
                    return typeB; // scalar * matrix = matrix
                } else if (builder.isVector(typeA)) {
                    return builder.getVectorFromMatrix(typeB); // vector * matrix
                }
            }
            // Handle non-matrix cases
            if (builder.getTypeLength(typeB) > builder.getTypeLength(typeA)) {
                // anytype x anytype: use the greater length vector
                return typeB;
            }
            return typeA;
        }
    }
    generate(builder, output) {
        const op = this.op;
        const { aNode, bNode } = this;
        const type = this.getNodeType(builder, output);
        let typeA = null;
        let typeB = null;
        if (type !== 'void') {
            typeA = aNode.getNodeType(builder);
            typeB = bNode ? bNode.getNodeType(builder) : null;
            if (op === '<' || op === '>' || op === '<=' || op === '>=' || op === '==' || op === '!=') {
                if (builder.isVector(typeA)) {
                    typeB = typeA;
                } else if (builder.isVector(typeB)) {
                    typeA = typeB;
                } else if (typeA !== typeB) {
                    typeA = typeB = 'float';
                }
            } else if (op === '>>' || op === '<<') {
                typeA = type;
                typeB = builder.changeComponentType(typeB, 'uint');
            } else if (op === '%') {
                typeA = type;
                typeB = builder.isInteger(typeA) && builder.isInteger(typeB) ? typeB : typeA;
            } else if (builder.isMatrix(typeA)) {
                if (typeB === 'float') {
                    // Keep matrix type for typeA, but ensure typeB stays float
                    typeB = 'float';
                } else if (builder.isVector(typeB)) {
                    // matrix x vector
                    typeB = builder.getVectorFromMatrix(typeA);
                } else if (builder.isMatrix(typeB)) {
                // matrix x matrix - keep both types
                } else {
                    typeA = typeB = type;
                }
            } else if (builder.isMatrix(typeB)) {
                if (typeA === 'float') {
                    // Keep matrix type for typeB, but ensure typeA stays float
                    typeA = 'float';
                } else if (builder.isVector(typeA)) {
                    // vector x matrix
                    typeA = builder.getVectorFromMatrix(typeB);
                } else {
                    typeA = typeB = type;
                }
            } else {
                // anytype x anytype
                typeA = typeB = type;
            }
        } else {
            typeA = typeB = type;
        }
        const a = aNode.build(builder, typeA);
        const b = bNode ? bNode.build(builder, typeB) : null;
        const fnOpSnippet = builder.getFunctionOperator(op);
        if (output !== 'void') {
            const isGLSL = builder.renderer.coordinateSystem === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebGLCoordinateSystem"];
            if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
                if (isGLSL) {
                    if (builder.isVector(typeA)) {
                        return builder.format(`${this.getOperatorMethod(builder, output)}( ${a}, ${b} )`, type, output);
                    } else {
                        return builder.format(`( ${a} ${op} ${b} )`, type, output);
                    }
                } else {
                    // WGSL
                    return builder.format(`( ${a} ${op} ${b} )`, type, output);
                }
            } else if (op === '%') {
                if (builder.isInteger(typeB)) {
                    return builder.format(`( ${a} % ${b} )`, type, output);
                } else {
                    return builder.format(`${this.getOperatorMethod(builder, type)}( ${a}, ${b} )`, type, output);
                }
            } else if (op === '!' || op === '~') {
                return builder.format(`(${op}${a})`, typeA, output);
            } else if (fnOpSnippet) {
                return builder.format(`${fnOpSnippet}( ${a}, ${b} )`, type, output);
            } else {
                // Handle matrix operations
                if (builder.isMatrix(typeA) && typeB === 'float') {
                    return builder.format(`( ${b} ${op} ${a} )`, type, output);
                } else if (typeA === 'float' && builder.isMatrix(typeB)) {
                    return builder.format(`${a} ${op} ${b}`, type, output);
                } else {
                    let snippet = `( ${a} ${op} ${b} )`;
                    if (!isGLSL && type === 'bool' && builder.isVector(typeA) && builder.isVector(typeB)) {
                        snippet = `all${snippet}`;
                    }
                    return builder.format(snippet, type, output);
                }
            }
        } else if (typeA !== 'void') {
            if (fnOpSnippet) {
                return builder.format(`${fnOpSnippet}( ${a}, ${b} )`, type, output);
            } else {
                if (builder.isMatrix(typeA) && typeB === 'float') {
                    return builder.format(`${b} ${op} ${a}`, type, output);
                } else {
                    return builder.format(`${a} ${op} ${b}`, type, output);
                }
            }
        }
    }
    serialize(data) {
        super.serialize(data);
        data.op = this.op;
    }
    deserialize(data) {
        super.deserialize(data);
        this.op = data.op;
    }
}
const __TURBOPACK__default__export__ = OperatorNode;
const add = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '+').setParameterLength(2, Infinity).setName('add');
const sub = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '-').setParameterLength(2, Infinity).setName('sub');
const mul = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '*').setParameterLength(2, Infinity).setName('mul');
const div = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '/').setParameterLength(2, Infinity).setName('div');
const mod = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '%').setParameterLength(2).setName('mod');
const equal = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '==').setParameterLength(2).setName('equal');
const notEqual = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '!=').setParameterLength(2).setName('notEqual');
const lessThan = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '<').setParameterLength(2).setName('lessThan');
const greaterThan = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '>').setParameterLength(2).setName('greaterThan');
const lessThanEqual = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '<=').setParameterLength(2).setName('lessThanEqual');
const greaterThanEqual = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '>=').setParameterLength(2).setName('greaterThanEqual');
const and = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '&&').setParameterLength(2, Infinity).setName('and');
const or = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '||').setParameterLength(2, Infinity).setName('or');
const not = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '!').setParameterLength(1).setName('not');
const xor = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '^^').setParameterLength(2).setName('xor');
const bitAnd = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '&').setParameterLength(2).setName('bitAnd');
const bitNot = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '~').setParameterLength(1).setName('bitNot');
const bitOr = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '|').setParameterLength(2).setName('bitOr');
const bitXor = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '^').setParameterLength(2).setName('bitXor');
const shiftLeft = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '<<').setParameterLength(2).setName('shiftLeft');
const shiftRight = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nodeProxyIntent"])(OperatorNode, '>>').setParameterLength(2).setName('shiftRight');
const incrementBefore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fn"])(([a])=>{
    a.addAssign(1);
    return a;
});
const decrementBefore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fn"])(([a])=>{
    a.subAssign(1);
    return a;
});
const increment = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fn"])(([a])=>{
    const temp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["int"])(a).toConst();
    a.addAssign(1);
    return temp;
});
const decrement = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fn"])(([a])=>{
    const temp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["int"])(a).toConst();
    a.subAssign(1);
    return temp;
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('add', add);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('sub', sub);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('mul', mul);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('div', div);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('mod', mod);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('equal', equal);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('notEqual', notEqual);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('lessThan', lessThan);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('greaterThan', greaterThan);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('lessThanEqual', lessThanEqual);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('greaterThanEqual', greaterThanEqual);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('and', and);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('or', or);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('not', not);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('xor', xor);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('bitAnd', bitAnd);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('bitNot', bitNot);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('bitOr', bitOr);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('bitXor', bitXor);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('shiftLeft', shiftLeft);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('shiftRight', shiftRight);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('incrementBefore', incrementBefore);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('decrementBefore', decrementBefore);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('increment', increment);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('decrement', decrement);
const modInt = (a, b)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])('TSL: "modInt()" is deprecated. Use "mod( int( ... ) )" instead.', new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$core$2f$StackTrace$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]());
    return mod((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["int"])(a), (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["int"])(b));
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Dokumen$2f$Hacktiv8$2f$phase__3$2f$FINAL_PROJECT$2f$client$2f$my$2d$app$2f$node_modules$2f$three$2f$src$2f$nodes$2f$tsl$2f$TSLCore$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMethodChaining"])('modInt', modInt);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b038821._.js.map