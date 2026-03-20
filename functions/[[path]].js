export async function onRequest(context) {
  const url = new URL(context.request.url)

  const response = await context.env.ASSETS.fetch(context.request)

  if (response.status !== 404) {
    return response
  }

  const index = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  )

  return new Response(index.body, {
    status: 404,
    headers: index.headers,
  })
}
