// const socket = io("http://localhost:9000");
const socket = io("https://e-chat.onrender.com");

const form = document.getElementById("form");
const msgInp = document.getElementById("msgInp");
const container = document.querySelector(".sub-container");

var user = prompt("Enter your Name");

const handleUser = () => {
  let x = document.createElement("div");
  x.classList.add("center");
  x.classList.add("message");
  x.innerText = `You joined`;
  container.append(x);
};

handleUser();

const handleUserJoinedAndLeft = (name, msg) => {
  let x = document.createElement("div");
  x.classList.add("center");
  x.classList.add("message");
  x.innerText = msg;
  container.append(x);
};

const handleForm = () => {
  let x = document.createElement("div");
  x.classList.add("right");
  x.classList.add("message");
  x.innerText = `You : ${msgInp.value}`;
  container.append(x);
  socket.emit("send", msgInp.value);
};

const handleMsg = (msg) => {
  let x = document.createElement("div");
  x.classList.add("left");
  x.classList.add("message");
  x.innerText = `${msg.name} : ${msg.message}`;
  container.append(x);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleForm();
});

socket.emit("new-user-joined", user);

socket.on("user-joined", (name) => {
  console.log(name);
  handleUserJoinedAndLeft(name, `${name} joined`);
});

socket.on("receive", (msg) => {
  handleMsg(msg);
});

socket.on("left", (name) => {
  handleUserJoinedAndLeft(name, `${name} left`);
});
