/**
 * This script will be invoked by Docker to check the liveness of the server
 */

import http from 'http'
import Config from '~/config'

const client = http.request({
  host  : 'localhost',
  port  : Config.port,
  path  : '/ping',
  method: 'GET',
})

const error = () => process.exit(1);

let data = '';
client.on('data', d => data += d);
client.on('end', () => {
  if(data === 'pong') process.exit(0);
  console.log('data not pong:', data);
  error();
})
client.on('error', error)
client.on('abort', error)
client.on('timeout', error)


// End the request body
// such that the request 
// will be fired
client.end();