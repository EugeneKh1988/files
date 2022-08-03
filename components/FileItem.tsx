import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import React from 'react';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IFileItem {
  fileData: RNFS.ReadDirItem;
  onPress: () => void;
  backgroundColor: {backgroundColor: string};
  color: {color: string};
}

const FileItem: React.FC<IFileItem> = ({
  fileData,
  onPress,
  backgroundColor,
  color,
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        backgroundColor,
        styles.container,
        styles.fileItem,
        styles.spaceBeetwen,
      ]}>
      <View style={[styles.container]}>
        <View>
          <Icon name={'folder'} solid size={30} />
        </View>
        <View style={[styles.nameContainer]}>
          <Text style={[color]}>{fileData.name}</Text>
        </View>
      </View>
      <View style={styles.checkView}>
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
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
