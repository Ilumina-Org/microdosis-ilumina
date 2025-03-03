import React from "react";

function Button({ id, label, onClick = () => alert("click") }: any) {
  return (
    <>
      <input
        id={id}
        type="button"
        value={label}
        onClick={onClick}
        style={{
          width: "fit-content",
          padding: "1.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#C1DC3A",
          borderRadius: "10px",
          border: "none",
          fontSize: "30px",
          fontFamily: "Inter",
          fontWeight: "200",
          cursor: "pointer",
        }}
      />
    </>
  );
}

export default Button;
