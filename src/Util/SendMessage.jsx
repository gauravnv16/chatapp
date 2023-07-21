import { ref, set } from "firebase/database";
import { database } from "../config/firebaseConfig";

const sendMessage = async ({ message,fromId,toId,type }) => {
    const messageObj = {
      message: message,
      from: fromId,
      to: toId,
      time: new Date().toLocaleTimeString(),
      type: type,
      time2: Date.now(),
    };
    document.getElementById("message").value = "";
    await set(ref(database, "messages/" + crypto.randomUUID()), messageObj);
};

export default sendMessage;