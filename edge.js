export default async (request) => {
  const url = new URL(request.url);
  url.hostname = 'netson.pythonanywhere.com';
  
  const response = await fetch(new Request(url, request));
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return newResponse;
};
