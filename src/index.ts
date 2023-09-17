import EnvManager from "./EnvManager";
import { createServer } from "./server";

const server = createServer();

const port = EnvManager.getPort(3001);

const helloWorld = EnvManager.getHelloWorld("Hi There");
console.log(helloWorld);

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
