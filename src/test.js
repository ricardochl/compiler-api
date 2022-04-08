const { exec } = require('child_process');
const path = require('path')

exec('cd ./compiler && ./comp1 ./tests/input14', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
