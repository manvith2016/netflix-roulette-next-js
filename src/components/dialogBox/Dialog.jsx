import React from "react";
import { Portal } from "react-portal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCurrentQueryParams } from "../../utils/utils";
// import "./Dialog.css";

const Dialog = ({ title, children, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <Portal>
      {/* <!-- The Modal --> */}
      <div className="modal" id="myModal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button type="button" className="close" onClick={() => { onClose ? onClose() : navigate("/?" + fetchCurrentQueryParams(searchParams)) }}>
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {children}
            </div>

          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Dialog;
