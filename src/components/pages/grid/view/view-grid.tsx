import { type RouterOutputs } from "@/trpc/shared";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { type LayoutType } from "../editor/editor-container";
import { linksRenderMap } from "@/utils/linksMap";
import { Responsive, WidthProvider } from "react-grid-layout";
import { cn } from "@/utils/general";
import Cell from "../editor/cell";
import { api } from "@/trpc/react";

type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

function ViewGrid({ data }: { data: RouterOutputs["grid"]["gridForViewing"] }) {
  const [parsedLayout, setParsedLayout] = useState<LayoutType[]>([]);
  const initialized = useRef(false);
  const { mutate } = api.analytics.createGridAccessClick.useMutation();
  const layouts = useMemo(() => {
    return {
      lg: parsedLayout.map((obj) => {
        const newObj = { ...obj };
        return newObj;
      }),
    };
  }, [parsedLayout]);

  useEffect(() => {
    const reshapedLayout =
      data.gridItems.map((grid) => {
        return {
          i: grid.id,
          resizeHandles: [
            "se",
            "nw",
            "sw",
            "ne",
            "n",
            "e",
            "s",
            "w",
          ] as ResizeHandle[],
          ...grid,
          ...(grid.type === "basicLink"
            ? linksRenderMap.find((item) => item.type === grid.type)
            : linksRenderMap.find((item) => item.slug === grid.slug)
          )?.extraLayoutProps,
        };
      }) ?? [];
    setParsedLayout(reshapedLayout);
  }, [data]);

  const grid = useMemo(() => {
    const ResponsiveGridLayout = WidthProvider(Responsive);
    return (
      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 200, md: 150, sm: 100, xs: 50, xxs: 25 }}
        rowHeight={1}
        isDraggable={false}
        isDroppable={false}
        isResizable={false}
        useCSSTransforms={true}
      >
        {parsedLayout.length > 0 &&
          parsedLayout.map((l) => (
            <div
              style={{
                backgroundColor: l.bgColor ?? "none",
                color: l.textColor ?? "black",
              }}
              className={cn(
                l.type === "basicLink" && "shadow-[0px_0px_5px_1px_#00000024]",
                "flex justify-center rounded-xl",
              )}
              key={l.i}
            >
              <Cell l={l} editMode={false} />
            </div>
          ))}
      </ResponsiveGridLayout>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layouts, parsedLayout]);

  useEffect(() => {
    // if (!initialized.current) {
    //   initialized.current = true;
    //   setTimeout(() => {
    //     mutate({ gridId: data.id });
    //   }, 5000);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={(e: React.MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement.classList.contains("rsme-twitter-embed")) {
          console.log("Embed clicked!");
        }
      }}
      style={{ background: data.bgColor ?? "none" }}
      className="h-full rounded-md"
    >
      {grid}
    </div>
  );
}

export default memo(ViewGrid);
