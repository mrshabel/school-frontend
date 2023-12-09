import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import StudentTable from "./table";
import { DataTableLoading } from "@/components/data-table/data-table-loading";

export default async function page({ searchParams: { page, limit } }) {
  return (
    <main className="flex flex-col gap-6">
      <header className="flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold ">Students</h2>
        <Button asChild>
          <Link href="/admin/students/add-student">Add Students</Link>
        </Button>
      </header>
      <section className="flex-1 ">
        <Suspense fallback={<DataTableLoading columns={7} />}>
          <StudentTable page={page || 1} limit={limit || 10} />
        </Suspense>
      </section>
    </main>
  );
}
