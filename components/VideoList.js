import styles from '../styles/Home.module.css';
import { CloudinaryContext, Video } from 'cloudinary-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const VideoList = ({ url }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get('https://res.cloudinary.com/dtgbzmpca/video/list/videos.json')
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
      { error ? (
        <p className={styles.error}>Error fetching data</p>
      ) : loading ? (
        <p className={styles.loading}>Loading......</p>
      ) : list && list.length > 0 ? (
        <div className={styles.responsiveImages}>
          {list.map((data) => (
            <div key={data.public_id}>
              <Video
                publicId={data.public_id}
                width='90%'
                controls
                innerRef={videoRef}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.loading}>No file yet. Upload file above</p>
      )}
    </CloudinaryContext>
  );
};
