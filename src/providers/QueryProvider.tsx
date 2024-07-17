'use client';

import { createClient } from '@/supabase/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect } from 'react';

const queryClient = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);

      if (event === 'INITIAL_SESSION') {
        // handle initial session
        console.log('나 첫인 됌', session);
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        console.log('나 로그인 됌', session);
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
