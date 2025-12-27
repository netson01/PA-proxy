// Edge Function прокси
export default async function handler(request) {
  try {
    // Логируем запрос
    console.log(`${request.method} ${request.url}`);
    
    // Создаем целевой URL
    const url = new URL(request.url);
    const targetUrl = `https://netson.pythonanywhere.com${url.pathname}${url.search}`;
    
    // Выполняем запрос
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        'host': 'netson.pythonanywhere.com'
      },
      body: request.method !== 'GET' && request.method !== 'HEAD' 
        ? await request.arrayBuffer() 
        : null
    });
    
    // Возвращаем ответ с CORS
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({
      error: 'Proxy error',
      message: error.message
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export const config = {
  runtime: 'edge'
};
