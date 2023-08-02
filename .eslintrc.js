module.exports = {
    extends: [
        'next/core-web-vitals',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    settings: {
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                moduleDirectory: ['node_modules', './node_modules', './src']
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        }
    },
    rules: {
        'import/no-unused-modules': [0, { unusedExports: true }],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin']
            }
        ],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'no-multi-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'no-useless-escape': 'warn',
        'one-var': [
            'error',
            { 'var': 'always', 'let': 'never', 'const': 'never' }
        ],
        'keyword-spacing': 'error',
        'spaced-comment': 'error',
        'prefer-const': 'error',
        'no-empty': 'off',
        'no-cond-assign': 'error',
        'no-use-before-define': 'warn',
        'no-unused-vars': 'off',
        'semi': ['error', 'always'],
        'no-control-regex': 'off',
        'eqeqeq': 'warn',
        'require-await': 'error',
        'no-unmodified-loop-condition': 'warn',
        'no-undef': 'off',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'react/jsx-filename-extension': ['warn', { 'extensions': ['.tsx'] }],
        'react/no-unescaped-entities': ['warn', { 'forbid': ['>', '"', '}'] }],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'warn',
        'react/jsx-curly-newline': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-curly-brace-presence': ['error', { 'props': 'never' }],
        'react/self-closing-comp': [
            'error',
            { 'component': true, 'html': true }
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error'
    }
};
