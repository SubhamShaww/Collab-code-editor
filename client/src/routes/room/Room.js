import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Toaster, toast } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { generateColor } from "../../utils";
import './Room.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-vim";

import "ace-builds/src-noconflict/mode-snippets";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

export default function Room({ socket }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [fetchedUsers, setFetchedUsers] = useState(() => [])
  const [fetchedCode, setFetchedCode] = useState(() => "")
  const [language, setLanguage] = useState(() => "javascript")
  const [codeKeybinding, setCodeKeybinding] = useState(() => undefined)

  const languagesAvailable = ["javascript", "java", "c_cpp", "python", "typescript", "golang", "yaml", "html"]
  const codeKeybindingsAvailable = ["default", "emacs", "vim"]

  function onChange(newValue) {
    socket.emit("syncing the code", { socketId: socket.id, code: newValue })

    socket.emit("on code change", { roomId, code: newValue })
  }

  function handleLanguageChange(e) {
    socket.emit("syncing the language", { socketId: socket.id, languageUsed: e.target.value })

    socket.emit("on language change", { roomId, languageUsed: e.target.value })
  }

  function handleLeave(roomId) {
    socket.emit("leave room", { roomId })
    navigate('/', { replace: true })
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
    location.state && location.state.username ? socket.emit("when a user joins", { roomId, username: location.state.username }) : navigate("/", { replace: true })

    socket.on("updating client list", ({ userslist }) => {
      setFetchedUsers(userslist)
    })

    socket.on("on language change", ({ languageUsed }) => {
      setLanguage(languageUsed)
    })

    socket.on("on code change", ({ code }) => {
      setFetchedCode(code)
    })

    socket.on("new member joined", ({ username }) => {
      toast(`${username} joined`)
    })

    socket.on("member left", ({ username }) => {
      toast(`${username} left`)
    })
  }, [socket, location.state, roomId, navigate])

  return location.state && location.state.username ? (
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">
          <div className="languageFieldWrapper">
            <select className="languageField" name="language" id="language" value={language} onChange={handleLanguageChange}>
              {languagesAvailable.map(eachLanguage => (
                <option key={eachLanguage} value={eachLanguage}>{eachLanguage}</option>
              ))}
            </select>
          </div>

          <div className="languageFieldWrapper">
            <select className="languageField" name="codeKeybinding" id="codeKeybinding" value={codeKeybinding} onChange={(e) => {setCodeKeybinding(e.target.value === "default" ? undefined : e.target.value)}}>
              {codeKeybindingsAvailable.map(eachKeybinding => (
                <option key={eachKeybinding} value={eachKeybinding}>{eachKeybinding}</option>
              ))}
            </select>
          </div>

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
        }}>Leave</button>
      </div>

      <AceEditor
        placeholder="Write your code here."
        className="roomCodeEditor"
        mode={language}
        keyboardHandler={codeKeybinding}
        theme="monokai"
        name="collabEditor"
        width="auto"
        height="auto"
        value={fetchedCode}
        onChange={onChange}
        fontSize={15}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        enableLiveAutocompletion={false}
        enableBasicAutocompletion={true}
        enableSnippets={true}
        wrapEnabled={true}
        editorProps={{
          $blockScrolling: true
        }}
      />
      <Toaster />
    </div>
  ) : (
    <div className="room">
      <h2>No username provided. Please use the form to join a room.</h2>
    </div>
  )
}