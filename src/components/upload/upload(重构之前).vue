<template>
  <div class="gulu-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width:0;height:0;overflow:hidden"></div>
    <img :src="url">
   <!-- <form action="http://127.0.0.1:3000/upload" method="post" enctype="multipart/form-data">
      <div>
        <input type="file" name="xxx">
      </div>
      <div>
        <input type="submit" value="提交">
      </div>
   </form> -->

  </div>
</template>
<script>
  export default {
    name: "Uploader",
    props: {
      name: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default:'POST'
      },
      parseResponse:{
        type: Function,
        required: true
      }
   },
   data(){
     return {
       url:'about:blank'
     }
   },
    methods: {
      onClickUpload() {
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.temp.appendChild(input)
        input.addEventListener('change', () => {
          let file = input.files[0]
         input.remove()
       
          let formData = new FormData()
          formData.append(this.name, file)
          
         
          var xhr = new XMLHttpRequest()
          xhr.open(this.method, this.action)
          xhr.onload = () => {

            // 反序列化：字符串 -> 对象
            // let object = JSON.parse(xhr.response)
            
            let url = this.parseResponse(xhr.response)
            this.url = url

          }
          xhr.send(formData)
        })
        input.click()
      }
    }
  }
</script>
