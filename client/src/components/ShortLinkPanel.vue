<template>
    <v-card class="mt-3 w-100 rounded-lg" elevation="0">
        <v-container class="py-6 px-6">
            <v-row class="h-100">
                <v-col cols="2" class="d-flex align-center">
                    <v-sheet min-width="120" min-height="120" class="position-relative" @mouseover="qrHover = true"
                        @mouseleave="qrHover = false">
                        <v-img rounded="lg" :src="data.qr_code" class="w-100 h-100" alt="QR код" />
                        <v-sheet class="position-absolute w-100 h-100 pa-4 qr-code-actions rounded-lg"
                            :class="{ 'qr-code-actions-hover': qrHover }">
                            <div class="w-auto h-auto d-flex align-center">
                                <v-tooltip location="top" text="Копировать">
                                    <template #activator="{ props }">
                                        <v-btn icon size="small" class="mx-1" v-bind="props"
                                            @click="copyQrCodeToClipboard">
                                            <v-icon size="18">mdi-content-copy</v-icon>
                                        </v-btn>
                                    </template>
                                </v-tooltip>

                                <v-tooltip location="top" text="Скачать">
                                    <template #activator="{ props }">
                                        <v-btn icon size="small" class="mx-1" v-bind="props" @click="downloadQrCode">
                                            <v-icon size="18">mdi-download</v-icon>
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </v-sheet>
                    </v-sheet>
                </v-col>
                <v-col class="d-flex align-center" cols="10">
                    <div class="w-100 ms-2">
                        <div class="d-flex align-center">
                            <a class="d-flex align-center short-link"
                                :href="`http://localhost:4000/redirect/${data.slug}`" target="_blank">
                                <v-icon icon="mdi-link" />
                                <div class="font-weight-bold ms-2">short.lnk/{{ data.slug }}</div>
                            </a>
                            <!-- Tooltip для кнопки копирования -->
                            <v-tooltip location="top">
                                <template #activator="{ props }">
                                    <button v-bind="props"
                                        class="ms-4 short-link-btn-panel square d-flex align-center justify-center"
                                        @click="copyShortLink">
                                        <v-icon icon="mdi-content-copy" />
                                    </button>
                                </template>
                                <span>Скопировать ссылку</span>
                            </v-tooltip>
                            <div class="ms-auto d-flex align-center">
                                <v-chip :color="data.is_active ? 'green-lighten-1' : 'red-lighten-1'">
                                    {{ data.is_active ? 'Активна' : 'Неактивна' }}
                                </v-chip>
                                <button @click="rightDialog = true"
                                    class="ms-3 short-link-btn-panel square d-flex align-center justify-center">
                                    <v-icon icon="mdi-dots-vertical" />
                                </button>
                            </div>
                        </div>
                        <div class="d-flex align-center mt-2 w-100">
                            <v-sheet color="grey-lighten-4" class="pa-2 px-4 rounded-lg w-100">
                                <div>
                                    <span class="original-label">Оригинальный URL:</span>
                                    <div class="original-url">{{ data.original_url }}</div>
                                </div>
                            </v-sheet>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>

    <v-navigation-drawer v-model="rightDialog" location="right" temporary :width="600" elevation="0" :scrim="true">
        <v-card class="h-100 d-flex flex-column" elevation="0">
            <!-- Header with close button -->
            <v-card-title class="d-flex align-center pa-4">
                <span class="">Детали ссылки</span>
                <v-chip class="ms-2" :color="data.is_active ? 'success' : 'error'" size="small">
                    {{ data.is_active ? 'Активна' : 'Неактивна' }}
                </v-chip>
                <v-spacer />
                <v-btn icon variant="text" size="small" @click="rightDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="flex-grow-1 pa-0">
                <!-- Top section: QR Code + Name & Description -->
                <div class="pa-4 py-0">
                    <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-center">
                            <div class="text-center">
                                <v-card class="" elevation="0" rounded="lg" width="190" height="190">
                                    <v-img :src="data.qr_code" eager aspect-ratio="1" cover rounded="md" />
                                </v-card>
                            </div>
                        </v-col>
                        <v-col cols="8" class="ps-4 d-flex align-center">
                            <div class="w-100">
                                <div class="d-flex align-center mb-3 w-100">
                                    <v-text-field label="Название" class="w-100" variant="outlined" hide-details :model-value="data.name"></v-text-field>
                                </div>

                                <div class="mb-2 w-100">
                                    <v-textarea class="w-100" variant="outlined" rows="2" hide-details label="Описание" :model-value="data.description"/>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <!-- Links section -->
                <div class="pa-4 py-0">
                    <div class="mb-3">
                        <div class="text-caption text-medium-emphasis mb-1">Короткая ссылка</div>
                        <v-card variant="outlined" class="pa-3 d-flex align-center" rounded="lg">
                            <v-icon color="primary" size="20" class="me-2">mdi-link-variant</v-icon>
                            <a :href="`http://localhost:4000/redirect/${data.slug}`"
                                class="text-primary text-decoration-none flex-grow-1" target="_blank">
                                short.lnk/{{ data.slug }}
                            </a>
                            <v-btn icon size="small" variant="text"
                                @click="copyToClipboard(`http://localhost:4000/redirect/${data.slug}`)">
                                <v-icon size="16">mdi-content-copy</v-icon>
                            </v-btn>
                        </v-card>
                    </div>

                    <div>
                        <div class="text-caption text-medium-emphasis mb-1">Оригинальная ссылка</div>
                        <v-card variant="outlined" class="pa-3 d-flex align-center" rounded="lg">
                            <v-icon color="grey" size="20" class="me-2">mdi-link</v-icon>
                            <a :href="data.original_url"
                                class="text-medium-emphasis text-decoration-none flex-grow-1 text-truncate"
                                target="_blank" :title="data.original_url">
                                {{ data.original_url }}
                            </a>
                            <v-btn icon size="small" variant="text" @click="copyToClipboard(data.original_url)">
                                <v-icon size="16">mdi-content-copy</v-icon>
                            </v-btn>
                        </v-card>
                    </div>
                </div>

                <!-- Statistics section -->
                <div class="pa-4">
                    <div class="text-subtitle-2 text-medium-emphasis mb-3">Статистика</div>

                    <v-row>
                        <v-col cols="6">
                            <v-card variant="tonal" color="primary" class="pa-3 text-center" rounded="lg">
                                <div class="text-h4 font-weight-bold text-primary">{{ data.click_count }}</div>
                                <div class="text-caption text-medium-emphasis">Переходов</div>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card variant="tonal" color="secondary" class="pa-3 text-center" rounded="lg">
                                <div class="text-h4 font-weight-bold text-secondary">
                                    {{ data.max_clicks > 0 ? data.max_clicks : '∞' }}
                                </div>
                                <div class="text-caption text-medium-emphasis">Лимит</div>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row class="mt-2">
                        <v-col cols="6">
                            <v-list-item class="pa-0">
                                <template #prepend>
                                    <v-icon color="info" size="20">mdi-clock-outline</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">Последний переход</v-list-item-title>
                                <v-list-item-subtitle>
                                    <span v-if="data.last_visit">
                                        {{ formatDate(data.last_visit) }}
                                    </span>
                                    <span v-else class="text-medium-emphasis">—</span>
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                        <v-col cols="6">
                            <v-list-item class="pa-0">
                                <template #prepend>
                                    <v-icon color="success" size="20">mdi-check-circle</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">HTTP статус</v-list-item-title>
                                <v-list-item-subtitle>{{ data.http_status }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<style>
.qr-code-actions {
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0;
    background-color: rgba(158, 151, 151, 0.55) !important;
    transition: all 0.2s ease;
    color: white !important;
    display: flex !important;
    align-items: center;
    justify-content: center;

    &.qr-code-actions-hover {
        opacity: 1;
        transition: all 0.2s ease;
    }
}

.original-label {
    font-size: 13px;
    color: #666;
}

.original-url {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: block;
}
</style>

<script>
export default {
    name: "ShortLinkPanel",

    data() {
        return {
            qrHover: false,
            rightDialog: false,
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // console.log(this.qrHover);
    },
    methods: {
        async copyQrCodeToClipboard() {
            try {
                const base64 = this.data.qr_code;

                const res = await fetch(base64);
                const blob = await res.blob();
                await navigator.clipboard.write([
                    new window.ClipboardItem({ [blob.type]: blob })
                ]);
                this.$emit('showSnackbar', 'QR-код скопирован в буфер обмена!');
            } catch (e) {
                console.error(e);
                this.$emit('showSnackbar', 'Не удалось скопировать QR-код');
            }
        },
        downloadQrCode() {
            const base64 = this.data.qr_code;
            const a = document.createElement('a');
            a.href = base64;
            a.download = `qr-code(${this.data.slug}).png`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
            }, 100);
        },

        async copyShortLink() {
            try {
                const link = `http://localhost:4000/redirect/${this.data.slug}`;
                await navigator.clipboard.writeText(link);
                this.$emit('showSnackbar', 'QR-код скопирован в буфер обмена!');
            } catch (e) {
                console.error(e);
                this.$emit('showSnackbar', 'Не удалось скопировать QR-код');
            }
        },
    }
}
</script>

<style>
.short-link {
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s ease;
    color: #000000;

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
        aspect-ratio: 1 / 1;
    }

    &.short-link-btn-panel-text {
        padding: 7px 28px;
        font-size: 18px;
    }

    &:hover {
        border: 1.25px solid #a2aecd;
        transition: all 0.3s ease;
    }
}
</style>