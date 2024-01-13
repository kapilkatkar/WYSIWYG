import { useEffect, useState } from "react";
import ButtonComponent from "../Components/molecules/1.button.component";
import { FaLink } from "react-icons/fa";
import { UrlDialog } from "./2.urlDialog";
import "./style.css";
import { EmojiComponent } from "./emoji";
import tinycolor from "tinycolor2";

const EditOptionBarComponent = () => {
  const [selectedColor, setSelectedColor] = useState("#00000");
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("#fffff");
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [isBoldClicked, setIsBoldClicked] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [urlData, setUrlData] = useState("");
  const [isEmojiDiaOpen, setIsEmojiDiaOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const applyFormatting = (command, value) => {
    document.execCommand(command, false, value);
  };

  // const handleImageSelect = (e) => {
  //   const img = e.target.files[0];
  //   // document.getElementById("editor-box-content").innerHTML +=
  //   //   e.target.files[0];
  //   if (img) {
  //     console.log("img", img);
  //     document.getElementById("editor-box-content").innerHTML += img;
  //   }
  // };

  const openEmojiDialog = () => {
    setIsEmojiDiaOpen(true);
  };
  const closeEmojiDialog = () => {
    setIsEmojiDiaOpen(false);
  };

  const onEmojiSelected = (e) => {
    setSelectedEmoji(e);
    document.getElementById("editor-box-content").innerHTML += e;
  };

  const openUrlDilog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveUrlData = (data) => {
    console.log("urlData", data);
    setUrlData(data);
    const url = `<a href="${data.url}" target="_blank" title="${data.title}"> ${
      data.textToDisplay || data.url
    }  <a>`;
    document.getElementById("editor-box-content").innerHTML += url;
  };

  const onBoldClick = () => {
    //applyFormatting("bold", null);
    applyFormatting("bold", null);
    setIsBoldClicked((prev) => !prev);
  };

  const onItalicClick = () => {
    applyFormatting("italic", null);
    setIsItalic((prev) => {
      !prev;
    });
  };

  const onUnderlineClick = () => {
    applyFormatting("underline", null);
    setIsUnderlined((prev) => {
      !prev;
    });
  };

  const onColorPick = (e) => {
    const selectedColor = tinycolor(e.target.value).toHexString();
    applyFormatting("forecolor", e.target.value);
    document.execCommand("styleWithCSS", false, true);
    setSelectedColor(e.target.value);
  };

  const onBackgroundColor = (e) => {
    const selectedColor = tinycolor(e.target.value).toHexString();
    applyFormatting("backColor", selectedColor);
    document.execCommand("styleWithCSS", false, true);
    setSelectedBackgroundColor(selectedColor);
  };

  const onHeading = (value) => {
    applyFormatting("formatBlock", value);
  };

  const onIncreament = () => {
    const selectedText = window.getSelection();
    if (selectedText.toString() !== "") {
      const currentFontSize = document.queryCommandValue("fontSize");
      const newFontSize = currentFontSize
        ? parseInt(currentFontSize) + 1
        : textSize + 1;
      applyFormatting("fontSize", newFontSize);
      setTextSize(newFontSize);
    }
  };

  const onDecreament = () => {
    if (textSize > 1) {
      const selectedText = window.getSelection();
      if (selectedText.toString() !== "") {
        const currentFontSize = document.queryCommandValue("fontSize");
        const newFontSize = currentFontSize
          ? parseInt(currentFontSize) - 1
          : textSize - 1;
        applyFormatting("fontSize", newFontSize);
        setTextSize(newFontSize);
      }
    }
  };

  return (
    <div>
      <div id="WYSIWYG">
        <div>WYSIWYG</div>
      </div>
      <div className="button-editor-conatiner">
        <div id="button-conatiner">
          <ButtonComponent
            label={"B"}
            color={"black"}
            mtop={4}
            mleft={4}
            fontWeight={true}
            background={"white"}
            onClickFun={onBoldClick}
          ></ButtonComponent>
          <ButtonComponent
            label={"I"}
            color={"black"}
            italic={true}
            background={"white"}
            mtop={4}
            mleft={4}
            onClickFun={onItalicClick}
          ></ButtonComponent>
          <ButtonComponent
            underline={true}
            label={"U"}
            color={"black"}
            background={"white"}
            mtop={4}
            mleft={4}
            onClickFun={onUnderlineClick}
          ></ButtonComponent>
          <input
            type="color"
            name="color"
            id="color"
            onChange={onColorPick}
            value={selectedColor}
          />
          <input
            type="color"
            name="Backgroundcolor"
            id="Backgroundcolor"
            onChange={onBackgroundColor}
            value={selectedBackgroundColor}
          />
          <select
            name="header"
            id="header"
            onChange={(e) => onHeading(e.target.value)}
          >
            <option value="p">header</option>
            <option value="h1" style={{ fontSize: "34px" }}>
              header 1
            </option>
            <option value="h2" style={{ fontSize: "30px" }}>
              header 2
            </option>
            <option value="h3" style={{ fontSize: "24px" }}>
              header 3
            </option>
            <option value="h4" style={{ fontSize: "20px" }}>
              header 4
            </option>
            <option value="h5" style={{ fontSize: "18px" }}>
              header 5
            </option>
            <option value="h6" style={{ fontSize: "16px" }}>
              header 6
            </option>
          </select>
          <span>
            <FaLink onClick={openUrlDilog} />
            <UrlDialog
              open={open}
              handleClose={handleClose}
              handleSave={handleSaveUrlData}
            />
          </span>
          <div>
            <button onClick={onDecreament}>-</button>
            <button onClick={onIncreament}>+</button>
          </div>
          <div>
            <div>
              <div onClick={openEmojiDialog}>
                <img src="/Assets/smile.png" alt="emoji" />
              </div>
              <EmojiComponent
                isOpen={isEmojiDiaOpen}
                isClosed={closeEmojiDialog}
                handleEmojiSelect={onEmojiSelected}
              />
            </div>
          </div>
          {/* <div>
            <label htmlFor="image">Select Image</label>
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
          </div> */}
        </div>

        <div id="editor-box">
          <div
            id="editor-box-content"
            style={{
              width: "100%",
              height: "350px",
              border: "1px solid black",
              minHeight: 150,
              fontSize: 16,
            }}
            contentEditable={true}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EditOptionBarComponent;
