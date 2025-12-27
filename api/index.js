export const config = {
  runtime: 'edge',
};

export default async function edge(request) {
  const targetUrl = request.url.replace(
    'ваш-домен.vercel.app',
    'netson.pythonanywhere.com'
  );
  
  const newRequest = new Request(targetUrl, request);
  const response = await fetch(newRequest);
  
  // Добавляем CORS
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  
  return new Response(response.body, {
    status: response.status,
    headers: headers
  });
}
