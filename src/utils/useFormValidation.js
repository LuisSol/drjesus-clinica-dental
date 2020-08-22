import { useState, useEffect } from "react";

const useFormValidation = (
  initialValues,
  validationFunction,
  onValidValues
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (isSubmiting) {
      if (errors.isEmpty()) {
        onValidValues();
      }
      setIsSubmiting(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    setIsSubmiting(true);
    e.preventDefault();
    setErrors(validationFunction(values));
  };
  const handleBlur = () => {
    setErrors(validationFunction(values));
  };
  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    resetValues,
    setValues,
    values,
    errors,
    isSubmiting,
  };
};

export default useFormValidation;
