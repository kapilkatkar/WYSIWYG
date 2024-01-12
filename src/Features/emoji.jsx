/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import "./style.css";
import EmojiPicker from "emoji-picker-react";

export function EmojiComponent({ isOpen, isClosed, handleEmojiSelect }) {
  const onEmojiSelect = (e) => {
    const selectedEmoj = e.emoji;
    handleEmojiSelect(selectedEmoj);
    isClosed(true);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={isClosed}
      style={{ height: "400px", width: "600px" }}
    >
      <div>
        <div>
          <EmojiPicker
            style={{ height: "100%", width: "100%" }}
            onEmojiClick={(e) => {
              onEmojiSelect(e);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
