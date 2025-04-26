module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 1, // Cảnh báo nếu dùng console.log
    'no-lonely-if': 1, // Cảnh báo if đứng 1 mình trong else
    'no-unused-vars': 1, // Cảnh báo biến không sử dụng
    'no-trailing-spaces': 1, // Cảnh báo dấu cách thừa cuối dòng
    'no-multi-spaces': 1, // Cảnh báo nhiều dấu cách liên tiếp
    'no-multiple-empty-lines': 1, // Cảnh báo nhiều dòng trống liên tiếp
    'space-before-blocks': ['error', 'always'], // Bắt buộc cách trước dấu `{`
    'object-curly-spacing': [1, 'always'], // Cách bên trong object {}
    'indent': ['warn', 2], // Cảnh báo nếu indent không phải 2 space
    'semi': [1, 'never'], // Cảnh báo nếu có dấu `;`
    'quotes': ['error', 'single'], // Bắt buộc dùng dấu nháy đơn ''
    'array-bracket-spacing': 1, // Cách bên trong dấu []
    'linebreak-style': 0, // Không kiểm tra xuống dòng (LF/CRLF)
    'no-unexpected-multiline': 'warn', // Cảnh báo lỗi xuống dòng bất ngờ
    'keyword-spacing': 1, // Cảnh báo thiếu cách sau từ khóa (if, else, return,...)
    'comma-dangle': 1, // Cảnh báo lỗi dấu phẩy cuối cùng
    'comma-spacing': 1, // Cảnh báo thiếu cách sau dấu phẩy
    'arrow-spacing': 1 // Cảnh báo thiếu cách xung quanh =>
  }
}