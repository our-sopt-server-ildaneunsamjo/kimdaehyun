function greet(){
  console.log('Hello');
}

function timer(){
  setTimeout(()=>{
    console.log('end');
  },3000);
}

function greet2(){
  console.log('이게 먼저 나온다고?');
}

greet();
timer();
greet2(); // 이게 비동기다 자식아~