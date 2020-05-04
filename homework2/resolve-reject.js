let isMomHappy = false;
let phone = {
  brand : 'samsung',
  color : 'black'
};

var willGetNewPhone = new Promise((resolve,reject)=> {
  if(isMomHappy){
    resolve(phone);
  }else{
    reject(new Error('mom is not happy'));
  }
});

console.log(willGetNewPhone);