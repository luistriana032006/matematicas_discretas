// ── QUESTION BANK ──
// Each question: { level, expr, vars, steps, answer }
// steps: [{label, expr, result}]

function rnd(){ return Math.round(Math.random()) }

function makeQuestions(){
  const bank = [];

  // Level 1 — simple
  const simples = [
    (a,b)=>({level:1, label:'AND', expr:`A ∧ B`, vars:{A:a,B:b},
      steps:[{label:'A ∧ B', calc:`${a} ∧ ${b}`, result:a&b}],
      answer:a&b}),
    (a,b)=>({level:1, label:'OR', expr:`A ∨ B`, vars:{A:a,B:b},
      steps:[{label:'A ∨ B', calc:`${a} ∨ ${b}`, result:a|b}],
      answer:a|b}),
    (a)=>({level:1, label:'NOT', expr:`¬ A`, vars:{A:a},
      steps:[{label:'¬A', calc:`¬${a}`, result:a?0:1}],
      answer:a?0:1}),
    (a,b)=>({level:1, label:'NAND', expr:`¬(A ∧ B)`, vars:{A:a,B:b},
      steps:[
        {label:'A ∧ B', calc:`${a} ∧ ${b}`, result:a&b},
        {label:'¬(resultado)', calc:`¬${a&b}`, result:(a&b)?0:1}
      ], answer:(a&b)?0:1}),
    (a,b)=>({level:1, label:'NOR', expr:`¬(A ∨ B)`, vars:{A:a,B:b},
      steps:[
        {label:'A ∨ B', calc:`${a} ∨ ${b}`, result:a|b},
        {label:'¬(resultado)', calc:`¬${a|b}`, result:(a|b)?0:1}
      ], answer:(a|b)?0:1}),
    (a,b)=>({level:1, label:'XOR', expr:`A ⊕ B`, vars:{A:a,B:b},
      steps:[{label:'A ⊕ B', calc:`${a} ⊕ ${b}`, result:a^b}],
      answer:a^b}),
  ];

  // Level 2 — compound 2 vars
  const compound2 = [
    (a,b)=>({level:2, label:'COMPUESTA', expr:`(A ∧ B) ∨ ¬A`, vars:{A:a,B:b},
      steps:[
        {label:'A ∧ B', calc:`${a} ∧ ${b}`, result:a&b},
        {label:'¬A', calc:`¬${a}`, result:a?0:1},
        {label:'(A∧B) ∨ ¬A', calc:`${a&b} ∨ ${a?0:1}`, result:(a&b)|(a?0:1)}
      ], answer:(a&b)|(a?0:1)}),
    (a,b)=>({level:2, label:'COMPUESTA', expr:`¬A ∧ ¬B`, vars:{A:a,B:b},
      steps:[
        {label:'¬A', calc:`¬${a}`, result:a?0:1},
        {label:'¬B', calc:`¬${b}`, result:b?0:1},
        {label:'¬A ∧ ¬B', calc:`${a?0:1} ∧ ${b?0:1}`, result:(a?0:1)&(b?0:1)}
      ], answer:(a?0:1)&(b?0:1)}),
    (a,b)=>({level:2, label:'COMPUESTA', expr:`¬(A ∨ B) ∨ A`, vars:{A:a,B:b},
      steps:[
        {label:'A ∨ B', calc:`${a} ∨ ${b}`, result:a|b},
        {label:'¬(A∨B)', calc:`¬${a|b}`, result:(a|b)?0:1},
        {label:'¬(A∨B) ∨ A', calc:`${(a|b)?0:1} ∨ ${a}`, result:((a|b)?0:1)|a}
      ], answer:((a|b)?0:1)|a}),
    (a,b)=>({level:2, label:'COMPUESTA', expr:`(A ∨ B) ∧ ¬B`, vars:{A:a,B:b},
      steps:[
        {label:'A ∨ B', calc:`${a} ∨ ${b}`, result:a|b},
        {label:'¬B', calc:`¬${b}`, result:b?0:1},
        {label:'(A∨B) ∧ ¬B', calc:`${a|b} ∧ ${b?0:1}`, result:(a|b)&(b?0:1)}
      ], answer:(a|b)&(b?0:1)}),
  ];

  // Level 3 — compound 3 vars
  const compound3 = [
    (a,b,c)=>{
      const s1=a&b, s2=c?0:1, ans=s1|s2;
      return {level:3, label:'NIVEL 3', expr:`(A ∧ B) ∨ ¬C`, vars:{A:a,B:b,C:c},
        steps:[
          {label:'A ∧ B', calc:`${a} ∧ ${b}`, result:s1},
          {label:'¬C', calc:`¬${c}`, result:s2},
          {label:'(A∧B) ∨ ¬C', calc:`${s1} ∨ ${s2}`, result:ans}
        ], answer:ans};},
    (a,b,c)=>{
      const s1=a|b, s2=c?0:1, ans=s1&s2;
      return {level:3, label:'NIVEL 3', expr:`(A ∨ B) ∧ ¬C`, vars:{A:a,B:b,C:c},
        steps:[
          {label:'A ∨ B', calc:`${a} ∨ ${b}`, result:s1},
          {label:'¬C', calc:`¬${c}`, result:s2},
          {label:'(A∨B) ∧ ¬C', calc:`${s1} ∧ ${s2}`, result:ans}
        ], answer:ans};},
    (a,b,c)=>{
      const s1=a&b, s2=s1|c, ans=s2?0:1;
      return {level:3, label:'NIVEL 3', expr:`¬((A ∧ B) ∨ C)`, vars:{A:a,B:b,C:c},
        steps:[
          {label:'A ∧ B', calc:`${a} ∧ ${b}`, result:s1},
          {label:'(A∧B) ∨ C', calc:`${s1} ∨ ${c}`, result:s2},
          {label:'¬((A∧B)∨C)', calc:`¬${s2}`, result:ans}
        ], answer:ans};},
    (a,b,c)=>{
      const s1=b&c, s2=a|s1;
      return {level:3, label:'NIVEL 3', expr:`A ∨ (B ∧ C)`, vars:{A:a,B:b,C:c},
        steps:[
          {label:'B ∧ C', calc:`${b} ∧ ${c}`, result:s1},
          {label:'A ∨ (B∧C)', calc:`${a} ∨ ${s1}`, result:s2}
        ], answer:s2};},
  ];

  const a=rnd(),b=rnd(),c=rnd();
  const a2=rnd(),b2=rnd(),c2=rnd();
  const a3=rnd(),b3=rnd(),c3=rnd();
  const a4=rnd(),b4=rnd(),c4=rnd();

  // Pick 4 questions: 1 simple, 1 compound2, 2 compound3
  const q1 = simples[Math.floor(Math.random()*simples.length)](a,b,c);
  const q2 = compound2[Math.floor(Math.random()*compound2.length)](a2,b2);
  const q3 = compound3[Math.floor(Math.random()*compound3.length)](a3,b3,c3);
  const q4 = compound3[Math.floor(Math.random()*compound3.length)](a4,b4,c4);

  return [q1,q2,q3,q4];
}

