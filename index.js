import{a as f,S as p,i as n}from"./assets/vendor-Dhc3YWoh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const g="https://pixabay.com/api/",y="54492402-008c237b79b4e7660b85c858e";function h(a){return f.get(g,{params:{key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{var o,e,s;const r=((e=(o=t==null?void 0:t.response)==null?void 0:o.data)==null?void 0:e.message)||(typeof((s=t==null?void 0:t.response)==null?void 0:s.data)=="string"?t.response.data:"")||t.message||"Unknown error";throw new Error(r)})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader-wrap"),b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function L(a){const t=a.map(({webformatURL:r,largeImageURL:o,tags:e,likes:s,views:i,comments:m,downloads:d})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${e}"
              loading="lazy"
            />
          </a>

          <div class="info">
            <p class="info-item"><b>Likes</b> ${s}</p>
            <p class="info-item"><b>Views</b> ${i}</p>
            <p class="info-item"><b>Comments</b> ${m}</p>
            <p class="info-item"><b>Downloads</b> ${d}</p>
          </div>
        </li>
      `).join("");c.insertAdjacentHTML("beforeend",t),b.refresh()}function w(){c.innerHTML=""}function q(){l.classList.remove("is-hidden")}function S(){l.classList.add("is-hidden")}const u=document.querySelector(".form");u.addEventListener("submit",E);function E(a){a.preventDefault();const t=a.currentTarget.elements["search-text"].value.trim();if(!t){n.warning({message:"Please enter a search query.",position:"topRight"});return}w(),q(),h(t).then(r=>{const o=r.hits;if(!o||o.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(o)}).catch(r=>{n.error({message:r.message||"Request failed. Please try again.",position:"topRight"})}).finally(()=>{S(),u.reset()})}
//# sourceMappingURL=index.js.map
