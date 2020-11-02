hook.parameters.cors = [
  'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
  'https://www.google-analytics.com/ga.js',
  (url) => {
    let _url = new URL(url);
    return _url.hostname !== location.hostname &&
      !_url.href.match(/^(https:\/\/www.gstatic.com|https:\/\/apis.google.com\/js\/api.js|https:\/\/apis.google.com\/_\/)/);
  }
];
hook.parameters.noHook = [
  //'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
  'https://www.google-analytics.com/ga.js',
  url => location.origin === url.origin &&
    [
      //'/master.js',
    ].filter(path => url.pathname.endsWith(path)).length > 0
];