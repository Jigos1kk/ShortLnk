<template>
    <v-card elevation="0" class="classic-card" rounded="lg">
        <v-container>
            <div class="d-flex align-center">
                <div class="text-h5 font-weight-bold">Сократи ссылку</div>
                <div class="ms-auto" style="position: relative;">
                    <div class="tab-switcher">
                        <div class="tab-highlight"
                            :class="{ 'qr-active': activeTab === 'qr', 'link-active': activeTab === 'link' }">
                        </div>
                        <button rounded="xl" class="tab-btn d-flex align-center justify-center"
                            :class="{ active: activeTab === 'link' }" color="transparent" @click="activeTab = 'link'">
                            Ссылка
                        </button>
                        <button rounded="xl" class="tab-btn d-flex align-center justify-center"
                            :class="{ active: activeTab === 'qr' }" color="transparent" @click="activeTab = 'qr'">
                            QR код
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-center w-100 my-6">
                <div>
                    <div class="d-flex flex-row align-center justify-start gap-8 how-it-works-steps">
                        <div class="d-flex flex-column align-center text-center px-2">
                            <v-icon color="primary" size="30">mdi-link-variant</v-icon>
                            <span class="mt-1 text-caption text-grey-darken-2">Вставьте ссылку</span>
                        </div>
                        <v-icon color="grey-lighten-1" size="18" class="mx-1">mdi-chevron-right</v-icon>
                        <div class="d-flex flex-column align-center text-center px-2">
                            <v-icon color="success" size="30">mdi-content-cut</v-icon>
                            <span class="mt-1 text-caption text-grey-darken-2">Сократите её</span>
                        </div>
                        <v-icon color="grey-lighten-1" size="18" class="mx-1">mdi-chevron-right</v-icon>
                        <div class="d-flex flex-column align-center text-center px-2">
                            <v-icon color="deep-purple-accent-4" size="30">mdi-share-variant</v-icon>
                            <span class="mt-1 text-caption text-grey-darken-2">Делитесь где угодно</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-center justify-center mt-4 link-shortener-block">
                <input class="inp-link" placeholder="https://very-long-link.ru/example">
                <button class="short-link-btn ms-2">
                    Сократить ссылку
                </button>
            </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "ShortLinkPanel",

    data() {
        return {
            activeTab: "link",
            longUrl: "",
            shortUrl: "",
            shortening: false
        }
    }
}
</script>

<style>
.tab-switcher {
    display: flex;
    position: relative;
    background: #e9e9e9;
    padding: 4px;
    border-radius: 2rem;
    width: 270px;
    min-width: 170px;
    height: 45px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.inp-link{
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    border: 2px solid #e9e9e9;
    transition: all 0.3s ease;

    &:hover{
        border: 2px solid #d4d4d4;
        outline: none;
        transition: all 0.2s ease;
    }

    &:focus {
        border: 2px solid #7b7b7b;
        outline: none;
        transition: all 0.2s ease;
    }
}

.tab-btn {
    z-index: 1;
    min-width: 110px;
    width: 50%;
    font-weight: 600;
    color: #7b7b7b;
    transition: color 0.15s;
    background: transparent;
}

.tab-btn.active {
    color: #000;
    /* Optionally: font-weight: bold; */
}

.short-link-btn{
    text-wrap: nowrap;
    padding: 10px 20px;
    background-color: #034EEE;
    color: #FFFFFF;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #0246d7;
        transition: all 0.3s ease;
    }
}

.tab-highlight {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 50%;
    height: 37px;
    background: #fff;
    border-radius: 1.7rem;
    box-shadow: 0 2px 10px #0001;
    transition: left 0.3s cubic-bezier(.52, .15, .38, .72);
    z-index: 0;
}

.tab-highlight.link-active {
    left: 5px;
}

.tab-highlight.qr-active {
    left: calc(50% - 5px);
}
</style>