<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <p>Title</p>
      <q-input outlined v-model="name" label="Your name" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" />

      <p>Small description</p>
      <q-input v-model="description" filled clearable autogrow color="red-12" label="Your message" />

      <p>Image</p>
      <q-file v-model="image" label="Pick one Image" filled style="max-width: 300px" @update:model-value="handleUpload()">
        <q-icon name="image" />
      </q-file>
      <q-img v-if="imageUrl" :src="imageUrl" spinner-color="white" style="max-width: 150px" />

      <p>Category</p>
      <q-select outlined v-model="category" :options="options" label="Outlined" />

      <p>Content</p>
      <q-input v-model="content" filled clearable type="textarea" color="red-12" label="Your message" />


      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup() {
    const $q = useQuasar()

    const name = ref(null)
    const description = ref(null)
    const image = ref(null)
    const imageUrl = ref('');
    const category = ref(null)
    const content = ref(null)

    const handleUpload = () => {
      console.log('handleUpload is triggered');
      if (image.value) {
        imageUrl.value = URL.createObjectURL(image.value);
      }
    }

    return {
      name,
      description,
      image,
      imageUrl,
      category,
      content,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      handleUpload,


      onSubmit() {
        console.log('teste')
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },
    }
  }
}
</script>
