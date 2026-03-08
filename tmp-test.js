const { fetchDemoScreen } = require('./src/core/services/screenData.service.ts');
// since this requires ts-node, i will just write a fetch script

async function test() {
    const resp = await fetch('http://localhost:3000/api/some-test');
}
test();
