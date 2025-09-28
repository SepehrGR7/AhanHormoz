export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
      {children}
    </section>
  );
}
