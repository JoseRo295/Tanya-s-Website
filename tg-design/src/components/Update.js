import React, { useState } from 'react';
import axios from 'axios';
// Importa desde la ruta correcta dentro del directorio src
import { cvFilesUrl } from '../environment/environment-dev';


const UploadFileSection = ({ onUpload }) => {
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);  // Estado para guardar el archivo seleccionado

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            processFile(file);
            setFile(file);  // Guarda el archivo en el estado
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            processFile(file);
            setFile(file);  // Guarda el archivo en el estado
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const processFile = (file) => {
        setFileName(file.name);
        setFileSize((file.size / 1024 / 1024).toFixed(2));  // Convert size to MB
        // No call simulateUpload() since we will upload for real
    };

    const handleUpload = async () => {
        if (!file) {
            alert("No file selected or file type is invalid.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${cvFilesUrl}/uploadfile/cv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            console.log(response);
            onUpload();  // Llamar a la función onUpload después de la carga
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative border-2" style={{ borderColor: '#F0810F' }}>
                <div className="flex items-center pb-3 border-b" style={{ borderColor: '#E6DF44' }}>
                    <div className="flex-1">
                        <h3 className="text-[#F0810F] text-xl font-bold">Sube tu Cv en PDF</h3>
                        <p className="text-gray-600 text-xs mt-1">Sube tu PDF a este proyecto</p>
                    </div>
                </div>

                <div 
                    className={`rounded-lg border-2 border-dashed mt-6 ${dragActive ? 'bg-gray-100' : ''}`} 
                    style={{ borderColor: '#E6DF44' }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 mb-4 inline-block"
                            viewBox="0 0 32 32"
                            fill="#F0810F"
                        >
                            {/* SVG path data */}
                        </svg>

                        <h4 className="text-sm text-gray-600">
                            Arrastra y suelta o <label htmlFor="chooseFile" className="text-[#F0810F] cursor-pointer">elige el archivo</label> para subirlo
                        </h4>
                        <input type="file" id="chooseFile" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                    </div>
                </div>

                {fileName && (
                    <div className="flex flex-col bg-[#E6DF44] p-4 rounded-lg mt-4">
                        <div className="flex">
                            <p className="text-xs text-gray-800 flex-1">
                                {/* SVG icon data */}
                                {fileName} <span className="ml-2">{fileSize} MB</span>
                            </p>
                        </div>

                        <div className="bg-gray-300 rounded-full w-full h-2 my-2">
                            <div className="h-full rounded-full bg-[#F0810F] flex items-center relative" style={{ width: `${uploadProgress}%` }}>
                                <span className="absolute text-xs right-0 bg-white w-2 h-2 rounded-full"></span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-800 flex-1">{uploadProgress}% done</p>
                    </div>
                )}

                <div className="border-t pt-6 flex justify-between gap-4 mt-6" style={{ borderColor: '#E6DF44' }}>
                    
                    <button
                        type="button"
                        className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide"
                        style={{ backgroundColor: '#F0810F' }}
                        onClick={handleUpload}
                    >
                        Importar
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                        onClick={() => {
                            setFileName('');
                            setFileSize(0);
                            setUploadProgress(0);
                            setFile(null);  // Limpia el archivo del estado
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadFileSection;
