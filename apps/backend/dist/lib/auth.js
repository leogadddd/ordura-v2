"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.authenticate = authenticate;
const bcrypt_1 = require("bcrypt");
async function hashPassword(password) {
    return bcrypt_1.default.hash(password, 10);
}
async function comparePassword(password, hash) {
    return bcrypt_1.default.compare(password, hash);
}
async function authenticate(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
}
//# sourceMappingURL=auth.js.map