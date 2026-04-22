import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.julian.tarealiga',
  appName: 'TareaLiga',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      backgroundColor: "#0d0d14",
      showSpinner: false,
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;