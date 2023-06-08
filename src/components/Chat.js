import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";
import axios from "axios";
import $ from "jquery";
import LettersComponent from './LettersComponent';

export const Chat = (props) => {
  const { room } = props;
  const [input, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  //const [input, setInput] = useState('');
  const [output, setOutput] = useState("");

  const messagesRef = collection(db, "messages");
  const autput = "";

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (input === "") return;

    try {
      const myOutput = await translate();
      await handleSubmit(e, myOutput);
    } catch (error) {
      console.log(error);
    }
  };

  const translate = async () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    try {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        params,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);
      console.log(output);
      setOutput(response.data.translatedText);
      console.log(output);
      return response.data.translatedText;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, myOutput) => {
    e.preventDefault();
    if (input === "") return;
    await addDoc(messagesRef, {
      text: myOutput,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };


  return (
    <div className="home">
      <div className="chat-app">
        <div className="header" data-value="here">
          {/* <h1> Welcome to: {room.toUpperCase()}</h1> */}
          <h1 className="title"><LettersComponent/></h1>
        </div>
        
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              <span className="time">[{(message.createdAt.toDate().toString().slice(16, 24))}]</span>
              <span className="user">{message.user}</span>
              <span className="msg">{message.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="new-message-form">
        <div className="send-select">
          <input
            className="new-message-input"
            placeholder="type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={input}
          />
          <div className="optns">
            <a>From ({from}) :</a>
            <select onChange={(e) => setFrom(e.target.value)} className="lng-slt">
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
            </div>
            <div className="opt2">
            <a>To ({to}) :</a>
            <select onChange={(e) => setTo(e.target.value)} className="lng-slt">
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
            </div>
          
          <button type="submit" className="snd-btn"> Send </button>
          </div>
        </form>
      </div>
    </div>
  );
};
