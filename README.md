# Collabarative Code Editor
* multiple users can join a room for simultaneous editing in realtime.
* single user creates a room.
* user who created/joined the room can share the room ID for invite.

## Tech Stack
* websockets used for realtime data streaming.
* React used in frontend and Node.js in backend.
* react-hot-toast used for notification.
* uuid library for generating random long string for using as Room ID.

## Instructions
### Development
* cd client && npm start (on terminal 1)
* cd server && npm run server (on terminal 2)
* Development document: https://docs.google.com/document/d/1gjXxgH9DGwMUQQZSMpqzwCpN3zbNdG8Ua1ElxFBQg5w/edit?usp=sharing

### Production
* first add the env variable value to platform used for deployment of client code.
* use "REACT_APP_WEB_SOCKET_URL" key name and assign server code production url as value.
* in client, run "npm run build" for test run.
* in deployment platform for client code, select the client as "root folder".
* NOTE: above step is not required in case if manually hosting on server