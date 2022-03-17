const fs = require('fs');

// Byte 파일 읽기
const readByteFile = (path) => { 
  const data = fs.readFileSync(path);
  return data;
}

// 텍스트 파일 읽기
const readTextFile = (path) => { 
  const data = fs.readFileSync(path, "utf8");
  return data;
}

module.exports = { readByteFile, readTextFile };


