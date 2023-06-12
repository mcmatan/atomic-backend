import {prismaClient} from "./prismaClient";

export async function updateWorkflowAndStepWithResult(workflowName: string, idempotentKey: string, stepName: string, result: any, markWorkFlowCompleted: boolean) {
    await prismaClient.$transaction(async (transaction) => {
        if (markWorkFlowCompleted) {
            await transaction.workflow.updateMany({
                where: {name: workflowName, idempotentKey: idempotentKey},
                data: {completedDate: new Date(), result},
            });
        }

        const workflow = await transaction.workflow.findFirst({
            where: {name: workflowName, idempotentKey: idempotentKey},
        });

        if (!workflow) {
            throw new Error(`work flow does not exists ${{name: workflowName, idempotentKey: idempotentKey}}`);
        }

        await transaction.step.updateMany({
            where: {name: stepName, workflowId: workflow.id},
            data: {result, completedDate: new Date()},
        });
    });
}
