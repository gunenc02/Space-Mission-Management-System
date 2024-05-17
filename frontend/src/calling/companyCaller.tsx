export function getCompanies(user: { token: string }): Promise<any[]> {
  const sentUrl = "http://localhost:8080/company/list";

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

export function offerJob(
  astronautId: number,
  user: { token: string }
): Promise<void> {
  const sentUrl = `http://localhost:8080/company/offerJob/${astronautId}`;

  return fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Job offered successfully");
      } else {
        throw new Error(`Failed to offer job: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function getCompanyProfile(
  id: number,
  user: { token: string | null }
): Promise<any> {
  const sentUrl = `http://localhost:8080/company/profile/${id}`;

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          `Failed to fetch company profile: ${response.statusText}`
        );
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function getPerformedSpaceMissionsOfCompany(
  id: number,
  user: { token: string }
): Promise<any> {
  const sentUrl = `http://localhost:8080/spaceMission/getAllMissionsByCompany/${id}`;

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      contentType: "application/json",
      authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          `Failed to fetch company profile: ${response.statusText}`
        );
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Error");
      throw err;
    });
}
export function filterCompanies(filters: { country?: string; minBudget?: number; maxBudget?: number }): Promise<any[]> {
  const query = new URLSearchParams(filters as any).toString();
  const sentUrl = `http://localhost:8080/company/filterCompanies?${query}`;

  console.log("Request URL:", sentUrl);

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }
    })
    .then((data) => {
      console.log("Filtered Companies:", data);
      return data;
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

