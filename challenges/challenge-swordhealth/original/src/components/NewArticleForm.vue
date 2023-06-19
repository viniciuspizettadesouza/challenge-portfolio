<template>
  <div class="q-pa-md container">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <p>Title</p>
      <q-input outlined v-model="formData.title" clearable label="Title" lazy-rules
        :rules="[val => val && val.length > 3 || 'Please type something']" />

      <p>Small description</p>
      <q-input v-model="formData.description" filled clearable autogrow color="red-12" label="Your message"
        :rules="[val => val && val.length > 3 || 'Please type something']" />

      <p>Image</p>
      <q-file v-model="formData.image" label="Pick one Image" filled style="max-width: 300px"
        @update:model-value="handleUpload()" :rules="[val => val || 'Please insert image']">
        <q-icon name="image" />
      </q-file>
      <q-img v-if="formData.imageUrl" :src="formData.imageUrl" spinner-color="white" style="max-width: 150px" />

      <p>Category</p>
      <q-select outlined v-model="formData.category" :options="options" label="Outlined"
        :rules="[val => val && val.length > 3 || 'Please select a category']" />

      <p>Content</p>
      <q-input v-model="formData.content" filled clearable type="textarea" color="red-12" label="Your message"
        :rules="[val => val && val.length > 3 || 'Please type something']" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const options = [
  'Marketing', 'Design', 'Engineering', 'Medicine', 'Finance'
]

const formData = ref({
  title: null,
  description: null,
  image: null,
  imageUrl: '',
  category: null,
  content: null,
})

const handleUpload = () => {
  if (formData.value.image) {
    formData.value.imageUrl = URL.createObjectURL(formData.value.image);
  }
}

const onSubmit = () => {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
    position: 'bottom'
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 680px;
}
</style>
