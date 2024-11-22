interface TodoData {
    id?:number
    deadline: Date,
    finishedAt?: Date,
    start: Date,
    status: string,
    title: string
    userId: number
}
interface Todo {
    id?: number,
        status: string,
        title: string,
        start: Date,
        deadline: Date,
        finishedAt: Date | null,
        endDate: Date | null
}