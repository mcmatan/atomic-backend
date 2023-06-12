import {prismaClient} from "./prismaClient";
import {WorkflowRunnerReq} from "../model/workflowReq";

export async function createWorkflowWithStep(workflowRunnerReq: WorkflowRunnerReq) {
    let workflow;

    await prismaClient.$transaction(async (transaction) => {
        workflow = await transaction.workflow.findFirst({
            where: { userId: workflowRunnerReq.userId, name: workflowRunnerReq.workflowName },
        });
        if (!workflow) {
            workflow = await transaction.workflow.create({
                data: {
                    url: workflowRunnerReq.url,
                    idempotentKey: workflowRunnerReq.idempotencyKey,
                    name: workflowRunnerReq.workflowName,
                    user: { connect: { id: workflowRunnerReq.userId } },
                },
            });
        }

        await transaction.step.create({
            data: {
                url: workflowRunnerReq.url,
                name: workflowRunnerReq.stepName,
                workflow: { connect: { id: workflow.id } },
            },
        });
    });

    return workflow;
}
