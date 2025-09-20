interface CardIconProps {
  icon: React.ReactNode;
}

const CardIcon = ({ icon }: CardIconProps) => {
  return <div className="hover:cursor-pointer active:scale-90">{icon}</div>;
};

export default CardIcon;
