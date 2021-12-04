//iterative grocery list
//use while, for, and for of loops
//1. ask user to enter items to add to their list (array)
//use "Done" to be a special value to indivate the user has completed the list
//2. have user enter items to be removed (loop through grocery list)
//3. update it so when its checked off, it'll update the list (splice method of array) - output

//user creates their list
var slist = {

    items : [], 
    hlist : null, 
    hadd : null, 
    hitem : null,
    init : function () {
//activates list by adding items
      slist.hlist = document.getElementById("shop-list");
      slist.hadd = document.getElementById("shop-add");
      slist.hitem = document.getElementById("shop-item");
      slist.hadd.addEventListener("submit", slist.add);
  
//iterates through shopping list
      if (localStorage.items == undefined) { localStorage.items = "[]"; }
      slist.items = JSON.parse(localStorage.items);
  
      slist.draw();
    },
  
//adds new item to list
    add : function (evt) {

      evt.preventDefault();
  
//add item
      slist.items.push({
        name : slist.hitem.value, 
        done : false //returns true if recieved, rejected if not
      });
      slist.hitem.value = "";
      slist.save();
  
//updates grocery list
      slist.draw();
    },
  
//grocery list
    draw : function () {
      slist.hlist.innerHTML = "";
      if (slist.items.length > 0) {
        let row, name, delbtn, okbtn;
        for (let i in slist.items) {  //for loop
//item row
          row = document.createElement("div");
          row.className = "item-row";
          slist.hlist.appendChild(row);
          
//item name
          name = document.createElement("div");
          name.className = "item-name";
          name.innerHTML = slist.items[i].name;
          if (slist.items[i].done) {
            name.classList.add("item-got");
          }
          row.appendChild(name);
  
//delete button
          delbtn = document.createElement("input");
          delbtn.className = "item-del";
          delbtn.type = "button";
          delbtn.value = "Delete";
          delbtn.dataset.id = i;
          delbtn.addEventListener("click", slist.delete);
          row.appendChild(delbtn);
          
//completed or not yet button
          okbtn = document.createElement("input");
          okbtn.className = "item-ok";
          okbtn.type = "button";
          okbtn.value = slist.items[i].done ? "Not Yet" : "Got It";
          okbtn.dataset.id = i;
          okbtn.addEventListener("click", slist.toggle);
          row.appendChild(okbtn);
        }
      }
    },
  
//saves list to local storage
    save : function () {
      if (localStorage.items == undefined) { localStorage.items = "[]"; }
      localStorage.items = JSON.stringify(slist.items);
    },
  
//deletes selected item
    delete : function () {
      if (confirm("Remove selected item?")) {
        slist.items.splice(this.dataset.id, 1); 
        slist.save();
        slist.draw();
      }
    },
  
//got it or not yet buttons
    toggle : function () {
      let id = this.dataset.id;
      slist.items[id].done = !slist.items[id].done;
      slist.save();
      slist.draw();
    }
  };
  window.addEventListener("DOMContentLoaded", slist.init);