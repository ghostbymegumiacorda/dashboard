const STORE_KEY='bsa-study-dashboard-v1';const localStorage={length:0,key:()=>null};
  const BSA_BACKUP_PREFIXES = ["bsa_", "bsa-"];
  const BSA_BACKUP_EXCLUDE = /(?:api.?key|secret|token|credential|password|github|gemini|auth|sync.?config|^bsa_gh_|^bsa_sync_|^bsa[_-].*(?:login[_-]?session|auth[_-]?session|session[_-]?token))/i;
  const BSA_BACKUP_LOCAL_ONLY = /^(?:bsa_shared_|bsa-shared-|bsa_shared_v67_|bsa_shared_guest_|bsa_shared_personal_)/i;
  const BSA_BACKUP_REQUIRE_JSON = new Set([STORE_KEY,'bsa-academic-progress-v1','bsa-study-life-v1','bsa-joy-v1']);
  function bsaBackupKeys() {
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && BSA_BACKUP_PREFIXES.some(p=>k.startsWith(p)) && !BSA_BACKUP_EXCLUDE.test(k) && !BSA_BACKUP_LOCAL_ONLY.test(k)) keys.push(k);
    }
    return keys.sort();
  }
  function bsaValidMainRecord(doc) {
    if(!doc||typeof doc!=='object'||Array.isArray(doc)||!Array.isArray(doc.subjects)||!doc.subjects.length||doc.subjects.length>500)return false;
    const ids=new Set();
    for(const sub of doc.subjects){
      if(!sub||typeof sub!=='object'||Array.isArray(sub)||typeof sub.id!=='string'||!sub.id.trim()||sub.id.length>=500||ids.has(sub.id)||typeof sub.name!=='string'||!sub.name.trim()||sub.name.length>=1000)return false;
      ids.add(sub.id);
      for(const field of ['topics','cards','mistakes','quizzes','sessions','lectures','psets'])if(sub[field]!==undefined&&!Array.isArray(sub[field]))return false;
    }
    return true;
  }
  function bsaBackupPreview(items) {
    const d=JSON.parse(items[STORE_KEY]||'null');
    if(!bsaValidMainRecord(d))throw Error('Main dashboard subjects are missing, duplicated or malformed. Backup cancelled.');
    const kinds={subjects:d.subjects.length,flashcards:0,problemSets:0,lectures:0,sessionRecords:0};
    d.subjects.forEach(x=>{kinds.flashcards+=(x.cards||[]).length;kinds.problemSets+=(x.psets||[]).length;kinds.lectures+=(x.lectures||[]).length;kinds.sessionRecords+=(x.sessions||[]).length});
    return kinds;
  }

const ok={subjects:[{id:'a',name:'Acc',cards:[{id:'1'}],sessions:[{minutes:10}]}]};
if(!bsaValidMainRecord(ok))throw Error('valid record');
if(bsaValidMainRecord({subjects:[...ok.subjects,...ok.subjects]}))throw Error('duplicate ids');
if(bsaValidMainRecord({subjects:[{id:'a',name:'Acc',cards:{}}]}))throw Error('bad cards');
if(!bsaBackupKeys||!BSA_BACKUP_EXCLUDE.test('bsa_auth_session_token')||BSA_BACKUP_EXCLUDE.test('bsa_study_session_v2'))throw Error('key filter');
const preview=bsaBackupPreview({[STORE_KEY]:JSON.stringify(ok)});if(preview.sessionRecords!==1||preview.flashcards!==1)throw Error('summary');console.log('Fixture checks passed');
