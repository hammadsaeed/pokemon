# Pokemon App

This React Native application retrieves a list of Pokemon from a given API and displays their details upon selection. The app uses Redux Toolkit, RTK Query, and React Navigation for state management, data fetching, and navigation respectively. Unit tests are written using Jest and React Testing Library.

## Features

- Fetch and display a list of Pokemon.
- Show detailed information about a selected Pokemon.
- Persistently store the Pokemon list.
- Navigation between Home and Detail screens.
- Unit tests with over 60% coverage.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/).
- You have installed [npm](https://www.npmjs.com/get-npm).
- You have installed [React Native CLI](https://reactnative.dev/docs/environment-setup).
- You have installed [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/).

## Installation

1. Clone the repository:
2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following line:

   ```sh
   API_URL=https://pokeapi.co/api/v2/pokemon/
   ```

4. Set up Android development environment:

Add `local.properties` file in the `android` directory to include the path to your Android SDK:

```sh
sdk.dir=C://Users//USERNAME//AppData//Local//Android//Sdk
```

Replace `USERNAME` with your actual Windows username. For macOS/Linux, the path might be different.

## Running the App

### Android

1. Start the Android emulator or connect an Android device.
2. Run the following command:

   ```sh
   npm run android
   ```

## Running Tests

To run the unit tests, execute:

```sh
npm run test
```

# Unit Testing

### Home Screen Tests

- Renders loading state correctly
- Renders error state correctly
- Renders list of Pokemon correctly
- Navigates to detail screen when Pokemon is pressed

### Detail Screen Tests

- Renders loading state correctly
- Renders error state correctly
- Sets navigation title to Pokemon's name with the first letter capitalized
- Handles empty data gracefully
