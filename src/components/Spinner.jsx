import { ColorRing } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ColorRing
        visible={true}
        height="400"
        width="400"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}
