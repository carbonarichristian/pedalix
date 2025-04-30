const finish_btn = document.getElementById("finish-button");
const prev_btn = document.getElementById("prev-button");
const next_btn = document.getElementById("next-button");

const quiz_form = document.querySelector("#quizForm");
const answers = {};

let current_question_id = 0;

quiz_form.addEventListener("change", updateAnswers);
function updateAnswers(event) {
  console.log(event.target);
  const { name, value } = event.target;
  answers[name] = value;
  if (value == "bike") {
    current_question_id = 1;
  } else if (value == "equipment") {
    current_question_id = 2;
  } else {
    current_question_id += 2;
  }
  console.log(answers);
}

function updateButtonStates(id) {
  console.log(id);

  if(id == 0) {
    prev_btn.disabled = true;
    next_btn.style.display = "inline-block";
    finish_btn.style.display = "none";
  } else if(id == 3 || id == 2) {
    prev_btn.disabled = false;
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
  displayQuestion(current_question_id);
  updateButtonStates(current_question_id);
});

prev_btn.addEventListener("click", function () {
  current_question_id = 0;
  displayQuestion(current_question_id);
  updateButtonStates(current_question_id);
});

function displayQuestion(id) {
  const current_question = questions[id];
  const question_container = document.querySelector(`.container`);
  console.log(question_container);
  let questionHTML = `
    <h2>${id + 1}) ${current_question.text}</h2>
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

function showResult(answers) {
  const productUrls = {
    "trail-bike": "/products/hybrid-bike",
    "mountain-bike-red": "/products/red-mountain-bike",
    "mountain-bike-black": "/products/black-mountain-bike",
    "mountain-bike-blue": "/products/blue-mountain-bike",
    "mountain-bike-yellow": "/products/yellow-mountain-bike",
    "bike-water-bottle": "/products/bike-water-bottle",
    "red-helmet": "/products/copy-of-gold-helmet"
  };

  console.log(answers);
  let redirectUrl = "";

  if (answers.product_type == "equipment") {
    console.log("Redirecting to equipment");
    console.log(answers.equipment_type);
    redirectUrl = productUrls[answers.equipment_type];
  } else if (answers.product_type == "bike") {
    console.log("Redirecting to bikes");
    if (answers.bike_type == "hybrid") {
      console.log("Redirecting to hybrid bike");
      redirectUrl = productUrls["trail-bike"];
    } else if (answers.bike_type == "mountain") {
      console.log("Redirecting to mountain bike");
      redirectUrl = productUrls[`mountain-bike-${answers.color}`];
    }
  }
  console.log(redirectUrl);
  window.location.href = redirectUrl; // or use window.location.assign(redirectUrl)
}


updateButtonStates(current_question_id);
displayQuestion(current_question_id);

finish_btn.addEventListener("click", () => { showResult(answers)});
