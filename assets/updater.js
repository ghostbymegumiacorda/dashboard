(function(){
  "use strict";
  if(window.__BSA_SHARED_MODE__) return;
  function ready(){
    if(document.getElementById('bsa-update-control')) return;
    var host=document.createElement('div');host.id='bsa-update-control';
    host.innerHTML='<button type="button" id="bsa-update-button" aria-expanded="false" aria-controls="bsa-update-panel" title="Check dashboard updates" aria-label="Check dashboard updates"><span class="bsa-update-symbol" aria-hidden="true">↻</span><span class="bsa-update-text">Check updates</span></button>'+
      '<div id="bsa-update-panel" data-open="false" role="dialog" aria-label="Dashboard update status"><button id="bsa-update-close" type="button" aria-label="Close">×</button><strong>Dashboard updates</strong><p id="bsa-update-status" role="status" aria-live="polite">Check for a newer version without erasing saved progress.</p><button id="bsa-update-refresh" type="button">Check for updates</button></div>';
    // Place the control beside Import & export / Appearance. For narrow phones,
    // move the same control into the mobile header instead of floating over content.
    // Never clear any browser data to perform this update.
    document.body.appendChild(host);
    var mobileQuery=window.matchMedia('(max-width:700px)');
    function placeControl(){
      // The update panel is controlled by the logo dropdown. Keep its
      // controller mounted outside React so page changes cannot remove it.
      host.dataset.place='menu';
      if(host.parentNode!==document.body)document.body.appendChild(host);
      return true;
    }
    var count=0;
    function placeWhenReady(){
      if(placeControl())return;
      if(count++<80)window.requestAnimationFrame(placeWhenReady);
    }
    placeWhenReady();
    if(mobileQuery.addEventListener)mobileQuery.addEventListener('change',placeWhenReady);
    else if(mobileQuery.addListener)mobileQuery.addListener(placeWhenReady);
    var trigger=host.querySelector('#bsa-update-button'),panel=host.querySelector('#bsa-update-panel'),status=host.querySelector('#bsa-update-status'),check=host.querySelector('#bsa-update-refresh');
    function toggle(open){panel.dataset.open=open?'true':'false';trigger.setAttribute('aria-expanded',String(open));}
    trigger.addEventListener('click',function(){toggle(panel.dataset.open!=='true');});
    host.querySelector('#bsa-update-close').addEventListener('click',function(){toggle(false);trigger.focus();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.dataset.open==='true')toggle(false);});
    var busy=false;
    check.addEventListener('click',async function(){
      if(busy)return;busy=true;check.disabled=true;
      try{
        if(!navigator.onLine){status.textContent='Offline. Connect to the internet and try again. Your saved study data has not changed.';return;}
        if(!('serviceWorker' in navigator)){status.textContent='This browser does not support service-worker updates. Try reopening the dashboard in Safari.';return;}
        status.textContent='Checking the installed app for updates…';
        var reg=await navigator.serviceWorker.getRegistration(new URL('./',location.href).href);
        if(!reg){reg=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});}
        await reg.update();
        // Fetch latest HTML using reload, not a random cache purge. A successful response
        // means a reload can safely request the new document.
        var url=new URL('./index.html',location.href);
        var response=await fetch(url.href,{cache:'reload',credentials:'same-origin'});
        if(!response.ok)throw new Error('Could not retrieve dashboard HTML (HTTP '+response.status+').');
        status.textContent='Online files are reachable. Reloading this app now. Your saved progress is not cleared.';
        window.setTimeout(function(){location.reload();},350);
      }catch(err){
        status.textContent='Update could not complete: '+(err&&err.message?err.message:'connection error')+'. Nothing was deleted. Please try again when online.';
      }finally{busy=false;check.disabled=false;}
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready,{once:true}); else ready();
})();
