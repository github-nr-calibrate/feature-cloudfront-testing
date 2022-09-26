import { useEffect } from 'react';

function useKlaviyo(uniqueEmailId, success_message) {
  useEffect(() => {
    const klaviyoScript = window.document.createElement('script');
    klaviyoScript.src = 'https://www.klaviyo.com/media/js/public/klaviyo_subscribe.js';
    klaviyoScript.onload = () => {
      KlaviyoSubscribe.attachToForms(`#${uniqueEmailId}`, {
        hide_form_on_success: true,
        success_message,
        extra_properties: {
          $source: '$embed',
          $method_type: 'Klaviyo Form',
          $method_id: 'embed',
          $consent_version: 'Embed default text',
        },
      });
    };
    window.document.body.append(klaviyoScript);
  }, [uniqueEmailId, success_message]);
}

export default useKlaviyo;
