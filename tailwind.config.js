/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      sidebar:"601px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      sidebarNone: { min: "1px", max: "1182px" },
      sidebarshow: "1183px",
      createmodal: { min: "1px", max: "500px" },
      createmodalWidth: { min: "1px", max: "420px" },
      collection1: { min: "1px", max: "700px" },
      collection2: { min: "1px", max: "600px" },
      userWidth: { min: "1px", max: "750px" },
      createFlexNone: { min: "1px", max: "770px" },
       createExpand: { min: "1px", max: "885px" },
    },
    spacing: {
    hsb: "-40px",
      minus:"-20px",
        0: "0",
      1: "8px",
      2: "12px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
      7: "52px",
      8: "56px",
      9: "59px",
      10: "60px",
      11: "76px",
      12: "90px",
      13: "120px",
      14:"180px",
      // percentage
      input: "410px",
      hidesidebar:"-500px",
       sidebar:'600px',
      "1p": "10%",
      "2p": "20%",
      "3p": "30%",
      "4p": "40%",
      "5p": "50%",
      "6p": "60%",
      "7p": "70%",
      "8p": "80%",
      "9p": "90%",
      "9.5p":"95%",
      "10p": "100%",
    },
    colors: {
      textc: "#fafafa",
      white: "#ffffff",
      lightdark:"#00000060",
      appcolor: {
        100: " #2c3cec",
        200: "#2c3cec90",
          300:"#2c3cec4c",
        400: "#d1d3f2",
          500:"#141B6A",
      },
      dashback: {
        100: "#f9f9fb",
        200: "#f5f7f8",
      },
      inputline: {
        100: "#8f8f8f",
        200: "#c2c2c2",
        300:"#595959"
      },

      warning: "#ff0000e5",
      checked: {
        50:"#fac4c4",
        100: "#ee4343",
        150: "#f13434",
        200:"#29f54b",
        250: "#43ee60",
        300:"#c4facc",
        350: "#ff000098",
         400: "#0080009b"
      },
  
    },
    // ...
    borderRadius: {
      sm: "5px",
      xlg:"40px"
 
    },
    extend: {},
  },
  plugins: [],
}
