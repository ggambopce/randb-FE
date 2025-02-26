import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 필요시 추가

// 환경 변수 로드
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.url);

  console.log(`현재 모드: ${mode}`);
  console.log(`API 서버: ${env.VITE_API_BASE_URL}`);

  return {
    plugins: [react()],
    base: 'https://jinorandb.com/',
    build: {
      outDir: 'dist', // 기본 빌드 경로
      emptyOutDir: true, // 빌드 전에 기존 파일 삭제
    },
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    },
  };
});