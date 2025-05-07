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
        this.$PreviousPreviewPrompt.textContent = 
        this.$CurrentpreviewPrompt.textContent + " " + operation;
        this.$CurrentpreviewPrompt.textContent = "";

        this.PreviousOperation = operation;
    }

    
    handlePlus(){
      return (+this.$PreviousPreviewPrompt.textContent.split(" ")[0] +
          +this.$CurrentpreviewPrompt.textContent); 

    }
    handleMinus(){
        return (+this.$PreviousPreviewPrompt.textContent.split(" ")[0] -
        +this.$CurrentpreviewPrompt.textContent); 
    }
    handleMultiply(){
        return (+this.$PreviousPreviewPrompt.textContent.split(" ")[0] *
        +this.$CurrentpreviewPrompt.textContent); 
    }
    handleDivide(){
        return (+this.$PreviousPreviewPrompt.textContent.split(" ")[0] /
        +this.$CurrentpreviewPrompt.textContent); 
    }

    onReset(){}
    onDelete(){}

    onEqaul(){
        let result = 0;
        if(this.PreviousOperation == "+"){
            result = this.handlePlus();
        }else if(this.PreviousOperation == "-"){
            result = this.handleMinus();
        }else if(this.PreviousOperation == "*"){
            result = this.handleMultiply();
        }else if(this.PreviousOperation == "÷"){
            result = this.handleDivide();
        }
        this.$PreviousPreviewPrompt.textContent = "";
        this.$CurrentpreviewPrompt.textContent = result.toString();
        this.CurrentOperation ="";
    }


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
        if(e.target.textContent.trim() === "="){
            calc.onEqaul();
        }else{
            calc.onPressOperation($operation.textContent.trim());
        }
       //.trim() 공백제거
    });
});

// 객체 생성
const calc = new Calculator($PreviousPreview, $Currentpreview);