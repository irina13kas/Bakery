document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: ["Пол деревни, за раз", "Полдеревни, зараз", "Пол-деревни, за раз"],
        correct: 0,
        explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
      },
      {
        question: "А эти слова как пишутся?",
        answers: ["Капуччино и эспрессо", "Каппуччино и экспресо", "Капучино и эспрессо"],
        correct: 2,
        explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
      },
      {
        question: "Как нужно писать?",
        answers: ["Черезчур", "Черес-чур", "Чересчур"],
        correct: 2,
        explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
      },
      {
        question: "Где допущена ошибка?",
        answers: ["Аккордеон", "Белиберда", "Эпелепсия"],
        correct: 2,
        explanation: "Верно! Это слово пишется так: «эпИлепсия»"
      }
    ];
  
    let questionIndex = 0;
    let correctAnswers = 0;
    let answeredQuestions = [];
    let questionOrder = [];
  
    const questionBtn = document.getElementById("questionBtn");
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");
    const correctCount = document.getElementById("correctCount");
    const totalQuestions = document.getElementById("totalQuestions");
    const restartQuizBtn = document.getElementById("restartQuizBtn");
  
    // Начать тест
    questionBtn.addEventListener("click", displayQuestion);
    let totalLength = questions.length;
    totalQuestions.innerText = totalLength;
    // Вывод вопроса
    function displayQuestion() {
      if (answeredQuestions.length < totalLength) {
        questionBtn.disabled = true; // Блокируем кнопку после нажатия
  
        // Выбор случайного вопроса
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * totalLength);
        } while (answeredQuestions.includes(randomIndex));
  
        answeredQuestions.push(randomIndex);
        const currentQuestion = questions[randomIndex];
        questionIndex++;
        questionOrder.push(questions[randomIndex]);
  
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question");
  
        const questionText = document.createElement("h3");
        questionText.innerText = `${questionIndex}. ${currentQuestion.question}`;
        questionBlock.appendChild(questionText);
  
        const answersBlock = document.createElement("div");
        answersBlock.classList.add("answers");
  
        const shuffledAnswers = currentQuestion.answers
          .map((answer, index) => ({ answer, index }))
          .sort(() => Math.random() - 0.5);
  
        shuffledAnswers.forEach((item) => {
          const answerBtn = document.createElement("div");
          answerBtn.classList.add("answer");
          answerBtn.innerText = item.answer;
          answerBtn.addEventListener("click", () => handleAnswer(item.index, answerBtn, currentQuestion, questionBlock));
          answersBlock.appendChild(answerBtn);
        });
  
        questionBlock.appendChild(answersBlock);
        quizContainer.appendChild(questionBlock);
      } else {
        displayResult();
      }
    }
  
  // Обработка ответа
  function handleAnswer(selectedIndex, answerBtn, currentQuestion, questionBlock) {
    const answers = questionBlock.querySelectorAll(".answer");
  
    // Проверяем, был ли этот вопрос уже отвечен
    // Добавляем класс answered, чтобы обозначить, что ответ был выбран
    questionBlock.classList.add("answered");
    
    if (selectedIndex === currentQuestion.correct) {
      // Правильный ответ выбран
      answerBtn.classList.add("correct");
      correctAnswers++;
  
      // Показываем пояснение
      const explanation = createExplanation(currentQuestion);
      answerBtn.appendChild(explanation); // Помещаем пояснение в правильный ответ
      // Перемещаем неправильные ответы вниз
      setTimeout(()=>{
      answers.forEach((answer, ind) => {
        if (!answer.classList.contains("correct")) {
          setTimeout(() => {
            answer.classList.add("animate-out");
          }, ind * 500);
        }
      });
    },500);
  
      // Ждем завершения анимации, потом скрываем правильный ответ и пояснение
      setTimeout(() =>{
      setTimeout(() => {
        questionBlock.querySelector(".answers").classList.add("hidden");
        questionBlock.classList.add("correct")
          explanation.classList.add("hidden");
          questionBtn.disabled = false;
  
        setTimeout(() => {
          questionBlock.classList.remove("answered");
          questionBlock.classList.add("collapsed");
        }, 500)}, 500
         ,answerBtn.classList.add("animate-out"),
         explanation.classList.add("animate-out"))
      }, 2000);
    } else {
      // Неправильный ответ выбран
      answerBtn.classList.add("wrong");

         setTimeout(()=>{
         answers.forEach((answer,ind) => {
            setTimeout(() => {
                answer.classList.add("animate-out"); // Применяем анимацию через промежуток времени
              }, ind * 500);});
            },500);


      setTimeout(() => {
      setTimeout(() => {
      questionBlock.classList.remove("answered");
      questionBlock.classList.add("collapsed"); // Разблокируем кнопку после ответа
      }, 1000
      ,questionBlock.querySelector(".answers").classList.add("hidden")
        ,questionBlock.classList.add("wrong")
      ,questionBtn.disabled = false);
    }, 2000);
       // Ждем завершения анимации перемещения вниз
    }
  }
  
  
    // Создание блока с объяснением и правильным ответом
    function createExplanation(currentQuestion) {
      const explanationBlock = document.createElement("div");
      explanationBlock.classList.add("explanation");
  
      const explanation = document.createElement("p");
      explanation.innerText = currentQuestion.explanation;
  
      explanationBlock.appendChild(explanation);
  
      explanationBlock.addEventListener("click", () => {
        explanationBlock.classList.toggle("hidden");
        hideAllExplanations(explanationBlock); // Скрыть другие объяснения, если кликнули
      });
  
      return explanationBlock;
    }
  
    // Скрыть все объяснения
    function hideAllExplanations(except = null) {
      const explanationBlocks = quizContainer.querySelectorAll(".explanation");
      explanationBlocks.forEach((block) => {
        if (block !== except) {
          block.classList.add("hidden");
        }
      });
    }
  
  // Отображение результата
  function displayResult() {
    // Скрываем кнопку "Вопрос"
    questionBtn.classList.add("hidden");
  
    // Показываем кнопку "Пройти тестирование заново"
    restartQuizBtn.classList.remove("hidden");
  
      resultContainer.classList.remove("hidden");
      correctCount.innerText = correctAnswers;
  
      const questionBlocks = quizContainer.querySelectorAll(".question");
  
      questionBlocks.forEach((block, index) => {
          block.addEventListener("click", () => {
            block.classList.remove("collapsed");
              // Скрываем правильные ответы во всех других блоках
              hideAllCorrectAnswersExcept(block);
  
              const explanationBlock = block.querySelector(".correct-answer");
              if (explanationBlock) {
                  explanationBlock.classList.toggle("hidden");
              } else {
                  // Создаем блок с правильным ответом, если его ещё нет
                  const correctAnswerBlock = document.createElement("div");
                  correctAnswerBlock.classList.add("correct-answer");
  
                  const correctAnswer = document.createElement("p");
                  correctAnswer.innerText = `Правильный ответ: ${questionOrder[index].answers[questionOrder[index].correct]}`;
  
                  correctAnswerBlock.appendChild(correctAnswer);
                  block.appendChild(correctAnswerBlock);
              }
          });
      });
  }
  
  // Скрыть все правильные ответы, кроме текущего блока
  function hideAllCorrectAnswersExcept(currentBlock) {
      const allCorrectAnswerBlocks = quizContainer.querySelectorAll(".correct-answer");
      const allQuestionBlocks = quizContainer.querySelectorAll(".question");
  
      allCorrectAnswerBlocks.forEach((block) => {
          if (block.parentElement !== currentBlock) {
              block.classList.add("hidden");
          }
      });
      allQuestionBlocks.forEach((block) => {
          if (block !== currentBlock) {
              block.classList.add("collapsed"); // Сворачиваем блоки, которые не являются текущими
          }
      });
  }
      restartQuizBtn.addEventListener("click", restartQuiz);
  
      // Функция для перезапуска теста
      function restartQuiz() {
          // Сброс всех переменных
          questionIndex = 0;
          correctAnswers = 0;
          answeredQuestions = [];
          questionOrder = [];
          
          questionBtn.classList.remove("hidden");
          // Очистка контейнера с вопросами и результатами
          quizContainer.innerHTML = "";
          resultContainer.classList.add("hidden"); // Скрыть контейнер результатов
  
          // Обновление текста количества правильных ответов
          correctCount.innerText = 0;
  
          // Показать кнопку старта
          questionBtn.disabled = false;
      }
  });