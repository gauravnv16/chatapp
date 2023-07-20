import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import UserContextProvider from "../Contexts/UserContextProvider";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router";

function ChatScreen(){
    const [width, setWidth] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        const width = screen.width;
        setWidth(width);
    },[width]);

    if(!auth.currentUser){
        navigate('/login');
        return;
    }

    return(
        <UserContextProvider>
        <div className="flex w-full justify-center" style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            height: "90vh",
            padding: "10px",
        }}>
            {
                width > 600 && <ChatLeft/>
            }
            <div className="chat-right w-full">
                <ChatRight/>
            </div>
        </div>
        </UserContextProvider>
    )
}

export default ChatScreen;