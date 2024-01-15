"use client";

import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { createGridSchema } from "@/server/api/schemas/grid";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HexColorPicker } from "react-colorful";

import { Plus } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { type z } from "zod";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

const formSchema = createGridSchema;

export default function CreateGrid() {
  const [open, setOpen] = useState<boolean>(false);

  const trpcUtils = api.useUtils();
  const { mutate } = api.grid.createGrid.useMutation({
    onSuccess() {
      void trpcUtils.grid.grids.invalidate();
      toast.success("Successfully created your new grid, redirecting....");
      setOpen(false);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ...values,
    });
  }

  function handleNameInputChange(value: string) {
    const formattedValue = value.replace(/ /g, "_");
    form.setValue("slug", formattedValue);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Create new grid
          <Plus size={18} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new grid</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Once you have saved your new grid, you will be redirected to the
            editing screen.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My new grid"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleNameInputChange(e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        prefix={"gridl.co/"}
                        placeholder="grid"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="default"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Set as default?</FormLabel>
                      <FormDescription>
                        This grid will be shown to users
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="mt-5 flex w-full space-x-2">
                  <Button
                    variant={"secondary"}
                    type="reset"
                    onClick={() =>
                      form.reset({
                        bgColor: "#ffffff",
                        name: "",
                        default: false,
                        slug: "",
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button className=" w-full" type="submit">
                    Create
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
