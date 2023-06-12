import {resetDb} from "./utils/resetDb";
import {workflowService} from "../src/service/workflowRunner";
import {getAllWorkflows} from "../src/db/getAllWorkflows";
import {prismaClient} from "../src/db/prismaClient";
import { User } from "@prisma/client";
import {faker} from "@faker-js/faker";
import {invokeWorkflowUrl} from "../src/service/helprs/invokeWorkflowUrl";
import Mock = jest.Mock;

jest.mock('../src/service/helprs/invokeWorkflowUrl');


describe('work flow runner', () => {
    let userId: string = '';
    (invokeWorkflowUrl as Mock).mockReturnValue({res: 'foo'});
    beforeEach(async () => {
        await resetDb();
        const user: User = await prismaClient.user.create({data: {
                email: faker.internet.email(),
                userName: faker.internet.userName()
            }});
        userId = user.id;
    })
    describe('runWorkflow()', () => {
        describe('Given called with workflow with 1 step', () => {
            let res: any = null;
            beforeEach(async () => {
                res = await workflowService.runWorkflow({
                    userId: userId, workflowName: 'workflowName', idempotencyKey: 'idempotencyKey', stepName: 'stepId', url: 'url'
                });
            })
            it('should create a new workdlow and step', async () => {
                const workflow = await getAllWorkflows();
                const firstWorkflow = workflow[0];
                expect(workflow).toHaveLength(1);
                expect(firstWorkflow.url).toEqual('url');
            });
            it('should call the client back using the workflow step url', () => {
                expect(invokeWorkflowUrl).toBeCalledTimes(1);
            })
            it('should return result back to client from original request', () => {
                expect(res).toEqual({res: 'foo'});
            })
        });
        describe('Given called with workflow with 2 steps', () => {
            beforeEach(async () => {
                (invokeWorkflowUrl as Mock).mockReturnValueOnce({res: 'firstRes'});
                (invokeWorkflowUrl as Mock).mockReturnValueOnce({res: 'secondRes'});
                const [res1, res2] = await Promise.all([
                    await workflowService.runWorkflow({
                        userId: userId, workflowName: 'workflowName', idempotencyKey: 'idempotencyKey', stepName: 'stepName1', url: 'url1'
                    }),
                    await workflowService.runWorkflow({
                        userId: userId, workflowName: 'workflowName', idempotencyKey: 'idempotencyKey', stepName: 'stepName2', url: 'url2'
                    })
                ])
            });
            describe('Given first and second step called', () => {
                it('should have return first ', () => {

                });
            })
        })
    })
})

/*

Single:
                Client -> Server HANGING
                Server -> Client 200
                Server -> Client again for number 1 200
                Client -> Server initial should receive response

Double:
                Client -> Server HANGING
                Server -> Client 200
                Server -> Client again for number 1 (Hanging)
                Client -> Server for number 2 200
                Server -> Client for number 2 200
                Server -> Client again for number 1 200
                Client -> Server initial should receive response

 */
