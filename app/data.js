import _ from 'underscore';

export const PROMPTS = [
  "What do you want to be when you grow up?",
  "Tell me the story of a first date OR (if you haven't had a first date) what would you like to do?",
  "Have you ever done anything illegal?",
  "Tell me about an adventure from your life.",
  "What's something you did this past year that you're proud of?",
  "If you had to eat one kind of food for every meal, what would you choose?",
  "When you're alone, do you ever make funny faces in the mirror?",
  "What would your ideal job look like?",
  "What's your favorite activity?",
  "Do you feel like your family persona is different from your friends persona? If so, in what way?",
  "If you had a super power, what would it be?",
  "If you could time travel, where would you go and what would you do?",
  "Are there any TV shows that you like (or liked)?",
  "In what ways do you think you're creative?",
  "If you could live anywhere, where would you live and what would your dwelling look like?"
];

export const DESSERT120 = [
  'https://i.imgur.com/Du020OR.png',
  'https://i.imgur.com/Y7PdIuJ.png',
  'https://i.imgur.com/JTXBbds.png',
  'https://i.imgur.com/mB8CL5Z.png',
  'https://i.imgur.com/aU0bUhf.png',
  'https://i.imgur.com/QuQ0moH.png',
  'https://i.imgur.com/J4zMYjk.png',
  'https://i.imgur.com/RHQCLao.png',
  'https://i.imgur.com/OvHRqDA.png'
];

export let USERS = {};
[
  ['Ann', ['Married to Bert', 'Sister of Dick and Jean', 'Mother of Rob, Jim, and Donny']],
  ['Anastasia', ['Girlfriend of Rob']],
  ['Bert', ['Married to Ann', 'Father of Rob, Jim, and Donny']],
  ['Dadla', ['Married to Judy', 'Father of Misha and Rose']],
  ['Davia', ['Daughter of Jean and Hal', 'Sister of Eliana, Judy, and Jan', 'Mother of Joey and Sarah']],
  ['Diane', ['Sister-in-law of Jill']],
  ['Donny', ['Son of Ann and Bert', 'Brother of Jim and Rob', 'Father of Tida']],
  ['Eliana', ['Daughter of Jean and Hal', 'Sister of Davia, Judy, and Jan']],
  ['Grant', ['Married to Laurel', 'Father of Rachel and Sophia']],
  ['Jan', ['Daughter of Jean and Hal', 'Sister of Davia, Judy, and Eliana', 'Mother of Katie and Zack']],
  ['Jill', ['Married to Jim', 'Mother of Jessica and Abby']],
  ['Jim', ['Son of Ann and Bert', 'Brother of Donny and Rob', 'Father of Jessica and Abby']],
  ['Joey', ['Daughter of Davia', 'Sister of Sarah']],
  ['John', ['Son of Dick and Linda', 'Father of Owen and Zoe']],
  ['Judy', ['Daughter of Jean and Hal', 'Sister of Davia, Eliana, and Jan', 'Mother of Misha and Rose']],
  ['Katie', ['Daughter of Jan and Rick', 'Sister of Zack']],
  ['Lark', ['Daughter of Diane', 'Niece of Jill']],
  ['Laurel', ['Daughter of Dick and Linda', 'Sister of John', 'Mother of Rachel and Sophia']],
  ['Linda', ['Married to Dick', 'Mother of John and Laurel']],
  ['Mary', ['Married to Donny', 'Mother of Soji and Tida']],
  ['Misha', ['Son of Judy and Dadla', 'Brother of Rose']],
  ['Owen', ['Son of John and Karen', 'Brother of Zoe']],
  ['Rachel', ['Daughter of Laurel and Grant', 'Sister of Sophia']],
  ['Rick', ['Married to Jan', 'Father of Katie and Zack']],
  ['Rob', ['Son of Ann and Bert', 'Brother of Jim and Donny', 'Father of Isabel']],
  ['Rose', ['Daughter of Judy and Dadla', 'Sister of Misha']],
  ['Sarah', ['Daughter of Davia', 'Sister of Joey']],
  ['Sophia', ['Daughter of Laurel and Grant', 'Sister of Rachel']],
  ['Tommy', ['Boyfriend of Rose']],
  ['Zack', ['Son of Jan and Rick', 'Brother of Katie']]
].forEach(([name, taglines], i) => {
  USERS[i] = {
    id: i,
    photo200: `http://bucket.mponizil.com.s3-website-us-east-1.amazonaws.com/family-bingo/200x200/${name.toLowerCase()}.jpg`,
    photo120: `http://bucket.mponizil.com.s3-website-us-east-1.amazonaws.com/family-bingo/120x120/${name.toLowerCase()}.jpg`,
    name: name,
    taglines: taglines
  };
});

export let BOARDS = {};
Object.keys(USERS).forEach((id) => {
  let others = _.without(Object.keys(USERS), id);
  let squares = _.sample(others, 24).map((id) => {
    return {
      userId: id,
      isMarked: false,
      markedImage: _.sample(DESSERT120)
    };
  });
  squares.splice(12, 0, {
    userId: -1,
    isMarked: true,
    markedImage: _.sample(DESSERT120)
  });
  BOARDS[id] = {
    bingoCount: 0,
    squares: squares
  };
});
