/* eslint-disable react/prop-types */
const ButtonComponet = ({
  color,
  background,
  top,
  left,
  label,
  mtop,
  mleft,
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
};
export default ButtonComponet;
