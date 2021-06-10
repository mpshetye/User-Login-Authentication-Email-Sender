const form = document.querySelector("form");
const firstNameError = document.querySelector("#firstNameHelp");
const lastNameError = document.querySelector("#lastNameHelp");
const emailError = document.querySelector("#emailHelp");
const phoneError = document.querySelector("#phoneHelp");
const userError = document.querySelector("#userHelp");
const ageError = document.querySelector("#ageHelp");
const genderError = document.querySelector("#genderHelp");
const passwordError = document.querySelector("#passwordHelp");
const cPasswordError = document.querySelector("#cPasswordHelp");
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
  cPasswordError.textContent = "";
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
      // cPasswordError.textContent = data.errorMessage.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});








// $("#registerForm").submit(function (event) {
//   event.preventDefault();
//   console.log("ajax is called");

//   // const firstNameError = $("#firstNameHelp").val();
//   // const lastNameError = $("#lastNameHelp").val();
//   // const emailError = $("#emailHelp").val();
//   // const phoneError = $("#phoneHelp").val();
//   // const userError = $("#userHelp").val();
//   // const ageError = $("#ageHelp").val();
//   // const genderError = $("#genderHelp").val();
//   // const passwordError = $("#passwordHelp").val();
//   // const cPasswordError = $("#cPasswordHelp").val();

//   const firstName = $("#firstName").val();
//   const lastName = $("#lastNameHelp").val();
//   const email = $("#lastNameHelp").val();
//   const phone = $("#lastNameHelp").val();
//   const userName = $("#lastNameHelp").val();
//   const age = $("#lastNameHelp").val();
//   const gender = $("#lastNameHelp").val();
//   const password = $("#lastNameHelp").val();


//   // alert(id);
//   $.ajax({
//     type: "POST",
//     data: JSON.stringify({
//       firstName,
//       lastName,
//       email,
//       phone,
//       userName,
//       age,
//       gender,
//       password,
//     }),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     url: `/user/register`,
//     success: function (response) {
//       console.log(response);
//       // console.log(response.length);
//     },
//     error: function (errorMessage) {
//       console.log(errorMessage);
//     },
//   });
// });