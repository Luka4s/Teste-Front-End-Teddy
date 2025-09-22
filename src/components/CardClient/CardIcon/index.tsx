import type { HTMLAttributes } from "react";

interface CardIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

const CardIcon = ({ icon, ...props }: CardIconProps) => {
  return (
    <div {...props} className="hover:cursor-pointer active:scale-90">
      {icon}
    </div>
  );
};

export default CardIcon;
