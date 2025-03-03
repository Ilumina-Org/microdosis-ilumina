function S(){const t=document.getElementById("productModal");t.style.display="block"}function m(){const t=document.getElementById("productModal");t.style.display="none"}document.querySelectorAll(".view-btn").forEach(t=>{t.addEventListener("click",n=>{const e=n.target.closest(".inventory-row"),o=e.dataset.sku,a=e.querySelector(".product-title").textContent,l=e.querySelector(".product-tier").textContent.replace("Tier ",""),r=e.querySelector(".product-thumbnail").src,s=e.querySelector(".current-price").textContent,c=e.querySelector(".regular-price")?.textContent||s,d=e.querySelector(".tipo-badge").textContent.trim(),p=e.cells[5].textContent.trim(),u=e.cells[6].textContent.trim(),v=e.cells[7].textContent.trim(),f=e.querySelector(".featured-badge").textContent.trim()==="Sí",E=document.getElementById("productDetails");E.innerHTML=`
                <img src="${r}" alt="${a}" class="product-image-large" onerror="this.src='/images/placeholder-image.png'">
                
                <div class="detail-section">
                    <h3>Información del Producto</h3>
                    <div class="detail-grid">
                        <span class="detail-label">SKU:</span>
                        <span>${o}</span>
                        
                        <span class="detail-label">Título:</span>
                        <span>${a}</span>
                        
                        <span class="detail-label">Tier:</span>
                        <span>${l}</span>
                        
                        <span class="detail-label">Tipo:</span>
                        <span>${d}</span>
                        
                        <span class="detail-label">Precio actual:</span>
                        <span>${s}</span>
                        
                        <span class="detail-label">Precio regular:</span>
                        <span>${c}</span>
                        
                        <span class="detail-label">Destacado:</span>
                        <span>${f?"Sí":"No"}</span>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Información de Stock</h3>
                    <div class="detail-grid">
                        <span class="detail-label">Disponible:</span>
                        <span>${p}</span>
                        
                        <span class="detail-label">Reservado:</span>
                        <span>${u}</span>
                        
                        <span class="detail-label">Total:</span>
                        <span>${v}</span>
                    </div>
                </div>
                
                <div class="notas-section">
                    <h4>Notas</h4>
                    <p id="productNotes">Cargando notas...</p>
                </div>
            `,setTimeout(()=>{document.getElementById("productNotes").textContent="Sin notas disponibles"},500),S()})});document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",n=>{const o=n.target.closest(".inventory-row").dataset.sku;window.location.href=`/admin/inventory/edit?sku=${o}`})});document.querySelectorAll(".close-modal").forEach(t=>{t.addEventListener("click",m)});window.addEventListener("click",t=>{const n=document.getElementById("productModal");t.target===n&&m()});const h=document.getElementById("searchInput");h.addEventListener("input",i);const y=document.getElementById("filterTipo"),g=document.getElementById("filterStock");y.addEventListener("change",i);g.addEventListener("change",i);function i(){const t=h.value.toLowerCase(),n=y.value,e=g.value;document.querySelectorAll(".inventory-row").forEach(a=>{const l=a.querySelector("td:first-child").textContent.toLowerCase(),r=a.querySelector(".product-title").textContent.toLowerCase(),s=a.dataset.tipo,c=a.dataset.stockStatus;(t===""||l.includes(t)||r.includes(t))&&(n===""||s===n)&&(e===""||c===e)?a.style.display="":a.style.display="none"})}document.getElementById("refreshBtn").addEventListener("click",()=>{const t=document.getElementById("refreshBtn"),n=t.innerHTML;t.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotating">
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Actualizando...
        `,t.disabled=!0;const e=document.createElement("style");e.textContent=`
            .rotating {
                animation: rotate 1s linear infinite;
            }
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `,document.head.appendChild(e),fetch("/api/inventory/refresh",{method:"POST"}).then(o=>{if(!o.ok)throw new Error("Error al actualizar el inventario");return o.json()}).then(()=>{window.location.reload()}).catch(o=>{console.error("Error:",o),alert("Error al actualizar el inventario. Por favor, inténtalo de nuevo."),t.innerHTML=n,t.disabled=!1})});
