const machines = [
["OTA-01","PASS","PASS","ONLINE"],["OTA-02","PASS","FAIL","ATTENTION"],
["OTA-03","PASS","PASS","ONLINE"],["OTA-04","TESTING","PASS","TESTING"],
["OTA-05","PASS","PASS","ONLINE"],["OTA-06","PASS","PASS","ONLINE"],
["OTA-07","FAIL","PASS","ATTENTION"],["OTA-08","PASS","PASS","ONLINE"],
["OTA-09","PASS","PASS","ONLINE"],["OTA-10","PASS","PASS","ONLINE"],
["OTA-11","TESTING","PASS","TESTING"],["OTA-12","PASS","PASS","ONLINE"],
["OTA-13","PASS","PASS","ONLINE"],["OTA-14","PASS","FAIL","ATTENTION"],
["OTA-15","PASS","PASS","ONLINE"]
];

const tests = [
["T001","OTA-01","Side A","TRP","PASS","06-09-2026"],
["T002","OTA-01","Side B","TRP","PASS","06-09-2026"],
["T003","OTA-02","Side A","TIS","FAIL","06-09-2026"],
["T004","OTA-03","Side B","TRP","PASS","06-09-2026"],
["T005","OTA-04","Side A","TIS","TESTING","06-09-2026"],
["T006","OTA-05","Side B","TRP","PASS","06-09-2026"],
["T007","OTA-07","Side A","TRP","FAIL","05-09-2026"],
["T008","OTA-10","Side B","TIS","PASS","05-09-2026"]
];

document.getElementById("currentDate").textContent =
new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

function statusClass(s){return s==="PASS"||s==="ONLINE"?"pass":s==="FAIL"||s==="ATTENTION"?"fail":"testing"}

document.getElementById("machineGrid").innerHTML=machines.map(m=>
`<div class="machine ${m[3]==="ONLINE"?"online":m[3]==="ATTENTION"?"failed":"testing"}">${m[0]}<span>${m[3]}</span></div>`).join("");

document.getElementById("machineTable").innerHTML=machines.map(m=>
`<tr><td>${m[0]}</td><td class="${statusClass(m[1])}">${m[1]}</td><td class="${statusClass(m[2])}">${m[2]}</td><td class="${statusClass(m[3])}">${m[3]}</td></tr>`).join("");

function renderResults(list){
document.getElementById("resultsTable").innerHTML=list.map(t=>
`<tr><td>${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td><td>${t[3]}</td><td class="${statusClass(t[4])}">${t[4]}</td><td>${t[5]}</td></tr>`).join("");
}
renderResults(tests);

document.getElementById("searchBox").addEventListener("input",e=>{
const q=e.target.value.toLowerCase();
renderResults(tests.filter(t=>t.join(" ").toLowerCase().includes(q)));
});

document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>{
document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
document.getElementById(btn.dataset.page).classList.remove("hidden");
document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
}));

new Chart(document.getElementById("resultChart"),{
type:"doughnut",data:{labels:["PASS","FAIL","PENDING"],datasets:[{data:[245,20,10]}]},
options:{responsive:true,plugins:{legend:{position:"bottom"}}}
});

new Chart(document.getElementById("machineChart"),{
type:"bar",data:{labels:["OTA-01","OTA-02","OTA-03","OTA-04","OTA-05","OTA-06","OTA-07","OTA-08"],
datasets:[{label:"Passed Tests",data:[25,21,28,24,29,27,20,26]}]},
options:{responsive:true,scales:{y:{beginAtZero:true}}}
});

new Chart(document.getElementById("historyChart"),{
type:"line",data:{labels:["01 Sep","02 Sep","03 Sep","04 Sep","05 Sep","06 Sep"],
datasets:[{label:"Pass Rate %",data:[84,87,85,91,88,89],tension:.3}]},
options:{responsive:true,scales:{y:{min:70,max:100}}}
});
