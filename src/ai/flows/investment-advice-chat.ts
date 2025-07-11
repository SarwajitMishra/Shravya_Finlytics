// src/ai/flows/investment-advice-chat.ts
'use server';

/**
 * @fileOverview An AI agent that provides investment advice based on user questions.
 *
 * - getInvestmentAdvice - A function that handles the investment advice process.
 * - InvestmentAdviceInput - The input type for the getInvestmentAdvice function.
 * - InvestmentAdviceOutput - The return type for the getInvestmentAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentAdviceInputSchema = z.object({
  query: z.string().describe('The user query about investment advice.'),
});
export type InvestmentAdviceInput = z.infer<typeof InvestmentAdviceInputSchema>;

const InvestmentAdviceOutputSchema = z.object({
  advice: z.string().describe('The investment advice based on the user query.'),
});
export type InvestmentAdviceOutput = z.infer<typeof InvestmentAdviceOutputSchema>;

export async function getInvestmentAdvice(input: InvestmentAdviceInput): Promise<InvestmentAdviceOutput> {
  return investmentAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentAdvicePrompt',
  input: {schema: InvestmentAdviceInputSchema},
  output: {schema: InvestmentAdviceOutputSchema},
  prompt: `You are an AI investment advisor. A user will ask a question about investments, and you should provide well-reasoned, data-backed advice.

  User query: {{{query}}}`,
});

const investmentAdviceFlow = ai.defineFlow(
  {
    name: 'investmentAdviceFlow',
    inputSchema: InvestmentAdviceInputSchema,
    outputSchema: InvestmentAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
