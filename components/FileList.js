import styles from '../styles/Home.module.css';
import { CloudinaryContext } from 'cloudinary-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { login } from '@auth0/nextjs-auth0';

export const FileList = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get('https://res.cloudinary.com/dtgbzmpca/raw/list/files.json')
      .then((res) => {
        setList(res.data.resources);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        if (err.response.data == '') {
          setList([]);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(true);
        }
      });
  }, [url]);
  return (
    <CloudinaryContext cloudName='dtgbzmpca'>
      {error ? (
        <p className={styles.error}>Error fetching data</p>
      ) : loading ? (
        <p className={styles.loading}>Loading......</p>
      ) : list && list.length > 0 ? (
        <div>
          {list.map((data) => (
            <div key={data.public_id}>
              <a
                target='_blank'
                href={`https://res.cloudinary.com/dtgbzmpca/raw/upload/v${data.version}/${data.public_id}`}
                rel='noopener noreferrer'
                className={styles.filelist}
              >
                View File - {data.public_id}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.loading}>No file yet. Upload file above</p>
      )}
    </CloudinaryContext>
  );
};
