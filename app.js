const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuBtn.setAttribute("aria-expanded","false")}));

const progress=document.getElementById("progress");
addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=max>0?(scrollY/max*100)+"%":"0%"});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const stream=document.getElementById("stream");
document.getElementById("startSim").addEventListener("click",async function(){
  this.classList.add("hidden");document.getElementById("resetSim").classList.remove("hidden");stream.classList.add("on");
  for(let i=1;i<=6;i++){await sleep(i===1?450:850);document.getElementById("s"+i).classList.add("active");if(i===5)stream.classList.remove("on")}
});
document.getElementById("resetSim").addEventListener("click",()=>{stream.classList.remove("on");for(let i=1;i<=6;i++)document.getElementById("s"+i).classList.remove("active");document.getElementById("startSim").classList.remove("hidden");document.getElementById("resetSim").classList.add("hidden")});

const statsObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;e.target.querySelectorAll("[data-target]").forEach(c=>{let t=+c.dataset.target,n=0;const id=setInterval(()=>{n++;c.textContent=n;if(n>=t)clearInterval(id)},220)});statsObserver.unobserve(e.target)}),{threshold:.35});
statsObserver.observe(document.querySelector(".stats"));

const questions=[
 {q:"¿Qué debes hacer si observas un grifo goteando?",a:[["Ignorarlo porque es poca agua",0],["Cerrarlo bien y avisar a un adulto",1],["Jugar con el agua",0]]},
 {q:"¿Cuál es la primera acción de Aqua Vision?",a:[["La cámara detecta el posible desperdicio",1],["Se apagan las luces",0],["Se cierra el colegio",0]]},
 {q:"¿Qué ocurre si el desperdicio continúa?",a:[["No pasa nada",0],["Se cierra el grifo y se envía alerta máxima",1],["La alarma se desconecta",0]]},
 {q:"¿Qué hábito ayuda a cuidar el agua?",a:[["Usar solo lo necesario",1],["Dejar el grifo abierto",0],["No reportar fugas",0]]}
];
let qi=0,score=0,answered=false;
const qEl=document.getElementById("question"),answers=document.getElementById("answers"),feedback=document.getElementById("feedback"),next=document.getElementById("nextQuestion"),scoreEl=document.getElementById("score"),tank=document.getElementById("tankWater");
function renderQ(){answered=false;feedback.textContent="";next.classList.add("hidden");answers.innerHTML="";qEl.textContent=questions[qi].q;questions[qi].a.forEach(([text,correct])=>{const b=document.createElement("button");b.className="answer";b.textContent=text;b.onclick=()=>respond(correct,b);answers.appendChild(b)})}
function respond(correct,b){if(answered)return;answered=true;answers.querySelectorAll("button").forEach(x=>x.disabled=true);if(correct){score+=25;b.style.background="#E6FFF6";b.style.borderColor="#20A779";feedback.textContent="¡Correcto! Protegiste el agua. 💧";feedback.style.color="#168F69"}else{b.style.background="#FFF0F1";b.style.borderColor="#E8505B";feedback.textContent="Casi. La respuesta correcta protege el agua.";feedback.style.color="#C33A45";tank.style.height=Math.max(25,70-(qi+1)*10)+"%"}scoreEl.textContent="Puntaje: "+score;next.classList.remove("hidden")}
next.onclick=()=>{qi++;if(qi>=questions.length){qEl.textContent="¡Reto completado!";answers.innerHTML="";feedback.textContent=score>=75?"¡Excelente! Eres un verdadero protector del agua. 🌊":"Buen intento. Cada acción responsable cuenta. 💙";next.classList.add("hidden");return}renderQ()};renderQ();

const symbols=["📷","🚨","✉️","🚰","💧","🔌"],deck=[...symbols,...symbols].sort(()=>Math.random()-.5),memory=document.getElementById("memory");
let first=null,locked=false,matched=0;
deck.forEach(symbol=>{const b=document.createElement("button");b.className="memory-card";b.textContent="?";b.dataset.symbol=symbol;b.onclick=()=>flip(b);memory.appendChild(b)});
function flip(card){if(locked||card.classList.contains("matched")||card===first)return;card.textContent=card.dataset.symbol;card.classList.add("revealed");if(!first){first=card;return}if(first.dataset.symbol===card.dataset.symbol){first.classList.add("matched");card.classList.add("matched");first=null;matched+=2;if(matched===deck.length)document.getElementById("memoryMsg").textContent="¡Encontraste todos los pares! 🎉"}else{locked=true;setTimeout(()=>{first.textContent="?";card.textContent="?";first.classList.remove("revealed");card.classList.remove("revealed");first=null;locked=false},750)}}

document.getElementById("makeCertificate").onclick=()=>{const name=prompt("Escribe tu nombre para el certificado:");if(!name)return;document.getElementById("certificateName").textContent=name.toUpperCase();const cert=document.getElementById("certificate");cert.classList.remove("hidden");cert.scrollIntoView({behavior:"smooth",block:"center"})};
