import AppSidebar from '@/components/ui/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { FC } from 'react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <>
        <SidebarProvider>
            <AppSidebar />
            <main className='p-5  w-full'>
                <SidebarTrigger className='inline-block p-0' />

                {children}
            </main>
            <Toaster />
        </SidebarProvider>
    </>;
}


export default Layout;