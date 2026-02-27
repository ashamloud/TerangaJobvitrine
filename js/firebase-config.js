import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMYmAHIAizjkg9Wb8jVjRwS5yuLhaAHAo",
    authDomain: "terangajob-f3024.firebaseapp.com",
    projectId: "terangajob-f3024",
    storageBucket: "terangajob-f3024.firebasestorage.app",
    messagingSenderId: "645022095119",
    appId: "1:645022095119:web:5198cb3b03b020eb84907a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const docRef = doc(db, "app_config", "settings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.appDownloadUrl) {
                // Update all download links with the 'apk-download-btn' class
                const downloadBtns = document.querySelectorAll('.apk-download-btn');
                downloadBtns.forEach(btn => {
                    btn.href = data.appDownloadUrl;
                });
                console.log("App download URL updated from Firebase.");
            }
        }
    } catch (error) {
        console.error("Error fetching app download URL:", error);
    }
});
