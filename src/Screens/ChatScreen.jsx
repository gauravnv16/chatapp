import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router";

function ChatScreen() {
  const [width, setWidth] = useState(screen.width);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/login");
      return;
    }
    window.addEventListener("resize", () => {
      const width = screen.width;
      setWidth(width);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
    
  }, [width]);

 

  
  // console.log(auth.currentUser);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        padding: "10px",
        width: "100vw",
        backgroundColor: "white",
      }}
      id="chatScreen"
    >
      {width > 600 && <ChatLeft />}
      <div className="chat-right w-full">
        <ChatRight />
      </div>
    </div>
  );
}

export default ChatScreen;
