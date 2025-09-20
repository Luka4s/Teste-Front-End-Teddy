interface CardFooterProps {
  children: React.ReactNode;
}

const CardFooter = ({ children }: CardFooterProps) => {
  return (
    <div className="flex items-center justify-between pt-1">{children}</div>
  );
};

export default CardFooter;
