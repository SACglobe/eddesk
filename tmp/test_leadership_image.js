import { buildTenantViewModel } from '../src/core/viewmodels/tenant.viewmodel.ts';

const testImageUrl = 'https://some-storage.supabase.co/storage/v1/object/public/images/test.jpg';

const payload = {
  data: {
    leadership: [
      {
        "key": "83e0b1e0-006b-4e24-a374-439a6af80189",
        "name": "Leader Name",
        "role": "chairman",
        "message": "Guiding Vision",
        "imageurl": testImageUrl,
        "isactive": true,
        "schoolkey": "9e077fe4-07f1-48f3-8412-2fd7d6ae9c67",
        "designation": "Chairman",
        "displayorder": 1,
        "signatureurl": null
      },
      {
        "key": "fd052a46-10cb-4933-a5bb-acf475141db5",
        "name": "Principal Name",
        "role": "principal",
        "message": "Welcome to our institution",
        "imageurl": testImageUrl,
        "isactive": true,
        "schoolkey": "9e077fe4-07f1-48f3-8412-2fd7d6ae9c67",
        "designation": "Principal",
        "displayorder": 1,
        "signatureurl": null
      }
    ]
  }
};

const result = buildTenantViewModel(payload);

console.log('=== leadership array ===');
result.leadership.forEach(l => {
  console.log(`  name: ${l.name}, role: ${l.role}, imageUrl: ${l.imageUrl}`);
});

console.log('\n=== principal ===');
console.log(result.principal ? `  name: ${result.principal.name}, imageUrl: ${result.principal.imageUrl}` : '  null');

console.log('\n=== personnel (from leadership) ===');
result.personnel
  .filter(p => ['principal', 'chairman'].includes(p.personType))
  .forEach(p => {
    console.log(`  name: ${p.name}, personType: ${p.personType}, photoUrl: ${p.photoUrl}`);
  });
