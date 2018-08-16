module.exports = class DoingQuestion {

  ask(answer){
    return {
      type: "list",
      name: "doing",
      message: "What do you want to do?",
      choices: [
        "initial setup",
        MainChoices.CREATE_BANNER,
        {
          name: MainChoices.ADD_CONTENT,
          disabled: 'in development'
        },
      ]
    }
  }

  validate(answer) {
    return Object.keys(answer).length === 0
  }
};
