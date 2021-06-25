$('#success').hide();
const form = document.querySelector("form");
// const userError = document.querySelector("#userNameHelp");
// const passwordError = document.querySelector("#logPasswordHelp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   // reset errors
  //   userError.textContent = "";
  //   passwordError.textContent = "";
  //   // get values
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