// ── STATE ──
let questions=[], qIdx=0, stepIdx=0;
let score=0, correct=0, incorrect=0, streak=0, maxStreak=0, maxLevel=1;
let stepAnswered=false, qAnswered=false;

const LEVEL_COLORS = {1:'#22c55e', 2:'#fbbf24', 3:'#ef4444'};
const LEVEL_NAMES  = {1:'NIVEL 1 — BÁSICO', 2:'NIVEL 2 — COMPUESTA', 3:'NIVEL 3 — AVANZADO'};

function startGame(){
  questions = makeQuestions();
  qIdx=0; stepIdx=0; score=0; correct=0; incorrect=0; streak=0; maxStreak=0; maxLevel=1;
  document.getElementById('score-card').classList.remove('show');
  document.getElementById('quiz-card').style.display='block';
  document.getElementById('round-msg').textContent='';
  renderDots();
  loadQuestion();
}

function renderDots(){
  const wrap = document.getElementById('dots');
  wrap.innerHTML='';
  questions.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='dot'+(i===qIdx?' current':'');
    d.id='dot-'+i;
    wrap.appendChild(d);
  });
}

function loadQuestion(){
  stepIdx=0; stepAnswered=false; qAnswered=false;
  setBulb(null);
  const q=questions[qIdx];
  maxLevel=Math.max(maxLevel,q.level);

  // level badge
  document.getElementById('level-dot').style.background=LEVEL_COLORS[q.level];
  document.getElementById('level-text').textContent=LEVEL_NAMES[q.level];

  // expression
  document.getElementById('expr-text').textContent=q.expr;

  // vars
  const varsRow=document.getElementById('vars-row');
  varsRow.innerHTML='';
  Object.entries(q.vars).forEach(([k,v])=>{
    const pill=document.createElement('div');
    pill.className='var-pill';
    pill.innerHTML=`${k} = <span class="${v?'v1':'v0'}" style="font-weight:900">${v}</span>`;
    varsRow.appendChild(pill);
  });

  // steps
  const stepList=document.getElementById('step-list');
  stepList.innerHTML='';
  q.steps.forEach((s,i)=>{
    const el=document.createElement('div');
    el.className='step-item'+(i===0?' active':'');
    el.id='step-'+i;
    el.innerHTML=`
      <div class="step-num">${i+1}</div>
      <div class="step-expr">${s.label} = ${s.calc} = <strong>?</strong></div>
      <div class="step-badge" id="step-badge-${i}"></div>
    `;
    stepList.appendChild(el);
  });

  // progress
  document.getElementById('q-label').textContent=`PREGUNTA ${qIdx+1} / ${questions.length}`;
  document.getElementById('progress-fill').style.width=`${(qIdx/questions.length)*100}%`;
  updateScoreLabel();
  renderInputArea();
  clearFeedback();
  document.getElementById('next-btn').classList.remove('show');
}

