import AceEditor from "react-ace";
import toast, { Toaster } from 'react-hot-toast';
import './Room.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
    console.log("change", newValue);
}

function generateColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
}

function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text);
    toast.success('Room ID copied')
  } catch(exp) {
    console.error(exp)
  }
}

export default function Room() {
    return (
        <div className="room">
            <div className="roomSidebar">
                <div className="roomSidebarUsersWrapper">
                    <p>Connected Users:</p>
                    <div className="roomSidebarUsers">
                      {[0, 1, 2, 3, 4, 5].map((each) => (
                        <div key={each} className="roomSidebarUsersEach">
                            <div className="roomSidebarUsersEachAvatar" style={{backgroundColor: `${generateColor('SS')}`}}>SS</div>
                            <div className="roomSidebarUsersEachName">Subham Shaw</div>
                        </div>
                      ))}
                    </div>
                </div>

                <button className="roomSidebarCopyBtn" onClick={() => {copyToClipboard(window.location.pathname.slice(6))}}>Copy Room id</button>
                <button className="roomSidebarBtn">Leave</button>
            </div>

            <AceEditor
                placeholder="Write your code here."
                className="roomCodeEditor"
                mode="javascript"
                theme="monokai"
                name="collabEditor"
                width="auto"
                height="auto"
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