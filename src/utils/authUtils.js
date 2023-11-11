export const getUserRole = (user) => {
  if ("faculty_user" in user) {
    return user.faculty_user.role;
  }
  return user?.role;
};
