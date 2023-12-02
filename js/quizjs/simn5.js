const questionElement = document.getElementById("question");
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));
const progressTextElement = document.getElementById("progressText");
const scoreTextElement = document.getElementById("score");
const progressBarFullElement = document.getElementById("progressBarFull");
const instructionElement = document.getElementById("instruction");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let questions = [
  {
    instruction: "もんだい１　< > の　なかの　ことばは　ひらがなで どう　かきますか。１，２，３，４から　いちばん　いい　ものを　ひとつ　えらんで　ください",
    question: "きょうは　いい <天気> ですね",
    choice1: "てんき",
    choice2: "てんち",
    choice3: "でんき",
    choice4: "でんち",
    answer: 1,
  },
  {
    instruction: "もんだい１　< > の　なかの　ことばは　ひらがなで どう　かきますか。１，２，３，４から　いちばん　いい　ものを　ひとつ　えらんで　ください",
    question: "その　はこは　とても　<重い>です",
    choice1: "おそい",
    choice2: "おおい",
    choice3: "とおい",
    choice4: "おもい",
    answer: 4,
  },
  {
    instruction: "もんだい２< > の　なかの　ことばは　どう　かきますか。１，２，３，４から　いちばん　いい　ものを　ひとつ　えらんで　ください",
    question: "きのう　たかい　<ぱそこん>を　かいました",
    choice1: "パンコン",
    choice2: "パンコリ",
    choice3: "パソコン",
    choice4: "パソコリ",
    answer: 3,
  },
  {
    instruction: "もんだい２< > の　なかの　ことばは　どう　かきますか。１，２，３，４から　いちばん　いい　ものを　ひとつ　えらんで　ください",
    question: "その　みせは　<きん>ようびは　やすみです",
    choice1: "全",
    choice2: "金",
    choice3: "合",
    choice4: "会",
    answer: 2,
  },
  {
    instruction: "もんだい３（　　）に　なかが　はいりますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。",
    question: "ゆう（　　）でニュースを　みました",
    choice1: "ボタン",
    choice2: "テレビ",
    choice3: "フォーク",
    choice4: "ギター",
    answer: 2,
  },
  {
    instruction: "もんだい３（　　）に　なかが　はいりますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。",
    question: "コーヒーと　こうちゃと、（　　）が　すきですか",
    choice1: "いつ",
    choice2: "なん",
    choice3: "どこ",
    choice4: "どちら",
    answer: 4,
  },
  {
    instruction: "もんだい４　このもんだいでは　だいたい　おなじ　いみの　ぶんが　あります。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。",
    question: "せんせいは　もう　うちに　かえりました",
    choice1: "せんせいは　まだ　がっこうに　います",
    choice2: "せんせいは　いま　がっこうに　いません",
    choice3: "せんせいは　うちで　しごとを　しません",
    choice4: "せんせいは　ときどき　がっこうに　きます",
    answer: 2,
  },

  {
    instruction: "もんだい４　このもんだいでは　だいたい　おなじ　いみの　ぶんが　あります。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。",
    question: "あいさんは　かなさんに　おもしろい　DVDを　かりました",
    choice1: "かなさんは　あいさんに　おもしろい　DVDを　かしました",
    choice2: "かなさんは　あいに　おもしろい　DVDを　もらいました",
    choice3: "あいさんは　かなさんに　おもしろい　DVDを　かしました",
    choice4: "あいさんは　かなさんに　おもしろい　DVDを　もらいました",
    answer: 4,
  },

  {
    instruction: "もんだい５　（　　　）に　何を　入れますか。１・２・３・４から　いちばん　いい　ものを　一つ　えらんで　ください",
    question: "たべもの（　　　）何が　いちばん　すきですが",
    choice1: "が",
    choice2: "で",
    choice3: "を",
    choice4: "へ",
    answer: 1,
  },

  {
    instruction: "もんだい５　（　　　）に　何を　入れますか。１・２・３・４から　いちばん　いい　ものを　一つ　えらんで　ください",
    question: "うちから　えきまで（　　　）かかりますか",
    choice1: "どうして",
    choice2: "どちら",
    choice3: "どのぐらい",
    choice4: "どのように",
    answer: 3,
  },
  {
    instruction: "もんだい５ ★ に　入る　ものは　どれですか。１・２・３・４から　いちばん　いい　ものを　一つ　えらんで　ください",
    question: "わたしは　日本の ＿　＿　★　＿　が　すきです",
    choice1: "うたう",
    choice2: "うた",
    choice3: "の",
    choice4: "を",
    answer: 1,
  },
  {
    instruction: "もんだい５ ★ に　入る　ものは　どれですか。１・２・３・４から　いちばん　いい　ものを　一つ　えらんで　ください",
    question: "山川さんは ＿　＿　★　＿　しています",
    choice1: "おんがくを",
    choice2: "しゅくだいを",
    choice3: "きき",
    choice4: "を",
    answer: 1,
  },

  {
    instruction: "もんだい５ ★ に　入る　ものは　どれですか。１・２・３・４から　いちばん　いい　ものを　一つ　えらんで　ください",
    image: "Images/COMPN5.JPG",
    question: "山川さんは ＿　＿　★　＿　しています",
    choice1: "おんがくを",
    choice2: "しゅくだいを",
    choice3: "きき",
    choice4: "を",
    answer: 1,
  },
  
  // Add more questions as needed
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length; // Adjust based on the number of questions

startGame = () => {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/end.html");
  }

  currentQuestion = questions[questionCounter];
  questionCounter++;

  updateUI();
  acceptingAnswers = true;
};

updateUI = () => {
  progressTextElement.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFullElement.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  questionElement.innerText = currentQuestion.question;
  instructionElement.innerText = currentQuestion.instruction;

  const imageElement = document.getElementById("questionImage");
  if (currentQuestion.image) {
    imageElement.src = currentQuestion.image;
    imageElement.style.display = "block"; // Show the image
  } else {
    imageElement.style.display = "none"; // Hide the image if no image is present
  }

  const audioElement = document.getElementById("questionAudio");
  if (currentQuestion.audio) {
    audioElement.src = currentQuestion.audio;
    audioElement.style.display = "block"; // Show the audio player
  } else {
    audioElement.style.display = "none"; // Hide the audio player if no audio is present
  }
  

  choicesElements.forEach((choice, index) => {
    choice.innerText = currentQuestion["choice" + (index + 1)];

    
  });
};

choicesElements.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreTextElement.innerText = score;
};

startGame();
