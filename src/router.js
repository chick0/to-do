import { wrap } from "svelte-spa-router/wrap";

import About from "./routes/About.svelte";
import Login from "./routes/Login.svelte";
import Logout from "./routes/Logout.svelte";

export const routes = {
    "/": About,
    "/login": Login,
    "/logout": Logout,

    "/sign-up": wrap({
        asyncComponent: () => import("./routes/SignUp.svelte"),
    }),

    "/todo": wrap({
        asyncComponent: () => import("./routes/Todo.svelte"),
    }),

    "*": wrap({
        asyncComponent: () => import("./NotFound.svelte"),
    }),
};
