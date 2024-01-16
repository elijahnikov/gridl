import { Avatar, AvatarFallback, AvatarImage } from "@/lib/ui/avatar";

export default function GridlAvatar({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  function getInitials(input: string) {
    const words = input.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    const result = initials.join("");
    return result;
  }

  return (
    <Avatar>
      <AvatarImage src={url} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
