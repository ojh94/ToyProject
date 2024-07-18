window.onload = function () {
    //createTable(); // 테이블을 생성한 후
    
    //show_card(); // 모든 카드를 순차적으로 뒤집기
    
};


let ran_Number = Array(); // 랜덤 번호 저장
let arr_num = 0; // 랜덤 번호 배열을 읽어오는 변수
let select_cade1_id = ''; //첫번째 카드 선택 아이디
let select_cade2_id = ''; // 두번째 카드 선택 아이디
let Level = 0; //게임의 레벨을 체크하는 함수
let cade_id =Array(); // 카드의 아이디를 보관하는 변수
let score = 0; // 점수를 보관하는 변수
let matchedCards = []; 
let time = 60; //게임시간은 60초
let Row = 2; // 행의 갯수
let column = 2; // 열의 갯수
let sec;



//이미지를 보관하는 변수
const cade_images = ['0.png', '1.png','0.png', '1.png',
    '2.png', '3.png','2.png', '3.png',
    '4.png', '5.png','6.png', '7.png',
    '4.png', '5.png','6.png', '7.png'];

function setlevel1(){
    Row = 2;
    column = 2;
    createTable();
}
function setlevel2(){
    Row = 4;
    column = 4;
    createTable();
}


//카드 덱만들기
function createTable() {
    random_number(Number(Row) * Number(column));
    let cade_count = 0;

    //테이블을 만드는 변수
    let createtable = document.createElement("table");
    // 행의 갯수만큼 반복
    for (let i = 0; i < Row; i++) {
        //tr요소 만들기
        let createRow = document.createElement("tr");
        for (let j = 0; j < column; j++) {
            let createcolumn = document.createElement("td");
            // 이미지 배정 및 아이디 배정            
            const cade_Image = document.createElement('img');
            cade_Image.src = `images/cade_back.png`;
            cade_Image.id = i + 'to' + j;

            cade_id.push(cade_Image.id);
            
             $("#start_manu").hide(); //메뉴를 숨기는 부분
            

            //카드 클릭 이벤트
            cade_Image.addEventListener('click', () => {
                
                if (!matchedCards.includes(cade_Image.id)) { // 이미 매칭된 카드인지 확인
                    if(select_cade1_id === cade_Image.id ){}
                    else{
                        openCard(cade_Image.id);
                    if (select_cade1_id === '') {
                        select_cade1_id = cade_Image.id;
                    } else if (select_cade2_id === '') {
                        select_cade2_id = cade_Image.id;
                        setTimeout(function() { comparison(select_cade1_id, select_cade2_id); }, 1000);
                    }
                }
            }            
            });
            // ↑↑↑↑↑↑↑↑↑↑↑카드 클릭 이벤트↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
            createcolumn.appendChild(cade_Image);
            createRow.appendChild(createcolumn);
        }
        createtable.appendChild(createRow);
        
    }
    let contents = document.querySelector("#contents");
    contents.appendChild(createtable);
    takeTarget(); //시간 갱신
    takescore(); // 점수 갱신
}

//랜덤한 숫자를 뽑아내는 함수
function random_number(num) {
    if (num) {
        for (let i = 0; i < num; i++) {
            ran_Number[i] = ((Math.ceil(Math.random() * num))-1);
            //중복 검사
            for (let j = 0; j < i; j++) {
                if (ran_Number[i] == ran_Number[j]) {
                    i--;
                    break;
                }
            }
        }
    }
}

// 카드를 뒤집는 함수(뒷면 → 앞면)
function openCard(id) {
    document
        .getElementById(id)
        .animate([
            // 키프레임
            {
                transform: "rotateY(180deg)"
            }, {
                transform: "rotateY(0deg)"
            }
        ], {
            // 싱크 옵션
            duration: 1000,
            iterations: 1
        });
        setTimeout(() => {
            change_cade(id);
        }, 500); 
        
}

// 카드의 이미지를 동물로 바꾸는 함수
function change_cade(id) {
    document
        .getElementById(id)
        .src = `images/${cade_images[ran_Number[cade_id.indexOf(id)]]}`;

        
}

// 카드를 뒤집는 함수(앞면 → 뒷면)
function closeCard(id) {
    setTimeout(() => {
    document
        .getElementById(id)
        .src = `images/cade_back.png`;
    }, 500); 

    document
        .getElementById(id)
        .animate([
            // 키프레임
            {
                transform: "rotateY(0deg)"
            }, {
                transform: "rotateY(-180deg)"
            }
        ], {
            // 싱크 옵션
            duration: 1000,
            iterations: 1
        });
}

// 선택한 카드 비교
function comparison(id1, id2) {
    let comparison_cade1 = document
        .getElementById(id1)
        .src;
    let comparison_cade2 = document
        .getElementById(id2)
        .src;

    if (comparison_cade1 === comparison_cade2) { // 동일한 카드를 선택했을 경우 실행
        matchedCards.push(id1, id2); // 매칭된 카드의 ID를 배열에 추가
        score++; //맞을 경우 1점 추가        
        gameover(score);
    } else {        // 다른 카드를 선택했을 경우에는 뒷면으로 
        closeCard(id1);
        closeCard(id2);
    }

    select_cade1_id = '';
    select_cade2_id = '';


}

function show_card() {
    for (let i = 0; i < cade_id.length; i++) {
        setTimeout(() => {
            openCard(cade_id[i]);
        }, i * 1000); // 1초(1000ms) 간격으로 카드 뒤집기
        setTimeout(() => {
            closeCard(cade_id[i]);
        }, cade_id.length*1100); // 

    }
}

function gameover(num) {
    const modal = document.getElementById("myModal");
    if (num == Row || time == 0) {
        time = 60;

        var closeBtn = document.getElementById("closeBtn");

        modal
            .classList
            .toggle("show");

            const remainingfinalscore = document.getElementById("final-score"); 
            remainingfinalscore.innerText = score; // 화면에 점수 표기
            const remainingfinaltime = document.getElementById("final-time"); 
            remainingfinaltime.innerText = sec; // 화면에 시간 표기
            


        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target === restart) {
                modal
                    .classList
                    .remove("show");
                    game_restart();
                    $("#start_manu").show(); //메뉴를 보이는 부분

                    
            }
        });
    }
}


function game_restart() {
    location.reload();

}
//타이머
const takeTarget = () => {
    const remainingSec = document.getElementById("game-time");
    
    setInterval(function () {
        if (time > 0) { // -1 출력방지
            time = time - 1; 
            //let min = Math.floor(time / 60);
            sec = String(time % 60).padStart(2, "0");
            remainingSec.innerText = sec;
        } else {
            gameover(score);
        }
    }, 1000);

    
};

//화면에 점수를 갱신하는 함수
const takescore = () => {
    const remainingscore = document.getElementById("game-score");
    
    setInterval(function () {
        if (score > 0) { // >= 0 으로하면 -1까지 출력된다.
            remainingscore.innerText = score;
        } else {
            
        }
    }, 1);

    
};
