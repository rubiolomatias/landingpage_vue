app.component('product-display', {
    props:{
        details
    },
    templete:
    /*html*/
    `<ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>`
});