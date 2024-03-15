import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bytevictor.simpletask',
  appName: 'simpletask',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
