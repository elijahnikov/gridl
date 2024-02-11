import Layout from "@/components/common/page-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </Layout>
  );
}
