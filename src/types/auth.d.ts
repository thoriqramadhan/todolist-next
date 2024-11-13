interface AuthData {
    user: string,
    emaiL:string
}

type RegisterFormat = {
    username?: string,
    email?: string,
    password?:string

}
interface FormRegisterData{
    data?: AuthData
    error: RegisterFormat
}