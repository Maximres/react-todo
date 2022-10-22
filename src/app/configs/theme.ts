import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    custom: {
      light: grey["50"],
    },
  },
});

export default theme;
