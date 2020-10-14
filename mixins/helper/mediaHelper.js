import { mapGetters, mapActions } from 'vuex'

export default {
  mounted() {
    this.getMediaConfig()
  },
  computed: {
    ...mapGetters({
      mimetypes: 'media/mimetypes',
      maxFileSize: 'media/maxFileSize',
    }),
    _maxSize() {
      return this.maxSize || this.maxFileSize.b
    },
  },
  data() {
    return {
      media: {
        images: [],
        video: null,
        pdf: null,
      },
      progress: 0,
    }
  },
  methods: {
    ...mapActions({
      getMediaConfig: 'media/getMediaConfig',
    }),
    generateImagePreview(image) {
      return URL.createObjectURL(image)
    },
    handleMediaSelected(files) {
      this.media.images = []
      const _files = Array.from(files).slice(0, 4)
      for (let i = 0; i < _files.length; i++) {
        const file = _files[i]
        if (file.size > this._maxSize) {
          return
        }
        if (this.mimetypes.image.includes(file.type)) {
          this.media.images.push(file)
        } else if (this.mimetypes.video.includes(file.type)) {
          this.media.video = file
          this.media.images = []
          break
        } else if (this.mimetypes.pdf.includes(file.type)) {
          this.media.pdf = file
          this.media.images = []
          break
        }
      }
    },
    buildMediaForm() {
      const form = new FormData()
      if (this.media.images.length) {
        this.media.images.forEach((image, index) =>
          form.append(`media[${index}]`, image)
        )
      }
      if (this.media.video) {
        form.append('media[0]', this.media.video)
      }
      if (this.media.pdf) {
        form.append('media[0]', this.media.pdf)
      }
      this.$emit('startupload', this.media.images.length || 1)
      return form
    },

    async upload(url) {
      try {
        const response = await this.$axios.post(url, this.buildMediaForm(), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: this.handleUploadProgress,
        })
        this.$emit('uploaded', response.data.data)
        this.$notifier.success({ message: 'Media uploaded!' })
        return response
      } catch (e) {
        if (e.response.status === 422) {
          this.$notifier.error({ message: e.response.data.message })
        }
      }
    },
    handleUploadProgress(event) {
      this.progress = parseInt(Math.round(event.loaded / event.total) * 100)
    },
  },
}
