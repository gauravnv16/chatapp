import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { auth, database } from "../../config/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import SortMessages from "../../Util/SortMessages";
import EmojiKeyboard from "./Components/EmojiKeyBoard";
import MessageItem from "./Components/Message";
import MessageSearch from "./Components/MessageSearch";
import sendMessage from "../../Util/SendMessage";
import HeaderIcons from "./Components/HeaderIcons";
import FileUploadMenu from "./Components/FileUpload";

function ImageEnlarger({ image }) {
  return (
    <section
      className="flex flex-col fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => {
        document.getElementById("imageEnlarger").style.display = "none";
      }}
      id="imageEnlarger"
    >
      <img src={image} alt="" className="w-1/2 h-1/2" />
      {/* download button */}
      <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={
        () => {
          const link = document.createElement('a');
          link.href = image;
          link.download = 'image';
          link.click();
        }
      }>
        download
        <i className="fas fa-download ms-2"></i>
      </button>
    </section>
  )
}
function ChatRight() {
  const [chatUser, setChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const path = useParams("1");
  const endRef = useRef(null);
  const [image, setImage] = useState('');

  const Search = (e) => {
    const value = e.target.value;
    if (value === "") return setFilteredMessages(messages);
    const filteredMessages = messages.filter((message) =>
      message.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMessages(SortMessages(filteredMessages));
  };

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
      setFilteredMessages(SortMessages(Object.values(data)));
    });
  }, []);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
        <HeaderIcons />
      </header>
      <MessageSearch Search={Search} />
      <main
        className="flex flex-col p-3"
        style={{
          height: "90%",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <section className="flex flex-col">
          {filteredMessages.map((message, index) => {
            if (
              message.from === chatUser.uid &&
              message.to === auth.currentUser?.uid
            )
              if (message.type === "image") {
                return (
                  <section className="flex" key={index}>
                    <img
                      src="https://img.icons8.com/color/48/000000/test-account.png"
                      alt="profile"
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                    <section className="flex flex-col items-start mt-3">
                      <img
                        src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        style={{
                          height: "200px",
                          width: "200px",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          setImage(message.message);
                          document.getElementById('imageEnlarger').style.display = 'flex';
                        }}
                      />
                      <p className="text-gray-400 text-xs mt-2">12:50</p>
                    </section>
                  </section>
                );
              } else 
                return (
                  <MessageItem
                    message={message.message}
                    index={index}
                    time={message.time}
                    key={index}
                    sentForm={"left"}
                  />
                );
            else if (
              message.from === auth.currentUser?.uid &&
              message.to === chatUser.uid
            )
              if (message.type === "image") {
                return (
                  <section className="flex flex-col items-end" key={index}>
                    <section className="flex ">
                      <section className="flex flex-col items-end mt-3">
                        <img src={message.message} alt="" style={{
                          height: "200px",
                          width: "200px",
                          borderRadius: "10px",
                        }} onClick={
                          () => {
                            setImage(message.message);
                            document.getElementById('imageEnlarger').style.display = 'flex';
                          }
                        }/>
                        <p className="text-gray-400 text-xs mt-2">12:50</p>
                      </section>
                      <img
                        src="https://img.icons8.com/color/48/000000/test-account.png"
                        alt="profile"
                        className="w-6 h-6 ms-2 rounded-full"
                      />
                    </section>
                  </section>
                )
              }
              else
              return (
                <MessageItem
                  message={message.message}
                  index={index}
                  time={message.time}
                  key={index}
                  sentForm={"right"}
                />
              );
          })}
          <section id="bottom" ref={endRef}></section>
        </section>
      </main>
      <EmojiKeyboard />
      <FileUploadMenu from={auth.currentUser?.uid} to={chatUser.uid} />
      <ImageEnlarger image={image}/>
      <footer className="flex items-center justify-between p-3  bg-gray-100 flex-wrap">
        <section className="flex items-center w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({
                message: e.target.message.value,
                fromId: auth.currentUser?.uid,
                toId: chatUser.uid,
                type: "text",
              });
            }}
            className="w-full"
          >
            <input
              type="text"
              className="border-2 border-gray-100 px-3 py-2 rounded focus:outline-none w-full"
              placeholder="Type a message"
              id="message"
            />
          </form>
          <i className="fas fa-paper-plane text-blue-500 text-xl mx-2 border-2 border-gray-100 bg-white py-1 px-3 rounded-xl"></i>
        </section>
        <section className="flex items-center mr-4">
          <i
            className="fas fa-smile text-yellow-500 cursor-pointer mx-2 m-4 border-2 border-gray-100 bg-white p-1 px-3 rounded-xl text-2xl"
            onClick={() => {
              const emojiKeyboard = document.getElementById("emojiKeyboard");
              if (emojiKeyboard.style.display === "block") {
                emojiKeyboard.style.display = "none";
              } else
                document.getElementById("emojiKeyboard").style.display =
                  "block";
            }}
          ></i>
          <i className="fas fa-paperclip cursor-pointer mx-2 m-4 border-2 border-gray-100 bg-white p-1 px-3 rounded-xl text-2xl" onClick={
            () => {
              const fileUploadScreen = document.getElementById('fileUploadScreen');
              if (fileUploadScreen.style.display === 'flex') {
                fileUploadScreen.style.display = 'none';
              } else {
                fileUploadScreen.style.display = 'flex';
              }
            }
          }></i>
        </section>
      </footer>
    </main>
  );
}

export default ChatRight;
