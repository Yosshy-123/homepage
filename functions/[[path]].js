export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);

    const response = await context.env.ASSETS.fetch(url.pathname);

    if (response.status === 404) {
      const index = await context.env.ASSETS.fetch('/index.html');
      return new Response(index.body, { status: 404, headers: index.headers });
    }

    return response;
  } catch (err) {
    console.error('worker error', err);
    return new Response('Internal Error', { status: 500 });
  }
}
