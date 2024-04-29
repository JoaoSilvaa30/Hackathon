
import User from "./User.js";

/**
 * Class to manage records in our local storage
 defines an id for each record associated with an User class object
 */
export default class Db {
    constructor() {
        let id = localStorage.getItem("id"); //defines id
        if (id === null) {
            // if there is no record (id=null) sets the first record to id=0
            localStorage.setItem("id", 0);
        }
    }

    getNextId() {
        //method that returns next avaliable id
        let nextId = localStorage.getItem("id");
        return parseInt(nextId) + 1;
    }

    saveUser(user) {
        //method that receives an object expense as argument
        let id = this.getNextId(); // decides next id
        localStorage.setItem(id, JSON.stringify(user)); //saves the record to local storage, turns objectuser to JSON and associate it with an id
        localStorage.setItem("id", id); // updates current id
    }

    getAllRecords() {
        //get all user records

        let users = Array(); //array of users to show in view

        let id = localStorage.getItem("id");

        for (let i = 1; i <= id; i++) {
            let user = JSON.parse(localStorage.getItem(i));

            if (user === null) {
                //verify if exist null records
                continue;
            }
            users.push(user);
        }

        
        return users;
    }

    search(user) {
        let filteredUser = Array();
        console.log(user)

        filteredUser = this.getAllRecords();

        console.log(filteredUser)

        //filter name
        if (user.name != "") {
            console.log(user.name)
            filteredUser = filteredUser.filter((d) => d.name.includes(user.name));
        }

        console.log(filteredUser)
        //filter age
        if (user.age != "") {
            filteredUser = filteredUser.filter((d) => d.age == user.age);
        }
        //filter nationality
        if (user.nationality != "") {
            filteredUser = filteredUser.filter((d) => d.nationality == user.nationality);
        }
        //filter about me
        if (user.aboutMe != "") {
            filteredUser = filteredUser.filter((d) => d.aboutMe == user.aboutMe);
        }
        //filter contact
        if (user.contact != "") {
            filteredUser = filteredUser.filter(
                (d) => d.contact == user.contact
            );
        } //filter contact
        if (user.photo != "") {
            filteredUser = filteredUser.filter(
                (d) => d.photo == user.photo
            );
        }
        
        return filteredUser;

        
    }
}