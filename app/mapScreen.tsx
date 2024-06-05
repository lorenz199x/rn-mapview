import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { screenHeight } from '@/utils/sizes';
import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';

const MapScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const initialRegion = {
    latitude: 14.644379580295222,
    longitude: 121.02490102698776,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [region, setRegion] = useState({});
  const [locations, setLocations] = useState<any>([]);
  const [selectedPinName, setSelectedPinName] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = require('../assets/train.json');
        const parsedLocations = data.flatMap((location: any, locationIndex: number) =>
          location.lines.map((line: any, lineIndex: number) => ({
            id: `${line.id}-${locationIndex}-${lineIndex}`, // Ensure unique keys
            coordinate: {
              latitude: line.lat,
              longitude: line.lng,
            },
            name: line.name.en,
          }))
        );
        setLocations(parsedLocations);
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    };
    loadLocations();
  }, []);

  // const onRegionChange = (region: any) => {
  //   setRegion(region);
  // };

  const onMapReady = () => {
    setTimeout(() => {
      bottomSheetRef.current?.openBottomSheet();
    }, 500);
  };

  const handleMarkerPress = (name: string) => {
    setSelectedPinName(name);
    bottomSheetRef.current?.openBottomSheet();
  };

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={onMapReady}
        style={styles.mapViewStyle}
        // region={region}
        // onRegionChange={onRegionChange}
      >
        {locations.map((location: any) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.name}
            onPress={() => handleMarkerPress(location.name)}

          />
        ))}
      </MapView>
      {/* <MapView
        onMapReady={onMapReady}
        style={styles.mapViewStyle}
        // region={region}
        onRegionChange={onRegionChange}
      >
        <Marker coordinate={region} title={'Home Address'} description={'Where I live'} />
      </MapView> */}
      <TouchableOpacity style={styles.backButtonStyle} onPress={router.back}>
        <Text>Back</Text>
      </TouchableOpacity>
      <BottomSheet
        noBackDrop
        disableOnClose
        ref={bottomSheetRef}
        screenSize={screenHeight >= 800 ? 0.2 : 0.3}
        customContainerStyle={styles.bottomSheetStyle}
      >
        <Text>{selectedPinName || 'Select a pin'}</Text>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapViewStyle: {
    flex: 1,
  },
  backButtonStyle: {
    position: 'absolute',
    top: 0,
    marginLeft: 10,
    marginTop: 60,
    width: 90,
    borderWidth: 5,
    borderColor: 'white',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'violet',
  },
  bottomSheetStyle: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
