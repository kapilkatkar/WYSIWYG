import { useEffect, useState } from "react";
import ButtonComponent from "../Components/molecules/1.button.component";
import { FaLink } from "react-icons/fa";
import { UrlDialog } from "./2.urlDialog";
import "./style.css";

const EditOptionBarComponent = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("white");
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [isBoldClicked, setIsBoldClicked] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [openDilog, setOpenDilog] = useState(false);

  const applyFormatting = (command, value) => {
    document.execCommand(command, false, value);
  };
  const openUrlDilog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveUrlData = (input) => {
    console.log(input);
    const { url, textToDisplay, title } = input;
    const anchorUrl = `<a href="${url}" title="${title}">${textToDisplay}</a>`;
    console.log({ anchorUrl });
  };

  useEffect(() => {
    if (isBoldClicked) {
      console.log("isBoldClicked", isBoldClicked);
      applyFormatting("bold", null);
    }
  }, [isBoldClicked]);
  const onBoldClick = () => {
    //applyFormatting("bold", null);

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
    applyFormatting("forecolor", e.target.value);
    setSelectedColor(e.target.value);
  };

  const onBackgroundColor = (e) => {
    const selectedColor = e.target.value;
    applyFormatting("backColor", selectedColor);
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
            background={!isBoldClicked ? "white" : "blue"}
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
        </div>
        <div id="editor-box">
          <div
            style={{
              width: "100%",
              height: "350px",
              border: "1px solid black",
              minHeight: 150,
              fontSize: 24,
            }}
            contentEditable={true}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EditOptionBarComponent;
