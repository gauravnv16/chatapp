import { Link, useNavigate } from "react-router-dom";
import InputComponent from "./components/InputComponent";
import { auth, db, provider } from "../../config/firebaseConfig";

import { useContext, useRef } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { UserContext } from "../../Contexts/UserContextProvider";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
function LoginForm() {
  const email = useRef(null);
  const password = useRef(null);
  const uc = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(email.current, password.current);
      const user = auth.currentUser;
      uc.setUser(user);
      uc.setIsAuthenticated(true);
      navigate('/');
    }catch(err){
      console.log(err);
    }
  };

  const handleGoogleLogin = async(e) => {
    e.preventDefault();
    try{
      await signInWithPopup(auth,provider);
      const docRef = await getDocs(collection(db, "Users"));
      const users = docRef.docs.map((doc) => doc.data());
      const currentUser = users.find((user) => user.uid === auth.currentUser.uid);
      uc.setUser(currentUser);
      uc.setIsAuthenticated(true);
      navigate('/');
      
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <main className="flex items-center justify-center" style={{
      height: '90vh',
      width: '100%',
      padding: '0 20px',
    }}>
      <form style={{
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
      }} onSubmit={ handleSubmit }>
        <h1 className="text-2xl">Login</h1>

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
        <p className="text-blue-500">Forgot Password?</p>
        <button className="bg-blue-500 text-white px-3 py-2 rounded mt-3">Login</button>
        <p className="text-gray-500 mt-3">{"Don't have an account?"} <Link to="/register" className="text-blue-500">Register</Link></p>
        <p className="text-gray-500 mt-3"> or </p>
        <button className="mt-3 bg-white border-2 border-gray-100 px-3 py-2 rounded w-fit" onClick={
          handleGoogleLogin
        }>
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
        </button>
      </form>
    </main>
  );
}

export default LoginForm;
