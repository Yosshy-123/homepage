export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  const assetResponse = await env.ASSETS.fetch(request)
  if (assetResponse.status !== 404) {
    return assetResponse
  }

  return await serveNotFoundPage(env, url)
}

async function serveNotFoundPage(env, url) {
  const indexUrl = new URL("/index.html", url)
  const indexResponse = await env.ASSETS.fetch(indexUrl)

  const headers = new Headers(indexResponse.headers)
  headers.set("Content-Type", "text/html; charset=UTF-8")

  return new Response(indexResponse.body, {
    status: 404,
    statusText: "Not Found",
    headers,
  })
}
