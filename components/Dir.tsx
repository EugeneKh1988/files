import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {useAppSelector} from './slices/hooks';
import {selectDir} from './slices/currentDirSlice';
import FileItem from './FileItem';

const Dir: React.FC = () => {
  // get current path
  const path = useAppSelector(selectDir);
  // dirs and files of current dir
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  // id of selected file
  const [selectedId, setSelectedId] = useState('');
  // get colors of current theme
  const {colors} = useTheme();

  // get dirs and path of current dir
  const getDirContent = async () => {
    if (!path) {
      return;
    }
    let filesArr: RNFS.ReadDirItem[] = [];
    try {
      filesArr = await RNFS.readDir(path);
    } catch (error) {
      console.log(error);
      filesArr = [];
    }
    setFiles(filesArr);
  };

  // get dirs and files after path updated
  useEffect(() => {
    getDirContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const RenderItem: React.FC<{item: RNFS.ReadDirItem}> = ({item}) => {
    const color = item.name === selectedId ? colors.primary : colors.text;
    const backgroundColor =
      item.name === selectedId ? colors.surface : colors.onSurface;
    return (
      <FileItem
        fileData={item}
        onPress={() => setSelectedId(item.name)}
        backgroundColor={{backgroundColor}}
        color={{color}}
      />
    );
  };

  return (
    <View>
      <Text>Current dir: {path}</Text>
      <Text>{RNFS.DownloadDirectoryPath}</Text>
      <Text>{RNFS.DocumentDirectoryPath}</Text>
      <Text>{RNFS.ExternalStorageDirectoryPath}</Text>
      <FlatList
        data={files}
        renderItem={RenderItem}
        keyExtractor={item => item.name}>
        extraData={selectedId}
      </FlatList>
    </View>
  );
};

export default Dir;
