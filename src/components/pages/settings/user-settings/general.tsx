"use client";

import GridlAvatar from "@/components/common/avatar";
import LoadingSpinner from "@/components/common/loading-spinner";
import { Button } from "@/lib/ui/button";
import { Card, CardFooter } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { api } from "@/trpc/react";

export default function GeneralUserSettings() {
  const { data, isLoading } = api.auth.getCurrentUserSettings.useQuery();
  return (
    <div>
      <h1 className="text-xl">General</h1>
      {isLoading && (
        <div className="flex h-24 w-full items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      )}
      {data && (
        <div className="mt-5 space-y-8">
          {/* username */}
          <Card className="px-5 py-4">
            <div>
              <Label>Username</Label>
              <Input className="w-[50%]" value={data.name ?? ""} />
            </div>
            <CardFooter className="-mb-3">
              <div className="flex w-full">
                <div className="w-full" />
                <Button size="sm">Save changes</Button>
              </div>
            </CardFooter>
          </Card>
          {/* email */}
          <Card>
            <Label>Email</Label>
            <Input className="w-[50%]" value={data.email ?? ""} />
            <div className="flex w-full">
              <div className="w-full" />
              <Button size="sm">Save changes</Button>
            </div>
          </Card>
          {/* profile picture */}
          <Card>
            <Label>Profile picture</Label>
            {data.image && <GridlAvatar name={data.name!} url={data.image} />}
            <div className="flex w-full">
              <div className="w-full" />
              <Button size="sm">Save changes</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
