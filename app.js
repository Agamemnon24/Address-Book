const contactModal = document.querySelector(".new-contact-modal");
const addNewContactBtn = document.getElementById("add-new-contact");
const closeModal = document.querySelector(".new-contact-modal p");
const form = document.querySelector("form");
const text = document.getElementById("text");
const table = document.getElementById("table");
const searchInput = document.querySelector("[data-search]");
const submitBtn = document.getElementById("submit");

addNewContactBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", showModal);
submitBtn.addEventListener("click", addPerson);

function showModal() {
  contactModal.classList.toggle("show");
}

const addressbook = JSON.parse(localStorage.getItem("addressbook"));
let id = 0;

function addPerson() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phone").value;

  if (!name || !address || !phoneNumber) {
    console.log("Fields must not be empty!");
    return;
  }

  let person = {
    personId: id,
    personName: name,
    personAddress: address,
    personMobile: phoneNumber,
  };

  if (localStorage.getItem("addressbook") === null) {
    const addressbook = [];
    addressbook.push(person);
    localStorage.setItem("addressbook", JSON.stringify(addressbook));
  } else {
    addressbook.push(person);
    localStorage.setItem("addressbook", JSON.stringify(addressbook));
  }
  // location.reload();
}

function fetchData() {
  if (addressbook != null)
    if (addressbook[0] !== undefined) {
      text.textContent = "";
      for (let i = 0; i < addressbook.length; i++) {
        id++;

        const name =
          addressbook[i].personName.charAt(0).toUpperCase() +
          addressbook[i].personName.slice(1);

        const address = addressbook[i].personAddress;

        const mobile = addressbook[i].personMobile;

        table.innerHTML += ` <tr id=${addressbook[i].personId}>
      <td><span id="init">${name[0]}</span>${name}</td>
      <td>${address}</td>
      <td>${mobile}</td>
      <td><button type="button" onclick="deletePerson(${mobile})">delete</button></td>
    </tr>`;
        id = addressbook[i].personId + 1;
      }
    }
}

function deletePerson(phoneNumber) {
  for (let i = 0; i < addressbook.length; i++) {
    if (addressbook[i].personMobile == phoneNumber) {
      addressbook.splice(i, 1);
    }
  }
  localStorage.setItem("addressbook", JSON.stringify(addressbook));
  location.reload();
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  addressbook.forEach((user) => {
    const isVisible =
      user.personName.toLowerCase().includes(value) ||
      user.personAddress.toLowerCase().includes(value) ||
      user.personMobile.includes(value);
    const tableRow = document.getElementById(user.personId);
    tableRow.classList.toggle("hide", !isVisible);
  });
});

function editStorage() {}
editStorage();
