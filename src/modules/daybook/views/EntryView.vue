<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3 ">{{ month }}</span>
            <span class="mx-1 fs-4 fw-light">{{ yearDay }}</span>
        </div>
        <div>
            <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                Borrar
                <i class="fas fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary mx-2">
                Subir foto
                <i class="fas fa-upload"></i>
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <img src="https://www.altonivel.com.mx/wp-content/uploads/2018/05/avengers.jpg" alt="entry-picture" class="img-thubnail" />
    <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import getDatMonthYear from '../helpers/getDatMonthYear'


export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue')),
    },
    data() {
        return {
            entry: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDatMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDatMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDatMonthYear(this.entry.date)
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry
            // console.log(entry);
            if(this.id === 'new'){
                entry = {
                    text: '',
                    date: new Date().getTime(),
                }
            }else{
                entry = this.getEntryById(this.id)
                if(!entry) return this.$router.push({ name: 'no-entry' })
            }

            this.entry = entry
        },
        async saveEntry() {
            console.log(this.entry);

            if(this.entry.id){
                console.log("Guardando entrada...");
                await this.updateEntry(this.entry)
            }else{
                console.log("Creando entrada...")
                const id = await this.createEntry(this.entry)
                // console.log(id);
                this.$router.push({ name: 'entry', params: { id } })
            }
        },
        async onDeleteEntry() {
            console.log("Borrando entrada...", this.entry);
            const {status} = await this.deleteEntry(this.entry.id)
            console.log(status);
            this.$router.push({ name: 'no-entry' })
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    border: none;
    font-size: 20px;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: black, $alpha: 0.2);
}

</style>