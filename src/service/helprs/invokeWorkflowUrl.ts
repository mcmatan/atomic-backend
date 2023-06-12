import axios from "axios";

export async function invokeWorkflowUrl(url: string) {
    const response = await axios.get(url);
    return response.data;
}
