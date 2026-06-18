'use server';
/**
 * @fileOverview A Genkit flow for summarizing news articles in both Arabic and English.
 *
 * - summarizeNewsArticlesForVisitors - A function that handles the news article summarization process.
 * - SummarizeNewsArticlesForVisitorsInput - The input type for the summarizeNewsArticlesForVisitors function.
 * - SummarizeNewsArticlesForVisitorsOutput - The return type for the summarizeNewsArticlesForVisitors function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeNewsArticlesForVisitorsInputSchema = z.object({
  articleText: z.string().describe('The full text of the news article to be summarized.'),
});
export type SummarizeNewsArticlesForVisitorsInput = z.infer<typeof SummarizeNewsArticlesForVisitorsInputSchema>;

const SummarizeNewsArticlesForVisitorsOutputSchema = z.object({
  englishSummary: z.string().describe('A concise summary of the news article in English.'),
  arabicSummary: z.string().describe('A concise summary of the news article in Arabic.'),
});
export type SummarizeNewsArticlesForVisitorsOutput = z.infer<typeof SummarizeNewsArticlesForVisitorsOutputSchema>;

export async function summarizeNewsArticlesForVisitors(input: SummarizeNewsArticlesForVisitorsInput): Promise<SummarizeNewsArticlesForVisitorsOutput> {
  return summarizeNewsArticlesForVisitorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNewsArticlePrompt',
  input: { schema: SummarizeNewsArticlesForVisitorsInputSchema },
  output: { schema: SummarizeNewsArticlesForVisitorsOutputSchema },
  prompt: `You are an AI assistant tasked with summarizing news articles.
Please provide a concise summary of the following news article in both English and Arabic.
The output should be a JSON object with two keys: "englishSummary" and "arabicSummary".

News Article:
{{{articleText}}}`,
});

const summarizeNewsArticlesForVisitorsFlow = ai.defineFlow(
  {
    name: 'summarizeNewsArticlesForVisitorsFlow',
    inputSchema: SummarizeNewsArticlesForVisitorsInputSchema,
    outputSchema: SummarizeNewsArticlesForVisitorsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate summaries.');
    }
    return output;
  }
);
