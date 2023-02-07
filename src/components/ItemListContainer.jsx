import React from "react";

export const ItemListContainer = ({ greeting }) => {
  return (
    <div style={style.cardContainer}>
      <div style={style.cardContent}>
        <span style={style.cardIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Volume High</title>
            <path
              d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg>
        </span>
        <p style={style.cardInfo}>{greeting}</p>
      </div>
    </div>
  );
};

const style = {
  cardContainer: {
    width: "90%",
    background: "hsl(243deg 75% 59%)",
    display: "block",
    margin: "auto",
    marginTop: "15%",
    borderRadius: "10px 10px 0px 0px",
  },
  cardInfo: {
    textAlign: "center",
    margin: "5px",
    marginTop: "10px",
  },
  cardIcon: {
    background: "hsl(244deg 55% 41%)",
    float: "left",
    display: "flex",
    width: "32px",
    margin: "5px 5px 5px 20px",
    borderRadius: "5px",
    background: "rgb(60 52 169)",
    color: "white",
  },
  cardContent: {
    display: "flow-root",
  },
};
