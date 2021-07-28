const form = document.querySelector("form");
const TitleError = document.querySelector("#blogTitleHelp");
const SnippetError = document.querySelector("#blogSnippetHelp");
const BodyError = document.querySelector("#blogBodyHelp");
const blogTitleElem = form.blogTitle;
const blogSnippetElem = form.blogSnippet;
const blogBodyElem = form.blogBody;



blogTitleElem.addEventListener("blur", (e) => {
  TitleError.textContent = ''
  const blogTitleA = blogTitleElem.value;
  let regex = /^\s/;
  if (blogTitleA == "" || regex.test(blogTitleA)) {
    TitleError.textContent = 'Enter a valid Title for the Blog';
  }
});


blogSnippetElem.addEventListener("blur", (e) => {
  SnippetError.textContent = ''
  const blogSnippetA = blogSnippetElem.value;
  let regex = /^\s/;
  if (blogSnippetA == "" || regex.test(blogSnippetA)) {
    SnippetError.textContent = 'Enter a valid Snippet for the Blog';
  }
});



blogBodyElem.addEventListener("blur", (e) => {
  BodyError.textContent = ''
  const blogBodyA = blogBodyElem.value;
  let regex = /^\s/;
  if (blogBodyA == "" || regex.test(blogBodyA)) {
    BodyError.textContent = 'Enter a valid Body for the Blog';
  }
});



form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const blogFirstName = form.blogFirstName.value;
  const blogLastName = form.blogLastName.value;
  const blogEmail = form.blogEmail.value;
  const blogUserName = form.blogUserName.value;
  const blogTitle = form.blogTitle.value;
  const blogSnippet = form.blogSnippet.value;
  const blogBody = form.blogBody.value;

  let bodyData = {
    blogFirstName,
    blogLastName,
    blogEmail,
    blogUserName,
    blogTitle,
    blogSnippet,
    blogBody,
  };

  try {
    const res = await fetch("/nodeblogapi/create", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.blog) {
      location.assign("/nodeblogapi/blogs");
    }
  } catch (err) {
    console.log(err);
  }
});
