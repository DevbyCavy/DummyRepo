import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TODO(open): set base if deployed under a sub-path (e.g. '/platinumInteriorDesign/' on XAMPP).
  base: '/',
});
