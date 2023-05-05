const emoji_1 = document.querySelector("#cell-1");
const emoji_2 = document.querySelector("#cell-2");
const emoji_3 = document.querySelector("#cell-3");

const play_btn = document.querySelector("#play-btn");
const jackpot_btn = document.querySelector("#jackpot-btn");
const reset_btn = document.querySelector("#reset-btn");

const move = document.querySelector("#moves");
const score = document.querySelector("#score");
const statement = document.querySelector("#statement");

const playSound = document.querySelector("#play-sound");
const jackpotSound = document.querySelector("#jackpot-sound");

let scores = 0;
let moves = 0;

const reset = () => {
  scores = 0;
  moves = 0;

  score.textContent = scores;
  move.textContent = 0;
  statement.textContent = "";

  emoji_1.textContent = "🤑";
  emoji_2.textContent = "🤑";
  emoji_3.textContent = "🤑";
};

const randomEmoji = () => {
  let arr = ["😎", "🤑", "🎁", "🎉"];
  return arr[Math.ceil(Math.random() * arr.length - 1)];
};

const my_confetti = () => {
  const default_confetti = {
    particleCount: 140,
    spread: 120,
    ticks: 90,
  };
  confetti({
    ...default_confetti,
    angle: 45,
    origin: { y: 1, x: 0 },
  });
  confetti({
    ...default_confetti,
    angle: 135,
    origin: { y: 1, x: 1 },
  });
  jackpotSound.play();
};

const gen_emojis = () => [randomEmoji(), randomEmoji(), randomEmoji()];

const matching_emojis = (...nums) => {
  switch (new Set(nums).size) {
    case 1:
      my_confetti();
      return 1;

    case 2:
      return 2;

    default:
      return 0;
  }
};

const run_the_machine = () => {
  const nums = gen_emojis();
  let result = matching_emojis(...nums);

  moves++;
  move.textContent = moves;

  emoji_1.textContent = nums[0];
  emoji_2.textContent = nums[1];
  emoji_3.textContent = nums[2];

  return [result, nums];
};

const give_me_jackpot = () => {
  reset();
  let jackpot_hit = [];
  score.textContent = "Unavailable in jackpot mode";

  while (!(jackpot_hit[0] == 1) && moves < 101) {
    jackpot_hit = run_the_machine();
  }

  if (jackpot_hit[0] == 1) {
    statement.textContent = `You hit the jackpot after ${moves} moves and your lucky emoji is ${jackpot_hit[1][0]}`;
  } else {
    statement.textContent =
      "today is your bad day.. we have tried 101 times but ur luck sucks..";
  }
};

const play = () => {
  let result = run_the_machine();
  playSound.play();

  switch (result[0]) {
    case 1:
      scores += 100;
      statement.textContent = "Congratulations you hit the jackpot";
      break;

    case 2:
      scores += 10;
      statement.textContent = `You hit 2 same emojis`;
      break;

    default:
      scores += 0;
      statement.textContent = "Nothing matched.. Try again";
      break;
  }

  score.textContent = `${scores}`;
};

reset_btn.addEventListener("click", (e) => {
  e.preventDefault();
  reset();
});

play_btn.addEventListener("click", (e) => {
  e.preventDefault();
  play();
});

jackpot_btn.addEventListener("click", (e) => {
  e.preventDefault();
  give_me_jackpot();
});
