import { CreateForm } from "./CreateForm";

export default function page() {
  return (
    <main className="space-y-6 my-3">
      <h2 className="text-xl font-semibold my-1 ">Add New Student</h2>

      <section>
        <CreateForm />
      </section>
    </main>
  );
}
