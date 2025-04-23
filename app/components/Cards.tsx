import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

export enum CardSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface CardProps {
  imageUrl: string;
  text: string;
  link: string;
  size?: CardSize;
}

const Cards: React.FC<CardProps> = ({
  size = CardSize.MEDIUM,
  imageUrl,
  text,
  link,
}) => {
  const router = useRouter();

  const getSizeStyle = () => {
    switch (size) {
      case CardSize.SMALL:
        return styles.small;
      case CardSize.MEDIUM:
        return styles.medium;
      case CardSize.LARGE:
        return styles.large;
      default:
        return styles.medium;
    }
  };

  return (
    <TouchableOpacity onPress={() => router.push(link)} activeOpacity={0.8}>
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        imageStyle={getSizeStyle()}
        style={[styles.cardContainer, getSizeStyle()]}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  small: {
    width: 334,
    height: 79,
    borderRadius: 14,
  },
  medium: {
    width: 396,
    height: 202,
    borderRadius: 24,
  },
  large: {
    width: 500,
    height: 300,
    borderRadius: 30,
  },
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(75,75,75,0.4)',
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Archivo-Bold',
    textAlign: 'left',
  },
});

export default Cards;
