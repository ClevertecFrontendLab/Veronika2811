module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'stylelint.config.cjs', 'coverage', 'cypress'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-explicit-any': 'error',
        'no-console': ['warn', { allow: ['error'] }],
        'simple-import-sort/imports': [
            2,
            {
                groups: [
                    [
                        '^react',
                        '^react-router',
                        '^redux',
                        '^@reduxjs/toolkit',
                        '^redux-first-history',
                        '^history',
                        '^classnames',
                        '^lottie-react',
                        '^antd',
                        '^@ant-design/icons',
                    ],
                    ['^@pages', '^@layouts', '^@components'],
                    ['^\\.'],
                    ['^@redux', '^@hooks', '^@routes', '^@/types', '^@constants'],
                    ['^.*\\.(css|scss)$'],
                ],
            },
        ],
    },
};
