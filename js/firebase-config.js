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

// Default web app URL (fallback if Firestore is not available)
const DEFAULT_WEB_APP_URL = "https://terangajob-app.netlify.app/";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const docRef = doc(db, "app_config", "settings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // 1. Update APK download links
            if (data.appDownloadUrl) {
                const downloadBtns = document.querySelectorAll('.apk-download-btn');
                downloadBtns.forEach(btn => {
                    btn.href = data.appDownloadUrl;
                    btn.setAttribute('download', 'TerangaJob.apk');
                });
                console.log("APK download URL updated from Firebase.");
            }

            // 2. Update Web App links
            const webAppUrl = data.webAppUrl || DEFAULT_WEB_APP_URL;
            const webAppBtns = document.querySelectorAll('#web-app-btn, #web-app-hero-btn, #web-app-cta-btn');
            webAppBtns.forEach(btn => {
                btn.href = webAppUrl;
            });
            if (data.webAppUrl) {
                console.log("Web app URL updated from Firebase:", data.webAppUrl);
            }
        }
    } catch (error) {
        console.error("Error fetching config from Firebase:", error);
        // Fallback links are already set in the HTML, no action needed
    }
});
