const Spinner = () => {
  return (
    <div className="relative top-[80%]  h-20 w-20">
      <div className=" animate-ping absolute inline-flex mt-3 ml-3 h-[70%] w-[70%] rounded-full bg-sky-400 opacity-75"></div>
      <div className=" animate-ping absolute inline-flex  mt-5 ml-5 h-[50%] w-[50%] rounded-full bg-sky-300 opacity-75"></div>
      <div className=" animate-ping absolute inline-flex mt-7 ml-7 h-[30%] w-[30%] rounded-full bg-sky-300 opacity-75"></div>
      <div className=" animate-ping absolute inline-flex mt-7 ml-7 h-[30%] w-[30%] rounded-full bg-sky-300 opacity-75"></div>
      <div className=" animate-ping absolute inline-flex mt-9 ml-9 h-[10%] w-[10%] rounded-full bg-sky-200 opacity-75"></div>
    </div>
  );
};
export default Spinner;
