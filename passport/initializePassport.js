import initializeLogin from "./strategies/initializeLogin.js";
import initializeSignUp from "./strategies/initializeSignUp.js";

const initializePassport = () => {
  initializeSignUp();
  initializeLogin();
};

export default initializePassport;
