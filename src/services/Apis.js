// const BASE_URL = "http://127.0.0.1:8000"
const BASE_URL = "https://aman6523.pythonanywhere.com"

// Authentication and user apiendpoints
export const GET_USER_DETAILS = BASE_URL + "/account/user"
export const LOGIN_USER = BASE_URL + "/account/login/"
export const REGISTER_FACULTY = BASE_URL + "/account/registerFaculty"
export const REGISTER_USER = BASE_URL + "/account/registerUser"

// Maintenance API endpoints
export const GET_MAINTENANCE_STATUS_AND_COUNT = BASE_URL + "/maintenance/maintenanceStatusAndCount"
export const MAINTENANCE_API = BASE_URL + "/maintenance/"
export const GET_ALL_MAINTENANCE_TYPES = BASE_URL + "/maintenance/maintenanceType/"
export const MAINTENANCE_COMMENTS_API = BASE_URL + "/maintenance/maintenanceIssueComment"

// Department API endpoints 
export const GET_ALL_DEPARTMENTS = BASE_URL + "/department/"
