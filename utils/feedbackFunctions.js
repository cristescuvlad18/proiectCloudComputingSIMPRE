export async function sendFeedback(data) {
  const response = await fetch(
    "/api/feedback",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  return response.ok;
}