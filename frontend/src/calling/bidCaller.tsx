export function getBid(id: number, user: { token: string }): Promise<any> {
  const sentUrl = `http://localhost:8080/bid/${id}`;


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
        throw new Error(`Failed to fetch bid: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function getReceivedBids(companyId: number): Promise<any[]> {
  const sentUrl = `http://localhost:8080/bid/receivedList/${companyId}`;

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
        throw new Error(`Failed to fetch bids: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}

export function getOfferedBids(companyId: number): Promise<any[]> {
  const sentUrl = `http://localhost:8080/bid/offeredList/${companyId}`;

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
        throw new Error(`Failed to fetch bids: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}
export function offerBid(
  bidDto: any,
  user: { token: string | null }
): Promise<void> {
  const sentUrl = "http://localhost:8080/bid/offer";

  return fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(bidDto),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Bid offered successfully");
      } else {
        throw new Error(`Failed to offer bid: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}
export function approveBid(id: number): Promise<void> {
  const sentUrl = `http://localhost:8080/bid/approve/${id}`;
  return fetch(sentUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to approve bid: ${response.statusText}`);
    }
  });
}

export function rejectBid(id: number): Promise<void> {
  const sentUrl = `http://localhost:8080/bid/reject/${id}`;
  return fetch(sentUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to reject bid: ${response.statusText}`);
    }
  });
}

export function removeBid(id: number, user: { token: string }): Promise<void> {
  const sentUrl = `http://localhost:8080/bid/remove/${id}`;

  return fetch(sentUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Bid removed successfully");
      } else {
        throw new Error(`Failed to remove bid: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
}
