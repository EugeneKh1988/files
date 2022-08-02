import React from 'react';
import {Text} from 'react-native-paper';
import RNFS from 'react-native-fs';

const Dir: React.FC = () => {
  return (
    <>
      <Text>{RNFS.DownloadDirectoryPath}</Text>
      <Text>{RNFS.DocumentDirectoryPath}</Text>
      <Text>{RNFS.ExternalStorageDirectoryPath}</Text>
    </>
  );
};

export default Dir;
