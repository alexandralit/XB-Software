class MakeTagsList {
  constructor() {
    this.listTags = [];
  }

  init() {
    this.setList;

    if (this.listTags.length !== 0) {
      this.listTags.map(tag => this.addToList(tag.name, tag.id));
    }
  }

  addToList(tag, id) {
    const list = document.querySelector(".list");
    const li = document.createElement("li");
    const contentTag = document.createElement("span");
    const btnRemove = document.createElement("span");

    li.classList.add("list__item");
    contentTag.classList.add("list__item-text");
    btnRemove.classList.add("list__item-remove");

    contentTag.textContent = tag;
    list.appendChild(li);
    li.appendChild(contentTag);
    li.appendChild(btnRemove);

    btnRemove.addEventListener("click", (event) => {
      this.removeTag(id);
      event.target.parentNode.remove();
    });
  }

  removeTag(id) {
    this.listTags = this.listTags.filter(tag => tag.id !== id);
    localStorage.setItem("tags", JSON.stringify(this.listTags));
  }

  reset() {
    this.listTags = [];
    localStorage.setItem("tags", JSON.stringify(this.listTags));
  }

  readOnly(on) {
    const container = document.querySelector(".main__container");

    if (on) container.style.pointerEvents = "none"; 
    else container.style.pointerEvents = "all";
  }

  set setList(value) {
    const error = document.querySelector(".main__error");
    
    if (value.trim().length !== 0 && isNaN(Number(value))) {
      error.style.display = "none";
      let id = new Date().valueOf();
      this.listTags.push({ id, name: value.trim() });
      this.addToList(value, id);
      localStorage.setItem("tags", JSON.stringify(this.listTags));
    } else {
      error.style.display = "block";
    }
  }

  get setList() {
    this.listTags = JSON.parse(localStorage.getItem("tags")) || [];
    return this.listTags;
  }
}

const makeTagsList = new MakeTagsList();
makeTagsList.init();

const input = document.querySelector(".main__input");
const list = document.querySelector(".list");
const readOnly = document.getElementById("checkbox");
const btnAdd = document.querySelector(".main__btn-add");
const btnReset = document.querySelector(".main__btn-reset");

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) createTag();
});

btnAdd.addEventListener("click", createTag);

btnReset.addEventListener("click", () => {
  makeTagsList.reset();
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
});

readOnly.addEventListener("change", () => {
  if (readOnly.checked) {
    makeTagsList.readOnly(true);
  } else {
    makeTagsList.readOnly(false);
  }
});

function createTag() {
  makeTagsList.setList = input.value;
  input.value = "";
}