<template>
    <Navbar />
    <!-- <p> {{(isLoading) ? "Verdadero" : "Falso"}} </p> -->
    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spinner fa-spin"></i>
            </h3>
        </div>
    </div>
    <div v-else class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
        Navbar: defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue')),
        EntryList: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'))
    },
    computed: {
        ...mapState('journal', ['entries', 'isLoading']),
    },
    methods: {
        ...mapActions('journal', ['loadEntries']),
    },
    created() {
        this.loadEntries()
    },
}
</script>

<style>
</style>