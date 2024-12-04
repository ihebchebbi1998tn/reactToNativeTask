import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData } from '../utils/storage';
import { Task } from '../types/Task';
import { TaskList } from '../components/TaskList';
import { ProgressBar } from '../components/ProgressBar';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTasks(); 
    const interval = setInterval(loadTasks, 1000); 
    return () => clearInterval(interval); 
  }, []);

  const loadTasks = async () => {
    const storedTasks = await getData('tasks');
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>👋 Good morning!</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>

      <ProgressBar tasks={tasks} />

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TaskList
        tasks={filteredTasks}
        onTaskPress={(task) => navigation.navigate('TaskDetails', { task })}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e49ee', 
  },
  header: {
    padding: 35,
    backgroundColor: '#7c3aed', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white', 
  },
  date: {
    fontSize: 25,
    color: '#f1e0ac', 
    marginTop: 4,
  },
  searchInput: {
    margin: 16,
    padding: 12,
    backgroundColor: 'white', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5', 
    fontSize: 16,
  },
  floatingButton: {
    backgroundColor: '#fff', 
    position: 'absolute',
    bottom: '1%',  // Vertically center the button
    left: '50%', // Horizontally center the button
    transform: [{ translateX: -40 }, { translateY: -40 }],  // Offset by half the button size
    width: 90,
    height: 90,
    borderRadius: 40,  // Fully rounded button
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: '#9e49ee', 
    fontSize: 30,
    fontWeight: '600',
  },
});
