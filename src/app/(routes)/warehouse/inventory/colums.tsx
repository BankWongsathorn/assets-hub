"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import TextColor from "@/components/table/TextColor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleSubmit } from "./_actions";
import { AuditLogType } from "@prisma/client";

export const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "lot",
    header: ({ column }) => <TableColumnHeader column={column} title="Lot" />,
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Serial" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "warrantyexpiry",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Warranty Expiry" />
    ),
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
    accessorKey: "updated_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Updated At" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const [status, setStatus] = useState("");
      const [disabled, setDisabled] = useState(false);

      return (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              {data.status === "Assigned" && <LucideEdit className="h-4 w-4" />}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>What do you want to do?</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <DialogFooter>
              <Select onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AuditLogType.Maintenance}>
                    Repair
                  </SelectItem>
                  <SelectItem value={AuditLogType.Return}>Return</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setDisabled(true);
                  handleSubmit(data, status);
                }}
                variant={status ? "default" : "secondary"}
                className={status ? "" : "cursor-not-allowed"}
                disabled={disabled}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
