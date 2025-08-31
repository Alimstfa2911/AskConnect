export const roleCheck = (context) => {
  if (context.user.role !== "admin") throw new Error("UnAuthorized to Delete");
};
