const fetch = async (resource, init, useNative = false) => {
  if (useNative) return window.fetch(resource, init);
  const data = {
    resource,
    startTime: performance.now(),
  };
  if (init?.method) data.method = init.method;
  if (init?.body) data.payload = init.body;

  const response = await window.fetch(resource, init);
  const clonedResponse = response.clone();
  data.status = clonedResponse.status;
  data.endTime = performance.now();
  clonedResponse.text().then((text) => {
    data.response = text;
    console.log(data);
    // send data for logging
  });
  return await response.json();
};

(async () => {
  await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const postSettings = {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
  };
  await fetch("https://jsonplaceholder.typicode.com/posts", postSettings);
  await fetch("https://jsonplaceholder.typicode.com/todos/1", {}, true);
})();
