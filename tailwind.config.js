/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: "24px", // 기본 폰트 크기를 24px로 설정
      },
    },
    fontFamily: {
      handwriting: ["NanumPenScript", "cursive"], // NanumPenScript를 기본 폰트로 설정
    },
  },
  plugins: [],
}

