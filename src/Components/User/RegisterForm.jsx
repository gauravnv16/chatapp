import { Link, useNavigate } from "react-router-dom";
import InputComponent from "./components/InputComponent";
import { useRef } from "react";
import { auth, db, provider } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { collection,addDoc, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContextProvider";
function RegisterForm(){
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const uc = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          await createUserWithEmailAndPassword(auth, email.current, password.current);
          const user = auth.currentUser;

          await addDoc(collection(db, "Users"), {
            uid: user.uid,
            name: name.current,
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: new Date(),
            status:'online' 
          });
          uc.setUser(user);
          uc.setIsAuthenticated(true);
          navigate('/');
        }catch(err){
          console.log(err);
        }
    }

    const handleGoogleLogin = async() => {
      try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // check if user exists in db
        const docRef = await getDocs(collection(db, "Users"));
        const users = docRef.docs.map((doc) => doc.data());
        const currentUser = users.find((user) => user.uid === auth.currentUser.uid);
        if(currentUser){
          uc.setUser(currentUser);
          uc.setIsAuthenticated(true);
          navigate('/');
          // return;
        }else {
          await addDoc(collection(db, "Users"), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: new Date(),
            status:'online' 
          });
          uc.setUser(user);
          uc.setIsAuthenticated(true);
          navigate('/');
        }
      }
      catch(err){
        console.log(err);
      }
    }
    return(
        <main className="flex items-center justify-center" style={{
          height: '90vh',
          width: '100%',
        }}>
        <form style={{
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
        }} onSubmit={handleSubmit}>
          <h1 className="text-2xl">Register</h1>
         
         <InputComponent
            name="name"
            type="text"
            placeHolder="John Doe"
            disText=""
            labelText="Name"
            onChange={(e) => {
              name.current = e.target.value;
            }}
            />
          <InputComponent
              name="email"
              type="email"
              placeHolder="johndoe@email.com"
              disText="We'll never share your email with anyone else."
              labelText="Email address"
              onChange={(e) => {
                email.current = e.target.value;
              }}
          />
          <InputComponent
              name="password"
              type="password"
              placeHolder="********"
              disText=""
              labelText="Password"
              onChange={(e) => {
                password.current = e.target.value;
              }}
          />
          <button className="bg-blue-500 text-white px-3 py-2 rounded mt-2"> Register </button>
          <p className="text-gray-500 mt-2">{"Existing User? "} <Link to="/login" className="text-blue-500">login</Link></p>
          <p className="text-gray-500 mt-2"> or </p>
            <button className="mt-3 bg-white border-2 border-gray-100 px-3 py-2 rounded w-fit" onClick={
              handleGoogleLogin
            }>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
            </button>
        </form>
      </main>
    )
}

export default RegisterForm;    