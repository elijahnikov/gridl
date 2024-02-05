import Layout from "@/components/common/page-layout";
import GridAuth from "./auth";

export default function GridProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridAuth>
      <Layout showNav={false}>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </Layout>
    </GridAuth>
  );
}
