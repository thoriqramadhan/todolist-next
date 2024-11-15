'use client'
import { FC } from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './sidebar';
import { ChevronsUpDownIcon, LogOut } from 'lucide-react';


interface AccountProps {
}
const AccountSidebar: FC<AccountProps> = () => {
    const { isMobile } = useSidebar()
    async function handleLogout() {
        console.log('in');

        await fetch('/api/logout', {
            method: 'POST'
        })
    }
    return (
        <SidebarMenu>
            <p onClick={handleLogout}>logout</p>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className='w-10 h-10 rounded-full bg-full bg-red-700 data-[state=open]:invisible'></div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='flex items-center gap-2 px-1 py-1.5 text-left text-sm bg-white border cursor-pointer' onClick={handleLogout}>
                                <p>Logout</p>
                                <LogOut className="ml-auto size-4" />
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
export default AccountSidebar;