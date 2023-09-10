import type { APIContext, APIRoute } from 'astro';
import { ALPHA_VANTAGE_FUNCTIONS, OverviewTickerSchema } from '../../../../utils/api/alphavantage';
import { ValiError, parse } from 'valibot';

export const GET: APIRoute = async (context: APIContext) => {
  const url = `${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.OVERVIEW}&symbol=${context.params.ticker}&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`;
  const res = await fetch(url)

  if (!res.ok) {
    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }

  const json = await res.json();

  if ("Note" in json || "Information" in json) {
    return new Response(`API Quote Reached: ${json['Note'] ?? json['Information']}`, {
      status: 500,
    });
  }

  try {
    const parsed = parse(OverviewTickerSchema, json.feed);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.log((error as ValiError).name);
    console.log((error as ValiError).message);

    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }
}
