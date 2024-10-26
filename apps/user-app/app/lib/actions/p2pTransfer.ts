"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const FromName = session.user.name;
    const from = session?.user?.id;

    if (!from) {
        return {
            message: "Error while sending",
            success: false
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found",
            success: false
        };
    }

    try {
        await prisma.$transaction(async (tx) => {
            // Lock the balance of the sender to avoid race conditions
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            // Get the sender's balance
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });

            // Check if the sender has enough funds
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }

            // Deduct the amount from sender's balance
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: Number(amount) } },
            });

            // Add the amount to recipient's balance
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: Number(amount) } },
            });

            // Record the P2P transfer
            await tx.p2pTransfer.create({
                data: {
                    amount: Number(amount),
                    FromName: FromName,
                    FromUser: Number(from),
                    ToName: toUser.name,
                    ToUser: Number(toUser.id),
                    timestamp: new Date(),
                },
            });
        });

        // Return success message after transaction completion
        return {
            message: `Transfer of ₹${amount / 100} to ${toUser.name} was successful!`,
            success: true
        };

    } catch (error) {
        // Handle errors and return failure message
        return {
            message: "Error while processing the transaction.",
            success: false
        };
    }
}
