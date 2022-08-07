import React from 'react';
import {Appbar} from 'react-native-paper';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';

const NavigationBar: React.FC<NativeStackHeaderProps> = ({
  back,
  navigation,
}) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={'Files'} />
    </Appbar.Header>
  );
};

export default NavigationBar;
