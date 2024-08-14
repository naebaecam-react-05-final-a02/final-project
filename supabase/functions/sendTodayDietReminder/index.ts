import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

Deno.serve(async () => {
  try {
    const today = new Date(Date.now() + 9 * 60 * 60 * 1000);
    // today.setDate(today.getDate() + 1);
    const todayStr = today.toISOString().split('T')[0];
    console.log('TODAY___', todayStr);
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: users } = await supabase.from('users').select('id');
    console.log('RESPONSE___', users);

    if (!users || users.length === 0) {
      return;
    }

    const dietsPromises = users.map((user: any) =>
      supabase.from('diets').select('*').eq('userId', user.id).gte('date', todayStr),
    );
    const results = await Promise.all(dietsPromises);

    console.log('DietsPromises Results___', results);

    const insertDietNotifications = users
      .filter((_: any, idx: number) => !results[idx]?.data?.length)
      .map((user: any) =>
        supabase.from('notifications').insert({
          createdAt: new Date(),
          idForURL: null,
          targetUserId: user.id,
          isRead: false,
          type: 'dashboard',
          category: 'diet',
        }),
      );

    const insertDietNotificationsResults = await Promise.all(insertDietNotifications);
    console.log('InsertDietNotifications Results___', insertDietNotificationsResults);

    return new Response(JSON.stringify({ message: 'Challenges updated successfully', results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
