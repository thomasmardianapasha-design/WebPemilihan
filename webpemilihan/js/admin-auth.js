import { auth, db, firebaseConfigured } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const form = document.querySelector("#admin-login-form");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.querySelector("#admin-login-message");
    if (!firebaseConfigured) {
      message.textContent = "Isi konfigurasi Firebase terlebih dahulu.";
      return;
    }

    try {
      const email = document.querySelector("#admin-email").value;
      const password = document.querySelector("#admin-password").value;
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const adminDocument = await getDoc(doc(db, "admins", credential.user.uid));

      if (!adminDocument.exists() || adminDocument.data().active !== true) {
        await signOut(auth);
        throw new Error("Akun ini tidak memiliki akses admin aktif.");
      }

      location.href = "admin.html";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}
