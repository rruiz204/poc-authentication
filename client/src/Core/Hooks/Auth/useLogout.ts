export const useLogout = () => {
  const invoke = () => {
    localStorage.removeItem("token");
  };

  return { invoke };
};