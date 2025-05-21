import type { Elements } from "@clerk/types";

export const authStyles: Elements = {
  cardBox:{
backgroundColor:"bg-light-primary dark:bg-dark-primaryBg"
  },
  headerTitle: {
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: "bold",
  },
  formButtonPrimary: {
    fontSize: 14,
    color:"#000",
    "&:hover":{
      color:"#fff"
    },
    textTransform: "none",
    backgroundColor: "#D1D1D1",
    "&:hover, &:focus, &:active": {
      backgroundColor: "#191932",
    },
  },
 formFieldInput: {
        backgroundColor: '#ffffff',
        '&:-webkit-autofill': {
          backgroundColor: '#f8fafc !important',
        },
        '&:-webkit-autofill:hover': {
          backgroundColor: '#f8fafc !important',
        },
        '&:-webkit-autofill:focus': {
          backgroundColor: '#f8fafc !important',
        }
      },
  socialButtonBlockButtonText: {
    backgroundColor:"#353570"
  },
};
