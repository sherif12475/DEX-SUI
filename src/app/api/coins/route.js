// app/api/coins/route.ts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '0';
    const searchStr = searchParams.get('search') || '';
    
    let url = 'https://api.blockberry.one/sui/v1/coins?' + new URLSearchParams({
      page: page,
      size: '100',
      orderBy: 'DESC',
      sortBy: 'AGE',
      withImage: 'TRUE'
    });

    // Add search parameter if present
    if (searchStr) {
      url = `https://api.blockberry.one/sui/v1/coins?searchStr=${encodeURIComponent(searchStr)}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'x-api-key': 'mlwf9GOHA5L1WICHl8WSKrjCpx7AOT'
      }
    });

    const data = await response.json();
    console.log(data)
    return Response.json(data);
  } catch (error) {
    console.error('API Error:', error);
    console.log(error)
    return Response.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}