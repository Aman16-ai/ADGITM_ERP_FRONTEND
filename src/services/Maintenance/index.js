import { GET_MAINTENANCE_STATUS_AND_COUNT, MAINTENANCE_API } from "../Apis"

export const getMaintenanceStatusAndCount = async(query) => {
    let url = GET_MAINTENANCE_STATUS_AND_COUNT
    if (query !== undefined) {
      url += query
    }
    console.log('url --------------> ',url)
    const response = await fetch(url)
    if(response.status !== 200) {
        throw new Error("Failed to fetch")
    }
    const data = await response.json()
    return data?.Response
}

export const getAllMaintenanceIssues = async () => {
    const response = await fetch(MAINTENANCE_API,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
        },
      })
    if(response.status !== 200) {
        throw new Error("Failed to fetch")
    }
    const data = await response.json()
    return data?.Response
}

export const createMaintenanceIssue = async(body) => {
    const response = await fetch(MAINTENANCE_API,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
        },
        body : JSON.stringify(body)
      })
    if(response.status !== 200) {
        throw new Error("Failed to fetch")
    }
    const data = await response.json()
    return data?.Response
}
