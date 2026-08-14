export default function DashboardLayout({ children }) {
  return (
    <div className="bg-muted/30 flex min-h-screen flex-col">
      <header className="bg-background flex h-16 shrink-0 items-center border-b px-6">
        <h1 className="text-primary text-xl font-bold">Student Dashboard</h1>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
