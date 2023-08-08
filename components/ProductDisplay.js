app.component('product-display', {
    props:{
        premium: {
            type:Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img v-bind:src="image" alt="preview sock" :class="{ 'out-of-stock-img': !inStock }">
          </div>
          <div class="product-info">
            <h1> {{title}} </h1>
            <p>{{sale}}</p>
            <p> {{description}} </p>
            <p> Shipping: {{shipping}}</p>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>

            <product-details :details="details"></product-details>
            
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)" 
              class="color-circle" 
              :style="{ backgroundColor: variant.color }">
            </div>
            <ul>
              <li v-for="size in sizes">{{size}}</li>
            </ul>
            <button class="button" v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
            <button class="button" v-on:click="removeToCart" :disabled="cart == 0" :class="{disabledButton:cart==0}">Remove Cart</button>
          </div>
        </div>
        <review-list :reviews="reviews"></review-list>
        <review-form @review.submitted="addReview"></review-form>
      </div>`,
      data(){
        return{
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant:0,
            description: 'A warm fuzzy pair of socks.',
            url: 'https://es.wikipedia.org/wiki/Medias',
            details: ['50% cotton','30% wool','20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 2 },
            ],
            sizes: ['Small','Medium','Large','Extra large'],
            onSale:true,
            reviews:[]
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeToCart(){
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review);
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale(){
            if(this.onSale){
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return 2.99
        }
    }
});