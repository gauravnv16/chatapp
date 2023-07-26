// import { ref, set } from "firebase/database";
import { db } from "../config/firebaseConfig";
import getTime from "./getTime";
import PropTypes from "prop-types";
import { addDoc, collection } from "firebase/firestore";

const sendMessage = async ({ message, fromId, toId, type }) => {
  const messageObj = {
    message: message,
    from: fromId,
    to: toId,
    time: getTime(),
    type: type,
    time2: Date.now(),
  };
  document.getElementById("message").value = "";
  // await set(
  //   ref(
  //     database,
  //     "messages/" + fromId+toId + "/" + crypto.randomUUID()
  //   ),
  //   messageObj
  // );

  await addDoc(collection(db,"Chats"),messageObj);
};

sendMessage.propTypes = {
  message: PropTypes.string.isRequired,
  fromId: PropTypes.string.isRequired,
  toId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default sendMessage;
