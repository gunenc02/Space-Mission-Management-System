export function getExpertById(

  id: number,
  user: { token: string }
): Promise<any> {
  const sentUrl = `http://localhost:8080/expert/${id}`;

  return fetch(sentUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(id + 1)
        return response.json();
      } else {
        throw new Error(`Failed to fetch expert: ${response.statusText}`);
      }
    })
    .then((data) => {
      // CHECK THIS, SECOND THEN NEEDED
      return data;
    })
    .catch((err) => {
      console.error("Error:", err);
      console.log("err")
      throw err;
    });
}

export function registerExpert(
  expertDto: any,
  user: { token: string }
): Promise<void> {
  const sentUrl = "http://localhost:8080/expert/register";

  return fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(expertDto),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Expert registered successfully");
      } else {
        throw new Error(`Failed to register expert: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function fireExpert(id: number, user: { token: string }): Promise<void> {
    const sentUrl = `http://localhost:8080/expert/fire/${id}`;

    return fetch(sentUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                console.log("Expert fired successfully");
            } else {
                throw new Error(`Failed to fire expert: ${response.statusText}`);
            }
        })
        .catch((err) => {
            console.error("Error:", err);
            throw err;
        });
}

  export function getHealthRecordsByExpertId(
      id: number,
      user: { token: string }
  ): Promise<void> {
      const sentUrl = `http://localhost:8080/expert/getHealthRecordsByExpertId/${id}`;

      return fetch(sentUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
          },
      })
          .then(response => {
              if (response.status === 200) {
                  return response.json()
              } else {
                  throw new Error(`Failed to get records of expert: ${response.statusText}`);
              }
          })
          .then((data) => {
              return data;
          })
          .catch(err => {
              console.error("Error:", err);
              throw err;
          });
  }

