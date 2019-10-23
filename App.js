import React, { useEffect, useState, Component } from 'react';
import { Text, View, StyleSheet, TextInput, Modal, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchBar from './Components/SearchBar';
import BottomNav from './Components/BottomNav';
import axios from 'axios';

export default function App() {

  const [actualSearch, setSearch] = useState('');
  const [sList, setSuggestionList] = useState([]);
  const [selectedPin, setSelectedPin] = useState(0);
  const [searchPins, setPins] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]
  const [region, setRegion] = useState({
    latitude: 40.730610,
    longitude: -73.935242,
    latitudeDelta: 0.6,
    longitudeDelta: 0.5
  })
  const config = {
    headers: {
      Authorization: 'Bearer Sy04zmXLqrg6lpFPtY_LDvteOTPK8Ri8w6bz1S7E8QAEAwzbT5HsUhDYL3fqxAhiutbXWtETwa0Y4lRX4H8BH4l71zLwvMNcFrQlaNog3EHh0jfJYnrihyARrpWsXXYx',
    }
  };
  const SuggestionManager = (enteredText) => {
    setSearch(enteredText);
    if (actualSearch.length < 2)
      setSuggestionList([]);
    else {

      axios
        .get('https://api.yelp.com/v3/autocomplete?text=' + enteredText + '&location=new%20york', config)
        .then(responseJson => {
          console.log(responseJson)
          setSuggestionList(responseJson.data.terms);

        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getSearchList = (actualS) => {
    setSuggestionList([]);
    console.log("Searching the word " + actualS);
    setLoading(true);
    axios
      .get('https://api.yelp.com/v3/businesses/search?term=' + actualS + '&location=new%20york', config)
      .then(responseJson => {
        setPins(responseJson.data.businesses);
        if (responseJson.data.businesses.length != 0) {
          setSelectedPin(0);
          setRegion({
            latitude: responseJson.data.businesses[0].coordinates.latitude,
            longitude: responseJson.data.businesses[0].coordinates.longitude,
            latitudeDelta: 0.6,
            longitudeDelta: 0.5
          })
          setLoading(false);
        }

      })
      .catch(error => {
        console.log(error);
      });

  }
  const SelectPin = (index) => {
    setSelectedPin(index);
    setRegion({
      latitude: searchPins[index].coordinates.latitude,
      longitude: searchPins[index].coordinates.longitude,
      latitudeDelta: 0.6,
      longitudeDelta: 0.5
    })
  }

  return (

    <View style={styles.container}>
      <Modal
        style={{ flex: 1 }}
        transparent={true}
        animationType={'none'}
        visible={isLoading}>

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            width: 100,
            height: 75,borderRadius:20,
            backgroundColor:'rgba(255, 255, 255, 0.85)',alignItems:"center",justifyContent:"center"
          }}>
            <Text >Loading . . .</Text>
          </View>
        </View>
      </Modal>
      <SearchBar onTyping={SuggestionManager} onSubmit={getSearchList} suggestionList={sList} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={region}
        customMapStyle={mapStyle}
      >
        {searchPins.map((marker, index) => {
          return (
            <Marker key={index} coordinate={marker.coordinates} name={marker.name}>
              <View style={selectedPin != index ? styles.Marker : styles.selectedMarker}><Image style={{flex:1 , width: undefined, height: undefined}} source={{uri:'http://clipartmag.com/images/gps-icon-20.png'}}/></View>
            </Marker>
          );
        })}</MapView>
      <BottomNav searchList={searchPins} onSelect={SelectPin} sPin={selectedPin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white"
  },
  mapStyle: {
    flex: 2
  },
  Marker: {
    width: 15,
    height:15,
    borderRadius:15,
    backgroundColor: "purple",

  }, selectedMarker: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#fcad03"
  },
});

