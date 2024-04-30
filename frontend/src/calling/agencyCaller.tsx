export function getAgencyProfile(id: number, user: { token: string }): Promise<any> {
    const sentUrl = `http://localhost:8080/agency/profile/${id}`;
  
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
        throw new Error(`Failed to fetch agency profile: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  
  export function getAgencies(user: { token: string }): Promise<any[]> {
    const sentUrl = "http://localhost:8080/agency/list";
  
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
        throw new Error(`Failed to fetch agencies: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
    export function approveMission(agencyId: number, missionId: number, user: { token: string }): Promise<void> {
    const sentUrl = `http://localhost:8080/agency/approveMission/${agencyId}/${missionId}`;
  
    return fetch(sentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Mission approved successfully");
      } else {
        throw new Error(`Failed to approve mission: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  
  export function approveAstronaut(agencyId: number, astronautId: number, user: { token: string }): Promise<void> {
    const sentUrl = `http://localhost:8080/agency/approveAstronaut/${agencyId}/${astronautId}`;
  
    return fetch(sentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Astronaut approved successfully");
      } else {
        throw new Error(`Failed to approve astronaut: ${response.statusText}`);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      throw err;
    });
  }
  