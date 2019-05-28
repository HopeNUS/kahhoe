let names = ["deborah", "desire", "ethan", "glenn", "hills", "joanne", "liz", "thomas", "yonghuey", "zeke", "zhonghao"];
const msgDir = "messages/";
const imgDir = "images/";
const domParser = new DOMParser();

function domFromString(domString) {
    return domParser.parseFromString(domString, 'text/html').body.firstChild;
}

function makeCardImageDom(name) {
    return domFromString(`<div class = "image">
                <img src="images/${name}.jpeg"/>
            </div>`);
}

function makeCardNameDom(name) {
    return domFromString(`<div class = "name">${name}</div>`);
}

function makeCardMessageDom() {
    return domFromString(`<div class = "message"></div>`);
}

function makeCardDom(cardImgDom, cardNameDom, cardMsgDom) {
    let cardDom = document.createElement("div");
    cardDom.classList.add("card");
    cardDom.appendChild(cardImgDom);
    let contentDom = document.createElement("div");
    contentDom.classList.add("content");
    contentDom.appendChild(cardNameDom);
    contentDom.appendChild(cardMsgDom);
    cardDom.appendChild(contentDom);
    return cardDom;
}

function paragraphData(data) {
    let pData = "";
    data.split('\n').forEach(str => {
        if (!str) return;
        pData += `<p>${str}</p>`;
    });
    return pData;
}

window.onload = () => {
    names = names.sort();
    let promises = [];
    const cardsDom = document.getElementById("cards");
    let messages = {}
    names.forEach(name => {
        const cardImgDom = makeCardImageDom(name);
        const cardNameDom = makeCardNameDom(name);
        messages[name] = makeCardMessageDom();
        const cardDom = makeCardDom(cardImgDom, cardNameDom, messages[name]);
        cardsDom.appendChild(cardDom);
    });

    names.forEach(name => {
        const msgFileName = msgDir + name + ".txt";
        const imgFileName = imgDir + name + ".jpg";
        console.log(msgFileName, imgFileName);
        $.get(msgFileName, (data) => {
            pData = paragraphData(data);
            messages[name].innerHTML = pData;
        });
    })
}