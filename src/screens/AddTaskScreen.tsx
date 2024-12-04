import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getData, storeData } from '../utils/storage';
import { Task } from '../types/Task';
import Toast from 'react-native-toast-message';

export const category = [
  { id: 1, category: "Home", emoji: "🏠" },
  { id: 2, category: "Work", emoji: "🏢" },
  { id: 3, category: "Personal", emoji: "👤" },
  { id: 4, category: "Health/Fitness", emoji: "💪" },
  { id: 5, category: "Education", emoji: "📚" },
  { id: 6, category: "Gym", emoji: "🏋️" },
];

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false); // New state for time picker
  const isMounted = useRef(true); // Ref to track if component is mounted

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleCreateTask = async () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      categories: selectedCategories,
      completed: false,
      date: date.toISOString(),
      createdAt: new Date().toISOString(),
    };

    const existingTasks = await getData('tasks') || [];
    await storeData('tasks', [...existingTasks, newTask]);

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Task Created!',
      text2: 'Your task has been created successfully.',
      visibilityTime: 3000,
      autoHide: true,
    });

    navigation.goBack();
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (!isMounted.current) return;
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (!isMounted.current) return;
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const handleDatePress = () => {
    if (!showDatePicker && !showTimePicker) {
      setShowDatePicker(true);
    }
  };

  const handleTimePress = () => {
    if (!showDatePicker && !showTimePicker) {
      setShowTimePicker(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={handleDatePress}
        >
          <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={handleTimePress}
        >
          <Text style={styles.datePickerText}>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text style={styles.label}>Categories (max 3)</Text>
        <View style={styles.categories}>
          {category.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.category, selectedCategories.includes(item.category) && styles.categorySelected]}
              onPress={() => toggleCategory(item.category)}
            >
              <Text
                style={[styles.categoryText, selectedCategories.includes(item.category) && styles.categoryTextSelected]}
              >
                {item.emoji} {item.category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !title && styles.buttonDisabled]}
          onPress={handleCreateTask}
          disabled={!title}
        >
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Custom styles for the toast
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e49ee',
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  datePickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  datePickerText: {
    fontSize: 16,
    color: '#374151',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  category: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categorySelected: {
    backgroundColor: '#7c3aed',
  },
  categoryText: {
    color: '#374151',
  },
  categoryTextSelected: {
    color: 'white',
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
