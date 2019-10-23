import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


const BottomNav = (props) => {

const [isCollapsed, setCollapsed] = useState(true);
const collapse=()=>{setCollapsed(!isCollapsed)};


    if(props.searchList.length!=0)
    return (
        <View style={styles.bottomPanel} ><ScrollView>
            {props.searchList.map((element, index) => {
                if (index == props.sPin) {
                    return (<TouchableOpacity key={index} onPress={()=>{props.onSelect(index)}}>

                        <View key={index} style={{ flexDirection: "row", backgroundColor: "#f5f5f5" ,borderRadius:20 }} >
                            <View style={{ flex: 1, padding: 15 }} >
                                <Image style={{ borderRadius:10,width: 50, height: 50 }} source={{ uri: element.image_url }} />
                            </View>
                            <View style={{ flex: 2, justifyContent: "center" }} >
                                <Text >{element.name}</Text>
                                <Text style={{color:"#a1a1a1"}}>{element.location.address1}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" ,flexDirection:"column",alignItems:"center" }} >
                            <Text >Rating </Text><Text >{element.rating} </Text>
                                     
                                 </View>
                        </View></TouchableOpacity>
                    );
                } else
                    return (
                        <TouchableOpacity key={index} onPress={()=>{props.onSelect(index)}}>
                        <View  style={{ flexDirection: "row" }} >
                                 <View style={{ flex: 1, padding: 15 }} >
                                     <Image style={{ borderRadius:10,width: 50, height: 50 }} source={{ uri: element.image_url }} />
                                 </View>
                                 <View style={{ flex: 2, justifyContent: "center" }} >
                                     <Text >{element.name}</Text>
                                     <Text style={{color:"#a1a1a1"}}>{element.location.address1}</Text>
                                 </View>
                                 <View style={{ flex: 1, justifyContent: "center" ,flexDirection:"column" ,alignItems:"center"}} >
                                 <Text >Rating </Text><Text >{element.rating} </Text>
                                 </View>
                         </View>
                        
                         </TouchableOpacity>
                    );
            })}</ScrollView>
        </View>
    );
    else 
    return(
        <View style={styles.collapsedbottomPanel} >
             <Text style={{color: "#d4d4d4"}}>No Search Result</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    bottomPanel: {
        position: "absolute",
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        left: 0,
        right: 0,
        height: 250,
        backgroundColor: "white"
    },
    collapsedbottomPanel: {
        position: "absolute",
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems:"center"
    }
});
export default BottomNav;