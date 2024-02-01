"use client";

import Favicon from "@/components/common/favicon";
import { type RouterOutputs } from "@/trpc/shared";
import { linksRenderMap } from "@/utils/linksMap";
import { memo, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BackgroundPick from "./editor/background-color-select";

const propertiesToDelete = [
  "type",
  "url",
  "text",
  "id",
  "gridId",
  "bgColor",
  "tags",
  "name",
];

export type LayoutType = {
  type: string;
  name: string | null;
  url: string | null;
  text: string | null;
  bgColor: string | null;
  textColor: string | null;
  id: string;
  gridId: string;
  slug: string;
} & ReactGridLayout.Layout;

type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

function Editor({ data }: { data: RouterOutputs["grid"]["gridForEditing"] }) {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [parsedLayout, setParsedLayout] = useState<LayoutType[]>([]);

  const layouts = useMemo(() => {
    return {
      lg: parsedLayout.map((obj) => {
        const newObj = { ...obj };
        propertiesToDelete.forEach((prop) => {
          if (newObj.hasOwnProperty(prop)) {
            delete newObj[prop as keyof typeof newObj];
          }
        });
        return newObj;
      }),
    };
  }, [parsedLayout]);

  useEffect(() => {
    const reshapedLayout =
      data.gridItems.map((grid) => {
        return {
          i: grid.id,
          resizeHandles: ["se", "nw", "sw", "ne"] as ResizeHandle[],
          ...grid,
          ...linksRenderMap.find((item) => item.slug === grid.slug)
            ?.extraLayoutProps,
        };
      }) ?? [];
    setParsedLayout(reshapedLayout);
  }, [data]);

  const gridEditor = useMemo(() => {
    return (
      <ResponsiveGridLayout
        // onDrop={(e, r, t) => onDrop(e, r, t, selectedOnDropItem)}
        isDroppable={true}
        // compactType={"horizontal"}
        layouts={layouts}
        // onLayoutChange={(e) => console.log({ e })}
        cols={{
          lg: 200,
          md: 200,
          sm: 200,
          xs: 1,
          xxs: 1,
        }}
        rowHeight={1}
        draggableCancel=".cancelSelectorName"
        useCSSTransforms={true}
      >
        {parsedLayout.length > 0 &&
          parsedLayout.map((l) => (
            <div
              style={{
                backgroundColor: l.bgColor ?? "none",
                color: l.textColor ?? "black",
                display: "flex",
                justifyContent: "center",
              }}
              className="rounded-2xl"
              key={l.i}
            >
              {l.type === "basicLink" ? (
                <div className="flex items-center justify-center space-x-2">
                  <Favicon size={20} url={l.url!} />
                  <span>{l.name}</span>
                </div>
              ) : (
                linksRenderMap
                  .find((item) => item.slug === l.slug)
                  ?.render(l.url!)
              )}
            </div>
          ))}
      </ResponsiveGridLayout>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResponsiveGridLayout, layouts, parsedLayout]);

  return (
    <div>
      <div
        style={{ background: data.bgColor ?? "none" }}
        className="min-h-[80vh] rounded-md"
      >
        {gridEditor}
      </div>
      {document.getElementById("testBg") &&
        createPortal(
          <BackgroundPick
            gridId={data.id}
            defaultBg={data.bgColor ?? undefined}
          />,
          document.getElementById("testBg") as Element,
        )}
    </div>
  );
}

export default memo(Editor);
