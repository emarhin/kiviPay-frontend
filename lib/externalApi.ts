const BASE_URL = process.env.EXTERNAL_API_URL!;

export async function callExternalApi(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string,
) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("External API Error");
  }

  return response.json();
}
