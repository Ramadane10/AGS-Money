import colors from "./Colors";
import Fonts from "./fonts";
export default {
  colors,     // Couleurs globales
  Fonts,      // Familles de polices
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  textVariants: {
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.dark,
    },
    body: {
      fontSize: 16,
      color: colors.grey,
    },
    label: {
      fontSize: 14,
      color: colors.primary,
    },
  }
};
