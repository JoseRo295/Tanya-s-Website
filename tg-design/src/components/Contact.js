import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";
import image from "../Images/2.jpg"; // Ajusta la ruta de tu imagen
import { useLocalization } from "../context/LocalizationContext";

// Importar componentes de MUI
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

export default function ContactForm() {
  const { translate } = useLocalization();

  // Estados del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Modal de política de privacidad
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar países al montar
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

  // Manejar cambio de país
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    const selectedCountryData = countries.find(
      (c) => c.name.common === country
    );

    if (selectedCountryData) {
      if (selectedCountryData.name.common === "Russia") {
        setPhonePrefix("+7");
      } else if (
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
    } else {
      setPhonePrefix("");
    }
  };

  // Manejar cambio de número
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Modal de privacidad
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // Verificar si el formulario está completo
  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    selectedCountry.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    agreed;

  // Enviar a WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const message = `
    Name: ${firstName} ${lastName}
    Email: ${email}
    Country: ${selectedCountry}
    Phone: ${phonePrefix} ${phoneNumber}
    Accepted Terms: ${agreed ? "Yes" : "No"}
    `.trim();
    

    const phone = "593983548611"; // Ajusta tu número (sin '+')
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 py-10 px-4">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {/* Campo Nombre */}
              <div>
                <TextField
                  label={translate("firstName")}
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={firstName.trim() === ""}
                  helperText={
                    firstName.trim() === ""
                      ? translate("firstNameRequired")
                      : ""
                  }
                />
              </div>

              {/* Campo Apellido */}
              <div>
                <TextField
                  label={translate("lastName")}
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={lastName.trim() === ""}
                  helperText={
                    lastName.trim() === ""
                      ? translate("lastNameRequired")
                      : ""
                  }
                />
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <TextField
                label={translate("email")}
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.trim() === ""}
                helperText={
                  email.trim() === "" ? translate("emailRequired") : ""
                }
              />
            </div>

            {/* Campo País */}
            <div>
              <TextField
                select
                label={translate("country")}
                variant="outlined"
                fullWidth
                value={selectedCountry}
                onChange={handleCountryChange}
                error={selectedCountry.trim() === ""}
                helperText={
                  selectedCountry.trim() === ""
                    ? translate("countryRequired")
                    : ""
                }
              >
                <MenuItem value="">{translate("selectCountry")}</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.cca3} value={country.name.common}>
                    {country.name.common}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Campo Teléfono */}
            <div>
              <TextField
                label={translate("phoneNumber")}
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={phoneNumber.trim() === ""}
                helperText={
                  phoneNumber.trim() === ""
                    ? translate("phoneNumberRequired")
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {phonePrefix}
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Aceptar términos */}
            <Field className="flex items-center gap-x-3">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="
                    group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px 
                    ring-1 ring-inset ring-gray-300 transition-colors duration-200 ease-in-out
                    focus-visible:outline-none data-[checked]:bg-[#556B2F]
                  "
                >
                  <span className="sr-only">{translate("agreeToPolicies")}</span>
                  <span
                    aria-hidden="true"
                    className="
                      h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-300 transition 
                      duration-200 ease-in-out group-data-[checked]:translate-x-3.5
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

            {/* Botón de Envío */}
            <div>
              <button
                type="submit"
                className={`
                  block w-full rounded-md px-4 py-2 text-center text-sm font-semibold text-white shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent
                  ${
                    isFormValid
                      ? "bg-[#556B2F] hover:bg-[#6B8E23]"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
                disabled={!isFormValid}
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
