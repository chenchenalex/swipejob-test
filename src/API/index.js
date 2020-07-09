// This file is for all external API methods
import { WORKER_ID, WORKER_API } from "../constants";

export async function getUserProfile() {
  try {
    const response = await fetch(`${WORKER_API}/${WORKER_ID}/profile`);
    return await response.json();
  } catch (e) {
    return {};
  }
}

export async function getUserMatches(workerId) {
  try {
    const response = await fetch(`${WORKER_API}/${workerId}/matches`);
    return await response.json();
  } catch (e) {
    return {};
  }
}

export async function acceptJob(workerId, jobId) {
  try {
    const response = await fetch(`${WORKER_API}/${workerId}/job/${jobId}/accept`);
    return await response.json();
  } catch (e) {
    return {};
  }
}

export async function rejectJob(workerId, jobId) {
  try {
    const response = await fetch(`${WORKER_API}/${workerId}/job/${jobId}/reject`);
    return await response.json();
  } catch (e) {
    return {};
  }
}