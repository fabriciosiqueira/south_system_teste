import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button} from 'native-base';


const myBackground = require('../../assets/icons/landing.png');




const Page = (props) => {
    console.log("StarterIntro");

    const start = () => {
        props.navigation.navigate('Search');
    }

   
    return(
        <View style={styles.container}>
            <ImageBackground source={myBackground} style={styles.bgImage}>
                <View style={styles.viewStyle}>
                    <Button
                        block={true}
                        style={styles.buttonStyle}
                        onPress={start}
                    >
                    <Text style={styles.buttonText}>INICIAR</Text>
                    </Button>
                </View>
            </ImageBackground>
        </View>
    );
   
}


Page.navigationOptons = {
    header:null
}

const styles = {
    container: {
        flex: 1, 
    },    
    bgImage: {
        flex:1,
        width: null,
        height: null
    },
    viewStyle:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
       
    },
    titleStyle:{
        fontSize:30,
        color:'#294295',
        alignItems: 'center',
        
    },
    buttonStyle: {
        borderRadius:100,
        width:100,
        height:100,
        alignSelf:'center',
        borderWidth:1,
        borderColor:"#FFF",
        margin:20,
        marginBottom:40,
        backgroundColor:'#2b3767'

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    } 
}



export default Page;





