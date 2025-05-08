class Calculator{
    $PreviousPreviewPrompt="";
    $CurrentpreviewPrompt="";
    PreviousOperation ="";
    CurrentOperation="";
    constructor($PreviousPreview,$Currentpreview){
        this.$PreviousPreviewPrompt = $PreviousPreview;
        this.$CurrentpreviewPrompt = $Currentpreview;
        
    }

    onPressNumber(number) {
        // 소수점 입력 처리
        if (number === ".") {
            if (this.$CurrentpreviewPrompt.textContent === "") {
                // 처음 입력이 "."인 경우 "0."으로 시작
                this.$CurrentpreviewPrompt.textContent = "0.";
            } else if (!this.$CurrentpreviewPrompt.textContent.includes(".")) {
                // 현재 입력에 소수점이 없으면 추가
                this.$CurrentpreviewPrompt.textContent += number;
            }
            // 이미 소수점이 있으면 아무 작업도 하지 않음
            return;
        }

        // 숫자 입력
        this.$CurrentpreviewPrompt.textContent += number;
    }

    onPressOperation(operation) {
        // 현재 입력값이 비어 있지 않을 때만 이전 프롬프트에 저장
        if (this.$CurrentpreviewPrompt.textContent !== "") {
            this.$PreviousPreviewPrompt.textContent = 
                this.$CurrentpreviewPrompt.textContent + " " + operation;
            this.PreviousOperation = operation;
            this.$CurrentpreviewPrompt.textContent = ""; // 현재 입력값 초기화
        } else if (this.$PreviousPreviewPrompt.textContent !== "") {
            // 연산자를 연속으로 누를 경우, 마지막 연산자를 업데이트
            const parts = this.$PreviousPreviewPrompt.textContent.split(" ");
            parts[1] = operation; // 연산자만 변경
            this.$PreviousPreviewPrompt.textContent = parts.join(" ");
            this.PreviousOperation = operation;
        }
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
    onReset(){
        this.$PreviousPreviewPrompt.textContent = "";
        this.$CurrentpreviewPrompt.textContent = "";
        this.PreviousOperation = "";
        this.CurrentOperation = "";
    }
    onDelete(){
        this.$CurrentpreviewPrompt.textContent = this.$CurrentpreviewPrompt.textContent.slice(0,-1);
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

$reset.addEventListener("click",(e)=>{
    calc.onReset();
}
);
$delete.addEventListener("click",(e)=>{
    calc.onDelete();
}
);

// 객체 생성
const calc = new Calculator($PreviousPreview, $Currentpreview);

//....키 처음에 사용 못하게 하기 결과값 del키 사용 금지