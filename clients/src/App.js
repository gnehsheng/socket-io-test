import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import Player from "./components/Player";
import { Container, Row, Col } from 'react-grid-system'

const socket = io.connect(process.env.BACKEND_APP || "http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Username here.."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID.."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Container fluid style={{ height: '92vh' }}>
          <Row>
            <Col>
              <Player />
            </Col>
            <Col>
              <Chat socket={socket} username={username} room={room} />
            </Col>
          </Row>
        </Container>

      )}
    </div>
  );
}

export default App;