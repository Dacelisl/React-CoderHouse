import { NavLink } from "react-router-dom";

const CategoryList = ({ categories, ...others }) => {
  return (
    <ul className="items-center text-center mr-5  contents gap-1 ">
      {categories.map((cat) => (
        <li key={cat.id}>
          <NavLink
            to={cat.route}
            className="text-base align-middle font-semibold text-slate-200 w-fit uppercase py-1 px-0 mt-5 ml-1 transition-opacity border-b  rounded-lg active:text-red-700 hover:text-red-50 sm:pl-2 sm:mt-4 sm:ml-1 lg:border-b-0 lg:my-4 lg:mx-2 xl:px-3"
            {...others}
          >
            {cat.categoryId}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default CategoryList;
