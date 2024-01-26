import Image from "next/image";
import React from "react";

export default function Favicon({ url }: { url: string }) {
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt="Favicon"
      width={40}
      height={40}
    />
  );
}
