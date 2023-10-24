import { GET_MAINTENANCE_STATUS_AND_COUNT } from "../Apis"

export const getMaintenanceStatusAndCount = async() => {
    const response = await fetch(GET_MAINTENANCE_STATUS_AND_COUNT)
    if(response.status !== 200) {
        throw new Error("Failed to fetch")
    }
    const data = await response.json()
    return data?.Response
}