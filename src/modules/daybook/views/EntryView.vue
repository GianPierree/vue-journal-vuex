<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3 ">{{ month }}</span>
            <span class="mx-1 fs-4 fw-light">{{ yearDay }}</span>
        </div>
        <div>
            <input type="file" name="file" id="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpeg" />
            <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                Borrar
                <i class="fas fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary mx-2" @click="onSelectImage">
                Subir foto
                <i class="fas fa-upload"></i>
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <img v-if="entry.picture && localImage === null" :src="entry.picture" alt="entry-picture" class="img-thubnail" />
    <img v-if="localImage" :src=localImage alt="entry-picture" class="img-thubnail" />
    <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import getDatMonthYear from '../helpers/getDatMonthYear'
import uploadImage from '../helpers/uploadImage'


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
            entry: null,
            localImage: null,
            localFile: null,
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

            new Swal({
                title: 'Espere por favor...',
                allowOutsideClick: false,
            })

            Swal.showLoading()

            const picture = await uploadImage(this.localFile)
            console.log(picture);

            this.entry.picture = picture

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

            this.localFile = null
            Swal.fire('Guardado', 'La entrada se ha guardado correctamente', 'success')

        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrarlo!'
            })

            if(isConfirmed){
                
                new Swal({
                    title: 'Espere por favor...',
                    allowOutsideClick: false,
                })
                
                Swal.showLoading()

                console.log("Borrando entrada...", this.entry);
                const {status} = await this.deleteEntry(this.entry.id)
                console.log(status);
                this.$router.push({ name: 'no-entry' })

                Swal.fire('Borrado', 'La entrada se ha borrado correctamente', 'success')
            }
        },
        onSelectedImage(e) {
            const file = e.target.files[0]

            if(!file) {
                this.localImage = null
                this.localFile = null
                return
            }

            this.localFile = file

            const reader = new FileReader()
            reader.onload = () => this.localImage = reader.result
            reader.readAsDataURL(file)
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
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