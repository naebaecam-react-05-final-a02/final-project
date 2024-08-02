interface ArticleTitleProps {
  icon?: string;
  title: string;
}

const ArticleTitle = ({ icon = '', title }: ArticleTitleProps) => {
  return (
    <div className="flex  gap-2">
      <p className="text-lg w-5 h-5 flex justify-center items-center">{icon}</p>
      <h2 className="text-md font-semibold">{title}</h2>
    </div>
  );
};

export default ArticleTitle;
