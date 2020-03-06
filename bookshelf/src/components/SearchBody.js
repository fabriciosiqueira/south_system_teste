import React from 'react';
import {Text, Image, View, ImageBackground, Dimensions} from 'react-native';
import {ListItem, List, Button} from 'native-base';
import axios from 'axios';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fundoImg = require('../assets/icons/bg.png');

class SearchBody extends React.Component{

    

    bookLista = (book) => {
        
        let self = this;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
        .then(data =>{
            console.log("DETALHE DO LIVRO ABAIXO:");
            //console.log(data.data.items);
            self.setState({detail: data.data.items});
            console.log(this.state.detail);
            self.setState({bookDetail:true});
            
        })
        .catch(function(error){
            console.log(error);
        })    
    }


    render(){

        
        const book = this.props.data;
        

    
        if(!book){
            return <ImageBackground
                        style={styles.backgroundIamge}
                        source={fundoImg}
                    >
                    <View></View>
                    </ImageBackground>
        }
        return(
            
            <ImageBackground
                style={styles.backgroundIamge}
                source={fundoImg}
            >
                    
                
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
    
    backgroundIamge:{
        flex:1,
        resizeMode: 'cover',
        height:height,
        width:width,
    },
  
    img:{
        height: 60,
        width: 60,
        borderRadius:100
    },

    info: {
        flex:1,
        backgroundColor: '#294295',
        opacity:0.8,
      
    },
    heroName:{
        fontWeight:'bold',
        color:"#FFF",
        padding:5,
        fontSize:20,
        marginLeft: 10
    },
    detalhes:{
        color:"#FFF",
        padding:5,
        fontSize:15,
        marginLeft: 10

    },


  
    

}

export default SearchBody;