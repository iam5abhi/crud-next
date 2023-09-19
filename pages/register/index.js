import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../components/firebase/index";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  const register = (event) => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(event,name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/");
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link href="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;