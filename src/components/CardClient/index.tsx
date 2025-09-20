import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import CardIcon from "./CardIcon";

interface CardClientProps {
  children: React.ReactNode;
}

const CardClient = ({ children }: CardClientProps) => {
  return <div className="w-72 max-h-36 bg-white p-2 shadow">{children}</div>;
};

CardClient.Header = CardHeader;
CardClient.Content = CardContent;
CardClient.Footer = CardFooter;
CardClient.Icon = CardIcon;

export default CardClient;
