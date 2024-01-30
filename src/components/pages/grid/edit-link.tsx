"use client";

import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import { DropdownMenuItem } from "@/lib/ui/dropdown-menu";

import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Preview } from "./add-link";
import { createGridItemSchema } from "@/server/api/schemas/gridItem";
import stringIsValidURL from "@/utils/isValidUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  type UseFormReturn,
  useForm,
  useWatch,
} from "react-hook-form";
import { type z } from "zod";
import { linksRenderMap } from "@/utils/linksMap";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/ui/form";

import { HexColorPicker } from "react-colorful";
import { Input } from "@/lib/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import LoadingSpinner from "@/components/common/loading-spinner";
import MultipleSelector from "@/lib/ui/fancy-select";
import { type GridCell } from "./grid-cell-list/grid-cell-list";

const formSchema = createGridItemSchema.omit({ gridSlug: true });

export default function EditLink({
  gridItem,
  fromDropdown,
}: {
  slug: string;
  gridItem: GridCell;
  fromDropdown?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.updateGridItem.useMutation({
    onSuccess() {
      void trpcUtils.gridItem.gridItems.invalidate();
      toast.success("Successfully updated your link");
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
      ...gridItem,
      tags:
        gridItem.tags?.split(",").map((tag) => {
          return {
            value: tag,
            label: tag,
          };
        }) ?? undefined,
      bgColor: gridItem.bgColor ?? undefined,
      url: gridItem.url ?? undefined,
      textColor: gridItem.textColor ?? undefined,
      name: gridItem.name ?? undefined,
      text: gridItem.text ?? undefined,
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
      form.setValue("slug", url!.split(".")[1]!);
      form.setValue("type", "basicLink");
    }
  }, [form, linkComponent, url]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.tags);
    mutate({
      ...values,
      gridItemId: gridItem.id,
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {fromDropdown ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
          </DropdownMenuItem>
        ) : (
          <Button variant={"outline"}>Add Link</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] w-[900px] max-w-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Changing the url will reset any analytics data that may have been
            collected for this link
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex">
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
            <div className="mt-10 flex w-full space-x-2">
              <Button
                onClick={() => setOpen(false)}
                variant={"secondary"}
                type="reset"
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
                Update
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function InputSection({
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
          className="space-y-5"
        >
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
        </form>
      </Form>
    </div>
  );
}
