import React from "react";

function Button({ id, fontSize = 30, label, onClick = () => alert("click"), icon }: any) {
  return (
    <div 
    onClick={onClick}
    style={{
      display: "flex",
      gap: "1rem",
      width: "fit-content",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#C1DC3A",
      cursor: "pointer",
      padding: "1.5rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      alignContent: "center",
      alignItems: 'center',
    }}>
      <input
        id={id}
        type="button"
        value={label}
        style={{
          width: "fit-content",
          background: "#C1DC3A",
          border: "none",
          fontSize: `${fontSize}px`,
          fontFamily: "Inter",
          fontWeight: "200",
          cursor: "pointer",
        }}
      />
      {icon}
    </div>
  );
}

export default Button;
