export const FormMessages = {
  name: {
    success: "Valid username!",
    help: "Please enter a username. (ej: max167)",
    error: {
      required: "The name field is required. Please enter your username",
      minimum: "The user name must be at least 4 characters long.",
      maximum: "The user name cannot exceed 25 characters.",
    },
  },

  email: {
    success: "You're good to go! The email you entered is valid.",
    help: "Please enter a valid email address. (ej: usuario@dominio.com).",
    error: {
      required: "The email field is required. Please enter your email address",
      format: "The email address you entered is not valid.",
    },
  },

  password: {
    success: "Valid password! Meets all security requirements.",
    help: "Please enter a valid password. (e.g. !, @, #, $).",
    error: {
      required: "The password is invalid. Make sure it is at least 8 characters long",
      minimum: "The password field is required. Please enter a password",
    },
  },
};