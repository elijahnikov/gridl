"use client";

import { Button } from "@/lib/ui/button";
import { useEffect, useState } from "react";
import { BsDiscord, BsGoogle, BsTwitter } from "react-icons/bs";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { type BuiltInProviderType } from "next-auth/providers/index";
import { IconBase } from "react-icons/lib";
import LoadingSpinner from "@/components/common/loading-spinner";

const logoMap = {
  discord: <BsDiscord />,
  google: <BsGoogle />,
  twitter: <BsTwitter />,
};

export default function LoginButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchNextAuth = async () => {
      setLoading(true);
      if (status !== "loading") {
        if (providers === null) {
          const providersTemp = await getProviders();
          setProviders(providersTemp);
        }
      }
      setLoading(false);
    };

    void fetchNextAuth();
  }, [providers]);

  return (
    <div className="flex flex-col space-y-2">
      {providers
        ? Object.keys(providers)
            .filter((p) => p !== "credentials")
            .map((providerKey, index) => (
              <Button
                key={index}
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  void signIn(providerKey, { callbackUrl: "/" });
                }}
                variant={"outline"}
                className="w-full"
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <IconBase className="mr-2">
                      {logoMap[providerKey as keyof typeof logoMap]}
                    </IconBase>
                    Sign in with {providers[providerKey]?.name}
                  </>
                )}
              </Button>
            ))
        : null}
    </div>
  );
}
