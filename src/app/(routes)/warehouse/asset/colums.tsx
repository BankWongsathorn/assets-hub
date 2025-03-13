"use client";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import Link from "next/link";
import TextColor from "@/components/table/TextColor";

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
    accessorKey: "purchasedate",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Purchase Date" />
    ),
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
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="User" />,
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
      return (
        <Link href={`/warehouse/asset/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
