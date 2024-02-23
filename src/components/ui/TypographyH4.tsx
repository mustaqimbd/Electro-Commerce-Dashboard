type TProps = {
  children: string;
  className?: string;
};
export function TypographyH4({ children, className }: TProps) {
  return <h4 className={`text-sm tracking-tight ${className}`}>{children}</h4>;
}
