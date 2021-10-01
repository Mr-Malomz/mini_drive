import { Helmet } from 'react-helmet';
import { ImageList } from '../components/ImageList';
import { VideoList } from '../components/VideoList';
import { FileList } from '../components/FileList';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home({ user }) {
  const [tab, setTab] = useState(1);
  const [filetype, setFiletype] = useState('');
  const [url, setURL] = useState(null);

  const handleChange = (e) => {
    setFiletype({ filetype: e.target.value });
  };

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dtgbzmpca',
          uploadPreset: 'tca2j0ee',
          tags: [filetype.filetype],
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            setURL(result.info.url);
          }
        }
      )
      .open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openWidget();
  };

  return (
    <div>
      <Helmet>
        <script src='https://upload-widget.cloudinary.com/global/all.js' />
      </Helmet>
      <main className={styles.files}>
        <header className={styles.header}>
          <a href='/api/auth/logout' className={styles.logout}>
            Log Out
          </a>
        </header>
        <p className={styles.name}>Hi {user.name}</p>
        <div className={styles.formwrapper}>
          <form onSubmit={handleSubmit}>
            <h2>File Upload</h2>
            <select onChange={handleChange} className={styles.select} required>
              <option></option>
              <option value='images'>images</option>
              <option value='videos'>videos</option>
              <option value='files'>files</option>
            </select>
            <button className={styles.button}>Upload file</button>
          </form>
        </div>

        <div className={styles.tabwrapper}>
          <button
            className={`${styles.tabitem} ${
              tab == 1 ? styles.tabitemActive : ''
            }`}
            onClick={() => setTab(1)}
          >
            Images
          </button>
          <button
            className={`${styles.tabitem} ${
              tab == 2 ? styles.tabitemActive : ''
            }`}
            onClick={() => setTab(2)}
          >
            Videos
          </button>
          <button
            className={`${styles.tabitem} ${
              tab == 3 ? styles.tabitemActive : ''
            }`}
            onClick={() => setTab(3)}
          >
            Files
          </button>
        </div>

        <div>
          {tab == 1 && <ImageList url={url} />}
          {tab == 2 && <VideoList />}
          {tab == 3 && <FileList />}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
});
