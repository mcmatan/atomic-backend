import {prismaClient} from "./prismaClient";

export async function getAllWorkflows() {
    return await prismaClient.workflow.findMany({})

}
