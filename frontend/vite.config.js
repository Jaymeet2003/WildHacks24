import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Use polling instead of native file system events
      usePolling: true,
      // Check for changes every 500 ms
      interval: 500
    }
  }
});