export default class User {
    constructor(email, password, name, role, token, id) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.token = token;
        this.id = id;
    };
};