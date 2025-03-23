const finish_btn = document.getElementById("finish-button");
const prev_btn = document.getElementById("prev-button");
const next_btn = document.getElementById("next-button");

const quiz_form = document.querySelector("#quizForm");
const answers = {};

let current_question_index = 0;

quiz_form.addEventListener("change", updateAnswers);
function updateAnswers(event) {
  const { name, value } = event.target;
  answers[name] = value;
  console.log(answers);
}

function updateButtonStates(index) {
  console.log(index);

  if(index == 0) {
    prev_btn.disabled = true;
    finish_btn.style.display = "none";
  } else if(index == 2) {
    next_btn.style.display = "none";
    finish_btn.style.display = "inline-block";

  } else {
    prev_btn.disabled = false;
    next_btn.style.display = "inline-block";

    next_btn.disabled = false;
    finish_btn.style.display = "none";
  }

}

next_btn.addEventListener("click", function () {
  current_question_index++;
  displayQuestion(current_question_index);
  updateButtonStates(current_question_index);
});

prev_btn.addEventListener("click", function () {
  current_question_index--;
  displayQuestion(current_question_index);
  updateButtonStates(current_question_index);
});

function displayQuestion(index) {
  const current_question = questions[index];
  const question_container = document.querySelector(`.container`);
  console.log(question_container);
  let questionHTML = `
    <h2>${index + 1}) ${current_question.text}</h2>
    <div class="label-container">
      ${current_question.options.map(option => `
        <input type="radio" id="${option.value}" name="${current_question.name}" value="${option.value}">
        <label for="${option.value}">
          <div class="img-wrap">
            <img src="${option.img}">
          </div>
          <span>${option.label}</span>
        </label>
      `).join('')}
    </div>
  `;

  question_container.innerHTML = questionHTML;

  // Pre-select answer if available
  const selectedAnswer = answers[current_question.name];
  if (selectedAnswer) {
    const selectedRadio = document.querySelector(`input[name="${current_question.name}"][value="${selectedAnswer}"]`);
    if (selectedRadio) {
      selectedRadio.checked = true;
    }
  }
}

updateButtonStates(current_question_index);
displayQuestion(current_question_index);

finish_btn.addEventListener("click", function () {
  // Handle form submission or perform any necessary actions
  console.log("Form submitted with answers:", answers);
});
