import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Field, Label, Switch } from '@headlessui/react';
import image from '../Images/corrusel/3.png'; // Cambia esta ruta por la ruta correcta de tu imagen

export default function ContactForm() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Fetching country data including calling codes
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      });
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    
    const selectedCountryData = countries.find(
      (c) => c.name.common === country
    );
    if (selectedCountryData) {
      setPhonePrefix(selectedCountryData.idd.root + selectedCountryData.idd.suffixes[0]);
    } else {
      setPhonePrefix('');
    }
  };

  const handlePhoneNumberChange = (e) => {
    const number = e.target.value;
    setPhoneNumber(number.startsWith(phonePrefix) ? number : phonePrefix + number);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl w-full mx-auto p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contáctanos</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Estamos aquí para ayudarte con cualquier pregunta o consulta que tengas.
            </p>
          </div>
          <form action="#" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Apellido
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                Compañía
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                País
              </label>
              <div className="mt-2.5">
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Teléfono
              </label>
              <div className="relative mt-2.5">
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder={phonePrefix}
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD700] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Field className="flex gap-x-4">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] data-[checked]:bg-[#FFD700]"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm leading-6 text-gray-600">
                Al seleccionar esto, aceptas nuestra{' '}
                <a href="#" className="font-semibold text-[#FFD700]">
                  política de privacidad
                </a>
                .
              </Label>
            </Field>
            <div>
              <button
                type="submit"
                className="block w-full rounded-md bg-[#8B0000] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#640000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src={image}
            alt="Interior design example"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
