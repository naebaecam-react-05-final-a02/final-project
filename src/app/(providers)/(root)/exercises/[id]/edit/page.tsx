import Mobile from '@/layouts/Mobile';
import EditRecordForm from './_components/EditRecordForm';

const ExerciseEditPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <Mobile>
      <EditRecordForm exerciseId={id} />
    </Mobile>
  );
};

export default ExerciseEditPage;
