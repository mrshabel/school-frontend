import Navbar from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="grid grid-cols-5 lg:grid-cols-7">
        <aside className=" col-span-1">
          <Sidebar className="sticky top-0 self-start " />
        </aside>
        <section className="col-span-4 lg:col-span-6 mt-[7vh] pt-4 pb-8 px-10 ">
          <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
        </section>
      </section>
    </main>
  );
}
