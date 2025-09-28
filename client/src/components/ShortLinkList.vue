<template>
    <div>
        <div v-for="short_link in short_links" :key="short_link.id">
            <ShortLinkPanel :data="short_link"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShortLinkList",

    data() {
        return {
            short_links: [],
            isConnected: false
        }
    },

    mounted() {
        this.ShortLinksList();
        this.setupWebSocketHandlers();
    },

    beforeUnmount() {
        this.removeWebSocketHandlers();
    },

    methods: {
        async ShortLinksList() {
            try {
                const response = await this.$api.get('/short_link');
                this.short_links = response.data.short_links;
            } catch (error) {
                console.error('Ошибка получения сокращенных ссылок:', error);
            }
        },

        setupWebSocketHandlers() {
            this.$websocket.on('connected', this.handleWebSocketConnected);
            this.$websocket.on('disconnected', this.handleWebSocketDisconnected);
            this.$websocket.on('SHORT_LINK_CREATED', this.handleNewShortLink);
            this.$websocket.on('SHORT_LINK_UPDATED', this.handleUpdatedShortLink);
            this.$websocket.on('messageError', this.handleMessageError);
            
            this.isConnected = this.$websocket.getConnectionStatus();
        },

        removeWebSocketHandlers() {
            this.$websocket.off('connected', this.handleWebSocketConnected);
            this.$websocket.off('disconnected', this.handleWebSocketDisconnected);
            this.$websocket.off('SHORT_LINK_CREATED', this.handleNewShortLink);
            this.$websocket.off('SHORT_LINK_UPDATED', this.handleUpdatedShortLink);
            this.$websocket.off('messageError', this.handleMessageError);
        },

        handleWebSocketConnected() {
            this.isConnected = true;
        },

        handleWebSocketDisconnected() {
            this.isConnected = false;
        },

        handleNewShortLink(newLink) {
            const existingIndex = this.short_links.findIndex(link => link.id === newLink.id);
            
            if (existingIndex === -1) {
                this.short_links.unshift(newLink);
            }
        },

        handleUpdatedShortLink(updatedLink) {
            const index = this.short_links.findIndex(link => link.id === updatedLink.id);
            
            if (index !== -1) {
                this.short_links = [
                    ...this.short_links.slice(0, index),
                    updatedLink,
                    ...this.short_links.slice(index + 1)
                ];
            } else {
                this.short_links = [updatedLink, ...this.short_links];
            }
        },

        handleMessageError(errorData) {
            console.error('WebSocket message error:', errorData);
        }
    },
}
</script>