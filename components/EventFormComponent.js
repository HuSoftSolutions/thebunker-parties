import React from 'react';
import formData from '@/components/eventFormConfig.json';
import { useState } from 'react';

function EventForm() {
  const [formValues, setFormValues] = useState({});

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === 'number' && Number(value) < 0) {
      setFormValues({
        ...formValues,
        [name]: 0, // Set value to 0 if it's negative
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled out
    const isFormValid = Object.keys(formData).every((fieldName) => {
      const fieldData = formData[fieldName];
      return fieldData.required ? formValues[fieldName] : true;
    });

    if (isFormValid) {
      console.log('Form submitted', formValues);
      // TODO: Handle form submission
    } else {
      console.log('Form is invalid', formValues);
      // TODO: Handle form errors
    }
  };

  return (
    <>
      <h1 className="mb-4 text-2xl text-primary">Event Booking Form</h1>

      <form
        className="p-6 bg-gray-200 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {Object.keys(formData).map((fieldName) => {
          const fieldData = formData[fieldName];
          const fieldValue = formValues[fieldName] || '';

          return (
            <div className="mb-10" key={fieldName}>
              <label
                htmlFor={fieldName}
                className="block text-black font-bold mb-2"
              >
                {fieldData.label}{' '}
                {fieldData.required && <span className="text-red-600">*</span>}
              </label>
              {fieldData.type === 'select' ? (
                <select
                  id={fieldName}
                  name={fieldName}
                  value={fieldValue}
                  onChange={handleInputChange}
                  className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {fieldData.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : fieldData.type === 'textarea' ? (
                <textarea
                  id={fieldName}
                  name={fieldName}
                  value={fieldValue}
                  onChange={handleInputChange}
                  className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              ) : fieldData.type === 'checkbox' ? (
                <label className="flex items-center">
                  <input
                    id={fieldName}
                    name={fieldName}
                    type="checkbox"
                    checked={fieldValue}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-gray-600"
                  />
                  {/* <span className="ml-2">{fieldData.label}</span> */}
                  <span className="ml-2">Yes</span>
                </label>
              ) : (
                <input
                  id={fieldName}
                  name={fieldName}
                  type={fieldData.type}
                  step={fieldData.step}
                  value={fieldValue}
                  onChange={handleInputChange}
                  className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline    -none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default EventForm;
