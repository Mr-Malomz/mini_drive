import styles from '../styles/Home.module.css';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ImageList = ({url}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get('https://res.cloudinary.com/dtgbzmpca/image/list/images.json')
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
        <div className={styles.responsiveImages}>
          {list.map((data) => (
            <div key={data.public_id}>
              <Image publicId={data.public_id}>
                <Transformation
                  crop='scale'
                  width='300'
                  height='400'
                  dpr='auto'
                  responsive_placeholder='blank'
                />
              </Image>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.loading}>No file yet. Upload file above</p>
      )}
    </CloudinaryContext>
  );
};
