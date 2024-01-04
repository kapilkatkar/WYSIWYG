/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import "./style.css";
import { useState } from "react";

export function UrlDialog({ open, handleClose, handleSave }) {
  const [url, setUrl] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");
  const [title, setTitle] = useState("");

  const handleSaveInput = () => {
    const data = { url, textToDisplay, title };
    handleClose();
    handleSave(data);
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
          id="url"
          className="UrlDialogInput"
          onChange={(e) => setUrl(e.target.value)}
        />

        <label htmlFor="textToDisplay">Text to Display</label>
        <input
          type="text"
          name="textToDisplay"
          id="textToDisplay"
          className="UrlDialogInput"
          onChange={(e) => setTextToDisplay(e.target.value)}
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="UrlDialogInput"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="UrlDialogButtons">
          <button className="UrlDialogButton" onClick={handleSaveInput}>
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
