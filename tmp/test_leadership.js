import { buildTenantViewModel } from '../src/core/viewmodels/tenant.viewmodel.ts';

const payload = {
  data: {
    leadership: [
      {
        "key": "83e0b1e0-006b-4e24-a374-439a6af80189",
        "name": "Leader Name",
        "role": "chairman",
        "message": "Guiding Vision",
        "imageurl": null,
        "isactive": true,
        "createdat": "2026-03-02T18:23:05.811582",
        "schoolkey": "9e077fe4-07f1-48f3-8412-2fd7d6ae9c67",
        "designation": null,
        "displayorder": 1,
        "signatureurl": null
      }
    ]
  }
};

const result = buildTenantViewModel(payload);
console.log(result.leadership);
