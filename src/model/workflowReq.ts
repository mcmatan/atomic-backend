export interface WorkflowRunnerReq {
    userId: string, workflowName: string, idempotencyKey: string, stepId: string, url: string
}
