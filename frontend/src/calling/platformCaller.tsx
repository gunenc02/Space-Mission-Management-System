export function getPlatforms(user: { token: string }): Promise<any[]> {
  const sentUrl = "http://localhost:8080/platform/list";

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
        throw new Error(`Failed to fetch platforms: ${response.statusText}`);
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

export function getPlatformById(
  id: number,
  user: { token: string }
): Promise<any> {
  const sentUrl = `http://localhost:8080/platform/${id}`;

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
        throw new Error(`Failed to fetch platform: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function createPlatform(
  platformDto: any,
  user: { token: string }
): Promise<void> {
  const sentUrl = "http://localhost:8080/platform/create";

  return fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(platformDto),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Platform created successfully");
      } else {
        throw new Error(`Failed to create platform: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function updatePlatform(
  platformDto: any,
  user: { token: string }
): Promise<void> {
  const sentUrl = "http://localhost:8080/platform/update";

  return fetch(sentUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(platformDto),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Platform updated successfully");
      } else {
        throw new Error(`Failed to update platform: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function deletePlatform(
  id: number,
  user: { token: string }
): Promise<void> {
  const sentUrl = `http://localhost:8080/platform/delete/${id}`;

  return fetch(sentUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Platform deleted successfully");
      } else {
        throw new Error(`Failed to delete platform: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}
