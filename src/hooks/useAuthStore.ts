import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { GetResponseLogin } from "../interfaces/AuthInterface";
import { isAxiosError } from "axios";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email: string, password: string) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post<GetResponseLogin>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(
          onLogout(error.response?.data?.msg || "Credenciales incorrectas")
        );
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post<GetResponseLogin>(
        "/auth/register",
        {
          email,
          password,
          name,
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(onLogout(error.response?.data?.msg || "Error en el registro"));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout("Token no encontrado"));
      return;
    }
    try {
      const { data } = await calendarApi.get<GetResponseLogin>(
        "/auth/autenticated"
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(
          onLogout(error.response?.data?.msg || "Error al validar token")
        );
      }
      localStorage.clear();
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout("Se ha cerrado la sesión"));
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
