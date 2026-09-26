const BASE_URL = "https://mern-job-portal-76t9.onrender.com";

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };

  const options = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined
  };

  const response = await fetch(BASE_URL + endpoint, options);
  const data = await response.json();

  const isSessionInvalid =
    response.status === 401 ||
    (response.status === 403 && data?.message === "Invalid Token");

  if (isSessionInvalid && token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};