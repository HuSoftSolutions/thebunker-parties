// // components/DynamicForm.js

// import { useState, useEffect } from 'react';
import formConfig from '@/components/preOrderFormConfig.json';

// components/PreOrderFormComponent.js
import { useState } from 'react';
import config from '@/components/preOrderFormConfig.json';
import { sendEmail } from '../firebase';

export default function PreOrderFormComponent() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

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
    ...flattenFields(config.info4),
  ];

  function convertToStandardTime(militaryTime) {
    const [hours, minutes] = militaryTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const standardHours = hours % 12 || 12; // 12-hour format, with 0 replaced by 12
    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensuring minutes are two digits
    return `${standardHours}:${formattedMinutes} ${period}`;
  }

  const handleChange = (group, e) => {
    let val = e.target.value;

    switch (e.target.type) {
      case 'time':
        val = convertToStandardTime(e.target.value);
        break;
    }

    setFormData((prevState) => {
      const groupData = prevState[group] || {};
      return {
        ...prevState,
        [group]: { ...groupData, [e.target.name]: val },
      };
    });
  };

  // components/PreOrderFormComponent.js (continued)
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

    setError(null);
    setIsLoading(true);
    try {
      await sendEmail(
        {
          orderedFields,
          template: 'preorder_template_html',
          emailTo: ['info@bunkerparties.com', formData.info1.Email],
        },
        { auth: true }
      );
      setIsSubmitted(true);
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    setIsLoading(false);

    console.log('Form submission complete');
  };

  // components/PreOrderFormComponent.js (continued)
  const handleMultiSelectChange = (group, e) => {
    const value = e.target.value;
    setFormData((prevState) => {
      const groupData = prevState[group] || {};
      const prevValues = groupData[e.target.name] || [];
      const newValues = e.target.checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);
      return {
        ...prevState,
        [group]: { ...groupData, [e.target.name]: newValues },
      };
    });
  };

  // components/PreOrderFormComponent.js (continued)
  const renderFormFields = (fields, group) => {
    return fields.map((field) => {
      if (field.type === 'multi-select') {
        return (
          <div key={field.label} className="flex flex-col w-fit">
            <span className="mb-1">{field.label}</span>
            {field.options.map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={field.label}
                  value={option}
                  onChange={(e) => handleMultiSelectChange(group, e)}
                  className="mr-2 w-fit"
                />
                {option}
              </label>
            ))}
          </div>
        );
      } else {
        return (
          <div key={field.label} className="flex flex-col">
            <label htmlFor={field.label} className="mb-1">
              {field.label}
            </label>
            <input
              id={field.label}
              name={field.label}
              type={field.type}
              required={field.required}
              onChange={(e) => handleChange(group, e)}
              className="border border-gray-300 p-2"
            />
          </div>
        );
      }
    });
  };

  // components/PreOrderFormComponent.js (continued)
  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <div key={section.title} className="space-y-4">
        {/* ... */}
        {renderFormFields(section.items, `section${index}`)}
      </div>
    ));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-primary">
        {formConfig.title}
      </h1>
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
            {renderFormFields(config.info1, 'info1')}
            <h2 className="text-xl font-bold mb-2">{config.subtitle}</h2>
            <ul className="list-disc list-inside mb-4">
              {config.bulletedList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {renderSections(config.sections)}
            {renderFormFields(config.info4, 'info4')}
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
