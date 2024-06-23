import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
    Pencil,
    Copy,
    Archive,
    Replace, 
    Trash2,
    EllipsisVertical,
  } from 'lucide-react';

const CSVDisplay = ({ filePath, fileName, onBack }) => {
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <button onClick={onBack} className="border shadow text-brand-300 py-2 px-4 rounded-full text-sm">Back to Uploads</button>
      <button className="ml-3 border shadow py-2 px-4 rounded-full text-sm">{fileName}</button>
      <button className="ml-3 border shadow py-2 px-4 rounded-full text-sm"><Trash2 className='w-4 h-4'/></button>
      {error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          {renderCSVTable()}
        </>
      )}
    </div>
  );
};

export default CSVDisplay;
