import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';


const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.5)",
      fontWeight: "600",
      outline: "none",
      border: "none",
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
    light: {
      field: {
        bg: "#F4F7F5 !important",
        color: "#1e1e1e",
      }
    },
    dark: {
      field: {
        bg: "#1e1e1e !important",
        color: "#F4F7F5 !important",
      }
    }
  },
  defaultProps: {
    focusBorderColor: 'transparent',
  },
}

const Button: ComponentStyleConfig = {
  variants: {
    outline: {
      backgroundColor: 'transparent !important',
      borderColor: '#868686 !important',
      color: '#868686 !important',
      _hover: {
        backgroundColor: '#86868640 !important'
      }
    },
    submit: {
      backgroundColor: '#68d68a !important',
      border: 'none !important',
      color: "#F4F7F5 !important",
      _hover: {
        backgroundColor: '#29AA51 !important',
      }
    },
    blocked: {
      backgroundColor: '#868686 !important',
      border: 'none !important',
      color: "#F4F7F5 !important",
      cursor: 'default'
    }
  }
}


const theme = extendTheme({
  components: {
    Input,
    Button,
  },
});



export default theme;
