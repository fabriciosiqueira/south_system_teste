import React from 'react';
import {View, Image, Text} from 'react-native';

const loader = require('../assets/icons/loading.gif');

class Loader extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
               <Image 
                    source={loader}
                    style={styles.img}
               />
               <Text style={styles.laodingTitle}>Pesquisando...</Text>
            </View>
        )
    }
}

const styles = {
    img: {
        flex:1,
        height:400,
        width:400,
        justifyContent:'center',
        alignItems:'center',
    },
    laodingTitle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        margin:10,
        fontSize:20
    } 
}


export default Loader;