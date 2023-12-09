import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./table-columns";
import { DataTableToolbar } from "./table-filter";
import { notFound } from "next/navigation";

const getStudents = async (page, limit) => {
  const res = await fetch(
    `${process.env.API_URL}/students?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhODE2ZDI3OTVlNjU5YmM2NmJjYzQiLCJpYXQiOjE3MDE5NTQzNDIsImV4cCI6MTcwMjA0MDc0Mn0.ItX8EEOyYndh90u5RcuG7-UuFKqVAptKZta_HByl96I",
      },
    },
    {
      cache: "no-store",
    }
  );
  setTimeout(() => null, 3000);

  if (!res.ok) {
    notFound();
  }
  return await res.json();
};

export default async function StudentTable({ limit, page }) {
  const data = await getStudents(page, limit);
  const student = data?.data?.data;

  return (
    <DataTable
      columns={columns}
      data={student}
      DataTableToolbar={DataTableToolbar}
      url="/admin/students"
      totalData={10}
      limit={parseInt(limit)}
      page={parseInt(page)}
    />
  );
}
