'use server';

/**
 * @fileOverview Summarizes an economic event and its potential market impact.
 *
 * - summarizeEconomicEvent - A function that handles the event summarization process.
 * - SummarizeEventInput - The input type for the summarizeEconomicEvent function.
 * - SummarizeEventOutput - The return type for the summarizeEconomicEvent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventInputSchema = z.object({
  title: z.string().describe('The title of the economic event.'),
  description: z.string().describe('The description of the economic event.'),
});
export type SummarizeEventInput = z.infer<typeof SummarizeEventInputSchema>;

const SummarizeEventOutputSchema = z.object({
  summary: z
    .string()
    .describe('An AI-generated summary of the event and its potential market impact.'),
});
export type SummarizeEventOutput = z.infer<typeof SummarizeEventOutputSchema>;

export async function summarizeEconomicEvent(
  input: SummarizeEventInput
): Promise<SummarizeEventOutput> {
  return summarizeEventFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEventPrompt',
  input: {schema: SummarizeEventInputSchema},
  output: {schema: SummarizeEventOutputSchema},
  prompt: `You are a financial analyst. Summarize the following economic event and briefly explain its potential impact on the Indian stock market.

Event Title: {{{title}}}
Event Description: {{{description}}}

Provide a concise summary.
`,
});

const summarizeEventFlow = ai.defineFlow(
  {
    name: 'summarizeEventFlow',
    inputSchema: SummarizeEventInputSchema,
    outputSchema: SummarizeEventOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
