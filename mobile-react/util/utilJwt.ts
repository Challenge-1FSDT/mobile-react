import { Base64 } from 'js-base64';

export function decodificar(token:string){

  let decodedJson =null;
  console.log(' <<< decodificar >>>');
  console.log(token);
  
  if(token){
      // Separando as partes do token
      const parts = token.split('.');
      const payload = parts[1];

      // Decodificando o payload
      const decodedPayload = Base64.decode(payload);

      // Convertendo o payload decodificado para JSON
      decodedJson = JSON.parse(decodedPayload);


      console.log('\n-----------------------\n'+
                  'perfil: '+(decodedJson.r)+'\n'+
                  'decodificar >> Dados decodificados: \n'+
                  JSON.stringify(decodedJson, null, 2)+
                  '\n-----------------------\n');

  }

  return decodedJson;
}
