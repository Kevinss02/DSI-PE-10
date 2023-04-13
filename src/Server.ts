import net from "net";
import { spawn } from "child_process";
import {MessageEventEmitterClient} from './eventEmitterClient.js';

net.createServer((connection) => {
    console.log("A client has connected.");

    connection.write(JSON.stringify({ type: "ready" }) + "\n");

    let commandString = '';
    connection.on("data", (dataJSON) => {
      commandString = dataJSON.toString();
      console.log(commandString);
    });

    const command = spawn("cat", ["-n", "a.txt"]); // CommandString here

    let output = "";
    command.stdout.on("data", (piece) => {
      output = piece.toString();
    });

    command.on("close", () => {
      connection.write(
        JSON.stringify({
          type: "commandOutput",
          output: output,
        }) + "\n"
      );
    });

    connection.on("close", () => {
      console.log("A client has disconnected.");
    });
  })
  .listen(60300, () => {
    console.log("Waiting for clients to connect.");
  });
