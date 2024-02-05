import { LoadingPage } from "@/components/common/loading-spinner";
import Layout from "@/components/common/page-layout";
import { Card } from "@/lib/ui/card";

export default function GridViewLoading() {
  return (
    <Layout showNav={false}>
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <Card className="mx-auto my-auto flex h-full w-full justify-center py-20 text-center">
          <LoadingPage />
        </Card>
      </div>
    </Layout>
  );
}
