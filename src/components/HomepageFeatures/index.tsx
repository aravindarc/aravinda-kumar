import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useInView } from 'react-intersection-observer';
import Anime, {anime} from 'react-animejs-wrapper'

type GetFeaturesRef = () => React.MutableRefObject<any>;

type FeatureTutorialProps = {
  href: string;
  name: string;
}

function FeatureTutorial({href, name}: FeatureTutorialProps): JSX.Element {
  return (
    <div>
      <span className="badge badge--secondary">
        <a href={href}>
          {name}
        </a>
        &nbsp;
        &nbsp;
        <img src={'/img/external.svg'} style={{width: '10px'}}/>
      </span>
    </div>
  )
}

type FeatureItem = {
  id?: number;
  title: string;
  description: JSX.Element;
  getFeaturesRef?: GetFeaturesRef;
  imgPath?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'GoLang',
    description: (
      <>
        Developed two production grade, cloud-native applications interfacing with postgres and mongodb.
        Made opensource contributions to <a href={'https://www.ory.sh/docs/keto'}>ORY Keto</a>.
        In-Depth understanding of Code Structure and Implementation of several Open Source Projects (
        <a href={'https://www.ory.sh/docs/kratos/'}>ORY Kratos</a>
        , <a href={'https://www.ory.sh/docs/keto'}>ORY Keto</a>
        , <a href={'https://casbin.org/'}>Casbin</a>
        , <a href={'https://temporal.io/'}>Temporal</a>, etc...)
        Good understanding of Go Channels and concurrent programming in Golang. Worked in multiple frameworks like
        GIN, GORM, Mongo, Casbin and GCP sdks. Microservice, Commandline and Monorepo patterns in GoLang. Repurposed
        terraform AST to support custom annotations.
        <FeatureTutorial href='/docs/intro' name='GoLang Tutorials'/>
      </>
    ),
    imgPath: "/img/golang_editor.svg"
  },
  {
    title: 'ReactJS',
    description: (
      <>
        Experience working in React Frameworks like <a href={'https://nextjs.org/'}>NextJS</a>
        , <a href={'https://docusaurus.io/'}>Docusaurus</a>, <a href={'https://redux.js.org/'}>Redux</a>
        , Monaco Editor, etc... Hands-on experience in production grade animations and vector graphics for websites
        (This website is an example 😁). Good understanding and working knowledge of functional components, HOCs and custom
        webhooks in ReactJS. Worked in these formats .ts, .tsx, .js, .jsx and .mdx.
        <FeatureTutorial href='/docs/intro' name='React Tutorials'/>
      </>
    ),
    imgPath: "/img/react_editor.svg"
  },
  {
    title: 'Terraform',
    description: (
      <>
        Developed production grade landing-zone type monorepos for Azure and GCP. Unparalleled understanding of the
        IaC Platform, which comes from understanding the Code Repo of Terraform. Developed a custom UI Based terraform
        code annotations tool for showing error, warning and type annotations. Developed custom provider. Contributed
        several <a href='https://registry.terraform.io/namespaces/bootlabstech'>GCP Terraform Modules</a> to Terraform Registry.
        <FeatureTutorial href='/docs/intro' name='Terraform Tutorials'/>
      </>
    ),
  },
  {
    title: 'GCP Cloud',
    description: (
      <>
        Experience setting up Organizational Hierarchy for an Organization with multiple business units, departments,
        clients and vendors. Lead a team as Product Lead which built a <a href='https://sailor.bootlabstech.com'>Multi-Cloud
        Low-Code Platform</a> primarily for GCP.
        Automated IAM Bindings for developers using GCP Golang SDKs. Worked on multiple GCP services like Cloud Storage,
        GKE, Compute Instance, Networking (HTTP, Network), Vertex AI, Bigquery, App Service, etc...
        <FeatureTutorial href='/docs/intro' name='GCP Tutorials'/>
      </>
    ),
    imgPath: "/img/hp-primary-desktop_e0dab1f509.svg",
  },
  {
    title: 'Microsoft Azure Cloud',
    description: (
      <>
        Experience setting up Organizational Hierarchy for an Organization with multiple business units, departments,
        clients and vendors. Lead a team which were involved in Modernizing and Migrating applications(.NET-Core, PHP and Java)
        from the on-prem world to Microsoft Azure Cloud. Deployed the applications to AKS through
        <a href='https://www.jenkins.io/'>jenkins</a> pipelines which
        supported out-of-the-box canary deployments facilitated through <a href='https://flagger.app/'>Flagger</a>.
        Implemented a system for automatic Key Rotation for all the Application DBs through AKV. Setup basic Observability
        Tools (<a href='https://grafana.com/'>Grafana</a>, <a href='https://prometheus.io/'>Prometheus</a> and
        <a href='https://www.elastic.co/what-is/elk-stack'>ELK</a>. Enabled cost savings of upto 60% for Lower-Environments
        by means of using Spot Instances.
        <FeatureTutorial href='/docs/intro' name='Azure Tutorials'/>
      </>
    ),
    imgPath: "/img/hp-primary-desktop_e0dab1f509.svg",
  },
  {
    title: 'Java and Python',
    description: (
      <>
        Worked on several frameworks in Java and Python. Implemented microservices in both the languages. Made contributions
        to open source projects in both languages (jsign and chaostoolkit). Although not languages of first choice, have
        good practical knowledge. Implemented pseudorandom geopoints generation algorithm in Java and improved the performance
        of the same using Stream APIs. Worked in modern frameworks like fastapi.
      </>
    ),
    imgPath: "/img/hp-primary-desktop_e0dab1f509.svg",
  },
  {
    title: 'Hobbies in Embedded Computing',
    description: (
      <>
        RPI enthusiast, repurposed debian to run an automation workload on RPIs using <a href='https://microk8s.io/'>MicroK8S</a>.
        Designed and printed two layer PCB boards. Understanding of low level protocols (think i2c) and high level protocols (think mqtt).
        Experience installing and repurposing WLAN drivers for linux kernel, practical experience in BLE communication.
        Built and deployed several IoS, Android and React Native applications acting as User Interfaces for the Automation Workloads.
      </>
    ),
    imgPath: "/img/hp-primary-desktop_e0dab1f509.svg",
  },
];

