const crypto =require('crypto');
const fs = require('fs');

const encrypt = (salt,password) => {
  crypto.pbkdf2(password, salt.toString(),1,32,'sha512',(err,derivedKey)=>{
    if(err) throw err;
    const hashed=derivedKey.toString('hex');
    console.log('salt : ',salt);
    console.log('hashed : ',hashed);

    fs.writeFile(`hashed.txt`,hashed,(err,hashed)=>{
      if(err) throw console.log(err.message);
      console.log(`hashed.txt 에 입력 완료`);
    })
  })
}

fs.readFile(`password.txt`,(err,data)=>{
  if(err) return console.log(err.message);
  console.log(`password.txt 파일에는 다음의 데이터가 있습니다.
  ${data}`);
  const password = ''
  const salt = crypto.randomBytes(32).toString('hex');

  encrypt(salt,password);
})




