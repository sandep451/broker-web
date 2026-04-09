export async function track(name: string, page: string) {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, page })
    });
  } catch {
    // Analytics must never break UX
  }
}
