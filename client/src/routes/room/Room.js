import AceEditor from "react-ace";
import './Room.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
    console.log("change", newValue);
}

export default function Room() {
    return (
        <div className="room">
            <div className="roomSidebar">
                <div className="roomSidebarUsersWrapper">
                    <p>Connected Users:</p>
                    <div className="roomSidebarUsers">
                        <div className="roomSidebarUsersEach">
                            <div className="roomSidebarUsersEachAvatar">S</div>
                            <div>Subham</div>
                        </div>
                    </div>
                </div>

                <button className="roomSidebarCopyBtn">Copy Room id</button>
                <button className="roomSidebarBtn">Leave</button>
            </div>

            <div className="roomEditorWrapper">
                <AceEditor
                    mode="javascript"
                    theme="gruvbox"
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
            </div>
        </div>
    )
}