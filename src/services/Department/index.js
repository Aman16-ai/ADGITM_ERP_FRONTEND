import { GET_ALL_DEPARTMENTS } from "../Apis"

export const getAllDeparments = async() => {
    const response = await fetch(GET_ALL_DEPARTMENTS)
    if(response.status != 200) {
        throw new Error("Failed to fetch")
    } 
    const data = await response.json()
    return data?.Response
}