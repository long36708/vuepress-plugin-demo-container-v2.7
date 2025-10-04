const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    base: isProd ? '/vuepress-plugin-demo-container-v2/' : '/',
    port: '6700',
    dest: 'docs/.vuepress/dist/vuepress-plugin-demo-container-v2/',
    markdown: {
        lineNumbers: false
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Demo Container V2',
            description: '用于编写 vue 组件示例的 vuepress 插件'
        },
        '/en/': {
            lang: 'en-US',
            title: 'Demo Container V2',
            description: 'plugin for vuepress to display vue demo'
        }
    },
    themeConfig: {
        repo: 'waycowei/vuepress-plugin-demo-container-v2',
        editLinks: false,
        docsDir: 'docs',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                sidebar: {
                    '/': genSidebarConfig('指南')
                }

            },
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                sidebar: {
                    '/en/': genSidebarConfig('Guide')
                }
            },
        }
    },
    plugins: [
        [
            require('../../src'),
            {
                component: 'DemoBlock',
                locales: [
                    {
                        "lang": "zh-CN",
                        "demo-block": {
                            "hide-text": "隐藏",
                            "show-text": "显示",
                            "copy-text": "复制",
                            "copy-success": "成功"
                        }
                    },
                    {
                        "lang": "en-US",
                        "demo-block": {
                            "hide-text": "Hide",
                            "show-text": "Expand",
                            "copy-text": "Copy",
                            "copy-success": "Successful"
                        }
                    }
                ]
            }
        ]
    ],
    configureWebpack: {
        // 关闭生产构建时的代码压缩与混淆，以便调试输出可读的 JS（optimization.minimize = false）
        optimization: {
            minimize: false
        },
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, './public/assets')
            }
        }
    }
}

function genSidebarConfig(title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'started',
                'options',
                'complex',
                'test-script-setup',
                'test-script-setup-advanced',
                'architecture'
            ]
        }
    ]
}