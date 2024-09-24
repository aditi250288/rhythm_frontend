module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "poppins" : ["Playpen Sans", "system-ui"]
      },
      height:{
        "1/10": "10%",
        "9/10": "90%"
      },
      backgroundColor:{
        "app-black":"#121212",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
