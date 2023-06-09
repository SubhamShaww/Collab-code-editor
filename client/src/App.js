import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { io } from "socket.io-client";
import JoinRoom from './routes/joinRoom/JoinRoom';
import Room from "./routes/room/Room";

const socket = io.connect("http://localhost:5000")

const router = createBrowserRouter([
    {
        path: "/",
        element: <JoinRoom socket={socket} />,
    },
    {
        path: "/room/:roomId",
        element: <Room socket={socket} />
    }
]);

function App() {
    return <RouterProvider router={router} />
}

export default App