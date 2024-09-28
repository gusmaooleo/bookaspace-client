import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';


const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "#8C8C8C",
      boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.5)",
      fontWeight: "600",
      _focus: {
        border: "none",
        outline: "none",
      },
      _placeholder: {
        fontStyle: "italic",
      },
    }
  },
  sizes: {},
  variants: {
    outline: {
      outline: "none",
      border: "none",
    },
    solid: {
      bg: "#F4F7F5 !important",
    }
  },
  defaultProps: {
    focusBorderColor: 'transparent',
    variant: 'common'
  },
}


const theme = extendTheme({
  components: {
    Input,
  },
});



export default theme;
