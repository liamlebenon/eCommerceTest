const User = class {
    constructor(userId, username, password) {
        this.userId = userId;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;