import Image from "next/image";

export default function Avatar({
  url,
  size = 50,
}: {
  url: string;
  size?: number;
}) {
  return (
    <Image
      src={url}
      alt="Profile picture"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
