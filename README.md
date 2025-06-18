# 🏡 Brindaban Garden Helper App

A web-based helper dashboard designed for **Brindaban Garden Society** to manage apartment blocks, notice boards, and suggestions efficiently.

## 🚀 Features

- 🧾 **Admin Login** via Firebase Authentication
- 🏢 **Apartment Block Overview** with status: Occupied / Vacant / Raise Issue
- 📢 **Digital Notice Board** for society-wide announcements
- 💡 **Suggestions Box** for residents to provide feedback
- ✨ Clean, responsive **UI with dark mode** support
- 📷 Welcome login page with apartment imagery

## 🔧 Tech Stack

- **Frontend:** React.js, CSS
- **Auth & Backend:** Firebase Authentication & Firestore
- **Hosting:** Firebase Hosting / GitHub Pages
- **Deployment:** GitHub Actions or Firebase CLI
- **Extras:** React Toastify for alerts, Gradient text for UI enhancements

## 📁 Folder Structure

brindaban-helper/
├── public/
│ └── apartment.jpg
├── src/
│ ├── components/
│ │ ├── BlocksList.jsx
│ │ ├── SuggestionsBox.jsx
│ │ ├── NoticeBoard.jsx
│ │ └── Login.jsx
│ ├── firebase.js
│ ├── App.js
│ └── index.js
