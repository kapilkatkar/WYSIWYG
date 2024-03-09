import { useEffect, useState } from "react";
import ButtonComponent from "../Components/molecules/1.button.component";
import { FaLink } from "react-icons/fa";
import { UrlDialog } from "./2.urlDialog";
import "./style.css";
import { EmojiComponent } from "./emoji";
import tinycolor from "tinycolor2";
import { io } from "socket.io-client";
import ESignatureDialog from "./3.ESignature";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const EditOptionBarComponent = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("#ffffff");
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [isBoldClicked, setIsBoldClicked] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [urlData, setUrlData] = useState("");
  const [isEmojiDiaOpen, setIsEmojiDiaOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [socket, setSocket] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const [signReceived, setSignReceived] = useState("");
  const uuid = uuidv4();
  const [isCollaborative, setIsCollaborative] = useState(false);

  const applyFormatting = (command, value) => {
    document.execCommand(command, false, value);

    // Emit the updated content to the server
    if (isCollaborative) {
      const content = document.getElementById("editor-box-content").innerHTML;
      socket.emit("updateEditorContent", content);
    }
  };
  console.log(uuid);
  // const handleImageSelect = (e) => {
  //   const img = e.target.files[0];
  //   // document.getElementById("editor-box-content").innerHTML +=
  //   //   e.target.files[0];
  //   if (img) {
  //     console.log("img", img);
  //     document.getElementById("editor-box-content").innerHTML += img;
  //   }
  // };

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("editorContent", (content) => {
        setEditorContent(content);
      });
    }
  }, [socket]);

  const openEmojiDialog = () => {
    setIsEmojiDiaOpen(true);
  };
  const closeEmojiDialog = () => {
    setIsEmojiDiaOpen(false);
  };

  const onEmojiSelected = (e) => {
    setSelectedEmoji(e);
    document.getElementById("editor-box-content").innerHTML += e;
    if (isCollaborative) {
      const content = document.getElementById("editor-box-content").innerHTML;
      socket.emit("updateEditorContent", content);
    }
  };
  const openUrlDilog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveUrlData = (data) => {
    setUrlData(data);
    const url = `<a href="${data.url}" target="_blank" title="${data.title}">${
      data.textToDisplay || data.url
    }</a>`;
    document.getElementById("editor-box-content").innerHTML += url;
    if (isCollaborative) {
      const content = document.getElementById("editor-box-content").innerHTML;
      socket.emit("updateEditorContent", content);
    }
  };

  const onBoldClick = () => {
    //applyFormatting("bold", null);
    applyFormatting("bold", isBoldClicked);
    setIsBoldClicked((prev) => !prev);
  };

  const onItalicClick = () => {
    applyFormatting("italic", isItalic);
    setIsItalic((prev) => !prev);
  };

  const onUnderlineClick = () => {
    applyFormatting("underline", isUnderlined);
    setIsUnderlined((prev) => !prev);
  };

  const onColorPick = (e) => {
    const selectedColor = tinycolor(e.target.value).toHexString();
    applyFormatting("forecolor", selectedColor);
    setSelectedColor(selectedColor);
    document.execCommand("styleWithCSS", false, true);
  };

  const onBackgroundColor = (e) => {
    const selectedColor = tinycolor(e.target.value).toHexString();
    applyFormatting("backColor", selectedColor);
    document.execCommand("styleWithCSS", false, true);
    setSelectedBackgroundColor((prev) => !prev);
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

  const openSignatureDialogHandler = () => {
    console.log("setOpenSignatureDialog 1", openSignatureDialog);
    setOpenSignatureDialog((prevState) => {
      console.log("setOpenSignatureDialog 1", prevState);
      return true;
    });
  };
  const closeSignatureDialogHandler = () => {
    setOpenSignatureDialog(false);
  };

  const handleSaveSignatureData = (data) => {
    console.log("Signature data:", data);
    var base64Image = data.split(";base64,").pop();
    var img = new Image();
    img.src = "data:image/png;base64," + base64Image;
    img.style.height = "20px";
    img.style.width = "80px";
    img.style.filter = "brightness(20%)";

    document.getElementById("editor-box-content").appendChild(img);
  };

  const handleCreateRoom = () => {
    setIsCollaborative(true);
    const content = document.getElementById("editor-box-content").innerHTML;
    socket.emit("updateEditorContent", content);
  };

  const generateHTML = () => {
    const htmlContent = document.getElementById("editor-box-content").innerHTML;
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Generated HTML</title>
        </head>
        <body>
          <textarea readonly  style="width:100%;height:100%;">${htmlContent}</textarea>
        </body>
      </html>
    `);
    newWindow.document.close();
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
            fontWeight={true}
            background={"white"}
            onClickFun={onBoldClick}
          ></ButtonComponent>
          <ButtonComponent
            label={"I"}
            color={"black"}
            italic={true}
            background={"white"}
            onClickFun={onItalicClick}
          ></ButtonComponent>
          <ButtonComponent
            underline={true}
            label={"U"}
            color={"black"}
            background={"white"}
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
                <img src="../Assets/smile.png" alt="emoji" />
              </div>
              <EmojiComponent
                isOpen={isEmojiDiaOpen}
                isClosed={closeEmojiDialog}
                handleEmojiSelect={onEmojiSelected}
              />
            </div>
          </div>
          <div>
            <ButtonComponent
              label={" E-Sign"}
              color={"black"}
              background={"white"}
              onClickFun={openSignatureDialogHandler}
            ></ButtonComponent>

            <ESignatureDialog
              open={openSignatureDialog}
              handleClose={closeSignatureDialogHandler}
              handleSave={handleSaveSignatureData}
            />
          </div>
          <div>
            <Link to={`/collabrative/${uuid}`} onClick={handleCreateRoom}>
              <ButtonComponent
                label={"Create Room"}
                color={"black"}
                background={"white"}
              ></ButtonComponent>
            </Link>
          </div>

          <ButtonComponent
            label={"Generate HTML"}
            color={"black"}
            background={"white"}
            onClickFun={generateHTML}
          ></ButtonComponent>
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
              width: "80%",
              height: "400px",
              minHeight: 150,
              fontSize: 16,
            }}
            contentEditable={true}
            dangerouslySetInnerHTML={{
              __html: `
                <h2>Subject: Application for Frontend Developer Position </h2>
                <p>Dear Hiring Manager,</p>
                <p>I'm reaching out to express my interest in the <u><i>Frontend Developer </i></u> position with <span style="background-color: rgb(224, 206, 6);">2+ years of experience.</span> With expertise in<b>HTML, CSS, JavaScript, TypeScript, and React.js</b>, I'm excited about the opportunity to contribute to your team's success.</p>
                <p><span style="background-color: rgb(5, 245, 53);"> I am excited about the possibility of joining and contributing to its continued success.</span></p>
                <p>Best regards,</p>
                <span>Kapil Katkar</span></br>
                <span style="color: rgb(44, 53, 181); font-weight: bold;">7798296729</span>
                <br>
                <r>
                <br>
                <h3><span style="color: rgb(191, 43, 43);">Add, remove or change any of the text above, to see how our rich text editor works.</span></h3>
                ${editorContent}`,
            }}
            onBlur={() => {
              const content =
                document.getElementById("editor-box-content").innerHTML;
              socket.emit("updateEditorContent", content);
            }}
            onKeyUp={(e) => {
              if (e.key === " ") {
                document.execCommand("insertHTML", false, "&nbsp;");
                e.preventDefault();
              }
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EditOptionBarComponent;
