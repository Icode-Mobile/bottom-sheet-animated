import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { ButtonStyled, TextStyled, ViewStyled } from './src/utils/NativeWind';

import { BottomSheet } from './src/components/BottomSheet';

export default function App() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <ViewStyled className='flex-1 bg-zinc-800 pt-20'>
      <ViewStyled className='flex flex-col items-center bg-zinc-800'>
        <StatusBar style='light' backgroundColor='#27272a' translucent />
        <TextStyled className='text-white font-bold text-[16px] w-[80%] text-center'>
          Criando uma Bottom Sheet (modal) do zero!
        </TextStyled>
        <ButtonStyled
          onPress={handleOpenModal}
          activeOpacity={0.7}
          className='w-52 h-10 mt-2 rounded-full border border-zinc-300 flex-col items-center justify-center'
        >
          <TextStyled className='text-zinc-300'>Abrir Modal</TextStyled>
        </ButtonStyled>
      </ViewStyled>
      {open ? <BottomSheet setOpen={setOpen} /> : null}
    </ViewStyled>
  );
}
