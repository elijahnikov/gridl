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
