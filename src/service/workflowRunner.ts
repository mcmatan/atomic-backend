import {Workflow} from "@prisma/client";
import {findWorkflow} from "../db/findWorkflow";
import {WorkflowRunnerReq} from "../model/workflowReq";
import {createWorkflowWithStep} from "../db/createWorkflowWithStep";
import axios from "axios";
import {updateWorkflowAndStepWithResult} from "../db/updateWorkflowAndStepWithResult";
import {invokeWorkflowUrl} from "./helprs/invokeWorkflowUrl";

class WorkflowRunner {
    public async runWorkflow(workflowRunnerReq: WorkflowRunnerReq) {
        const isFirstStep = !!(await findWorkflow(
            workflowRunnerReq.userId,
            workflowRunnerReq.workflowName,
            workflowRunnerReq.idempotencyKey));

        await createWorkflowWithStep(workflowRunnerReq);
        const res = await invokeWorkflowUrl(workflowRunnerReq.url);
        await updateWorkflowAndStepWithResult(workflowRunnerReq.workflowName, workflowRunnerReq.idempotencyKey, workflowRunnerReq.stepName, res, isFirstStep);
        return res;
    }
}

export const workflowService = new WorkflowRunner();

