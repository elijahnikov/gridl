"use client";

import Layout from "@/components/common/page-layout";
import ShareModal from "@/components/pages/grid/view/share-modal";
import ViewGrid from "@/components/pages/grid/view/view-grid";
import { Card } from "@/lib/ui/card";

import { useGetGridForViewing } from "@/utils/getGrids";

export default function GridViewPage() {
  const { data } = useGetGridForViewing();
  return (
    <Layout showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="mx-auto h-full w-full justify-center text-center">
          {data && <ViewGrid data={data} />}
          {data && <ShareModal slug={data.slug} />}
        </Card>
      </div>
    </Layout>
  );
}
