import { makeObservable, observable, action, runInAction } from 'mobx';

class Business {
  details = {};

  constructor() {
    makeObservable(this, {
      details: observable,
      init: action,
      postBusiness: action,
    });
    this.init();
  };

  async init() {
    try {
      const storeData = localStorage.getItem('details');
      if (storeData) {
        runInAction(() => {
          this.details = JSON.parse(storeData);
        });
      } else {
        const res = await fetch('http://localhost:8787/businessData');
        const data = await res.json();
        runInAction(() => {
          this.details = data || {};
          localStorage.setItem('details', JSON.stringify(this.details));
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postBusiness(data) {
    try {
      const res = await fetch('http://localhost:8787/businessData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // const responseData = await res.json();
      runInAction(async () => {
        if (res.status == 200) {
          this.details = { ...data };
          localStorage.setItem('details', JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error posting business data:', error);
    }
  }
}

export default new Business();
