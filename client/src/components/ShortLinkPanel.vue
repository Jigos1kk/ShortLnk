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

    <v-navigation-drawer v-model="rightDialog" location="right" temporary color="transparent" :width="600" elevation="0"
        :scrim="true" class="pa-2 border-0 h-100">
        <v-card class="pa-2 h-100 rounded-lg overflow-auto d-flex flex-column" elevation="0">
            <!-- Основной контент -->
            <div class="flex-grow-1 overflow-auto">
                <v-card class="pa-2 rounded-lg border mb-2" elevation="0">
                    <div class="d-flex align-center px-3">
                        <div class="">
                            <div class="text-caption text-grey-darken-2">
                                Название:
                            </div>
                            <input v-model="data.name" placeholder="Без названия" class="w-100 rounded text-body-2"
                                style="outline: none;">
                        </div>
                        <div class="ms-auto mx-2">
                            <div class="text-caption text-grey-darken-2">
                                Код:
                            </div>
                            <div class="font-weight-bold">
                                {{ data.slug }}
                            </div>
                        </div>
                    </div>
                </v-card>
                <v-card class="pa-4 rounded-lg border" elevation="0">

                    <v-sheet class="d-flex">
                        <v-sheet color="grey-lighten-3"
                            class="d-flex align-center rounded-xl relative border-md ms-auto">
                            <!-- Активная панель -->
                            <v-sheet class="rounded-xl text-center bg-white py-2"
                                :class="data.is_active ? 'translate-x-100 bg-green-lighten-1' : 'translate-x-0 bg-red-lighten-1'"
                                width="50%" style="
                                    position: absolute;
                                    height: 100%;
                                    transition: all 0.3s ease;
                                    cursor: pointer;
                                "></v-sheet>

                            <!-- Кнопки -->
                            <v-sheet class="px-4 py-1 rounded-xl text-center" color="transparent" width="120"
                                style="z-index: 2;" @click="data.is_active = false"
                                :class="!data.is_active ? 'font-weight-medium  text-white' : 'text-grey-darken-2'">
                                Неактивна
                            </v-sheet>

                            <v-sheet class="px-4 py-1 rounded-xl text-center" color="transparent" width="120"
                                style="z-index: 2;" @click="data.is_active = true"
                                :class="data.is_active ? 'font-weight-medium text-white' : 'text-grey-darken-2'">
                                Активна
                            </v-sheet>
                        </v-sheet>
                    </v-sheet>

                    <div class="d-flex w-100 justify-center mb-3">
                        <v-img :src="data.qr_code" height="210" class="rounded-lg" />
                    </div>

                    <v-sheet color="grey-lighten-4 mb-2" class="pa-2 px-4 rounded-lg w-100">
                        <div>
                            <span class="original-label">Оригинальный URL:</span>
                            <div class="d-flex align-center">
                                <div class="original-url me-2">{{ data.original_url }}</div>
                                <button class="ms-auto bg-white px-2 py-1 rounded-lg text-caption"
                                    @click="copy(data.original_url)">
                                    Копировать
                                </button>
                            </div>
                        </div>
                    </v-sheet>

                    <v-card class="rounded-lg pa-3 mb-3" color="grey-lighten-4" variant="flat">
                        <span class="original-label">Описание:</span>
                        <v-textarea v-model="data.description" placeholder="Добавьте описание..." variant="plain"
                            hide-details auto-grow rows="3" density="compact"
                            :class="{ 'text-grey': !data.description }" class="text-body-2"
                            style="overflow-y: auto; max-height: 180px;"></v-textarea>
                    </v-card>

                    <div class="pa-2 border rounded-lg">
                        <div class="d-flex align-center">
                            <v-sheet width="45" height="45" rounded="lg" color="blue-darken-1">
                                <div class="d-flex align-center justify-center w-100 h-100">
                                    <v-icon icon="mdi-fingerprint" color="white" />
                                </div>
                            </v-sheet>
                            <div class="px-2">
                                <span class="original-label">Переходы:</span>
                                <div style="font-size: 1.15rem;">
                                    <span>{{ data.click_count }}</span>
                                    <span class="text-grey-darken-2"> / {{ data.max_clicks || '∞' }}</span>
                                    <v-chip class="ms-3 py-0" v-if="data.updatedAt">
                                        <div class="text-caption font-weight-medium">
                                            {{ data.updatedAt }}
                                        </div>
                                    </v-chip>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <!-- Срок активности -->
                                <div class="d-flex align-center justify-space-between">
                                    <div>
                                        <span class="text-caption text-grey-darken-1">Активна:</span>
                                        <div class="text-caption font-weight-medium">
                                            {{ data.expires_at ? formatDate(data.expires_at) : 'Бессрочно' }}
                                        </div>
                                    </div>

                                    <!-- Кнопка изменения срока -->
                                    <v-btn icon size="x-small" variant="text" @click="changeExpiryDate" class="ml-2">
                                        <v-icon size="16">mdi-pencil</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>

            <!-- Футер с кнопками -->
            <v-card-actions class="pa-3 mt-auto bg-white">
                <v-spacer></v-spacer>
                <v-btn variant="outlined" color="grey-darken-2" @click="closeDialog" class="me-2">
                    Закрыть
                </v-btn>
                <v-btn variant="flat" color="primary" @click="saveData">
                    Сохранить
                </v-btn>
            </v-card-actions>
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

.translate-x-0 {
    transform: translateX(0px);
}

.translate-x-100 {
    transform: translateX(120px);
}

.relative {
    position: relative;
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
        getProgressColor(data) {
            if (data.max_clicks === 0) return 'blue';
            const percentage = (data.clicks_count / data.max_clicks) * 100;
            if (percentage < 50) return 'green';
            if (percentage < 80) return 'orange';
            return 'red';
        },

        getExpirationStatus(expiresAt) {
            if (!expiresAt) return 'Без ограничения по времени';
            const now = new Date();
            const expiration = new Date(expiresAt);
            const diff = expiration - now;
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

            if (days < 0) return 'Срок действия истек';
            if (days === 0) return 'Истекает сегодня';
            if (days === 1) return 'Истекает завтра';
            if (days < 7) return `Истекает через ${days} дней`;
            return `Истекает ${expiration.toLocaleDateString()}`;
        },

        copyUrl() {
            // Логика копирования URL
            navigator.clipboard.writeText(data.original_url);
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