import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import EditRecordForm from './_components/EditRecordForm';

const ExerciseEditPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <Mobile
      isHeaderFixed={false}
      headerLayout={
        <Header
          title={`투두 추가하기`}
          // titleIcon={<DownIcon />}
        />
      }
    >
      <EditRecordForm exerciseId={id} />
    </Mobile>
  );
};

export default ExerciseEditPage;
