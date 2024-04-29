module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        requireConfigFile: false,
        ecmaVersion: 8
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
        'no-unused-vars': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    },
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                '@typescript-eslint/no-inferrable-types': 'off',
                '@typescript-eslint/ban-ts-comment': 'off'
            },
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 2020,
                sourceType: 'module'
            }
        }
    ]
};
