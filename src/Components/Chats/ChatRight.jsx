import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../Contexts/UserContextProvider";
import { auth, database } from "../../config/firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

function SortMessages(messages) {
  const sortedMessages = messages.sort((a, b) => {
    return new Date(a.time2) - new Date(b.time2);
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
        {
        icons.map((icon, index) => (
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

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      message: document.getElementById("message").value,
      from: auth.currentUser?.uid,
      to: chatUser.uid,
      time: new Date().toLocaleTimeString(),
      type: "text",
      time2:Date.now()
    };
    await set(
      ref(
        database,
        "messages/"+crypto.randomUUID()
      ),
      message
    );
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
    const user = JSON.parse(localStorage.getItem("chatUser"));
    setChatUser(user);
  }, [id, messages]);

  useEffect(() => {
    const DataRef = ref(
      database,
      "messages/"
    );
    return onValue(DataRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(SortMessages(Object.values(data)));
    });
  }, []);


  return (
    <main
      className="flex flex-col"
      style={{
        height: "100vh",
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
          height: "calc(100vh - 80px)",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <section className="flex flex-col">
          {messages.map((message, index) => {
            if (message.from !== auth.currentUser?.uid)
              return (
                <section className="flex flex-col items-start mt-3" key={index}>
                  <p className="bg-gray-100 p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
                    {message.message}
                  </p>
                  <p className="text-gray-400 text-xs">{message.time}</p>
                </section>
              );
            return (
              <section className="flex flex-col items-end mt-3" key={index}>
                <p className="bg-blue-500 text-white p-2 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
                  {message.message}
                </p>
                <p className="text-gray-400 text-xs">{message.time}</p>
              </section>
            );
          })}
        </section>
      </main>
      {EmojiKeyboard()}
      <footer className="flex items-center justify-between p-3  border-t-2 border-gray-100">
        <section className="flex items-center mr-4">
          <img
            src="https://img.icons8.com/color/24/000000/happy.png"
            alt="emoji"
            className="w-6 h-6 mx-2 cursor-pointer"
            onClick={() => {
              const emojiKeyboard = document.getElementById("emojiKeyboard");
              if (emojiKeyboard.style.display === "block") {
                emojiKeyboard.style.display = "none";
              } else
                document.getElementById("emojiKeyboard").style.display =
                  "block";
            }}
          />
          <i className="fas fa-paperclip text-blue-500  cursor-pointer"></i>
        </section>
        <section className="flex items-center space-x-2 w-full ms-2">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              className="border-2 border-gray-100 px-3 py-2 rounded focus:outline-none "
              placeholder="Type a message"
              style={{
                width: "100%",
              }}
              id="message"
            />
          </form>
        </section>
        <i className="fas fa-paper-plane text-blue-500 mx-2"></i>
      </footer>
    </main>
  );
}

export default ChatRight;
