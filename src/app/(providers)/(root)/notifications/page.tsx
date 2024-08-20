import { notificationsQueryOptions } from '@/hooks/notifications/query';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotificationList from './_components/NotificationList';

const NotificationsPage = async () => {
  const supabase = createClient();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(notificationsQueryOptions.getNotifications(supabase));

  return (
    <div className="px-4 flex flex-col gap-y-6 flex-1  w-full h-full overflow-scroll scroll py-4 text-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotificationList />
      </HydrationBoundary>
    </div>
  );
};

export default NotificationsPage;
