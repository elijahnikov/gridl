import LoginRegisterHeader from "@/components/pages/login/header";
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
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-5 mx-auto">
      <Card className={cn("w-[400px]")}>
        <LoginRegisterHeader />
        <CardHeader>
          <CardTitle className="font-bold">Login</CardTitle>
          <CardDescription>
            Use Email or SSO to log into your Gridl account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-11/12 max-w-xs space-y-5 sm:w-full">
            <LoginForm />
            <hr />
            <LoginButton />
          </div>
        </CardContent>
      </Card>
      <p className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        Dont have an account?
        <br />
        <Link
          className="font-medium text-black hover:text-slate-600"
          href="/register"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
