import TodoCardContainer from '@/components/client/container';
import { ProgressPercentage } from '@/components/server/card';
import { getTodoDB } from '@/helpers/dbHelpers';
import { FC } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = async ({ }) => {
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999))
    const todayDeadlinesQuery = {
        where: {
            deadline: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    }

    const todayDeadlineDatas = await getTodoDB(todayDeadlinesQuery)
    console.log(todayDeadlineDatas);

    return <>
        <p className='text-title'>Todays Deadline</p>
        <TodoCardContainer todos={todayDeadlineDatas} />
    </>
}


export default Page;