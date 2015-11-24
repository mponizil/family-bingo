import _ from 'underscore';

export const PROMPTS = [
  "What did you want to be growing up?",
  "What advice would you give me about X?",
  "Tell me the story of a first date"
];

export const DESSERT120 = [
  'https://i.imgur.com/Du020OR.png',
  'https://i.imgur.com/Y7PdIuJ.png',
  'https://i.imgur.com/JTXBbds.png',
  'https://i.imgur.com/mB8CL5Z.png',
  'https://i.imgur.com/aU0bUhf.png',
  'https://i.imgur.com/QuQ0moH.png',
  'https://i.imgur.com/J4zMYjk.png',
  'https://i.imgur.com/RHQCLao.png'
];

export let USERS = {};
['Ann', 'Bert','Dadla','Davia','Diane','Don','Eliana','Grant','Jan','Jill','Jim','Joey','John','Judy','Katie','Lark','Laurel','Linda','Mary','Misha','Owen','Rachel','Rick','Rob','Rose','Sarah','Sophie','Tommy','Zachary'].forEach((name, i) => {
  USERS[i] = {
    id: i,
    photo200: 'https://i.imgur.com/Rc7KMmq.png',
    photo120: 'https://i.imgur.com/3UDmSuE.png',
    name: name
  };
});

export let BOARDS = {};
Object.keys(USERS).forEach((id) => {
  let others = _.without(Object.keys(USERS), id);
  BOARDS[id] = _.sample(others, 24).map((id) => {
    return {
      userId: id,
      isMarked: false,
      markedImage: _.sample(DESSERT120)
    };
  });
  BOARDS[id].splice(12, 0, {
    userId: -1,
    isMarked: true,
    markedImage: _.sample(DESSERT120)
  });
});
