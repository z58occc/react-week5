import axios from "axios";
import { useForm } from "react-hook-form";

export default function Login() {
  const api = import.meta.env.VITE_APP_API_BASE;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    try {
      console.log(data);
      const res = await axios.post(`${api}/v2/admin/signin`, data);
      window.location.href =
        "https://z58occc.github.io/react-week2/#/productList";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="email"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-danger">email必填！</p>}
          <br />
          <input
            type="password"
            placeholder="密碼"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-danger">密碼必填！</p>}
          <br />
          <input className="mt-3" type="submit" />
        </form>
      </div>
    </>
  );
}
