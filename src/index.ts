import express from 'express';
import {workflowService} from "./service/workflowRunner";

const app = express();
const port = 3000;

app.use(express.json());
app.post('/user/:userId/workflows/:workflowName/steps/:stepId', async (req, res) => {
    const { workflowName, stepId, userId } = req.params;
    const { idempotencyKey, payload, url } = req.body;

    try {
        const res = await workflowService.runWorkflow({userId, workflowName, idempotencyKey, stepId, url});
        res.json({ value: res });
    } catch (error) {
        res.status(500).json({ error: 'Internal error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
