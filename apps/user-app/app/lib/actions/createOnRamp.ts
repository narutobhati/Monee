"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRamp(provider: any, amount: number) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;

    if (!userId) {
        return { msg: "User not logged in" };
    }

    const onRamp = await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: Number(amount),
            status: "Processing",
            startTime: new Date(),
            provider: provider,
            token: token,
        },
    });

    return {
        userId:onRamp.userId,
        token: onRamp.token,
        amount: onRamp.amount,
        provider: onRamp.provider,
    };
}
