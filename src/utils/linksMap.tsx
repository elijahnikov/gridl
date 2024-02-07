import {
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  TikTokEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { Spotify } from "react-spotify-embed";

import type ReactGridLayout from "react-grid-layout";
import {
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsSpotify,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaSoundcloud } from "react-icons/fa";
import { cn } from "@/lib/utils";

export const linkTypes = ["social", "music", "basicLink"] as const;
type LinkTypesIndex = (typeof linkTypes)[number];

const slugTypes = [
  "twitter",
  "tiktok",
  "instagram",
  "linkedin",
  "spotify",
  "soundcloud",
  "pinterest",
  "youtube",
] as const;
type SlugTypesIndex = (typeof slugTypes)[number];

export type LinksRenderMapType = {
  type: LinkTypesIndex;
  slug: SlugTypesIndex;
  render: (url: string, name?: string) => React.ReactNode;
  extraLayoutProps?: Partial<ReactGridLayout.Layout>;
  name: string;
  icon: React.ReactNode;
  defaultHeight?: number;
  defaultWidth?: number;
};

function EmbedContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-max w-max rounded-xl",
        "shadow-[0px_0px_5px_1px_#00000024]",
      )}
    >
      {children}
    </div>
  );
}

export const linksRenderMap = [
  //
  // SOCIAL MEDIA
  //
  {
    type: "social",
    slug: "twitter",
    render: (url) => (
      <EmbedContainer>
        <TwitterEmbed width={"100%"} url={url} />
      </EmbedContainer>
    ),
    name: "Twitter/X",
    icon: <BsTwitter size={25} />,
    defaultHeight: 43,
    defaultWidth: 30,
  },
  {
    type: "social",
    slug: "tiktok",
    render: (url) => (
      <EmbedContainer>
        <TikTokEmbed url={url} width={"100%"} />
      </EmbedContainer>
    ),
    name: "TikTok",
    icon: <BsTiktok size={25} />,
  },
  {
    type: "social",
    slug: "instagram",
    render: (url) => <InstagramEmbed igVersion="1" url={url} width={"100%"} />,
    name: "Instagram",
    icon: <BsInstagram size={25} />,
    defaultHeight: 49,
    defaultWidth: 39,
  },
  {
    type: "social",
    slug: "youtube",
    render: (url) => (
      <EmbedContainer>
        <YouTubeEmbed url={url} width={400} height={200} />
      </EmbedContainer>
    ),
    name: "YouTube",
    icon: <BsYoutube size={25} />,
  },
  {
    type: "social",
    slug: "pinterest",
    render: (url) => (
      <EmbedContainer>
        <PinterestEmbed url={url} />
      </EmbedContainer>
    ),
    name: "Pinterest",
    icon: <BsPinterest size={25} />,
  },
  {
    type: "social",
    slug: "linkedin",
    render: (url) => (
      <EmbedContainer>
        <LinkedInEmbed url={url} width={"100%"} />
      </EmbedContainer>
    ),
    name: "LinkedIn",
    icon: <BsLinkedin size={25} />,
  },
  //
  // MUSIC
  //
  {
    type: "music",
    slug: "spotify",
    render: (url) => (
      <EmbedContainer>
        <Spotify className="-mb-[28px]" link={url} />
      </EmbedContainer>
    ),
    name: "Spotify",
    icon: <BsSpotify size={25} />,
    defaultHeight: 33,
    defaultWidth: 35,
  },
  {
    type: "music",
    slug: "soundcloud",
    render: (url) => <div>{url}</div>,
    name: "SoundCloud",
    icon: <FaSoundcloud size={25} />,
  },
  //
  // BASIC
  //
  {
    type: "basicLink",
    slug: "",
    render: (url, name) => (
      <div>
        <p>{name}</p>
      </div>
    ),
    defaultHeight: 8,
    defaultWidth: 30,
    extraLayoutProps: {
      minH: 4,
      minW: 25,
    },
  },
] as Array<LinksRenderMapType>;
