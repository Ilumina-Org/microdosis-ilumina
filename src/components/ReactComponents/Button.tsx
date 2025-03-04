import React from "react";
import useResponsiveness from "../../utils/useResponsiveness";

function Button({ id, label, onClick = () => alert("click") }: any) {
  const { handleResponsiveness } = useResponsiveness();
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
          border: "none",
          fontSize: handleResponsiveness(["35px", "30px", "30px", "20px"]),
          boxShadow: "2px 4px 7.7px rgba(0, 0, 0, 0.13)",
          borderRadius: handleResponsiveness(["20px", "20px", "30px", "20px"]),
          fontFamily: "Inter",
          fontWeight: "200",
          cursor: "pointer",
        }}
      />
    </>
  );
}

export default Button;
