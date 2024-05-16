export async function loginUser(email: string, password: string) {
  const url = new URL("http://localhost:8080/account/login");

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Assuming the server sends a JSON with an error message
      throw new Error(errorData.message || "Invalid email or password");
    }

    const data = await response.json(); // Get user data or token from response
    console.log(data);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userRole", data.userRole);

    return { success: true, data: data };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
}
