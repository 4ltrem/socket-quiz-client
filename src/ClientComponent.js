import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export default function ClientComponent() {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState(null);
  // From => https://stackoverflow.com/a/57829906
  const [currentSocket, setCurrentSocket] = useState(null);

  /* 
    CORS handling code based on:
    https://socket.io/docs/v4/handling-cors/
  */ 
  
  useEffect(() => {
    const socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: { "my-custom-header": "abcd" }
    });
    setCurrentSocket(socket);
    socket.on("FromAPI", data => { setResponse(data); });
    socket.on("ServedQuestion", data => {setQuestion(data);});
    
    return () => socket.disconnect();
  }, []
  );

  const gimmeQuestion = () => {
    currentSocket.emit("gimmeQuestion");
    console.log("request emitted!")
  }

  return (
    <div>
      <p>
        It's <time>{response}</time>
      </p>

      <button onClick={ gimmeQuestion }>
        Get question
      </button>

      <p>Current question : {question == null ? "N/A" : question}</p>

    </div>
    
  );
}