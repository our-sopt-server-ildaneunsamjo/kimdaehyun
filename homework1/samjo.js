Samjo = {
    readMember : (member) => {
        member.forEach(element => {
            console.log(`${element.name}의 나이는 ${element.age}, 별명은 ${element.nickname}`);
        });
    }
}

module.exports = Samjo;