let inputList = document.getElementById("sortable");

document.getElementById("submitButton").addEventListener("click", submitInput);

let stuffInStorage = [];
readFromStorage();

function submitInput() {
  let inputUser = document.getElementById("input").value;
  localStorage.setItem(inputUser, inputUser);

  addItem(inputUser);
}

function addItem(text) {
  let btn = document.createElement("BUTTON");
  btn.innerText = "remove";
  btn.addEventListener("click", function(event) {
    removeFromList(event);
  });

  let btnChange = document.createElement("BUTTON");
  btnChange.innerText = "change";
  btnChange.addEventListener("click", function(event) {
    changeFromList(event);
  });
  let newTextNode = document.createTextNode(text);
  let li = document.createElement("li");
  li.setAttribute("class", "ui-state-default");
  let iconSpan =  document.createElement("span");
  iconSpan.setAttribute("class","ui-icon ui-icon-arrowthick-2-n-s");
  let textSpan = document.createElement("span");
  textSpan.appendChild(newTextNode);
  li.appendChild(iconSpan);
  li.appendChild(textSpan);
  li.appendChild(btn);
  li.appendChild(btnChange);
  inputList.appendChild(li);
}

function changeFromList(event) {
  let oldValue = event.target.parentElement.firstChild.innerText;
  let newValue = prompt("Change this to do", oldValue);
  if (input == null || input == "") {
    newValue = prompt("Try the delete button instead", oldValue);
  } else {
    event.target.parentElement.firstChild.innerText = newValue;
    localStorage.removeItem(oldValue);
    localStorage.setItem(newValue, newValue);
    let index = stuffInStorage.indexOf(oldValue);
    if (index > -1) {
      stuffInStorage[index] = newValue;
    }
    stuffInStorage.push(newValue);
  }
}

function removeFromList(event) {
  let findThis = event.target.parentElement.firstChild.innerText;
  let index = stuffInStorage.indexOf(findThis);
  if (index > -1) {
    stuffInStorage.splice(index, 1);
  }
  event.target.parentNode.remove();
  localStorage.removeItem(findThis);
}

function readFromStorage() {
  for (let index in localStorage) {
    if (localStorage.getItem(index) != null) {
      stuffInStorage.push(localStorage.getItem(index));
    }
  }
  for (let i = 0; i < localStorage.length; i++) {
    addItem(stuffInStorage[i]);
  }
}
