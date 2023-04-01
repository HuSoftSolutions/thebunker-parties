import React from 'react';
import { useState } from 'react';

function ContactUsForm() {
  const [formValues, setFormValues] = useState({});

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted', formValues);
  };

  return (
    <>
      <h1 className="mb-4 text-2xl text-primary">Contact Us Form</h1>

      <form
        className="p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-10">
          <label
            htmlFor="firstName"
            className="block text-black font-bold mb-2"
          >
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formValues.firstName || ''}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="lastName" className="block text-black font-bold mb-2">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formValues.lastName || ''}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="phone" className="block text-black font-bold mb-2">
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formValues.phone || ''}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="email" className="block text-black font-bold mb-2">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email || ''}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="message" className="block text-black font-bold mb-2">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formValues.message || ''}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className=" rounded bg-primary text-white font-bold p-2 px-4"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ContactUsForm;
