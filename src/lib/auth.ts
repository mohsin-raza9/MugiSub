import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { Resend } from "resend";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: user.email,
                subject: "Reset your password",
                html: `Click <a href="${url}">here</a> to reset your password.`,
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: user.email,
                subject: "Verify your email address",
                html: `Click <a href="${url}">here</a> to verify your email.`,
            });
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "User",
                input: false,
            },
            signature: {
                type: "string",
                required: false,
                input: true,
            }
        }
    }
});