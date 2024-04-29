/**
 * Class that defines an User object
 */

export default class User {
    constructor(name, age, nationality, aboutMe, contact, photo) {
        this.name = name;
        this.age = age;
        this.nationality = nationality;
        this.aboutMe = aboutMe;
        this.contact = contact;
        this.photo = photo;
    }

    validateData() {

        //validate all data to record in local storage
        for (let i in this) {
  
            if (this[i] == undefined || this[i] == "" || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}