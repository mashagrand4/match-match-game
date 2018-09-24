window.onload = function () {
    var cards = document.querySelector('#game');
    var menu = document.querySelector('#menu');
    var flipCont = document.querySelector('#flipContainer');
    var time = document.getElementById('timer');
    var selectCardsData = [];
    var selectCardsId = [];
    var cardLevel = 0;
    var cardCount = 0;
    var bgSkirt = 0;
    var openCards = [];
    var cardsIds = [];
    var cardsIds2 = [];
    var timeInterval;
    var sec = 0;
    var min = 0;

    function flip(elem) {
        var myElem = elem.parentNode.parentNode;
        console.log('flip1');
        myElem.classList.add('hover');
        selectCardsData.push(myElem.dataset.card);
        selectCardsId.push(myElem.id);
        if (selectCardsData.length == 2) {
            setTimeout(checked, 1000);
        }
    }

    function flipMenu() {
        flipCont.classList.add("hover");
    }

    function hidder() {
        menu.style.display = 'none';
    }

    function checked() {
        console.log('checked');
        if (selectCardsData.length == 2 && selectCardsData[0] != selectCardsData[1]) {
            for (var j = 0; j < selectCardsId.length; j++) {
                document.getElementById(selectCardsId[j]).classList.remove('hover');
            }
            selectCardsData.length = 0;
            selectCardsId.length = 0;
        }
        else if (selectCardsData.length == 2 && selectCardsData[0] == selectCardsData[1]) {
            for (var i = 0; i < selectCardsId.length; i++) {
                openCards.push(selectCardsId[i]);
            }
            win();
            selectCardsData.length = 0;
            selectCardsId.length = 0;
        }
    }

    function win() {
        if (openCards.length == cardCount) {
            clearTimer();
            alert('Winner!\n'  +  'Your time: ' + min + " : " + sec);
        }
        console.log('winefref');
    }

    function createCardsIds(cardCount) {
        console.log(cardCount);
        for (var i = 1; i <= 16; i++) {
            cardsIds.push(i);
        }
        shuffleCardsIds(cardsIds);
        cardsIds2 = cardsIds.slice(-(cardCount/2));
        cardsIds = cardsIds2.concat(cardsIds2);

    }

    function shuffleCardsIds(cardsIds) {
        for (var i = cardsIds.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = cardsIds[i];
            cardsIds[i] = cardsIds[j];
            cardsIds[j] = tmp;
        }
    }

    function timer() {
        timeInterval = setInterval(function () {
            formatTime();
        }, 1000);
        function formatTime() {
            if (sec >= 0 && sec <= 9) {
                time.innerHTML = '0' + min + " : 0" + sec++;
            } else {
                time.innerHTML = '0' + min + " : " + sec++;
            }
            if (sec > 59) {
                min++;
                sec = 0;
            }
        }
    }

    function clearTimer(){
        clearInterval(timeInterval);
        time.innerHTML = '';
    }

    function create(cardCount, bgSkirt) {
        timer();
        cards.style.display = 'block';
        createCardsIds(cardCount);
        shuffleCardsIds(cardsIds);
        for (var k = 0; k < cardCount; k++) {
            var flip_container = document.createElement("div");
            var flipper = document.createElement("div");
            var frontSide = document.createElement("div");
            var backSide = document.createElement("div");

            flip_container.classList.add("flip-container");
            flipper.classList.add("flipper");
            frontSide.classList.add("front", bgSkirt);
            backSide.classList.add("back");
            backSide.classList.add('front' + cardsIds[k]);
            console.log('dfgfdfvd' + cardsIds[k]);

            flipper.appendChild(frontSide);
            flipper.appendChild(backSide);
            flip_container.appendChild(flipper);
            console.log(cardsIds[k]);
            flip_container.setAttribute('data-card', '' + cardsIds[k]);
            flip_container.setAttribute('id', 'card' + k);

            cards.appendChild(flip_container);


        }
    }

    cards.addEventListener('click', function (e) {
        flip(e.target);
        console.log('sobitie');
    });

    var btns = document.getElementsByClassName("btn-next");
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            cardLevel = this.dataset.level;
            cardCount = this.dataset.count;
            console.log(cardCount);
            flipMenu();
        };
    }
    var btn = document.getElementsByClassName("btn-restart");
    btn[0].onclick = function () {
        flipCont.classList.remove('hover');
        cards.innerHTML = '';
        cards.style.display = 'none';
        menu.style.display = 'block';
        clearTimer();
        selectCardsData = [];
        selectCardsId = [];
        cardLevel = 0;
        cardCount = 0;
        bgSkirt = 0;
        openCards = [];
        cardsIds = [];
        cardsIds2 = [];
    };

    var cardSkirts = document.getElementsByClassName("skirts");
    for (var j = 0; j < cardSkirts.length; j++) {
        cardSkirts[j].onclick = function (e) {
            e.preventDefault();
            bgSkirt = this.dataset.bg;
            hidder();
            create(cardCount, bgSkirt);
        };
    }
};
