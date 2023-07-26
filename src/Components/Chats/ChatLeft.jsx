import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function LogOutModalBox() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" id="logOutmodal" style={{
      display: 'none'
    }}>
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-xl font-bold text-gray-700">
          Are you sure you want to log out?
        </h1>
        <div className="flex justify-end mt-5">
          <button className="px-3 py-2 rounded-lg bg-gray-200 mr-2" onClick={
            () => {
              document.getElementById('logOutmodal').style.display = 'none';
            }
          }>
            Cancel
          </button>
          <button className="px-3 py-2 rounded-lg bg-red-500 text-white" onClick={
            () => {
              auth.signOut();
              navigate('/login');
            }
          }>
            Log Out
          </button>
        </div>
      </div>
    </div>

  )
}
function ChatLeft() {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const docRef = await getDocs(collection(db, "Users"));
      const users = docRef.docs.map((doc) => doc.data());
      setUsers(users);
    };
    getUsers();
  }, []);

  return (
    <aside
      style={{
        maxWidth: "400px",
        width: "100%",
        height: "90vh",
      }}
      className="flex flex-col border-r-2 border-gray-100 px-2 py-3"
    >
      <header
        className="flex flex-col p-2  px-3 rounded"
        style={
          {
            // backgroundColor: "#212A3E",
          }
        }
      >
        <h1 className="flex  items-center justify-between text-2xl my-3 font-bold text-gray-700">
          Chats
          <i className="fas fa-ellipsis-v text-gray-400" onClick={
            () => {
              document.getElementById('logOutmodal').style.display = 'flex';
            }
          }></i>
        </h1>
        <section className="flex items-center space-x-2 p-3 rounded-lg border-2 bg-gray-200">
          <i className="fas fa-search text-gray-400"></i>
          <input
            type="text"
            className="focus:outline-none w-full bg-gray-200"
            placeholder="Search"

          />
        </section>
      </header>
      <hr className="my-2" />

      {/* menu */}
      {/* <section className="flex items-center justify-between p-3 border-b-2 border-gray-100">
       
       <h2 className="text-lg">{auth.currentUser?.displayName || "User"}</h2>
        <button className="flex items-end px-3 py-2 rounded-xl bg-red-500" onClick={
          () => {
            auth.signOut();
            navigate('/login');
          }
        }>
          <i className="fas fa-sign-out-alt text-white mr-2 text-sm "></i>
          <p className="text-white text-sm">Log Out</p>
        </button>
      </section> */}
      {/* modal box */}
      {
        <LogOutModalBox />
      }
      <main
        className="flex flex-col"
        style={{
          overflowY: "scroll",
        }}
      >
        {Users.map((user, index) => {
          if (user.uid !== auth.currentUser?.uid)
            return (
              <Link
                key={index}
                className="flex justify-between items-center hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg border-2 border-gray-100 hover:border-gray-200 my-1"
                to={`/chat/${user.uid}`}
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  sessionStorage.setItem("chatUser", JSON.stringify(user));
                }}
              >
                <section className="flex items-center">
                  <img
                    src={`https://i.pravatar.cc/300?img=${user.uid}`}
                    alt={user.name}
                    className="w-10 h-10 me-2 rounded-full"
                  />
                  <section className="flex flex-col">
                    <h1 className="">
                      {user.name}
                      {/* <i className="fas fa-check-circle text-green-500 ms-1 text-xs"></i> */}
                      </h1>
                    <p className="text-gray-400 text-sm">{"hello"}
                    
                    </p>
                  </section>
                </section>
                <section className="flex flex-col items-end">
                  <p className="text-gray-400 text-xs my-3">
                    {user?.lastMessageTime || "12:00"}
                  </p>
                </section>
              </Link>
                  
            );
        })}
      </main>
    </aside>
  );
}

export default ChatLeft;
