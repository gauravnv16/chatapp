import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContextProvider";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function ChatLeft() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const docRef = await getDocs(collection(db, "Users"));
      const users = docRef.docs.map((doc) => doc.data());
      setUsers(users);
    };
    getUsers();
  }, []);

  if(auth.currentUser === null){
    navigate('/login');
    return;
  }

  return (
    <aside
      style={{
        maxWidth: "400px",
        width: "100%",
      }}
      className="flex flex-col"
    >
      <header className="flex items-center justify-between p-3 border-b-2 border-gray-100">
        <h1 className="text-xl">Chats</h1>
        <section className="flex items-center space-x-2">
          <input
            type="text"
            className="border-2 border-gray-100 px-3 py-2 rounded focus:outline-none"
            placeholder="Search"
          />
        </section>
      </header>
      <main
        className="flex flex-col p-3"
        style={{
          height: "calc(100vh - 80px)",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        {Users.map((user) => {
          if (user.uid !== auth.currentUser?.uid)
            return (
              <Link
                key={user.id}
                className="flex justify-between hover:cursor-pointer hover:bg-gray-100 p-2 border-2 border-gray-100 my-1"
                to={`/chat/${user.uid}`}
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  localStorage.setItem("chatUser", JSON.stringify(user));
                }}
              >
                <section className="flex items-center">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-8 h-8 rounded-full me-2"
                  />
                  <section className="flex flex-col">
                    <h1 className="text-sm">{user.name}</h1>
                    {/* <p className="text-gray-400 text-xs">{user?.lastMessage.slice(0,20) + '...'}</p> */}
                  </section>
                </section>
                <section className="flex flex-col items-end">
                  <p className="text-gray-400 text-xs">
                    {user?.lastMessageTime}
                  </p>
                  <div className="flex items-center space-x-1">
                    <img
                      src="https://img.icons8.com/color/24/000000/double-tick.png"
                      alt="tick"
                      className="w-4 h-4"
                    />
                    <img
                      src="https://img.icons8.com/color/24/000000/double-tick.png"
                      alt="tick"
                      className="w-4 h-4"
                    />
                  </div>
                </section>
              </Link>
            );
        })}
      </main>
    </aside>
  );
}

export default ChatLeft;
