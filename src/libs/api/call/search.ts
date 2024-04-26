import API from ".."

export const search = async (value: string) => {

    return await API.post(`search?name=${value}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
}