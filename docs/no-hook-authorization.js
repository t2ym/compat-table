if (hook.parameters[Symbol.for('no-hook-authorization.js')]) {
  // skip reinstalling the plugin
}
else {
  hook.parameters[Symbol.for('no-hook-authorization.js')] = true;
  // Authorization Tickets for no-hook scripts
  // Ticket for this script itself is specified in URL of script tag as
  // hook.min.js?no-hook-authorization={ticket}
  // Note: no-hook-authorization must not exist in learning mode
  let noHookAuthorization = {
    // '*' is for learning mode to detect authorization tickets in 
    //   hook.parameters.noHookAuthorizationPassed,
    //   hook.parameters.noHookAuthorizationFailed
    // JSONs are output to console in the learning mode
    //'*': true,
    "4f0395d52a8c1c7edaacacade9c31fe18555b79ce963dfb1abaaa34990993374": true, // docs/about-blank-redirector.js
    "bec2d7a84a12a116b9bdf03db4bd312dff1b93cdaf0ffbcfd9d7870ca9deb961": true, // docs/bootstrap.js
    "0242016e2887b322ab28b887f03779c63899db232bb036d794a0278db9e54339": true, // docs/content-loader.js
    "bbb890e81e3f077593d6d32b758afa7ca80a8a1bbf03ae751a50974b1cd2e424": true, // docs/hook-callback.js
    "93e6b289da83905870d9ac25be0a0a0bb7e12d484c1a0fe56f0a4296a2140b11": true, // docs/hook-worker.js
    "0e1c52ef099d8bb200682ef0afece1ef90e82dedb3eccd7236c48a412085a9fe": true, // docs/hook.min.js
    "6249373b8a4e3bb915788ea4f77e8b892f5bb77407e4fe5d981ebd118876be20": true, // docs/mark-parsed.js
    "ba07654d1c24a271ba0fa7ee5c55cd60c02133b0e53cb6bb6e634da473b1e540": true, // docs/script-hashes.js
    "c46af0c64c274fa3ce4859243777218fc83c7f57f8176e8e35ab815b8eecb19c": true, // docs/wrap-globals.js
  };
  let hidden;
  const passcode = 'XX02c107ea633ed697acc12e1b3de1bcf2f0ef7cafe4f048e29553c224656ecd7a';
  if (typeof self === 'object' && self.constructor.name === 'ServiceWorkerGlobalScope') {
    // Service Worker
    let reconfigure = false;
    if (hook.parameters.noHookAuthorization) {
      if (Object.getOwnPropertyDescriptor(hook.parameters, 'noHookAuthorization').configurable) {
        reconfigure = true;
      }
    }
    else {
      reconfigure = true;
    }
    if (reconfigure) {
      Object.defineProperty(hook.parameters, 'noHookAuthorization', {
        configurable: false,
        enumerable: true,
        get() {
          return hidden;
        },
        set(value) {
          if (value && value.passcode === passcode) {
            delete value.passcode;
            Object.freeze(value);
            hidden = value;
          }
        }
      });
    }
    noHookAuthorization.passcode = passcode;
    hook.parameters.noHookAuthorization = noHookAuthorization;
  }
  else {
    // Browser Document
    Object.defineProperty(hook.parameters, 'noHookAuthorization', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Object.freeze(noHookAuthorization)
    });
  }
  if (!noHookAuthorization['*']) {
    Object.seal(hook.parameters.noHookAuthorizationPassed);
  }
  hook.parameters.sourceMap = [
    url => location.origin === url.origin && url.pathname.match(/^\/\//)
  ];
  hook.parameters.hookWorker = 'hook-worker.js?no-hook=true';
}