import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
    removeStudent(state, action) {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
});

export const { setStudents, addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;
