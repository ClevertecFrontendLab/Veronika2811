module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [require.resolve('arui-presets-lint/eslint')],
    ignorePatterns: ['dist', 'coverage', '*.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.eslint.json', './cypress/tsconfig.json'],
    },
    plugins: ['react-refresh', 'simple-import-sort'],
    overrides: [
        {
            files: ['cypress/**/*.ts'],
            rules: {
                'cypress/no-unnecessary-waiting': 'off',
            },
        },
        {
            files: ['src/redux/**/*.ts'],
            rules: {
                'no-param-reassign': 'off',
                'no-return-assign': 'off',
                'import/no-default-export': 'off',
            },
        },
    ],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-explicit-any': 'error',
        'no-console': ['warn', { allow: ['error'] }],
        // 'simple-import-sort/imports': [
        //     2,
        //     {
        //         groups: [
        //             [
        //                 '^react',
        //                 '^react-router',
        //                 '^redux',
        //                 '^@reduxjs/toolkit',
        //                 '^redux-first-history',
        //                 '^history',
        //                 '^classnames',
        //                 '^moment',
        //                 '^lottie-react',
        //                 '^antd',
        //                 '^@ant-design/icons',
        //             ],
        //             ['^@pages', '^@layouts', '^@components'],
        //             ['^@redux', '^@hooks', '^@routes', '^@/types', '^@constants'],
        //             ['^\\.'],
        //             ['^.*\\.(css|scss|less)$'],
        //         ],
        //     },
        // ],
        'import/no-absolute-path': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['cypress/**/*.ts', '/*.test.{ts,tsx,js,jsx}'],
            },
        ],
    },
};
