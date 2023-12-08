import { GET_ALL_DEPARTMENTS } from "../Apis"

export const getAllDeparments = async() => {
    const response = await fetch(GET_ALL_DEPARTMENTS)
    if(response.status != 200) {
        throw new Error("Failed to fetch")
    } 
    const data = await response.json()
    return data?.Response
}

export const createDepartment = async (payload)=> {
    const response = await fetch(GET_ALL_DEPARTMENTS,{
        method:"POST",
        headers : {
            'content-type':"application/json"
        },
        body : JSON.stringify(payload)
    })
    if(response.status !== 200) {
        console.log("create department response",response.status)
        throw new Error("Failed to create department")
    }
    const data = await response.json()
    return data?.Response
}