import Layout from "@/components/common/page-layout";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function GridViewError() {
  return (
    <Layout showNav={false}>
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <Card className="mx-auto h-full w-full justify-center py-20 text-center">
          <Image
            src={"https://illustrations.popsy.co/white/crashed-error.svg"}
            width={400}
            height={400}
            alt="error"
            className="pointer-events-none mx-auto select-none"
          />
          <h1 className="mt-10 text-[36px] font-bold">Grid not found!</h1>
          <p className="text-md text-slate-500">
            The grid you are looking for does not exist.
          </p>
          <Link href={"/"}>
            <Button className="mt-5">Back to home</Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
