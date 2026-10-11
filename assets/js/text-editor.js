import { firebaseConfig } from './editor-config.js';

const OWNER = 'kdystudy0426@gmail.com';
const PAGE = location.pathname.split('/').pop() || 'index.html';
const fields = new Map([...document.querySelectorAll('[data-edit-id]')].map(el => [el.dataset.editId, el]));
const defaults = Object.fromEntries([...fields].map(([id, el]) => [id, el.textContent]));
const launch = document.createElement('button');
launch.type = 'button'; launch.className = 'editor-launch'; launch.textContent = '문장 수정';
const toolbar = document.createElement('div');
toolbar.className = 'editor-toolbar'; toolbar.hidden = true;
toolbar.setAttribute('role', 'region'); toolbar.setAttribute('aria-label', '문장 편집');
const status = document.createElement('span');
status.className = 'editor-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
function button(label, className = '') {
  const el = document.createElement('button'); el.type = 'button'; el.textContent = label; el.className = className; return el;
}
const save = button('저장', 'editor-save'), cancel = button('취소'), logout = button('로그아웃');
toolbar.append(status, save, cancel, logout); document.body.append(launch, toolbar);
let sdk, auth, db, ref, user, loaded = {}, revision = 0, active = false, busy = false, ready = false;
const values = () => Object.fromEntries([...fields].map(([id, el]) => [id, el.textContent]));
const baseline = () => Object.fromEntries([...fields].map(([id]) => [id, typeof loaded[id] === 'string' ? loaded[id] : defaults[id]]));
function dirty() { const base = baseline(); return [...fields].some(([id, el]) => el.textContent !== base[id]); }
function apply() { const base = baseline(); for (const [id, el] of fields) { el.textContent = base[id]; el.style.whiteSpace = typeof loaded[id] === 'string' ? 'pre-wrap' : ''; } }
function notice(message) {
  const dialog = document.createElement('dialog'); dialog.className = 'editor-message';
  const p = document.createElement('p'); p.textContent = message;
  const close = button('확인'); close.onclick = () => dialog.close();
  dialog.append(p, close); document.body.append(dialog);
  dialog.addEventListener('close', () => { dialog.remove(); launch.focus(); }); dialog.showModal();
}
function controls(message) {
  if (message) status.textContent = message;
  save.disabled = busy || !dirty(); cancel.disabled = busy; logout.disabled = busy;
}
function mode(enabled) {
  active = enabled; document.body.classList.toggle('editor-active', enabled);
  toolbar.hidden = !enabled; launch.hidden = enabled;
  for (const el of fields.values()) {
    if (enabled) { el.setAttribute('contenteditable', 'plaintext-only'); el.setAttribute('spellcheck', 'false'); }
    else { el.removeAttribute('contenteditable'); el.removeAttribute('spellcheck'); }
  }
  if (enabled) controls('문장을 눌러 수정하세요.');
}
async function refresh() {
  const snapshot = await sdk.getDocFromServer(ref);
  const data = snapshot.exists() ? snapshot.data() : {};
  loaded = data.texts && typeof data.texts === 'object' ? data.texts : {};
  revision = Number.isInteger(data.revision) ? data.revision : 0;
  apply(); ready = true;
}
async function initialize() {
  if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId || !firebaseConfig?.authDomain) return;
  const [appSDK, authSDK, storeSDK] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js')
  ]);
  sdk = { ...authSDK, ...storeSDK };
  const app = appSDK.initializeApp(firebaseConfig);
  auth = sdk.getAuth(app); db = sdk.getFirestore(app); ref = sdk.doc(db, 'portfolioPages', PAGE);
  sdk.onAuthStateChanged(auth, current => {
    user = current;
    if (active && (current?.email !== OWNER || !current.emailVerified)) { apply(); mode(false); }
  });
  await refresh();
}
const initialization = initialize().catch(() => { launch.title = '저장된 문장을 불러오지 못했습니다. 다시 시도하세요.'; });
launch.onclick = async () => {
  if (busy) return;
  if (!firebaseConfig?.apiKey) { notice('문장 편집 기능을 연결하는 중입니다. 연결이 완료되면 구글 계정으로 로그인해 수정할 수 있습니다.'); return; }
  busy = true; launch.disabled = true;
  try {
    await initialization;
    if (!sdk) throw new Error('setup');
    const provider = new sdk.GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account', login_hint: OWNER });
    const result = await sdk.signInWithPopup(auth, provider);
    const token = await result.user.getIdTokenResult();
    if (result.user.email !== OWNER || !result.user.emailVerified || token.signInProvider !== 'google.com') {
      await sdk.signOut(auth); notice('수정 권한이 없는 계정입니다. 지정한 구글 계정으로 로그인해 주세요.'); return;
    }
    user = result.user;
    await refresh(); mode(true);
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') notice('로그인 또는 저장소 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  } finally { busy = false; launch.disabled = false; controls(); }
};
for (const el of fields.values()) {
  el.addEventListener('input', () => { if (active) controls(dirty() ? '저장하지 않은 변경 사항' : '변경 사항 없음'); });
  el.addEventListener('paste', event => {
    if (!active) return;
    event.preventDefault(); document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
  });
  el.addEventListener('drop', event => { if (active) event.preventDefault(); });
}
// Prevent existing navigation/video handlers while editing links.
document.addEventListener('click', event => {
  if (active && event.target.closest('[data-edit-id]')) { event.preventDefault(); event.stopImmediatePropagation(); }
}, true);
document.addEventListener('keydown', event => {
  if (active && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') { event.preventDefault(); if (!save.disabled) save.click(); }
  if (active && event.target.closest('[data-edit-id]') && event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.target.blur(); }
}, true);
save.onclick = async () => {
  if (busy || !active || !ready || !dirty() || user?.email !== OWNER) return;
  const current = values();
  if (Object.values(current).some(text => text.length > 10000)) { controls('문장 하나는 10,000자 이내로 입력하세요.'); return; }
  const texts = Object.fromEntries(Object.entries(current).filter(([id, text]) => text !== defaults[id]));
  busy = true; controls('저장 중…');
  try {
    await sdk.runTransaction(db, async transaction => {
      const snapshot = await transaction.get(ref);
      const latest = snapshot.exists() ? snapshot.data().revision : 0;
      if (latest !== revision) throw new Error('conflict');
      transaction.set(ref, { texts, revision: revision + 1, updatedAt: sdk.serverTimestamp() });
    });
    loaded = texts; revision++; status.textContent = '저장 완료';
  } catch (error) {
    status.textContent = error.message === 'conflict'
      ? '다른 창에서 수정했습니다. 내용을 복사한 후 새로고침해 주세요.'
      : '저장 실패. 수정 내용은 남아 있습니다. 다시 저장해 주세요.';
  } finally { busy = false; controls(); }
};
cancel.onclick = () => {
  if (dirty() && !confirm('저장하지 않은 변경 사항을 취소할까요?')) return;
  apply(); mode(false);
};
logout.onclick = async () => {
  if (dirty() && !confirm('변경 사항을 취소하고 로그아웃할까요?')) return;
  busy = true; controls();
  try { await sdk.signOut(auth); apply(); mode(false); }
  catch { controls('로그아웃에 실패했습니다. 다시 시도해 주세요.'); }
  finally { busy = false; controls(); }
};
window.addEventListener('beforeunload', event => { if (active && dirty()) { event.preventDefault(); event.returnValue = ''; } });
