"use client";

import { Button } from "@/lib/ui/button";
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
import stringIsValidURL from "@/utils/isValidUrl";
import { linksRenderMap } from "@/utils/linksMap";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import { type z } from "zod";

const formSchema = createGridItemSchema;

export default function AddLink() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.createGridItem.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [name, url] = useWatch({
    control: form.control,
    name: ["name", "url"],
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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Your new link will be added to the top left corner of your grid.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5">
          <div>
            <InputSection form={form} onSubmit={onSubmit} />
            <Preview name={name} url={url} />
          </div>
          {/* <div>
          </div> */}
          <p></p>
        </div>
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

function InputSection({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Name{" "}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  Optional
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="My new link" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="www.twitter.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function Preview({ name, url }: { name?: string; url?: string }) {
  const linkComponent = useMemo(() => {
    return linksRenderMap.find((link) => {
      return link.slug && url?.includes(link.slug);
    });
  }, [url]);

  let preview = null;
  if (!url) {
    preview = (
      <>
        <h1 className="text-slate-900">Preview</h1>
        <h1 className="text-sm text-slate-600">
          Paste a link above to see it here!
        </h1>
      </>
    );
  }

  if (!stringIsValidURL) {
    preview = (
      <>
        <h1 className="text-slate-900">Error</h1>
        <h1 className="text-sm text-slate-600">
          Your supplied link is invalid, please try another.
        </h1>
      </>
    );
  }

  if (url && linkComponent) {
    preview = <>{url && linkComponent && linkComponent.render(url)}</>;
  }

  if (url && stringIsValidURL(url) && !linkComponent) {
    preview = (
      <div className="flex max-w-full flex-col rounded-md bg-white p-1 text-left">
        <h1 className="text-left font-semibold">{name}</h1>
        <p className="truncate text-sm text-slate-600">{url}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 flex max-w-[440px]">
      <div className="mx-auto flex min-h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed bg-gray-100/50 p-5 text-center">
        {preview}
      </div>
    </div>
  );
}
