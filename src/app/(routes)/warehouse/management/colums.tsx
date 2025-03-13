"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
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
import TextColor from "@/components/table/TextColor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  AuditLogStatus,
  AuditLogType,
  AuditLogStatus as s,
} from "@prisma/client";
import { onSubmit } from "./_actions";

export const ManagementColumns: ColumnDef<any>[] = [
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
      <TableColumnHeader column={column} title="Reported By" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created At" />
    ),
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
              <LucideEdit className="h-4 w-4" />
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
                  {data.type === AuditLogType.Assignment ||
                  data.type === AuditLogType.Return ? (
                    <>
                      <SelectItem value={s.Approved}>Approve</SelectItem>
                      <SelectItem value={s.Rejected}>Reject</SelectItem>
                    </>
                  ) : data.type === AuditLogType.Maintenance &&
                    data.status === AuditLogStatus.InProgress ? (
                    <>
                      <SelectItem value={s.Completed}>Complete</SelectItem>
                      <SelectItem value={s.Cancelled}>Cancel</SelectItem>
                    </>
                  ) : data.type === AuditLogType.Maintenance ? (
                    <>
                      <SelectItem value={s.InProgress}>In Progress</SelectItem>
                      <SelectItem value={s.Rejected}>Reject</SelectItem>
                    </>
                  ) : null}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setDisabled(true);
                  onSubmit(data, status);
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
