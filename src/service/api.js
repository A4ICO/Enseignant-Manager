 // the base url to fetch the data 
const BASE_URL = 'http://localhost/enseignant-app-spa/api/enseignants/';
const _BASE_URL = 'http://localhost/enseignant-app-spa/api-v1/enseignants/';
const URLTest = 'http://localhost/enseignant-app-spa/api/enseignants/create.php';


  // the base function to be used as api call
async function request(endpoint = '', method = "GET", body = null) {

    // conserve the options into an object
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }
  // convert the method into json if it needs to send data else skip
    if (body) {
    options.body = JSON.stringify(body);
    console.log(body);
  }
 
try
    {
         // send an http request and handle the error
        const response = await fetch(`${_BASE_URL}${endpoint}`, options);
        if(!response.ok)
            {
                throw new Error(`Error HTTP : ${response.status}`);
            }
        const data = await response.json();
        return data;
    }
catch(error)
        {
            console.error("Erreur lors de la requête :", error.message);
        }
}


 // an object 
 // to export the base  function depend on the request to be used globally
export const EnseignantApi = 
{
    getAll : () =>
        request(),

    create: (matricule, nom, taux_horaire, nombre_heures) => 
        request("", "POST" , {matricule, nom, taux_horaire, nombre_heures}),

    delete: (matricule) =>
        request(`${matricule}` , "DELETE"),

    update: (matricule, nom, taux_horaire, nombre_heures) =>
        request( `${matricule}`,"PUT",{nom, taux_horaire, nombre_heures}) ,

     getBilan: () =>
        request(),
}


  // to test a simple fetch api 
async function fetchData() {
 try {
   const response = await fetch(URLTest);
   if (!response.ok) {
     throw new Error('Network response was not ok');
   }
   const data = await response.json();
   console.log(data);
 } catch (error) {
   console.error('Error:', error);
 }
}

export const fetchTest= {
    test : () => fetchData(),
};
