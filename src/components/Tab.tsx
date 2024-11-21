'use client'
import { cn } from '@/lib/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactElement } from 'react';

interface TabProps extends ComponetsWithChild {

}

const Tab: FC<TabProps> = ({ children }) => {
    return (
        <div className="w-full flex gap-x-5 my-5">
            {children}
        </div>
    )
}

interface TabOptions extends ComponetsWithChild, ReactElement, Partial<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> {
    isSelected: boolean,
}
export const TabOptions: FC<TabOptions> = ({ children, isSelected, ...props }) => {
    return (
        <span className={cn('flex flex-col justify-center group hover:bg-slate-50 hover:rounded-md transition-300', { 'bg-slate-50 rounded-md': isSelected })} {...props}>
            <p className={cn('px-3 font-medium tracking-wider transition-300 cursor-pointer group-hover:tracking-widest', { 'tracking-widest': isSelected })}>{children}</p>
            <div className={cn('h-px w-0  bg-slate-700 group-hover:w-full transition-300', { 'w-full': isSelected })}></div>
        </span>
    )
}

export default Tab;