function renderInputArea(){
  const q=questions[qIdx];
  const s=q.steps[stepIdx];
  const isLast = stepIdx===q.steps.length-1;
  document.getElementById('input-question').textContent=
    isLast ? `¿Cuál es el resultado FINAL de: ${s.label}?`
           : `Paso ${stepIdx+1}: ¿Cuánto da ${s.label}?`;
  const b0=document.getElementById('btn0');
  const b1=document.getElementById('btn1');
  b0.className='ans-btn'; b1.className='ans-btn';
  b0.disabled=false; b1.disabled=false;
}

function answer(val){
  if(stepAnswered) return;
  stepAnswered=true;

  const q=questions[qIdx];
  const s=q.steps[stepIdx];
  const correct_ans = s.result;
  const isCorrect = val===correct_ans;
  const isLastStep = stepIdx===q.steps.length-1;

  // update step row
  const stepEl=document.getElementById('step-'+stepIdx);
  const badge=document.getElementById('step-badge-'+stepIdx);
  stepEl.className='step-item '+(isCorrect?'done-ok':'done-fail');
  stepEl.querySelector('strong').textContent=correct_ans;
  badge.textContent=isCorrect?'✓':'✗';
  badge.style.color=isCorrect?'#22c55e':'#ef4444';

  // highlight answer btn
  document.getElementById('btn'+val).className='ans-btn '+(isCorrect?'selected-ok':'selected-fail');
  if(!isCorrect) document.getElementById('btn'+correct_ans).className='ans-btn correct-hint';
  document.getElementById('btn0').disabled=true;
  document.getElementById('btn1').disabled=true;

  if(isLastStep){
    // question done
    if(isCorrect){
      correct++; streak++; maxStreak=Math.max(maxStreak,streak);
      const pts = q.level * 10 * (streak>2?2:1);
      score+=pts;
      showFeedback(`✓ ¡CORRECTO! +${pts} pts${streak>1?' · RACHA x'+streak:''}`, 'ok');
    } else {
      incorrect++; streak=0;
      showFeedback(`✗ Era ${correct_ans} — ¡revisa los pasos!`, 'fail');
    }
    updateDot(qIdx, isCorrect);
    updateScoreLabel();
    document.getElementById('next-btn').classList.add('show');
    document.getElementById('next-btn').textContent = qIdx<questions.length-1 ? 'SIGUIENTE PREGUNTA →' : 'VER RESULTADOS →';
    qAnswered=true;
    setBulb(q.answer);
  } else {
    // advance to next step
    showFeedback(isCorrect?`✓ Paso ${stepIdx+1} correcto — sigue`:`✗ Era ${correct_ans} — sigue al siguiente paso`, isCorrect?'ok':'fail');
    setTimeout(()=>{
      stepIdx++;
      stepAnswered=false;
      const nextStep=document.getElementById('step-'+stepIdx);
      if(nextStep) nextStep.className='step-item active';
      renderInputArea();
      clearFeedback();
    },900);
  }
}

function nextStep(){
  document.getElementById('next-btn').classList.remove('show');
  clearFeedback();
  qIdx++;
  if(qIdx>=questions.length){
    endRound();
  } else {
    // update dots
    document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('current',i===qIdx));
    document.getElementById('progress-fill').style.width=`${(qIdx/questions.length)*100}%`;
    document.getElementById('q-label').textContent=`PREGUNTA ${qIdx+1} / ${questions.length}`;
    loadQuestion();
  }
}

function endRound(){
  document.getElementById('quiz-card').style.display='none';
  document.getElementById('progress-fill').style.width='100%';
  const sc=document.getElementById('score-card');
  document.getElementById('final-score').textContent=score;
  document.getElementById('final-score').style.color=score>= 80?'#22c55e':score>=40?'#fbbf24':'#ef4444';
  document.getElementById('sc-ok').textContent=correct;
  document.getElementById('sc-fail').textContent=incorrect;
  document.getElementById('sc-streak').textContent=maxStreak;
  document.getElementById('sc-level').textContent=maxLevel;
  sc.classList.add('show');
}

function updateDot(i,ok){
  const d=document.getElementById('dot-'+i);
  if(d) d.className='dot '+(ok?'done-ok':'done-fail');
}

function showFeedback(msg,type){
  const el=document.getElementById('feedback');
  el.textContent=msg; el.className='feedback show '+type;
}
function clearFeedback(){
  const el=document.getElementById('feedback');
  el.textContent=''; el.className='feedback';
}
function updateScoreLabel(){
  document.getElementById('score-label').textContent=`PUNTOS: ${score}`;
}

function setBulb(val){
  const bulb = document.getElementById('bulb');
  const res = document.getElementById('bulb-result');
  if(val===null){
    bulb.className='bulb off';
    res.className='bulb-result off';
    res.textContent='APAGADA';
  } else if(val===1){
    bulb.className='bulb on';
    res.className='bulb-result on';
    res.textContent='ENCENDIDA 💡';
  } else {
    bulb.className='bulb off';
    res.className='bulb-result off';
    res.textContent='APAGADA ○';
  }
}

function toggleRef(){
  const panel = document.getElementById('ref-panel');
  panel.classList.toggle('open');
}

startGame();
