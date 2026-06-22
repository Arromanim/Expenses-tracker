
let data=JSON.parse(localStorage.getItem('expenses_pro')||'[]');

function save(){localStorage.setItem('expenses_pro',JSON.stringify(data));render();}

function addTxn(){
let d=desc.value.trim();
let a=+amount.value;
if(!d||!a)return;
data.unshift({d,a,c:cat.value,t:type.value,date:new Date().toLocaleDateString()});
save();
}

function del(i){data.splice(i,1);save();}

function render(){
let inc=0,exp=0;
let q=(search.value||'').toLowerCase();
rows.innerHTML='';
data.forEach((x,i)=>{
if(x.t==='income') inc+=x.a; else exp+=x.a;
if(q && !x.d.toLowerCase().includes(q)) return;
rows.innerHTML += `<tr>
<td>${x.d}<br><small>${x.date}</small></td>
<td>${x.t==='income'?'آمدنی':'خرچ'}</td>
<td>${x.c}</td>
<td>${x.a}</td>
<td><button onclick="del(${i})">حذف</button></td>
</tr>`;
});
income.textContent=inc;
expense.textContent=exp;
balance.textContent=inc-exp;
}

function exportCSV(){
let csv='Description,Type,Category,Amount\n';
data.forEach(x=>csv+=`${x.d},${x.t},${x.c},${x.a}\n`);
let a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
a.download='expenses.csv';
a.click();
}
render();
