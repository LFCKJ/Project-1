class Calculator {
  $PreviousPreviewPrompt = "";
  $CurrentpreviewPrompt = "";
  PreviousOperation = "";
  CurrentOperation = "";
  justEvaluated = false; // 계산 직후 여부를 추적

  constructor($PreviousPreview, $Currentpreview) {
    this.$PreviousPreviewPrompt = $PreviousPreview;
    this.$CurrentpreviewPrompt = $Currentpreview;
  }

  onPressNumber(number) {
    // 이전에 계산을 완료한 상태라면 새 입력 시 초기화
    if (this.justEvaluated) {
      this.$CurrentpreviewPrompt.textContent = "";
      this.justEvaluated = false;
    }

    if (number === ".") {
      if (this.$CurrentpreviewPrompt.textContent === "") {
        this.$CurrentpreviewPrompt.textContent = "0.";
      } else if (!this.$CurrentpreviewPrompt.textContent.includes(".")) {
        this.$CurrentpreviewPrompt.textContent += number;
      }
      return;
    }

    this.$CurrentpreviewPrompt.textContent += number;
  }

  onPressOperation(operation) {
    if (this.$CurrentpreviewPrompt.textContent !== "") {
      if (this.$PreviousPreviewPrompt.textContent !== "") {
        const result = this.evaluateExpression(
          this.$PreviousPreviewPrompt.textContent + this.$CurrentpreviewPrompt.textContent
        );
        this.$PreviousPreviewPrompt.textContent = result + " " + operation;
      } else {
        this.$PreviousPreviewPrompt.textContent =
          this.$CurrentpreviewPrompt.textContent + " " + operation;
      }
      this.PreviousOperation = operation;
      this.$CurrentpreviewPrompt.textContent = "";
      this.justEvaluated = false;
    } else if (this.$PreviousPreviewPrompt.textContent !== "") {
      const parts = this.$PreviousPreviewPrompt.textContent.split(" ");
      parts[1] = operation;
      this.$PreviousPreviewPrompt.textContent = parts.join(" ");
      this.PreviousOperation = operation;
    }
  }

  onEqaul() {
    const expression =
      this.$PreviousPreviewPrompt.textContent + this.$CurrentpreviewPrompt.textContent;
    try {
      const result = this.evaluateExpression(expression);

      if (expression.trim() !== "") {
        historyList.push(expression + " = " + result);
        updateHistoryPanel();
      }

      // 계산 결과 잠깐 보여주고 다음 입력 시 초기화되게 유지
      this.$PreviousPreviewPrompt.textContent = "";
      this.$CurrentpreviewPrompt.textContent = result.toString();
      this.PreviousOperation = "";
      this.CurrentOperation = "";
      this.justEvaluated = true;
    } catch (error) {
      this.$CurrentpreviewPrompt.textContent = "Error";
    }
  }

  evaluateExpression(expression) {
    const sanitizedExpression = expression.replace(/÷/g, "/").replace(/×/g, "*");
    return Function(`'use strict'; return (${sanitizedExpression})`)();
  }

  onReset() {
    this.$PreviousPreviewPrompt.textContent = "";
    this.$CurrentpreviewPrompt.textContent = "";
    this.PreviousOperation = "";
    this.CurrentOperation = "";
    this.justEvaluated = false;
  }

  onDelete() {
    if (this.justEvaluated) return; // 계산 후 삭제는 비활성화
    this.$CurrentpreviewPrompt.textContent = this.$CurrentpreviewPrompt.textContent.slice(0, -1);
  }
}

// DOM 요소 연결
const $plus = document.querySelector("[data-btn-plus]");
const $minus = document.querySelector("[data-btn-minus]");
const $multiply = document.querySelector("[data-btn-multiply]");
const $divide = document.querySelector("[data-btn-divide]");
const $eqaul = document.querySelector("[data-btn-eqaul]");
const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");
const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");
const $PreviousPreview = document.querySelector("[data-previous-preview]");
const $Currentpreview = document.querySelector("[data-current-preview]");

const historyListContainer = document.getElementById("history-list");
let historyList = [];

$numbers.forEach(($number) => {
  $number.addEventListener("click", (e) => {
    calc.onPressNumber(e.target.textContent);
  });
});

$operations.forEach(($operation) => {
  $operation.addEventListener("click", (e) => {
    if (e.target.textContent.trim() === "=") {
      calc.onEqaul();
    } else {
      calc.onPressOperation($operation.textContent.trim());
    }
  });
});

$reset.addEventListener("click", () => {
  calc.onReset();
});

$delete.addEventListener("click", () => {
  calc.onDelete();
});

function updateHistoryPanel() {
  historyListContainer.innerHTML = "";
  historyList.slice().reverse().forEach((item) => {
    const entry = document.createElement("div");
    entry.textContent = item;
    historyListContainer.appendChild(entry);
  });
}

const calc = new Calculator($PreviousPreview, $Currentpreview);
