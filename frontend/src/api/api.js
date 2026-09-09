const BASE_URL = "http://localhost:3000";

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

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};