import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showToast } from "../slice/messageSlice";
import { useNavigate } from "react-router";

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    const newData = {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address,
        },
        message: data.message,
      },
    };
    try {
      const res = await axios.post(`${api}/v2/api/${path}/order`, newData);
      dispatch(
        showToast({
          message: "訂單已成功建立",
          bg: "info",
        }),
      );
      navigate("/products");
    } catch (error) {
      dispatch(
        showToast({
          message: "訂單建立失敗",
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
            type="text"
            placeholder="姓名"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-danger">姓名是必填</p>}
          <br />
          <input
            className="form-control"
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-danger">email是必填</p>}

          <br />
          <input
            className="form-control"
            type="tel"
            placeholder="電話"
            {...register("tel", { required: true, min: 8 })}
          />
          {errors.tel ? (
            errors.tel.type === "min" ? (
              <p className="text-danger">電話要超過 8 碼 </p>
            ) : (
              <p className="text-danger">電話是必填</p>
            )
          ) : (
            <></>
          )}

          <br />
          <input
            className="form-control"
            type="text"
            placeholder="地址"
            {...register("address", { required: true })}
          />
          {errors.address && <p className="text-danger">地址是必填</p>}

          <br />
          <input
            className="form-control"
            type="text"
            placeholder="留言"
            {...register("message")}
          />
          <br />
          <input className="mt-3 btn btn-dark"  type="submit" />
        </form>
      </div>
    </>
  );
}
