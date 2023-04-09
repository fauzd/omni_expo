const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const { resolver } = defaultConfig;

const { assetExts } = resolver;

resolver.assetExts = [...assetExts.filter(ext => ext !== 'svg'), 'bin'];
resolver.sourceExts.push('svg');
resolver.extraNodeModules['react-native-svg'] = 'react-native-svg';

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver,
};
