import React from 'react';
import {Text, Image, View, ImageBackground, Dimensions} from 'react-native';
import {ListItem, List, Button} from 'native-base';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fundoImg = require('../assets/icons/bg.png');

class DetalheBody extends React.Component{

    render(){
        const book = this.props.data[0];
        console.log("DETALHES");


        if(!book){
            return (
                <ImageBackground
                    style={styles.backgroundIamge}
                    source={fundoImg}
                >
                    <View></View>
                </ImageBackground>
            )
        }
        return(
            <ImageBackground
                style={styles.backgroundIamge}
                source={fundoImg}
            >
                <View style={{flex:1, padding:10}}>     
                    <Text style={styles.header}>{book.volumeInfo.title.toUpperCase()}</Text>
                    <View style={styles.viewStyles}>
                        <Image 
                            source={{uri:`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE722RR6h2b9YfX_pIgjXZQdx4zUiwzt4sBexFljGh5mg24A_-PmnL_SFhkObAE-C2JuKNua5Z03QCP5cgVlwoUHtmGaakjd2RdIsAPx61ULb6j9ea_NMjEGFYhs0OPezx7J1P_--&source=gbs_api`}}
                            style={styles.img}
                        />
                    </View>
                    <View style={styles.info}>
                        <ListItem itemDivider>
                            <Text style={styles.titleDA}>DESCRIÇÃO</Text>
                        </ListItem>
                        <ListItem style={{flexWrap:'wrap'}}>
                            <Text style={styles.descricaoDA}>Autor - {book.volumeInfo.authors[0]}</Text>
                            <Text style={styles.descricao}>{book.volumeInfo.description}</Text>
                        </ListItem>
                        
                        
                    </View>
                </View>
                   
            </ImageBackground>
        )
    }
}

const styles = {
    headerNavigatorBtn:{
        margin:10,
    },
    header:{
        fontSize:20,
        color:'#FFF',
        fontWeight:'bold',
        textAlign: 'center',
    },
    titleDA:{
        fontWeight:'bold', 
        color: '#294295',
       
    },
    descricaoDA:{
        fontWeight:'bold',
        color:"#294295",
        padding:5
    },
    descricaoCarct:{
        color:"#294295",
        padding:5
    },
    descricao:{
        color:"#294295",
        
    },
    viewStyles:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    img:{
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100
    },
    info: {
        flex:5,
        backgroundColor: '#CCC',
        opacity:0.8,
      
    },
    backgroundIamge:{
        flex:1,
        resizeMode: 'cover',
        height:height,
        width:width,
    },
    buttonStyle: {
        borderRadius:5,
        borderWidth:1,
        borderColor:"#FFF",
        margin:10,
        backgroundColor:'#2b3767'

    },
    viewStyle:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
       
    },
    buttonText: {
        fontWeight:'bold',
        color: 'white',
        textAlign: 'center'
    } 

}

export default DetalheBody;