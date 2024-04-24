import API from ".."

export const getLikes = async (threadId: number) => {
    return await API.get(`likes/${threadId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

export const likeThread = async (body: {
    threadId: number
}) => {

    return await API.post(`like`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}