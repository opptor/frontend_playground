export default class Hello {
    constructor(_name) {
        this.name = _name;
    };

    sayHello() {
        console.log(`Hello ${this.name} !`);
    }
}