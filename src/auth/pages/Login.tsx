import { useForm } from "react-hook-form";
import { LoginForm, RegisterForm } from "../../interfaces/AuthInterface";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { toast } from "sonner";

export const Login = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({ defaultValues: { email: "", password: "" } });
  const {
    register: registerForm,
    formState: { errors: errorsRegister },
    handleSubmit: handleSubmitRegister,
  } = useForm<RegisterForm>({
    defaultValues: { name: "", email: "", password: "", password2: "" },
  });

  const onSubmit = (data: LoginForm) => {
    startLogin(data.email, data.password);
  };

  const onSubmitRegister = (data: RegisterForm) => {
    if(data.password !== data.password2){
      return toast.error("Contraseñas no son iguales")
    }
    startRegister(data.email, data.password, data.name);
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                {...register("email", { required: "Este campo es requerido" })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                {...registerForm("name", {
                  required: "Este campo es requerido",
                })}
              />
              {errorsRegister.name && (
                <span className="text-danger">
                  {errorsRegister.name.message}
                </span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                {...registerForm("email", {
                  required: "Este campo es requerido",
                })}
              />
              {errorsRegister.email && (
                <span className="text-danger">
                  {errorsRegister.email.message}
                </span>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...registerForm("password", {
                  required: "Este campo es requerido",
                })}
              />
              {errorsRegister.password && (
                <span className="text-danger">
                  {errorsRegister.password.message}
                </span>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                {...registerForm("password2", {
                  required: "Este campo es requerido",
                })}
              />
              {errorsRegister.password2 && (
                <span className="text-danger">
                  {errorsRegister.password2.message}
                </span>
              )}
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
