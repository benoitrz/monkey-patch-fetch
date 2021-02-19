const fetch = (resource, init, useNative = false) => {
  if (useNative) return window.fetch(resource, init);
  const data = {
    resource,
    start_time: performance.now(),
  };
  if (init?.method) data.method = init.method;
  if (init?.body) data.payload = init.body;

  return window.fetch(resource, init).then((response) => {
    const clonedResponse = response.clone();
    data.status = clonedResponse.status;
    data.end_time = performance.now();
    clonedResponse.text().then((text) => {
      data.response = text;
      console.log(data);
      // send data for logging
    });
    return response;
  });
};

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

const postSettings = {
  method: "POST",
  body: JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  }),
};

fetch("https://jsonplaceholder.typicode.com/posts", postSettings)
  .then((response) => response.json())
  .then((json) => console.log(json));

fetch("https://jsonplaceholder.typicode.com/todos/1", {}, true)
  .then((response) => response.json())
  .then((json) => console.log(json));
