import React from "react";

export const Categories = ({categories}) => {
  return (
    <ul className="navbar-list">
      {categories.map((cat) => (
        <li key={cat.id}>
          <a href="#" className="navbar-link">
            {cat.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
