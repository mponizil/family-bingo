import _ from 'underscore';

export let USERS = {};
['Ann', 'Bert','Dadla','Davia','Diane','Don','Eliana','Grant','Jan','Jill','Jim','Joey','John','Judy','Katie','Lark','Laurel','Linda','Mary','Misha','Owen','Rachel','Rick','Rob','Rose','Sarah','Sophie','Tommy','Zachary'].forEach((name, i) => {
  USERS[i] = {
    id: i,
    photo: 'https://i.imgur.com/YCq1ofL.png',
    name: name
  };
});

export let BOARDS = {};
Object.keys(USERS).forEach((id) => {
  let others = _.without(Object.keys(USERS), id);
  BOARDS[id] = _.sample(others, 24).map((id) => {
    return {
      userId: id,
      isMarked: false
    };
  });
  BOARDS[id].splice(12, 0, {
    userId: -1,
    isMarked: true
  });
});

export let PROMPTS = [
  "What did you want to be growing up?",
  "What advice would you give me about X?",
  "Tell me the story of a first date"
];
