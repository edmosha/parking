'use client'
import { YMaps } from '@pbe/react-yandex-maps';
import YMap from '@/app/YMap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de';
import { ruRU } from '@mui/x-date-pickers/locales';
import React from 'react';
import PopupWrapper from '@/components/PopupWrapper/PopupWrapper';

export default function Home() {
  const clusterPoints = [
    {'coordinates': [55.831903, 37.411961]},
    {'coordinates': [55.763338, 37.565466]},
    {'coordinates': [55.763338, 37.565466]},
    {'coordinates': [55.744522, 37.616378]},
    {'coordinates': [55.780898, 37.642889]},
    {'coordinates': [55.793559, 37.435983]},
  ]

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="de"
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <main className="flex min-h-screen flex-col items-center justify-between">
        <YMaps query={{load: 'package.full', apikey: '6b0b6636-4794-450f-aa97-316ecadb48d3'}}>
          <YMap/>
        </YMaps>
      </main>
    </LocalizationProvider>
  )
}
