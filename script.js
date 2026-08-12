// ── theme toggle ──
function initTheme() {
  const saved = localStorage.getItem('studyflow-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeButton();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('studyflow-theme', newTheme);
  updateThemeButton();
}

function updateThemeButton() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', initTheme);

let sessions = [];
let sid = 0;
let algoMode = 'greedy';

const SUBJECT_COLORS = [
  { bar: '#7c6fff', text: '#c4bfff', dark: '#5b4fd1', light: 'rgba(124,111,255,.15)' },
  { bar: '#34d399', text: '#6ee7b7', dark: '#0d9268', light: 'rgba(52,211,153,.15)' },
  { bar: '#f87171', text: '#fca5a5', dark: '#c53a3a', light: 'rgba(248,113,113,.15)' },
  { bar: '#fbbf24', text: '#fcd34d', dark: '#a06a06', light: 'rgba(251,191,36,.15)' },
  { bar: '#60a5fa', text: '#93c5fd', dark: '#2662c9', light: 'rgba(96,165,250,.15)' },
  { bar: '#f472b6', text: '#f9a8d4', dark: '#c23e83', light: 'rgba(244,114,182,.15)' },
  { bar: '#a78bfa', text: '#c4b5fd', dark: '#6d4fd1', light: 'rgba(167,139,250,.15)' },
  { bar: '#2dd4bf', text: '#81e6d9', dark: '#128a7a', light: 'rgba(45,212,191,.15)' },
];

function subjectColor(i) { return SUBJECT_COLORS[i % SUBJECT_COLORS.length]; }
function timeToMin(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function minToTime(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }

// ── navigation ──
function nav(page) {
  ['sessions', 'algo', 'result'].forEach(p => {
    document.getElementById('view-' + p).classList.toggle('active', p === page);
    document.getElementById('nav-' + p).classList.toggle('active', p === page);
  });
  closeSidebar();
  updateSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

// ── session rows ──
function addSessionRow(data) {
  const id = ++sid;
  const d = data || { subject: '', start: '09:00', end: '10:00', priority: 4 };
  const el = document.createElement('div');
  el.id = 'sr-' + id;
  el.className = 'session-row';
  el.innerHTML = `
    <input type="text" value="${d.subject}" placeholder="Subject / Topic" id="sub-${id}">
    <input type="time" value="${d.start}" id="st-${id}">
    <input type="time" value="${d.end}" id="en-${id}">
    <select id="pr-${id}">
      <option value="4" ${d.priority==4?'selected':''}>P1 — Critical</option>
      <option value="3" ${d.priority==3?'selected':''}>P2 — High</option>
      <option value="2" ${d.priority==2?'selected':''}>P3 — Medium</option>
      <option value="1" ${d.priority==1?'selected':''}>P4 — Low</option>
    </select>
    <div class="row-actions">
      <button class="btn btn-ghost btn-icon btn-danger" onclick="removeRow(${id})" title="Remove">✕</button>
    </div>`;
  document.getElementById('sessions-body').appendChild(el);
  updateRowCount();
}

function removeRow(id) {
  document.getElementById('sr-' + id)?.remove();
  updateRowCount();
}

function updateRowCount() {
  const n = document.querySelectorAll('[id^="sr-"]').length;
  document.getElementById('row-count').textContent = n + ' session' + (n !== 1 ? 's' : '');
  document.getElementById('sb-total').textContent = n;
}

function getSessions() {
  const rows = document.querySelectorAll('[id^="sr-"]');
  const s = [];
  rows.forEach(r => {
    const id = r.id.replace('sr-', '');
    const sub = document.getElementById('sub-' + id)?.value.trim();
    const st = document.getElementById('st-' + id)?.value;
    const en = document.getElementById('en-' + id)?.value;
    const pr = parseInt(document.getElementById('pr-' + id)?.value || 1);
    if (sub && st && en && timeToMin(st) < timeToMin(en)) {
      s.push({ id, subject: sub, start: st, end: en, startMin: timeToMin(st), endMin: timeToMin(en), priority: pr });
    }
  });
  return s;
}

function clearAll() {
  if (!confirm('Clear all sessions?')) return;
  document.getElementById('sessions-body').innerHTML = '';
  sid = 0;
  updateRowCount();
  updateSidebar();
}

// ── sample data ──
function loadSample() {
  document.getElementById('sessions-body').innerHTML = '';
  sid = 0;
  const sample = [
    { subject: 'Mathematics', start: '08:00', end: '10:00', priority: 4 },
    { subject: 'Physics', start: '09:00', end: '11:00', priority: 3 },
    { subject: 'Chemistry', start: '10:30', end: '12:30', priority: 4 },
    { subject: 'English', start: '11:00', end: '12:00', priority: 2 },
    { subject: 'History', start: '12:00', end: '13:30', priority: 2 },
    { subject: 'Biology', start: '13:00', end: '15:00', priority: 3 },
    { subject: 'Computer Science', start: '14:00', end: '16:00', priority: 4 },
    { subject: 'Geography', start: '15:30', end: '17:00', priority: 1 },
    { subject: 'Economics', start: '16:00', end: '18:00', priority: 3 },
    { subject: 'Literature', start: '17:30', end: '19:00', priority: 2 },
  ];
  sample.forEach(d => addSessionRow(d));
}

// ── algorithm selection ──
function selectAlgo(a) {
  algoMode = a;
  ['greedy', 'weighted', 'partition'].forEach(x => {
    document.getElementById('card-' + x).classList.toggle('selected', x === a);
  });
  const names = { greedy: 'Greedy Algorithm', weighted: 'Weighted DP', partition: 'Interval Partitioning' };
  document.getElementById('top-algo-name').textContent = names[a];
  const dots = { greedy: '#34d399', weighted: '#7c6fff', partition: '#fbbf24' };
  document.getElementById('top-dot').style.background = dots[a];
}

// ── algorithms ──
function greedySchedule(sessions) {
  const sorted = [...sessions].sort((a, b) => a.endMin - b.endMin);
  const selected = []; let lastEnd = -1;
  sorted.forEach(s => { if (s.startMin >= lastEnd) { selected.push(s); lastEnd = s.endMin; } });
  return selected;
}

function weightedDP(sessions) {
  const sorted = [...sessions].sort((a, b) => a.endMin - b.endMin);
  const n = sorted.length;
  function latestNonConflict(i) {
    for (let j = i - 1; j >= 0; j--) { if (sorted[j].endMin <= sorted[i].startMin) return j; }
    return -1;
  }
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    const s = sorted[i - 1];
    const p = latestNonConflict(i - 1);
    dp[i] = Math.max(dp[i - 1], s.priority + (p >= 0 ? dp[p + 1] : 0));
  }
  const sel = []; let i = n;
  while (i > 0) {
    const s = sorted[i - 1];
    const p = latestNonConflict(i - 1);
    if (s.priority + (p >= 0 ? dp[p + 1] : 0) > dp[i - 1]) { sel.unshift(s); i = p >= 0 ? p + 1 : 0; }
    else i--;
  }
  return sel;
}

function intervalPartition(sessions) {
  const sorted = [...sessions].sort((a, b) => a.startMin - b.startMin);
  const rooms = [];
  sorted.forEach(s => {
    let placed = false;
    for (let r = 0; r < rooms.length; r++) {
      if (rooms[r][rooms[r].length - 1].endMin <= s.startMin) { rooms[r].push(s); placed = true; break; }
    }
    if (!placed) rooms.push([s]);
  });
  return rooms;
}

// ── timeline builder ──
function buildTimeline(sessions, selected) {
  const selIds = new Set(selected.map(s => s.id));
  const allMins = sessions.map(s => [s.startMin, s.endMin]).flat();
  const minT = Math.min(...allMins), maxT = Math.max(...allMins);
  const span = maxT - minT || 60;
  const pct = m => ((m - minT) / span * 100).toFixed(2) + '%';
  const w = (s, e) => Math.max(((e - s) / span * 100), 0.8).toFixed(2) + '%';

  const subjMap = {};
  sessions.forEach((s, i) => { if (!(s.subject in subjMap)) subjMap[s.subject] = i; });
  const bySubj = {};
  sessions.forEach(s => { (bySubj[s.subject] = bySubj[s.subject] || []).push(s); });

  let ticks = '';
  const step = span > 300 ? 120 : 60;
  for (let m = Math.ceil(minT / step) * step; m <= maxT; m += step) {
    ticks += `<span class="tl-tick" style="left:${pct(m)}">${minToTime(m)}</span>`;
  }

  let rows = `<div class="tl-tick-row"><div class="tl-tick-spacer"></div><div class="tl-tick-track">${ticks}</div></div>`;
  Object.keys(bySubj).forEach(subj => {
    const col = subjectColor(subjMap[subj]);
    const blocks = bySubj[subj].map(s => {
      const active = selIds.has(s.id);
      return `<div class="tl-block" title="${s.subject}: ${s.start}–${s.end}" style="left:${pct(s.startMin)};width:${w(s.startMin, s.endMin)};background:${col.bar};opacity:${active ? '1' : '0.2'};padding:0 4px;color:${col.text}">
        <span style="overflow:hidden;white-space:nowrap">${active ? s.subject : ''}</span></div>`;
    }).join('');
    rows += `<div class="tl-row"><div class="tl-label">${subj}</div><div class="tl-track">${blocks}</div></div>`;
  });
  return rows;
}

// ── run scheduler ──
function runScheduler() {
  const sessions = getSessions();
  if (!sessions.length) { alert('Add at least one valid study session first.'); nav('sessions'); return; }
  nav('result');

  let html = '';

  if (algoMode === 'partition') {
    const rooms = intervalPartition(sessions);
    const allMins = sessions.map(s => [s.startMin, s.endMin]).flat();
    const minT = Math.min(...allMins), maxT = Math.max(...allMins);
    const span = maxT - minT || 60;
    const pct = m => ((m - minT) / span * 100).toFixed(2) + '%';
    const w = (s, e) => Math.max(((e - s) / span * 100), 0.8).toFixed(2) + '%';

    const subjMap = {};
    sessions.forEach((s, i) => { if (!(s.subject in subjMap)) subjMap[s.subject] = i; });

    const step = span > 300 ? 120 : 60;
    let ticks = '';
    for (let m = Math.ceil(minT / step) * step; m <= maxT; m += step) {
      ticks += `<span class="tl-tick" style="left:${pct(m)}">${minToTime(m)}</span>`;
    }

    html += `<div class="page-head">
      <div><div class="page-title">Optimal Plan — Interval Partitioning</div>
      <div class="page-sub">All ${sessions.length} sessions scheduled across ${rooms.length} parallel study tracks</div></div>
      <button class="btn" onclick="nav('algo')">← Change Algorithm</button>
    </div>`;

    html += `<div class="stat-grid">
      <div class="stat-card stat-accent"><div class="stat-val">${sessions.length}</div><div class="stat-label">Total sessions</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--green)">${sessions.length}</div><div class="stat-label">Sessions scheduled</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--amber)">${rooms.length}</div><div class="stat-label">Study tracks needed</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--accent2)">0</div><div class="stat-label">Sessions dropped</div></div>
    </div>`;

    html += `<div class="timeline-wrap">
      <div class="tl-section-title">📅 All tracks — Gantt view</div>`;

    const trackColors = ['#7c6fff','#34d399','#f87171','#fbbf24','#60a5fa','#f472b6','#a78bfa'];
    rooms.forEach((room, ri) => {
      const tc = trackColors[ri % trackColors.length];
      html += `<div style="margin-bottom:12px">
        <div class="track-label"><div class="track-dot" style="background:${tc}"></div>Track ${ri + 1} — ${room.length} session${room.length !== 1 ? 's' : ''}</div>
        <div class="tl-tick-row"><div class="tl-tick-spacer"></div><div class="tl-tick-track">${ticks}</div></div>
        <div class="tl-row"><div class="tl-label">Track ${ri + 1}</div>
          <div class="tl-track">`;
      room.forEach(s => {
        const col = subjectColor(subjMap[s.subject]);
        html += `<div class="tl-block" title="${s.subject}: ${s.start}–${s.end}" style="left:${pct(s.startMin)};width:${w(s.startMin,s.endMin)};background:${col.bar};color:${col.text};padding:0 4px">
          <span style="overflow:hidden;white-space:nowrap">${s.subject}</span></div>`;
      });
      html += `</div></div></div>`;
    });
    html += `</div>`;

    rooms.forEach((room, ri) => {
      const tc = trackColors[ri % trackColors.length];
      html += `<div class="plan-wrap">
        <div class="plan-head"><span>Track ${ri + 1}</span><span class="badge" style="background:rgba(20,22,40,.06);color:var(--muted)">${room.length} sessions</span></div>`;
      room.sort((a, b) => a.startMin - b.startMin).forEach((s, idx) => {
        const col = subjectColor(subjMap[s.subject]);
        const dur = s.endMin - s.startMin;
        html += `<div class="plan-item">
          <div class="plan-num" style="background:${col.light};border-color:${col.bar}30;color:${col.dark}">${idx + 1}</div>
          <div>
            <div class="plan-subject">${s.subject}</div>
            <div class="plan-meta">
              <span class="plan-time-badge">🕐 ${s.start} – ${s.end}</span>
              <span class="plan-time-badge">⏱ ${dur} min</span>
              <span class="badge badge-p${5 - s.priority}">P${5 - s.priority}</span>
            </div>
          </div>
        </div>`;
      });
      html += `</div>`;
    });

  } else {
    const selected = algoMode === 'greedy' ? greedySchedule(sessions) : weightedDP(sessions);
    const skipped = sessions.filter(s => !selected.find(x => x.id === s.id));
    const totalPri = selected.reduce((a, s) => a + s.priority, 0);
    const totalTime = selected.reduce((a, s) => a + (s.endMin - s.startMin), 0);
    const algoLabel = algoMode === 'greedy' ? 'Greedy Interval Scheduling' : 'Weighted DP';

    const subjMap = {};
    sessions.forEach((s, i) => { if (!(s.subject in subjMap)) subjMap[s.subject] = i; });

    // update sidebar
    document.getElementById('sb-selected').textContent = selected.length;
    document.getElementById('sb-hours').textContent = (totalTime / 60).toFixed(1) + 'h';

    html += `<div class="page-head">
      <div><div class="page-title">Optimal Plan — ${algoLabel}</div>
      <div class="page-sub">${selected.length} of ${sessions.length} sessions selected · ${Math.floor(totalTime / 60)}h ${totalTime % 60}m total study time</div></div>
      <button class="btn" onclick="nav('algo')">← Change Algorithm</button>
    </div>`;

    html += `<div class="stat-grid">
      <div class="stat-card stat-accent"><div class="stat-val">${selected.length}</div><div class="stat-label">Sessions selected</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--green)">${Math.floor(totalTime / 60)}h ${totalTime % 60}m</div><div class="stat-label">Total study time</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--accent2)">${totalPri}</div><div class="stat-label">Priority score</div></div>
      <div class="stat-card"><div class="stat-val" style="color:var(--red)">${skipped.length}</div><div class="stat-label">Sessions deferred</div></div>
    </div>`;

    html += `<div class="timeline-wrap">
      <div class="tl-section-title">📅 Timeline — <span style="color:var(--muted);font-weight:400;font-size:12px">highlighted = selected, faded = deferred</span></div>
      ${buildTimeline(sessions, selected)}
    </div>`;

    html += `<div class="plan-wrap">
      <div class="plan-head">
        <span>📋 Study plan (${selected.length} sessions)</span>
        <span style="font-size:12px;color:var(--muted);font-weight:400">sorted by start time</span>
      </div>`;
    selected.sort((a, b) => a.startMin - b.startMin).forEach((s, i) => {
      const col = subjectColor(subjMap[s.subject]);
      const dur = s.endMin - s.startMin;
      html += `<div class="plan-item">
        <div class="plan-num" style="background:${col.light};border-color:${col.bar}30;color:${col.dark}">${i + 1}</div>
        <div>
          <div class="plan-subject">${s.subject}</div>
          <div class="plan-meta">
            <span class="plan-time-badge">🕐 ${s.start} – ${s.end}</span>
            <span class="plan-time-badge">⏱ ${dur} min</span>
            <span class="badge badge-p${5 - s.priority}">P${5 - s.priority}</span>
          </div>
        </div>
        <div style="width:4px;height:36px;border-radius:2px;background:${col.bar};flex-shrink:0"></div>
      </div>`;
    });
    html += `</div>`;

    if (skipped.length) {
      html += `<div class="plan-wrap">
        <div class="plan-head" style="color:var(--muted)">
          <span>⏭ Deferred sessions (${skipped.length})</span>
          <span style="font-size:12px;font-weight:400">overlapped or lower priority</span>
        </div>`;
      skipped.forEach(s => {
        const conflicts = sessions.filter(x => x.id !== s.id && x.startMin < s.endMin && x.endMin > s.startMin && selected.find(y => y.id === x.id));
        html += `<div class="deferred-item">
          <div class="deferred-x">✕</div>
          <div>
            <div class="plan-subject" style="color:var(--muted)">${s.subject}</div>
            <div class="plan-meta">
              <span class="plan-time-badge">${s.start} – ${s.end}</span>
              <span class="badge badge-p${5 - s.priority}">P${5 - s.priority}</span>
              ${conflicts.map(c => `<span class="conflict-tag">⚡ conflicts: ${c.subject}</span>`).join('')}
            </div>
          </div>
        </div>`;
      });
      html += `</div>`;
    }

    html += `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r2);padding:1.25rem;display:flex;align-items:flex-start;gap:12px">
      <div style="font-size:20px">💡</div>
      <div>
        <div style="font-weight:500;margin-bottom:4px">Study tip</div>
        <div style="font-size:13px;color:var(--muted);line-height:1.6">
          Take a 10-minute break between each session. High-priority sessions (P1/P2) are best studied in the morning when focus is highest. 
          Consider rescheduling deferred sessions to the next day rather than skipping them entirely.
        </div>
      </div>
    </div>`;
  }

  document.getElementById('result-area').innerHTML = html;
}

// ── export ──
function exportPlan() {
  const sessions = getSessions();
  if (!sessions.length) { alert('No sessions to export.'); return; }
  let selected;
  if (algoMode === 'partition') { selected = sessions; }
  else { selected = algoMode === 'greedy' ? greedySchedule(sessions) : weightedDP(sessions); }
  const lines = ['StudyFlow — Optimal Study Plan', '='.repeat(40), `Algorithm: ${algoMode}`, `Generated: ${new Date().toLocaleString()}`, '', 'SELECTED SESSIONS:', '-'.repeat(40)];
  selected.sort((a, b) => a.startMin - b.startMin).forEach((s, i) => {
    lines.push(`${i + 1}. ${s.subject.padEnd(20)} ${s.start} – ${s.end}  [P${5 - s.priority}]`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'study-plan.txt';
  a.click();
}

// ── sidebar stats ──
function updateSidebar() {
  const n = document.querySelectorAll('[id^="sr-"]').length;
  document.getElementById('sb-total').textContent = n;
}

// init
loadSample();
