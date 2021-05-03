const path = require('path')
module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    verbose: true,
    transform: {
        "^.+\\.vue$": "vue-jest"
    },
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@\/(.*?\.?(js|vue)?|)$': '<rootDir>/src/$1',   // @路径转换，例如：@/components/Main.vue -> rootDir/src/components/Main.vue
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stu', // 模拟加载静态文件
    },
    testMatch: [ //匹配测试用例的文件
        '<rootDir>/test/unit/specs/*.spec.js'
    ],
    // setupFiles: ['<rootDir>/test/setup'],
    snapshotSerializers: ['jest-serializer-vue'],
    coverageDirectory: '<rootDir>/test/unit/coverage', // 覆盖率报告的目录
    collectCoverageFrom: [ // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件
        // 'src/components/**/*.(js|vue)',
        'src/powerfulTable/*.(vue)',
        '!src/main.js',
        '!src/router/index.js',
        '!**/node_modules/**'
    ],
    testURL: "http://localhost/"
}
