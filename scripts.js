
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" // firebase app library
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" // firebase database library


//firebase settings
const appSettings = {
    databaseURL: "https://testproj-5842f-default-rtdb.firebaseio.com/" // my firebase server url
}
const app = initializeApp(appSettings);
const database = getDatabase(app);  //retrieve database
const itemsInCart = ref(database, "cart")   //reference firebase database "cart"

console.log(app)


// elements
const inputElement =  document.getElementById("item-input") // input item field
const addBtnElement = document.getElementById("add-btn") // add button
const shopListElement = document.getElementById("shopping-list") // shopping list
const messageElement = document.getElementById("messages") // messages element

// add data to db when clicked
addBtnElement.addEventListener("click", function() {
    let inputValue = inputElement.value
    if (inputValue === "") {    
        messageElement.innerHTML = "<p>Type something!</p>" //prevents null values
    } else {
        push(itemsInCart, inputValue)   //push item to database
        messageElement.innerHTML = "<p>&nbsp;</p>"
    }


    inputElement.value = "";   //reset field value
})

// pull data from firebase database - runs on page load
onValue(itemsInCart, function(snapshot) {
    if (snapshot.exists()) {
        clearList();
        let cartArray = Object.entries(snapshot.val())   //convert object snapshot to array
        for (let i = 0; i < cartArray.length; i++) {
            let KeyValue = cartArray[i];    // KV Pairs from database
            appendItemToList(KeyValue)     // generate list
        }
    } else {
        shopListElement.innerHTML = "<p>cart is empty!</p>"
    }
})

// clears HTML list dynamically
function clearList(){
    shopListElement.innerHTML = null
    console.log("list cleared")
}
//add item to HTML list dynamically
function appendItemToList(KeyValue) {
    let key = KeyValue[0];      // Item ID
    let value = KeyValue[1];    // Item Name
    //shopListElement.innerHTML += `<li>${value}</li>`
    let newElement = document.createElement("li")   // create new element with li tag
    newElement.textContent = value;                 // give item name
    shopListElement.append(newElement)              // append to list

    newElement.addEventListener("click", function(){
        let itemIDlocationDB = ref(database, `cart/${key}`)
        remove(itemIDlocationDB)
        console.log("deleted " + value)
    })

    console.log("added " + value)
}
function deleteItem() {
    
}