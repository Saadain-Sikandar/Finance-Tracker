import React, { useState, useEffect } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  User,
} from 'lucide-react-native';
const PROFILE_IMAGE_KEY = 'profileImagePath';
export const EditProfile = ({navigation}) => {
  const [savedImage, setSavedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    LoadprofileImage();
  }, []);

  const LoadprofileImage = async () => {
    try {
      const imagePath = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      setSavedImage(imagePath);
    } catch (error) {
      console.log('Could not load profile image:', error);
    }
  };
  const chooseImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert(
          'Image Error',
          result.errorMessage || 'Could not select image.',
        );
      }
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setSelectedImage(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open the image gallery.');
    }
  };
//   saving 
  const saveProfile = async () => {
    if (!selectedImage) {
      Alert.alert('Choose a photo', 'Please select a profile picture first.');
      return;
    }

    setSaving(true);

    try {
      const sourcePath = decodeURIComponent(
        selectedImage.replace(/^file:\/\//, '').split('?')[0],
      );

      const extension = sourcePath.match(/\.([a-zA-Z0-9]+)$/)?.[1] || 'jpg';

      // Use a unique filename so an existing picture is not overwritten
      const destinationPath = `${
        RNFS.DocumentDirectoryPath
      }/profile-image-${Date.now()}.${extension}`;

      await RNFS.copyFile(sourcePath, destinationPath);

      const permanentUri = `file://${destinationPath}`;

      // Save the permanent path locally
      await AsyncStorage.setItem(PROFILE_IMAGE_KEY, permanentUri);

      setSavedImage(permanentUri);
      setSelectedImage(null);

      Toast.show({
        type:'success',
        text1:"Profile picture added"
      })
      navigation.goBack();
      
    } catch (error) {
      console.log('Profile image save error:', error);

      Alert.alert(
        'Save Failed',
        'Your picture could not be saved. Please try another photo.',
      );
    } finally {
      setSaving(false);
    }
  };

  const previewImage = selectedImage || savedImage;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={chooseImage}
          activeOpacity={0.8}
        >
          {previewImage ? (
            <Image
              source={{ uri: previewImage }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User size={60} color="#94A3B8" />
            </View>
          )}

          <View style={styles.cameraButton}>
            <Camera size={18} color="#020617" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Profile Picture</Text>

        <Text style={styles.description}>
          Choose a photo from your gallery.
          Your saved picture will remain after you reopen the app.
        </Text>

        <TouchableOpacity 
          style={styles.chooseButton}
          onPress={chooseImage}
          activeOpacity={0.8}
        >
          <ImageIcon size={19} color="#10D6A0" />
          <Text style={styles.chooseButtonText}>
            {selectedImage ? 'Choose Another Photo' : 'Choose Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.disabledButton]}
          onPress={saveProfile}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#020617" />
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 45,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 22,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#10D6A0',
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    right: 3,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10D6A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },
  description: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 30,
  },
  chooseButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
  },
  chooseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#10D6A0',
  },
  saveButtonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
