export async function onRequest(context) {
  const reqPath = new Request(new URL(context.request.url).pathname, {
    method: context.request.method,
    headers: context.request.headers,
  });

  const response = await context.env.ASSETS.fetch(reqPath);

  if (response.status === 404) {
    const index = await context.env.ASSETS.fetch(new Request('/index.html'));
    return new Response(index.body, {
      status: 404,
      headers: index.headers,
    });
  }

  return response;
}
