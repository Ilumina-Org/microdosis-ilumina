import React from "react";

export default function ProductContainer({ imageUrl, productTitle, productDetail, productPrice, productDeal, tier, purchaseType }: any) {

  const tierHandler = (tier:any) => {
    switch (tier) {
      case 0:
        return 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)'
        case 1:
          return 'linear-gradient(-40deg,#dedede,#ffffff 16%,#dedede 21%,#ffffff 24%,#454545 27%,#dedede 36%,#ffffff 45%,#ffffff 60%,#dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)'
          case 2:
            return 'linear-gradient(-72deg, #ca7345, #ffdeca 16%, #ca7345 21%, #ffdeca 24%, #a14521 27%, #ca7345 36%, #ffdeca 45%, #ffdeca 60%, #ca7345 72%, #ffdeca 80%, #ca7345 84%, #732100)'
      default:
        return ''
    }
  }

  const buttonStyle={
      width: 'fit-content',
      padding: '1rem',
      paddingTop: '.75rem',
      paddingBottom: '.75rem',
      background: '#C1DC3A',
      borderRadius: '10px',
      border: 'none'
  }

  return (
    <div
    style={{
      background: tierHandler(tier),
      padding: '.5rem',
      borderRadius: "30px",
      boxShadow: "0px 10px 40px rgb(0, 0, 0, 0.2)",
    }}
    >
    <div
      style={{
        backgroundColor: "white",
        width: "16rem",
        height: "26rem",
        display: 'flex',
        padding: '.75rem',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: "20px",
      }}
    >
        <img
          src={imageUrl}
          alt=""
          fetchPriority="high"
          width="100%"
          height="55%"
          style={{objectFit: 'contain'}}
        />
        <div style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
        <div style={{display: 'flex',flexDirection: 'column', gap: '7px'}}>
        <h3 style={{fontSize: '25px', marginTop: 0, marginBottom: 0}}>{productTitle}</h3>
        <p style={{fontSize: '15px', marginTop: 0, marginBottom: 0}}>{productDetail}</p>
        <p style={{fontSize: '30px', marginTop: 0, marginBottom: 0}}>{productPrice}</p>
        <p style={{fontSize: '15px', marginTop: 0, marginBottom: 0}}>{productDeal}</p>
        </div>
        <input type='button' value={purchaseType == 'subscription' ? 'Suscripcion mensual' : "Comprar ahora"}  style={buttonStyle} />
        </div>
    </div>
    </div>
  );
}
