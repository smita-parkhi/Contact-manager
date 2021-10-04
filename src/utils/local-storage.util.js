export const setLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
}

export const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("contacts"))
}