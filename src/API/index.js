// This file is for all external API methods
import { WORKER_ID, WORKER_API } from "../constants";

import { useState, useEffect, useRef } from "react";

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

// TODO: This custom hook centralizes and streamlines handling of HTTP calls
export default function useFetch(url, init) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevInit = useRef();
  const prevUrl = useRef();

  useEffect(() => {
  // Only refetch if url or init params change.
    if (prevUrl.current === url && prevInit.current === init) return;
    prevUrl.current = url;
    prevInit.current = init;
    fetch(WORKER_API + url, init)
      .then(response => {
        if (response.ok) return response.json();
        setError(response);
      })
      .then(data => setData(data))
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [init, url]);

  return { data, loading, error };
}