import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../lib/auth";

export async function authRoutes(server: FastifyInstance) {
  // Register
  server.post<{
    Body: {
      email: string;
      username: string;
      password: string;
      firstName?: string;
      lastName?: string;
    };
  }>("/register", async (request, reply) => {
    const { email, username, password, firstName, lastName } = request.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return reply.code(409).send({
        success: false,
        error: "Email or username already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
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

  // Login
  server.post<{
    Body: {
      usernameOrEmail: string;
      password: string;
    };
  }>("/login", async (request, reply) => {
    const { usernameOrEmail, password } = request.body;

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        isActive: true,
      },
    });

    if (!user) {
      return reply.code(401).send({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return reply.code(401).send({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = server.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = server.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    // Update last login
    await prisma.user.update({
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

  // Refresh token
  server.post<{
    Body: {
      refreshToken: string;
    };
  }>("/refresh", async (request, reply) => {
    const { refreshToken } = request.body;

    // Verify refresh token
    let payload: any;
    try {
      payload = server.jwt.verify(refreshToken);
    } catch {
      return reply.code(401).send({
        success: false,
        error: "Invalid refresh token",
      });
    }

    // Check if token exists in database
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return reply.code(401).send({
        success: false,
        error: "Refresh token expired or invalid",
      });
    }

    // Generate new access token
    const accessToken = server.jwt.sign(
      {
        sub: session.user.id,
        email: session.user.email,
        username: session.user.username,
        role: session.user.role,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    return reply.send({
      success: true,
      data: { accessToken },
    });
  });

  // Logout
  server.post<{
    Body: {
      refreshToken: string;
    };
  }>("/logout", async (request, reply) => {
    const { refreshToken } = request.body;

    await prisma.session.delete({
      where: { refreshToken },
    });

    return reply.send({
      success: true,
      data: { message: "Logged out successfully" },
    });
  });

  // Get current user (protected route)
  server.get(
    "/me",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.code(401).send({ error: "Unauthorized" });
        }
      },
    },
    async (request, reply) => {
      const { sub } = request.user as any;

      const user = await prisma.user.findUnique({
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
    }
  );
}
