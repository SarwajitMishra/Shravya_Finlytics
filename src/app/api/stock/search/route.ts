
import { NextResponse, type NextRequest } from 'next/server';

const finnhubApiKey = process.env.FINNHUB_API_KEY;

export async function GET(request: NextRequest) {
  if (!finnhubApiKey || finnhubApiKey === "YOUR_FINNHUB_API_KEY") {
    return NextResponse.json({ error: "Finnhub API key not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${finnhubApiKey}`);
    if (!response.ok) {
        throw new Error(`Finnhub search API request failed with status ${response.status}`);
    }
    const data = await response.json();

    // We only care about common stock from Indian exchanges
    const filteredResults = (data.result || []).filter((item: any) => 
        item.type === 'Common Stock' && item.symbol.includes('.NS')
    ).slice(0, 10); // Limit to top 10 results

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error(`Error searching for stock "${query}":`, error);
    return NextResponse.json({ error: `Failed to search for stock: ${query}` }, { status: 500 });
  }
}
