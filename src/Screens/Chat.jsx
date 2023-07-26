import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import { useNavigate } from "react-router";
import { auth } from "../config/firebaseConfig";
// import { Suspense, lazy } from "react";

// const ChatLeft = lazy(() => import("../Components/Chats/ChatLeft"));
// const ChatRight = lazy(() => import("../Components/Chats/ChatRight"));

function Chat() {
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


  return (
    <div
      className="flex"
      style={{
        // height: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "90vh",
        // padding: "10px",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <ChatLeft />
      {width > 600 && (
        <div className="chat-right ms-5 w-full">
          {/* lazy load it */}
          
          <ChatRight />
        </div>
      )}
    </div>
  );
}

export default Chat;
