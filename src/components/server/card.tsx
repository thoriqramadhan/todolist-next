import { Card, CardContent } from "../ui/card";

export function ProgressPercentage({ data }: { data: TodoData[] }) {
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