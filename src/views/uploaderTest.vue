<template>
  <div class="content">
    <h2>Upload 上传组件</h2>
    <h3>多文件上传组件</h3>
    <div>
      <p>① Upload组件支持多文件上传</p>
      <p>② 可以限制上传文件大小、数量以及文件类型</p>
      <p>③ 可以捕获上传失败得原因</p>

    </div>
    <div class="upload-test">

      <!-- <div>
      {{ error }}
      <div class="tips">这是单文件上传组件的例子</div>
     
      <uploader
        :size-limit="1024*1024"
        @error="error=$event"
        :file-list.sync="fileList"
        :parseResponse="parseResponse"
        accept="image/*"
        method="POST"
        action="http://127.0.0.1:3000/upload"
        name="file"
       
      >
        <g-button icon="upload">上传</g-button>
      </uploader>
    </div> -->

      <div>
        {{ error }}

        <!-- <uploader></uploader> -->
        <uploads
          :size-limit="1024*1024"
          @error="error=$event"
          :file-list.sync="fileList"
          :parseResponse="parseResponse"
          accept="image/*"
          method="POST"
          action="http://127.0.0.1:3000/upload"
          name="file"
        >
          <g-button icon="upload">上传</g-button>
        </uploads>
      </div>

    </div>
  </div>
</template>
<script>
// 单文件上传组件
// import Uploader from '@/components/upload/upload'

// 多文件上传组件
import Uploads from '@/components/upload/uploads'


import GButton from '@/components/button/button'
export default {
  name: 'UploadDemo',
  components: {
    // Uploader,
    Uploads,
    GButton
  },
  data() {
    return {
      fileList: [],
      error: ''
    }
  },
  methods: {
    parseResponse(response) {
      // 反序列化：字符串 -> 对象
      let object = JSON.parse(response)
      let url = `http://127.0.0.1:3000/preview/${object.id}`
      return url
    }
  }
}
</script>
<style scoped>
.upload-test {
  padding-top: 30px;
}
.tips {
  margin-bottom: 20px;
}
</style>

