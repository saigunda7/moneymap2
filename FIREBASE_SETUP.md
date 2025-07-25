# Firebase Setup Guide for MoneyMap

This guide will walk you through setting up Firebase authentication for your MoneyMap application.

## Prerequisites

1. Node.js and npm installed on your system
2. A Firebase account (https://console.firebase.google.com/)
3. A Firebase project created

## Setup Steps

### 1. Create a new Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project" and follow the setup wizard
3. Give your project a name (e.g., "MoneyMap") and click "Continue"
4. Enable Google Analytics if desired (optional)
5. Click "Create project"

### 2. Set up Authentication

1. In the Firebase Console, go to the "Authentication" section
2. Click on "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" and "Google" sign-in methods
5. For Google sign-in, click on the edit icon and enable it, then save

### 3. Get your Firebase configuration

1. In the Firebase Console, click on the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click on the "</>" icon to add a web app
5. Register your app with a nickname (e.g., "MoneyMap Web")
6. Copy the Firebase configuration object (it should look like this):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};
```

### 4. Set up environment variables

1. Create a new file called `.env` in the root of your project
2. Add the following environment variables with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abc123def456
```

### 5. Start the development server

```bash
npm start
```

Your application should now be running with Firebase authentication enabled!

## Testing the Authentication

1. Try creating a new account with email and password
2. Test the Google sign-in button
3. Test the "Forgot password" functionality
4. Verify that you can log out

## Troubleshooting

- If you get authentication errors, double-check your Firebase configuration
- Make sure you've enabled the correct sign-in methods in the Firebase Console
- Check the browser console for any error messages
- Ensure your domain is authorized in the Firebase Console under Authentication > Settings > Authorized domains

## Security Notes

- Never commit your actual Firebase credentials to version control
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Make sure to set up proper security rules in Firebase for production use


