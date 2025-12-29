import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

/* ✅ DEFINE TYPE HERE */
export type Grievance = {
  grievanceNumber: string;
  userName: string;
  mobileNumber: string;
  categoryName: string;
  blockName: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "On Hold" | "Resolved" | "Forwarded";
  assignedTo: string;
  createdAt: string;
  actionDate?: string;
};

export const columns: ColumnDef<Grievance>[] = [
  {
    accessorKey: "grievanceNumber",
    header: "Grievance ID",
    cell: ({ row }) => (
      <span className="font-semibold whitespace-nowrap">
        {row.getValue("grievanceNumber")}
      </span>
    ),
  },
  {
    accessorKey: "userName",
    header: "Citizen Name",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "blockName",
    header: "Block",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("status")}</Badge>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Issued On
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "actionDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Action Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("actionDate") as string | undefined;

      if (!value) {
        return (
          <span className="text-muted-foreground whitespace-nowrap">—</span>
        );
      }

      const date = new Date(value);

      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="cursor-pointer">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1e293b] text-white ">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">
            <Trash className="mr-2 h-4 w-4" /> Withdraw
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
