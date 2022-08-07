import React, {useState} from 'react';
import {Image} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppSelector} from './slices/hooks';
import {selectDir} from './slices/currentDirSlice';

interface IFileItem {
  fileName: string;
  size: number;
  isFile: () => boolean;
}

const FileIcon: React.FC<IFileItem> = ({fileName, size, isFile}) => {
  const [imageloaded, setImageLoad] = useState(false);
  // current dir
  const path = useAppSelector(selectDir);
  // return folder icon
  if (!isFile()) {
    return <FontAwesome5Icon name="folder" size={size} solid />;
  }
  // get extension of file
  const dotIndex: number = fileName.lastIndexOf('.');
  let fileExtension: string = '';
  // only if first symbol is not dot
  if (dotIndex > 0) {
    fileExtension = fileName.slice(dotIndex + 1);
  }

  // choose icon and color of icon
  let Icon: React.ReactNode | null = null;
  // extensions
  const extensions = [
    {ext: ['docx', 'doc', 'rtf'], iconType: 'solid', iconName: 'file-word'},
    {ext: ['xlsx', 'xls'], iconType: 'solid', iconName: 'file-excel'},
    {ext: ['pdf'], iconType: 'solid', iconName: 'file-pdf'},
    {ext: ['mp3', 'aac'], iconType: 'solid', iconName: 'file-audio'},
    {ext: ['csv'], iconType: 'solid', iconName: 'file-csv'},
    {ext: ['ppt', 'pptx'], iconType: 'solid', iconName: 'file-powerpoint'},
    {ext: ['mp4', 'mkv', 'avi'], iconType: 'solid', iconName: 'file-video'},
    {ext: ['rar', 'zip', 'tar'], iconType: 'solid', iconName: 'file-zipper'},
    {ext: ['js'], iconType: 'brand', iconName: 'js', color: 'green'},
    {ext: ['php'], iconType: 'brand', iconName: 'php', color: 'blue'},
    {ext: ['css'], iconType: 'brand', iconName: 'css3-alt', color: ''},
    {ext: ['apk'], iconType: 'brand', iconName: 'google-play', color: ''},
    {ext: ['htm', 'html'], iconType: 'brand', iconName: 'html5', color: ''},
    {ext: ['py'], iconType: 'brand', iconName: 'python', color: ''},
    {ext: ['jsx', 'tsx'], iconType: 'brand', iconName: 'react', color: ''},
    {ext: ['scss', 'sass'], iconType: 'brand', iconName: 'sass', color: ''},
    {ext: ['vue'], iconType: 'brand', iconName: 'vuejs', color: ''},
  ];
  extensions.forEach(extItem => {
    if (extItem.ext.includes(fileExtension)) {
      let iconType = {[extItem.iconType]: true};
      Icon = (
        <FontAwesome5Icon
          name={extItem.iconName}
          size={size}
          {...iconType}
          color={extItem.color}
        />
      );
      return;
    }
  });

  // for image
  const imageExt = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'];
  if (imageExt.includes(fileExtension)) {
    if (imageloaded) {
      const imgSource = {uri: `${path}/${fileName}`, width: size, height: size};
      Icon = <Image source={imgSource} onLoad={() => setImageLoad(true)} />;
    } else {
      Icon = <FontAwesome5Icon name="image" size={size} solid />;
    }
  }
  if (!Icon) {
    Icon = <FontAwesome5Icon name="file" size={size} solid />;
  }
  /*   if (officeExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-word" size={size} solid />;
  } else if (xlsExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-excel" size={size} solid />;
  } else if (pdfExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-pdf" size={size} solid />;
  } else if (audioExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-audio" size={size} solid />;
  } else if (fileExtension === 'csv') {
    Icon = <FontAwesome5Icon name="file-csv" size={size} solid />;
  } else if (presentationExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-powerpoint" size={size} solid />;
  } else if (videoExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-video" size={size} solid />;
  } else if (archiveExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="file-zipper" size={size} solid />;
  } else if (fileExtension === 'js') {
    Icon = <FontAwesome5Icon name="js" size={size} brand color={'green'} />;
  } else if (fileExtension === 'php') {
    Icon = <FontAwesome5Icon name="php" size={size} brand />;
  } else if (fileExtension === 'css') {
    Icon = <FontAwesome5Icon name="css3-alt" size={size} brand />;
  } else if (fileExtension === 'apk') {
    Icon = <FontAwesome5Icon name="google-play" size={size} brand />;
  } else if (htmlExt.includes(fileExtension)) {
    Icon = <FontAwesome5Icon name="html5" size={size} brand />;
  } else {
    Icon = <FontAwesome5Icon name="file" size={size} solid />;
  } */
  return Icon;
};

export default FileIcon;
