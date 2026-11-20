(function(){
  'use strict';
  if(window.__BSA_SHARED_MODE__)return;
  const DB='bsa_study_owner_approved_v1', STORE='authorizations', KEY='approved';
  const SALT='ymX+Nt9sLK1Ip4jkXv4Z7A==';
  const VERIFIER='IK4yrYJqQwp4aloXoz4KF8ls/keTWmfsXrJaUQOWhuQ=';
  const ROUNDS=275000;
  const root=document.getElementById('root');
  // This is a convenience access gate, not server-side authentication.
  // No passphrase text or vault values are stored in the page.
  let complete=false;
  function mount(){if(complete)return;complete=true;removeDialog();if(typeof window.__BSA_OWNER_MOUNT__==='function')window.__BSA_OWNER_MOUNT__();}
  function database(){return new Promise((ok,fail)=>{
    if(!window.indexedDB)return fail(Error('Device storage is not available'));
    const req=indexedDB.open(DB,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE)};
    req.onsuccess=()=>ok(req.result);req.onerror=()=>fail(req.error||Error('Device storage error'));
  });}
  async function getApproval(){
    const db=await database();
    try{return await new Promise((yes,no)=>{
      const tx=db.transaction(STORE,'readonly');const req=tx.objectStore(STORE).get(KEY);
      req.onsuccess=()=>yes(req.result===true);req.onerror=()=>no(req.error);
    });}finally{db.close()}
  }
  async function rememberApproval(){
    const db=await database();
    try{await new Promise((yes,no)=>{
      const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(true,KEY);
      tx.oncomplete=()=>yes();tx.onerror=()=>no(tx.error||Error('Device approval could not be saved'));
    });}finally{db.close()}
  }
  window.__BSA_DEVICE_REVOKE__=async()=>{
    if(!window.confirm('Require device approval again next time? Your saved study progress and vault entries will NOT be deleted.'))return;
    try{const db=await database();await new Promise((yes,no)=>{
      const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(KEY);
      tx.oncomplete=yes;tx.onerror=()=>no(tx.error);
    });db.close();location.reload();}catch(e){window.alert('Could not reset device approval: '+String(e&&e.message||e));}
  };
  function removeDialog(){const d=document.getElementById('bsa-owner-access-gate');if(d)d.remove();const style=document.getElementById('bsa-owner-gate-style');if(style)style.remove();}
  function renderDialog(){
    if(document.getElementById('bsa-owner-access-gate'))return;
    const style=document.createElement('style');style.id='bsa-owner-gate-style';style.textContent=`
      #bsa-owner-access-gate{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:max(24px,env(safe-area-inset-top,0px)) 20px max(24px,env(safe-area-inset-bottom,0px));background:radial-gradient(circle at 20% 8%,#244b49,#0d1b27 65%);color:#f4fbf9;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:auto}
      #bsa-owner-access-gate *{box-sizing:border-box}
      #bsa-owner-access-gate .bsa-access-card{width:min(100%,425px);border:1px solid #ffffff26;border-radius:24px;padding:clamp(24px,4vw,34px);background:#ffffff0d;box-shadow:0 24px 80px #0007;backdrop-filter:blur(16px)}
      #bsa-owner-access-gate .bsa-access-icon{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;font-size:26px;background:#b1f0db22;border:1px solid #b1f0db55;margin-bottom:18px}
      #bsa-owner-access-gate h1{font-size:clamp(22px,4vw,28px);font-weight:750;letter-spacing:-.025em;line-height:1.15;margin:0 0 10px;color:#fff}
      #bsa-owner-access-gate p{font-size:14px;line-height:1.65;color:#d3e5e1;margin:0 0 20px}
      #bsa-owner-access-gate label{display:block;font-weight:650;font-size:13px;margin-bottom:8px}
      #bsa-owner-access-gate input{width:100%;padding:14px 14px;background:#0b1928;border:1px solid #9cb7ad70;border-radius:13px;color:white;font:inherit;font-size:16px;outline-offset:2px}
      #bsa-owner-access-gate input:focus-visible{outline:2px solid #b1f0db}
      #bsa-owner-access-gate button{width:100%;padding:13px 18px;border:0;border-radius:12px;font-size:15px;font-weight:750;background:#9de6c9;color:#12362e;cursor:pointer;margin-top:14px}
      #bsa-owner-access-gate button:disabled{opacity:.6;cursor:wait}
      #bsa-owner-access-gate .bsa-access-error{color:#ffbdc0;font-size:13px;min-height:22px;margin:10px 0 0}
      #bsa-owner-access-gate .bsa-access-note{font-size:12px;color:#a4bbb4;margin-top:18px;line-height:1.55}
    `;
    document.head.appendChild(style);
    const view=document.createElement('div');view.id='bsa-owner-access-gate';view.setAttribute('role','dialog');view.setAttribute('aria-modal','true');view.setAttribute('aria-labelledby','bsa-access-title');
    view.innerHTML='<section class="bsa-access-card"><div class="bsa-access-icon" aria-hidden="true">✦</div><h1 id="bsa-access-title">Welcome back to Study Desk</h1><p>Approve this browser once to open your personal dashboard. This authorization stays on this browser until its site data is removed or you revoke it.</p><form id="bsa-owner-access-form"><label for="bsa-owner-access-input">Device access phrase</label><input id="bsa-owner-access-input" type="password" autocomplete="off" required placeholder="Enter your access phrase"/><div class="bsa-access-error" role="status" aria-live="polite" id="bsa-owner-access-error"></div><button type="submit" id="bsa-owner-access-submit">Unlock this device</button></form><div class="bsa-access-note">Your phrase is checked on this device; it is not stored as text. Your shared student dashboard remains accessible without this screen.</div></section>';
    document.body.appendChild(view);
    const form=view.querySelector('form'),input=view.querySelector('input'),button=view.querySelector('button'),error=view.querySelector('#bsa-owner-access-error');
    form.addEventListener('submit',async e=>{
      e.preventDefault();button.disabled=true;error.textContent='Checking…';
      try{
        if(!crypto||!crypto.subtle||!window.isSecureContext)throw Error('Open your dashboard over HTTPS to approve a device.');
        const supplied=input.value.trim().replace(/\s+/g,' ').toLowerCase();
        const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(supplied),'PBKDF2',false,['deriveBits']);
        const salt=Uint8Array.from(atob(SALT),ch=>ch.charCodeAt(0));
        const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:ROUNDS,hash:'SHA-256'},key,256);
        const got=new Uint8Array(bits),want=Uint8Array.from(atob(VERIFIER),ch=>ch.charCodeAt(0));
        let different=0;for(let i=0;i<got.length;i++)different|=got[i]^want[i];
        if(different)throw Error('That phrase does not match. Try again.');
        try{await rememberApproval()}catch(storageError){window.alert('Access granted, but this browser cannot remember approval. You may be asked again after reopening it.');}
        input.value='';mount();
      }catch(ex){error.textContent=String(ex&&ex.message||'Could not verify phrase');input.value='';input.focus();}
      finally{button.disabled=false;}
    });
    input.focus();
  }
  renderDialog();
  getApproval().then(ok=>{if(ok)mount();}).catch(()=>{});
})();
