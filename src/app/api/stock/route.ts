
import { NextResponse, type NextRequest } from 'next/server';

const finnhubApiKey = process.env.FINNHUB_API_KEY;

export async function GET(request: NextRequest) {
  if (!finnhubApiKey || finnhubApiKey === "YOUR_FINNHUB_API_KEY") {
    return NextResponse.json({ error: "Finnhub API key not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker');
  const resolution = searchParams.get('resolution') || 'D';
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!ticker || !from || !to) {
    return NextResponse.json({ error: "Ticker, from, and to parameters are required." }, { status: 400 });
  }

  try {
    // Fetch historical candles
    const candleResponse = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}&token=${finnhubApiKey}`);
    if (!candleResponse.ok) {
        throw new Error(`Finnhub candle API request failed with status ${candleResponse.status}`);
    }
    const candleData = await candleResponse.json();

    // Fetch quote
    const quoteResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubApiKey}`);
     if (!quoteResponse.ok) {
        throw new Error(`Finnhub quote API request failed with status ${quoteResponse.status}`);
    }
    const quoteData = await quoteResponse.json();
    
    // Fetch company profile for name
    const profileResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${finnhubApiKey}`);
    if (!profileResponse.ok) {
        throw new Error(`Finnhub profile API request failed with status ${profileResponse.status}`);
    }
    const profileData = await profileResponse.json();


    const responseData = {
        name: profileData.name || ticker,
        ticker: profileData.ticker || ticker,
        price: `₹${quoteData.c.toFixed(2)}`,
        change: `${quoteData.d.toFixed(2)} (${quoteData.dp.toFixed(2)}%)`,
        changeType: quoteData.d >= 0 ? 'positive' : 'negative',
        chartData: (candleData.t || []).map((timestamp: number, index: number) => ({
            date: new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            open: candleData.o[index],
            high: candleData.h[index],
            low: candleData.l[index],
            close: candleData.c[index],
        }))
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return NextResponse.json({ error: `Failed to fetch stock data for ${ticker}` }, { status: 500 });
  }
}
