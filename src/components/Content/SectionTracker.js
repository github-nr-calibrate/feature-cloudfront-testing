/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
import React from 'react';

class SectionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    /* https://vanillajstoolkit.com/helpers/scrollstop/ */
    var scrollStop = function (callback) {
      // Make sure a valid callback was provided
      if (!callback || typeof callback !== 'function') return;
      // Setup scrolling variable
      var isScrolling;
      // Listen for scroll events
      window.addEventListener('scroll', function () {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          // Run the callback
          callback();
        }, 66);
      }, false);
    };

    // Get the tracker
    const SectionTrackerEl = document.getElementById('section-tracker');
    // Get all sections to track
    const Sections = document.querySelectorAll('.section-hero');

    // Track the last time the element was shown (avoids flickering)
    SectionTrackerEl.visible = new Date().getTime();

    window.addEventListener('scroll', function () {
      // on scroll show the tracker
      SectionTrackerEl.style.opacity = 1;

      // get some info to determine the percent scrolled
      let scrolledPast = 0;
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';

      // calculate % of page scrolled
      const percentScrolled = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

      // determine how many sections we've scrolled past
      Sections.forEach((section) => {
        if (window.pageYOffset > section.getBoundingClientRect().top) {
          scrolledPast += 1;
        }
      });

      // set the tracker value
      if (Sections.length) {
        SectionTrackerEl.innerHTML = `${scrolledPast || 1} / ${Sections.length}`;
      } else {
        SectionTrackerEl.innerHTML = `${Math.round(percentScrolled)}%`;
      }
    });

    window.dispatchEvent(new Event('scroll'));

    // hide the element when the user stops scrolling
    // only if the element was visible for at least a second
    scrollStop(() => {
      const hide = () => {
        SectionTrackerEl.visible = new Date().getTime();
        SectionTrackerEl.style.opacity = 0;
      };

      if (SectionTrackerEl.timer) {
        clearTimeout(SectionTrackerEl.timer);
      }

      if (new Date().getTime() - SectionTrackerEl.visible > 1000) {
        hide();
      } else {
        SectionTrackerEl.timer = setTimeout(hide, 1000);
      }
    });
  }

  render() {
    const styles = {
      position: 'fixed',
      bottom: '2.5px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      background: 'rgb(33, 30, 63, .8)',
      color: '#fff',
      width: '50px',
      height: '25px',
      textAlign: 'center',
      lineHeight: '25px',
      borderRadius: '2px',
      opacity: '0',
      transition: 'opacity .3s',
    };

    return (
      <div>
        <style>{'@media print {.no-print { display: none };}'}</style>
        <div style={styles} id="section-tracker" className="no-print" />
      </div>
    );
  }
}

export default SectionTracker;
