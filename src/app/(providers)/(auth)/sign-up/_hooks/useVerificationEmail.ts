'use client';

import { useGenerateVerificationEmail } from '@/hooks/auth/useUsers';
import { send } from '@emailjs/browser';

import { useMutation } from '@tanstack/react-query';

const useVerificationEmail = () => {
  const { mutateAsync: genCode } = useGenerateVerificationEmail();
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        console.log('Generating verification code for:', email);
        const verificationCode = await genCode(email);
        console.log('Generated verification code:', verificationCode);

        console.log('Sending email with EmailJS');
        const result = await send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_email: email,
            message: verificationCode,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        );
        console.log('EmailJS send result:', result);

        return 'Verification email sent successfully';
      } catch (error) {
        console.error('Error in mutation function:', error);
        if (error instanceof Error) {
          throw new Error(`Failed to send verification email: ${error.message}`);
        } else {
          throw new Error('Failed to send verification email: Unknown error');
        }
      }
    },
    onError: (error) => {
      console.error('Error sending verification email:', error);
    },
  });
};

export default useVerificationEmail;
