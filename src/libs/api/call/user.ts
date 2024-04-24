import API from ".."

export const getUser = async (token: string) => {
    return await API.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getSuggestions = async () => {
    return await API.get("/suggestions", {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}

