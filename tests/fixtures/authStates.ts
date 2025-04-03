export const state = {
    status: "checking",
    user: { name: "", uid: "" },
    errorMessage: undefined,
  };

export const state1 = {
    status: "authenticated",
    user: { name: "Fernando", uid: "123" },
    errorMessage: undefined,
  };

 export const state2 = {
    status: "not-authenticated",
    user: { name: "", uid: "" },
    errorMessage: "Credenciales no validas",
    };