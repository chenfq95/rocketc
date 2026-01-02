import { SidebarInset, SidebarProvider } from '@rocketc/react';

import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/site-header';

import '@rocketc/react/tailwind.css';
import '@rocketc/react/style.css';

type AppLayoutProps = React.PropsWithChildren<{
  title: string;
}>;

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} />
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
