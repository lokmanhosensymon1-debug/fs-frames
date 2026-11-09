// Firebase-backed admin gate for FS Frames.
// Replace the placeholder config below with the Firebase Web App config.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore, doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_FIREBASE_WEB_API_KEY",
  authDomain: "REPLACE_WITH_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_PROJECT_ID",
  appId: "REPLACE_WITH_FIREBASE_APP_ID"
};

const form = document.getElementById("admin-login-form");
const email = document.getElementById("admin-email");
const password = document.getElementById("pw");
const login = document.getElementById("login");
const appPanel = document.getElementById("app");
const logout = document.getElementById("out");
const message = document.getElementById("lm");
const submit = document.getElementById("lg");

function showMessage(text) { if (message) message.textContent = text; }
function setBusy(busy) {
  if (submit) { submit.disabled = busy; submit.textContent = busy ? "যাচাই হচ্ছে…" : "প্রবেশ করুন"; }
}
function showLogin() {
  if (login) login.hidden = false;
  if (appPanel) appPanel.hidden = true;
  if (logout) logout.hidden = true;
}

const configured = !Object.values(firebaseConfig).some(v => String(v).startsWith("REPLACE_WITH"));
if (!configured) {
  showLogin();
  showMessage("Firebase সেটআপ বাকি: js/admin-auth.js ফাইলে Firebase Web App config বসান।");
} else {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    } catch (error) {
      const messages = {
        "auth/invalid-credential": "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
        "auth/user-not-found": "এই ইমেইলে কোনো অ্যাকাউন্ট নেই।",
        "auth/wrong-password": "পাসওয়ার্ড সঠিক নয়।",
        "auth/too-many-requests": "অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
        "auth/invalid-email": "সঠিক ইমেইল দিন।"
      };
      showMessage(messages[error.code] || "লগইন করা যায়নি। Firebase সেটিংস যাচাই করুন।");
    } finally {
      setBusy(false);
    }
  });

  logout?.addEventListener("click", async () => {
    await signOut(auth);
  });

  onAuthStateChanged(auth, async (user) => {
    showLogin();
    if (!user) {
      showMessage("");
      return;
    }
    try {
      // An administrator must be explicitly provisioned in Firestore by the project owner.
      const adminSnapshot = await getDoc(doc(db, "admins", user.uid));
      if (!adminSnapshot.exists() || adminSnapshot.data()?.active !== true) {
        await signOut(auth);
        showMessage("এই অ্যাকাউন্টের Admin অনুমতি নেই।");
        return;
      }
      showMessage("");
      if (login) login.hidden = true;
      if (appPanel) appPanel.hidden = false;
      if (logout) logout.hidden = false;
      window.dispatchEvent(new Event("fs-admin-authenticated"));
    } catch (error) {
      await signOut(auth);
      showMessage("Admin অনুমতি যাচাই করা যায়নি। Firestore চালু ও Security Rules পরীক্ষা করুন।");
    }
  });
}
