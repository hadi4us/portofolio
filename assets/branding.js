(function(){
  var form=document.getElementById('brand-form');
  if(!form)return;
  var key='nurhadi-branding-draft';
  var fields=Array.prototype.slice.call(form.querySelectorAll('input:not([type=file]), textarea, select'));
  var $=function(id){return document.getElementById(id)};
  function update(){
    var v={}; fields.forEach(function(el){v[el.name]=el.value});
    $('preview-name').textContent=v.brandName||'Nama brand';
    $('preview-tagline').textContent=v.tagline||'Tagline akan muncul di sini.';
    $('preview-description').textContent=v.description||'Deskripsi singkat brand tampil di area ini.';
    $('preview-tone').textContent=v.tone||'Karakter belum dipilih';
    $('preview-typeface').textContent=v.typeface||'Tipografi belum diisi';
    ['primary','accent','ink'].forEach(function(name){$('swatch-'+name).style.background=v[name+'Color']||'#dbe3e9'});
    var cta=$('preview-cta'); cta.textContent=v.ctaLabel||'CTA brand'; cta.href=v.ctaUrl||'#';
  }
  function load(){try{var v=JSON.parse(localStorage.getItem(key)||'{}');fields.forEach(function(el){if(v[el.name]!=null)el.value=v[el.name]})}catch(e){} update()}
  fields.forEach(function(el){el.addEventListener('input',update);el.addEventListener('change',update)});
  form.addEventListener('submit',function(e){e.preventDefault();var v={};fields.forEach(function(el){v[el.name]=el.value});localStorage.setItem(key,JSON.stringify(v));$('draft-status').textContent='Draf tersimpan di browser ini.'});
  $('clear-draft').addEventListener('click',function(){localStorage.removeItem(key);form.reset();$('logo-preview').textContent='Logo';$('draft-status').textContent='Draf dikosongkan.';update()});
  form.elements.logo.addEventListener('change',function(){var file=this.files[0];if(!file)return;var reader=new FileReader();reader.onload=function(){var img=document.createElement('img');img.alt='Preview logo';img.src=reader.result;$('logo-preview').replaceChildren(img)};reader.readAsDataURL(file)});
  load();
})();
