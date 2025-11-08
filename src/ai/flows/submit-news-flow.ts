'use server';
/**
 * @fileOverview Handles news submissions with reCAPTCHA verification.
 * 
 * - submitNews - Verifies reCAPTCHA and saves the submission to Firestore.
 * - SubmitNewsInput - Input schema for the submission flow.
 * - SubmitNewsOutput - Output schema for the submission flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const { firestore } = initializeFirebase();

const SubmitNewsInputSchema = z.object({
  title: z.string(),
  newsLink: z.string().url(),
  details: z.string().optional(),
  name: z.string(),
  email: z.string().email().optional(),
  category: z.string(),
  location: z.string(),
  offender: z.string(),
  recaptchaToken: z.string(),
});
export type SubmitNewsInput = z.infer<typeof SubmitNewsInputSchema>;

const SubmitNewsOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  submissionId: z.string().optional(),
});
export type SubmitNewsOutput = z.infer<typeof SubmitNewsOutputSchema>;


export async function submitNews(input: SubmitNewsInput): Promise<SubmitNewsOutput> {
    return submitNewsFlow(input);
}


const submitNewsFlow = ai.defineFlow(
  {
    name: 'submitNewsFlow',
    inputSchema: SubmitNewsInputSchema,
    outputSchema: SubmitNewsOutputSchema,
  },
  async (input) => {
    const { recaptchaToken, ...submissionData } = input;

    // 1. Verify reCAPTCHA token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        throw new Error('reCAPTCHA secret key is not set.');
    }
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    
    try {
      const response = await fetch(verificationUrl, { method: 'POST' });
      const verificationResult = await response.json();

      if (!verificationResult.success) {
        console.error('reCAPTCHA verification failed:', verificationResult['error-codes']);
        throw new Error('reCAPTCHA verification failed.');
      }

      // 2. If verification is successful, save data to Firestore
      const submissionWithTimestamp = {
        ...submissionData,
        status: 'Pending',
        submittedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(firestore, 'submissions'), submissionWithTimestamp);

      return {
        success: true,
        message: 'Submission successful.',
        submissionId: docRef.id,
      };
    } catch (error) {
      console.error('Error in submission flow:', error);
      // Re-throw to be handled by the client
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred during submission.');
    }
  }
);
