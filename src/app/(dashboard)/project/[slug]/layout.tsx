import GridAuth from "./auth";

export default function GridProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GridAuth>{children}</GridAuth>;
}
