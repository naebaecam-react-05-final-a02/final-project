import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

Deno.serve(async () => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000);
    // today.setDate(today.getDate() + 1);
    const todayStr = today.toISOString().split('T')[0];
    console.log('TODAY___', todayStr);

    const { data: paritipants } = await supabase
      .from('challengeParticipants')
      .select('*,challenges(title, isProgress)');

    console.log('Paritipants___', paritipants);

    if (!paritipants || !paritipants.length) {
      return;
    }
    const filterParticipatns = paritipants.filter((paritipant: any) => paritipant.challenges.isProgress === 'RUN');

    const verificationPromises = filterParticipatns.map((paritipant: any) =>
      supabase
        .from('challengeVerify')
        .select('*')
        .match({ userId: paritipant.userId, challengeId: paritipant.challengeId })
        .gte('date', todayStr),
    );

    const verificationResults = await Promise.all(verificationPromises);
    console.log('Verification Results___', verificationResults);

    const notificationsPromises = filterParticipatns
      .filter((_: any, idx: number) => !verificationResults[idx]?.data?.length)
      .map((paritipant: any) => {
        return supabase.from('notifications').insert({
          createdAt: new Date(),
          idForURL: paritipant.challengeId,
          targetUserId: paritipant.userId,
          isRead: false,
          type: 'challenge',
          category: 'verification',
        });
      });

    const notificationsResults = await Promise.all(notificationsPromises);
    console.log('Notifications Results___', notificationsResults);

    return new Response(JSON.stringify({ message: 'Challenges updated successfully', notificationsResults }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
