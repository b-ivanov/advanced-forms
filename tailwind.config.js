module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'sans': "'Montserrat', sans-serif",
      'serif': '"Montserrat", sans-serif',
      'mono': '"Montserrat", sans-serif'
    },
    extend: {
      colors: {
        inputGray: '#B2B2B2',
        underlineWhite: '#F2F1F1',
        defaultBlack: '#303045',
        accentBlue: '#0057EC',
        accentYellow: '#FCD669',
        errorRed: '#FF0A23',
        placeholderGrey: '#707070',
        overlay: 'rgba(48, 48, 69, 0.34)'
      },
      gridTemplateColumns: {
        'sidebar': 'minmax(21rem, 1fr) 3fr',
        'outSysHeader': '1fr 2fr',
        'inSysHeader': '8rem auto'
      }
    }
  },
  variants: {},
  plugins: [],
}
