var obg = {}; //빈객체

obg.width = 20; //프로퍼티로 width,height 값 줌
obg.height = 30;
obg.area = function(){ //area 라는 메서드를 생성
    console.log(obg.width * obg.height);
}

obg.area();

//컨택스트 개념도 이해 필요(컨택스트 뭔지?)

//object가 가지고 있는 구성요소
//constructor, prototype property toString() isPrototypeOf() hasOwnProperty().. 이런 메서드들 있음.