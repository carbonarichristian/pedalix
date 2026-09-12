[1mdiff --git a/assets/product-info.js b/assets/product-info.js[m
[1mindex cbdeb9e..fdadb9f 100644[m
[1m--- a/assets/product-info.js[m
[1m+++ b/assets/product-info.js[m
[36m@@ -7,12 +7,15 @@[m [mif (!customElements.get('product-info')) {[m
         this.input = this.querySelector('.quantity__input');[m
         this.currentVariant = this.querySelector('.product-variant-id');[m
         this.submitButton = this.querySelector('[type="submit"]');[m
[32m+[m[32m        this.sizeSelection = this.querySelector('.product__size-selection');[m
       }[m
 [m
       cartUpdateUnsubscriber = undefined;[m
       variantChangeUnsubscriber = undefined;[m
 [m
       connectedCallback() {[m
[32m+[m[32m        this.sizeSelection = this.querySelector('.product__size-selection');[m
[32m+[m[32m        this.sizeSelection.addEventListener('change', this.fetchVariant.bind(this));[m
         if (!this.input) return;[m
         this.quantityForm = this.querySelector('.product-form__quantity');[m
         if (!this.quantityForm) return;[m
[36m@@ -37,6 +40,30 @@[m [mif (!customElements.get('product-info')) {[m
         }[m
       }[m
 [m
[32m+[m[32m      fetchVariant() {[m
[32m+[m[32m        const recommendationDiv = this.sizeSelection.querySelector('#size-recommendation');[m
[32m+[m[32m        const height = this.sizeSelection.querySelector("input").value;[m
[32m+[m[32m        console.log(height);[m
[32m+[m[32m        console.log(recommendationDiv);[m
[32m+[m
[32m+[m[32m        let recommendedSize;[m
[32m+[m[32m        if (height >= 150 && height < 165) {[m
[32m+[m[32m          recommendedSize = 'S';[m
[32m+[m[32m        } else if (height >= 165 && height < 175) {[m
[32m+[m[32m          recommendedSize = 'M';[m
[32m+[m[32m        } else if (height >= 175 && height < 185) {[m
[32m+[m[32m          recommendedSize = 'L';[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        if (recommendedSize) {[m
[32m+[m[32m          recommendationDiv.innerHTML = `<p>Based on your height, we recommend a <strong>${recommendedSize}</strong> size bike.</p>`;[m
[32m+[m[32m        } else {[m
[32m+[m[32m          recommendationDiv.innerHTML = '<p>Please enter a valid height.</p>';[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m
[32m+[m
[32m+[m
       setQuantityBoundries() {[m
         const data = {[m
           cartQuantity: this.input.dataset.cartQuantity ? parseInt(this.input.dataset.cartQuantity) : 0,[m
[1mdiff --git a/sections/main-product.liquid b/sections/main-product.liquid[m
[1mindex 2470416..eb48274 100644[m
[1m--- a/sections/main-product.liquid[m
[1m+++ b/sections/main-product.liquid[m
[36m@@ -239,6 +239,16 @@[m
                     </div>[m
                   </details>[m
                 </div>[m
[32m+[m[32m              {% when 'size-selection' %}[m
[32m+[m[32m                <div class="product__size-selection">[m
[32m+[m[32m                  <h3 class="h4">Find Your Size</h3>[m
[32m+[m[32m                  <div class="size-selection__input">[m
[32m+[m[32m                    <label for="user-height">Your Height (cm):</label>[m
[32m+[m[32m                    <input type="number" id="user-height" name="user-height" min="100" max="220" step="1" placeholder="Enter your height">[m
[32m+[m[32m                  </div>[m
[32m+[m[32m                  <div id="size-recommendation" class="size-recommendation"></div>[m
[32m+[m[32m                  <button hidden id="calculate-size" class="button">Calculate Size</button>[m
[32m+[m[32m                </div>[m
               {%- when 'blog_collapsible_tab' -%}[m
                 <div class="blog product__accordion accordion quick-add-hidden" {{ block.shopify_attributes }}>[m
                   <details id="Details-{{ block.id }}-{{ section.id }}">[m
[36m@@ -1052,6 +1062,11 @@[m
         }[m
       ][m
     },[m
[32m+[m[32m    {[m
[32m+[m[32m      "type": "size-selection",[m
[32m+[m[32m      "name": "Size Selection"[m
[32m+[m
[32m+[m[32m    },[m
     {[m
       "type": "blog_collapsible_tab",[m
       "name": "Blog collapsible row",[m
[1mdiff --git a/templates/product.product-size-selection.json b/templates/product.product-size-selection.json[m
[1mindex 3246037..37a2de5 100644[m
[1m--- a/templates/product.product-size-selection.json[m
[1m+++ b/templates/product.product-size-selection.json[m
[36m@@ -53,6 +53,10 @@[m
           "type": "description",[m
           "settings": {}[m
         },[m
[32m+[m[32m        "size_selection_cc9b7x": {[m
[32m+[m[32m          "type": "size-selection",[m
[32m+[m[32m          "settings": {}[m
[32m+[m[32m        },[m
         "share": {[m
           "type": "share",[m
           "disabled": true,[m
[36m@@ -82,6 +86,7 @@[m
         "quantity_selector",[m
         "buy_buttons",[m
         "description",[m
[32m+[m[32m        "size_selection_cc9b7x",[m
         "share",[m
         "icon_with_text_VrMPVY"[m
       ],[m
