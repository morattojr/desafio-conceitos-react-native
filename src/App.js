import React, { useState, useEffect}from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';


export default function App() {

 const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`);

    if (response.status == 200) {
      const repoIndex = repositories.findIndex((repo) => repo.id === id);
      const newRepo = repositories.filter((rep) => rep.id !== id);
      newRepo.splice(repoIndex, 0, response.data);
      setRepositories(newRepo);
    }

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repositorios</Text>
        </View>
        {/* <View style={styles.repositoryContainer}> */}

            {/* { repositories.map(project => (
              <Text style={styles.tech} key={project.id}>{project.title}</Text>
            ))} */}

             <FlatList 
              style={styles.techsContainer}
              data={repositories}
              keyExtractor={repository => repository.id}
              renderItem={({ item }) => (
                <>
                <View style={styles.repositoryContainer}>
                  <Text style={styles.tech}>{item.title}</Text>
                  <View style={styles.likesContainer}>
                    <Text style={styles.likeText} testID={`repository-likes-${item.id}`}>
                    {item.likes > 1 
                      ? `${item.likes} curtidas`
                      : `${item.likes} curtida`
                    }
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(item.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${item.id}`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>
                </View>
                </>
              )}
            />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  techsContainer: {
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
  },
  tech: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "#04d361",
    color: "#fff",
    padding: 15,

  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
