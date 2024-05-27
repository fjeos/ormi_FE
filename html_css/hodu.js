/* picsum에서 이미지를 불러오는 부분
* show more을 누를 때마다 limit만큼 호출하고
* 5번 반복하면
* "Continue Exploring Hodu" 텍스트와 show more 버튼을 없앰
*/
const btn = document.querySelector("#show");
const before = document.querySelector("ul");
const text = document.querySelector(".more-hodu")
let pageToPatch = 1;
let countMore = 1;

btn.addEventListener("click", () => {fetchImages(pageToPatch += 1)});

async function fetchImages(page){
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=6`);

        // 제이슨 데이터를 자바스크립트 객체로 파싱
        const images = await response.json();
        images.forEach((image) => {
            before.insertAdjacentHTML('beforeend', `<li><img alt="" src="${image.download_url}" class="each-img"></li>`);
        });
        countMore += 1;
        if(countMore === 5){
            text.style.display="none";
        }
    }
    catch(error) {
        console.error(`error: ${error}`);
    }
}

/* 지도를 그리는 부분
* 지도 위에 장소를 표시하는 마커와
* 지도 타입(지도/스카이뷰)선택 버튼,
* 확대/축소 스크롤을 그림*/
window.onload = function() {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.442427, 126.571476), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 마커가 표시될 위치입니다
    const markerPosition  = options.center;

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
}


/* form의 입력을 제어하는 부분
* 이메일의 형식을 정규표현식으로 검증하고, 일치하지 않으면 alert로 알려줌
* 일치하면 모달을 띄우고 input box 비움 */
const modal = document.querySelector('.modal-bg');
const subscribe = document.querySelector('#open-modal');
const email = document.querySelector("input");
const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
function openModal(event){
    event.preventDefault();
    console.log(regex.test(email.value));
    if (regex.test(email.value)){
        modal.style.display="block";
        email.value = null;
        subscribe.disabled = true;
        email.disabled = true;
        // 모달이 닫혔을 때 스크롤을 비활성화 한다.
        document.body.style.cssText = `
        position:fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        `;
    }
    else{
        alert("이메일 주소가 형식에 맞지 않습니다.");
    }
}
subscribe.addEventListener("click", (event) => {
    openModal(event);
});

const close = document.querySelector('#close-modal');
close.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display="none";
    subscribe.disabled = false;
    email.disabled = false;

    // 모달이 닫혔을 때 스크롤을 활성화 한다.
    const scrollY = document.body.style.top;
    document.body.style.cssText = `
         margin: 0;
         width: 100%;
         height: 100%;`
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
});

email.addEventListener("keydown", (event)=> {
    if(event.key === 'Enter'){
        openModal(event);
    }
});


/* 페이지 상단으로 올라가는 버튼을 구현한 부분
* 화살표 이미지에 마우스를 올리면 화살표가 진한 이미지로 바뀌고,
* 내리면 다시 회색 화살표로 바뀜*/
const mouse = document.querySelector(".hover");
mouse.addEventListener("mouseover", () =>{
    mouse.setAttribute("src", "img/hover2.svg");
});
mouse.addEventListener("mouseout", () => {
    mouse.setAttribute("src", "img/hover.svg");
});


