import LoginButton from "@/components/pages/login/login-button";
import LoginForm from "@/components/pages/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";

import { cn } from "@/lib/utils";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-5 mx-auto">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="font-bold">Login</CardTitle>
          <CardDescription>
            Use Email or SSO to log into your Gridl account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto mt-4 w-11/12 max-w-xs space-y-5 sm:w-full">
            <Suspense
              fallback={
                <div className="my-2 h-10 w-full rounded-md border border-slate-200 bg-slate-100" />
              }
            >
              <LoginForm />
            </Suspense>
            <hr />
            <Suspense
              fallback={
                <div className="my-2 h-10 w-full rounded-md border border-slate-200 bg-slate-100" />
              }
            >
              <LoginButton />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
