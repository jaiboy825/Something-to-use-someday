window.addEventListener("load",()=>{
    $.getJSON( "/store/store.json",(data)=>{
        let app = new App(data);
        data.forEach((x) => {
            x.cnt = 1;
            //상품들의 초기 갯수값 설정
        });
    });
});

function unComma(str){
    n = parseInt(str.replace(/,/,""));
    return n;
}

class App{
    constructor(product){
        this.product = product;
        //상품
        this.productList = [];
        //장바구니에 담긴 상품 배열
        this.main();
    }
    main(){
        this.product.forEach((x) => {
            let item = this.item(x);
            document.querySelector(".productContainer").appendChild(item);
            $(item).draggable({
                containment : ".storeCenter",
                //움직일 수 있는 범위
                helper : "Clone",
                //드래그를 했을때 그자리에 똑같은 클론을 만들것이냐 아니냐 
                cursor : "pointer",
                //커서 포인터
                cancel : ".productInfo",
                //그 아이템을 잡을때 잡아도 드래그 되지 않는 부분
                revert : true ,
                // 드래그를 하다가 놓았을때 돌아갈 것인가
                drag(){
                    //드래그 하는 도중 바꾸고 싶은거
                },
                stop(){
                    //드래그를 멈추거나 하지 않을때 바꾸고 싶은거

                }
            });
            $(".Goal").droppable({
                accept : ".product",
                drop : (e,ui)=>{
                    let id = ui.draggble[0].dataset.id;
                    //드래그 한 물품의 아이디
                    let item = this.product[id - 1];
                    //물품의 아이디는 product에서 id-1번째에 위치
                    let find = this.productList.find(function (f){
                        return f.id == item.id;
                        //장바구니에 이미 그 상품이 담겨 있는지 아닌지 확인
                    });
                    if(find === undefined) this.dropItem(item);
                    else alert("이미 장바구니에 담긴 상품 입니다.");
                }
            });
        });

        let canvas = document.createElement("canvas");
        //캔버스 생성
        let ctx = canvas.getContext("2d");
        //2d로 만든다
        let width = 400;
        let height  = 300;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "#fff";
        //흰색으로 칠한다
        ctx.fillRect(0,0,width,height);
        //글자를 넣고 싶으면 ctx.fillText("글자",가로값,세로값);
        document.querySelector("넣고싶은데").appendChild(canvas);
    }
    item(x){
        let div = document.createElement("div");
        div.dataset.id = x.id;
        div.classList.add("product");
        div.innerHTML =``; 
        return div;
    }
    dropItem(x){
        let div = document.createElement("div");
        div.classList.add("cartProduct");
        div.innerHTML =``; 
        document.querySelector(".cart").appendChild(div);
    }
}