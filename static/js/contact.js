$('#success').hide();
const form = document.querySelector("form");
const firstNameError = document.querySelector("#firstNameHelp");
const lastNameError = document.querySelector("#lastNameHelp");
const emailError = document.querySelector("#emailHelp");
const subjectError = document.querySelector("#subjectHelp");
const messageError = document.querySelector("#messageHelp");
const firstNameElem = form.firstName;
const lastNameElem = form.lastName;
const emailElem = form.email;
const subjectElem = form.subject;
const messageAreaElem = form.messageArea;



firstNameElem.addEventListener("blur", (e) => {
  firstNameError.textContent = ''
  const firstNameValue = firstNameElem.value;
  console.log(firstNameValue);
  let regex = /^[a-zA-Z]{2,30}$/;
  if (firstNameValue == "" || !regex.test(firstNameValue)) {
    firstNameError.textContent = 'Please enter a valid name';
  }
});


lastNameElem.addEventListener("blur", (e) => {
  lastNameError.textContent = ''
  const lastNameValue = lastNameElem.value;
  console.log(lastNameValue);
  let regex = /^[a-zA-Z]{2,30}$/;
  if (lastNameValue == "" || !regex.test(lastNameValue)) {
    lastNameError.textContent = 'Please enter a valid last name';
  }
});


emailElem.addEventListener("blur", (e) => {
  emailError.textContent = ''
  const emailValue = emailElem.value;
  let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  if (emailValue == "" || !regex.test(emailValue)) {
    emailError.textContent = 'Enter a valid email';
  }
});


subjectElem.addEventListener("blur", (e) => {
  subjectError.textContent = ''
  const subjectValue = subjectElem.value;
  let regex = /^\s/;
  if (subjectValue == "" || regex.test(subjectValue)) {
    subjectError.textContent = 'Enter a valid subject';
  }
});


messageAreaElem.addEventListener("blur", (e) => {
  messageError.textContent = ''
  const messageAreaValue = messageAreaElem.value;
  let regex = /^\s/;
  if (messageAreaValue == "" || regex.test(messageAreaValue)) {
    messageError.textContent = 'Enter a valid message';
  }
});


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const messageArea = form.messageArea.value;
  let bodyData = {
    firstName,
    lastName,
    email,
    subject,
    messageArea,
  };
  try {
    const res = await fetch("/help/contact_page", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.msg);
    // console.log(data.errorMessages);
    //     if (data.errorMessages) {
    //       userError.textContent = data.errorMessages.userName;
    //       passwordError.textContent = data.errorMessages.password;
    //     }
    if (data.msg) {
      // location.assign("/help/contact_page");
      $('#success').show();
      $('#alertPara').text(data.msg);
    }
  } catch (err) {
    console.log(err);
  }
});
