<template>
    <div>
        
        <div id="location"></div>
    </div>
</template>
<script>
import location from "@/utils/location"
export default {
    data(){
return {
    city:""
}
    },
    mounted(){
        this.fun()
    },
    methods:{
        fun(){
            location.initMap('location',(res)=>{
                console.log(res)
                this.city = res
                this.$emit('changeCity',this.city)
            })
        }
    }
}
</script>