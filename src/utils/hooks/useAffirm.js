import { useEffect } from 'react';

function useAffirm(visibility = false) {
  useEffect(() => {
    const affirmLoaded = window.affirm;
    if (visibility) {
      // We only need to load the Affirm script one time when any Affirm price is in view
      if (!affirmLoaded) {
        const affirmScript = window.document.createElement('script');
        affirmScript.id = 'affirm-script';
        affirmScript.text = `
        _affirm_config = {
          public_api_key: "8UWXU6HTO4OCTSS6",
          script: "https://cdn1.affirm.com/js/v2/affirm.js"
        };
        (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");
      `;
        window.document.body.append(affirmScript);
      }
      // Always refresh the Affirm script when the Affirm price is in view
      window.affirm.ui.ready(window.affirm.ui.refresh);
    }
  }, [visibility]);

  return !!visibility;
}

export default useAffirm;
