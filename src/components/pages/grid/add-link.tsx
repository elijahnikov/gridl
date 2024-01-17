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
import { zodResolver } from "@hookform/resolvers/zod";

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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Social</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="h-[100px]">hello</CardContent>
                </Card>
                <Card>
                  <CardContent>hello</CardContent>
                </Card>
                <Card>
                  <CardContent className="h-[100px]">hello</CardContent>
                </Card>
                <Card>
                  <CardContent>hello</CardContent>
                </Card>
                <Card>
                  <CardContent className="h-[100px]">hello</CardContent>
                </Card>
                <Card>
                  <CardContent>hello</CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Music</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Basic Link</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
