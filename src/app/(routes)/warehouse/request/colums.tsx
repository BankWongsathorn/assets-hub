"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleCancel } from "./_actions";
import { AuditLogStatus as s } from "@prisma/client";
import TextColor from "@/components/table/TextColor";
import { useState } from "react";

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="User" />,
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Serial" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Asset Name" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return <TextColor status={data.status} />;
    },
  },
  {
    accessorKey: "reported_by",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Reported by" />
    ),
  },
  {
    accessorKey: "handled_by",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Handled by" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const [disabled, setDisabled] = useState(false);

      return data.status === s.Pending ? (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <LucideEdit className="h-4 w-4" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Do you want to cancel it?</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => {
                  setDisabled(true);
                  handleCancel(data.id);
                }}
                variant="default"
                disabled={disabled}
              >
                Yes
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">No</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null;
    },
  },
];
