import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import UserContextProvider from "../Contexts/UserContextProvider";
import { auth } from "../config/firebaseConfig";

function ChatScreen(){
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
        const width = screen.width;
        setWidth(width);
    },[width]);

    if(!auth.currentUser){
        window.location.href = "/login";
    }

    return(
        <UserContextProvider>
        <div className="flex w-full justify-center">
            {
                width > 600 && <ChatLeft/>
            }
            <div className="chat-right ms-5 w-full">
                <ChatRight/>
            </div>
        </div>
        </UserContextProvider>
    )
}

export default ChatScreen;