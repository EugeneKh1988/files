import React, {useEffect, useState} from 'react';
import {FlatList, View, PermissionsAndroid} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import RNFS, {ReadDirItem} from 'react-native-fs';
import {useAppSelector} from './slices/hooks';
import {selectDir, selectedDirs, selectedFiles} from './slices/currentDirSlice';
import FileItem from './FileItem';

const Dir: React.FC = () => {
  //const dispatch = useAppDispatch();
  // get current path
  const path = useAppSelector(selectDir);
  // dirs and files of current dir
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  // get selected files and directories
  const _selectedFiles = useAppSelector(selectedFiles);
  const _selectedDirs = useAppSelector(selectedDirs);
  // get colors of current theme
  const {colors} = useTheme();

  // return true if file or dir was selected
  const selected: (item: ReadDirItem) => boolean = item => {
    console.log(_selectedFiles);
    console.log(_selectedDirs);
    if (item.isFile()) {
      return _selectedFiles.includes(item.path);
    }
    return _selectedDirs.includes(item.path);
  };
  // get permission for read storage
  const requestStorageReadPermissions: () => void = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read external storage Permission',
          message:
            'Files App needs access to your storage ' +
            'so you can view files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.warn(error);
    }
  };
  // get dirs and path of current dir
  const getDirContent = async () => {
    if (!path) {
      return;
    }
    let filesArr: RNFS.ReadDirItem[] = [];
    try {
      filesArr = await RNFS.readDir(path);
      console.log(filesArr);
    } catch (error) {
      console.log(error);
      console.log('Error reading files');
      filesArr = [];
    }
    setFiles(filesArr);
  };

  // get dirs and files after path updated
  useEffect(() => {
    requestStorageReadPermissions();
    getDirContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const RenderItem: React.FC<{item: RNFS.ReadDirItem}> = ({item}) => {
    const color = selected(item) ? colors.primary : colors.text;
    const backgroundColor = selected(item) ? colors.surface : colors.background;
    return (
      <FileItem
        fileData={item}
        backgroundColor={{backgroundColor}}
        color={{color}}
        isSelect={selected}
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
        extraData={[_selectedDirs, _selectedFiles]}
      </FlatList>
    </View>
  );
};

export default Dir;
