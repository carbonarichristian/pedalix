class ProductCompareView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Select elements within the component
    this.productSelect = this.querySelector("#product-select");
    this.comparisonContainer = this.querySelector("#compare-product-container");
    this.addProductBtn = this.querySelector("#add-product-button");
    this.loadingSpinner = this.querySelector(".loading__spinner");
    this.addToCartButtons = {};
    // Bind event listeners
    this.addProductBtn.addEventListener(
      "click",
      this.handleAddProduct.bind(this)
    );

    this.comparisonContainer.addEventListener(
      "click",
      this.handleRemoveProduct.bind(this)
    );
  }



  async handleAddProduct() {
    /* 1) get the selected product handle from the dropdown */
    const productHandle = this.productSelect.value;
    console.log(`attempting to add product ${productHandle}`);
    if (!productHandle) return;

    /* 4) Later add a check to see if the product is already in the comparison container; if yes, return */
    //add check here

    /* 2) fetch the product card for the selected product */
    this.loadingSpinner.classList.remove("hidden");
    const productCard = await this.fetchProductCardSection(productHandle);

    if (!productCard || !(productCard instanceof Node)) {
      this.loadingSpinner.classList.add("hidden");
      console.error(
        "Something went wrong while fetching the product card.",
        productCard
      );
      return;
    }

    console.log("Now adding product card to comparison container");

    this.comparisonContainer.appendChild(productCard);

    /* 3) disable the added product in our dropdown */
    this.toggleSelectOption(productHandle);
    this.loadingSpinner.classList.add("hidden");
    console.log(productCard);
    productCard.classList.add("zoom-in");
    setTimeout(() => {
      productCard.classList.remove("zoom-in");
    }, 500);

    /* Adds event listener to current product card's button */
    const addToCartButton = productCard.querySelector(`#${productHandle}`);
    addToCartButton && addToCartButton.addEventListener('click', () => this.addToCart(addToCartButton));
  }
   addToCart(addToCartButton) {
    addToCartButton.querySelector("svg").classList.add("hidden");
    addToCartButton.querySelector("span").classList.add("hidden");
    addToCartButton.querySelector(".loading__spinner").classList.remove("hidden");
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: addToCartButton.dataset.variantId,
        quantity: 1,
        sections: "cart-drawer,cart-icon-bubble"
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Added to cart:', data);
      // You can show a popup, update cart count, etc.
      const cartDrawer = document.querySelector("cart-drawer");
      addToCartButton.querySelector(".loading__spinner").classList.add("hidden");
      addToCartButton.querySelector("svg").classList.remove("hidden");
      addToCartButton.querySelector("span").classList.remove("hidden");
      if (cartDrawer) {
        cartDrawer.renderContents(data, false);
        cartDrawer.classList.remove('is-empty');
      } else {
        const newContent = getSectionInnerHTML(html, '#shopify-section-cart-icon-bubble');
        document.querySelector('#cart-icon-bubble').innerHTML = newContent;
      }
    })
    .catch(err => {
      console.error('Error adding to cart:', err);
      addToCartButton.querySelector(".loading__spinner").classList.add("hidden");
      addToCartButton.querySelector("svg").classList.remove("hidden");
      addToCartButton.querySelector("span").classList.remove("hidden");
    });
  }

  // Fetch product details and add to comparison container
  async fetchProductCardSection(productHandle) {
    try {
      /* 2.1) build the url to fetch our section, based on the productHandle */
      const sectionApiUrl = `/products/${productHandle}?section_id=compare-product-card`;

      const response = await fetch(sectionApiUrl);

      /* 2.2) Extract the html-text from the response and parse it into a DOM object using DOMParser */
      const htmlText = await response.text();
      const parser = new DOMParser();
      const html = parser.parseFromString(htmlText, "text/html");

      /* 2.3) Extract the product card from the DOM object and return it*/
      const productCard = html.querySelector(".compare-product-card")

      console.log(productCard, "The new product card element");

      if (!productCard) {
        console.error(
          "Product not found, or problem with fetching, or problem with extracting?."
        );
        return null;
      }
      return productCard;

    } catch (error) {
      console.error("Error fetching product card:", error);
      return null;
    }
  }

  handleRemoveProduct(event) {
    const removehandle = event.target.dataset.removeproducthandle;
    console.log(`attempt to remove #${removehandle}`);
    if (!removehandle) return;

    /* 5) remove product from our container and toggle the select option */

    //add code here
    const productCard = this.comparisonContainer.querySelector(`#${removehandle}`)
    console.log(productCard);
    productCard.classList.add("zoom-out");
    setTimeout(() => {
      this.comparisonContainer.removeChild(this.comparisonContainer.querySelector(`#${removehandle}`));
    }, 400);


    this.toggleSelectOption(removehandle);
  }

  toggleSelectOption(productHandle) {
    console.log(`toggle Select Option for ${productHandle}`);
    const option = this.productSelect.querySelector(
      `option[value="${productHandle}"]`
    );
    /*if option is disabled, enable it, else disable it
    also add:
    option.style.color = ""; for enabled
    option.style.color = "gray"; for disabled
    */

    //add code here
    option.disabled = !option.disabled;
  }
}

// Define the custom element
customElements.define("product-compare-view", ProductCompareView);
