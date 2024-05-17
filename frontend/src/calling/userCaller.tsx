export async function loginUser(email: string, password: string): Promise<any> {
  const sentUrl = "http://localhost:8080/account/login";
  const response = await fetch(sentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return { success: true, data };
}