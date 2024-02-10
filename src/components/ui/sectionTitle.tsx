"use clients";
export function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-sm font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
