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
import { Label } from "@/lib/ui/label";
import { cn } from "@/lib/utils";
import { createGridItemSchema } from "@/server/api/schemas/gridItem";
import { api } from "@/trpc/react";
import stringIsValidURL from "@/utils/isValidUrl";
import { type LinksRenderMapType, linksRenderMap } from "@/utils/linksMap";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  type UseFormReturn,
  useForm,
  useWatch,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const formSchema = createGridItemSchema;

export default function AddLink({ slug }: { slug: string }) {
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.createGridItem.useMutation({
    onSuccess() {
      void trpcUtils.grid.gridForEditing.invalidate();
      toast.success("Successfully added your new link to " + slug);
      setOpen(false);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gridSlug: slug,
      x: 0,
      y: 0,
      h: 12,
      w: 12,
    },
  });

  const [name, url, bgColor, textColor] = useWatch({
    control: form.control,
    name: ["name", "url", "bgColor", "textColor"],
  });

  const linkComponent = useMemo(() => {
    return linksRenderMap.find((link) => {
      return link.slug && url?.includes(link.slug);
    });
  }, [url]);

  useEffect(() => {
    if (typeof linkComponent !== "undefined") {
      form.setValue("slug", linkComponent.slug);
      form.setValue("type", linkComponent.type);
    } else if (typeof url !== "undefined") {
      form.setValue("slug", url.split(".")[1]!);
      form.setValue("type", "basicLink");
    }
  }, [form, linkComponent, url]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate({
      ...values,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Link</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] w-[900px] max-w-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Your new link will be added to the top left corner of your grid. To
            grab your desired link, make sure to copy and paste from the URL bar
            or through the share button on your desired platform.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex">
            <InputSection
              showColorPicker={
                typeof linkComponent === "undefined" &&
                form.getValues("url") !== "" &&
                stringIsValidURL(form.getValues("url")!)
              }
              form={form}
              onSubmit={onSubmit}
            />
            <Preview
              bgColor={bgColor}
              textColor={textColor}
              linkComponent={linkComponent}
              name={name}
              url={url}
            />
          </div>
          <p></p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InputSection({
  form,
  onSubmit,
  showColorPicker,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  showColorPicker: boolean;
}) {
  return (
    <div className="w-[80%] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Name</FormLabel>
                <FormControl>
                  <Input placeholder="My new link" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {showColorPicker && (
            <div className="flex gap-10">
              <Controller
                control={form.control}
                name="bgColor"
                defaultValue={"#ffffff"}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <HexColorPicker color={value} onChange={onChange} />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="textColor"
                defaultValue={"#000000"}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <HexColorPicker color={value} onChange={onChange} />
                  </FormItem>
                )}
              />
            </div>
          )}
          <DialogFooter>
            <div className="mt-5 flex w-full space-x-2">
              <Button
                variant={"secondary"}
                type="reset"
                onClick={() =>
                  form.reset({
                    url: "",
                    name: "",
                    bgColor: "",
                    textColor: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => form.handleSubmit(onSubmit)}
                className=" w-full"
                type="submit"
              >
                Create
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

function Preview({
  name,
  url,
  linkComponent,
  bgColor,
  textColor,
}: {
  name?: string;
  url?: string;
  linkComponent: LinksRenderMapType | undefined;
  bgColor?: string;
  textColor?: string;
}) {
  let preview = null;
  if (!url) {
    preview = (
      <>
        <h1 className="text-slate-900">Preview</h1>
        <h1 className="text-sm text-slate-600">
          Paste a link below to see it here!
        </h1>
      </>
    );
  }

  if (url && !stringIsValidURL(url)) {
    preview = (
      <>
        <h1 className="text-slate-900">Error</h1>
        <h1 className="text-sm text-slate-600">
          Your supplied link is invalid, please try another.
        </h1>
      </>
    );
  }

  if (url && stringIsValidURL(url) && linkComponent) {
    preview = (
      <div className="w-[80%]">
        {url && linkComponent && linkComponent.render(url)}
      </div>
    );
  }

  if (url && stringIsValidURL(url) && !linkComponent) {
    preview = (
      <div
        style={{
          backgroundColor: bgColor ?? "#ffffff",
          color: textColor ?? "#000000",
        }}
        className="flex max-w-full flex-col rounded-md px-3 py-2 text-left"
      >
        <h1 className="text-left font-semibold">{name}</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[500px] px-5">
      <Label>Preview</Label>
      <div
        className={cn(
          "mx-auto mb-5 flex min-h-[200px] w-full flex-col items-center",
          "justify-center rounded-md border border-dashed bg-gray-100/50 p-5 text-center",
        )}
      >
        {preview}
      </div>
    </div>
  );
}
