<template>
    <div class="g-con" :class="{'g-collapse': !sideopen}">
        <v-sidebar class="g-sidebar"></v-sidebar>
        <div class="g-main">
            <section class="g-top">
                <v-navbar class="g-top-nav"></v-navbar>
            </section>
            <div class="g-main-box">
                <v-main></v-main>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "layOut",
        computed: {
            ...mapState(['sideopen'])
        },
        created() {
        },
        methods: {
        }
    };
</script>

