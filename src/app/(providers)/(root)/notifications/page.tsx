import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import { notificationsQueryOptions } from '@/hooks/notifications/query';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotificationClear from './_components/NotificationClear';
import NotificationList from './_components/NotificationList';

const NotificationsPage = async () => {
  const supabase = createClient();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(notificationsQueryOptions.getNotifications(supabase));

  return (
    <Mobile headerLayout={<TitleHeader rightButton={<NotificationClear />}>알림</TitleHeader>} showFooter={false}>
      <div className="px-4 grid gap-y-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotificationList />
        </HydrationBoundary>
      </div>
    </Mobile>
  );
};

export default NotificationsPage;
