import { FC } from 'react';
import Loading from '@/components/ui/Loading'

interface LoadingProps {

}

const Loading: FC<LoadingProps> = ({ }) => {
    return <div className='w-full h-screen'>
        <Loading />
    </div>;
}

export default Loading;