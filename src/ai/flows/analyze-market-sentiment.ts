'use server';

/**
 * @fileOverview Market sentiment analysis flow.
 *
 * - analyzeMarketSentiment - A function that analyzes market sentiment from a news article.
 * - AnalyzeMarketSentimentInput - The input type for the analyzeMarketSentiment function.
 * - AnalyzeMarketSentimentOutput - The return type for the analyzeMarketSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMarketSentimentInputSchema = z.object({
  article: z.string().describe('The financial news article to analyze.'),
});
export type AnalyzeMarketSentimentInput = z.infer<typeof AnalyzeMarketSentimentInputSchema>;

const AnalyzeMarketSentimentOutputSchema = z.object({
  overallSentiment: z
    .string()
    .describe(
      'The overall sentiment of the article (e.g., positive, negative, neutral).'n
    ),
  positiveKeywords: z
    .array(z.string())
    .describe('Keywords that contribute to the positive sentiment.'),
  negativeKeywords: z
    .array(z.string())
    .describe('Keywords that contribute to the negative sentiment.'),
  confidenceScore: z
    .number()
    .describe('A score indicating the confidence level of the sentiment analysis.'),
});
export type AnalyzeMarketSentimentOutput = z.infer<typeof AnalyzeMarketSentimentOutputSchema>;

export async function analyzeMarketSentiment(
  input: AnalyzeMarketSentimentInput
): Promise<AnalyzeMarketSentimentOutput> {
  return analyzeMarketSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMarketSentimentPrompt',
  input: {schema: AnalyzeMarketSentimentInputSchema},
  output: {schema: AnalyzeMarketSentimentOutputSchema},
  prompt: `Analyze the following financial news article and determine the overall market sentiment. Provide keywords that contribute to the positive and negative sentiment, and a confidence score for your analysis.

Article: {{{article}}}

Output should be in JSON format.
`,
});

const analyzeMarketSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeMarketSentimentFlow',
    inputSchema: AnalyzeMarketSentimentInputSchema,
    outputSchema: AnalyzeMarketSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
