"use client"; // Error components must be Client Components
import { useRouter } from "next/navigation";

import { useEffect } from "react";
type TProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: TProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
      <h2 className="text-5xl font-bold">Oops!</h2>
      <h2 className="text-3xl font-bold">Something went wrong.</h2>
      <p>Contact Support</p>
      <div className="space-x-5">
        <button
          className="text-white py-1 px-4 bg-[#29C1F1] rounded-md"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <button
          className="text-white py-1 px-4 bg-[#29C1F1] rounded-md"
          onClick={() => router.push("/dashboard")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
