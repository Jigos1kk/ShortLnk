<template>
    <v-container max-height="100%" class="px-7 mt-11" max-width="800">
        <div id="head">
            <div class="d-flex w-100 align-center">
                <div class="d-flex align-center">
                    <div class="logo d-flex">
                        <img src="../assets/logo.svg" class="w-100" />
                    </div>
                    <div class="text-h5 ms-2 font-weight-bold">Short.lnk</div>
                </div>
                <!-- <div class="ms-auto d-flex align-center">
                    <button class="header-btn ms-2 classic-card"></button>
                    <button class="header-btn ms-2 classic-card"></button>
                    <button class="header-btn profile ms-4 classic-card"></button>
                </div> -->
            </div>
        </div>
        <div id="body" class="mt-5">
            <ShortLinkSettings />
            <ShortLinkPanel />
        </div>
    </v-container>
</template>

<script>
export default {
    name: "Main",
    mounted() {
        // Пример запроса к API при монтировании
        this.checkApi();
    },
    methods: {
        async checkApi() {
            console.log(await this.$api.get('/connect'));
            
        },
    },
}

</script>

<style>
.logo {
    width: 46px;
}

.header-btn {
    &.profile {
        width: 46px;
        height: 46px;
    }

    &:not(.profile) {
        width: 38px;
        height: 38px;
    }

    &:hover {
        transition: all 0.3s ease;
        background-color: #eeeeee;
    }
}

.classic-card {
    background-color: white;
    border-radius: 10px;
    transition: all 0.4s ease;
}
</style>