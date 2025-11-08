
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Home, Newspaper, Settings, FileText, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase/provider';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

const navItems = [
  { href: '/admin', icon: Home, label: 'ড্যাশবোর্ড' },
  { href: '/admin/articles', icon: Newspaper, label: 'সংবাদ পরিচালনা' },
  { href: '/admin/submissions', icon: FileText, label: 'জমা পড়া খবর' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { auth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Image 
              src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
              alt="Jamaat Nama Logo"
              width={32}
              height={32}
              className="object-contain invert"
            />
            <span className="sr-only">Jamaat Nama</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname.startsWith(item.href) && item.href !== '/admin' && 'bg-accent text-accent-foreground',
                    pathname === '/admin' && item.href === '/admin' && 'bg-accent text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/admin/settings"
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                          pathname.startsWith('/admin/settings') && "bg-accent text-accent-foreground"
                        )}
                    >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">সেটিংস</TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleLogout}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Logout</span>
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right">লগআউট</TooltipContent>
            </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
