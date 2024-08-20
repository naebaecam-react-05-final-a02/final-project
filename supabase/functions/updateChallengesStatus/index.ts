import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

Deno.serve(async () => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const todayStr = today.toISOString().split('T')[0];
    console.log('Today___', todayStr);
    // 다 가져와도 되나?
    const { data: challenges, error } = await supabase.from('challenges').select('id,startDate,endDate,isProgress');

    if (error) {
      console.log(error);
      return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    console.log('Challenge___', challenges);

    const promises = challenges.map((challenge: any) => {
      let isProgress = challenge.isProgress;

      // "LF"|"RUN"|"END"
      if (challenge.endDate < todayStr) {
        // 시작일 상관없고
        // 종료일이 오늘보다 작다면 끝난 챌린지
        isProgress = 'END';
      } else if (challenge.startDate <= todayStr && challenge.endDate >= todayStr) {
        // 시작일이 오늘과 같거나 이전이고
        // 종료일이 오늘과 같거나 더 크면 진행 중인 챌린지
        isProgress = 'RUN';
      } else if (challenge.startDate > todayStr) {
        isProgress = 'LF';
      }
      console.log(
        `${challenge.id} prev isProgress: ${challenge.isProgress}->${isProgress} startDate: ${challenge.startDate}, endDate: ${challenge.endDate}`,
      );
      return supabase.from('challenges').update({ isProgress }).eq('id', challenge.id).select('id, isProgress');
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
