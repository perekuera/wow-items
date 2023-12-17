/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: colors.blueGrey.lighten2,
          secondary: colors.blueGrey.lighten4,
        },
      },
      dark: {
        colors: {
          primary: colors.blueGrey.darken2,
          secondary: colors.blueGrey.darken4,
        },
      },
    },
  },
});
