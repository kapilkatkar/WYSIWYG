/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import "./style.css";
import { useState } from "react";

export function UrlDialog({ open, handleClose, handleSave }) {
  const [dialogdata, setDialogdata] = useState({
    url: "",
    textToDisplay: "",
    title: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDialogdata((prev) => ({ ...prev, [name]: value }));
    console.log(dialogdata);
  };

  const handleSaveData = () => {
    handleSave(dialogdata);
    handleClose(true);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{ style: { height: "325px", width: "325px" } }}
    >
      <div className="UrlDialogContainer">
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          id="url"
          className="UrlDialogInput"
          onChange={(e) => handleInputChange(e)}
        />

        <label htmlFor="textToDisplay">Text to Display</label>
        <input
          type="text"
          name="textToDisplay"
          id="textToDisplay"
          className="UrlDialogInput"
          onChange={(e) => handleInputChange(e)}
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="UrlDialogInput"
          onChange={(e) => handleInputChange(e)}
        />

        <div className="UrlDialogButtons">
          <button className="UrlDialogButton" onClick={handleSaveData}>
            Save
          </button>
          <button className="UrlDialogButton" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
