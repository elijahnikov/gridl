"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/ui/alert-dialog";
import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

export default function ListActionMenu({ gridItemId }: { gridItemId: string }) {
  const trpcUtils = api.useUtils();
  const { mutate } = api.gridItem.delete.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted your link");
      void trpcUtils.grid.gridForEditing.invalidate();
    },
    onError: (error) => {
      toast.error(
        error.message[0] ?? "Something unexpected happened, please try again.",
      );
    },
  });

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" className="rounded-full p-0" variant="ghost">
            <MoreVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your link and any
            analytics collected for it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate({ gridItemId })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
