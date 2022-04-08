const { existsSync, mkdirSync, writeFileSync } = require("fs");
const path = require("path");
const SRC_DIR = path.resolve(__dirname, './');

function createFile(ext, content){
    if (!existsSync(`${SRC_DIR}/compiler/codes`)) {
        mkdirSync(`${SRC_DIR}/compiler/codes`);
      } else {
        // if (!existsSync(`./codes/${ext}`)) {
        //   mkdirSync(`./codes/${ext}`);
        // }
      }
      const fileName = "program";
      const filePath = `${SRC_DIR}/compiler/codes`;
      writeFileSync(filePath + "/" + fileName + "." + ext, content);
      return { path: path.resolve(`./compiler/codes/${ext}`), fileName: fileName };
}

module.exports = { createFile }