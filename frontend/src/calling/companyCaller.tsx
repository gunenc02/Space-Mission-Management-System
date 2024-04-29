export function getAllCompanies(user: { token: string }): Promise<any> {
    const sentUrl = "http://localhost:8080/company";
  
    return fetch(sentUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  
  export function offerJob(astronautId: number, user: { token: string }): Promise<void> {
    const sentUrl = `http://localhost:8080/company/offerJob/${astronautId}`;
  
    return fetch(sentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Job offered successfully");
      } else {
        throw new Error(`Failed to offer job: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  
  export function getCompanyProfile(id: number, user: { token: string }): Promise<any> {
    const sentUrl = `http://localhost:8080/company/profile/${id}`;
  
    return fetch(sentUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch company profile: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  