// node 환경에서 임베디드 방식 적용되지 않음

/* DB 생성 시작 */

let dbName = "광고집행";
// DB를 전역에서 사용하기 위한 변수

const DBRequest = indexedDB.open(dbName, 1);
// 식별자 = indexedDB.open('DB이름', 버전);
// 버전으로 addEventListener('upgradeneeded',function(event){ });를 실행시킬 수 있다.
// 브라우저가 리로드 되면서 버전을 확인하고, 버전이 같지 않을때 실행된다.

DBRequest.addEventListener('success', function(event){
// DB가 생성되면 동작하는 함수
    console.log('success');
    db = event.target.result;
    // 생성된 DB의 ref를 전역변수 db에 담는다
});

DBRequest.addEventListener('error', function(event){
// error 발생 시 실행되는 함수
// opne, upgradeneeded 등 모든 상황의 error에 실행 된다
    const error = event.target.error; 
    console.log('error', error.name);
});


DBRequest.addEventListener('upgradeneeded', function(event){
    // 버전이 업그레이드 될 때 실행 됨.
    console.log('upgradeneeded');

    db = event.target.result;  
    // 생성된 DB의 ref를 전역변수 db에 담는다

    let oldVersion = event.oldVersion;
    // 최초 실행을 판단할 수 있다.
    // .open('db식별자',1) 일 때 event.oldVersion = 0이 나타난다.

    if(oldVersion < 1){
    // 최초 실행 시 objectStore를 생성한다.
    // oldVersion == 0 < 1 [최초실행이면] 이라는 뜻이 된다.
        db.createObjectStore('버스', {keyPath:'id', autoIncrement:true});
        db.createObjectStore('쉘터', {keyPath:'id', autoIncrement:true});
        // object store 생성
        // db.createObjectStore('식별자', {keyPath:'id', autoIncrement:true});
        // keyPath, autoIncrement는 생략 가능하다. [프라이머리 키 생성]
    } 
    /*
        objectStore추가가 필요하다면 if 문과 버전을 이용한다.
        if(oldVersion < 2){
            db.createObjectStore('objectStoreName2', {keyPath:'id', autoIncrement:true});
        }

        if(oldVersion < 3){
            db.createObjectStore('objectStoreName2', {keyPath:'id', autoIncrement:true});
        } 
    */
});

/* DB 생성 종료 */
