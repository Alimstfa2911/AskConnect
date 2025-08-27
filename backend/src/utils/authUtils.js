export const authCheck = (context) => {
    if(!context || !context.user) throw new Error("Unauthenticated!");
}