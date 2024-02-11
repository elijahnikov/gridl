import { Avatar, AvatarFallback, AvatarImage } from "@/lib/ui/avatar";

export default function GridlAvatar({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  function getInitials(input: string) {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }

  return (
    <Avatar>
      <AvatarImage src={url} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
