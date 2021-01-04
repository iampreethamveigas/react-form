import React, { createContext, useContext, useReducer } from 'react';

const DispatchContext = createContext();
const FormContext = createContext();

export const useForm = () => useContext(FormContext);
export const setFormValue = () => useContext(DispatchContext);

const initialState = {};
const rootReducer = (state, action) =>
  //   console.log(state, action)
  ({
    ...state,
    [action.type]: action.value,
  });

function Form({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <FormContext.Provider value={state}>
        {children}
      </FormContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Form;
