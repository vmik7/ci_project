module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['airbnb', 'eslint:recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-continue': 'off',
        'operator-linebreak': 'off',
        'no-console': 'off',

        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',

        // Предупреждение no-unused-vars вместо ошибки
        'no-unused-vars': 'warn',

        // Отступ 4
        indent: ['error', 4],

        // Не предлагает константы при деструктуризации
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],

        // Неправильно работает в Windows.
        'linebreak-style': 'off',

        // Несовместимо с prettier
        'arrow-parens': 'off',

        // Несовместимо с prettier
        'object-curly-newline': 'off',

        // Несовместимо с prettier
        'no-mixed-operators': 'off',

        // Это - не наш стиль?
        'arrow-body-style': 'off',

        // Несовместимо с prettier
        'function-paren-newline': 'off',
        'no-plusplus': 'off',

        // Несовместимо с prettier
        'space-before-function-paren': 0,

        // airbnb позволяет некоторые пограничные случаи
        'max-len': ['error', 100, 2, { ignoreUrls: true }],

        // Это - не наш стиль?
        'no-param-reassign': 'off',

        // parseInt, parseFloat и radix выключены. Мне это не нравится.
        radix: 'off',

        'prefer-destructuring': 'off',

        'prettier/prettier': ['error'],
    },
};
