const tasks=[
{name:'Make Bed',priority:3,time:5,repeat:'daily',done:false},
{name:'Practice Violin',priority:5,time:30,repeat:'daily',done:false},
{name:'JD Robot',priority:4,time:45,repeat:'none',done:false}
];
const inventory={Arduino:'Drawer 2',Violin:'Music Corner',LEGO:'Shelf 3'};
function save(){localStorage.setItem('novaTasks',JSON.stringify(tasks))}
function load(){let d=localStorage.getItem('novaTasks');if(d){let a=JSON.parse(d);a.forEach((t,i)=>Object.assign(tasks[i]||{},t));}}
function render(){
let ul=document.getElementById('tasks');ul.innerHTML='';
tasks.forEach((t,i)=>{let li=document.createElement('li');
li.innerHTML=`<label><input type='checkbox' ${t.done?'checked':''}> ${t.name} (${t.time} min)</label>`;
li.querySelector('input').onchange=e=>{t.done=e.target.checked;save();updateStats();};
ul.appendChild(li);});
updateStats();}
function updateStats(){let done=tasks.filter(t=>t.done).length;document.getElementById('stats').textContent=`${done}/${tasks.length} tasks complete`;}
function suggestTask(){let c=tasks.filter(t=>!t.done).sort((a,b)=>b.priority-a.priority)[0];
let txt=c?`You haven't completed ${c.name}. It's a high priority task taking about ${c.time} minutes.`:'Everything is complete!';
document.getElementById('suggestion').textContent=txt;
speechSynthesis.speak(new SpeechSynthesisUtterance(txt));}
function searchItem(){let q=document.getElementById('searchBox').value;document.getElementById('result').textContent=inventory[q]||'Not found';}
function clock(){let n=new Date();document.getElementById('clock').textContent=n.toLocaleTimeString();document.getElementById('date').textContent=n.toDateString();
let h=n.getHours();document.getElementById('greeting').textContent=h<12?'Good Morning':h<18?'Good Afternoon':'Good Evening';}
load();render();clock();setInterval(clock,1000);