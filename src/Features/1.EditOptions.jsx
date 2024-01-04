import { useState } from "react";
import ButtonComponet from "../Components/molecules/1.button.component";

const EditOptionBarComponent = () => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const onBoldClick = () => {
    setIsBold(!isBold);
  };
  const onItalicClick = () => {
    setIsItalic(!isItalic);
  };
  const onUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  return (
    <div>
      <h1>WYSIWYG</h1>
      <ButtonComponet
        label={"B"}
        color={"black"}
        background={"white"}
        mtop={4}
        mleft={4}
        onClickFun={onBoldClick}
      ></ButtonComponet>
      <ButtonComponet
        label={"I"}
        color={"black"}
        background={"white"}
        mtop={4}
        mleft={4}
        onClickFun={onItalicClick}
      ></ButtonComponet>
      <ButtonComponet
        label={"U"}
        color={"black"}
        background={"white"}
        mtop={4}
        mleft={4}
        onClickFun={onUnderlineClick}
      ></ButtonComponet>
      <input type="color" name="" id="" />
      <div
        style={{
          width: 400,
          border: "1px solid black",
          padding: 12,
          marginTop: 12,
          minHeight: 150,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "inherit",
          textDecoration: isUnderline ? "underline" : "none",
        }}
        contentEditable={true}
      ></div>
    </div>
  );
};
export default EditOptionBarComponent;
