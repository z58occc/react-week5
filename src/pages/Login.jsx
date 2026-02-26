import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function Login() {
  const api = import.meta.env.VITE_APP_API_BASE;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    try {
      const res = await axios.post(`${api}/v2/admin/signin`, data);
      console.log(res);
      navigate("/productList");
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
