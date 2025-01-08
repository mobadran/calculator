/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            screenBg: 'hsl(222, 26%, 31%)',
            inputBg: 'hsl(223, 31%, 20%)',
            outputBg: 'hsl(224, 36%, 15%)',
            specialKeyBg: 'hsl(225, 21%, 49%)',
            specialKeyShadow: 'hsl(224, 28%, 35%)',
            equalKeyBg: 'hsl(6, 63%, 50%)',
            equalKeyShadow: 'hsl(6, 70%, 34%)',
            keyBg: 'hsl(30, 25%, 89%)',
            keyShadow: 'hsl(28, 16%, 65%)',
            textColor: 'hsl(221, 14%, 31%)',
            white: 'hsl(0, 0%, 100%)',
          }
        }
      },
      themes: [
        {
          name: 'theme2',
          extend: {
            colors: {
              screenBg: 'hsl(0, 0%, 90%)',
              inputBg: 'hsl(0, 5%, 81%)',
              outputBg: 'hsl(0, 0%, 93%)',
              specialKeyBg: 'hsl(185, 42%, 37%)',
              specialKeyShadow: 'hsl(185, 58%, 25%)',
              equalKeyBg: 'hsl(25, 98%, 40%)',
              equalKeyShadow: 'hsl(25, 99%, 27%)',
              keyBg: 'hsl(45, 7%, 89%)',
              keyShadow: 'hsl(35, 11%, 61%)',
              textColor: 'hsl(60, 10%, 19%)',
              white: 'hsl(0, 0%, 100%)',
            }
          }
        },
        {
          name: 'theme3',
          extend: {
            colors: {
              screenBg: 'hsl(268, 75%, 9%)',
              inputBg: 'hsl(268, 71%, 12%)',
              outputBg: 'hsl(268, 71%, 12%)',
              specialKeyBg: 'hsl(281, 89%, 26%)',
              specialKeyShadow: 'hsl(285, 91%, 52%)',
              equalKeyBg: 'hsl(176, 100%, 44%)',
              equalKeyShadow: 'hsl(177, 92%, 70%)',
              keyBg: 'hsl(268, 47%, 21%)',
              keyShadow: 'hsl(290, 70%, 36%)',
              textColor: 'hsl(52, 100%, 62%)',
              white: 'hsl(0, 0%, 100%)',
            }
          }
        },
      ]
    })
  ],
}
