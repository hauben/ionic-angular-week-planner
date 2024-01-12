import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.weekplanner',
  appName: 'Week Planner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
