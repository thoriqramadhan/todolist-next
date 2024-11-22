import { FC } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './sidebar';
import { BookCheck, LayoutDashboard, SmilePlus, ClockAlert } from 'lucide-react';

import AppIcon from './AppIcon';
import Image from 'next/image';
import AccountSidebar from './AccountSidebar';

interface AppSidebarProps {
}

const AppSidebar: FC<AppSidebarProps> = ({ }) => {
    const sidebarOptions = [
        {
            label: 'Todo',
            item: [
                {
                    icon: <LayoutDashboard />,
                    title: 'Dashboard',
                    link: '/dashboard'
                },
                {
                    icon: <SmilePlus />,
                    title: 'Add Todo',
                    link: '/dashboard/add'
                },
                {
                    icon: <BookCheck />,
                    title: 'Finished Todo',
                    link: null
                },
                {
                    icon: <ClockAlert />,
                    title: 'Deadline Today',
                    link: '/dashboard/today'
                }
            ]
        }]
    return (

        <>
            <Sidebar className='' collapsible='icon'>
                <SidebarHeader className='flex-row items-center'>
                    <AppIcon />
                    <p className='font-medium tracking-wide'>Todo Lists</p>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        {
                            sidebarOptions.map(sidebar => (
                                <>
                                    <SidebarGroupLabel key={sidebar.label}>{sidebar.label}</SidebarGroupLabel>
                                    {
                                        (sidebar.item.map(item => (
                                            <SidebarGroupContent key={item.title}>
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <a href={item?.link ?? '/dashboard'}>{item.icon ?? ''}{item.title}</a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        )))
                                    }
                                </>
                            ))
                        }
                    </SidebarGroup>
                </SidebarContent >
                <SidebarFooter>
                    <AccountSidebar />
                </SidebarFooter>
            </Sidebar>

        </>
    )
}

export default AppSidebar