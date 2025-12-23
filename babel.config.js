module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@domains/about': './src/domains/about',
          '@domains/legal': './src/domains/legal',
          '@domains/appearance': './src/domains/appearance',
          '@domains/feedback': './src/domains/feedback',
          '@domains/faqs': './src/domains/faqs',
          '@domains/rating': './src/domains/rating',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
};