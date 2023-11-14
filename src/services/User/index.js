import { GET_USER_DETAILS, LOGIN_USER, REGISTER_FACULTY } from "../Apis";

export const getUserDetails = async () => {
  const response = await fetch(GET_USER_DETAILS, {
    method : 'GET',
    headers: {
      "content-Type":"application/json",
      Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
    },
  });
  if(response.status !== 200) {
    throw new Error("User not found")
  }
  const data = await response.json()
  return data?.Response
};
export const getAllFacutliesDetail = async () => {
  const response = await fetch(REGISTER_FACULTY, {
    method : 'GET',
    headers: {
      "content-Type":"application/json",
      Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
    },
  });
  if(response.status !== 200) {
    throw new Error("User not found")
  }
  const data = await response.json()
  return data
};

export const loginUser = async (credentails) => {
    const response = await fetch(LOGIN_USER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body : JSON.stringify(credentails)
      });
      if (response.status !== 201) {
        throw new Error("Falid to login");
      }
      const data = await response.json();
      return data?.Response;
}

export const registerFaculty = async (body) => {
  const response = await fetch(REGISTER_FACULTY, {
    method : 'POST',
    headers: {
      "content-Type":"application/json",
      Authorization: `Bearer ${localStorage.getItem("erp-token")}`,
    },
    body : JSON.stringify(body)
  });
  if(response.status !== 201) {
    throw new Error("Failed to register")
  }
  const data = await response.json()
  return data
};