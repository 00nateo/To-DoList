/*import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
*/

const input = document.getElementById("input");
const list = document.getElementById("list");

input.addEventListener("keypress", function(e){
    if(event.key === "Enter"){
        addTask();
    }
});
list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
});

function addTask(){
    if(input.value === ''){
        alert("Input Empty");
    }else{
        let newItem = document.createElement("li");
        newItem.innerHTML = input.value;
        list.appendChild(newItem);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        newItem.appendChild(span);
    }
    input.value = "";
    saveData();
}

function saveData(){
    localStorage.setItem("data", list.innerHTML);
    reorderList(listToArray());

}
function showData(){
    list.innerHTML = localStorage.getItem("data");
}
showData();

function listToArray(){
    const rawInput = list.innerText;

    console.log(list.innerHTML);

    console.log(rawInput);
    const array = rawInput.split("\u00d7");
    console.log(array);
    return array;
}
function reorderList(array){
    for(let i = 0;i<array.length;i++){
        array[i] = array[i].replaceAll("\n", "");
    }
    array.sort();//alphabetically
    array = swap(array);
    console.log(array);
    updateData(array);

}
function swap(array){
    var temp = array[0];
    array[0] = array[array.length-1];
    array[array.length-1] = temp;
    return array;
}

reorderList(listToArray());

function updateData(array){
    for(let i = 0;i<array.length;i++){
        array[i] = "\n" + array[i] + "\n";
    }
    array = array.toString();
    array = array.replaceAll(",", "\u00d7");
    console.log(array);
    console.log(array);
}
