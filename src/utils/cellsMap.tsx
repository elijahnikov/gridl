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

const cellTypes = [
  "social",
  "music",
  "interaction",
  "linkCompact",
  "linkBig",
] as const;
type CellTypesIndex = (typeof cellTypes)[number];

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

type CellsMap = {
  type: CellTypesIndex;
  slug?: SlugTypesIndex;
  render: (url: string) => React.ReactNode;
  extraLayoutProps?: Partial<ReactGridLayout.Layout>;
};

export const cellsChoices = [
  //
  // SOCIAL MEDIA
  //
  {
    type: "social",
    slug: "twitter",
    render: (url) => <TwitterEmbed url={url} />,
  },
  {
    type: "social",
    slug: "tiktok",
    render: (url) => <TikTokEmbed url={url} width={"100%"} />,
  },
  {
    type: "social",
    slug: "instagram",
    render: (url) => <InstagramEmbed igVersion="1" url={url} width={"100%"} />,
  },
  {
    type: "social",
    slug: "youtube",
    render: (url) => <YouTubeEmbed url={url} width={400} height={200} />,
  },
  {
    type: "social",
    slug: "pinterest",
    render: (url) => <PinterestEmbed url={url} />,
  },
  {
    type: "social",
    slug: "linkedin",
    render: (url) => <LinkedInEmbed url={url} width={"100%"} />,
  },
  //
  // MUSIC
  //
  {
    type: "music",
    slug: "spotify",
    render: (url) => <Spotify link={url} />,
  },
] as Array<CellsMap>;
