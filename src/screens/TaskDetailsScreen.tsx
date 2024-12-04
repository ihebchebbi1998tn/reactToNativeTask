import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message'; 
import { Task } from '../types/Task';
import { formatDate, formatTime } from '../utils/dateUtils';
import { getData, storeData } from '../utils/storage';

export default function TaskDetailsScreen({ route, navigation }) {
  const { task } = route.params;

  const handleToggleComplete = async () => {
    const tasks = await getData('tasks') || [];
    const updatedTasks = tasks.map((t: Task) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    await storeData('tasks', updatedTasks);

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: task.completed ? 'Task Incomplete' : 'Task Completed',
      text2: task.completed ? 'You have marked this task as incomplete.' : 'You have marked this task as complete.',
      visibilityTime: 3000,
      autoHide: true,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{task.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{task.description}</Text>

        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.text}>
          {formatDate(task.date)} at {formatTime(task.date)}
        </Text>

        <Text style={styles.label}>Categories</Text>
        <View style={styles.categories}>
          {task.categories.map((category) => (
            <View key={category} style={styles.category}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Created</Text>
        <Text style={styles.text}>{formatDate(task.createdAt)}</Text>

        <TouchableOpacity
          style={[ 
            styles.button, 
            task.completed ? styles.buttonCompleted : styles.buttonIncomplete,
          ]}
          onPress={handleToggleComplete}
        >
          <Text style={styles.buttonText}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e49ee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24.7,  
  },
  title: {
    fontSize: 36.4, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 26,  
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 22.4, 
    padding: 31.2,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6.2 },  
    shadowOpacity: 0.1,
    shadowRadius: 12.5,  
    elevation: 7.8,  
    width: '100%',
    maxWidth: 592.8,  
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 32.4, 
    fontWeight: 'bold',
    color: '#4b5563',
    marginBottom: 15.6,  
    textAlign: 'center',
  },
  label: {
    fontSize: 24.9, 
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 15.6,  
    textAlign: 'center',
  },
  text: {
    fontSize: 24.9, 
    color: '#374151',
    marginBottom: 15.6,  
    textAlign: 'center',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15.6,  
  },
  category: {
    backgroundColor: '#d4d4d8',
    paddingVertical: 12.5,  
    paddingHorizontal: 18.7,  
    borderRadius: 22.4,  
    marginRight: 15.6,  
    marginBottom: 12.5,  
  },
  categoryText: {
    color: '#4b5563',
    fontSize: 21.9,  
  },
  button: {
    paddingVertical: 18.7,  
    borderRadius: 12.5,  
    alignItems: 'center',
    marginTop: 37.4,  
    width: '60%',
  },
  buttonIncomplete: {
    backgroundColor: '#7c3aed',
  },
  buttonCompleted: {
    backgroundColor: '#22c55e',
  },
  buttonText: {
    color: 'white',
    fontSize: 24.9,  
    fontWeight: '600',
  },
});