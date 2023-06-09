import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { generateColor } from "../../utils";
import './Room.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Room({ socket }) {
  const navigate = useNavigate()
  const roomId = window.location.pathname.slice(6)
  const [fetchedUsers, setFetchedUsers] = useState(() => [])
  const [fetchedCode, setFetchedCode] = useState(() => "")

  function onChange(newValue) {
    socket.emit("syncing the code", { socketId: socket.id, code: newValue })

    socket.emit("on code change", { roomId, code: newValue })
  }

  function handleLeave(roomId) {
    socket.emit("leave room", { roomId })
  }

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      toast.success('Room ID copied')
    } catch (exp) {
      console.error(exp)
    }
  }

  useEffect(() => {
    socket.on("updating client list", ({ userslist }) => {
      setFetchedUsers(userslist)
    })

    socket.on("on code change", ({ code }) => {
      setFetchedCode(code)
    })
  }, [socket])

  return (
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">
          <p>Connected Users:</p>
          <div className="roomSidebarUsers">
            {fetchedUsers.map((each) => (
              <div key={each} className="roomSidebarUsersEach">
                <div className="roomSidebarUsersEachAvatar" style={{ backgroundColor: `${generateColor(each)}` }}>{each.slice(0, 2).toUpperCase()}</div>
                <div className="roomSidebarUsersEachName">{each}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="roomSidebarCopyBtn" onClick={() => { copyToClipboard(roomId) }}>Copy Room id</button>
        <button className="roomSidebarBtn" onClick={() => {
          handleLeave(roomId)
          navigate('/')
        }}>Leave</button>
      </div>

      <AceEditor
        placeholder="Write your code here."
        className="roomCodeEditor"
        mode="javascript"
        theme="monokai"
        name="collabEditor"
        width="auto"
        height="auto"
        value={fetchedCode}
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <Toaster />
    </div>
  )
}