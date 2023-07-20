import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../Contexts/UserContextProvider";
import { auth, database } from "../../config/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

function SortMessages(messages) {
  const sortedMessages = messages.sort((a, b) => {
    return a.time2 - b.time2;
  });

  return sortedMessages;
}
function EmojiKeyboard() {
  const icons = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
  ];
  return (
    <section
      style={{
        width: "250px",
        display: "none",
        position: "absolute",
        bottom: "70px",
      }}
      id="emojiKeyboard"
      className="p-2 bg-gray-100 mb-2 rounded ml-2"
    >
      <h1 className="text-2x mb-3">
        {/* back */}
        <i
          className="fas fa-arrow-left text-blue-500 cursor-pointer mr-2"
          onClick={() => {
            document.getElementById("emojiKeyboard").style.display = "none";
          }}
        ></i>
        Emojis
      </h1>

      <section className="flex flex-wrap justify-center">
        {icons.map((icon, index) => (
          <p
            className="text-2xl cursor-pointer"
            key={index}
            onClick={() => {
              document.getElementById("message").value += icon;
            }}
          >
            {icon}
          </p>
        ))}
      </section>
    </section>
  );
}
function ChatRight() {
  const [chatUser, setChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const path = useParams("1");
  const uc = useContext(UserContext);
  const endRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      message: document.getElementById("message").value,
      from: auth.currentUser?.uid,
      to: chatUser.uid,
      time: new Date().toLocaleTimeString(),
      type: "text",
      time2: Date.now(),
    };
    await set(ref(database, "messages/" + crypto.randomUUID()), message);
  };

  // const Search = (e) => {
  //   const value = e.target.value;
  //   if (value === "") return setMessages(messages);
  //   const filteredMessages = messages.filter((message) =>
  //     message.message.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setMessages(filteredMessages);
  // };

  const { id } = path;

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("chatUser"));
    setChatUser(user);
  }, [id, messages]);


  useEffect(() => {
    const DataRef = ref(database, "messages/");
    return onValue(DataRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(SortMessages(Object.values(data)));
    });
  }, []);
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  if (!chatUser) return <h1>Loading...</h1>;

  return (
    <main
      className="flex flex-col"
      style={{
        height: "90vh",
        width: "100%",
      }}
    >
      <header className="flex items-center justify-between p-3 border-b-2 border-gray-100">
        <section className="flex items-center space-x-2">
          <Link to="/">
            <i className="fas fa-arrow-left text-blue-500 cursor-pointer"></i>
          </Link>
          <img
            src="https://img.icons8.com/color/48/000000/test-account.png"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <section className="flex flex-col">
            <h1 className="">{chatUser?.name}</h1>
            <p className="text-gray-400 text-sm">Online</p>
          </section>
        </section>
        <section className="flex items-center">
          <img
            src="https://img.icons8.com/color/24/000000/video-call.png"
            alt="video"
            className="w-6 h-6 mr-3"
          />
          <img
            src="https://img.icons8.com/color/24/000000/phone.png"
            alt="phone"
            className="w-6 h-6 mx-3"
          />
          <img
            src="https://img.icons8.com/color/24/000000/ellipsis.png"
            alt="more"
            className="w-6 h-6 mx-3"
          />
        </section>
      </header>
      {/* search menu */}
      {/* <section className="flex justify-end p-3">
        <section
          className="flex items-center border-2 border-gray-300 px-3 py-2 rounded"
          style={{}}
        >
          <img
            src="https://img.icons8.com/color/24/000000/search--v1.png"
            alt="search"
            className="w-6 h-6 mr-2"
          />
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none"
            onChange={Search}
          />
        </section>
      </section> */}
      <main
        className="flex flex-col p-3"
        style={{
          height: "90%",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <section className="flex flex-col">
          {messages.map((message, index) => {
            if (
              message.from === chatUser.uid &&
              message.to === auth.currentUser?.uid
            )
              return (
                <section className="flex flex-col items-start mt-3" key={index}>
                  <p className="bg-gray-100 p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
                    {message.message}
                  </p>
                  <p className="text-gray-400 text-xs">{message.time}</p>
                </section>
              );
            else if ( message.from === auth.currentUser?.uid && message.to === chatUser.uid )
            return (
              <section className="flex flex-col items-end mt-3" key={index}>
                <p className="bg-blue-500 text-white p-2 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
                  {message.message}
                </p>
                <p className="text-gray-400 text-xs">{message.time}</p>
              </section>
            );
          })}
          <section id="bottom" ref={endRef}></section>
        </section>
      </main>
      {EmojiKeyboard()}
      <footer className="flex items-center justify-between p-3  border-t-2 border-gray-100 flex-wrap">
        
        <section className="flex items-center w-full">
          <form onSubmit={sendMessage} className="w-full">
            <input
              type="text"
              className="border-2 border-gray-100 px-3 py-2 rounded focus:outline-none w-full"
              placeholder="Type a message"
              id="message"
            />
          </form>
          <i className="fas fa-paper-plane text-blue-500 mx-2"></i>
        </section>
        <section className="flex items-center mr-4">
          <i className="fas fa-smile text-yellow-500 cursor-pointer mx-2 m-4 border-2 border-gray-100 p-1 rounded"

            onClick={() => {
              const emojiKeyboard = document.getElementById("emojiKeyboard");
              if (emojiKeyboard.style.display === "block") {
                emojiKeyboard.style.display = "none";
              } else
                document.getElementById("emojiKeyboard").style.display =
                  "block";
            }}
          ></i>
          <i className="fas fa-paperclip cursor-pointer mx-2 m-4 border-2 border-gray-100 p-1 rounded"
          ></i>
        </section>
      </footer>
    </main>
  );
}

export default ChatRight;
