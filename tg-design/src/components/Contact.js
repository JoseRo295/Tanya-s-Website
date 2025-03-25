import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";
import image from "../Images/corrusel/3.png";
import { useLocalization } from "../context/LocalizationContext"; // Ajusta la ruta si es necesario

export default function ContactForm() {
  const { translate } = useLocalization();

  // Estados para los datos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Estado para el modal de política de privacidad
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar países al montar el componente
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      });
  }, []);

  // Manejar cambio de país y prefijo telefónico
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
        if (
          selectedCountryData.idd &&
          selectedCountryData.idd.suffixes &&
          selectedCountryData.idd.suffixes.length > 0
        ) {
          setPhonePrefix(
            selectedCountryData.idd.root + selectedCountryData.idd.suffixes[0]
          );
        } else {
          setPhonePrefix("");
        }
      }
    } else {
      setPhonePrefix("");
    }
  };

  // Manejar cambio de número telefónico
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Abrir modal de política de privacidad
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Cerrar modal de política de privacidad
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Enviar formulario a WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir el texto del mensaje
    // Usamos saltos de línea (\n) y encodeURIComponent para que WhatsApp los interprete correctamente
    const message = `
Nombre: ${firstName} ${lastName}
Email: ${email}
País: ${selectedCountry}
Teléfono: ${phonePrefix} ${phoneNumber}
Aceptó términos: ${agreed ? "Sí" : "No"}
    `.trim();

    // Número sin signo '+'
    const phone = "593983548611";
    // Crear la URL de WhatsApp con el texto codificado
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // Abrir WhatsApp (o WhatsApp Web) en una nueva pestaña
    window.open(url, "_blank");
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sección del formulario */}
        <div className="bg-[#bcafa2] p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {translate("contactUs")}
            </h2>
            <p className="mt-2 text-lg leading-8 text-white">
              {translate("helpText")}
            </p>
          </div>
          {/* Formulario con onSubmit */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {/* Campo Nombre */}
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {translate("firstName")}
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Campo Apellido */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  {translate("lastName")}
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-white"
              >
                {translate("email")}
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Campo País */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold leading-6 text-white"
              >
                {translate("country")}
              </label>
              <div className="mt-2.5 relative">
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="block w-full appearance-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                >
                  <option value="">{translate("selectCountry")}</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            {/* Campo Teléfono */}
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-white"
              >
                {translate("phoneNumber")}
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
                  placeholder={translate("yourPhoneNumber")}
                  autoComplete="tel"
                  className="block w-full rounded-r-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a79584] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Aceptar términos */}
            <Field className="flex gap-x-4">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a79584] data-[checked]:bg-[#a79584]"
                >
                  <span className="sr-only">
                    {translate("agreeToPolicies")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm leading-6 text-white">
                {translate("acceptTerms")}{" "}
                <button
                  type="button"
                  className="font-semibold text-[#a79584] underline"
                  onClick={handleModalOpen}
                >
                  {translate("privacyPolicy")}
                </button>
              </Label>
            </Field>
            {/* Botón de Envío */}
            <div>
              <button
                type="submit"
                className="block w-full rounded-md bg-[#8a7866] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#640000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B0000]"
              >
                {translate("send")}
              </button>
            </div>
          </form>
        </div>

        {/* Imagen lateral (solo en pantallas grandes) */}
        <div className="hidden lg:block">
          <img
            src={image}
            alt="phot"
            className="object-cover object-center w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Modal de Política de Privacidad */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {translate("privacyPolicyTitle")}
                    </h3>
                    <div className="mt-2 text-sm text-gray-500 space-y-4">
                      <p>{translate("privacyPolicyText")}</p>
                      <h4 className="font-semibold">
                        {translate("infoWeCollect")}
                      </h4>
                      <p>{translate("infoWeCollectText")}</p>
                      <h4 className="font-semibold">
                        {translate("useOfInfo")}
                      </h4>
                      <ul className="list-disc ml-5">
                        {translate("useOfInfoList").map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <h4 className="font-semibold">
                        {translate("shareInfo")}
                      </h4>
                      <p>{translate("shareInfoText")}</p>
                      <h4 className="font-semibold">
                        {translate("protectInfo")}
                      </h4>
                      <p>{translate("protectInfoText")}</p>
                      <h4 className="font-semibold">
                        {translate("yourRights")}
                      </h4>
                      <p>{translate("yourRightsText")}</p>
                      <h4 className="font-semibold">
                        {translate("privacyChanges")}
                      </h4>
                      <p>{translate("privacyChangesText")}</p>
                      <h4 className="font-semibold">{translate("contact")}</h4>
                      <p>{translate("contactText")}</p>
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
                  {translate("closeButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
