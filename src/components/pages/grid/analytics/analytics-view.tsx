"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { createPortal } from "react-dom";

export default function AnalyticsView() {
  return (
    <div>
      <div>hello</div>
      {document.getElementById("dateSelect") &&
        createPortal(
          <div>
            <Select defaultValue="createdAt">
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
          </div>,
          document.getElementById("dateSelect") as Element,
        )}
    </div>
  );
}
