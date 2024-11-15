'use client'
import Tab, { TabOptions } from '@/components/Tab';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Trash, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';

interface PageProps {

}
const Page: FC<PageProps> = ({ }) => {
    const fakeData = [
        {
            title: 'WO',
            startDate: '10/12/24',
            endDate: '25/12/24',
            deadline: '30/2/24',
            status: 'finished',
        },
        {
            title: 'Berak',
            startDate: '10/12/24',
            endDate: null,
            deadline: '30/2/24',
            status: 'ongoing',
        }
    ]
    const tabOptions = [
        {
            title: 'All',
            isSelected: true
        },
        {
            title: 'Finished',
            isSelected: false
        },
        {
            title: 'Ongoing',
            isSelected: false
        }
    ]
    const [tabData, setTabData] = useState(tabOptions)
    const [currentTab, setCurrentTab] = useState(tabData[0].title.toLowerCase())
    function handleTab(index: number) {
        const newOptions = tabOptions.map((tab, i) => {
            if (i == index) {
                setCurrentTab(tab.title.toLowerCase())
                tab.isSelected = true
            } else {
                tab.isSelected = false
            }
            return tab;
        })
        setTabData(newOptions)
    }
    return (
        <>
            <p className='text-title'>Dashboard</p>
            <div className='flex-1'>
                <div className="flex w-full gap-x-5">
                    <StaticCard title='Task Finished' value='10' />
                    <StaticCard title='Task Unfinished' value='10' />
                </div>

                <Tab className='select-none'>
                    {
                        tabData.map((tab, index) => (
                            <TabOptions isSelected={tab.isSelected} key={tab.title} onClick={() => handleTab(index)}>{tab.title}</TabOptions>
                        ))
                    }
                </Tab>
                <div className="space-y-5">
                    {
                        fakeData.map(data => {
                            if (data.status.toLowerCase() == currentTab) {
                                return <TodoCard key={data.title} todo={data} />
                            } else if (currentTab === 'all') {
                                return <TodoCard key={data.title} todo={data} />
                            }
                        })
                    }
                </div>

                {currentTab}
            </div>

        </>
    )
}
interface TodoCardProps {
    todo: {
        status: string,
        title: string,
        startDate: string,
        deadline: string,
        endDate: string | null
    }
}
const TodoCard: FC<TodoCardProps> = ({ todo }) => {
    const { status, title, startDate, deadline, endDate } = todo;
    return (
        <div className="w-full">
            <div className="w-full h-28 bg-gra-50 shadow-md p-3 rounded-lg border relative">
                <h1 className='font-medium tracking-wider mb-1'>{title}  -   <span className={cn('text-xs tracking-widest text-white p-1 rounded-full', { 'bg-green-400': status == 'finished', 'bg-yellow-400': status == 'ongoing' })}>Finished</span></h1>
                <p className='text-xs text-zinc-400'>{startDate} - {endDate ?? deadline}</p>
                <div className="flex absolute top-5 right-3 gap-x-3">
                    <Check size={20} className='cursor-pointer' />
                    <Undo2 size={20} className='cursor-pointer' />
                    <Trash size={20} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

function StaticCard({ title, value, ...props }: { title: string, value: string }) {
    return (
        <>
            <Card className='min-w-[300px]'>
                <CardContent className='p-3 space-y-3'>
                    <h1 className='font-medium tracking-wider'>{title}</h1>
                    <span className='text-3xl'>{value}</span>
                </CardContent>
            </Card>
        </>
    )
}

export default Page;