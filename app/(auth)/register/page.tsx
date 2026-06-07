import { registerUser } from "@/app/actions/register";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        action={async (formData) => {
          "use server";

          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          const role = formData.get("role") as "CANDIDATE" | "INTERVIEWER";

          await registerUser(name, email, password, role);
        }}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6"
      >
        <h1 className="text-2xl font-semibold">Create Account</h1>

        <input
          name="name"
          placeholder="Name"
          required
          className="rounded-md border bg-background px-3 py-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-md border bg-background px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-md border bg-background px-3 py-2"
        />

        <select
          name="role"
          defaultValue="CANDIDATE"
          className="rounded-md border bg-background px-3 py-2"
        >
          <option value="CANDIDATE">Candidate</option>

          <option value="INTERVIEWER">Interviewer</option>
        </select>

        <button type="submit" className="rounded-md border px-3 py-2">
          Create Account
        </button>
      </form>
    </div>
  );
}
