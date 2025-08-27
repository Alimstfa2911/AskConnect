export const roleCheck = (context) => {
  if (context.user.role !== "Admin") throw new Error("UnAuthorized to Delete");
};
