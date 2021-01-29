
import React, { Component } from 'react';
import { View,  TextInput,  Button,StyleSheet,FlatList,Text, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' 
// import { } from ... car c'est un export nommé dans TMDBApi.js
import FilmItem from './FilmItem';


class Search extends Component{
  constructor(props){
   super(props)
   this.page=0//compteur page courant
   this.totalPages=0 //nombre total des page
   this.searchedText=""
   this.state={
     isLoading:false,//par default est false car il n'ya pas chargement tant qu'on ne lance pas la recherche
     films:[]
    }
  }

_loadFilms() {
  if(this.searchedText.length>0){
    this.setState({isLoading:true})//lancement 
    getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
      this.page=data.page
      this.totalPages=data.total_Pages
      this.setState=({
        films:[...this.state.films,...data.results],
        isLoading:false //arrete du chargement
      })
      
 });
  }
 
}
searchedTextInputChanged(text){
  this.searchedText=text //modification texte de recherche  a chaque saisir de texte sans passer par le setState comme avant
}
_displayLoading(){
  if(this.state.isLoading){
    return (<View style={styles.loadingContainer}>
            <ActivityIndicator size="large"/>
          </View>)
  }
}
searchFilms(){
 this.page=0 //mettre la page courante a 0 pour ne pas confondre la recherche et la pagination
 this.totalPages=0
 this.setState({
   films:[]},()=>{ this._loadFilms()
 })
}

  render() {
    
    return (
      <View style={styles.main_container}>
        
          <TextInput
           style={styles.textInput}
            placeholder="Titre du film"
            onChangeText={(text)=>this.searchedTextInputChanged(text)}
            onSubmitEditing={()=>this._searchFilms()}
          />
          <Button
            title="Rechercher"
            onPress={()=>this._searchFilms()}
            
          />
          <FlatList data={this.state.films} keyExtractor={(item)=>item.id.toString()} 
          renderItem={({item}) => <FilmItem films={item}/>}
          onEndReachedThreshold={0.5} 
          onEndReached={()=>{
            if(this.page<this.totalPages){
              this._loadFilms()
            }
          }}
          />
         {this._displayLoading()}
      </View>
      
    );
  }
}
const styles=StyleSheet.create({
  main_container:{
   flex:1,
   marginTop:20
  },
  textInput:{
    marginLeft:5,
    marginRight:5,
    height:5,
    paddingLeft:5,
    borderColor:"#000"

  },
  loadingContainer:{
    position:"absolute",
    alignItems:"center",
    justifyContent:"center",
    left:0,
    top:100,
    bottom:0,
    right:0
  }
});
export default Search;
