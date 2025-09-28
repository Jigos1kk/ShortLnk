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
                                        @click="copy(`http://localhost:4000/redirect/${this.localData.slug}`)">
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

    <v-navigation-drawer v-model="rightDialog" location="right" temporary color="transparent" :width="600" elevation="0" class="pa-2 border-0 h-100">
        <v-card class="pa-2 h-100 rounded-lg overflow-auto d-flex flex-column" elevation="0">
            <!-- Основной контент -->
            <div class="flex-grow-1 overflow-auto">
                <v-card class="pa-2 rounded-lg border mb-2" elevation="0">
                    <div class="d-flex align-center px-3">
                        <div class="w-100">
                            <div class="text-caption text-grey-darken-2">
                                Название:
                            </div>
                            <input v-model="localData.name" placeholder="Без названия" class="w-100 rounded text-body-2"
                                maxlength="32" style="outline: none;">
                        </div>
                        <div class="ms-auto mx-2">
                            <div class="text-caption text-grey-darken-2">
                                Код:
                            </div>
                            <div class="font-weight-bold">
                                {{ localData.slug }}
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
                                :class="localData.is_active ? 'translate-x-100 bg-green-lighten-1' : 'translate-x-0 bg-red-lighten-1'"
                                width="50%" style="
                                    position: absolute;
                                    height: 100%;
                                    transition: all 0.3s ease;
                                    cursor: pointer;
                                "></v-sheet>
                            <!-- Кнопки -->
                            <v-sheet class="px-4 py-1 rounded-xl text-center" color="transparent" width="120"
                                style="z-index: 2;" @click="localData.is_active = false"
                                :class="!localData.is_active ? 'font-weight-medium  text-white' : 'text-grey-darken-2'">
                                Неактивна
                            </v-sheet>

                            <v-sheet class="px-4 py-1 rounded-xl text-center" color="transparent" width="120"
                                style="z-index: 2;" @click="localData.is_active = true"
                                :class="localData.is_active ? 'font-weight-medium text-white' : 'text-grey-darken-2'">
                                Активна
                            </v-sheet>
                        </v-sheet>
                    </v-sheet>

                    <div class="d-flex w-100 justify-center mb-3">
                        <v-img :src="localData.qr_code" height="210" class="rounded-lg" />
                    </div>

                    <v-sheet color="grey-lighten-4 mb-2" class="pa-2 px-4 rounded-lg w-100">
                        <div>
                            <span class="original-label">Оригинальный URL:</span>
                            <div class="d-flex align-center">
                                <div class="original-url me-2">{{ localData.original_url }}</div>
                                <button class="ms-auto bg-white px-2 py-1 rounded-lg text-caption"
                                    @click="copy(localData.original_url)">
                                    Копировать
                                </button>
                            </div>
                        </div>
                    </v-sheet>

                    <v-card class="rounded-lg pa-3 mb-3" color="grey-lighten-4" variant="flat">
                        <span class="original-label">Описание:</span>
                        <v-textarea v-model="localData.description" placeholder="Добавьте описание..." variant="plain"
                            hide-details auto-grow rows="3" density="compact"
                            :class="{ 'text-grey': !localData.description }" class="text-body-2"
                            style="overflow-y: auto;"></v-textarea>
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
                                    <span>{{ localData.click_count }}</span>
                                    <span class="text-grey-darken-2"> / {{ localData.max_clicks && localData.max_clicks
                                        != 0
                                        ? localData.max_clicks : '∞' }}</span>
                                    <v-chip class="ms-3 py-0" v-if="localData.last_accessed_at">
                                        <div class="text-caption font-weight-medium">
                                            {{ formatRelativeDate(localData.last_accessed_at) }}
                                        </div>
                                    </v-chip>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <!-- Срок активности -->
                                <div class="d-flex align-center justify-space-between">
                                    <div>
                                        <v-chip class="text-caption font-weight-medium" :class="classExpiresAt">
                                            {{ localData.expires_at ? formatRelativeDate(localData.expires_at) :
                                            'Бессрочно'
                                            }}
                                        </v-chip>
                                    </div>

                                    <div>
                                        <v-menu v-model="menu" location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon size="x-small" variant="text" v-bind="props" class="ml-2">
                                                    <v-icon size="16">mdi-cog</v-icon>
                                                </v-btn>
                                            </template>

                                            <v-card class="mb-2 border rounded-lg pa-3 menu-card" elevation="0"
                                                width="350" :close-on-content-click="false">
                                                <div class="card-header mb-3">
                                                    <v-icon size="18" color="primary" class="mr-1">mdi-cog</v-icon>
                                                    <span class="text-caption font-weight-medium text-primary">Настройки
                                                        ссылки</span>
                                                </div>

                                                <div class="settings-grid">
                                                    <div class="setting-item">
                                                        <div class="label-wrapper">
                                                            <v-icon size="16" class="mr-1">mdi-counter</v-icon>
                                                            <span class="text-caption">Макс. переходов</span>
                                                        </div>
                                                        <v-text-field v-model="localData.max_clicks" hide-details
                                                            type="number" @click.stop variant="outlined"
                                                            density="compact" class="compact-field" min="0"
                                                            maxlength="9"></v-text-field>
                                                    </div>

                                                    <div class="setting-item">
                                                        <div class="label-wrapper">
                                                            <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
                                                            <span class="text-caption">Дата окончания</span>
                                                        </div>
                                                        <v-text-field v-model="localData.expires_at" hide-details
                                                            type="date" @click.stop variant="outlined" density="compact"
                                                            class="compact-field"></v-text-field>
                                                    </div>
                                                </div>
                                            </v-card>
                                        </v-menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>

            <!-- Футер с кнопками -->
            <v-card-actions class="pa-3 mt-auto bg-white">
                <v-spacer></v-spacer>
                <v-btn variant="outlined" color="grey-darken-2" @click="closeDialog" class="me-2" :disabled="loading">
                    Закрыть
                </v-btn>
                <v-btn variant="flat" color="primary" @click="saveData" :loading="loading" :disabled="loading">
                    <template v-slot:loader>
                        <v-progress-circular indeterminate size="20" width="2"></v-progress-circular>
                    </template>
                    Сохранить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default {
    name: "ShortLinkPanel",

    data() {
        return {
            qrHover: false,
            rightDialog: false,
            menu: false,
            localData: {},
            loading: false
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        classExpiresAt() {
            if (this.localData.expires_at) {
                const now = new Date().toISOString().split('T')[0];
                const expires = new Date(this.localData.expires_at).toISOString().split('T')[0]

                if (now <= expires) {
                    return 'bg-green-lighten-1';
                } else {
                    return 'bg-red-lighten-1';
                }
            }
        },
    },
    watch: {
        data: {
            handler(newData) {
                this.localData = this._prepareDataForEdit({ ...newData });
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        // console.log(this.qrHover);
    },
    methods: {
        _prepareDataForEdit(data) {
            const prepared = { ...data };

            if (prepared.expires_at) {
                const date = new Date(prepared.expires_at);
                prepared.expires_at = date.toISOString().split('T')[0];
            }

            if (prepared.max_clicks === null || prepared.max_clicks === undefined) {
                prepared.max_clicks = 0;
            }

            return prepared;
        },

        _prepareDataForSave(data) {
            const prepared = { ...data };

            if (prepared.expires_at) {
                const date = new Date(prepared.expires_at + 'T23:59:59');
                prepared.expires_at = date.toISOString();
            } else {
                prepared.expires_at = null;
            }

            prepared.max_clicks = parseInt(prepared.max_clicks) || 0;
            prepared.is_active = Boolean(prepared.is_active);

            return prepared;
        },

        async saveData() {
            this.loading = true;

            try {
                const dataToSave = this._prepareDataForSave(this.localData)
                const response = await this.$api.put(`/update/short_link/${this.localData.slug}`, dataToSave, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    this._closeDialog();
                }

            } catch (error) {
                console.error('Error saving data:', error);
            } finally {
                this.loading = false;
            }
        },

        async copyQrCodeToClipboard() {
            try {
                const base64 = this.localData.qr_code;

                const res = await fetch(base64);
                const blob = await res.blob();
                await navigator.clipboard.write([
                    new window.ClipboardItem({ [blob.type]: blob })
                ]);
            } catch (e) {
                console.error(e);
            }
        },

        copy(text) {
            navigator.clipboard.writeText(text);
        },

        downloadQrCode() {
            const base64 = this.localData.qr_code;
            const a = document.createElement('a');
            a.href = base64;
            a.download = `qr-code(${this.localData.slug}).png`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
            }, 100);
        },

        _closeDialog() {
            this.rightDialog = false;
        },

        formatRelativeDate(date, options = {}) {
            const {
                futureText = 'через',
                pastText = 'назад',
                todayText = 'сегодня',
                yesterdayText = 'вчера',
                tomorrowText = 'завтра',
                locale = 'ru-RU',
                monthThreshold = 30
            } = options;

            const now = new Date();
            const targetDate = new Date(date);

            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const compareDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

            const diffTime = compareDate - today;
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                return todayText;
            }

            if (diffDays === -1) {
                return yesterdayText;
            }
            if (diffDays === 1) {
                return tomorrowText;
            }

            if (diffDays > 0) {
                if (diffDays <= monthThreshold) {
                    return `${futureText} ${this._getDayText(diffDays, 'future')}`;
                } else {
                    return this._formatFullDate(targetDate, locale);
                }
            }

            if (diffDays < 0) {
                const daysAgo = Math.abs(diffDays);
                if (daysAgo <= monthThreshold) {
                    return `${this._getDayText(daysAgo, 'past')} ${pastText}`;
                } else {
                    return this._formatFullDate(targetDate, locale);
                }
            }

            return this._formatFullDate(targetDate, locale);
        },

        _getDayText(days, type) {
            if (days === 1) {
                return type === 'future' ? '1 день' : '1 день';
            } else if (days >= 2 && days <= 4) {
                return `${days} дня`;
            } else if (days >= 5 && days <= 20) {
                return `${days} дней`;
            } else {
                const lastDigit = days % 10;
                if (lastDigit === 1) {
                    return `${days} день`;
                } else if (lastDigit >= 2 && lastDigit <= 4) {
                    return `${days} дня`;
                } else {
                    return `${days} дней`;
                }
            }
        },

        _formatFullDate(date, locale) {
            return date.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            });
        }
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

.menu-card {
    background: #fafafa;
    border: 1px solid #e0e0e0 !important;
    transition: all 0.3s ease;
}

.menu-card:hover {
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
}

.elegant-field {
    border-radius: 8px;
}

:deep(.v-field--prepended) {
    padding-left: 12px;
}

:deep(.v-field__prepend-inner) {
    padding-right: 8px;
}
</style>