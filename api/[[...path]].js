export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  // Заменяем ваш Vercel-домен на целевой
  url.hostname = 'netson.pythonanywhere.com';
  // Опционально: можно заменить и протокол/порт если нужно

  const newRequest = new Request(url.toString(), request);

  const response = await fetch(newRequest);

  // Добавляем CORS
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers: headers,
  });
}
