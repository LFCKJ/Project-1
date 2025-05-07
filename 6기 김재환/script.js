class Calculator{
    $PreviousPreviewPrompt="";
    $CurrentpreviewPrompt="";
    PreviousOperation ="";
    CurrentOperation="";
    constructor($PreviousPreview,$Currentpreview){
        this.$PreviousPreviewPrompt = $PreviousPreview;
        this.$CurrentpreviewPrompt = $Currentpreview;
        
    }

    onPressNumber(number){
        this.$CurrentpreviewPrompt.textContent += number;
        
    }
    onPressOperation(operation){
        console.log(operation);
    }

    onEqual(){}
    onReset(){}
    onDelete(){}

    handlePlus(){}
    handleminus(){}
    handlemultiply(){}
    handledivide(){}
}


// 연산자
const $plus = document.querySelector("[data-btn-plus]");
const $minus = document.querySelector("[data-btn-minus]");
const $multiply = document.querySelector("[data-btn-mutiply]");
const $divide = document.querySelector("[data-btn-divide]");
const $eqaul = document.querySelector("[data-btn-eqaul]");

//$-- 돔 변수이다== equalElement
//AC,DEL
const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");

//숫자,연산자
const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");
//프롬프트
const $PreviousPreview = document.querySelector("[data-previous-preview]");
const $Currentpreview = document.querySelector("[data-current-preview]");

//숫자 선택
$numbers.forEach(($number)=>{
    $number.addEventListener("click",(e)=>{
        calc.onPressNumber(e.target.textContent);
    });
});

//연산자선택
$operations.forEach(($operation)=>{
    $operation.addEventListener("click",(e)=>{
       calc.onPressOperation($operation);
    });
});

// 객체 생성
const calc = new Calculator($PreviousPreview, $Currentpreview);