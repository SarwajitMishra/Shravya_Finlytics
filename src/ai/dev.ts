import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-market-sentiment.ts';
import '@/ai/flows/summarize-financial-news.ts';
import '@/ai/flows/auto-trigger-feedback.ts';
import '@/ai/flows/investment-advice-chat.ts';
import '@/ai/flows/summarize-event-flow.ts';
