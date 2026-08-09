import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { Resend } from "resend";
import React from "react";
import { VerificationEmail } from "../emails/VerificationEmail";

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
            const getAppUrl = () => {
                if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
                if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
                return process.env.BETTER_AUTH_URL || "http://localhost:3000";
            };
            const appUrl = getAppUrl();
            
            // Rewrite local verification links to secure production links if running in prod
            const secureUrl = url.startsWith("http://localhost") && appUrl.startsWith("https")
                ? url.replace(/https?:\/\/localhost:\d+/, appUrl)
                : url;

            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: user.email,
                subject: "Verify your email address",
                react: React.createElement(VerificationEmail, {
                    userName: user.name || undefined,
                    verificationUrl: secureUrl,
                    companyLogoUrl: `${appUrl}/logo-small.png`,
                }),
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