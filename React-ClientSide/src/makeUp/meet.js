import { makeObservable, observable, computed, action, runInAction } from 'mobx'
import { useState } from 'react';
import Swal from 'sweetalert2'

let IDcnt = 0;

class Meet {

    meets = [];
    constructor() {
        makeObservable(this, {
            meets: observable,
            init: action,
            postMeet: action,
            getMeetings: computed,
        });
        this.init();
    };


    async init() {
        const res = await fetch("http://localhost:8787/appointments")
        const data = await res.json()
        runInAction(() => {
            console.log("data ", data[0])
            console.log("meets-init1 ", this.meets)
            this.meets.push(...data)
            console.log("meets-init2 ", this.meets[0])
            console.log("id", this.id);
        })
    };

    get get() {
        const data = this.meets.map(i => ({ id: "" + IDcnt++, ...i }));
        console.log("id appointment: ", IDcnt)
        data.sort((app) => { app.dateTime })
        return data
    }

    // get getMeetings() {
    //     console.log("meets",this.meets);
    //     const data = this.meets.map(i => ({ id: "" + IDcnt++, ...i }));
    //     console.log("id appointment: ", IDcnt)
    //     data.sort((app) => { app.dateTime })

    //     return data;
    // }
    get getMeetings() {

        // const meetings = await fetch("http://localhost:8787/appointments");
        // var data = await meetings.json();
        //צריך למיין לפי תאריכים
        // console.log("data", data);
        // console.log("meetingarr", this.tempMeetingArr);
        //  data=this.meets.map((m)=>({ status: ""+  validDate(m.dateTime)}))
        const data = this.meets.map(i => ({ id: "" + IDcnt++, ...i }));
        const compareDates = (a, b) => new Date(a.date) - new Date(b.date);

        // Sort meetings based on date order (today, future, past)
        data.sort((a, b) => {
            const dateA = new Date(a.dateTime).getDate();
            const dateB = new Date(b.dateTime).getDate();
            const today = new Date().getDate();
            if (dateA === today) return -1; // Today's meeting first
            if (dateA > today && dateB !== today) return -1; // Future meetings next
            return compareDates(a, b);
        }) // Sort by date for future and past meetings
        this.tempMeetingArr = data
        var newArray = [];
        console.log("data array", data);
        for (var i = 0; i < data.length; i++) {
            newArray[i] = {
                id: i,
                serviceType: data[i].serviceType,
                dateTime: data[i].dateTime,
                clientName: data[i].clientName,
                clientPhone: data[i].clientPhone,
                clientEmail: data[i].clientEmail,

            }
            console.log("service type", data[i].serviceType);

        }


        // console.log('get-meeting:59',data);
        //data.sort()//(app)=>{app.dateTime}
        return newArray;
    // }
        // return this.tempMeetingArr;
    }




    async postMeet(meeting) {

        const res = await fetch('http://localhost:8787/appointment', {
            method: "POST",
            body: JSON.stringify(meeting),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // const date=await res.json()
        runInAction(() => {
            if (res.status == 200) {
                console.log("meets-post1 ", this.meets)
                this.meets.push(meeting)
                Swal.fire({
                    title: "Excellent!!",
                    text: "Meeting successfully added!!",
                    icon: "Success"
                });
            }

            else {
                Swal.fire({
                    title: "!Error",
                    text: "The date is already taken, try again..",
                    icon: "!Error"
                });
            }
        });
        return res;
    }

}

export default new Meet();