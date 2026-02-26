// ===============================
// GLOBAL STATE
// ===============================

let currentType = "array";
let stackCount = 0;
let maxSize = Infinity;


// ===============================
// STACK TYPE TOGGLE
// ===============================

function changeType(type){

currentType = type;
document.getElementById("type").value = type;

document.getElementById("arrayBtn").classList.remove("active");
document.getElementById("linkedBtn").classList.remove("active");

if(type==="array"){
document.getElementById("arrayBtn").classList.add("active");
document.getElementById("stackSize").style.display="inline";
}else{
document.getElementById("linkedBtn").classList.add("active");
document.getElementById("stackSize").style.display="none";
maxSize = Infinity;
}

clearStack();
}


// ===============================
// PUSH
// ===============================

async function pushValue(){

let value=document.getElementById("value").value;
let type=document.getElementById("type").value;

if(!value){
showToast("Enter value first");
return;
}

// ARRAY STACK SIZE CHECK
if(type==="array"){

let sizeInput=document.getElementById("stackSize").value;

if(!sizeInput){
showToast("Enter stack size first");
return;
}

maxSize=parseInt(sizeInput);

if(stackCount>=maxSize){
showToast("⚠️ Stack Overflow");
return;
}
}

try{
let res=await fetch(`/push?value=${value}&type=${type}`);

if(res.ok){
addStackItem(value);
addHistory("Push " + value);
showToast("Pushed " + value);
stackCount++;
}else{
showToast("Server error");
}

}catch{
showToast("Server not responding");
}

document.getElementById("value").value="";
}


// ===============================
// POP
// ===============================

async function popValue(){

let type=document.getElementById("type").value;

if(stackCount===0){
showToast("Stack Empty");
return;
}

try{
let res=await fetch(`/pop?type=${type}`);
let data=await res.text();

removeStackItem();
addHistory("Pop " + data);
showToast("Popped " + data);
stackCount--;

}catch{
showToast("Server not responding");
}
}


// ===============================
// PEEK
// ===============================

async function peekStack(){

let type=document.getElementById("type").value;

if(stackCount===0){
showToast("Stack Empty");
return;
}

try{
let res=await fetch(`/peek?type=${type}`);
let data=await res.text();

document.getElementById("peekValue").innerText=data;
document.getElementById("peekModal").style.display="flex";

}catch{
showToast("Server not responding");
}
}

function closePeek(){
document.getElementById("peekModal").style.display="none";
}


// ===============================
// ADD STACK ITEM
// ===============================

function addStackItem(value){

document.querySelector(".empty-stack")?.remove();

const stack=document.getElementById("visualizer");

const box=document.createElement("div");
box.className='stack-item';
box.innerText=value;

stack.appendChild(box);

updateTopPointer();

if(currentType==="linked")
addLinkedArrows();
}


// ===============================
// REMOVE STACK ITEM
// ===============================

function removeStackItem(){

const stack=document.getElementById("visualizer");

if(stack.lastChild){

let topBox=stack.lastChild;
topBox.classList.add("pop");

setTimeout(()=>{
stack.removeChild(topBox);
updateTopPointer();
addLinkedArrows();
},400);

}else{
showEmptyState();
}
}


// ===============================
// LINKED ARROWS
// ===============================

function addLinkedArrows(){

document.querySelectorAll(".arrow").forEach(a=>a.remove());

if(currentType!=="linked") return;

const items=document.querySelectorAll(".stack-item");

items.forEach((item,i)=>{
if(i!==items.length-1){
let arrow=document.createElement("div");
arrow.className="arrow";
arrow.innerText="↓";
item.after(arrow);
}
});
}


// ===============================
// TOP POINTER
// ===============================

function updateTopPointer(){

document.querySelectorAll(".top-label").forEach(e=>e.remove());

const stack=document.getElementById("visualizer");

if(stack.lastChild){

let label=document.createElement("div");
label.innerText="TOP";
label.className="top-label";

stack.lastChild.appendChild(label);

}else{
showEmptyState();
}
}


// ===============================
// CLEAR
// ===============================

async function clearStack(){

let type=document.getElementById("type").value;

try{
await fetch(`/clear?type=${type}`);
}catch{}

stackCount=0;

document.getElementById("visualizer").innerHTML="";
document.getElementById("historyList").innerHTML="";
showEmptyState();
}


// ===============================
// HISTORY
// ===============================

function addHistory(text){
const list=document.getElementById("historyList");
const li=document.createElement("li");
li.innerText=text;
list.prepend(li);
}


// ===============================
// EMPTY STATE
// ===============================

function showEmptyState(){

const stack=document.getElementById("visualizer");

if(stack.children.length===0){

let empty=document.createElement("div");
empty.className="empty-stack";
empty.innerHTML="Empty Stack<br>TOP = -1";

stack.appendChild(empty);
}
}


// ===============================
// THEME TOGGLE
// ===============================

const toggleBtn=document.getElementById("themeToggle");

toggleBtn.addEventListener("click",()=>{
document.body.classList.toggle("dark");
document.body.classList.toggle("light");
toggleBtn.textContent=document.body.classList.contains("dark")?"☀️":"🌙";
});


// ===============================
// TOAST
// ===============================

function showToast(message){

const toast=document.createElement("div");
toast.className="toast";
toast.innerText=message;

document.body.appendChild(toast);

setTimeout(()=>toast.remove(),2000);
}

showEmptyState();