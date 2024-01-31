"use client";

import Favicon from "@/components/common/favicon";
import { type RouterOutputs } from "@/trpc/shared";
import { linksRenderMap } from "@/utils/linksMap";
import { memo, useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

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

type LayoutType = {
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

  const [backgroundColor, setBackgroundColor] = useState<string>("");
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
          resizeHandles: ["se", "nw"] as ResizeHandle[],
          ...grid,
          ...linksRenderMap.find((item) => item.slug === grid.slug)
            ?.extraLayoutProps,
        };
      }) ?? [];

    setParsedLayout(reshapedLayout);
    setBackgroundColor(data?.bgColor ?? "white");
  }, [data]);

  const gridEditor = useMemo(() => {
    return (
      <ResponsiveGridLayout
        // onDrop={(e, r, t) => onDrop(e, r, t, selectedOnDropItem)}
        isDroppable={true}
        // compactType={"vertical"}
        layouts={layouts}
        onLayoutChange={(e) => console.log({ e })}
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
                backgroundColor: l.bgColor ?? "white",
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
  }, [ResponsiveGridLayout, layouts, parsedLayout]);

  return <div className="h-[73vh] rounded-md bg-white">{gridEditor}</div>;
}

export default memo(Editor);
