# Artist Booking Platform – Mobile App

Cross-platform mobile application for the Artist Booking Platform.  
Built with React Native and Expo, supporting iOS, Android, and Web from a single codebase.

Designed with modular routing, type safety, and scalable component architecture.

---

## Built With

### Core
- React
- React Native
- Expo
- TypeScript

### Navigation & Routing
- Expo Router
- React Navigation (Drawer + Native Navigation)

### Styling & UI
- NativeWind
- TailwindCSS
- Expo Vector Icons
- Burnt (Native Toasts)

### Animations & Gestures
- React Native Reanimated
- React Native Gesture Handler

### Platform Support
- React Native Web

---

## Installation

### 1. Install Expo Dependencies

```bash
npx expo install \
expo-constants \
expo-font \
expo-linking \
expo-router \
expo-splash-screen \
expo-status-bar \
expo-web-browser
```

### 2. Install Core Dependencies

```bash
npm install \
@expo/vector-icons \
@react-native-picker/picker \
@react-navigation/drawer \
@react-navigation/native \
burnt \
nativewind \
react \
react-dom \
react-native \
react-native-gesture-handler \
react-native-reanimated \
react-native-safe-area-context \
react-native-screens \
react-native-web \
react-native-worklets \
tailwindcss
```

### 3. Install Development Dependencies

```bash
npm install --save-dev \
@react-native-community/cli \
@react-native/metro-config \
@types/react \
react-test-renderer \
typescript
```

---

## Running the Application

Start the Expo development server:

```bash
npm start
```

From there you can:
- Run on iOS simulator
- Run on Android emulator
- Open in Expo Go
- Launch Web build

---

## Architecture Highlights

- File-based routing via Expo Router
- Type-safe components with TypeScript
- Utility-first styling using NativeWind + TailwindCSS
- Gesture-driven UI interactions
- Production-ready animation support
- Cross-platform rendering (Mobile + Web)

---

## Platform Support

- iOS
- Android
- Web

---

## Development Notes

- Ensure the Reanimated Babel plugin is properly configured.
- Clear Metro cache if dependency issues occur:
  ```bash
  npx expo start -c
  ```
- Use a stable Node.js LTS version for compatibility.

---

This mobile application integrates with the versioned backend API (`/api/v1`) and supports role-based experiences for clients, artists, and administrators.