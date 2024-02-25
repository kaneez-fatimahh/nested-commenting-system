const input = document.getElementById("exampleInputEmail1");
const replyText = document.querySelectorAll(".reply");
const container = document.querySelector(".container");

const commentDiv = (item, parentId = null) => {
  let div = document.createElement("div");

  div.innerHTML = `
      <p class="comment" id="comment-${item.id}">${item.comment}</p> 
      <p class="text-black ms-2 reply" onclick="reply('${item.id}')">Reply</p>
      <div id="replyText-${item.id}"></div>`;
  if (parentId === null) {
    container.appendChild(div);
  } else {
    container.appendChild(div);
  }

  if (item.replies && item.replies.length > 0) {
    item.replies.forEach((reply) => {
      commentDiv(reply, item.id);
    });
  }
  console.log(item);
};

const reply = (commentId) => {
  console.log(commentId);
  const existingReplyInput = document.getElementById(`replyInput-${commentId}`);
  if (existingReplyInput) {
    return;
  }
  let replyInput = document.createElement("div");
  replyInput.classList.add("mb-3", "d-flex", "input");
  replyInput.innerHTML = `
        <input type="text" class="form-control" id="replyInput-${commentId}"  placeholder="Add a Reply">
        <span class="ms-3 mt-2 text-primary" onclick="postReply('${commentId}')">Reply</span>`;
  const replyTextDiv = document.getElementById(`comment-${commentId}`);
  console.log("this is" + replyTextDiv);
  if (replyTextDiv) {
    replyTextDiv.insertAdjacentElement("afterend", replyInput);
  }
  console.log(replyTextDiv);
};

const postReply = (commentId) => {
  const replyInput = document.getElementById(`replyInput-${commentId}`);
  const replySpan = replyInput.nextElementSibling;
  const replyinputParent = replyInput.parentElement;
  const replyInput2 = document.getElementsByClassName("input");
  const storedData = JSON.parse(localStorage.getItem("comment")) || [];
  const parentComment = findParentComment(commentId, storedData);
  if (!parentComment.replies) {
    parentComment.replies = [];
  }
  const replyComment = {
    id: replyInput.value,
    comment: replyInput.value,
    parentId: commentId,
    replies: [],
  };
  parentComment.replies.push(replyComment);

  localStorage.setItem("comment", JSON.stringify(storedData));

  let div2 = document.createElement("div");

  div2.innerHTML = `
      <p class="comment post-reply" id="comment-${replyComment.id}">${replyComment.comment}</p> 
      <p class="text-black ms-2 reply" onclick="reply('${replyComment.id}')">Reply</p>
      <div id="replyText-${replyComment.id}"></div>`;

  let replyTextDiv = document.getElementById(`replyText-${commentId}`);
  if (replyTextDiv) {
    replyTextDiv.appendChild(div2);
  }
  console.log(replyInput.nextElementSibling);
  replyInput.remove();
  replySpan.remove();
  replyinputParent.remove();
};

const findParentComment = (commentId, comments) => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const parentComment = findParentComment(commentId, comment.replies);
      if (parentComment) {
        return parentComment;
      }
    }
  }
  return null;
};

const displaydata = () => {
  getData = localStorage.getItem("comment");
  if (getData) {
    let parseData = JSON.parse(getData);
    parseData.forEach((value) => {
      commentDiv(value);
    });
  }
};

const post = () => {
  const storedData = JSON.parse(localStorage.getItem("comment")) || [];
  let comment = {
    id: input.value,
    comment: input.value,
    replies: [],
  };
  storedData.push(comment);
  localStorage.setItem("comment", JSON.stringify(storedData));
  commentDiv(comment);
  input.value = "";
};

displaydata();
