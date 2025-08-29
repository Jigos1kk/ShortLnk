<template>
    <v-card class="mt-3 w-100 rounded-lg" elevation="0">
        <v-container class="py-6 px-6">
            <v-row class="h-100">
                <v-col cols="2" class="d-flex align-center">
                    <v-sheet min-width="105" min-height="105" rounded="lg" color="grey">

                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center">
                    <div>
                        <div class="d-flex align-center">
                            <a class="d-flex align-center short-link" href="https://fonts.google.com/selection/embed">
                                <v-icon icon="mdi-link" />
                                <div class="font-weight-bold ms-2">{{ shortURL }}</div>
                            </a>
                            <button class="ms-2 short-link-btn-panel square d-flex align-center justify-center">
                                <v-icon icon="mdi-content-copy" />
                            </button>
                        </div>
                        <div class="d-flex align-center mt-4">
                            <button class="short-link-btn-panel short-link-btn-panel-text">
                                Параметры
                            </button>
                            <button class="ms-2 short-link-btn-panel square d-flex align-center justify-center color-danger">
                                <v-icon icon="mdi-chart-bar" />
                            </button>
                            <button class="ms-2 short-link-btn-panel square d-flex align-center justify-center color-danger">
                                <v-icon icon="mdi-lock-open" />
                            </button>
                            <button class="ms-2 short-link-btn-panel square d-flex align-center justify-center color-danger">
                                <v-icon icon="mdi-delete" />
                            </button>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ShortLinkPanel",

        data() {
            return {
                shortURL: "short.lnk/qWeaw2"
            }
        }
    }
</script>

<style>
.short-link{
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        color: #034EEE !important;
        transition: all 0.3s ease;
    }

    &:visited {
        color: #000000;
        transition: all 0.3s ease;
    }
}

.short-link-btn-panel {
    border: 1.25px solid #dee2ee;
    padding: 7px;
    border-radius: 10px;
    font-size: 14px;
    transition: all 0.3s ease;

    &.square {
        width: 42px; 
        aspect-ratio: 1 / 1 ;
    }

    &.short-link-btn-panel-text{
        padding: 7px 28px;
        font-size: 18px;
    }

    &:hover {
        border: 1.25px solid #bfcae6;
        transition: all 0.3s ease;
    }
}
</style>