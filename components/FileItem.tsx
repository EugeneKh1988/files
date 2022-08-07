import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import React from 'react';
import RNFS from 'react-native-fs';
import FileIcon from './FileIcon';
import {useDispatch} from 'react-redux';
import {toggleSelection, setDir} from './slices/currentDirSlice';

interface IFileItem {
  fileData: RNFS.ReadDirItem;
  backgroundColor: {backgroundColor: string};
  color: {color: string};
  isSelect: (item: RNFS.ReadDirItem) => boolean;
}

const FileItem: React.FC<IFileItem> = ({
  fileData,
  backgroundColor,
  color,
  isSelect,
}) => {
  //const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const payload = {
    path: fileData.path,
    isFile: fileData.isFile(),
  };

  const changeDir: () => void = () => {
    if (fileData.isDirectory()) {
      dispatch(setDir(fileData.path));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => changeDir()}
      onLongPress={() => dispatch(toggleSelection(payload))}
      style={[
        backgroundColor,
        styles.container,
        styles.fileItem,
        styles.spaceBeetwen,
      ]}>
      <View style={[styles.container]}>
        <View>
          {/* <Icon name={'folder'} solid size={30} /> */}
          <FileIcon
            fileName={fileData.name}
            size={30}
            isFile={fileData.isFile}
          />
        </View>
        <View style={[styles.nameContainer]}>
          <Text style={[color]}>{fileData.name}</Text>
        </View>
      </View>
      <View style={styles.checkView}>
        <Checkbox.Android
          status={isSelect(fileData) ? 'checked' : 'unchecked'}
          onPress={() => dispatch(toggleSelection(payload))}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileItem: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  nameContainer: {
    paddingLeft: 10,
  },
  spaceBeetwen: {
    justifyContent: 'space-between',
  },
  checkView: {
    alignSelf: 'flex-start',
  },
});
export default FileItem;
