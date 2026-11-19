
import { auth, db, firebaseConfigured } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const setValue = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
};

const logoutButton = document.querySelector("#logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    location.href = "admin-login.html";
  });
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "admin-login.html";
    return;
  }

  if (!firebaseConfigured) {
    return;
  }

  // Verifikasi role admin harus selalu ditegakkan lagi di Firestore Rules/Cloud Functions.
  const [voters, candidates, votes] = await Promise.all(
    ["voters", "candidates", "ballots"].map((collectionName) =>
      getDocs(collection(db, collectionName)).catch(() => ({ size: 0, docs: [] }))
    )
  );

  setValue("total-voters", voters.size);
  setValue("total-candidates", candidates.size);
  setValue("total-votes", votes.size);
  setValue("not-voted", Math.max(0, voters.size - votes.size));
});

