import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient('https://whhdhiptvqvzfzwchezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoaGRoaXB0dnF2emZ6d2NoZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMzc2NTAsImV4cCI6MjAxNzYxMzY1MH0.k2RAWh2WJk0flovuExkxVGc7AlaUYiA3HTdrPAzqCYw');

async function uploadImageToSupabase(blob: Blob) {
  const fileName = Date.now() + '.jpg'; // generate a file name based on the current timestamp
  const { data, error } = await supabase.storage
    .from('generated_img')
    .upload(fileName, blob);

  if (error) {
    throw error;
  }

  return data?.path;
}

export default function downloadPhoto(url: string, filename: string) {
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Upload the blob to Supabase
      uploadImageToSupabase(blob).then((path) => {
        console.log(`Image uploaded to Supabase at ${path}`);
      });
    })
    .catch((e) => console.error(e));
}