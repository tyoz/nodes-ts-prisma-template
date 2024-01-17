import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import https from 'https';

const prisma = new PrismaClient();

(async () => {
  const benefits = await prisma.beneficio.findMany({})
  console.log(benefits.length)
})()

function firstWay() {
    try {

        const agent = new https.Agent({  
            rejectUnauthorized: false // This bypasses SSL certificate validation. Use with caution.
          });
    
        const states = [
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
            'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
        ];
    
        for(let state of states) {
            // Make a request for a user with a given ID
            axios.get(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`,
            { httpsAgent: agent })
            .then(function (response) {
                // handle success
                console.log(`State: ${state} - Counties: ${response.data.length}`);
            })
            .catch(function (error) {
                // handle error
                console.error('Error: ', error);
            })
            .finally(function () {
            // always executed
            });
        }
          
        
    } catch(e) {
        console.log('Exception');
        console.log(e);
    }    
}

function secondWay() {
    try {
        https.get('https://jsonplaceholder.typicode.com/users', res => {
            let data: any = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
          
            res.on('data', chunk => {
              data.push(chunk);
            });
          
            res.on('end', () => {
              console.log('Response ended: ');
              const users = JSON.parse(Buffer.concat(data).toString());
          
              for(let user of users) {
                console.log(`Got user with id: ${user.id}, name: ${user.name}`);
              }
            });
          }).on('error', err => {
            console.log('Error: ', err.message);
          });
    } catch(e) {
        console.log('Exception');
        console.log(e);
    }
}



async function main() {
  console.log('start');
}

// main()
// .catch(e => {
//     throw e
// })
// .finally(async () => {
//     await client1.$disconnect()
//     await client2.$disconnect()
// });