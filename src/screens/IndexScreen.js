import React, {useContext} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext'
import {Feather} from '@expo/vector-icons'
// import { FlatList } from 'react-native-gesture-handler';


const IndexScreen = ({navigation}) => {

  const {state, deleteBlogPost} = useContext(Context)

  return (
    <View style={styles.container}>
      <Text>Index Screen</Text>
      <FlatList
        data={state}
        keyExtractor={(blogPost)=>{
          return blogPost.title
        }}
        renderItem={({item}) => {
          return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Show', {id: item.id})
          }}>
            <View style={styles.row}>
            <Text style={styles.title}>{item.title} - {item.id}</Text>
            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
              <Feather style={styles.icon} name="trash"/>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: <TouchableOpacity onPress={()=>{
      navigation.navigate('Create')
    }}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'

  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});

export default IndexScreen
