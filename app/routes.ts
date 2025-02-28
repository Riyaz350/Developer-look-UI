import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    index("routes/registration.tsx"),
    route("signin", "routes/SignIn.tsx"),
    route("todo", "routes/ToDo.tsx")
] satisfies RouteConfig;
