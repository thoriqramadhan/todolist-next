import { FC } from 'react';
import LoadingComponent from '@/components/ui/LoadingComponent'

interface LoadingProps {

}

const Loading: FC<LoadingProps> = ({ }) => {
    return <div className='w-full h-screen flex justify-center items-center'>
        <LoadingComponent size={50} />
    </div>;
}

export default Loading;