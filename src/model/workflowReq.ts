export interface WorkflowRunnerReq {
    userId: string, workflowName: string, idempotencyKey: string, stepName: string, url: string
}
