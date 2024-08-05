import { makeObservable, observable, computed, action, runInAction } from 'mobx';
class Service {

    cnt
    services = [];
    temp = [{
        id: 0,
        name: "Matching makeup colors",
        description: "Precise matching of makeup to your face",
        price: 200,
        duration: 60,
        // image:"./../image/image (26).png",
    },
    {
        id: 1,
        name: "Evening makeup for bride",
        description: "This makeup will make you the most beautiful bride",
        price: 1000,
        duration: 70,
        // image:"../../image/closeup-cosmetic-brushes.jpg",
    },
 
    {
        id: 2,
        name: "Purim makeup",
        description: "Purim makeup in the best way",
        price: 150,
        duration: 60,
        // image:"../../image/makeup-brushes-burst-beige-powder-dark-background.jpg"
    }, 
    // {
    //     id: 3,
    //     name: "evening makeup",
    //     description: "This makeup will send you to the event in your most beautiful form",
    //     price: 500,
    //     duration: 60,
    //     // image:"../../image/image (29).png"
    // }
];

    constructor() {
        makeObservable(
            this, {
            services: observable,
            getServices: action,
            addService: action,
            initServices: action,
            cnt: observable
        })
        this.initServices();
    };


    async initServices() {
        // let res = await fetch('http://localhost:8787/services')
        // let data = await res.json();
        // console.log("data.length", data.length)
        // runInAction(() => {
        // if (data.length <5) {
        // if (!(this.cnt > 0)) {
        //     console.log("cnt before change", this.cnt);
        //     this.cnt = 0
        //     console.log("AFTER ZERO", this.cnt);
        // }

        console.log("temp", this.temp);
        this.temp.forEach((s) =>{this.addService(s)
        console.log(s.image)} 
        )
        // }
        // else {
        //     this.services = ({ ...data });
        // }
        // })
    }

    async getServices() {
        const res = await fetch('http://localhost:8787/services')
        const data = await res.json();

        // this.services = tmp
        // console.log("getService", tmp);

        const tmp = Array.from(data)
        runInAction(() => {

            // if (res.status == 200) {
            //     console.log("cnt-before", this.cnt);
            //     this.cnt += 1
            //     console.log("cnt-after", this.cnt);

            // }


            console.log("service-before", tmp);
            this.services = tmp
            console.log("service-after", this.services);
        })

        // this.services = data;
        if (this.services[this.services.length - 1]) {
            console.log("cnt in getServices", this.services[this.services.length - 1]?.id);
            this.cnt = this.services[this.services.length - 1].id + 1
            console.log("cnt after change in get", this.cnt);
        }
        else this.cnt = 0
        console.log("getService-services", this.services);
        // return this.services
        return tmp;
    }


    // async addService(service) {
    //     const services = await this.getServices();
    //     console.log("post service", services);
    //     if (!services.find((s) => {
    //         console.log(s.name)
    //         console.log(service.name)
    //         console.log(s.name === service.name)
    //         return s.name === service.name
    //     })) {
    //         const res = await fetch('http://localhost:8787/service', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(service),

    //         })
    //         const data = await res


    //         this.getServices()
    //         // this.services = await this.getServices()
    //         console.log("post service", this.services);


    //         return data;
    //         // this.services.push({id ,name,image,description,price})
    //     }
    //     // else {
    //     //     console.log("post service exists", service);
    //     // }
    // }
    async addService(service) {
        const services = await this.getServices();
        console.log("post service", services);
        if (!services.find((s) => s.name === service.name)) {
            const res = await fetch('http://localhost:8787/service', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(service),
            });
            const data = await res;
            runInAction(() => {
                this.services.push(service);
                this.getServices()
            });
            return data;
        }
    }
    
}

export default new Service();