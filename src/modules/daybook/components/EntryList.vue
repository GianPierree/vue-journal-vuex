<template>
    <div class="entry-list-contianer">
        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar entrada" v-model="term" />
        </div>
        <div class="mt-2 d-flex flex-column">
            <button
                class="btn btn-primary mx-3"
                @click="newEntry"
            >
                <i class="fas fa-plus"></i>
                Nueva entrada
            </button>
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry">Entry</Entry>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry'))
    },
    computed: {
        ...mapGetters("journal", ["getEntriesByTerm"]),
        entriesByTerm() {
            return this.getEntriesByTerm(this.term)
        }
    },
    data() {
        return {
            term: ""
        }
    },
    methods: {
        newEntry() {
            this.$router.push({ name: "entry", params: { id: "new" }})
            console.log("Nueva entrada");
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    height: 40px;
}
.entry-list-contianer {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}
.entry-scrollarea {
    height: calc(100vh - 110px);
    overflow: scroll;
}
</style>