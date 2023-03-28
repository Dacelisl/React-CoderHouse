import { auth, db } from "./firebaseBD";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const registerWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (error) {
    console.log("error", error);
  }
};

export const logOutGoogle = async () => {
  const res = await signOut(auth);
  return res;
};

export const exist = async (field, prop) => {
  const users = [];
  const q = query(collection(db, "users"), where(field, "==", prop));
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export const productById = async (id) => {
  const product = [];
  const q = query(collection(db, "products"), where("id", "==", id));
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    product.push(doc.data());
  });
  return product;
};

export const addUser = async (user) => {
  try {
    const existUser = await exist("userName", user.userName);
    if (existUser.length === 0) {
      const docRef = doc(collection(db, "users"));
      await setDoc(docRef, { ...user, id: docRef.id });
      return "Successfully registered";
    }
    return "User already in use";
  } catch (error) {
    return "failed to register";
  }
};

const getCategoriesFire = async () => {
  const res = [];
  const cat = await getDocs(collection(db, "products"));
  cat.forEach((data) => {
    res.push(data.data().category);
  });
  const listCategories = res.filter((valor, indice) => {
    return res.indexOf(valor) === indice;
  });
  return listCategories;
};

export const addCategoriesDB = async () => {
  const solve = await getCategoriesFire();
  solve.map(async (categoryId) => {
    const docRef = doc(collection(db, "categories"));
    await setDoc(docRef, {
      categoryId,
      id: docRef.id,
      route: `categories/${categoryId}`,
    });
  });
};

export const getCategories = async () => {
  const product = [];
  const category = [];
  const querySnap = await getDocs(query(collection(db, "categories")));
  querySnap.forEach((doc) => {
    product.push(doc.data());
  });
  let indexCat = [];
  let list = [];
  do {
    indexCat.push(Math.floor(Math.random() * (product.length - 1 - 0 + 1) + 0));
    list = indexCat.filter((valor, indice) => {
      return indexCat.indexOf(valor) === indice;
    });
  } while (list.length < 6);
  list.forEach((element) => {
    category.push(product[element]);
  });
  return category;
};

export const getProducts = (categoryId) => {
  const productCollection =
    categoryId === undefined
      ? collection(db, "products")
      : query(collection(db, "products"), where("category", "==", categoryId));
  const solve = getDocs(productCollection)
    .then((data) => {
      const list = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      return list;
    })
    .catch((e) => {
      return e;
    });
  return solve;
};
export const addOrder = async (order) => {
  try {
    const docRef = doc(collection(db, "orders"));
    await setDoc(docRef, { ...order, id: docRef.id });
    return { message: "Successfully", idOrder: docRef.id };
  } catch (error) {
    return { message: "failed " };
  }
};

export const getOrder = async (id) => {
  const product = [];
  const q = query(collection(db, "orders"), where("id", "==", id));
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    product.push(doc.data());
  });
  return product;
};
