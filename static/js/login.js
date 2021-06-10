const form = document.querySelector("form");
const userError = document.querySelector("#userNameHelp");
const passwordError = document.querySelector("#logPasswordHelp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // reset errors
  userError.textContent = "";
  passwordError.textContent = "";
  // get values
  const userName = form.userName.value;
  const password = form.password.value;
  let bodyData = {
    userName,
    password
  };
  try {
    const res = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.errorMessages);
    if (data.errorMessages) {
      userError.textContent = data.errorMessages.userName;
      passwordError.textContent = data.errorMessages.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});

