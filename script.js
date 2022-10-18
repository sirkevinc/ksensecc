const BASE_API_ENDPOINT = 'https://jsonplaceholder.typicode.com'
const USER = 'user'
const POST = 'post'

// Objectives
// Display each User in a table
// User table diplays all posts by that user when selected
// Design

const getUsers = async () => {
    const response = await fetch(`${BASE_API_ENDPOINT}/users`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
    }
    const users = await response.json();
    return users;
}

const getUserPosts = async (userId) => {
    const response = await fetch(`${BASE_API_ENDPOINT}/posts?userId=${userId}`);
    const posts = await response.json();
    return posts;
}

const clickHelper = (userId, name) => {
    displayUserPosts(userId, name);
}

const displayUsers = async() => {
    const users = await getUsers();
    const userTable = document.getElementById("user-table");
    users.forEach((user) => {
        const { id, name } = user;
        const userRow = document.createElement("tr");
        const userFullName = document.createElement("td");
        const userId = document.createElement("td");
        userRow.addEventListener("click", () => clickHelper(id, name));
        userRow.classList.add("user-row");
        userFullName.innerHTML = name;
        userId.innerHTML = id;
        userRow.appendChild(userFullName);
        userRow.appendChild(userId);
        userTable.appendChild(userRow);
    })
}

const displayUserPosts = async(userId, name) => {
    const posts = await getUserPosts(userId);
    const postsDiv = document.getElementById("users-posts");
    const postsDivHeader = document.createElement("h2");
    const postsList = document.createElement("ul");
    postsList.classList.add("posts-list");
    postsDivHeader.innerHTML = `${name}'s Posts:`;
    posts.forEach((post) => {
        const { title, body } = post;
        const postListItem = document.createElement("li");
        const postDiv = document.createElement("div");
        const postTitle = document.createElement("h3");
        const postBody = document.createElement("p");
        postTitle.innerHTML = title;
        postBody.innerHTML = body;
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postBody);
        postDiv.classList.add("post");
        postListItem.appendChild(postDiv);
        postsList.appendChild(postListItem);
    })
    postsDiv.innerHTML = '';
    postsDiv.appendChild(postsDivHeader);
    postsDiv.appendChild(postsList);
}

displayUsers();
getUserPosts();

