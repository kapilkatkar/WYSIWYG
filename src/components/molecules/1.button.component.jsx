/* eslint-disable react/prop-types */
const ButtonComponet = ({
  color,
  background,
  top,
  left,
  label,
  mtop,
  mleft,
  fontWeight,
  italic,
  underline,
  onClickFun,
}) => {
  return (
    <button
      onClick={onClickFun}
      style={{
        color: `${color}`,
        background: `${background}`,
        cursor: "pointer",
        padding: `${top}px ${left}px`,
        margin: `${mtop}px ${mleft}px`,
        fontWeight: fontWeight ? "bold" : "normal",
        fontStyle: italic ? "italic" : "normal",
        textDecoration: underline ? "underline" : "none",
        border: "none",
      }}
    >
      {label}
    </button>
  );
};

ButtonComponet.defaultProps = {
  color: "white",
  background: "black",
  top: 10,
  left: 12,
  label: " ",
  fontWeight: false,
  italic: false,
  textDecoration: false,
};
export default ButtonComponet;
