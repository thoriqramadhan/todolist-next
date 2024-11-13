import { cn } from '@/lib/utils';
import { Loader2, LucideProps } from 'lucide-react';
import { FC } from 'react';

interface LoadingProps extends LucideProps {
    className?: string
}

const Loading: FC<LoadingProps> = ({ className, ...props }) => {
    return <Loader2 {...props} className={cn('animate-spin', className)} />
}

export default Loading;