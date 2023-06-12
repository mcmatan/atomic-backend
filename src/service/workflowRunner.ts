import {Workflow} from "@prisma/client";
import {findWorkflow} from "../db/findWorkflow";
import {WorkflowRunnerReq} from "../model/workflowReq";
import {createWorkflowWithStep} from "../db/createWorkflowWithStep";
import axios from "axios";
import {updateWorkflowAndStep} from "../db/updateWorkflowAndStep";

class WorkflowRunner {
    async invokeWorkflowUrl(url: string) {
        const response = await axios.get(url);
        return response.data;
    }

    public async runWorkflow(workflowRunnerReq: WorkflowRunnerReq) {
        const isFirstStep = !!(await findWorkflow(
            workflowRunnerReq.userId,
            workflowRunnerReq.workflowName,
            workflowRunnerReq.idempotencyKey));

        await createWorkflowWithStep(workflowRunnerReq);
        const res = this.invokeWorkflowUrl(workflowRunnerReq.url);
        await updateWorkflowAndStep(workflowRunnerReq.workflowName, workflowRunnerReq.stepId, res, isFirstStep);
        return res;
    }
}

export const workflowService = new WorkflowRunner();

