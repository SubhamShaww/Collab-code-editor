import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import './JoinRoom.css'

export default function JoinRoom() {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState(() => "")
    const [username, setUsername] = useState(() => "")

    function handleRoomSubmit(e) {
        e.preventDefault()
        navigate(`/room/${roomId}`)
    }

    function createRoomId(e) {
        try {
            setRoomId(uuidv4())
            toast.success("Room created")
        } catch(exp) {
            console.error(exp)
        }

    }

    return (
        <div className="joinBoxWrapper">
            <form className="joinBox" onSubmit={handleRoomSubmit}>
                <p>Paste your invitation code down below</p>

                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        type="text"
                        placeholder="Enter room ID"
                        required
                        onChange={(e) => { setRoomId(e.target.value) }}
                        value={roomId}
                    />
                    <div className="joinBoxWarning">{roomId ? '': "Room ID required"}</div>
                </div>

                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        type="text"
                        placeholder="Enter Guest Username"
                        required
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                    />
                    <div className="joinBoxWarning">{username ? '': "username required"}</div>
                </div>

                <button className="joinBoxBtn" type="submit">Join</button>
                <p>Don't have an invite code? Create your <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={createRoomId}
                >own room</span></p>
            </form>
            <Toaster />
        </div>
    )
}