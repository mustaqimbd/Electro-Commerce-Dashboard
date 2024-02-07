import { redirect } from "next/navigation";
export default function Home() {
  const dashboardPath = false;

  if (!dashboardPath) {
    redirect("/dashboard");
  }

  return <main className=""></main>;
}
