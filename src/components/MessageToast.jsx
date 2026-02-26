import { useEffect, useRef } from "react";
import { Toast } from "bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideToast } from "../slice/messageSlice";

export default function MessageToast() {
  const dispatch = useDispatch();
  const { show, message, bg } = useSelector((state) => {
    return state.messager;
  });
  const toastRef = useRef(null);
  useEffect(() => {
    toastRef.current = new Toast(toastRef.current);
  }, []);

  useEffect(() => {
    if (show) {
      toastRef.current.show();
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
      return () => clearTimeout(timer); 
    } else {
      toastRef.current.hide();
    }
  }, [show]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
      <div
        ref={toastRef}
        id="liveToast"
        className={`toast text-white bg-${bg}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}
