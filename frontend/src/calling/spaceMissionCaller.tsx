export function getSpaceMissions(user: { token: string }): Promise<any[]> {
  const sentUrl = "http://localhost:8080/spaceMission/list";

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch astronauts: ${response.statusText}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}


import { SpaceMission } from "../data-types/entities";

export function filterSpaceMissions(filters: { minBudget?: number; maxBudget?: number; minCreateDate?: string; maxCreateDate?: string; minPerformDate?: string; maxPerformDate?: string }): Promise<SpaceMission[]> {
  const query = new URLSearchParams(filters as any).toString();
  const sentUrl = `http://localhost:8080/spaceMission/filterMissions?${query}`;

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch space missions: ${response.statusText}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}