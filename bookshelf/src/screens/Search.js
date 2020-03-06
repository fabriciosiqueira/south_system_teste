import React from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {Header, Item, Icon, Input, ListItem, List, Button} from 'native-base';
import Loader from '../components/Loader';
import DetalheBody from '../components/DetalheBody';
import axios from 'axios';

const fundoImg = require('../assets/icons/bg.png');
const apiKey = 'AIzaSyCAizY7B0LyyWAmvxFgNkzxS0pz_bUSh4g';
let favorite = [];

class Search extends React.Component{
    
    state = {
        bookSearch:"",
        bookList: false,
        bookDetail: false,
        backList:false,
        load: false,
        favoriteBtn:false,
        favoriteResult:[],
        bookResult:[],
        detail:[],
    }

    searchBook = () =>{
        //pesquisa pela barra de pesquisas
        this.setState({load:true});
        let self = this;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.bookSearch.toLowerCase()}&key=${apiKey}&maxResults=40`)
        .then(data =>{
            console.log("MINHA PESQUISA DE LIVROS ABAIXO:");
            self.setState({bookResult: data.data.items});
            self.setState({load:false, bookList:true, backList:false, bookDetail:false});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    addFavorite = (book) => {
        favorite.push(book);
        
        this.setState({favoriteResult:favorite, load:false, bookList:true, bookDetail:false, backList:false, favoriteBtn:false,})

        console.log("ADICIONADO AOS FAVORITOS:")
        
        alert(
            `Você adicionou com sucesso o livro: ${book.volumeInfo.title}`,
            [
                {
                    text: 'OK'
           
                },
            ],
            {cancelable: false},
        )
        ;
    }

    favoriteList = () =>{
       
       this.setState({favoriteResult:favorite});
       this.setState({load:false, bookList:false, bookDetail:false, backList:true, favoriteBtn:true});
    }

    
    bookLista = (book) => {
        this.setState({load:true, bookList:false});
        let self = this;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
        .then(data =>{
            console.log("DETALHE DO LIVRO ABAIXO:");
            self.setState({detail: data.data.items});
            self.setState({load:false, bookList:false, bookDetail:true, backList:true, favoriteBtn:true});
        })
        .catch(function(error){
            console.log(error);
        })    
    }

    voltar = () => {
        this.setState({load:false, bookList:true, backlist: true, bookDetail:false, favoriteBtn:false});
        
    }

    
    renderBody = () => {
        //lista de livros
        

        if(this.state.load) {
            return(
                <Loader />
            )

        } else if (this.state.bookList){
            let book = this.state.bookResult;
            
            return (
                <View style={{flex:1}}>
                   <View style={styles.info} >
                        <List
                            dataArray={book}
                            keyExtractor={item => item.id}
                            renderRow={(item)=>
                                
                                <ListItem  onPress={()=>this.bookLista(item.id)}>
                                    <View style={styles.descricaoDA} >
                                        <Image 
                                            source={{uri:`http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}}
                                            style={styles.img}
                                        />
                                    </View>
                                    <View style={{width:'70%',}}>
                                        <Text style={styles.titleList}>{item.volumeInfo.title}</Text> 
                                    </View>
                                    <View>
                                        <Icon type="FontAwesome" name="star" onPress={()=>this.addFavorite(item)} style={{fontSize: 40, color: '#FFF'}}/>
                                    </View>
                                </ListItem> 
                            }
                        >

                        </List>
                    </View>
                </View>   
            )

        } else if (this.state.bookDetail){
          
            return (
                <View style={{flex:1}}>
                    <DetalheBody data={this.state.detail} />
                </View>
            )

        } else if (this.state.favoriteBtn) {
            let book = this.state.favoriteResult;
            console.log("LISTA FAVORITOS");
            return (

                <View style={{flex:1}}>
                    <View style={styles.info} >
                        <Text style={styles.header}>FAVORITOS</Text>
                        <List
                            dataArray={book}
                            keyExtractor={item => item.id}
                            renderRow={(item)=>
                                
                                <ListItem  onPress={()=>this.bookLista(item.id)}>
                                    <View style={styles.descricaoDA} >
                                        <Image 
                                            source={{uri:`http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}}
                                            style={styles.img}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.heroName}>{item.volumeInfo.title}</Text> 
                                    </View>
                                </ListItem> 
                            }
                        >

                        </List>
                    </View>
                </View> 
            )
        }
    }
   

    render(){
        return(
            <View  style={styles.container} >
                <Header
                    searchBar
                    rounded
                    style={{backgroundColor:'#2b3767'}}
                >
                    <Item>
                        <Icon name="ios-search" onPress={this.searchBook} />
                        <Input
                            value={this.state.heroSearch}
                            placeholder="Pesquisar Livros"
                            onChangeText={(bookSearch)=>this.setState({bookSearch})}
                        />
                        {this.state.backList?
                            <Button
                                block={true}
                                style={styles.headerNavigatorBtn}
                                transparent
                                onPress={()=> this.setState(this.voltar) }
                            >
                                <Text style={styles.headerNavigator}>LISTA DE LIVROS</Text>
                            </Button>
                        :null}
                        
                    </Item>
                </Header>
                <ImageBackground style={styles.bgImage} source={fundoImg}>

                    {this.renderBody()}

                    {this.state.favoriteBtn == false?
                        <TouchableOpacity
                        style={styles.favoriteBtn}
                        onPress={this.favoriteList}
                        >
                        <Icon type="FontAwesome" name="star" style={{fontSize: 30, color: '#2b3767'}}/>
                        </TouchableOpacity>  
                    :
                        null
                    }
                       
                </ImageBackground>
            </View>
        )
    }
}

const styles = {
    headerNavigator:{
        color:'#2b3767',
        fontWeight:'bold',
        textAlign: 'center',
        borderWidth:1,
        borderColor:"#FFF",
        borderRadius:5,
        margin:10,
        padding:5
    },

    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? 24 : 0 
    },
    
    bgImage: {
        flex:1,
        width: null,
        height: null,
    },

    titleDA:{
        fontWeight:'bold', 
        color: '#294295',
        textAlign:'center',
        alignSelf:'center',       
    },

    img:{
        height: 60,
        width: 60,
        borderRadius:100
    },

    heroName:{
        fontWeight:'bold',
        color:"#FFF",
        padding:5,
        fontSize:20,
        marginLeft: 10
    },

    titleList: {
        fontWeight:'bold',
        color:"#FFF",
        padding:5,
        fontSize:15,
        marginLeft: 10 
    },

    detalhes:{
        color:"#FFF",
        padding:5,
        fontSize:15,
        marginLeft: 10

    },

    info: {
        flex:1,
        backgroundColor: '#294295',
        opacity:0.8,
      
    },

    favoriteBtn: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        position: 'absolute',                                          
        bottom: 50,                                                    
        right: 50,
        height:50,
        backgroundColor:'rgba(252,252,252,0.6)',
        borderRadius:100,
    },

    header:{
        fontSize:20,
        color:'#FFF',
        fontWeight:'bold',
        textAlign: 'center',
    },
 
   
}


export default  Search;

















