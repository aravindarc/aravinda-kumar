import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import Anime, {anime} from 'react-animejs-wrapper'

type FeatureItem = {
  id?: number;
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  isVisible?: boolean,
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/hp-primary-desktop_e0dab1f509.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/hp-step4-2D_9ab379c7f5.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/hp-primary-desktop_e0dab1f509.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({id, title, Svg, description, isVisible}: FeatureItem) {
  var text: JSX.Element = (
    <div className={clsx('col col--6')}>
      <div className={styles.featureText} >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )

  var svg: JSX.Element = (
    <div className={clsx('col col--6')}>
        <div className={clsx(id % 2 == 0 ? styles.featureSvgContainerRight : styles.featureSvgContainerLeft, "text--center")}>
          <Anime
            config={{
              translateX: id % 2 == 0 ? [-500, -70] : [100, -120],
              translateY: id % 2 == 0 ? [10, -70] : [90, -70],
              duration: 3000,
              delay: anime.stagger(300),
            }}
          >
            <img src={'/img/hp-primary-desktop_e0dab1f509.svg'} style={{zIndex: 1, width: "90%"}}/>
          </Anime>
          <Anime
            config={{
              translateX: id % 2 == 0 ? [-400, -200] : [400, -80],
              translateY: id % 2 == 0 ? [-400, -550] : [-300, -550],
              duration: 2000,
              delay: anime.stagger(150)
            }}
          >
            <img className={id % 2 == 0 ? styles.secondarySvgRight : styles.secondarySvgLeft} src='/img/hp-primary-desktop_e0dab1f509.svg'/>
          </Anime>
        </div>
    </div>
  )

  if (id % 2 == 0) {
    return (
      <>
        {text}
        {svg}
      </>
    );
  } else {
    return (
      <>
        {svg}
        {text}
      </>
    );
  }
}

export default function HomepageFeatures(): JSX.Element {



  return (
    <section className={styles.features}>
      <div className="container" >
        {FeatureList.map((props, idx) => {
          const { ref, inView } = useInView({
            /* Optional options */
            threshold: 0.63333,
          });
          return (
            <div key={idx} ref={ref} className={clsx(inView ? styles.featureRow : styles.featureRowHidden, "row")}>
              <Feature id={idx} {...props} isVisible={inView}/>
            </div>
          )
        })}
      </div>
    </section>
  );
}
