import React from 'react';
import formData from '@/components/eventFormConfig.json';
import { useState } from 'react';
import { sendEmail } from '../firebase';

function EventForm() {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === 'number' && Number(value) <= 0) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled out
    const isFormValid = Object.keys(formData).every((fieldName) => {
      const fieldData = formData[fieldName];
      return fieldData.required ? formValues[fieldName] : true;
    });

    if (isFormValid) {
      setError(null);
      setIsLoading(true);
      try {
        await sendEmail(
          {
            ...formValues,
            template: 'event_template',
            emailTo: ['cody.husek@husoftsolutions.com'],
          },
          { auth: true }
        );

        await sendEmail(
          {
            ...formValues,
            template: 'event_client_template',
            emailTo: [formValues.email],
          },
          { auth: true }
        );
        setIsSubmitted(true);
        console.log('email sent!');
      } catch (error) {
        console.log(JSON.stringify(error));
      }

      setIsLoading(false);

      console.log('Form submission complete');
    } else {
      console.log('Form is invalid!');
      // TODO: Handle form errors
      setError('Please fill out all fields!');
    }
  };

  return (
    <>
      <h1 className="mb-4 text-2xl text-primary">EVENT BOOKING FORM</h1>
      {isSubmitted && !isLoading && (
        <div className="p-4 flex items-center justify-center text-green-500 border border-green-500 bg-green-200 font-bold rounded text-2xl">
          Thank you for submitting!
        </div>
      )}
      {isLoading ? (
        <div className="p-4 flex items-center justify-center text-yellow-500 border border-yellow-500 bg-yellow-200 font-bold rounded text-2xl">
          Submitting...
        </div>
      ) : (
        !isSubmitted && (
          <form className=" bg-white rounded-lg" onSubmit={handleSubmit}>
            {Object.keys(formData).map((fieldName) => {
              const fieldData = formData[fieldName];
              const fieldValue = formValues[fieldName] || '';

              return (
                <div className="mb-6" key={fieldName}>
                  <label htmlFor={fieldName} className="block text-black mb-1">
                    {fieldData.label}{' '}
                    {fieldData.required && (
                      <span className="text-red-600">*</span>
                    )}
                  </label>
                  {fieldData.type === 'select' ? (
                    <select
                      id={fieldName}
                      name={fieldName}
                      value={fieldValue}
                      onChange={handleInputChange}
                      className="border-2 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline border-gray-300"
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
                      className="border-2 border-gray-300 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  ) : fieldData.type === 'checkbox' ? (
                    <>
                      <label className="flex items-center">
                        <input
                          id={fieldName + '_yes'}
                          name={fieldName}
                          type="radio"
                          value="Yes"
                          checked={fieldValue === 'Yes'}
                          onChange={handleInputChange}
                          className="form-radio h-5 w-5 text-gray-600"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          id={fieldName + '_no'}
                          name={fieldName}
                          type="radio"
                          value="No"
                          checked={fieldValue === 'No'}
                          onChange={handleInputChange}
                          className="form-radio h-5 w-5 text-gray-600"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </>
                  ) : (
                    <input
                      id={fieldName}
                      name={fieldName}
                      type={fieldData.type}
                      step={fieldData.step}
                      value={fieldValue}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2  w-full"
                    />
                  )}
                </div>
              );
            })}
            {error !== null ? (
              <p className="font-bold text-primary mb-6 ml-2">{error}</p>
            ) : null}
            <button
              type="submit"
              className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit
            </button>
          </form>
        )
      )}
    </>
  );
}

export default EventForm;
