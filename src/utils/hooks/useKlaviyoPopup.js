import { useEffect } from 'react';

function useKlaviyoPopup() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search.slice(1));
    const klaviyoScript = window.document.createElement('script');
    klaviyoScript.src = 'https://www.klaviyo.com/media/js/public/klaviyo_subscribe.js';
    klaviyoScript.onload = () => {
      KlaviyoSubscribe.attachModalSignUp({
        list: 'Rcv75h',
        delay_seconds: 15,
        extra_properties: {
          'UTM Content': params.get('utm_content'),
          'UTM Matchtype': params.get('utm_matchtype'),
          'UTM Campaign': params.get('utm_campaign'),
          'UTM Medium': params.get('utm_medium'),
          'UTM Source': params.get('utm_source'),
          'UTM Term': params.get('utm_term'),
        },
        content: {
          clazz: ' klaviyo_modal',
          header: 'Get metabolic health tips in your inbox.',
          subheader: ' ',
          button: 'Submit',
          success: 'Thanks! We\'ll be in touch.',
          styles: `
            .klaviyo_modal {
              font-family: 'Graphik', sans-serif;
            }
            .klaviyo_modal .klaviyo_header {
              color: #222;
            }
            .klaviyo_modal .klaviyo_subheader {
              display: none;
            }
            .klaviyo_modal .klaviyo_fieldset,
            .klaviyo_modal .klaviyo_form_actions {
              border-top: 0;
              padding: 0;
            }
            .klaviyo_modal .klaviyo_fieldset .klaviyo_field_group label {
              font-weight: 500;
            }
            .klaviyo_modal .klaviyo_submit_button,
            .klaviyo_modal .klaviyo_submit_button span {
              padding: 0;
              color: #fff;
              background: #8F67E9;
              border-radius: 2px;
              text-transform: uppercase;
              transition: background-color 0.3s ease;
              font-family: inherit;
              font-weight: 500;
              box-shadow: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .klaviyo_modal .klaviyo_submit_button span {
              width: 100%;
              font-size: 0.75rem;
              line-height: 1;
              padding: 1em;
            }
            .klaviyo_modal .klaviyo_submit_button:hover,
            .klaviyo_modal .klaviyo_submit_button span:hover {
              background: #6e3ae3 !important;
            }
            .klaviyo_modal .klaviyo_inner,
            .klaviyo_modal .klaviyo_fieldset .klaviyo_field_group input[type=text],
            .klaviyo_modal .klaviyo_fieldset .klaviyo_field_group input[type=email] {
              border-radius: 2px;
            }
          `,
        },
      });
    };
    window.document.body.append(klaviyoScript);
  }, []);
}

export default useKlaviyoPopup;
