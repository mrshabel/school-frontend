"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";

const studentClass = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
  { value: "4", label: "Class 4" },
  { value: "5", label: "Class 5" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
];
const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search student..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("gender")}
            title="Gender"
            options={gender}
          />
        )}
        {table.getColumn("class") && (
          <DataTableFacetedFilter
            column={table.getColumn("class")}
            title="Class"
            options={studentClass}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
