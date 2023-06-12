import {prismaClient} from "./prismaClient";

export async function updateWorkflowAndStep(workflowId: string, stepId: string, result: any, markWorkFlowCompleted: boolean) {
    await prismaClient.$transaction(async (transaction) => {
        if (markWorkFlowCompleted) {
            await transaction.workflow.update({
                where: {id: workflowId},
                data: {completedDate: new Date(), result},
            });
        }

        await transaction.step.update({
            where: {id: stepId},
            data: {result, completedDate: new Date()},
        });
    });
}
