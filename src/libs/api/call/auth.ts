import API from ".."
interface ILoginBody {
    username: string
    password: string
}

interface IRegisterBody {
    fullname: string
    email: string
    username: string
    password: string
}

export const APILogin = async (body: ILoginBody) => {
    return await API.post("login", body)
}

export const APIRegister = async (body: IRegisterBody) => {
    return await API.post("register", body)
}

export const AuthCheck = async (token: string) => {
    return await API.get("/check", {
        headers: {
            Authorization: `Bearer ${token}`    
        }
    })
}

