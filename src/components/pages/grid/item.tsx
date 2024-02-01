import Favicon from "@/components/common/favicon";
import { type LayoutType } from "./editor";
import { linksRenderMap } from "@/utils/linksMap";
import { memo } from "react";

function Item({ l }: { l: LayoutType }) {
  return (
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
        linksRenderMap.find((item) => item.slug === l.slug)?.render(l.url!)
      )}
    </div>
  );
}

export default memo(Item);
