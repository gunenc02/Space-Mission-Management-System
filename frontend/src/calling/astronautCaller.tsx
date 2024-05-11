export function getAstronautProfile(
  id: number,
  user: { token: string }
): Promise<any> {
  const sentUrl = `http://localhost:8080/astronaut/profile/${id}`;

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
          `Failed to fetch astronaut profile: ${response.statusText}`
        );
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function getAstronauts(user: { token: string }): Promise<any[]> {
  const sentUrl = "http://localhost:8080/astronaut/list";

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

export function joinCompany(
  companyId: number,
  userId: number,
  user: { token: string }
): Promise<void> {
  const sentUrl = `http://localhost:8080/astronaut/joinCompany/${companyId}/${userId}`;

  return fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Joined company successfully");
      } else {
        throw new Error(`Failed to join company: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}
