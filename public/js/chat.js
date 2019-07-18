const socket = io();

// elements
const $messageFrom = document.querySelector("#message-form");
const $messageFromInput = $messageFrom.querySelector("input");
const $messageFromButton = $messageFrom.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on("message", message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageFrom.addEventListener("submit", e => {
  e.preventDefault();

  $messageFromButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, error => {
    $messageFromButton.removeAttribute("disabled");
    $messageFromInput.value = "";
    $messageFromInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("the message was delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("navigator.geolocation is not supported by your browser");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(position => {
    // console.log(position);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location shared");
      }
    );
  });
});
