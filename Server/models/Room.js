class Room {
    constructor(roomCode, combinedQuiz, timerDuration) {
        this.roomCode = roomCode;
        this.users = []; // Stores users as { name, socketId }
        this.messages = [];
        this.activity = [];
        this.quiz = combinedQuiz;
        this.quiz_started = false;
        this.current_question = 0;
        this.answers = {};
        this.correct_answers = {};
        this.timer_duration = timerDuration;
    }

    addMember(name, socketId) {
        if (!this.getNameBySocketId(socketId)) { // Prevent duplicate entries
            this.users.push({ name, socketId });
        }
    }

    removeMember(name) {
        const userIndex = this.users.findIndex(user => user.name === name);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

    getSocketIdByName(name) {
        const user = this.users.find(user => user.name === name);
        return user ? user.socketId : null;
    }

    getNameBySocketId(socketId) {
        const user = this.users.find(user => user.socketId === socketId);
        return user ? user.name : null;
    }

    startQuiz() {
        this.quiz_started = true;
        this.current_question = 0;
    }

    nextQuestion() {
        this.current_question++;
    }

    submitAnswer(name, answer) {
        if (!this.answers[name]) {
            this.answers[name] = [];
        }
        this.answers[name].push(answer);
    }

    updateCorrectAnswers(name, score) {
        if (!this.correct_answers[name]) {
            this.correct_answers[name] = 0;
        }
        this.correct_answers[name] += score;
    }
}

export default Room;
