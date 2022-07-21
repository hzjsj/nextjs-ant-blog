import cloudbase from '@cloudbase/node-sdk'

const tcbConfig = {
    env: 'ww',
    secretId: 'AKIDQggPs40f39yWnnWyA5j6C0XooWx70cx1',
    secretKey: 'pNeeNp0uXtymJZXEenfGadPu85k8F5ew'
};

const tcb = cloudbase.init(tcbConfig)


export default tcb
