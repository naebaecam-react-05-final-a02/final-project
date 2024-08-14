import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

Deno.serve(async () => {
  try {
    let message = '';

    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000);
    today.setDate(today.getDate() + 1);
    const yesterdayStr = today.toISOString().split('T')[0];
    console.log('Yesterday___', yesterdayStr);

    const { data: challenges, error } = await supabase
      .from('challenges')
      .select('*,participants:challengeParticipants(*)')
      .eq('startDate', yesterdayStr);

    if (error) {
      console.log(error);
      return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const promises = challenges.flatMap((challenge: any) => {
      return challenge.participants.map((participant: any) => {
        return supabase
          .from('notifications')
          .insert({
            createdAt: new Date(),
            idForURL: challenge.id,
            targetUserId: participant.userId,
            isRead: false,
            type: 'challenge',
            category: 'pre-start',
          })
          .select('id');
      });
    });

    const results = await Promise.all(promises);
    console.log('results___', results);

    return new Response(JSON.stringify({ message: 'Challenges updated successfully', results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
