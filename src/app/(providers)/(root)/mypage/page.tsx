import LogoSVG from '@/assets/logo.svg';
import EditButton from '@/components/ButtonIcon/EditButton/EditButton';
import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import Mobile from '@/layouts/Mobile';
import MyProfile from './_components/MyProfile';

const MyProfilePage = () => {
  return (
    <Mobile headerLayout={<TitleHeader leftButton={<LogoSVG />} rightButton={<EditButton />} />}>
      <article className="">
        <MyProfile />
      </article>
    </Mobile>
  );
};

export default MyProfilePage;
