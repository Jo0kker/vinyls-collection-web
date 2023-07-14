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
        ]
    }
}
