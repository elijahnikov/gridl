"use client";

import GridCellListEntry from "./grid-cell-list-entry";
import { Input } from "@/lib/ui/input";
import MultipleSelector, { type Option } from "@/lib/ui/fancy-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { getGridItemsBySlug } from "@/utils/getGrids";
import { useMemo, useState } from "react";
import GridCellListPlaceholder from "./grid-cell-list-placeholder";
import GridCellListEmpty from "./grid-cell-list-empty";

export type GridCell = {
  id: string;
  name: string | null;
  type: string;
  slug: string;
  url: string | null;
  text: string | null;
  bgColor: string | null;
  textColor: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  tags: string | null;
  gridId: string;
  createdAt: Date;
  updatedAt: Date;
} & {
  _count: {
    itemClicks: number;
  };
};

export default function GridCellList({ slug }: { slug: string }) {
  const [sortOrder, setSortOrder] = useState<string>("name");
  const [searchValue, setSearchValue] = useState<string>("");
  const [domainsFilter, setDomainsFilter] = useState<Option[]>([]);
  const [tagsFilter, setTagsFilter] = useState<Option[]>([]);
  const { data: gridItems, isLoading } = getGridItemsBySlug(slug, sortOrder);

  const tagOptions = useMemo(() => {
    return Array.from(
      new Set(
        gridItems?.flatMap((obj) =>
          ((obj.tags ?? "") as string).split(",").map((tag) => tag.trim()),
        ) ?? [],
      ),
    )
      .filter((tag) => tag !== "")
      .map((tag) => ({ label: tag, value: tag }));
  }, [gridItems]);

  const domainOptions = useMemo(() => {
    return Array.from(
      new Set(
        (gridItems ?? [])
          .map((obj) => {
            if (obj.url) {
              const urlObj = new URL(obj.url);
              return urlObj.hostname;
            }
            return undefined;
          })
          .filter((domain) => domain !== undefined) as string[],
      ),
    )
      .filter((domain) => domain !== "")
      .map((domain) => ({ label: domain, value: domain }));
  }, [gridItems]);

  const filteredData = gridItems?.filter((item) => {
    const nameMatches =
      !searchValue ||
      (item.name ?? "").toLowerCase().includes(searchValue.toLowerCase());

    const domainMatches =
      !domainsFilter.length ||
      (item.url &&
        domainsFilter.some((filterItem) => {
          const urlObj = new URL(item.url!);
          const domain = urlObj.hostname;
          return domain.includes(filterItem.value);
        }));

    const tagMatches =
      !tagsFilter.length ||
      (item.tags &&
        tagsFilter.some((filterItem) => {
          const tagsArray = item.tags!.split(",").map((tag) => tag.trim());
          return tagsArray.includes(filterItem.value);
        }));

    return nameMatches && domainMatches && tagMatches;
  });

  if (isLoading) {
    return <GridCellListPlaceholder />;
  }
  if (!isLoading && gridItems?.length === 0) {
    return <GridCellListEmpty />;
  }

  return (
    <div className="space-y-3">
      <div className="flex grid w-full grid-cols-3 gap-2 lg:grid-cols-6">
        <div className="col-span-1">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a link"
            className="w-full"
          />
        </div>
        <div className="col-span-2 w-full">
          <MultipleSelector
            onChange={setTagsFilter}
            hidePlaceholderWhenSelected
            className="bg-white"
            defaultOptions={tagOptions}
            placeholder="Filter by tag"
          />
        </div>
        <div className="col-span-2 w-full">
          <MultipleSelector
            onChange={setDomainsFilter}
            hidePlaceholderWhenSelected
            defaultOptions={domainOptions}
            className="bg-white"
            placeholder="Filter by link"
          />
        </div>
        <div>
          <Select onValueChange={setSortOrder} defaultValue="createdAt">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="clicks">Number of clicks</SelectItem>
              <SelectItem value="createdAt">Created at</SelectItem>
              <SelectItem value="updatedAt">Updated at</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredData?.map((item, index) => (
        <GridCellListEntry key={index} item={item} slug={slug} />
      ))}
    </div>
  );
}
