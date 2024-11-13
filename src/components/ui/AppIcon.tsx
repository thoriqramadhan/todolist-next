import { cn } from '@/lib/utils';
import { ListTodo } from 'lucide-react';
import { FC } from 'react';

interface AppIconProps {
    classNames?: string,
    size: number
}

const AppIcon: FC<AppIconProps> = ({ classNames, size, ...props }) => {
    return <ListTodo className={cn(classNames)} {...props} size={size} />;
}

export default AppIcon;