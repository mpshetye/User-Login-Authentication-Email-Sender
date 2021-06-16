const form = document.querySelector("form");
const firstNameError = document.querySelector("#firstNameHelp");
const lastNameError = document.querySelector("#lastNameHelp");
const emailError = document.querySelector("#emailHelp");
const phoneError = document.querySelector("#phoneHelp");
const userError = document.querySelector("#userHelp");
const ageError = document.querySelector("#ageHelp");
const genderError = document.querySelector("#genderHelp");
const passwordError = document.querySelector("#passwordHelp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // reset errors
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  userError.textContent = "";
  ageError.textContent = "";
  genderError.textContent = "";
  passwordError.textContent = "";
  // get values
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const userName = form.userName.value;
  const age = form.age.value;
  const gender = form.gender.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  let bodyData = {
    firstName,
    lastName,
    email,
    phone,
    userName,
    age,
    gender,
    password,
    confirmPassword
  };
  try {
    const res = await fetch("/user/register", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.errorMessage);
    if (data.errorMessage) {
      firstNameError.textContent = data.errorMessage.firstName;
      lastNameError.textContent = data.errorMessage.lastName;
      emailError.textContent = data.errorMessage.email;
      phoneError.textContent = data.errorMessage.phone;
      userError.textContent = data.errorMessage.userName;
      ageError.textContent = data.errorMessage.age;
      genderError.textContent = data.errorMessage.gender;
      passwordError.textContent = data.errorMessage.password;
    }
    if(data.msg){
      passwordError.textContent = data.msg;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});