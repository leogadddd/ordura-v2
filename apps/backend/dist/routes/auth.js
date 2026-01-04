"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../lib/auth");
async function authRoutes(server) {
    server.post('/register', async (request, reply) => {
        const { email, username, password, firstName, lastName } = request.body;
        const existingUser = await prisma_1.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            return reply.code(409).send({
                success: false,
                error: 'Email or username already exists',
            });
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                firstName,
                lastName,
            },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
        return reply.code(201).send({
            success: true,
            data: user,
        });
    });
    server.post('/login', async (request, reply) => {
        const { usernameOrEmail, password } = request.body;
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
                isActive: true,
            },
        });
        if (!user) {
            return reply.code(401).send({
                success: false,
                error: 'Invalid credentials',
            });
        }
        const isValid = await (0, auth_1.comparePassword)(password, user.password);
        if (!isValid) {
            return reply.code(401).send({
                success: false,
                error: 'Invalid credentials',
            });
        }
        const accessToken = server.jwt.sign({
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
        const refreshToken = server.jwt.sign({
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await prisma_1.prisma.session.create({
            data: {
                userId: user.id,
                refreshToken,
                expiresAt,
            },
        });
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });
        return reply.send({
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
            },
        });
    });
    server.post('/refresh', async (request, reply) => {
        const { refreshToken } = request.body;
        let payload;
        try {
            payload = server.jwt.verify(refreshToken);
        }
        catch {
            return reply.code(401).send({
                success: false,
                error: 'Invalid refresh token',
            });
        }
        const session = await prisma_1.prisma.session.findUnique({
            where: { refreshToken },
            include: { user: true },
        });
        if (!session || session.expiresAt < new Date()) {
            return reply.code(401).send({
                success: false,
                error: 'Refresh token expired or invalid',
            });
        }
        const accessToken = server.jwt.sign({
            sub: session.user.id,
            email: session.user.email,
            username: session.user.username,
            role: session.user.role,
        }, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
        return reply.send({
            success: true,
            data: { accessToken },
        });
    });
    server.post('/logout', async (request, reply) => {
        const { refreshToken } = request.body;
        await prisma_1.prisma.session.delete({
            where: { refreshToken },
        });
        return reply.send({
            success: true,
            data: { message: 'Logged out successfully' },
        });
    });
    server.get('/me', {
        onRequest: async (request, reply) => {
            try {
                await request.jwtVerify();
            }
            catch (err) {
                reply.code(401).send({ error: 'Unauthorized' });
            }
        },
    }, async (request, reply) => {
        const { sub } = request.user;
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: sub },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
        return reply.send({
            success: true,
            data: user,
        });
    });
}
//# sourceMappingURL=auth.js.map