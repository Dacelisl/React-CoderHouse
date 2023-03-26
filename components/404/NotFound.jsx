import "./404.css";
import { NavLink } from "react-router-dom";

export const NotFound = ({message}) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>{message}</h2>
        </div>
        <NavLink to={'/'}>Home Page</NavLink>
      </div>
    </div>
  );
};
