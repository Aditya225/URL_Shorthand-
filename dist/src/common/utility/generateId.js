"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeBase62 = encodeBase62;
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function encodeBase62(num) {
    let str = "";
    const base = chars.length;
    while (num > 0) {
        str = [num % base] + str;
        num = Math.floor(num / base);
    }
    return str || "a";
}
//# sourceMappingURL=generateId.js.map