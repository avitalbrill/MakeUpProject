import { makeObservable, observable, computed, action, runInAction } from 'mobx';

class Login_Admin {
    status = 0
    login = {
        name: "admin",
        password: "123456"
    }

    constructor() {
        makeObservable(this, {
            login: observable,
            postLogin: action,
            status: observable,
        })
    }

    async postLogin(log) {
        const res = await fetch('http://localhost:8787/login', {
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data=res
        return data;
        // { res.status === 200 ? this.status = 200 : this.status = 400 }
       
    }
}
export default new Login_Admin();