function Feature({id, title, description, getFeaturesRef, imgPath}: FeatureItem) {
  var text: JSX.Element = (
    <div className={clsx('col col--6')}>
      <div className={styles.featureText} >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )

  const ref = useRef(null);
  const parentRef = getFeaturesRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (parentRef.current.getBoundingClientRect().top < 0) {
        ref.current.style.position = "fixed";
      } else {
        ref.current.style.position = "static";
      }
    })
  }, []);

  var svg: JSX.Element = (
    <div className={clsx('col col--6')}>
        <div ref={ref} className={clsx(id % 2 == 0 ? styles.featureSvgContainerRight : styles.featureSvgContainerLeft, "text--center")}>
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
            <img className={id % 2 == 0 ? styles.secondarySvgRight : styles.secondarySvgLeft} src={imgPath}/>
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
  const ref = useRef(null);

  function getFeaturesRef():React.MutableRefObject<any> {
    return ref;
  }

  return (
    <section ref={ref} className={styles.features}>
      <div className="container" >
        {FeatureList.map((props, idx) => {
          const { ref, inView } = useInView({
            /* Optional options */
            threshold: 0.63333,
          });
          return (
            <div key={idx} ref={ref} className={clsx(inView ? styles.featureRow : styles.featureRowHidden, "row")}>
              <Feature id={idx} {...props} getFeaturesRef={getFeaturesRef}/>
            </div>
          )
        })}
      </div>
    </section>
  );
}
