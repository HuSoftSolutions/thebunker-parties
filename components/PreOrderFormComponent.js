// components/DynamicForm.js

import { useState, useEffect } from 'react';
import formConfig from '@/components/preOrderFormConfig.json';
import { sendEmail } from '../firebase';

const PreOrderFormComponent = () => {
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
    const isFormValid = formConfig.info1
      .concat(
        formConfig.sections.reduce(
          (accumulator, section) => accumulator.concat(section.items),
          []
        ),
        formConfig.info4
      )
      .every((field) => {
        const value = formValues[field.id];
        return !field.required || (value !== undefined && value !== '');
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
      <h1 className="text-2xl font-bold mb-4">{formConfig.title}</h1>
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
          <form onSubmit={handleSubmit}>
            {/* Render Info1 Text Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {formConfig.info1.map((field) => (
                <div key={field.id} className="mb-4">
                  {field.label && (
                    <label htmlFor={field.id} className="block mb-1">
                      {field.label}{' '}
                      {field.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </label>
                  )}
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder || ''}
                    className="border-2 border-gray-300 p-2 rounded w-full"
                    name={field.id}
                    value={formValues[field.id] || ''}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            {/* Render Subtitle with bulleted list */}
            <h2 className="text-xl font-semibold mb-2">
              {formConfig.subtitle}
            </h2>
            <ul className="list-disc mb-6">
              {formConfig.bulletedList.map((item, index) => (
                <li key={index} className="ml-4 mb-1">
                  {item}
                </li>
              ))}
            </ul>

            {/* Render Info2 and Info3 Quantity Fields */}
            {formConfig.sections.map((section) => (
              <div key={section.title} className="mb-6">
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                <p className="mb-4">{section.subtitle}</p>
                {section.items.map((item) => (
                  <div key={item.id} className="mb-4">
                    <label htmlFor={item.id} className="block mb-1">
                      {item.label}
                    </label>
                    <input
                      id={item.id}
                      type={item.type}
                      min={0}
                      className="border-2 border-gray-300 p-2 w-full"
                    />
                    {item.options && (
                      <div className="mt-2">
                        {item.options.map((option, index) => (
                          <label
                            htmlFor={`${item.id}_${index}`}
                            key={`${item.id}_${index}`}
                            className="inline-flex items-center mr-4"
                          >
                            <input
                              id={`${item.id}_${index}`}
                              type="checkbox"
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Render Info4 Text Fields */}
            {formConfig.info4.map((field) => (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block mb-1">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    rows="5"
                    className="border-2 border-gray-300 p-2 w-full"
                  ></textarea>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    className="border-2 border-gray-300 p-2 w-full"
                  />
                )}
              </div>
            ))}

            {/* Submit button */}
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded w-full"
            >
              Submit
            </button>
          </form>
        )
      )}
    </>
  );
};

export default PreOrderFormComponent;
