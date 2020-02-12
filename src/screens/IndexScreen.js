import React, {useContext} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import BlogContext from '../context/BlogContext'
// import { FlatList } from 'react-native-gesture-handler';


const IndexScreen = () => {

  const {data, addBlogPost} = useContext(BlogContext)

  return (
    <View style={styles.container}>
      <Button title="Add Post" onPress={addBlogPost}/>
      <Text>Index Screen</Text>
      <FlatList
        data={data}
        keyExtractor={(blogPost)=>{
          return blogPost.title
        }}
        renderItem={({item}) => {
          return <Text>{item.title}</Text>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IndexScreen
