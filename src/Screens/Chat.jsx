import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import { auth } from "../config/firebaseConfig";

function Chat(){
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const width = screen.width;
        setWidth(width);
    },[width]);

    if(auth.currentUser === null){
        window.location.href = "/login";
    }

    return(
        <div className="flex w-full justify-center">
            <ChatLeft/>
            {
                width > 600 && <div className="chat-right ms-5 w-full">
                    <ChatRight/>
                </div>
            }
        </div>
    )
}

export default Chat;