import React from 'react';
import EditRecordForm from './_components/EditRecordForm';

const ExerciseEditPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <EditRecordForm exerciseId={id} />
    </div>
  );
};

export default ExerciseEditPage;
