"use client";

import { type RouterOutputs } from "@/trpc/shared";
import { cellsChoices } from "@/utils/cellsMap";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const propertiesToDelete = ["type", "url", "text", "id", "gridId", "bgColor"];

type LayoutType = {
  type: string;
  url: string | null;
  text: string | null;
  bgColor: string | null;
  id: string;
  gridId: string;
} & ReactGridLayout.Layout;

type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

export default function Editor({
  data,
}: {
  data: RouterOutputs["grid"]["gridForEditing"];
}) {
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
          ...grid,
          i: grid.id,
          resizeHandles: ["se", "nw"] as ResizeHandle[],
          ...cellsChoices.find((item) => item.type === grid.type)
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
              style={
                l.bgColor
                  ? {
                      backgroundColor: l.bgColor,
                    }
                  : {}
              }
              className="rounded-lg"
              key={l.i}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {cellsChoices
                    .find((item) => item.type === l.type)
                    ?.render(l.url!)}
                </div>
              </div>
            </div>
          ))}
      </ResponsiveGridLayout>
    );
  }, [ResponsiveGridLayout, layouts, parsedLayout]);

  return <div className="h-[73vh] rounded-md bg-white">{gridEditor}</div>;
}
