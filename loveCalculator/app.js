
import User from "./model/User.js";
import Db from "./model/Db.js";
import { userJSON } from './resources/file.js';




let db = new Db();



//$("#navList").on("click", loadUsersList());

$("#searchBtn").click(function () {
  searchUser();
});

$("#info-box1").click(function () {
  getRandomUser1();
});

$("#info-box2").click(function () {
  getRandomUser2();
});

$("#phrase-box").click(function () {
  getPercentage();
});

$("#addUserBtn").click(function () {
  addUser();
});


function addUser() {
  //add an user to local storage
  let name = document.getElementById("name");
  let age = document.getElementById("age");
  let nationality = document.getElementById("nationality");
  let aboutMe = document.getElementById("aboutMe");
  let contact = document.getElementById("contact");
  let photo = document.getElementById("photo");

  let user = new User( //instanciate a new user
    name.value,
    age.value,
    nationality.value,
    aboutMe.value,
    contact.value,
    photo.value
  );

  if (user.validateData()) {
    //validate all data to add the user
    db.saveUser(user);
    //sucess

    $("#modalTitle").html("Record inserted successfully.");
    $("#modalBody").html("The expense was registered successfully.");
    $("#modalTitleDiv").removeClass();
    $("#modalTitleDiv").addClass("modal-header text-success");
    $("#modalButton").removeClass();
    $("#modalButton").addClass("btn btn-success");
    $("#userModal").modal("show"); //if sucess validating data, show (modal bootstrap)

    name.value = ""; //after sucess, clean all fields
    age.value = "";
    nationality.value = "";
    aboutMe.value = "";
    contact.value = "";
    photo.value = "";

  } else {
    $("#modalTitle").html("Error saving the data.");
    $("#modalBody").html(
      "Error, check if all fields were filled in correctly."
    );
    $("#modalTitleDiv").removeClass();
    $("#modalTitleDiv").addClass("modal-header text-danger");
    $("#modalButton").removeClass();
    $("#modalButton").addClass("btn btn-danger");
    $("#userModal").modal("show"); //if error validating data, show error (modal bootstrap)
  }

}

function loadUsersList(users = Array(), filter = false) {
  if (users.length == 0 && filter == false) {

    //get all users records when we enter consulta.html
    users = db.getAllRecords();
  }

  if (db.getAllRecords().length === 0) {
    loadFromJSON();
  }

  let usersList = document.getElementById("usersList");

  usersList.innerHTML = "";

  users.forEach((d) => {
    let line = usersList.insertRow();
    line.insertCell(0).innerHTML = d.name;
    line.insertCell(1).innerHTML = d.age;
    line.insertCell(2).innerHTML = d.nationality;
    line.insertCell(3).innerHTML = d.contact;
    //line.insertCell(4).innerHTML = d.photo;
  });
}

function searchUser() {
  let name = document.getElementById("name1").value;
  let age = document.getElementById("age1").value;
  let nationality = document.getElementById("nationality1").value;
  let aboutMe = document.getElementById("aboutMe1").value;
  let contact = document.getElementById("contact1").value;
  let photo= document.getElementById("photo1").value;;

  let user = new User(name, age, nationality, aboutMe, contact, photo);

  console.log(user)

  let users = db.search(user);

  loadUsersList(users, true);
}

function loadFromJSON() {

  let userObjects = userJSON;

  console.log(userObjects.length)

  userObjects.forEach((d) => {

    let id = db.getNextId(); // decides next id
    localStorage.setItem(id, JSON.stringify(d)); //saves the record to local storage, turns objectuser to JSON and associate it with an id
    localStorage.setItem("id", id); // updates current id
  })

}


function randomize() {

  let users = db.getAllRecords();

  let randomUser = Math.ceil(Math.random() * users.length);
  console.log(randomUser);

  return randomUser;
}

function getRandomUser1() {

  $("#percentage-box").html("");
  $("#phrase-box").html("");

  let randomUserId = randomize();

  let randomUser = JSON.parse(localStorage.getItem(randomUserId));

  console.log(randomUser);

  $("#calculatorName1").html(randomUser.name);
  $("#calculatorAge1").html(randomUser.age);
  $("#calculatorNationality1").html(randomUser.nationality);
  $("#calculatorContact1").html(randomUser.contact);
  $("#calculatorAboutMe1").html(randomUser.aboutMe);
  document.getElementById('circle1').style.backgroundImage = 'url('+randomUser.photo+')';

}

function getRandomUser2() {

  $("#percentage-box").html("");
  $("#phrase-box").html("");

  let randomUserId = randomize();


  let randomUser = JSON.parse(localStorage.getItem(randomUserId));

  console.log(randomUser);

  $("#calculatorName2").html(randomUser.name);
  $("#calculatorAge2").html(randomUser.age);
  $("#calculatorNationality2").html(randomUser.nationality);
  $("#calculatorContact2").html(randomUser.contact);
  $("#calculatorAboutMe2").html(randomUser.aboutMe);
  document.getElementById('circle2').style.backgroundImage = 'url('+randomUser.photo+')';

}

function getPercentage() {

  let pair = {
    percentage:"",
    phrase: ""
  };

  pair.percentage = Math.ceil(Math.random() * 100);

  switch (true) {
    case pair.percentage <= 10:
      pair.phrase = "Congratulations! You're a match made in coding heaven, like Python and whitespace - so much space for love to breathe!"
      break;
    case pair.percentage <= 20:
      pair.phrase = "Oops! It seems your love equation hit a syntax error, like JavaScript without semicolons. Time to debug your hearts!"
      break;
    case pair.percentage <= 30:
      pair.phrase = "Well, well, well... You're as compatible as HTML without CSS - it's time to style up your romance and make it shine!"
      break;
    case pair.percentage <= 40:
      pair.phrase = "Hold onto your keyboards! You're as compatible as Java and null pointers - expect some unexpected love crashes!"
      break;
    case pair.percentage <= 50:
      pair.phrase = "Looks like you're as compatible as PHP and outdated frameworks. Time for a love upgrade to the latest version!"
      break;
    case pair.percentage <= 60:
      pair.phrase = "Congratulations! You're as synced as Git repositories - commit to each other and push for a forever merge!"
      break;
    case pair.percentage <= 70:
      pair.phrase = "Well, butter my bytes! You're as compatible as C++ and memory leaks - make sure your love doesn't overflow!"
      break;
    case pair.percentage <= 80:
      pair.phrase = "Oops! Your love database needs indexing, like SQL without proper optimization. Time to speed up those queries and find your perfect match!"
      break;
    case pair.percentage <= 90:
      pair.phrase = "Surprise, surprise! You're as quirky together as CSS and Internet Explorer - embrace the unique compatibility of your love layout!"
      break;
    case pair.percentage <= 100:
      pair.phrase = "Hold onto your curly braces! You're as compatible as Ruby and dependency hell - but remember, the gems lie within the challenges!"
      break;
  }
  $("#percentage-box").html(pair.percentage + "%");
  $("#phrase-box").html(pair.phrase);

  return pair

}



