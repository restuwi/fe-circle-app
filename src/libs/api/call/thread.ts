import API from ".."

export const getThreads = async () => {
    return await API.get("/threads")
}

export const getThreadUser = async (userId: number) => {
    return await API.get(`threads/user/${userId}`)
}

export const getThread = async (threadId: number) => {
    return await API.get(`thread/${threadId}`)
}

export const getReplies = async (threadId: number) => {
    return await API.get(`replies/${threadId}`)
}

export const createThread = async (body: {
    content: string,
    image: FileList | null,
    threadId?: number
}) => {
    const formData = new FormData()
    if(body.image !== null) {
        for(let i = 0; i <body.image.length; i++) {
            formData.append("image", body.image[i])
        }
    }

    if(body.threadId) {
        formData.append("threadId", body.threadId.toString())
    }

    formData.append("content", body.content)

    return await API.post("thread", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

export const deleteThread = (threadId: number, token: string) => {
    return API.delete(`thread/${threadId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}