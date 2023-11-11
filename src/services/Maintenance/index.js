import { MAINTENANCE_COMMENTS_API, GET_ALL_MAINTENANCE_TYPES, GET_MAINTENANCE_STATUS_AND_COUNT, MAINTENANCE_API } from "../Apis"

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

export const getAllMaintenanceIssues = async (query) => {
    let url = MAINTENANCE_API
    if(query !== undefined) {
      url = url.slice(0,-1) + query
      console.log('url of get all maintenance issue',url)
    }
    const response = await fetch(url,{
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
    console.log('api status -----> ',response.status)
    const data = await response.json()
    if(response.status !== 201) {
        throw new Error(JSON.stringify(data?.Response))
    }
    return data?.Response
}

export const updateMaintenaceIssue = async(id,body) => {
  const url = MAINTENANCE_API + `${id}/`
  const response = await fetch(url,{
      method: "PATCH",
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
export const getAllMaintenanceTypes = async() => {
  const response = await fetch(GET_ALL_MAINTENANCE_TYPES);
  if(response.status !== 200) {
    throw new Error("Failed to fetch")
  }
  const data = await response.json()
  return data?.Response
}

export const postMaintenanceComment = async(body) => {
  const response = await fetch(MAINTENANCE_COMMENTS_API+"/",{
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
export const getAllMaintenanceComment = async(maintenanceIssueId) => {
  const url = MAINTENANCE_COMMENTS_API + `?maintenanceIssue=${maintenanceIssueId}`
  console.log("running get maintenacne comment service with url",url)
  const response = await fetch(url,{
    method:"GET",
    headers :{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
    },
  });
  if(response.status !== 200) {
    throw new Error("Failed to fetch")
  }
  const data = await response.json()
  return data?.Response
}
