import {connect} from 'net';
import {MessageEventEmitterClient} from './eventEmitterClient.js';

if (process.argv.length < 3) {
  console.log('Please, provide a valid command.');
} else {
  let command = '';
  for (let i = 0; i < process.argv.length - 2; i++) {
    if (i === process.argv.length - 1) { command += process.argv[i + 2]; }
    else { command += process.argv[i + 2] + " "; }
  }

  console.log(command);

  const client = new MessageEventEmitterClient(connect({port: 60300}));

  client.emit('data', command);
  
  client.on('message', (message) => {
    if (message.type === 'ready') {
      console.log(`Connection established.`);
    } else if (message.type === 'commandOutput') {
      console.log(`Execution command ${command}`);
      console.log(`Output: \n${message.output}`);
    } else {
      console.log(`Message type ${message.type} is not valid`);
    }
  });
}