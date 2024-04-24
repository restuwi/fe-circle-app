import API from ".."
export const getUserProfile = async (username: string) => {
    return await API.get(`user/profile/${username}`)
}


type TBody = {
    [key: string]: string | File | null | undefined;
};

interface IBody extends TBody {
    fullname?: string | null;
    username?: string | null;
    bio?: string | null;
    avatar?: File | null;
    cover?: File | null;
}
export const updateUserProfile = async (body: IBody) => {
    const formData = new FormData()

    Object.keys(body).map((key) => {
        if (body[key] === "avatar" || "cover") {
            formData.append(key, body[key] as File)
        } else {
            formData.append(key, body[key] as string)
        }
    })

    return await API.patch("user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.token}`
        }
    })



}