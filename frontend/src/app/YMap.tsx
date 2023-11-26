import React, { useEffect, useMemo, useState } from 'react';
import { Map, Placemark, Clusterer, useYMaps } from '@pbe/react-yandex-maps';
// import './yandex-map-restyle-ballon.scss'
import priceMark from '../assets/icons/price-mark.svg'
import SideBar from '@/components/SideBar/SideBar';

const center = [55.76, 37.64];

const images = [...Array(26)].map((n, i) => {
  const letter = String.fromCharCode(i + 97);
  return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
});

const clusterPoints: Array<{ coordinates: Array<number> }> = [
  {'coordinates': [55.831903, 37.411961]},
  {'coordinates': [55.763338, 37.565466]},
  {'coordinates': [55.744522, 37.616378]},
  {'coordinates': [55.780898, 37.642889]},
  {'coordinates': [55.793559, 37.435983]},
]

const YMap = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [ymaps, setYmaps] = useState(React.useRef(null));

  // useEffect(() => {
  //   fetch('https://localhost:3000/connect').then(res => res.json).then(res => console.log(res))
  // }, []);

  // const ymaps: any = useYMaps(['Map', 'ObjectManager', 'Placemark', 'templateLayoutFactory']);

  // const layout = ymaps.templateLayoutFactory.createClass(
  //   `<div class="pin-container">
  //   <div class="placemark-description">
  //
  //   </div>`,
  //   {
  //     build:
  //       function () {
  //         layout.superclass.build.call(this);
  //         const pinContainer = this.getParentElement().getElementsByClassName(
  //           'pin-container',
  //         )[0];
  //
  //         const backgroundElement = this.getParentElement().getElementsByClassName(
  //           'placemark__background',
  //         )[0];
  //       }
  //   }
  // );

  return (
    <section>
      <Map
        onLoad={ymaps => {
          // @ts-ignore
          setYmaps(ymaps);
          console.log('ymaps', ymaps.geocode);
        }}
        state={{
          center,
          zoom: 9,
          // controls: []
        }}
        width="100vw"
        height="100vh"
        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
      >

        <Clusterer
          options={{
            preset: 'islands#invertedDarkBlueClusterIcons',
            groupByCoordinates: false,
          }}
        >
          {clusterPoints.map((n) => (
            <Placemark
              key={Math.floor(Math.random() * 100)}
              geometry={n.coordinates}
              options={{
                iconLayout: 'default#image',
                iconImageHref: priceMark.src,
                iconImageSize: [50, 20],
                openEmptyBalloon: false,
              }}
              properties={
                {
                  iconContent: 'testtest',
                }}
              onClick={() => {
                setActiveMenu(true);
              }}
            />
          ))}
        </Clusterer>
      </Map>

      {activeMenu && <SideBar onClose={() => setActiveMenu(false)}/>}
    </section>
  );
}

export default YMap;