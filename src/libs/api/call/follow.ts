import API from ".."

export const follow = async (body: {
    followingId: number
}) => {
    return await API.post("follow", body, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

export const getFollowers = async (followingId: number) => {
    return await API.get(`followers/${followingId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

export const getFollowing = async (followerId: number) => {
    return await API.get(`following/${followerId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

