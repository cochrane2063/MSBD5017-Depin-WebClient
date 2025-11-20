import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("wallets", "routes/wallets.tsx"),
    route("about", "routes/about.tsx")
] satisfies RouteConfig;
