class WebSocketPlugin {
    constructor() {
        this.ws = null;
        this.eventHandlers = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = 3000;
        this.isConnected = false;
    }

    connect(url) {
        if (this.ws && this.isConnected) {
            return;
        }

        try {
            this.ws = new WebSocket(url);
            this.setupEventHandlers();
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.handleReconnection(url);
        }
    }

    setupEventHandlers() {
        this.ws.onopen = () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type) {
                    this.emit(message.type, message.data);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.ws.onclose = (event) => {
            this.isConnected = false;
            
            if (event.code !== 1000) {
                this.handleReconnection(this.ws.url);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    handleReconnection(url) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        
        setTimeout(() => {
            this.connect(url);
        }, this.reconnectInterval);
    }

    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }

    off(event, handler) {
        if (this.eventHandlers.has(event)) {
            const handlers = this.eventHandlers.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    send(data) {
        if (this.ws && this.isConnected) {
            if (typeof data === 'object') {
                this.ws.send(JSON.stringify(data));
            } else {
                this.ws.send(data);
            }
        } else {
            console.warn('WebSocket is not connected');
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close(1000, 'Normal closure');
            this.ws = null;
            this.isConnected = false;
        }
    }

    getConnectionStatus() {
        return this.isConnected;
    }
}

const websocketPlugin = new WebSocketPlugin();

export default {
    install: (app, options) => {
        const defaultUrl = options?.url || 'ws://localhost:8080';
        
        // Делаем плагин доступным глобально
        app.config.globalProperties.$websocket = websocketPlugin;
        app.provide('websocket', websocketPlugin);
        
        if (options?.autoConnect !== false) {
            websocketPlugin.connect(defaultUrl);
        }
    }
};

export { websocketPlugin };