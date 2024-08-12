const NotificationChip = ({ type }: { type: string }) => {
  return (
    <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center text-xs">
      {type}
    </div>
  );
};

export default NotificationChip;
