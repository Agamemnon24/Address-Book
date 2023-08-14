const contactModal = document.querySelector(".new-contact-modal");
const addNewContactBtn = document.getElementById("add-new-contact");
const closeModal = document.getElementById("close-modal");
const form = document.querySelector("form");
const text = document.getElementById("text");
const table = document.getElementById("table");
const searchInput = document.querySelector("[data-search]");
const submitBtn = document.getElementById("submit");
const errorElement = document.getElementById("error");

addNewContactBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", showModal);

// submitBtn.addEventListener("click", addPerson);

form.addEventListener("submit", (e) => {
  const name = document.getElementById("name");
  const phoneNumber = document.getElementById("phone").value;
  let messages = [];

  if (name.value == "" || name.value == null) {
    messages.push("Name is required");
  }

  if (address.value == "" || address.value == null) {
    messages.push("Address is required");
  }

  if (phoneNumber == "" || phoneNumber == null || isNaN(phoneNumber) == true) {
    messages.push("Please enter a valid phone number");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join("\n");
  } else {
    addPerson();
  }

  // if (messages.length == 0) {
  //   addPerson();
  // }
});

let id = 0;
const addressbook = JSON.parse(localStorage.getItem("addressbook"));

function showModal() {
  contactModal.classList.toggle("show");
  const container = document.querySelector(".main-container");
  contactModal.className == "new-contact-modal show"
    ? (container.style.opacity = "0.7")
    : (container.style.opacity = "1");
}

function addPerson() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phone").value;
  const notes = document.getElementById("notes").value;

  let person = {
    personId: id,
    personName: name,
    personAddress: address,
    personMobile: phoneNumber,
    personNotes: notes,
  };

  if (localStorage.getItem("addressbook") === null) {
    const addressbook = [];
    addressbook.push(person);
    localStorage.setItem("addressbook", JSON.stringify(addressbook));
  } else {
    addressbook.push(person);
    localStorage.setItem("addressbook", JSON.stringify(addressbook));
  }
}

function fetchData() {
  if (addressbook != null)
    if (addressbook[0] != undefined) {
      text.textContent = "";
      for (let i = 0; i < addressbook.length; i++) {
        id++;

        const name = addressbook[i].personName;
        const address = addressbook[i].personAddress;
        const mobile = addressbook[i].personMobile;
        const notes = addressbook[i].personNotes;

        table.innerHTML += ` <tr id=${addressbook[i].personId}>
      <td><span id="init">${name[0]}</span>${name}</td>
      <td>${address}</td>
      <td>${mobile}</td>
      <td>${notes}</td>
      <td><button type="button" class="btn-del" onclick="deletePerson(${mobile})">delete</button></td>
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
      user.personMobile.includes(value) ||
      user.personNotes.toLowerCase().includes(value);
    const tableRow = document.getElementById(user.personId);
    tableRow.classList.toggle("hide", !isVisible);
  });
});
