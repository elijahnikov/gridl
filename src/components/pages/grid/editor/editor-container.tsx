"use client";

import { type RouterOutputs } from "@/trpc/shared";
import { linksRenderMap } from "@/utils/linksMap";
import { memo, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BackgroundPick from "./background-color-select";
import { Button } from "@/lib/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import _ from "lodash";
import { cn } from "@/utils/general";
import Cell from "./cell";

export type LayoutType = {
  type: string;
  name: string;
  url: string | null;
  text: string | null;
  bgColor: string | null;
  textColor: string | null;
  id: string;
  gridId: string;
  slug: string;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
} & ReactGridLayout.Layout;

type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

function EditorContainer({
  data,
}: {
  data: RouterOutputs["grid"]["gridForEditing"];
}) {
  const [intermediateColor, setIntermediateColor] = useState<
    string | undefined
  >(data.bgColor ?? "white");

  const [parsedLayout, setParsedLayout] = useState<LayoutType[]>([]);
  const [updatedLayout, setUpdatedLayout] = useState<LayoutType[]>([]);
  const [hasModified, setHasModified] = useState<boolean>(false);

  const { mutate, isLoading } = api.gridItem.updateGridItems.useMutation({
    onSuccess: () => {
      toast.success("Successfully updated your grid!", {
        duration: 2000,
      });
    },
  });
  const { mutate: updateBg, isLoading: updateBgIsLoading } =
    api.grid.updateGrid.useMutation();

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
    setUpdatedLayout(reshapedLayout);
  }, [data]);

  const onLayoutChangeHandler = (e: ReactGridLayout.Layout[]) => {
    const updatedArray = parsedLayout.map((obj2) => {
      const matchingObject = e.find((obj1) => obj1.i === obj2.i);
      if (matchingObject) {
        const { h, w, x, y } = matchingObject;
        return { ...obj2, h, w, x, y };
      }
      return obj2;
    });
    setUpdatedLayout(updatedArray);
  };

  const gridEditor = useMemo(() => {
    const ResponsiveGridLayout = WidthProvider(Responsive);
    return (
      <ResponsiveGridLayout
        layouts={layouts}
        onDragStop={onLayoutChangeHandler}
        onResizeStop={onLayoutChangeHandler}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 200, md: 150, sm: 100, xs: 50, xxs: 25 }}
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
              }}
              className={cn(
                l.type === "basicLink" && "shadow-[0px_0px_5px_1px_#00000024]",
                "flex justify-center rounded-xl",
              )}
              key={l.i}
            >
              <Cell l={l} editMode={true} />
            </div>
          ))}
      </ResponsiveGridLayout>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layouts, parsedLayout]);

  useEffect(() => {
    if (
      !_.isEqual(parsedLayout, updatedLayout) ||
      !_.isEqual(data.bgColor, intermediateColor)
    ) {
      setHasModified(true);
    } else {
      setHasModified(false);
    }
  }, [data.bgColor, intermediateColor, parsedLayout, updatedLayout]);

  return (
    <div>
      <div
        style={{ background: intermediateColor ?? "none" }}
        className="min-h-[80vh] rounded-md"
      >
        {gridEditor}
      </div>
      {document.getElementById("backgroundPick") &&
        createPortal(
          <>
            <BackgroundPick
              setBackgroundColor={setIntermediateColor}
              defaultBg={intermediateColor}
            />
          </>,
          document.getElementById("backgroundPick") as Element,
        )}
      {document.getElementById("saving") &&
        createPortal(
          <>
            <Button
              onClick={() => {
                mutate(updatedLayout);
                updateBg({ id: data.id, bgColor: intermediateColor });
                setHasModified(false);
              }}
              disabled={isLoading || updateBgIsLoading || !hasModified}
              className="w-[180px]"
            >
              {isLoading || updateBgIsLoading ? "Saving..." : "Save"}
            </Button>
          </>,
          document.getElementById("saving") as Element,
        )}
    </div>
  );
}

export default memo(EditorContainer);
