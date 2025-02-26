import React from 'react'

export default function Review({imageUrl}:any) {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        flexDirection: "row",
        width: "550px",
        padding: "1rem",
        paddingRight: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0px 5px 20px rgb(0, 0, 0, 0.25)'
      }}
    >
      <img
        src={imageUrl}
        alt=""
        fetchPriority="high"
        width="125"
        height="125"
      />
      <div style={{ flexDirection: "column" }}>
        <p>
          <i>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
          odio quis elit sagittis luctus eget ac metus. Fusce finibus nec risus
          vitae facilisis. Morbi sit amet tempor arcu. Nullam eget velit
          venenatis, tincidunt sapien ac,
          </i>
        </p>
        <p style={{ textAlign: "right" }}>Carla Maurice R.</p>
      </div>
    </div>
  )
}
