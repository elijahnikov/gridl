"use client";

import GridCellListEntry from "./grid-cell-list-entry";
import { Input } from "@/lib/ui/input";
import MultipleSelector from "@/lib/ui/fancy-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { getGridItemsBySlug } from "@/utils/getGrids";
import { useState } from "react";
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
  const { data: gridItems, isLoading } = getGridItemsBySlug(slug, sortOrder);

  if (isLoading) {
    return <GridCellListPlaceholder />;
  }
  if (!isLoading && gridItems?.length === 0) {
    return <GridCellListEmpty />;
  }

  const filteredGridItemLinks = gridItems?.filter((item) =>
    item.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  const tagsArray = Array.from(new Set(gridItems?.flatMap(obj =>
    (obj.tags ?? '').split(',').map(tag => tag.trim())
  )))
    .filter(tag => tag !== '')
    .map(tag => ({ label: tag, value: tag }));

  return (
    <div className="space-y-3">
      <div className="flex grid w-full grid-cols-6 gap-2">
        <div className="col-span-1">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a link"
            className="w-full"
          />
        </div>
        <div className="w-full col-span-2">
          <MultipleSelector
            hidePlaceholderWhenSelected
            className="bg-white"
            defaultOptions={tagsArray}
            placeholder="Filter by tag"
          />
        </div>
        <div className="w-full col-span-2">
          <MultipleSelector className="bg-white" placeholder="Filter by link" />
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
      {filteredGridItemLinks?.map((item, index) => (
        <GridCellListEntry key={index} item={item} slug={slug} />
      ))}
    </div>
  );
}
