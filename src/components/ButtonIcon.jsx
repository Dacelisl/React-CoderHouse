export const ButtonIcon = ({ title, nameIcon, sizeIcon, ...others }) => {
  return (
    <>
      <button
        className=" bg-sky-500 flex w-max text-center items-center px-2 py-2 rounded-md font-medium text-cyan-50 hover:bg-sky-600 active:transform active:translate-y-px"
        {...others}
      >
        {nameIcon ? (
          <span className="text-justify mt-1 px-1">
            <ion-icon name={nameIcon} size={sizeIcon}></ion-icon>
          </span>
        ) : (
          <></>
        )}
        {title}
      </button>
    </>
  );
};
