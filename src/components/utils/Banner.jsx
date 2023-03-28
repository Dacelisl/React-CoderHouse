import { useState, useEffect } from "react";
const Banner = () => {
  const [banner, setBanner] = useState(
    "Operación Black Friday: ¡disfruta de los súper descuentos!"
  );

  useEffect(() => {
    const myArray = [
      "¡Paga tu compra sin interes!",
      "¡Ofertas rápidas! Consigue un 2x1 en toda la tienda online",
      "Solo este fin de semana tienes un 25 % de descuento en todos los artículos de hogar",
      "¡Descuento imperdible! ¡Solo hoy!",
      "Liquidación: 50 % DE DESCUENTO",
    ];
    const interval = setInterval(() => {
      let rand = Math.floor(Math.random() * myArray.length);
      const rValue = myArray[rand];
      setBanner(rValue);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="block m-auto mt-40 w-4/5 mb-9 rounded-xl bg-purple-600 ">
      <div className="flow-root">
        <span className="flex float-left w-8 h-auto rounded-md text-cyan-50 m-1 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Volume High</title>
            <path
              d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </span>
        <p className="text-center m-1 mt-1 tracking-widest font-semibold text-xl text-slate-100">
          {banner}
        </p>
      </div>
    </div>
  );
};
export default Banner;
