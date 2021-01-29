// Components/FilmItem.js

import React from 'react'
import { StyleSheet ,View,Text} from 'react-native'
import { getImageFromApi } from '../API/TMDBApi';

class FilmItem extends React.Component {
  render() {
      const film=this.props.films;
    return (
      <View style={styles.main_container}>
          <Image 
             style={styles.image}
             source={{uri=getImageFromApi(films.poster_path)}}
          />
          <View style={styles.content_container}>
             <View style={styles.header_container}>
                       <Text style={styles.title_text}>
                           {film.title}
                        </Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
             </View>
             <View style={styles.description_container}>
                     <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
             </View>
             <View style={styles.date_container}>
                 <Text style={styles.date_text}>sorti le {film.release_date} </Text>
             </View>
          </View>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
      height:200,
      flexDirection="row",
  },
  content_container:{
    flexDirection="column",
    flex:1,
    margin:5
  },
  title_text:{
   fontWeight:"bold",
   fontSize:20,
   flex:1,
   flexWrap:'wrap',
   paddingRight:5,
  },
  header_container:{
  flex:3,
  flexDirection="row",
  },
  date_container:{
      flex:1,
    },
  description_container:{
    flex:7
  },
  date_text:{
      textAlign:'right',
      fontSize:14
  },
  vote_text:{
      fontWeight:'bold',
      fontSize:26,
      color:'#666666'
  },
  description_text:{
      fontStyle:'italic',
      color:'#666666'
  },
  image:{
      backgroundColor:"gray",
      margin:5,
      height:180,
      width:120
  }
})
export default FilmItem