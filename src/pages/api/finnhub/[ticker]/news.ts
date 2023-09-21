import { type APIContext, type APIRoute } from 'astro';
import { getFinnhubDate } from '../../../../utils/api/finnhub';

export const GET: APIRoute = async (context: APIContext) => {
  const ticker = context.params.ticker;
  const url = `${import.meta.env.FINNHUB_API_URL}/company-news?symbol=${ticker}&from=${getFinnhubDate(1)}&to=${getFinnhubDate()}&token=${import.meta.env.FINNHUB_API_TOKEN}`;

  let data;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return new Response(null, {
        status: 500,
        statusText: 'Server Error'
      });
    }

    data = await res.json();
  } catch (e) {
    console.log(e);

    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }

  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }
}
