importScripts('node_modules/thin-hook/hook.min.js?no-hook=true', 'bootstrap.js?no-hook=true');
onmessage = hook.hookWorkerHandler;