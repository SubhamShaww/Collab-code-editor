import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import JoinRoom from './routes/joinRoom/JoinRoom';
import Room from "./routes/room/Room";

const router = createBrowserRouter([
    {
        path: "/",
        element: <JoinRoom />,
    },
    {
        path: "/room/:roomId",
        element: <Room />
    }
]);

function App() {
    return <RouterProvider router={router} />
}

export default App
