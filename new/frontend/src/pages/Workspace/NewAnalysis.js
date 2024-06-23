import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import Loading from '../UtilityPages/Loading.js';
import { ArrowRightToLine } from 'lucide-react';
import Results from './Results.js';
import TransitionWrapper from '../../wrappers/TransitionWrapper';
import { db, storage, auth } from '../../firebase';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  DraftingCompass,
  Lightbulb,
  FolderOpen,
  Rabbit,
} from 'lucide-react';

const NewAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null); // Initialize as null

  // Retrieve the user ID from Firebase Auth
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      console.error('No user is logged in');
    }
  }, []);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file && userId) { // Ensure userId is available
      navigate('loading');
      try {
        const storageRef = ref(storage, `uploads/${userId}/${file.name}`); // Ensure user ID is part of the path
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);
        await saveFileMetadata(fileURL, file.name); // Pass file name
        navigate('../results', { state: { fileURL } });
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    } else {
      alert("No user is logged in or no file selected");
    }
  };

  const saveFileMetadata = async (fileURL, fileName) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const fileCollectionRef = collection(userDocRef, 'files');
      await addDoc(fileCollectionRef, {
        fileURL,
        fileName,
        timestamp: new Date()
      });
    } catch (e) {
      console.error('Error saving file metadata: ', e);
    }
  };

  const [data, setData] = useState([]);
  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'your-collection'));
        setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error('Error retrieving documents: ', e);
      }
    };

    fetchData();
  }, []);

  const handleAddData = async () => {
    try {
      await addDoc(collection(db, 'your-collection'), { field: fieldValue });
      setFieldValue('');
      alert('Document added successfully!');
      const querySnapshot = await getDocs(collection(db, 'your-collection'));
      setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className='w-full h-screen p-10'>
      <p className='text-brand-250 text-2xl'>
        New Analysis
      </p>
      <div>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
        <button className="hover:bg-blue-200 bg-red-200" onClick={handleAddData}>Add Data</button>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.field}</li>
          ))}
        </ul>
      </div>
      <div className='w-full flex px-7 justify-center items-center '>  {/* Project Pages */}
        <TransitionWrapper location={location}>
          <Routes location={location}>
            <Route path="/" element={
              <div className='pt-10'>
                <div className="buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <form className="text-brand-300 rounded-full flex-row" onSubmit={handleSubmit}>
                    <div className='flex p-1 h-9'>
                      <input className="p-1 h-9 flex file:hover:bg-blue-300 file:items-center file:text-brand-300 file:hover:bg-brand-250 rounded-full file:rounded-full file:border-none file:bg-brand-250 bg-brand-100" type="file" accept=".csv" onChange={handleChange} />
                      <button className="rounded-full bg-blue-200 h-9 w-9 flex items-center justify-center bg-brand-100 button-style hover:bg-blue-300" type="submit">
                        <ArrowRightToLine className='w-5' />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            } />
            <Route path="loading" element={<Loading />} />
            <Route path="results" element={<Results />} />
          </Routes>
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default NewAnalysis;
