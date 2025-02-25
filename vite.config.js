import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as process from 'process';

// 환경 변수 로드
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist', // 기본 빌드 경로
      emptyOutDir: true, // 빌드 전에 기존 파일 삭제
    },
    define: {
      'process.env': env,
      'import.meta.env': JSON.stringify(env),
    },
  };
});