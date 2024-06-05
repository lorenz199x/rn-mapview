import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
const HomePage = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/mapScreen')} style={styles.buttonStyle}>
        <Text style={{ color: 'white' }}>Open Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    borderRadius: 50,
    height: 50,
    backgroundColor: 'violet',
  },
});
