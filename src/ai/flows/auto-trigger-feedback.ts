'use server';

/**
 * @fileOverview Provides an AI review of a specific stock based on sentiment analysis and financial indicators.
 *
 * - autoTriggerFeedback - A function that triggers the stock review process.
 * - AutoTriggerFeedbackInput - The input type for the autoTriggerFeedback function.
 * - AutoTriggerFeedbackOutput - The return type for the autoTriggerFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTriggerFeedbackInputSchema = z.object({
  stockTicker: z.string().describe('The ticker symbol of the stock to review.'),
});
export type AutoTriggerFeedbackInput = z.infer<typeof AutoTriggerFeedbackInputSchema>;

const AutoTriggerFeedbackOutputSchema = z.object({
  review: z.string().describe('An AI-generated review of the stock.'),
});
export type AutoTriggerFeedbackOutput = z.infer<typeof AutoTriggerFeedbackOutputSchema>;

export async function autoTriggerFeedback(input: AutoTriggerFeedbackInput): Promise<AutoTriggerFeedbackOutput> {
  return autoTriggerFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoTriggerFeedbackPrompt',
  input: {schema: AutoTriggerFeedbackInputSchema},
  output: {schema: AutoTriggerFeedbackOutputSchema},
  prompt: `You are a financial analyst providing a review of a stock.

  Provide a detailed review of the stock with ticker {{{stockTicker}}}, incorporating the latest sentiment analysis and financial indicators to determine if the stock is a worthwhile investment.
  Include a summary of the stock's performance, recent news, and overall market sentiment.
  Ensure the review is data-backed, providing trends and advice in real-time.
`,
});

const autoTriggerFeedbackFlow = ai.defineFlow(
  {
    name: 'autoTriggerFeedbackFlow',
    inputSchema: AutoTriggerFeedbackInputSchema,
    outputSchema: AutoTriggerFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
