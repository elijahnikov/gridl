import { Card } from "@/lib/ui/card";
import { type RouterOutputs } from "@/trpc/shared";
import { BarList } from "@tremor/react";
import countryList, { overwrite } from "country-list";
import { useState } from "react";

overwrite;

type LocationCount = {
  country: string;
  city: string | null;
  count: number;
  flag: string | null;
};

export default function LocationChart({
  data,
}: {
  data: RouterOutputs["analytics"]["gridClicks"];
}) {
  const [chosenKey, setChosenKey] = useState<"country" | "city">("country");
  const locationCountrs: LocationCount[] = data.reduce(
    (result: LocationCount[], item) => {
      if (item.country !== null) {
        const index = result.findIndex(
          (entry) => entry.country === item.country,
        );
        if (index !== -1) {
          result[index]!.count++;
        } else {
          result.push({
            country: item.country,
            city: item.city ?? null,
            count: 1,
            flag: item.flag ?? null,
          });
        }
      }
      return result;
    },
    [],
  );

  return (
    <Card className="p-5">
      <h3 className="font-medium">Location</h3>
      <p className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Country</span>
        <span>Clicks</span>
      </p>
      <BarList
        color="slate-300"
        data={locationCountrs.map((location) => {
          return {
            name: countryList.getName(location.country)!,
            value: location.count,
          };
        })}
        className="mt-2"
      />
    </Card>
  );
}
