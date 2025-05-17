import "dotenv/config";

export default {
  expo: {
    name: "Daily Check-up",
    slug: "daily-check-up",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo/logo.png",
    scheme: "dailycheckup",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.niloyrudra.dailycheckup",
      permissions: ["INTERNET", "RECEIVE_SMS", "READ_SMS", "SEND_SMS"],
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo/logo.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo/logo.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      debugMode: process.env.DEBUG_MODE === "true",
      testEnv: process.env.TEST_ENV ?? "fallback-test",
      // Firebase
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
      // Email
      userEmail: process.env.EXPO_PUBLIC_EMAIL_USER,
      userPass: process.env.EXPO_PUBLIC_EMAIL_PASS,
      router: {
        // origin: false,
      },
      eas: {
        projectId: "a724e88d-7906-4e13-8365-b6f0ac7946f4"
      }
    },
    owner: "niloyrudra"
  }
}
