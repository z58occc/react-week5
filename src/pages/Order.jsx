import axios from "axios";
import { useForm } from "react-hook-form";

export default function Order() {
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
      alert("訂單已成功建立");
    } catch (error) {
      alert("訂單建立失敗");
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="姓名"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-danger">姓名是必填</p>}
          <br />
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-danger">email是必填</p>}

          <br />
          <input
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
            type="text"
            placeholder="地址"
            {...register("address", { required: true })}
          />
          {errors.address && <p className="text-danger">地址是必填</p>}

          <br />
          <input type="text" placeholder="留言" {...register("message")} />
          <br />
          <input className="mt-3" type="submit" />
        </form>
      </div>
    </>
  );
}
