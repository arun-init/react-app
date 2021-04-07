const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}v1/auth/login/`,
    SIGNUP: `${ROOT_URL}v1/auth/signup/`,
    USER_CHANGE_PASSWORD: `${ROOT_URL}v1/me/change-password/`,
    EMAIL_RESET_PASSWORD: `${ROOT_URL}v1/auth/email/reset-password/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}v1/auth/reset-password/`,
    USER_ACTIVATION: `${ROOT_URL}v1/auth/verify-email/`,
    USER_PROFILE: `${ROOT_URL}v1/me/profile/`
};