'use server';
/**
 * @fileOverview Summarizes financial news articles.
 *
 * - summarizeFinancialNews - A function that summarizes financial news articles.
 * - SummarizeFinancialNewsInput - The input type for the summarizeFinancialNews function.
 * - SummarizeFinancialNewsOutput - The return type for the summarizeFinancialNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialNewsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the financial news article to summarize.'),
  category: z
    .string()
    .optional()
    .describe(
      'Optional category to classify the news into: economy, earnings, policy, or global impact.'
    ),
});
export type SummarizeFinancialNewsInput = z.infer<
  typeof SummarizeFinancialNewsInputSchema
>;

const SummarizeFinancialNewsOutputSchema = z.object({
  summary: z.string().describe('The summary of the financial news article.'),
  category: z
    .string()
    .optional()
    .describe(
      'The category the news belongs to: economy, earnings, policy, or global impact.'
    ),
});
export type SummarizeFinancialNewsOutput = z.infer<
  typeof SummarizeFinancialNewsOutputSchema
>;

export async function summarizeFinancialNews(
  input: SummarizeFinancialNewsInput
): Promise<SummarizeFinancialNewsOutput> {
  return summarizeFinancialNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFinancialNewsPrompt',
  input: {schema: SummarizeFinancialNewsInputSchema},
  output: {schema: SummarizeFinancialNewsOutputSchema},
  prompt: `You are a financial news summarization expert. Please summarize the following news article and classify it into one of the following categories: economy, earnings, policy, or global impact. Return the category in the category field.

Article Content: {{{articleContent}}}
`,
});

const summarizeFinancialNewsFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialNewsFlow',
    inputSchema: SummarizeFinancialNewsInputSchema,
    outputSchema: SummarizeFinancialNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
