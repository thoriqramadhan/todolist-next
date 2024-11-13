import { cn } from '@/lib/utils';
import { ListTodo, LucideProps } from 'lucide-react';
import { FC } from 'react';

interface AppIconProps extends LucideProps {
    classNames?: string,
}

const AppIcon: FC<AppIconProps> = ({ classNames, ...props }) => {
    return <ListTodo className={cn(classNames)} {...props} />;
}

export default AppIcon;