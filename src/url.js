const BASE_URL = "/api";

export const VERSION = BASE_URL + "/version";
export const HELP = BASE_URL + "/help";

export const LOGIN = BASE_URL + "/login";
export const LOGOUT = BASE_URL + "/logout";
export const SIGN_UP = BASE_URL + "/sign-up";

export const TODO = BASE_URL + "/todo";
export const TODO_CHECK = TODO + "/check";

export const CLEAN_UP = BASE_URL + "/clean-up";

export const USER = BASE_URL + "/user";
export const MORE_HISTORY = (cursor) => USER + `/more?cursor=${cursor}`;
export const SESSION_DELETE = (id) => BASE_URL + `/session/${id}`;

export const VERIFY = BASE_URL + "/verify";
export const VERIFY_SESSION = VERIFY + "/session";

export const QUIT = BASE_URL + "/quit";

export const PIN = BASE_URL + "/pin";
export const PIN_LOGIN = PIN + "/login";

export const RETRY = BASE_URL + "/retry";

export const RESET = BASE_URL + "/reset";
export const RESET_STEP_1 = RESET + "/step1";
export const RESET_STEP_2 = RESET + "/step2";

export const ADMIN = BASE_URL + "/admin";
