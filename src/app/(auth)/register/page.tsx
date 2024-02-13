import LoginRegisterHeader from "@/components/pages/login/header";
import LoginButton from "@/components/pages/login/login-button";
import RegisterForm from "@/components/pages/register/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";

import { cn } from "@/utils/general";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-5 mx-auto">
      <Card className={cn("w-[400px] bg-slate-100/30")}>
        <LoginRegisterHeader />
        <CardHeader>
          <CardTitle className="font-bold">Register</CardTitle>
          <CardDescription>
            Use Email or SSO to create your Gridl account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-11/12 max-w-xs space-y-5 sm:w-full">
            <RegisterForm />
            <hr />
            <LoginButton />
          </div>
        </CardContent>
      </Card>
      <p className="mt-2 text-center text-xs text-slate-600 ">
        Already have an account?
        <br />
        <Link
          className="font-medium text-black hover:text-slate-600"
          href="/login"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
