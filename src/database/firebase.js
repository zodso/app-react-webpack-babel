import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const cartUrl = firebase.database().ref("cart");
