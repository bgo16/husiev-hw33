const button = document.querySelector('button');

button.addEventListener('click', findPost);

function findPost() {
  const postId = document.querySelector('.post-id').value;
  if (postId > 0 && postId < 101) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
      .then((response) => response.json())
      .then((post) => renderPost(post, postId))
      .catch((error) => console.error(error));
  } else {
    alert('incorrect id');
  }
}

function renderComment(postId) {
  fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
    .then((response) => response.json())
    .then((comments) => {
      const post = document.querySelector('.post');
      const commentContainer = document.createElement('div');
      commentContainer.textContent = '';
      post.appendChild(commentContainer);

      for (const comment of comments) {
        const commentElement = document.createElement('div');
        commentElement.setAttribute('class', 'comment-element');
        commentElement.innerHTML = `<b>${comment.name}</b><br/>${comment.body}`;
        commentContainer.appendChild(commentElement);
      }
    })
    .catch((error) => console.error(error));
}

function renderPost(post, postId) {
  const postContainer = document.querySelector('.post');
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Show comment';
  commentButton.addEventListener('click', () => renderComment(postId));
  postContainer.innerHTML = `<b>${post.title}</b>: <br/> ${post.body}<br/>`;
  postContainer.appendChild(commentButton);
}
