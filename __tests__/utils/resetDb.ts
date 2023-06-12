import {prismaClient} from "../../src/db/prismaClient";

export async function resetDb() {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Not a test flow');

        await prismaClient.$transaction([prismaClient.step.deleteMany()]);
        await prismaClient.$transaction([prismaClient.workflow.deleteMany()]);
        await prismaClient.$transaction([prismaClient.user.deleteMany()]);
    }
}
