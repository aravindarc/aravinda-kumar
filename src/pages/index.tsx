import React, {useEffect} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">
        <div className="row" style={{alignItems: "center", justifyContent: "center"}}>
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src="/img/keyboard.svg"
            />
            <div className="avatar__intro">
              <div className="avatar__name">{siteConfig.title}</div>
              <small className="avatar__subtitle">
                Fullstack Developer and Cloud Engineer at Bootlabstech
              </small>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Go to Tutorials
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="My Website/Tutorials/Blog on Software Development, Open Source and Cloud.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
