
import React, { useState } from 'react';
import { SalonData } from '../types';
import { THEMES } from '../constants';

interface SalonFormProps {
  onGenerate: (data: SalonData) => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'textarea';
}> = ({ id, label, placeholder, value, onChange, type = 'text' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type="text"
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export const SalonForm: React.FC<SalonFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<SalonData>({
    name: 'The Glam Room',
    about: 'A chic and modern salon focused on making you feel beautiful.',
    services: 'Haircut, Manicure, Pedicure, Facial',
    contact: '123 Beauty Lane, Glam City | (555) 123-4567',
    theme: THEMES[0].name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-gray-800">Create Your Salon Website</h1>
            <p className="text-gray-500 mt-2">Enter your salon's details and let AI do the magic!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField id="name" label="Salon Name" placeholder="e.g., The Glam Room" value={formData.name} onChange={handleChange} />
            <InputField id="about" label="Brief About Us" placeholder="A short, one-sentence description of your salon" value={formData.about} onChange={handleChange} type="textarea" />
            <InputField id="services" label="Services Offered" placeholder="e.g., Haircut, Manicure, Pedicure, Facial (comma-separated)" value={formData.services} onChange={handleChange} type="textarea" />
            <InputField id="contact" label="Contact Information" placeholder="Address & Phone Number" value={formData.contact} onChange={handleChange} />
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                Color Theme
              </label>
              <select
                id="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {THEMES.map((theme) => (
                  <option key={theme.name} value={theme.name}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate My Website'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
