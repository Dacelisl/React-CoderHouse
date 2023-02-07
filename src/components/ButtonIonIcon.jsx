
export const ButtonIonIcon = ({ nameIcon, event, className }) => {
  return (
    <>
      <button className={className} onClick={event}>
        <ion-icon name={nameIcon} style={style.ionIcon}></ion-icon>
      </button>
    </>
  );
};
const style = {
  ionIcon :{
    display: "block",
    fontSize: "40px",
    color: "white",
  }
};

