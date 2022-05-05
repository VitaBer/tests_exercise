const { expect } = require("expect");
const fetch = require("node-fetch");

test('Third test - check if the post with a title exists', async () => {
    // Check that a post exists with the title "qui est esse".

    const response = await fetch('https://jsonplaceholder.typicode.com/posts?title=qui est esse');
    const posts = await response.json();
    await expect(posts.length).toBeGreaterThan(0);
}, 30000);

test('Third test - add a new user', async () => {
    // Add a new user and specify a name, username and email.
    
    const url = 'https://jsonplaceholder.typicode.com/users';

    const newUser = {
        name: "Jane Doe",
        username: "jdoe2022",
        email: "jdoe2022@gmail.com"
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const createdUser = await response.json();
    await expect(createdUser).toBeDefined();
    await expect(createdUser.id).toBeDefined();
    await expect(createdUser.name).toEqual(newUser.name);
    await expect(createdUser.username).toEqual(newUser.username);
    await expect(createdUser.email).toEqual(newUser.email);
}, 30000);

test('Third test - check endpoint if it does not pass a threshold', async () => {
    //  test for one of the API endpoints that will fail if the response time passes a given threshold.

    const start = performance.now();
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const end = performance.now();

    const elapsedMiliseconds = end - start;

    await expect(elapsedMiliseconds).toBeLessThanOrEqual(200);
}, 30000);
