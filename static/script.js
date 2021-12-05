"use strict";

const footer = document.querySelector('.footer');
const feature = document.querySelector(".container");
const contact = document.querySelector(".contact");
const getInTouchBtn = document.getElementById('GetInTouch');
const services = document.getElementById('services');
const servicesSection = document.getElementById('services-section');
const about =document.getElementById('About us');



getInTouchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contact.scrollIntoView();
});

services.addEventListener('click', (e) => {
  e.preventDefault();
  servicesSection.scrollIntoView();
});

about.addEventListener('click', (e) => {
  e.preventDefault();
  footer.scrollIntoView();
});

/////////////////////////////////////////
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
const submitBtn = document.getElementById('submit');


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

class Customer {
  constructor(fname,lname,email){
    this.fname=fname;
    this.lname=lname;
    this.email=email;
  }
}

submitBtn.onclick = function (e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("form"));

  const object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });

  const json = JSON.stringify(object);

  fetch("/getForm/" + json,
    {
      method: "POST",
      body: json,
    });

  console.log(json);

  modal.style.display = "block";
  setInterval(function () {
    modal.style.display = "none";
  }, 3000);
  console.log('submit');
};




