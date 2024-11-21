'use client'
import Tab, { TabOptions } from '@/components/Tab';
import { TodoCard } from '@/components/TodoCard';
import { Card, CardContent } from '@/components/ui/card';
import Loading from '@/components/ui/Loading';
import { FC, useEffect, useState } from 'react';

interface PageProps {

}
const Page: FC<PageProps> = ({ }) => {
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
    const [loading, setLoading] = useState(true)
    const [todo, setTodo] = useState([])
    const [countStatus, setCountStatus] = useState({ ongoing: 0, finished: 0 })
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
    function mount(array: TodoData[]) {
        let ongoing: TodoData[] = []
        let finished: TodoData[] = []
        array.forEach(todo => {
            if (todo.status == 'ongoing') {
                ongoing = [...ongoing, todo]
            } else if (todo.status == 'finished') {
                finished = [...finished, todo]
            }
        });
        setCountStatus({
            ongoing: ongoing.length,
            finished: finished.length
        })


    }
    useEffect(() => {
        const fetchTodo = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/todo/get')
                if (!response.ok) {
                    return new Error('Failed to fetch')
                }
                const todo = await response.json()
                console.log(todo.todos);
                setTodo(todo.todos)

            } catch (error) {
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        fetchTodo()
    }, [])
    useEffect(() => {
        mount(todo)
    }, [todo])
    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center">
            <Loading size={40} />
        </div>
    }
    return (
        <>
            <p className='text-title'>Dashboard</p>
            <div className='flex-1'>
                <div className="flex w-full gap-x-5">
                    <StaticCard title='Task Finished' value={countStatus.finished} />
                    <StaticCard title='Task Ongoing' value={countStatus.ongoing} />
                </div>

                <Tab className='select-none'>
                    {
                        tabData.map((tab, index) => (
                            <TabOptions isSelected={tab.isSelected} key={`${tab.title}-${index}`} onClick={() => handleTab(index)}>{tab.title}</TabOptions>
                        ))
                    }
                </Tab>
                <div className="space-y-5" key={1}>
                    {
                        todo.map(data => {
                            if (data.status.toLowerCase() == currentTab) {
                                return <TodoCard key={data.title} todo={data} setter={setTodo} />
                            } else if (currentTab === 'all') {
                                return <TodoCard key={data.title} todo={data} setter={setTodo} />
                            }
                        })
                    }
                </div>
            </div>

        </>
    )
}


function StaticCard({ title, value, ...props }: { title: Date, value: string }) {
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