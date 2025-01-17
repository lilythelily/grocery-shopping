"use strict";

const addNew = document.querySelector("#add-new");
const addNewBtn = document.querySelector("#plus-button");
const favMenu = document.querySelector(".fav-menu");
const favDrop = document.querySelector("#dropdown");
const dropIcon = favMenu.querySelector("img");
const section = document.querySelector("section");
const deleteAll = document.querySelector(".delete-all");
const mark = document.querySelector(".mark");
const popup = document.querySelector("#popup");
const overlay = document.querySelector("#overlay");

// enter new item

addNewBtn.addEventListener("click", (e) => {
  const newText = addNew.value;
  const newHTML = `<div class="item">
        <div class="check-item">
          <input type="checkbox" />
          <p class="list-item">${newText}</p>
        </div>
        <img class="delete-circle" src="images/delete.svg" alt="bin" />
      </div>`;
  section.innerHTML += newHTML;
  addNew.value = "";
  section.style.textDecoration = "none";
  section.style.opacity = "1";
});

favMenu.addEventListener("click", (e) => {
  favDrop.classList.toggle("hide");
  toggleDrop();
});

// fav dropdown icon

function toggleDrop() {
  if (dropIcon.src.endsWith("arrow_drop_down.svg")) {
    dropIcon.src = "images/arrow_drop_up.svg";
  } else {
    dropIcon.src = "images/arrow_drop_down.svg";
  }
}

// Fav Drop Menu -> Add New Item

favDrop.addEventListener("click", (e) => {
  const listItem = e.target.closest(".list-item");

  if (listItem) {
    let toAdd = listItem.dataset.id;

    toAdd
      ? (section.innerHTML += `<div class="item"><div class="check-item">
<input type="checkbox" />
<p class="list-item">${toAdd}</p>
</div>
<img class="delete-circle" src="images/delete.svg" alt="bin" />
</div>`)
      : "";

    const newCheckbox = section.querySelector(".item:last-child");

    newCheckbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        e.target.parentElement.style.opacity = ".5";
        e.target.parentElement.style.textDecoration = "line-through";
      } else {
        e.target.parentElement.style.opacity = "1";
        e.target.parentElement.style.textDecoration = "none";
      }
    });
  }
  section.style.textDecoration = "none";
  section.style.opacity = "1";
});

// current list check

section.addEventListener("click", (e) => {
  if (e.target.checked) {
    e.target.parentElement.style.opacity = ".5";
    e.target.parentElement.style.textDecoration = "line-through";
  } else if (e.target.className === "delete-circle") {
    e.target.parentElement.classList.add("hide");
  } else {
    e.target.parentElement.style.opacity = "1";
    e.target.parentElement.style.textDecoration = "none";
  }
});

// delete all items

deleteAll.addEventListener("click", (e) => {
  const toDelete = section.querySelectorAll(".item");
  toDelete.forEach((item) => {
    item.style.display = "none";
  });
});

// other functions

function showPopup() {
  popup.style.opacity = "100%";
  overlay.classList.remove("hide");
  document.documentElement.scrollTop = 0;
}

function closePopup() {
  popup.style.opacity = "0%";
  overlay.classList.add("hide");
}

mark.addEventListener("click", (e) => {
  // popup.style.opacity = "0%" ? showPopup() : "";
  section.style.textDecoration = "line-through";
  const checkboxes = section.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => (checkbox.checked = true));

  showPopup();
});

overlay.addEventListener("click", (e) => {
  closePopup();
});
