import React from "react";

function Button({ 
  id, 
  fontSize = 30, 
  label, 
  onClick = () => alert("click"), 
  radius = '10px',
  size = '1rem',
  gap = "5rem",
  icon, 
  disabled=false, 
}: any) {
  return (
    <div 
    onClick={onClick}
    style={{
      display: "flex",
      gap: gap,
      width: "fit-content",
      borderRadius: radius,
      overflow: "hidden",
      background: "#C1DC3A",
      cursor: "pointer",
      opacity: disabled ? .5 : 1,
      padding: "1.5rem",
      paddingTop: size,
      paddingBottom: size,
      alignContent: "center",
      alignItems: 'center',
    }}>
      <input
        id={id}
        type="button"
        disabled={disabled}
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
