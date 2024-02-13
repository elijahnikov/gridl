"use client";

import Favicon from "@/components/common/favicon";
import LoadingSpinner from "@/components/common/loading-spinner";
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
import MultipleSelector from "@/lib/ui/fancy-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";

import { cn } from "@/utils/general";
import { createGridItemSchema } from "@/server/api/schemas/gridItem";
import { api } from "@/trpc/react";
import stringIsValidURL from "@/utils/isValidUrl";
import { type LinksRenderMapType, linksRenderMap } from "@/utils/linksMap";
import { zodResolver } from "@hookform/resolvers/zod";

import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
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

type FormField = {
  name: keyof z.infer<typeof formSchema>;
  value: string | number;
};

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

  const formRef = useRef<HTMLFormElement>(null);

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
      (
        [
          {
            name: "slug",
            value: linkComponent.slug,
          },
          {
            name: "type",
            value: linkComponent.type,
          },
          {
            name: "h",
            value: linkComponent.defaultHeight ?? 10,
          },
          {
            name: "w",
            value: linkComponent.defaultWidth ?? 10,
          },
        ] as FormField[]
      ).forEach(({ name, value }) => form.setValue(name, value));
    } else if (typeof url !== "undefined") {
      form.setValue("slug", url.split(".")[1]!);
      form.setValue("type", "basicLink");
      const defaults = linksRenderMap.find((link) => link.type === "basicLink");
      (
        [
          { name: "h", value: defaults?.defaultHeight },
          { name: "w", value: defaults?.defaultWidth },
        ] as FormField[]
      ).forEach(({ name, value }) => form.setValue(name, value));
    }
  }, [form, linkComponent, url]);

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
      <DialogContent className="max-h-[95vh] min-h-[600px] w-[900px] max-w-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Your new link will be added to the top left corner of your grid. To
            grab your desired link, make sure to copy and paste from the URL bar
            or through the share button on your desired platform.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1">
          <InputSection
            formRef={formRef}
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
              onClick={() => {
                if (formRef.current) {
                  formRef.current.dispatchEvent(
                    new Event("submit", { bubbles: true }),
                  );
                }
              }}
              className=" w-full"
              type="submit"
            >
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
  showColorPicker,
  formRef,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  showColorPicker: boolean;
  formRef: RefObject<HTMLFormElement>;
}) {
  const trpcUtils = api.useUtils();
  const { mutate: tagMutate } = api.gridItemTag.createTag.useMutation({
    onSuccess: () => {
      toast.success("Created your tag.");
      void trpcUtils.gridItemTag.getTags.invalidate();
    },
  });

  const { data, isLoading } = api.gridItemTag.getTags.useQuery();
  return (
    <div className="w-[80%] ">
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between space-y-5"
        >
          <div className="space-y-5">
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
            {isLoading ? (
              <div className="mt-5">
                <LoadingSpinner size={20} />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        creatableCallback={(label) =>
                          tagMutate({ label, value: label })
                        }
                        maxSelected={3}
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={data}
                        hidePlaceholderWhenSelected
                        placeholder="Tag your links, type a new tag to create it!"
                        creatable
                        loadingIndicator={<LoadingSpinner />}
                        emptyIndicator={
                          <p className="text-center text-sm leading-10 text-slate-500 dark:text-gray-400">
                            No results, create more by typing.
                          </p>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

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
          </div>
        </form>
      </Form>
    </div>
  );
}

export function Preview({
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
      <div className="flex h-max w-max justify-center">
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
        className="flex max-w-full items-center justify-center space-x-2 rounded-md px-3 py-2 text-left shadow-[0px_0px_5px_1px_#00000024]"
      >
        <Favicon size={20} url={url} />
        <h1 className="text-left text-sm">{name}</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[300px] w-full max-w-[500px] px-5">
      <Label>Preview</Label>
      <div
        className={cn(
          "mx-auto mb-2 flex h-full w-full flex-col items-center",
          "justify-center rounded-md border border-dashed bg-gray-100/50 p-4 text-center",
        )}
      >
        {preview}
      </div>
    </div>
  );
}
