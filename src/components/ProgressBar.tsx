import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

interface ProgressBarProps {
  tasks: Task[];
}

export function ProgressBar({ tasks }: ProgressBarProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Tasks completed</Text>
        <Text style={styles.statsCount}>
          {completedTasks}/{tasks.length}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#9b59b6', 
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white', 
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsText: {
    color: '#f1e0ac', 
  },
  statsCount: {
    fontWeight: '500',
    color: 'white', 
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e0bbe4', 
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7c3aed', 
  },
});