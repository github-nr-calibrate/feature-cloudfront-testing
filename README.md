#  Calibrate marketing site

Frontend and code for statically building [Calibrate marketing site](https://www.joincalibrate.com/). 
- The site is hosted on AWS. Production is hosted on S3 and Cloudfront. Non-production environments are in Amplify. Amplify currently has a performance issue which means we can’t put production onto it.
 
- All the content is coming from [Prismic](https://calibrate.prismic.io/) (a headless CMS). [![Netlify Status](https://api.netlify.com/api/v1/badges/e61cad9d-28de-4698-b19d-61393ea5d057/deploy-status)](https://app.netlify.com/sites/calibrate-health/deploys)


> 

<details open="open">
  <summary><h2 style="display: inline-block">Contents</h2></summary>
  <ol>
    <li>
    <a href="#deployment">Deployment</a></li>
     <ul>
        <li><a href="#git-integration">Git integration</a></li>
        <li><a href="#git-workflow">Git Workflow</a></li>
     </ul>
    </li>
    <li><a href="#local-development">Local development</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#preview-deployment">Preview Deployments</a></li>
     <ul>
         <li><a href="#on-netlify">On Netlify</a></li>
     </ul>
     <ul>
         <li><a href="#on-prismic">On Prismic</a></li>
     </ul>
         <li><a href="#historical-features">Historical features</a></li>
     <ul>
         <li><a href="#url-changes">URL Changes</a></li>
     </ul>
         <li><a href="#open-source-software-policy">Open Source Software Policy</a></li>
     <ul>
         <li><a href="#dependencies">Dependencies</a></li>
     </ul>
  </ol>
</details>

## Deployment

The site is prerendered at build time. On build, data is fetched from [Prismic](https://calibrate.prismic.io/) using Next.js `getStaticProps` function on each page. This generates each page as static HTML. Static pages are purely a performance optimization, since the data from Prismic is mostly text and seldom updated.

>**Caveat** because there are no requests being made on the page, the site rebuilds automatically when updates to Prismic are published. We are using [Prismic's webhooks](https://calibrate.prismic.io/settings/webhooks/) to trigger a new build when changes are made in the CMS.

<img src="https://user-images.githubusercontent.com/84180855/121913811-61f25200-cd3a-11eb-8b03-31bfe8a1ff2f.png" width="400">

**NOTE**: If deploy on Netlify is marked as done but changes aren't published, check if auto publishing is on.

### Git Integration

Currently `master` is the default branch. Any push to `master` will trigger a production build on [Netlify](https://app.netlify.com/sites/calibrate-health/). This is in addition to Prismic rebuild triggers.

### Git Workflow
See the description of the workflow, including branches, naming conventions, and deployment checklist at [GitHub Workflow (Growth)](https://joincalibrate.atlassian.net/wiki/spaces/ENGINEERIN/pages/167542785/GitHub+Workflow+Growth).


## Local Development

Node versions >= 15.12 are known to work. The latest stable version of [Node](https://nodejs.org/en/) is preferred. It is better to use Node and NPM versions that are used on hosting platform.

```sh
npm install
npm run dev
```


## Scripts

Script               | Description
-------------------- | -----------------------------------------------------------
`npm start`          | Run app
`npm build`          | Build app (run before `start`)
`npm run dev`        | Start dev server on `localhost:3000`
`npm run lint`       | Run `eslint`
`npm run export`     | Export a static version of the site to the `out` directory

**NOTE**: Content from Prismic may fail to load when `npm build` is run (pushing code, deploying app). In such cases just rerun the build.


## Preview Deployment 
For most tickets, updating Netlify preview is sufficient. Update the preview on Prismic if:
- The code changes relates to *Prismic updates* (changing existing or adding new slices, page layouts, content fields).
- After a release. Upload a current version of the `master` branch every time it changes.

### On Netlify
1. Make your changes on a feature branch.
1. Push your branch to git.
1. Create a PR for your feature branch.
1. Wait for the `netlify/calibrate-health/deploy-preview` check to complete, then click the link.
You should be sent to a Netlify preview site.

### On Prismic
You can preview any *arbitrary version of site code* without rebuilding the site using Prismic Website preview options. These options launches code hosted in **AWS Elastic Beanstalk** (for now, it is updated manually):
- [Production Preview](http://calibrate-web-master-preview-prismic.us-east-2.elasticbeanstalk.com/)
- [Staging Preview](http://calibrate-web-preview-prismic.us-east-2.elasticbeanstalk.com/) (used more often).

Learn more at [working with Prismic](https://joincalibrate.atlassian.net/wiki/spaces/ENGINEERIN/pages/82477121/Working+with+Prismic).

**NOTE**: Changes to meta can't be seen using Prismic previews. Publish meta doc to see the changes.

Website Preview option on Prismic will load the version of code you've uploaded to AWS. To preview a specific version of the code (for example, your current feature branch):
1. Make sure your branch contains the latest code from the dev branch. 
2. `git checkout` the desired branch.
3. Run `npm run build`.
4. Zip the working directory with `npm run zip`.
5. Go to the AWS Beanstalk and choose the Prismic env: 
   1. **Staging**: `calibrate-web-preview-prismic`
   2. **Prod**: `calibrate-web-master-preview-prismic`
6. Upload and deploy the zip. This usually takes a while and fails a lot (result with WARN). While you wait:
   1. Open another AWS Beanstalk window with the upload progress and go to the Events tab. 
   
   <details><summary>See screenshot</summary><img width="119" alt="Screen Shot 2021-12-30 at 6 06 15 PM" src="https://user-images.githubusercontent.com/84180855/149529357-be95c424-c7f3-41e6-bbde-638a104709db.png">
     </details>
     
   1. View the latest event: the Time should be near runtime.


   1. If the Type is WARN, something went wrong. View the Details to see what caused it and what is the severity.
   
     - If the build fails because of code issues, revert to the previous environment (Application versions). Go to the environment in nav, select Actions, and choose Deploy. Select the deploy the last working version from the list and check AWS events & server logs (Logs nav tab).
     - If the issue is not related to code, try to upload the file again. If it fails, create the zip again and try again.


You can view the logs (from the nav pane of the AWS instance).


## Historical features

### URL changes

* Due to request from marketing team `features` was renamed to `pages`
* Due to problems with the indexing `blog` pages was renamed to `resourses`

## Open Source Software Policy

We have [OSS Policy](https://joincalibrate.atlassian.net/wiki/spaces/ENGINEERIN/pages/63078696/Using+open+source+software), here is list of our packages and their licenses. Please update this list when a new package is added.

### Dependencies:

* "@next/bundle-analyzer": MIT,
* "@styled-system/should-forward-prop": MIT,
* "es6-promise": MIT,
* "intersection-observer": W3C-20150513,
* "lazysizes": MIT,
* "next": MIT,
* "nookies": MIT,
* "ola": MIT,
* "polished": MIT,
* "prismic-javascript": Apache-2.0,
* "@prismicio/react": ISC,
* "prop-types": MIT,
* "qs": BSD-3-Clause License,
* "react": MIT,
* "react-countup": MIT,
* "react-dom": MIT,
* "react-hook-inview": MIT,
* "react-modal": MIT,
* "react-imgix": ISC,
* "react-player": MIT,
* "react-visibility-sensor": MIT,
* "styled-components": MIT,
* "styled-system": MIT,
* "@babel/core": MIT,
* "@netlify/plugin-sitemap": MIT,
* "babel-eslint": MIT,
* "babel-plugin-styled-components": MIT,
* "eslint": MIT,
* "eslint-config-airbnb": MIT,
* "eslint-import-resolver-alias": MIT,
* "eslint-plugin-import": MIT,
* "eslint-plugin-jest": MIT,
* "eslint-plugin-jsx-a11y": MIT,
* "eslint-plugin-react": MIT,
* "eslint-plugin-react-hooks": MIT,
* "husky": MIT
* "@imgix/js-core": BSD-2-Clause
* "seamless-scroll-polyfill": MIT
* "next-sitemap": MIT
