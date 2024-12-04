import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/Task';
import { formatDate, formatTime } from '../utils/dateUtils';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

export function TaskList({ tasks, onTaskPress }: TaskListProps) {
  const renderItem = ({ item: task }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => onTaskPress(task)}
    >
      <View style={styles.taskContent}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>
          {formatDate(task.date)} at {formatTime(task.date)}
        </Text>
        <View style={styles.categories}>
          {task.categories.map((category) => (
            <View key={category} style={styles.category}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.checkbox, task.completed && styles.checkboxChecked]} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#9e49ee', 
  },
  taskItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#7c3aed', 
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white', 
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#f1e0ac', 
    marginBottom: 4,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    backgroundColor: '#9b59b6', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 4,
  },
  categoryText: {
    color: 'white', 
    fontSize: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white', 
    marginLeft: 12,
  },
  checkboxChecked: {
    backgroundColor: 'white', 
  },
});