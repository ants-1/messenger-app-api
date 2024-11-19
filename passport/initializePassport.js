import { initializeLogin } from "./strategies/initializeLogin";
import { initializeSignUp } from "./strategies/initializeSignUp";

export const initializePassport = () => {
    initializeSignUp();
    initializeLogin();
}