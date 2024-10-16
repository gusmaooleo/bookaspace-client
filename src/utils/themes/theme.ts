import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';


const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.5)",
      fontWeight: "600",
      height: '4.2vmin !important',
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
    ns_light: {
      field: {
        boxShadow: 'none !important',
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
    edit: {
      backgroundColor: 'transparent !important',
      border: '1px solid #68d68a !important',
      _hover: {
        backgroundColor: '#e2f5e8 !important',
      }
    },
    blocked: {
      backgroundColor: '#868686 !important',
      border: 'none !important',
      color: "#F4F7F5 !important",
      cursor: 'default'
    },
    dark: {
      backgroundColor: '#1e1e1e !important',
      border: 'none !important',
      color: "#F4F7F5 !important",
      _hover: {
        backgroundColor: '#3B3939 !important'
      }
    },
    white: {
      backgroundColor: '#fff !important',
      border: 'none !important',
      cursor: 'default',
      _hover: {
        backgroundColor: '#D1D1D1 !important',
      }
    },
    reprove: {
      backgroundColor: '#F97E7A !important',
      border: 'none !important',
      cursor: 'default',
      color: "#F4F7F5 !important",
      _hover: {
        backgroundColor: '#d3443f !important',
      }
    }
  }
}

const Badge: ComponentStyleConfig = {
  variants: {
    "APPROVED": {
      backgroundColor: '#68D68A',
    },
    "REJECTED": {
      backgroundColor: '#F97E7A',
    },
    "PENDING": {
      backgroundColor: '#FFE55F',
    },
    "OUT_DEADLINE": {
      backgroundColor: '#868686',
    },
    "AVAILABLE": {
      backgroundColor: '#68D68A',
    },
    "UNAVAILABLE": {
      backgroundColor: '#F97E7A',
    }
  }
}


const theme = extendTheme({
  components: {
    Input,
    Button,
    Badge,
  },
});



export default theme;
