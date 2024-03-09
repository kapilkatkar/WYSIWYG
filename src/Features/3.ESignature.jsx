import Dialog from "@mui/material/Dialog";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./style.css";
// eslint-disable-next-line react/prop-types
const ESignatureDialog = ({ open, handleClose, handleSave }) => {
  const [signatureData, setSignatureData] = useState("");
  const signatureRef = useRef();

  const clearSignature = () => {
    signatureRef.current.clear();
    handleClose(true);
  };

  const saveSignature = () => {
    const Esignature = signatureRef.current.toDataURL();
    setSignatureData(Esignature);
    handleSave(Esignature);
    handleClose(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 400, height: 200 }}
        />
        <div>
          <button onClick={clearSignature} className="btn">
            Clear
          </button>
          <button onClick={saveSignature} className="btn">
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ESignatureDialog;
