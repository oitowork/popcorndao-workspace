export default function LinkedInPagePixel(): JSX.Element {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `_linkedin_partner_id = "3379538";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
        }}
      />
      <script 
        dangerouslySetInnerHTML={{
          __html: `(function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);`
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=3379538&fmt=gif" />`,
        }}
      />
    </>
  );
}

interface LinkedInPixelProps {
  conversionId: string;
}

export function LinkedInButtonPixel({conversionId} : LinkedInPixelProps): JSX.Element {

  return (
    <>
    <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
      {f._linkedin_data_partner_ids.push('3379538'); if (!f.lintrk) {
      f.linktrk= function(a,b) { f.linktrk.q.push([a,b])};f.linktrk.q=[]}
      t=b.createElement(e);s=b.getElementsByTagName(e)[0];
      t.src=v;t.type="text/javascript";t.async=true;
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://snap.licdn.com/li.lms-analytics/insight.min.js');`,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
      src="https://px.ads.linkedin.com/collect/?pid=3379538&conversionId=${conversionId}&fmt=gif" />`,
        }}
      />
    </>

  );
}
