import { Dimensions, Platform, PixelRatio } from "react-native"
const { width, height } = Dimensions.get("window")

// based on iphone X's scale
const wscale = width / 375;
const hscale = height / 812;

export function normalize(size, based = 'width') {
  const newSize = (based === 'height') ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default {
    fontFamily: 'Lato',
    colors: {
        secondary: '#FFF',
        mainText: '#222',
        subText: '#555',
    }
}