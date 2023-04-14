import React from 'react';
import { useState } from 'react';
import config from '@/components/eventFormConfig.json';
import { sendEmail } from '../firebase';

export default function EventFormComponent() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // If the phone number starts with a "1", remove it
      const countryCode = match[1] ? '+1 ' : '';

      // Format the phone number as a 10 digit number with area code and prefix
      const formatted =
        countryCode + '(' + match[2] + ') ' + match[3] + '-' + match[4];

      return formatted;
    }

    // Return the original phone number string if it's not a valid 10 digit number
    return phoneNumberString;
  }

  let order = 0;
  const flattenFields = (fields) => {
    return fields.flatMap((field) => {
      if (Array.isArray(field.items)) {
        return field.items.map((item) => ({ ...item, order: order++ }));
      }
      return { ...field, order: order++ };
    });
  };

  const fields = [
    ...flattenFields(config.info1),
    ...flattenFields(config.sections.flatMap((section) => section.items)),
  ];

  function convertToStandardTime(militaryTime) {
    const [hours, minutes] = militaryTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const standardHours = hours % 12 || 12; // 12-hour format, with 0 replaced by 12
    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensuring minutes are two digits
    return `${standardHours}:${formattedMinutes} ${period}`;
  }

  const handleChange = (sectionKey, fieldKey, value, e) => {
    let val = value;

    switch (e.target.type) {
      case 'time':
        val = convertToStandardTime(value);
        break;
      case 'tel':
        val = formatPhoneNumber(value);
        break;
    }

    setFormData((prevState) => ({
      ...prevState,
      [sectionKey]: { ...prevState[sectionKey], [fieldKey]: val },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderedFields = Object.keys(formData)
      .map((groupKey) => {
        return Object.entries(formData[groupKey]).map(([key, value]) => {
          const field = fields.find((field) => field.label === key);
          const order = field ? field.order : 0;

          return {
            key,
            value: Array.isArray(value) ? value.join(', ') : value,
            order,
          };
        });
      })
      .flat()
      .sort((a, b) => a.order - b.order);

    // Send orderedFields to SendGrid
    console.log(JSON.stringify(orderedFields));

    // if (false) {
    setError(null);
    setIsLoading(true);
    try {
      await sendEmail(
        {
          orderedFields,
          template: 'event_template_html',
          emailTo: ['info@bunkerparties.com'],
        },
        { auth: true }
      );

      await sendEmail(
        {
          orderedFields,
          template: 'event_client_template',
          emailTo: [formData.info1['Email Address']],
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
    // } else {
    //   console.log('Form is invalid!');
    //   // TODO: Handle form errors
    //   setError('Please fill out all fields!');
    // }
  };

  const renderField = (sectionKey, field) => (
    <div key={field.label} className="flex flex-col">
      <label htmlFor={field.label} className="mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.type === 'select' ? (
        <select
          id={field.label}
          name={field.label}
          type="select"
          required={field.required}
          onChange={(e) =>
            handleChange(sectionKey, field.label, e.target.value, e)
          }
          className="border border-gray-300 p-2"
        >
          <option value="">Choose an option</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div key={field.label} className="flex flex-col">
          {field.options.map((option) => (
            <label
              key={option.value}
              className="inline-flex items-center w-fit"
            >
              <input
                type="radio"
                name={field.label}
                value={option.value}
                required={field.required}
                onChange={(e) =>
                  handleChange(sectionKey, field.label, e.target.value, e)
                }
                className="mr-2 w-fit"
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : field.type === 'textarea' ? (
        <div key={field.label} className="flex flex-col">
          <textarea
            id={field.label}
            name={field.label}
            rows="5"
            cols="40"
            required={field.required}
            onChange={(e) =>
              handleChange(sectionKey, field.label, e.target.value, e)
            }
            className="border border-gray-300 p-2"
          />
        </div>
      ) : (
        <input
          id={field.label}
          name={field.label}
          type={field.type}
          required={field.required}
          onChange={(e) =>
            handleChange(sectionKey, field.label, e.target.value, e)
          }
          className="border border-gray-300 p-2"
        />
      )}
    </div>
  );

  const renderSection = (section, index) => (
    <div key={section.title} className="space-y-4">
      <h2 className="text-xl font-bold mb-0">{section.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {section.items.map((field) => renderField(`section${index}`, field))}
      </div>
    </div>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 text-primary">{config.title}</h1>
      <p className="text-xs text-gray-500 italic mb-3">
        * indicates required fields
      </p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.info1.map((field) => renderField('info1', field))}
            </div>
            {config.sections.map(renderSection)}
            <button
              type="submit"
              className="bg-primary w-full text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )
      )}
    </>
  );
}
