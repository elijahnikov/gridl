"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Button } from "@/lib/ui/button";
import { Card, CardContent } from "@/lib/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { createGridItemSchema } from "@/server/api/schemas/gridItem";
import { api } from "@/trpc/react";
import { addLinksRenderMap, linkTypes } from "@/utils/linksMap";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const formSchema = createGridItemSchema;

export default function AddLink() {
  const { data: sesison } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.createGridItem.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ...values,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Your new link will be added to the top left corner of your grid.
          </DialogDescription>
        </DialogHeader>
        <DropdownSection />
        <DialogFooter>
          <div className="mt-5 flex w-full space-x-2">
            <Button
              variant={"secondary"}
              type="reset"
              onClick={() => form.reset({})}
            >
              Cancel
            </Button>
            <Button className=" w-full" type="submit">
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DropdownSection() {
  return (
    <Accordion type="single">
      {linkTypes.map((type, index) => (
        <AccordionItem value={type} key={index}>
          <AccordionTrigger>{_.startCase(type)}</AccordionTrigger>
          <AccordionContent>
            <AddLinkSection section={type} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AddLinkSection({ section }: { section: string }) {
  return (
    <>
      {addLinksRenderMap
        .filter((link) => link.type === section)
        .map((lnk, index) => (
          <Card key={index}>
            <CardContent>{lnk.name}</CardContent>
          </Card>
        ))}
    </>
  );
}
