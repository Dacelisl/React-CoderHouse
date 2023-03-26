import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

/* const firebaseConfig = {
  apiKey: process.env. REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
}; */
const firebaseConfig = {
  apiKey: "AIzaSyDQignB8MkM0ZW2X2kNWQjoGep9wWLk9A8",
  authDomain: "react-coder-75159.firebaseapp.com",
  projectId: "react-coder-75159",
  storageBucket: "react-coder-75159.appspot.com",
  messagingSenderId: "669255391753",
  appId: "1:669255391753:web:afdc6ac6640766ca5036d8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const registerWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log('res', res);
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
