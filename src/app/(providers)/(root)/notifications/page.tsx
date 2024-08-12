import GlassButton from '@/components/ButtonIcon/GlassButton';
import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import Mobile from '@/layouts/Mobile';
import { HiOutlineTrash } from 'react-icons/hi';

const NotificationsPage = async () => {
  return (
    <Mobile
      headerLayout={
        <TitleHeader
          rightButton={
            <GlassButton>
              <div className="text-2xl">
                <HiOutlineTrash />
              </div>
            </GlassButton>
          }
        >
          알림
        </TitleHeader>
      }
      showFooter={false}
    >
      <div className="px-4">
        <h6 className="text-gray-300 text-sm">최근 50개의 알람까지 보여집니다.</h6>
      </div>
    </Mobile>
  );
};

export default NotificationsPage;
