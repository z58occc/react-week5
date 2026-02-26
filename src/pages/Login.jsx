import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { showToast } from "../slice/messageSlice";

export default function Login() {
  const dispatch = useDispatch();
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
      dispatch(
        showToast({
          message: "已成功登入",
          bg: "primary",
        }),
      );
      navigate("/productList");
    } catch (error) {
      dispatch(
        showToast({
          message: "登入失敗",
          bg: "danger",
        }),
      );
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-control"
            type="email"
            placeholder="email"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-danger">email必填！</p>}
          <br />
          <input
            className="form-control"
            type="password"
            placeholder="密碼"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-danger">密碼必填！</p>}
          <br />
          <input className="mt-3 btn btn-primary" type="submit" />
        </form>
      </div>
    </>
  );
}
