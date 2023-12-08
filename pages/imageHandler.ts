import axios from 'axios';
import fs from 'fs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whhdhiptvqvzfzwchezb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoaGRoaXB0dnF2emZ6d2NoZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMzc2NTAsImV4cCI6MjAxNzYxMzY1MH0.k2RAWh2WJk0flovuExkxVGc7AlaUYiA3HTdrPAzqCYw';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const handleImage = (): Promise<string> => {
    return axios.get('https://api-provider.com/image.jpg', { responseType: 'arraybuffer' })
        .then(response => {
            return new Promise<string>((resolve, reject) => {
                fs.writeFile('/tmp/image.jpg', response.data, (err) => {
                    if (err) reject(err);

                    supabase.storage.from('generated_img').upload('image.jpg', fs.createReadStream('/tmp/image.jpg'))
                        .then(({ data, error }) => {
                            if (error) reject(error);
                            if (data) {
                                resolve(data.path);
                            } else {
                                reject('Upload failed');
                            }
                        });
                });
            });
        })
        .catch(err => console.error(err));
};

export default handleImage;