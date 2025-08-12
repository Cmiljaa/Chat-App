# 1-on-1 Chat App

A real-time one-on-one chat application built with **Vue 3**, **TypeScript**, and **Vite**, powered by **Firebase** for authentication and database.  
Features smooth real-time messaging, typing indicators, and a modern, responsive UI/UX.

## Features

### Authentication
- Email/password sign-up & sign-in with validation (using **Vuelidate**)
- Google login/sign-up via Firebase Authentication
- Sign-out functionality

### User Search
- Search users by nickname
- Sidebar displaying chats with:
  - Other user’s nickname
  - Last message preview
  - Relative time since last message (e.g., `4d`, `1m`, `1y`)

### Chat
- Real-time one-on-one messaging powered by **Firebase Firestore**
- Typing indicators to see when the other user is typing
- Auto-scroll to latest message (powered by **v-chat-scroll**)
- Toast notifications using **vue-toast-notification**

### Message Actions
- View message creation date via the message options menu
- Copy message text to clipboard
- Delete own messages

## Tech Stack

- **Framework:** Vue 3 with `<script setup>` and TypeScript  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS  
- **State Management:** Pinia  
- **Authentication & Database:** Firebase Authentication & Firestore  
- **Form Validation:** Vuelidate  
- **Scrolling:** v-chat-scroll (auto-scroll)  
- **Notifications:** vue-toast-notification  

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
## Firebase Setup

Create a file `src/firebase/FirebaseInit.ts` and copy the following content into it:

```
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export { app };

```
## 
© 2025 All Rights Reserved
