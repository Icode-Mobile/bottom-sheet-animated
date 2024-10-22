import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Dimensions } from 'react-native';
import { TextStyled, ViewStyled } from '../../utils/NativeWind';

interface BottomSheetProps {
  setOpen: any;
}

const ViewAnimated = Animated.createAnimatedComponent(ViewStyled);

const { height } = Dimensions.get('window');

export const BottomSheet = ({ setOpen }: BottomSheetProps) => {
  const HEIGHT_MAX = height - 350;
  const HEIGHT_MIN = 160;
  const heightBottomSheet = useSharedValue(HEIGHT_MIN);
  const context = useSharedValue({ y: 0 });

  const slideUp = Gesture.Pan()
    .onStart((event) => {
      if (event.translationY < HEIGHT_MAX) {
        context.value = { y: heightBottomSheet.value };
      }
    })
    .onUpdate((event) => {
      if (event.translationY < HEIGHT_MAX) {
        if (event.translationY < 0) {
          heightBottomSheet.value = Math.max(
            context.value.y + Math.abs(event.translationY),
            0
          );
        } else {
          heightBottomSheet.value = Math.max(
            context.value.y - event.translationY,
            0
          );
        }
      }
    })
    .onEnd(() => {
      if (heightBottomSheet.value > HEIGHT_MAX / 3) {
        heightBottomSheet.value = withSpring(HEIGHT_MAX);
      } else {
        heightBottomSheet.value = withSpring(HEIGHT_MIN);
      }
      if (heightBottomSheet.value < HEIGHT_MIN - 50) {
        runOnJS(setOpen)(false);
      }
    });

  const heightBottomSheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: heightBottomSheet.value,
    };
  });

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <GestureDetector gesture={slideUp}>
        <ViewAnimated
          style={heightBottomSheetAnimatedStyle}
          className={
            'w-full flex flex-col items-center bg-white absolute bottom-0 rounded-t-3xl py-4 px-2'
          }
          entering={SlideInDown.duration(500).easing(Easing.linear)}
          exiting={SlideOutDown.duration(500).easing(Easing.linear)}
        >
          <ViewStyled className='bg-zinc-500 w-10 h-1 rounded-md' />
          <ViewStyled className='mt-4 flex flex-col w-full items-center'>
            <TextStyled className='text-zinc-700 font-bold text-[17px]'>
              BottomSheet
            </TextStyled>
            <TextStyled className='text-zinc-700 text-[14px] mt-2'>
              Sua modal feita do zero 🎉
            </TextStyled>
          </ViewStyled>
        </ViewAnimated>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
