/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

export const SubscribeLinks = (props) => {
    const { t, links } = props;

    if (!links) return null;

    // Helper function to generate QR code SVG
    const generateQrCode = (url, linkType) => {
        return `
            const qr = qrcode(0, 'M');
            qr.addData('${url.replace(/'/g, "\\'")}');
            qr.make();
            const size = 8;
            const moduleCount = qr.getModuleCount();
            const qrSize = moduleCount * size;
            let svg = '<svg viewBox="0 0 ' + qrSize + ' ' + qrSize + '" xmlns="http://www.w3.org/2000/svg" style="width: 200px; height: 200px;">';
            svg += '<rect width="100%" height="100%" fill="#ffffff"/>';
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        svg += '<rect x="' + (col * size) + '" y="' + (row * size) + '" width="' + size + '" height="' + size + '" fill="#1f2937"/>';
                    }
                }
            }
            svg += '</svg>';
            $dispatch('show-qr', { svg: svg, linkType: '${linkType}', url: '${url.replace(/'/g, "\\'")}' });
        `;
    };

    return (
        <div x-data="{ copied: null, showQrModal: false, qrSvg: '', qrLinkType: '', qrUrl: '' }" x-on:show-qr.window="showQrModal = true; qrSvg = $event.detail.svg; qrLinkType = $event.detail.linkType; qrUrl = $event.detail.url" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 transition-all duration-300 hover:shadow-md">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <span class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <i class="fas fa-link text-sm"></i>
                </span>
                {t('subscriptionLinks')}
            </h2>

            <div class="space-y-4">
                {/* Xray Link */}
                <div class="relative group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('xrayLink')}
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            readonly
                            value={links.xray}
                            class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        />
                        <button
                            type="button"
                            x-on:click={generateQrCode(links.xray, 'Xray')}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                            title="QR Code"
                        >
                            <i class="fas fa-qrcode"></i>
                        </button>
                        <button
                            type="button"
                            x-on:click={`$clipboard('${links.xray}'); copied = 'xray'; setTimeout(() => copied = null, 2000)`}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                            x-bind:class="{'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': copied === 'xray'}"
                        >
                            <i class="fas" x-bind:class="copied === 'xray' ? 'fa-check' : 'fa-copy'"></i>
                        </button>
                    </div>
                </div>

                {/* SingBox Link */}
                <div class="relative group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('singboxLink')}
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            readonly
                            value={links.singbox}
                            class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        />
                        <button
                            type="button"
                            x-on:click={generateQrCode(links.singbox, 'Sing-Box')}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                            title="QR Code"
                        >
                            <i class="fas fa-qrcode"></i>
                        </button>
                        <button
                            type="button"
                            x-on:click={`$clipboard('${links.singbox}'); copied = 'singbox'; setTimeout(() => copied = null, 2000)`}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                            x-bind:class="{'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': copied === 'singbox'}"
                        >
                            <i class="fas" x-bind:class="copied === 'singbox' ? 'fa-check' : 'fa-copy'"></i>
                        </button>
                    </div>
                </div>

                {/* Clash Link */}
                <div class="relative group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('clashLink')}
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            readonly
                            value={links.clash}
                            class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        />
                        <button
                            type="button"
                            x-on:click={generateQrCode(links.clash, 'Clash')}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                            title="QR Code"
                        >
                            <i class="fas fa-qrcode"></i>
                        </button>
                        <button
                            type="button"
                            x-on:click={`$clipboard('${links.clash}'); copied = 'clash'; setTimeout(() => copied = null, 2000)`}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                            x-bind:class="{'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': copied === 'clash'}"
                        >
                            <i class="fas" x-bind:class="copied === 'clash' ? 'fa-check' : 'fa-copy'"></i>
                        </button>
                    </div>
                </div>

                {/* Surge Link */}
                <div class="relative group">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('surgeLink')}
                    </label>
                    <div class="flex gap-2">
                        <input
                            type="text"
                            readonly
                            value={links.surge}
                            class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        />
                        <button
                            type="button"
                            x-on:click={generateQrCode(links.surge, 'Surge')}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                            title="QR Code"
                        >
                            <i class="fas fa-qrcode"></i>
                        </button>
                        <button
                            type="button"
                            x-on:click={`$clipboard('${links.surge}'); copied = 'surge'; setTimeout(() => copied = null, 2000)`}
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                            x-bind:class="{'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': copied === 'surge'}"
                        >
                            <i class="fas" x-bind:class="copied === 'surge' ? 'fa-check' : 'fa-copy'"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* QR Code Modal */}
            <div x-show="showQrModal" x-cloak
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0">
                {/* Backdrop */}
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" x-on:click="showQrModal = false"></div>
                {/* Modal Content */}
                <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
                    x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 scale-95"
                    x-transition:enter-end="opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100 scale-100"
                    x-transition:leave-end="opacity-0 scale-95">
                    {/* Header */}
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            <span x-text="qrLinkType"></span> QR Code
                        </h3>
                        <button x-on:click="showQrModal = false" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    {/* QR Code */}
                    <div class="flex flex-col items-center">
                        <div class="p-4 bg-white rounded-xl shadow-inner" x-html="qrSvg"></div>
                        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center break-all" x-text="qrUrl"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
