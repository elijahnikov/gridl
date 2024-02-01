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
    icon: <BsTwitter size={25} />,
  },
  {
    type: "social",
    slug: "tiktok",
    render: (url) => <TikTokEmbed url={url} width={"100%"} />,
    name: "TikTok",
    icon: <BsTiktok size={25} />,
  },
  {
    type: "social",
    slug: "instagram",
    render: (url) => <InstagramEmbed igVersion="1" url={url} width={"100%"} />,
    name: "Instagram",
    icon: <BsInstagram size={25} />,
  },
  {
    type: "social",
    slug: "youtube",
    render: (url) => <YouTubeEmbed url={url} width={400} height={200} />,
    name: "YouTube",
    icon: <BsYoutube size={25} />,
  },
  {
    type: "social",
    slug: "pinterest",
    render: (url) => <PinterestEmbed url={url} />,
    name: "Pinterest",
    icon: <BsPinterest size={25} />,
  },
  {
    type: "social",
    slug: "linkedin",
    render: (url) => <LinkedInEmbed url={url} width={"100%"} />,
    name: "LinkedIn",
    icon: <BsLinkedin size={25} />,
  },
  //
  // MUSIC
  //
  {
    type: "music",
    slug: "spotify",
    render: (url) => <Spotify link={url} />,
    name: "Spotify",
    icon: <BsSpotify size={25} />,
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
    extraLayoutProps: {
      minH: 4,
      minW: 25,
    },
  },
] as Array<LinksRenderMapType>;
