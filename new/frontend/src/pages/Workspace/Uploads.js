import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import { auth, db, storage } from '../../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { Download } from 'lucide-react';
import TooltipAnimate from '../../components/menu/TooltipAnimate';
import UploadOptionsMenu from './UploadOptionsMenu';
import CSVDisplay from './CSVDisplay';

const Uploads = () => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCSV, setSelectedCSV] = useState(null); // State to hold the selected CSV file path and name

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      fetchUploads(user.uid);
    } else {
      console.error('No user is logged in');
    }
  }, []);

  const fetchUploads = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const filesCollectionRef = collection(userDocRef, 'files');
      const querySnapshot = await getDocs(filesCollectionRef);
      const files = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUploads(files);
    } catch (error) {
      console.error('Error fetching uploads: ', error);
    }
  };

  const deleteFile = async (fileId, fileURL) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const fileDocRef = doc(userDocRef, 'files', fileId);

      // Delete file from Firebase Storage
      const fileRef = ref(storage, fileURL);
      await deleteObject(fileRef);
      console.log('File deleted from storage successfully');

      // Delete document from Firestore
      await deleteDoc(fileDocRef);
      console.log('File document deleted from Firestore successfully');

      // Update local state
      setUploads(prevUploads => prevUploads.filter(upload => upload.id !== fileId));
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const uploadDate = new Date(timestamp.seconds * 1000);
    const today = new Date();

    const isToday = (
      uploadDate.getDate() === today.getDate() &&
      uploadDate.getMonth() === today.getMonth() &&
      uploadDate.getFullYear() === today.getFullYear()
    );

    const options = { hour: 'numeric', minute: 'numeric' };

    if (isToday) {
      return `Today, ${uploadDate.toLocaleTimeString([], options)}`;
    } else {
      return uploadDate.toLocaleDateString();
    }
  };

  return (
    <div className='w-full h-screen pt-7 p-10'>
      
      {selectedCSV ? (
        <CSVDisplay filePath={selectedCSV.path} fileName={selectedCSV.name} onBack={() => setSelectedCSV(null)} />
      ) : (
        <div>
          <p className='text-brand-300 text-2xl'>
            Uploads
          </p>
          <div className='w-full flex justify-center items-center mt-3'>
            <div className='w-full'>
              {uploads.length > 0 ? (
                <ul>
                  {uploads.map(upload => (
                    <li key={upload.id} className="">
                      <div onClick={() => setSelectedCSV({ path: `/uploads/${userId}/${upload.fileName}`, name: upload.fileName })} className="hover:bg-blue-100 pt-2 p-1 flex justify-between items-center border-b border-b-1 text-sm text-gray-700 cursor-pointer">
                        <div className="">
                          {upload.fileName}
                        </div>
                        <div className='flex items-center'>
                          <span className="mr-[15rem]">
                            {formatTimestamp(upload.timestamp)}
                          </span>
                          <a href={upload.fileURL} target="_blank" rel="noopener noreferrer" className="mr-2 hover:text-blue-500">
                            <TooltipAnimate tooltipContent={<div className='text-xs'>Download</div>}>
                              <Download className='w-4 h-4'/>
                            </TooltipAnimate>
                          </a>
                          <div>
                            <UploadOptionsMenu 
                              fileId={upload.id} 
                              fileURL={upload.fileURL} 
                              onDelete={deleteFile} 
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No uploads found.</p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Uploads;
