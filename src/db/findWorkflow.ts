import {prismaClient} from "./prismaClient";

export async function findWorkflow(userId: string, workflowName: string, idempotencyKey: string) {
    return await prismaClient.workflow.findFirst({
        where: {
            userId: userId,
            name: workflowName,
            idempotentKey: idempotencyKey
        }
    })

}
