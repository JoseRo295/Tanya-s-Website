import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Field, Label, Switch } from '@headlessui/react';
import image from '../Images/corrusel/3.png'; 
import { useLocalization } from '../context/LocalizationContext'; // Asegúrate de que la ruta de importación sea correcta


export default function ContactForm() {
  const { translate } = useLocalization();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
      if (selectedCountryData.name.common === "Russia") {
        setPhonePrefix("+7");
      } else {
        if (selectedCountryData.idd && selectedCountryData.idd.suffixes && selectedCountryData.idd.suffixes.length > 0) {
          setPhonePrefix(selectedCountryData.idd.root + selectedCountryData.idd.suffixes[0]);
        } else {
          setPhonePrefix("");
        }
      }
    } else {
      setPhonePrefix("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#bcafa2] p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{translate('contactUs')} </h2>
            <p className="mt-2 text-lg leading-8 text-white">
            {translate('helpText')}
            </p>
          </div>
          <form action="#" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">
                {translate('firstName')}
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">
                {translate('lastName')}  
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
              {translate('email')}   
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold leading-6 text-white">
              {translate('country')} 
              </label>
              <div className="mt-2.5 relative">
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="block w-full appearance-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                >
                  <option value="">{translate('selectCountry')} </option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common} 
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white">
              {translate('phoneNumber')} 
              </label>
              <div className="relative mt-2.5 flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  {phonePrefix}
                </span>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder={translate('yourPhoneNumber')} 
                  autoComplete="tel"
                  className="block w-full rounded-r-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Field className="flex gap-x-4">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a79584] data-[checked]:bg-[#a79584]"
                >
                  <span className="sr-only">{translate('agreeToPolicies')} </span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm leading-6 text-white">
              {translate('acceptTerms')}{" "}
                <a href="#" className="font-semibold text-[#a79584]" onClick={handleModalOpen}>
                {translate('privacyPolicy')}
                </a>
                
              </Label>
            </Field>
            <div>
              <button
                type="submit"
                className="block w-full rounded-md bg-[#8a7866] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#640000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
              >
                {translate('send')}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:block">
          <img
            src={image}
            alt="phot"
            className="object-cover object-center w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Política de Privacidad
              </h3>
              <div className="mt-2 text-sm text-gray-500 space-y-4">
                <p>
                  En TG-Design nosotros, estamos comprometidos a proteger y respetar tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web y otros servicios asociados.
                </p>

                <h4 className="font-semibold">1. Información que Recopilamos</h4>
                <p>
                  Recopilamos información personal que nos proporcionas directamente, como tu nombre, dirección de correo electrónico, número de teléfono, y cualquier otra información que decidas compartir con nosotros.
                </p>

                <h4 className="font-semibold">2. Uso de la Información</h4>
                <ul className="list-disc ml-5">
                  <li>Proveer y mejorar nuestros servicios.</li>
                  <li>Comunicarnos contigo y responder a tus consultas.</li>
                  <li>Cumplir con nuestras obligaciones legales.</li>
                  <li>Analizar el uso de nuestro sitio web y mejorar su funcionalidad.</li>
                </ul>

                <h4 className="font-semibold">3. Compartir la Información</h4>
                <p>
                  No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con nuestras obligaciones legales, proteger nuestros derechos, o como parte de un acuerdo comercial (como proveedores de servicios que nos asisten en nuestras operaciones).
                </p>

                <h4 className="font-semibold">4. Protección de la Información</h4>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la pérdida, o el uso indebido. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet es completamente segura.
                </p>

                <h4 className="font-semibold">5. Tus Derechos</h4>
                <p>
                  Tienes derecho a acceder, rectificar o eliminar tu información personal. También puedes oponerte al tratamiento de tus datos o solicitar la portabilidad de los mismos. Para ejercer estos derechos, por favor, contáctanos a +593987149330.
                </p>

                <h4 className="font-semibold">6. Cambios en la Política de Privacidad</h4>
                <p>
                  Podemos actualizar esta Política de Privacidad. Te notificaremos de cualquier cambio publicando la nueva política en nuestro sitio web. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.
                </p>

                <h4 className="font-semibold">7. Contacto</h4>
                <p>
                  Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información personal, puedes contactarnos a +593987149330.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleModalClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
