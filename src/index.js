import ReactDOM from "react-dom/client";
import NavBar from "./components/NavBar";
import {ItemListContainer} from './components/ItemListContainer';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <NavBar />
    <ItemListContainer greeting={'Toda la informacion relevante va aqui'}></ItemListContainer>
  </>
);
