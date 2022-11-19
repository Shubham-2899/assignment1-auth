import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const Testing = (props: Props) => {
  return (
    <div>
      Testing
      <button
        onClick={() =>
          toast.success("Products deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          })
        }
      >
        test
      </button>
      <ToastContainer />
    </div>
  );
};

export default Testing;
