interface CardHeaderProps {
  children: string;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return <div className="w-full p-2 font-bold text-center">{children}</div>;
};

export default CardHeader;
