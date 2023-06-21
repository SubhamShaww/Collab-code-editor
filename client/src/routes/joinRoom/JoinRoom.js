import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4, validate } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import './JoinRoom.css'

export default function JoinRoom() {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState(() => "")
    const [username, setUsername] = useState(() => "")

    function handleRoomSubmit(e) {
        e.preventDefault()
        if (!validate(roomId)) {
            toast.error("Incorrect room ID")
            return
        }
        username && navigate(`/room/${roomId}`, { state: { username } })
    }

    function createRoomId(e) {
        try {
            setRoomId(uuidv4())
            toast.success("Room created")
        } catch (exp) {
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
                        id="roomIdInput"
                        type="text"
                        placeholder="Enter room ID"
                        required
                        onChange={(e) => { setRoomId(e.target.value) }}
                        value={roomId}
                        autoSave="off"
                        autoComplete="off"
                    />
                    <label htmlFor="roomIdInput" className="joinBoxWarning">{roomId ? '' : "Room ID required"}</label>
                </div>

                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        id="usernameInput"
                        type="text"
                        placeholder="Enter Guest Username"
                        required
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                        autoSave="off"
                        autoComplete="off"
                    />
                    <label htmlFor="usernameInput" className="joinBoxWarning">{username ? '' : "username required"}</label>
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