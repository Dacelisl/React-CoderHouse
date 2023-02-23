import { NavLink } from "react-router-dom";

export const CategoryList = ({categories, ...others}) => {
  return (
    <ul className="navbar-list">
      {categories.map((cat) => (
        <li key={cat.id}>
          <NavLink to={cat.route} className="navbar-link hover:bg-zinc-400 hover:text-red-50" {...others}>
            {cat.categoryId}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
