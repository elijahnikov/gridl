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

type LinksRenderMapType = {
  type: LinkTypesIndex;
  slug?: SlugTypesIndex;
  render: (url: string) => React.ReactNode;
  extraLayoutProps?: Partial<ReactGridLayout.Layout>;
  name: string;
  icon: React.ReactNode;
};

export const linksRenderMap = [
  //
  // SOCIAL MEDIA
  //
  {
    type: "social",
    slug: "twitter",
    render: (url) => <TwitterEmbed url={url} />,
    name: "Twitter/X",
    icon: <BsTwitter />,
  },
  {
    type: "social",
    slug: "tiktok",
    render: (url) => <TikTokEmbed url={url} width={"100%"} />,
    name: "TikTok",
    icon: <BsTiktok />,
  },
  {
    type: "social",
    slug: "instagram",
    render: (url) => <InstagramEmbed igVersion="1" url={url} width={"100%"} />,
    name: "Instagram",
    icon: <BsInstagram />,
  },
  {
    type: "social",
    slug: "youtube",
    render: (url) => <YouTubeEmbed url={url} width={400} height={200} />,
    name: "YouTube",
    icon: <BsYoutube />,
  },
  {
    type: "social",
    slug: "pinterest",
    render: (url) => <PinterestEmbed url={url} />,
    name: "Pinterest",
    icon: <BsPinterest />,
  },
  {
    type: "social",
    slug: "linkedin",
    render: (url) => <LinkedInEmbed url={url} width={"100%"} />,
    name: "LinkedIn",
    icon: <BsLinkedin />,
  },
  //
  // MUSIC
  //
  {
    type: "music",
    slug: "spotify",
    render: (url) => <Spotify link={url} />,
    name: "Spotify",
    icon: <BsSpotify />,
  },
  {
    type: "music",
    slug: "soundcloud",
    render: (url) => <div>{url}</div>,
    name: "SoundCloud",
    icon: <p>test</p>,
  },
] as Array<LinksRenderMapType>;

export const addLinksRenderMap: Array<
  Omit<LinksRenderMapType, "render" | "extraLayoutProps">
> = linksRenderMap.map(({ render: _, extraLayoutProps: __, ...rest }) => rest);
