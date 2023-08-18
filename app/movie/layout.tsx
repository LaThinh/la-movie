export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="layout-movie flex gap-10 w-full max-w-7xl p-5 min-h-screen">
    //   <div className="sidebar movie-sidebar bg-gray-200 rounded-lg w-1/5">
    //     Sidebar
    //   </div>
    //   <div className="main-content w-4/5">{children}</div>
    // </div>
    <section>{children}</section>
  );
}
