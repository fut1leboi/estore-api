import * as React from 'react';
import {YMaps, Map} from "react-yandex-maps";


export default function MyMap(): JSX.Element{

    const [zoom, setZoom] = React.useState<number>(9);

    const mapState = React.useMemo(
        () => ({ center: [55.75, 37.57], zoom}),
        [zoom]
    );

      return (
        <div style={{ width: '100%' }}>

            <YMaps query={{apikey: '121c95ec-d9ed-43a8-b9ae-a42cd1133ba9'}}>
                <Map width={'100%'} height={600} state={mapState}></Map>
            </YMaps>
        </div>
      );
}
