const money=n=>new Intl.NumberFormat("km-KH").format(Math.round(Number(n||0)))+" ៛";
const client=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
let data=[], editId=null;
const $=x=>document.getElementById(x);
function showApp(on){$("login").classList.toggle("hidden",on);$("app").classList.toggle("hidden",!on);$("logout").classList.toggle("hidden",!on)}
async function load(){
 const {data:d,error}=await client.from("debts").select("*").order("created_at",{ascending:false});
 if(error){alert(error.message);return} data=d||[]; render();
}
function render(){
 const q=$("search").value.toLowerCase().trim(), list=data.filter(x=>(x.name+" "+(x.phone||"")+" "+(x.item||"")).toLowerCase().includes(q));
 $("rows").innerHTML=list.map(x=>{let r=Math.max(0,Number(x.amount)-Number(x.payment));return `<tr><td><b>${esc(x.name)}</b><br><small>${x.date||""}</small></td><td>${esc(x.phone||"-")}</td><td>${esc(x.item||"-")}</td><td>${money(x.amount)}</td><td>${money(x.payment)}</td><td class="remaining">${money(r)}</td><td class="actions"><button class="edit" onclick="editDebt('${x.id}')">កែ</button><button class="del" onclick="delDebt('${x.id}')">លុប</button></td></tr>`}).join("");
 $("count").textContent=data.length;$("debt").textContent=money(data.reduce((a,x)=>a+Number(x.amount),0));$("paid").textContent=money(data.reduce((a,x)=>a+Number(x.payment),0));$("remain").textContent=money(data.reduce((a,x)=>a+Math.max(0,Number(x.amount)-Number(x.payment)),0));
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function open(x){editId=x?.id||null;$("title").textContent=x?"កែអ្នកជំពាក់":"បន្ថែមអ្នកជំពាក់";$("name").value=x?.name||"";$("phone").value=x?.phone||"";$("item").value=x?.item||"";$("amount").value=x?.amount??"";$("payment").value=x?.payment??0;$("date").value=x?.date||new Date().toISOString().slice(0,10);$("modal").classList.remove("hidden")}
function close(){$("modal").classList.add("hidden")}
$("loginBtn").onclick=async()=>{let {error}=await client.auth.signInWithPassword({email:$("email").value,password:$("password").value});if(error)$("msg").textContent=error.message;else{showApp(true);load()}}
$("logout").onclick=async()=>{await client.auth.signOut();showApp(false)}
$("add").onclick=()=>open();$("close").onclick=close;$("search").oninput=render;
$("save").onclick=async()=>{let amount=Number($("amount").value),payment=Number($("payment").value);if(!$("name").value||payment>amount)return alert("សូមពិនិត្យឈ្មោះ និងចំនួនលុយ");let row={name:$("name").value.trim(),phone:$("phone").value.trim(),item:$("item").value.trim(),amount,payment,date:$("date").value};let res=editId?await client.from("debts").update(row).eq("id",editId):await client.from("debts").insert(row);if(res.error)alert(res.error.message);else{close();load()}}
window.editDebt=id=>{let x=data.find(a=>a.id===id);if(x)open(x)}
window.delDebt=async id=>{if(confirm("លុបអ្នកជំពាក់នេះ?")){let r=await client.from("debts").delete().eq("id",id);if(r.error)alert(r.error.message);else load()}}
client.auth.getSession().then(({data:{session}})=>{showApp(!!session);if(session)load()});
client.auth.onAuthStateChange((_e,s)=>{showApp(!!s);if(s)load()});
