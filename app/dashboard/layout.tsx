import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-column lg:flex-row flex-1">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="sidebar bg-gray-300 min-h-[100vh] w-[28%]">
        Sidebar
        <nav className="flex flex-col gap-2 p-3">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/sales">Sales</Link>
        </nav>
      </div>
      <div className="main w-[70%]">
        <p>This is dashboard content</p>
        {children}
      </div>
    </section>
  );
}
