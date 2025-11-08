import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ProtectedAdminLayout } from '@/components/admin/protected-admin-layout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar />
      <main className="flex flex-1 flex-col sm:py-4 sm:pl-14">
        <ProtectedAdminLayout>
            {children}
        </ProtectedAdminLayout>
      </main>
    </div>
  );
}
