'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating bilingual (English and Arabic) descriptions.
 *
 * - generateBilingualDescriptions - A function that handles the generation process.
 * - GenerateBilingualDescriptionsInput - The input type for the generateBilingualDescriptions function.
 * - GenerateBilingualDescriptionsOutput - The return type for the generateBilingualDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBilingualDescriptionsInputSchema = z.object({
  context: z
    .string()
    .describe(
      'The type of content being described (e.g., "exhibitor profile", "event detail", "news article").'
    ),
  textInput: z
    .string()
    .describe('Keywords or a brief outline for the description.'),
});
export type GenerateBilingualDescriptionsInput = z.infer<
  typeof GenerateBilingualDescriptionsInputSchema
>;

const GenerateBilingualDescriptionsOutputSchema = z.object({
  englishDescription: z.string().describe('The generated description in English.'),
  arabicDescription: z.string().describe('The generated description in Arabic.'),
});
export type GenerateBilingualDescriptionsOutput = z.infer<
  typeof GenerateBilingualDescriptionsOutputSchema
>;

export async function generateBilingualDescriptions(
  input: GenerateBilingualDescriptionsInput
): Promise<GenerateBilingualDescriptionsOutput> {
  return generateBilingualDescriptionsFlow(input);
}

const generateBilingualDescriptionsPrompt = ai.definePrompt({
  name: 'generateBilingualDescriptionsPrompt',
  input: {schema: GenerateBilingualDescriptionsInputSchema},
  output: {schema: GenerateBilingualDescriptionsOutputSchema},
  prompt: `You are an expert content creator for the ARABEX BUILDING exhibition. Your task is to generate concise and engaging descriptions in both English and Arabic.

The content type is: {{{context}}}
Use the following information as a basis for the description: {{{textInput}}}

Ensure the descriptions are suitable for an exhibition context, highlighting key aspects and attracting visitors.
The tone should be professional and informative.
Provide the English description first, then the Arabic description.`,
});

const generateBilingualDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateBilingualDescriptionsFlow',
    inputSchema: GenerateBilingualDescriptionsInputSchema,
    outputSchema: GenerateBilingualDescriptionsOutputSchema,
  },
  async (input) => {
    const {output} = await generateBilingualDescriptionsPrompt(input);
    return output!;
  }
);
