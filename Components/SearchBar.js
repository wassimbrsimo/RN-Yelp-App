import React, { useState } from 'react';

import { Text, View, TextInput, StyleSheet,TouchableOpacity,Keyboard } from 'react-native';


const SearchBar = props => {

    
    
    const getSuggestions = (enteredText) => {
       
        props.onTyping(enteredText);
    };
    const Search=(actualS)=>{
        props.onSubmit(actualS);
    }


    return (
        <View style={styles.root}>

            <TextInput  style={styles.searchBar}
                placeholder="Search a business..."
                onChangeText={getSuggestions} onSubmitEditing={Search} />

            <View  style={styles.suggestionPanel} >
                
                {props.suggestionList.map((item,index) =><TouchableOpacity key={index} onPress={()=>{Search(item.text); Keyboard.dismiss()}}>
                             <Text key={index} style={{padding:10}}> {item.text}</Text></TouchableOpacity>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
    },
    searchBar: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 0.25, paddingHorizontal: 17,
        paddingVertical: 10, justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: 25,
        zIndex: 100,
        marginHorizontal: 30,
    },
    suggestionPanel:{
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        marginHorizontal: 50,
        opacity:0.8,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
        
    }

});
export default SearchBar;