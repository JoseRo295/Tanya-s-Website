import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";
import image from "../Images/2.jpg"; // Ajusta la ruta de tu imagen
import { useLocalization } from "../context/LocalizationContext";

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

  // Verificar si el formulario está completo
  const isFormValid = 
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    selectedCountry.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    agreed;

  // Enviar formulario a WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    // Si no es válido, no hacemos nada
    if (!isFormValid) return;

    // Construir el texto del mensaje
    const message = `
Nombre: ${firstName} ${lastName}
Email: ${email}
País: ${selectedCountry}
Teléfono: ${phonePrefix} ${phoneNumber}
Aceptó términos: ${agreed ? "Sí" : "No"}
    `.trim();

    // Número de WhatsApp (sin '+')
    const phone = "593983548611"; // Reemplaza con tu número
    // Crear la URL de WhatsApp con el texto codificado
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // Abrir WhatsApp en otra pestaña
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 py-10 px-4">
      {/* Contenedor con grid para imagen y formulario de la misma altura */}
      <div
        className="
          max-w-7xl 
          w-full 
          mx-auto 
          min-h-[600px] 
          grid 
          grid-cols-1 
          lg:grid-cols-2 
          items-stretch 
          rounded-xl 
          shadow-2xl 
          overflow-hidden
        "
      >
        {/* Imagen a la izquierda (oculta en móviles) */}
        <div className="relative hidden lg:block">
          <img
            src={image}
            alt="Form side"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Sección del formulario */}
        <div className="bg-white p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              {translate("contactUs")}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
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
                  className="block text-sm font-medium text-gray-700"
                >
                  {translate("firstName")}
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    className="
                      block 
                      w-full 
                      rounded-md 
                      border 
                      border-gray-300
                      px-3 
                      py-2 
                      text-gray-700
                      shadow-sm
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#556B2F] 
                      focus:border-transparent
                      sm:text-sm
                    "
                  />
                </div>
              </div>
              {/* Campo Apellido */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {translate("lastName")}
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="
                      block 
                      w-full 
                      rounded-md 
                      border 
                      border-gray-300
                      px-3 
                      py-2 
                      text-gray-700
                      shadow-sm
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#556B2F] 
                      focus:border-transparent
                      sm:text-sm
                    "
                  />
                </div>
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("email")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="
                    block 
                    w-full 
                    rounded-md 
                    border 
                    border-gray-300
                    px-3 
                    py-2 
                    text-gray-700
                    shadow-sm
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#556B2F] 
                    focus:border-transparent
                    sm:text-sm
                  "
                />
              </div>
            </div>

            {/* Campo País */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("country")}
              </label>
              <div className="relative mt-2">
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="
                    block 
                    w-full 
                    appearance-none 
                    rounded-md 
                    border 
                    border-gray-300
                    px-3 
                    py-2 
                    text-gray-700
                    shadow-sm
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#556B2F] 
                    focus:border-transparent
                    sm:text-sm
                  "
                >
                  <option value="">{translate("selectCountry")}</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Campo Teléfono */}
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                {translate("phoneNumber")}
              </label>
              <div className="mt-2 flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">
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
                  className="
                    block 
                    w-full 
                    rounded-r-md 
                    border 
                    border-gray-300
                    px-3 
                    py-2 
                    text-gray-700
                    shadow-sm
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#556B2F] 
                    focus:border-transparent
                    sm:text-sm
                  "
                />
              </div>
            </div>

            {/* Aceptar términos */}
            <Field className="flex items-center gap-x-3">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="
                    group 
                    flex 
                    w-8 
                    flex-none 
                    cursor-pointer 
                    rounded-full 
                    bg-gray-200 
                    p-px 
                    ring-1 ring-inset ring-gray-300 
                    transition-colors 
                    duration-200 
                    ease-in-out
                    focus-visible:outline-none
                    data-[checked]:bg-[#556B2F]
                  "
                >
                  <span className="sr-only">{translate("agreeToPolicies")}</span>
                  <span
                    aria-hidden="true"
                    className="
                      h-4 
                      w-4 
                      transform 
                      rounded-full 
                      bg-white 
                      shadow-sm 
                      ring-1 ring-gray-300 
                      transition 
                      duration-200 
                      ease-in-out 
                      group-data-[checked]:translate-x-3.5
                    "
                  />
                </Switch>
              </div>
              <Label className="text-sm text-gray-600">
                {translate("acceptTerms")}{" "}
                <button
                  type="button"
                  className="font-semibold text-[#556B2F] underline"
                  onClick={handleModalOpen}
                >
                  {translate("privacyPolicy")}
                </button>
              </Label>
            </Field>

            {/* Botón de Envío con validación */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`
                  block 
                  w-full 
                  rounded-md 
                  px-4 
                  py-2 
                  text-center 
                  text-sm 
                  font-semibold 
                  text-white 
                  shadow-sm 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-[#556B2F] 
                  focus:border-transparent
                  ${
                    isFormValid
                      ? "bg-[#556B2F] hover:bg-[#6B8E23]"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
              >
                {translate("send")}
              </button>
            </div>
          </form>
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
                      <h4 className="font-semibold">{translate("useOfInfo")}</h4>
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
                  className="
                    w-full 
                    inline-flex 
                    justify-center 
                    rounded-md 
                    border border-transparent 
                    shadow-sm 
                    px-4 
                    py-2 
                    bg-red-600 
                    text-base 
                    font-medium 
                    text-white 
                    hover:bg-red-700 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-offset-2 
                    focus:ring-red-500 
                    sm:ml-3 
                    sm:w-auto 
                    sm:text-sm
                  "
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
