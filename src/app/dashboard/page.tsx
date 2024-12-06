'use client'
import Tab, { TabOptions } from '@/components/Tab';
import { TodoCard } from '@/components/TodoCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LoadingComponent from '@/components/ui/LoadingComponent';
import { useRouter } from 'next/navigation';
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
    const fetchTodo = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/todo/get')
            if (!response.ok) {
                return new Error('Failed to fetch')
            }
            const todo = await response.json()
            setTodo(todo.todos)

        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    async function flushAllData() {
        setLoading(true)
        try {
            const response = await fetch('/api/delete/all', {
                method: 'POST'
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            window.location.reload(true);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTodo()
    }, [])
    useEffect(() => {
        mount(todo)
    }, [todo])
    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center">
            <LoadingComponent size={40} />
        </div>
    }
    return (
        <>
            <p className='text-title'>Dashboard</p>
            <div className='flex-1'>
                <div className="flex w-full gap-x-5 overflow-x-auto">
                    <StaticCard title='Task Finished' value={countStatus.finished} />
                    <StaticCard title='Task Ongoing' value={countStatus.ongoing} />
                    <ProgressPercentage data={todo} />
                </div>
                <div className="w-full flex justify-between">
                    <Tab className='select-none'>
                        {
                            tabData.map((tab, index) => (
                                <TabOptions isSelected={tab.isSelected} key={`${tab.title}-${index}`} onClick={() => handleTab(index)}>{tab.title}</TabOptions>
                            ))
                        }
                    </Tab>
                    <Button color='#CD0000' onClick={flushAllData}>Flushall</Button>
                </div>
                <div className="space-y-5" key={1}>
                    {
                        todo.map((data, index) => {
                            if (data.status.toLowerCase() == currentTab) {
                                return <TodoCard key={`todo-${index}-${+new Date()}`} todo={data} setter={setTodo} />
                            } else if (currentTab === 'all') {
                                return <TodoCard key={`todo-${index}-${+new Date()}`} todo={data} setter={setTodo} />
                            }
                        })
                    }
                </div>
            </div>

        </>
    )
}


function ProgressPercentage({ data }: { data: TodoData[] }) {
    const totalData = data.length;
    const finishedData = data.filter(item => item.status == 'finished');
    const finishPercentage = Math.floor((finishedData.length / totalData) * 100);
    let unfinishedPercentage;
    if (finishPercentage == 0) {
        unfinishedPercentage = 0;
    }
    unfinishedPercentage = Math.floor(100 - finishPercentage);

    return (
        <Card className="w-[300px] flex flex-col">
            <CardContent className='px-3 py-5 space-y-3'>
                <p className='font-medium tracking-wider'>Task Finished</p>
                <p className='text-2xl font-bold tracking-wide'>{finishPercentage}%</p>
                <div className="w-full rounded-full overflow-hidden h-[3px] flex">
                    <div className=" h-[3px] transition-300 bg-blue-600 inline-block" style={{ width: `${finishPercentage}%` }}></div>
                    <div className=" h-[3px] transition-300 bg-gray-50 inline-block" style={{ width: `${unfinishedPercentage}%` }}></div>
                </div>
            </CardContent>
        </Card>
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