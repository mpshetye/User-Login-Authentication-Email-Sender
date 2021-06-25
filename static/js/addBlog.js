const form = document.querySelector("form");
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
    if(data.blog){
        location.assign("/nodeblogapi/blogs");
    }
  } catch(err) {
      console.log(err);
  }
});
