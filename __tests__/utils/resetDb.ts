import {prismaClient} from "../../src/db/prismaClient";

export async function resetDb() {
    await prismaClient.$transaction([prismaClient.step.deleteMany()]);
    await prismaClient.$transaction([prismaClient.workflow.deleteMany()]);
    await prismaClient.$transaction([prismaClient.user.deleteMany()]);
}
