/**
 * CardClient is a component that follows the **Component Composition** pattern.
 *
 * Instead of creating a single, rigid Card with props for each part (header, content, footer, etc.),
 * you expose subcomponents (CardClient.Header, CardClient.Content, CardClient.Footer, CardClient.Icon)
 * that can be used declaratively within <CardClient>.
 *
 * This allows for a clearer and more semantic API:
 *
 * <CardClient>
 * <CardClient.Header>Client Name</CardClient.Header>
 * <CardClient.Content>Main Card Content</CardClient.Content>
 * <CardClient.Footer>Actions</CardClient.Footer>
 * </CardClient>
 *
 * Like this:
 * - The parent component (<CardClient>) defines the base layout of the Card.
 * - The subcomponents (Header, Content, Footer, Icon) organize the internal structure.
 * - The pattern used here is known as "Compound Components."
 */

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
