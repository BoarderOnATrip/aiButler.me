export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const looksLikeAsset = /\.[a-z0-9]+$/i.test(url.pathname);

    if (request.method === "GET" && acceptsHtml && !looksLikeAsset) {
      return env.ASSETS.fetch("https://assets.local/");
    }

    return env.ASSETS.fetch(request);
  },
};
