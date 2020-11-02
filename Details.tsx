import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


const Details =({navigation})=> {
    return(
        <View style={{
            flex:1,
            justifyContent: "center",
            alignItems:"center",
        }}> 
            <Text style={{
                fontSize: 16,
                fontFamily: "Montserrat-ExtraBold"
            }}>Details Screen</Text>
            <TouchableOpacity onPress={()=> navigation.goBack() }>
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Details;
