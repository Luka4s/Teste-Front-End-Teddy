interface CardContentProps {
  children: React.ReactNode;
}

const CardContent = ({ children }: CardContentProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-sm">
      {children}
    </div>
  );
};

export default CardContent;
