import { useEffect, useState } from "react";
import ChatLeft from "../Components/Chats/ChatLeft";
import ChatRight from "../Components/Chats/ChatRight";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router";

function Chat(){
    const [width, setWidth] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const width = screen.width;
        setWidth(width);
    },[width]);

    if(auth.currentUser === null){
        navigate('/login');
        return;
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