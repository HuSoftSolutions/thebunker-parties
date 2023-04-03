// // components/DynamicForm.js

// import { useState, useEffect } from 'react';
import formConfig from '@/components/preOrderFormConfig.json';
// import { sendEmail } from '../firebase';

// const PreOrderFormComponent = () => {
//   const [formValues, setFormValues] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState(null);

//   function handleInputChange(event, parent = null) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     if (target.type === 'number' && Number(value) <= 0) {
//       let vals = { ...formValues };
//       delete vals[name];
//       setFormValues(vals);

//       // setFormValues({
//       //   ...formValues,
//       //   [name]: 0, // Set value to 0 if it's negative
//       // });
//     } else if (!value) {
//       let vals = { ...formValues };
//       delete vals[name];
//       setFormValues(vals);
//     } else if (target.type === 'checkbox' && parent !== null) {
//       console.log({
//         ...formValues,
//         [name]: parent,
//       });
//       setFormValues({
//         ...formValues,
//         [name]: parent,
//       });
//     } else if (target.type === 'checkbox' && parent) {
//       setFormValues({
//         ...formValues,
//         [`${parent}_${name}`]: value,
//       });
//     } else {
//       setFormValues({
//         ...formValues,
//         [name]: value,
//       });
//     }
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const allFields = formConfig.info1.concat(
//       formConfig.sections.reduce(
//         (accumulator, section) => accumulator.concat(section.items),
//         []
//       ),
//       formConfig.info4
//     );

//     // Check if all fields are filled out
//     const isFormValid = allFields.every((field) => {
//       const value = formValues[field.label];
//       return !field.required || (value !== undefined && value !== '');
//     });

//     let orderedFields = {};
//     allFields.forEach((field) => {
//       if (formValues[field.label]) {
//         orderedFields[field.label] = formValues[field.label];
//       }
//       if (field.options) {
//         field.options.forEach((option) => {
//           if (formValues[option]) {
//             orderedFields[option] = formValues[option];
//           }
//         });
//       }
//     });

//     console.log(JSON.stringify({ orderedFields }));

//     // if (isFormValid) {
//     //   setError(null);
//     //   setIsLoading(true);
//     //   try {
//     //     await sendEmail(
//     //       {
//     //         ...formValues,
//     //         template: 'event_template',
//     //         emailTo: ['cody.husek@husoftsolutions.com'],
//     //       },
//     //       { auth: true }
//     //     );

//     //     await sendEmail(
//     //       {
//     //         ...formValues,
//     //         template: 'event_client_template',
//     //         emailTo: [formValues.email],
//     //       },
//     //       { auth: true }
//     //     );
//     //     setIsSubmitted(true);
//     //     console.log('email sent!');
//     //   } catch (error) {
//     //     console.log(JSON.stringify(error));
//     //   }

//     //   setIsLoading(false);

//     //   console.log('Form submission complete');
//     // } else {
//     //   console.log('Form is invalid!');
//     //   // TODO: Handle form errors
//     //   setError('Please fill out all fields!');
//     // }
//   };

//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-4 text-primary">
//         {formConfig.title}
//       </h1>
//       {isSubmitted && !isLoading && (
//         <div className="p-4 flex items-center justify-center text-green-500 border border-green-500 bg-green-200 font-bold rounded text-2xl">
//           Thank you for submitting!
//         </div>
//       )}
//       {isLoading ? (
//         <div className="p-4 flex items-center justify-center text-yellow-500 border border-yellow-500 bg-yellow-200 font-bold rounded text-2xl">
//           Submitting...
//         </div>
//       ) : (
//         !isSubmitted && (
//           <form onSubmit={handleSubmit}>
//             {/* Render Info1 Text Fields */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               {formConfig.info1.map((field) => (
//                 <div key={field.label} className="mb-4">
//                   {field.label && (
//                     <label htmlFor={field.label} className="block mb-1">
//                       {field.label}{' '}
//                       {field.required && (
//                         <span className="text-red-600">*</span>
//                       )}
//                     </label>
//                   )}
//                   <input
//                     id={field.label}
//                     type={field.type}
//                     placeholder={field.placeholder || ''}
//                     className="border-2 border-gray-300 p-2  w-full"
//                     name={field.label}
//                     value={formValues[field.label] || ''}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Render Subtitle with bulleted list */}
//             <h2 className="text-xl font-semibold mb-2">
//               {formConfig.subtitle}
//             </h2>
//             <ul className="list-disc mb-6">
//               {formConfig.bulletedList.map((item, index) => (
//                 <li key={index} className="ml-4 mb-1">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {/* Render Info2 and Info3 Quantity Fields */}
//             {formConfig.sections.map((section) => (
//               <div key={section.title} className="mb-6">
//                 <h2 className="text-xl font-bold mb-2">{section.title}</h2>
//                 <p className="mb-4">{section.subtitle}</p>
//                 {section.items.map((item) => (
//                   <div key={item.label} className="mb-4">
//                     <label htmlFor={item.label} className="block mb-1">
//                       {item.label}
//                     </label>
//                     <input
//                       id={item.label}
//                       type={item.type}
//                       min={0}
//                       className="border-2 border-gray-300 p-2 w-full"
//                       name={item.label}
//                       value={formValues[item.label] || ''}
//                       onChange={handleInputChange}
//                     />
//                     {item.options && (
//                       <div className="mt-2">
//                         {item.options.map((option, index) => (
//                           <label
//                             htmlFor={`${item.label}_${index}`}
//                             key={`${item.label}_${index}`}
//                             className="inline-flex items-center mr-4"
//                           >
//                             <input
//                               id={`${item.label}_${index}`}
//                               type="checkbox"
//                               className="mr-2"
//                               name={option}
//                               value={formValues[item.label] || ''}
//                               onChange={(e) =>
//                                 handleInputChange(e, item.category)
//                               }
//                             />
//                             {option}
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}

//             {/* Render Info4 Text Fields */}
//             {formConfig.info4.map((field) => (
//               <div key={field.label} className="mb-4">
//                 <label htmlFor={field.label} className="block mb-1">
//                   {field.label}
//                 </label>
//                 {field.type === 'textarea' ? (
//                   <textarea
//                     id={field.label}
//                     rows="5"
//                     className="border-2 border-gray-300 p-2 w-full"
//                     name={field.label}
//                     value={formValues[field.label] || ''}
//                     onChange={handleInputChange}
//                   ></textarea>
//                 ) : (
//                   <input
//                     id={field.label}
//                     type={field.type}
//                     className="border-2 border-gray-300 p-2 w-full"
//                     name={field.label}
//                     value={formValues[field.label] || ''}
//                     onChange={handleInputChange}
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="bg-primary text-white p-2 rounded w-full"
//             >
//               Submit
//             </button>
//           </form>
//         )
//       )}
//     </>
//   );
// };

// export default PreOrderFormComponent;

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

  // components/PreOrderFormComponent.js (continued)
  const handleChange = (group, e) => {
    setFormData((prevState) => {
      const groupData = prevState[group] || {};
      return {
        ...prevState,
        [group]: { ...groupData, [e.target.name]: e.target.value },
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

    // Send orderedFields to SendGrid
    console.log(JSON.stringify(orderedFields));

    console.log(formData);

    if (true) {
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
          <div key={field.label} className="flex flex-col">
            <span className="mb-1">{field.label}</span>
            {field.options.map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={field.label}
                  value={option}
                  onChange={(e) => handleMultiSelectChange(group, e)}
                  className="mr-2"
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
