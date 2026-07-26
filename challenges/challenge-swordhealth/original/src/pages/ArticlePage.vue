<template>
  <q-page class="row items-center justify-center">
    <q-card class="my-card" flat>
      <q-parallax src="https://cdn.quasar.dev/img/parallax1.jpg" :height="350" width="full" />
    </q-card>

    <div class="container">
      <q-card class="my-card" flat>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="100px" class="q-mr-">
              <q-img :src="user?.picture" spinner-color="white" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <h6 class="text-h6">Lorem ipsum dolor sit amet</h6>
            </q-item-label>
            <q-item-label caption>
              <p class="text-subtitle2">by {{ user?.name }}</p>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <p class="text-body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis augue faucibus, blandit quam eget,
        tristique libero. Nulla vitae gravida dolor. Curabitur quis ante velit. Nam eu dui a erat dictum tempor nec non
        felis. Quisque quis sem orci. Sed mauris urna, auctor non molestie non, suscipit non quam. Curabitur euismod
        sollicitudin est in tincidunt. Etiam quis ex nibh. Phasellus a libero dapibus, laoreet urna non, pulvinar ex.
        Praesent sit amet porttitor tellus. Integer non quam iaculis urna vestibulum convallis. Vivamus at mauris quis
        risus vulputate tincidunt sit amet id dui. Vivamus a pellentesque eros. Integer auctor dolor nisi, in tincidunt
        erat volutpat eu. Quisque imperdiet elit eget urna dapibus blandit. Vestibulum laoreet felis at nisl porttitor,
        vitae malesuada nunc pharetra.
      </p>
      <p class="text-body2">
        Nunc consequat, erat in egestas ultricies, nisl orci imperdiet purus, eget malesuada sem felis a felis. Nulla
        facilisi. Ut sodales dignissim eros, commodo varius odio ultricies sed. Nullam dui urna, scelerisque ut ex ut,
        bibendum commodo leo. Aenean imperdiet, dui ultricies aliquam rhoncus, mauris felis vehicula orci, eu dapibus
        augue diam a libero. Ut varius egestas feugiat. Aliquam ac viverra dolor. Pellentesque vulputate gravida purus
        quis convallis. Ut pulvinar laoreet purus non maximus. Aliquam nunc turpis, rhoncus sit amet dui fringilla,
        molestie dignissim erat. Nam commodo diam at augue porta euismod. Nulla eu lorem eu dolor semper sagittis vel
        nec ex. Suspendisse semper, nulla sit amet hendrerit dapibus, velit sem congue magna, a varius nisi libero eget
        leo. Sed ut felis lacus. Curabitur vitae leo sed libero faucibus consequat at ornare tellus.
      </p>
      <p class="text-body2">
        Nunc id maximus neque. Nam pulvinar viverra ligula quis egestas. Nunc odio mi, mattis a vulputate eget, luctus
        sed ipsum. Maecenas lacinia quam in interdum rhoncus. Fusce luctus vel sapien eget interdum. Cras vestibulum
        accumsan nibh, dignissim accumsan turpis mattis quis. Nullam vel purus maximus, feugiat orci vel, commodo felis.
        Cras mollis neque a sagittis pulvinar. Etiam nulla odio, cursus non iaculis id, convallis eget eros. Vestibulum
        finibus arcu arcu, vel congue lacus volutpat sed. Integer fermentum eleifend fermentum.
      </p>
      <p class="text-body2">
        Duis imperdiet lectus turpis, non scelerisque justo rhoncus in. Suspendisse purus odio, lobortis sit amet sapien
        sit amet, auctor tincidunt lectus. Sed pharetra accumsan consectetur. Nulla facilisi. Ut neque libero, pretium
        at euismod nec, bibendum eu ante. Nulla ullamcorper libero id arcu congue, a consectetur risus interdum. Nullam
        ultricies justo sed egestas malesuada. Sed vel neque diam. Sed ut commodo lectus, ac fermentum nisi. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </p>
      <p class="text-body2">
        Cras eget leo et sem pulvinar pretium ultricies rhoncus orci. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Donec sed malesuada nisl. Phasellus sit amet malesuada est. Aenean scelerisque id est at finibus. Maecenas
        ultrices at lacus sit amet mattis. Vivamus tristique arcu at arcu condimentum tristique. Donec congue sed tellus
        eget posuere. Proin eget ante diam. Sed lobortis sagittis sem finibus volutpat. Vestibulum massa mi, luctus quis
        molestie eu, vehicula ut nibh. Proin ante justo, porta id faucibus sit amet, malesuada id dolor.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0()
const user = auth0.user
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}

.container {
  max-width: 680px;
}
</style>
