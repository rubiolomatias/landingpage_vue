const app = Vue.createApp({
    data(){
        return{
            cart: [],
            premium:false
        }
    },
    methods:{
        updateCartAdd(id){
            this.cart.push(id);
            this.variants[this.selectedVariant].quantity --;
        },
        updateCartRm(id){
            this.cart.pop(id);
            this.variants[this.selectedVariant].quantity ++;
        }
    }
});