<!--单文件上传组件-->
<template>
  <div class="gulu-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div
      ref="temp"
      style="width:0;height:0;overflow:hidden"
      class="abc"
    ></div>
    <!-- <img
      width="100"
      :src="url"
    > -->
    <ol class="gulu-uploader-filelist">
      <li
        v-for="file in fileList"
        :key="file.name"
      >
        <template v-if="file.status === 'uploading'">
          <icon
            class="gulu-uploader-spin"
            name="loading"
          />
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img
            class="gulu-uploader-image"
            :src="file.url"
            width="32"
            height="32"
          >
        </template>
        <template v-else>
          <div class="gulu-uploader-defaultImage"></div>
        </template>
        <span
          class="gulu-uploader-name"
          :class="{[file.status]:file.status}"
        >{{file.name}}</span>
        <button
          class="gulu-uploader-remove"
          @click="onRemoveFile(file)"
        >X</button>
      </li>
    </ol>

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
import Icon from '@/components/icon/icon'
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
      default: 'POST'
    },
    parseResponse: {
      type: Function,
      required: true
    },
    fileList: {
      type: Array,
      default: () => []
    },
    sizeLimit: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      url: 'about:blank'
    }
  },
  methods: {
    onRemoveFile(file) {
      let answer = window.confirm('你确定要删除这玩意吗')
      if (answer) {
        let copy = [...this.fileList]
        let index = copy.indexOf(file)
        copy.splice(index, 1)
        this.$emit('update:fileList', copy)
      }
    },
    onClickUpload() {
      let input = this.createInput()
      input.addEventListener('change', () => {
        let file = input.files[0]
        this.uploadFile(file)
        input.remove()
      })

      // trigger click
      input.click()
    },
    beforeUploadFile(rawFile, newName) {
      let { size, type } = rawFile

      if (size > this.sizeLimit) {
        this.$emit('error', `文件大于${this.sizeLimit}`)
        return false
      } else {
        this.$emit('update:fileList', [...this.fileList, { name: newName, type, size, status: 'uploading' }])
        return true
      }

    },
    afterUploadFile(newName, url) {

      let file = this.fileList.filter(f => f.name === newName)[0]
      let index = this.fileList.indexOf(file)
      let copy = JSON.parse(JSON.stringify(file))
      copy.url = url
      copy.status = 'success'
      let fileListCopy = [...this.fileList]
      fileListCopy.splice(index, 1, copy)
      this.$emit('update:fileList', fileListCopy)
    },
    uploadFile(rawFile) {
      let { name } = rawFile
      let newName = this.generateName(name)
      if (!this.beforeUploadFile(rawFile, newName)) { return }
      let formData = new FormData()
      formData.append(this.name, rawFile)

      this.doUploadFile(formData, (response) => {
        // let object = JSON.parse(xhr.response) 反序列化：字符串 -> 对象
        let url = this.parseResponse(response)
        this.url = url

        this.afterUploadFile(newName, url)

      }, (xhr) => {
        this.uploadError(xhr, newName)
      })
    },

    uploadError(xhr, newName) {

      let file = this.fileList.filter(f => f.name === newName)[0]
      let index = this.fileList.indexOf(file)
      let fileCopy = JSON.parse(JSON.stringify(file))
      fileCopy.status = 'fail'
      let fileListCopy = [...this.fileList]
      fileListCopy.splice(index, 1, fileCopy)
      this.$emit('update:fileList', fileListCopy)
      let error = ''
      if (xhr.status === 0) {
        error = '网络无法连接'
      }
      this.$emit('error', error)
    },

    // 生成新的name，避免名字重复
    generateName(name) {
      while (this.fileList.filter(f => f.name === name).length > 0) {
        let dotIndex = name.lastIndexOf('.')
        let nameWithoutExtension = name.substring(0, dotIndex)
        let extension = name.substring(dotIndex)
        name = nameWithoutExtension + '(1)' + extension
      }
      return name
    },
    doUploadFile(formData, success, fail) {
      var xhr = new XMLHttpRequest()
      xhr.open(this.method, this.action)
      xhr.onload = () => {
        success(xhr.response)
      }
      xhr.onerror = () => {
        fail(xhr, xhr.statusCode)
      }
      xhr.send(formData)
    },
    createInput() {
      // create input
      this.$refs.temp.innerHTML = ''
      let input = document.createElement('input')
      input.type = 'file'
      this.$refs.temp.appendChild(input)
      return input
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/var.scss";
.gulu-uploader {
  &-filelist {
    list-style: none;
    > li {
      display: flex;
      align-items: center;
      margin: 8px 0;
      border: 1px solid darken($gray, 10%);
    }
  }
  &-defaultImage {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  &-image {
    margin-right: 8px;
    border: none;
  }
  &-name {
    margin-right: auto;
    &.success {
      color: green;
    }
    &.fail {
      color: red;
    }
  }
  &-remove {
    width: 32px;
    height: 32px;
  }
  &-spin {
    @include spin;
  }
}
</style>

