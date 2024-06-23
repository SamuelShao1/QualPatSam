import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { Pencil, Copy, Trash2, Info, ChevronLeft, Download } from 'lucide-react';
import InfoDisplay from './components/InfoDisplay';

const CSVDisplay = ({ filePath, fileName, onBack }) => {
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [showMetadata, setShowMetadata] = useState(false);

  const InfoDisplayItems = [
    { icon: Pencil, label: 'Rename' },
    { icon: Copy, label: 'Duplicate' },
  ];

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const storage = getStorage();
        const fileRef = ref(storage, filePath);
        const url = await getDownloadURL(fileRef);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvContent = decoder.decode(result.value);

        Papa.parse(csvContent, {
          header: true,
          complete: (results) => {
            setCsvData(results.data);
          },
          error: (error) => {
            setError(error.message);
          }
        });

        // Fetch file metadata
        const fileMetadata = await getMetadata(fileRef);
        setMetadata(fileMetadata);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCSV();
  }, [filePath]);

  const renderCSVTable = () => {
    if (!csvData) return null;
    return (
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((key, index) => (
                <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm text-gray-600">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const MetadataDisplay = ({ metadata }) => {
    return (
      <div className="mt-4 border shadow rounded-lg p-4 bg-gray-50">
        <h3 className="mb-3 text-sm">File Info</h3>
        <ul className='text-xs'>
          <li className="mb-2">
           Created: {new Date(metadata.timeCreated).toLocaleString()}
          </li>
          <li className="mb-2">
            Size: {metadata.size} bytes
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className='flex'>
        <button onClick={onBack} className="border shadow text-brand-300 py-2 px-4 rounded-full text-sm">
          <ChevronLeft className='w-[1rem] h-[1rem]'/>
        </button>
        <div className='ml-4 flex text-brand-300'>
          <span className="ml-3 border shadow py-1 px-4 rounded-full text-sm">{fileName}</span>
          <button className="ml-3 border shadow py-1 px-4 rounded-full text-sm">
            <Trash2 className='w-[1rem] h-[1rem]'/>
          </button>
          <button className="ml-3 border shadow py-1 px-4 rounded-full text-sm">
            <Download className='w-[1rem] h-[1rem]'/>
          </button>
          <button 
            className="ml-3 border shadow py-1 px-4 rounded-full text-sm"
            onClick={() => setShowMetadata(!showMetadata)}
          >
            <Info className='w-[1rem]'/>
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
        {showMetadata && metadata && <MetadataDisplay metadata={metadata} />}
        {renderCSVTable()}
          

        </>
      )}
    </div>
  );
};

export default CSVDisplay;
