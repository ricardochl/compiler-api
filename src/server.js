// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { exec } = require('child_process');
const { execFile } = require('child_process');
const path = require('path');
const SRC_DIR = path.resolve(__dirname, './');
const { c, cpp } = require("compile-run");


//Variables
const PORT = process.env.PORT || 5000;
const compiler = "g++";
const version = "-std=c++17";
const out ="-o";

//Local Imports

const { createFile } = require("./utils");

const app = express();

const ads = [
    {title: 'Hello, world (again)!'}
  ];

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send(ads);
});

app.post('/compile', (req, res) => {
  const sourceCode = req.body.sourceCode;
  const { path, fileName } = createFile("cpp", sourceCode);
  const infile = `${SRC_DIR}/compiler/codes/program.cpp`;
  const outfile = `${SRC_DIR}/compiler/codes/program.out`;
  // exec(`${SRC_DIR}/compiler/comp1 ${SRC_DIR}/compiler/codes/program.cpp`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`error: ${error.message}`);
  //     return res.status(400).send(stderr);
  //   }
  
  //   if (stderr) {
  //     console.error(`stderr: ${stderr}`);
  //     return res.status(400).send(stderr);
  //   }
  //   console.log(`stdout:\n${stdout}`);
  //   return res.send(stdout);
  // });

  exec(`g++ -std=c++17 ${SRC_DIR}/compiler/codes/program.cpp`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      // .replaceAll(`${SRC_DIR}/compiler/codes/`, '')
      return res.status(400).send(stderr.replaceAll(`${SRC_DIR}/compiler/codes/`, ''));
    }
  
    if (stderr) {
      // console.error(`stderr: ${stderr}`);
      return res.status(400).send(stderr);
    }
    console.log(`stdout:\n${stdout}`);
    return res.send(stdout);
  });
  
});

app.post('/translate', (req, res) => {
  const sourceCode = req.body.sourceCode;
  const { path, fileName } = createFile("cpp", sourceCode);
  const infile = `${SRC_DIR}/compiler/cpp-pseudogen/main.cpp`;
  const outfile = `${SRC_DIR}/compiler/codes/program.out`;


  execFile(compiler, [version,infile, out, outfile], (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return res.status(400).send(stderr);
    } else {
      let executable = `./${outfile}`;
      exec(`cd ${SRC_DIR}/compiler/codes && ./program.out`, {maxBuffer: 1024 * 500},(error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return res.status(400).send(stderr);
        } 
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(400).send(stderr);
        }

        // console.log(`stdout:\n${stdout}`);
        return res.status(200).send({
          pseudoCode: stdout
        })
      })
    }
  })
  
});



  
  // starting the server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});