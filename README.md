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

Create a .env file and copy the following content into it: 

```
VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_APP_ID"

```
## 
© 2025 All Rights Reserved
