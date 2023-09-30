import {
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./components/loginPage";
import Notes from "./routes/home";
import SignupPage from "./components/signupPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },

    {
        path: "/signup",
        element: <SignupPage />,
    },

    {
        path: "/notes",
        element: <Notes />,
    }
]);